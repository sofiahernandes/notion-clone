import { createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/app';
import { initEdgeStore } from '@edgestore/server';
import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/lib/auth';

type EdgeStoreContext = {
  userId: string | null;
};

const es = initEdgeStore.context<EdgeStoreContext>().create();

/**
 * This is the main router for the Edge Store buckets.
 */
const edgeStoreRouter = es.router({
  publicFiles: es
    .fileBucket()
    .beforeUpload(({ ctx }) => {
      return Boolean(ctx.userId);
    })
    .beforeDelete(({ ctx }) => {
      return Boolean(ctx.userId);
    }),
});

const missingCredentials =
  !process.env.EDGE_STORE_ACCESS_KEY || !process.env.EDGE_STORE_SECRET_KEY;

const handler = missingCredentials
  ? async () => {
      return new Response(
        JSON.stringify({
          error:
            'Missing EDGE_STORE_ACCESS_KEY or EDGE_STORE_SECRET_KEY. Add them to .env.local and restart the dev server.',
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    }
  : createEdgeStoreNextHandler({
      router: edgeStoreRouter,
      createContext: async () => {
        try {
          const session = await getServerSession(authOptions);

          return {
            userId: session?.user?.id ?? null,
          };
        } catch {
          return {
            userId: null,
          };
        }
      },
    });

export { handler as GET, handler as POST };

/**
 * This type is used to create the type-safe client for the frontend.
 */
export type EdgeStoreRouter = typeof edgeStoreRouter;
