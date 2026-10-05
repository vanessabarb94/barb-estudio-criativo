import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Este projeto Next.js vive em v5/ dentro de um monorepo opensquad maior
  // que tem seu próprio package-lock.json na raiz. Fixar a raiz aqui evita
  // que o Turbopack escaneie o monorepo inteiro para detectar o workspace.
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
