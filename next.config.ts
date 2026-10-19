import type { NextConfig } from "next";

const imageBase = new URL(
  process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "https://storage.owndays.com/storage/",
);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: imageBase.protocol.replace(":", "") as "http" | "https",
        hostname: imageBase.hostname,
        pathname: `${imageBase.pathname}**`,
      },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
