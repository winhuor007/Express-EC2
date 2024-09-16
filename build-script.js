const esbuild = require('esbuild');
const path = require('path');
const fs = require('fs-extra');
const copy = require('esbuild-plugin-copy').default;

esbuild.build({
  entryPoints: ['src/server.ts'],
  bundle: true,
  platform: 'node',
  target: 'node20',  // Adjust to your environment
  outdir: 'build',
  external: ['express'],  // Specify external packages like express
  loader: {
    '.ts': 'ts',
    '.json': 'json',  // Add loader for JSON files
  },
  plugins: [
    // Copy Swagger UI assets
    copy({
      assets: {
        from: [
          '../node_modules/swagger-ui-dist/*.css',
          '../node_modules/swagger-ui-dist/*.js',
          '../node_modules/swagger-ui-dist/*.png'
        ],
        to: ['./']
      }
    })
  ],
  resolveExtensions: ['.ts', '.js'],
  define: {
    'process.env.NODE_ENV': '"production"',  // Set environment variable for production
  },
  alias: {
    '@': path.resolve(__dirname, '.'),  // Alias for imports like '@/something'
  }
}).then(() => {
  // Copy swagger.json after the build is successful
  fs.copySync(
    path.resolve(__dirname, 'src/docs/swagger.json'),
    path.resolve(__dirname, 'build/docs/swagger.json')
  );
  console.log('Swagger JSON copied successfully!');
}).catch(error => {
  console.error('Build failed:', error);
  process.exit(1);
});
