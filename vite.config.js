import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  server: {
    allowedHosts: true,
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    // Optimize for mobile performance
    target: "es2015", // Better mobile compatibility
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true, // Remove console logs in production
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        // Optimize chunk splitting for better caching
        manualChunks: {
          vendor: ["react", "react-dom"],
          router: ["react-router-dom"],
          motion: ["framer-motion"],
          icons: ["lucide-react"],
          analytics: ["@vercel/analytics", "@vercel/speed-insights"],
        },
        assetFileNames: "assets/[name]-[hash][extname]",
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
      },
    },
    // Optimize CSS
    cssCodeSplit: true,
    // Optimize for mobile
    chunkSizeWarningLimit: 1000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    extensions: [".mjs", ".js", ".jsx", ".ts", ".tsx", ".json"],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".js": "jsx",
      },
    },
    // Pre-bundle dependencies for faster loading
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "framer-motion",
      "lucide-react",
      "@vercel/analytics",
      "@vercel/speed-insights",
    ],
  },
  // Optimize for mobile performance
  define: {
    // Remove React DevTools in production
    __DEV__: JSON.stringify(process.env.NODE_ENV === "development"),
  },
});
