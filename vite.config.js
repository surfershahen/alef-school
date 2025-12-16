import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

/**
 * Vite plugin that adds a dev-only proxy for OpenAI.
 * This keeps the API key on the server during `npm run dev`
 * and avoids 404s for /api/openai-proxy in development.
 */
const openAIProxyPlugin = (env) => ({
  name: "openai-dev-proxy",
  configureServer(server) {
    server.middlewares.use("/api/openai-proxy", async (req, res) => {
      if (req.method !== "POST") {
        res.statusCode = 405;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ error: "Method not allowed" }));
        return;
      }

      const apiKey = env.OPENAI_API_KEY || process.env.OPENAI_API_KEY;
      if (!apiKey) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.end(
          JSON.stringify({
            error: "Missing OPENAI_API_KEY in .env for local dev",
          })
        );
        return;
      }

      try {
        const buffers = [];
        for await (const chunk of req) {
          buffers.push(chunk);
        }
        const rawBody = Buffer.concat(buffers).toString("utf8");
        const payload = rawBody ? JSON.parse(rawBody) : {};

        const upstream = await fetch(
          "https://api.openai.com/v1/chat/completions",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: payload.model || "gpt-4-1106-preview",
              messages: payload.messages,
              max_tokens: payload.max_tokens ?? 300,
              temperature: payload.temperature ?? 0.3,
            }),
          }
        );

        const text = await upstream.text();
        res.statusCode = upstream.status;
        res.setHeader("Content-Type", "application/json");
        res.end(
          text || JSON.stringify({ error: "Empty response from OpenAI" })
        );
      } catch (error) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ error: error.message }));
      }
    });
  },
});

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), openAIProxyPlugin(env)],
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
  };
});
