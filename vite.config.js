import { defineConfig } from "vite";
import viteImagemin from "vite-plugin-imagemin";
import { createHtmlPlugin } from "vite-plugin-html";

export default defineConfig({
  base: "./",
  build: {
    outDir: "Tyseca",
    minify: "terser",
  },
  plugins: [
    createHtmlPlugin({
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
        minifyCSS: true,
        minifyJS: true,
        ignoreCustomComments: [/^!/],
      },
    }),
    viteImagemin({
      gifsicle: { optimizationLevel: 7 },
      optipng: { optimizationLevel: 7 },
      mozjpeg: { quality: 80 },
      pngquant: { quality: [0.8, 0.9], speed: 4 },
      svgo: {
        plugins: [
          { name: "removeViewBox" },
          { name: "removeEmptyAttrs", active: false },
        ],
      },
      webp: { quality: 80 },
    }),
  ],
});
