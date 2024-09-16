const esbuild = require("esbuild");
const path = require("path");
const fs = require("fs-extra");
const copy = require("esbuild-plugin-copy").default;

esbuild
  .build({
    entryPoints: ["src/server.ts"],
    bundle: true,
    platform: "node",
    target: "node20", // Adjust as needed
    outdir: "build",
    external: ["express"], // Exclude express from bundling
    loader: {
      ".ts": "ts",
    },
    plugins: [
      copy({
        assets: {
          from: [
            "./node_modules/swagger-ui-dist/*.css",
            "./node_modules/swagger-ui-dist/*.js",
            "./node_modules/swagger-ui-dist/*.png",
          ],
          to: ["./"], // Copy assets to a public folder
        },
      }),
    ],
    resolveExtensions: [".ts", ".js"],
    define: {
      "process.env.NODE_ENV": '"production"',
    },
    alias: {
      "@": path.resolve(__dirname, "src"), // Alias for "@/something"
    },
  })
  .then(() => {
    // 1. Copy swagger.json after successful build
    fs.copySync(
      path.resolve(__dirname, "src/docs/swagger.json"),
      path.resolve(__dirname, "build/docs/swagger.json")
    );
    console.log("Swagger JSON copied successfully!");

    // 2. Copy ecosystem.config.js
    fs.copySync(
      path.resolve(__dirname, "ecosystem.config.js"),
      path.resolve(__dirname, "build/ecosystem.config.js")
    );
    console.log("Ecosystem Config copied successfully!");

    // 3. Check if .env.development exists before copying
    const envPath = path.resolve(__dirname, "src/configs/.env.development");
    if (fs.existsSync(envPath)) {
      fs.copySync(
        envPath,
        path.resolve(__dirname, "build/configs/.env.local")
      );
      console.log(".env.development copied successfully!");
    } else {
      console.warn(".env.development file not found, skipping copy.");
    }
  })
  .catch((error) => {
    console.error("Build failed:", error);
    process.exit(1);
  });
