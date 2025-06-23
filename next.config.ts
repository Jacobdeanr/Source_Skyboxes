import type { NextConfig } from "next";

const repoBase = process.env.NEXT_PUBLIC_BASE_PATH;
console.log(`Repo base: ${repoBase}`);

const nextConfig: NextConfig = {
  output: "export",
  basePath: repoBase,
  assetPrefix: repoBase,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
