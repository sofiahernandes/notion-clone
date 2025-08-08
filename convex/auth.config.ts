export default {
  providers: [
    {
      type: "oidc",
      issuer: "https://equal-moth-69.clerk.accounts.dev",
      clientId: "convex",
      jwksUri: "https://equal-moth-69.clerk.accounts.dev/.well-known/jwks.json",
    },
  ],
};
