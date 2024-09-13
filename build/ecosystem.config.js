// module.exports = {
//   apps: [
//     {
//       name: "product-service",
//       script: "server.js",
//       instances: 1,
//       autorestart: true,
//       watch: false,
//       max_memory_restart: "1G",
//     },
//   ],
// };

module.exports = {
  apps: [
    {
      name: "product-service",
      script: "./build/server.js", // or wherever your server entry point is located
      watch: true,
      env: {
        NODE_ENV: "development",
        PORT: 3000, // Or your configured port
      },
    },
  ],
};
