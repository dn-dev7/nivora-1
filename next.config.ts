import type { NextConfig } from "next";
import path from "node:path";

const onVercel = process.env.VERCEL === "1" || Boolean(process.env.VERCEL_ENV);

const nextConfig: NextConfig = {
  turbopack: onVercel ? {
    resolveAlias: {
      "cloudflare:workers": "./lib/vercel-cloudflare-workers.ts",
    },
  } : undefined,
  webpack(config) {
    if (onVercel) {
      config.resolve ??= {};
      config.resolve.alias ??= {};
      config.resolve.alias["cloudflare:workers"] = path.resolve(process.cwd(), "lib/vercel-cloudflare-workers.ts");
    }
    return config;
  },
};

export default nextConfig;
