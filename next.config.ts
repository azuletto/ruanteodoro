import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Uploads de imagem passam por server action (FormData). O default de
    // 1MB rejeitaria fotos reais; 10MB cobre o limite de 8MB da action.
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  images: {
    // Imagens servidas pelo Supabase Storage (bucket "site").
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
