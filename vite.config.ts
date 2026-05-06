import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/app": path.resolve(__dirname, "./src/app"),
      "@/components": path.resolve(__dirname, "./src/components"),
      "@/features": path.resolve(__dirname, "./src/features"),
      "@/pages": path.resolve(__dirname, "./src/pages"),
      "@/shared": path.resolve(__dirname, "./src/shared"),
      "@/assets": path.resolve(__dirname, "./src/assets"),
    },
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;

          const getPackageChunk = () => {
            const trimmed = id.split('node_modules/')[1];
            if (!trimmed) return 'vendor-misc';
            const [first, second] = trimmed.split('/');
            const pkg = first.startsWith('@') && second ? `${first}/${second}` : first;
            return `vendor-${pkg.replace('@', '').replace('/', '-')}`;
          };

          if (id.includes('/react/') || id.includes('/react-dom/') || id.includes('/react-router-dom/')) {
            return 'vendor-react';
          }

          if (id.includes('/framer-motion/')) {
            return 'vendor-animation';
          }

          if (id.includes('/firebase/')) {
            return 'vendor-firebase';
          }

          if (id.includes('/@radix-ui/') || id.includes('/lucide-react/') || id.includes('/recharts/')) {
            return 'vendor-ui';
          }

          if (id.includes('/zod/') || id.includes('/dompurify/') || id.includes('/uuid/')) {
            return 'vendor-utils';
          }

          return getPackageChunk();
        },
      },
    },
  },
  esbuild: {
    drop: mode === "production" ? ["console", "debugger"] : [],
  },
}));
