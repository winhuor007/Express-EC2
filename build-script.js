const esbuild = require("esbuild");
const path = require("path");
const fs = require("fs-extra");
const copy = require("esbuild-plugin-copy").default;

esbuild
  .build({
    entryPoints: ["src/server.ts"],
    bundle: true,
    platform: "node",
    target: "node20",
    outdir: "build",
    external: ["express"],
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
          to: ["./"],
        },
      }),
      {
        name: "log-success-after-copy",
        setup(build) {
          build.onEnd(() => {
            console.log("Assets copied successfully");
          });
        },
      },
    ],
    resolveExtensions: [".ts", ".js"],
    define: {
      "process.env.NODE_ENV": '"production"',
    },
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  })
  .then(() => {
    // Correctly handle file copying
    fs.copySync(
      path.resolve(__dirname, "src/docs/swagger.json"),
      path.resolve(__dirname, "build/docs/swagger.json")
    );
    console.log("Swagger JSON copied successfully!");

    fs.copySync(
      path.resolve(__dirname, "ecosystem.config.js"),
      path.resolve(__dirname, "build/ecosystem.config.js")
    );
    console.log("Ecosystem Config copied successfully!");

    const envFilePath = path.resolve(__dirname, "src/configs/.env.development");
    if (fs.existsSync(envFilePath)) {
      fs.copySync(
        envFilePath,
        path.resolve(__dirname, "build/configs/.env.production")
      );
      console.log("Environment file copied successfully!");
    } else {
      console.error("Environment file does not exist:", envFilePath);
    }

    fs.copySync(
      path.resolve(__dirname, "package.json"),
      path.resolve(__dirname, "build/package.json")
    );
    console.log("Package.json copied successfully!");
  })
  .catch((error) => {
    console.error("Build failed:", error);
    process.exit(1);
  });
