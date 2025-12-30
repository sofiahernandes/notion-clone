import Link from "next/link";

const Footer = () => {
  return (
    <div className="absolute bottom-0 flex flex-col text-center gap-2 py-6 w-full shrink-0 justify-center px-4 lg:px-6">
      <Link href="https://www.linkedin.com/in/sofiahernandes/" target="_blank">
        <p className="text-xs text-gray-500 dark:text-gray-400 hover:underline hover:underline-offset-2">
          © 2025 Sofia Botechia Hernandes. All rights reserved.
        </p>
      </Link>
    </div>
  );
};

export { Footer };