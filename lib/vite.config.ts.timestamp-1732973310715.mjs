// vite.config.ts
import vueJsx from "file:///E:/github/color-gradient-picker-vue3/node_modules/.pnpm/@vitejs+plugin-vue-jsx@3.0.1_vite@4.0.0_@types+node@18.15.11_sass@1.61.0_terser@5.18.1__vue@3.2.47/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import vue from "file:///E:/github/color-gradient-picker-vue3/node_modules/.pnpm/@vitejs+plugin-vue@4.0.0_vite@4.0.0_@types+node@18.15.11_sass@1.61.0_terser@5.18.1__vue@3.2.47/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import * as path from "path";
import VueSetupExtend from "file:///E:/github/color-gradient-picker-vue3/node_modules/.pnpm/vite-plugin-vue-setup-extend@0.4.0_vite@4.0.0_@types+node@18.15.11_sass@1.61.0_terser@5.18.1_/node_modules/vite-plugin-vue-setup-extend/dist/index.mjs";
import AutoImport from "file:///E:/github/color-gradient-picker-vue3/node_modules/.pnpm/unplugin-auto-import@0.16.6_@vueuse+core@9.13.0_vue@3.2.47__rollup@3.29.3/node_modules/unplugin-auto-import/dist/vite.js";
import UnoCSS from "file:///E:/github/color-gradient-picker-vue3/node_modules/.pnpm/unocss@0.56.5_postcss@8.4.30_rollup@3.29.3_vite@4.0.0_@types+node@20.4.7_sass@1.61.0_terser@5.18.1_/node_modules/unocss/dist/vite.mjs";
import { visualizer } from "file:///E:/github/color-gradient-picker-vue3/node_modules/.pnpm/rollup-plugin-visualizer@5.9.2_rollup@3.29.3/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
var __vite_injected_original_dirname = "E:\\github\\color-gradient-picker-vue3\\lib";
var vite_config_default = ({ command }) => {
  return {
    plugins: [
      vue(),
      vueJsx(),
      UnoCSS(),
      VueSetupExtend(),
      AutoImport({
        imports: ["vue"],
        eslintrc: {
          enabled: true
        }
      }),
      visualizer()
    ],
    resolve: {
      alias: {
        "@": path.resolve(__vite_injected_original_dirname, "src")
      },
      extensions: [
        ".ts",
        ".tsx",
        ".js",
        ".mjs",
        ".vue",
        ".json",
        ".less",
        ".css",
        ".scss"
      ]
    },
    server: {
      port: 3e3
    },
    build: {
      target: "es2015",
      outDir: "dist",
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      },
      lib: {
        entry: path.resolve(__vite_injected_original_dirname, "./index.ts"),
        name: "color-gradient-picker-vue3",
        fileName: (format) => `color-gradient-picker-vue3.${format}.js`
      },
      rollupOptions: {
        external: ["vue"],
        output: {
          globals: {
            vue: "Vue"
          }
        }
      }
    }
  };
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxnaXRodWJcXFxcY29sb3ItZ3JhZGllbnQtcGlja2VyLXZ1ZTNcXFxcbGliXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxnaXRodWJcXFxcY29sb3ItZ3JhZGllbnQtcGlja2VyLXZ1ZTNcXFxcbGliXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9naXRodWIvY29sb3ItZ3JhZGllbnQtcGlja2VyLXZ1ZTMvbGliL3ZpdGUuY29uZmlnLnRzXCI7LypcclxuICogQEF1dGhvcjogSnVuZVxyXG4gKiBARGVzY3JpcHRpb246XHJcbiAqIEBEYXRlOiAyMDIzLTA0LTExIDExOjE3OjM1XHJcbiAqIEBMYXN0RWRpdG9yczogSnVuZVxyXG4gKiBATGFzdEVkaXRUaW1lOiAyMDI0LTExLTMwIDIxOjI4OjE5XHJcbiAqL1xyXG5pbXBvcnQgdHlwZSB7IENvbmZpZ0VudiwgVXNlckNvbmZpZ0V4cG9ydCB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCB2dWVKc3ggZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlLWpzeCdcclxuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXHJcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCdcclxuaW1wb3J0IFZ1ZVNldHVwRXh0ZW5kIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1zZXR1cC1leHRlbmQnXHJcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXHJcbmltcG9ydCBVbm9DU1MgZnJvbSAndW5vY3NzL3ZpdGUnXHJcbmltcG9ydCB7IHZpc3VhbGl6ZXIgfSBmcm9tICdyb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXInXHJcblxyXG5leHBvcnQgZGVmYXVsdCAoeyBjb21tYW5kIH06IENvbmZpZ0Vudik6IFVzZXJDb25maWdFeHBvcnQgPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICBwbHVnaW5zOiBbXHJcbiAgICAgIHZ1ZSgpLFxyXG4gICAgICB2dWVKc3goKSxcclxuICAgICAgVW5vQ1NTKCksXHJcbiAgICAgIFZ1ZVNldHVwRXh0ZW5kKCksXHJcbiAgICAgIEF1dG9JbXBvcnQoe1xyXG4gICAgICAgIGltcG9ydHM6IFsndnVlJ10sXHJcbiAgICAgICAgZXNsaW50cmM6IHtcclxuICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSksXHJcbiAgICAgIHZpc3VhbGl6ZXIoKSxcclxuICAgIF0sXHJcbiAgICByZXNvbHZlOiB7XHJcbiAgICAgIGFsaWFzOiB7XHJcbiAgICAgICAgJ0AnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjJyksXHJcbiAgICAgIH0sXHJcbiAgICAgIGV4dGVuc2lvbnM6IFtcclxuICAgICAgICAnLnRzJyxcclxuICAgICAgICAnLnRzeCcsXHJcbiAgICAgICAgJy5qcycsXHJcbiAgICAgICAgJy5tanMnLFxyXG4gICAgICAgICcudnVlJyxcclxuICAgICAgICAnLmpzb24nLFxyXG4gICAgICAgICcubGVzcycsXHJcbiAgICAgICAgJy5jc3MnLFxyXG4gICAgICAgICcuc2NzcycsXHJcbiAgICAgIF0sXHJcbiAgICB9LFxyXG4gICAgc2VydmVyOiB7XHJcbiAgICAgIHBvcnQ6IDMwMDAsXHJcbiAgICB9LFxyXG4gICAgYnVpbGQ6IHtcclxuICAgICAgdGFyZ2V0OiAnZXMyMDE1JyxcclxuICAgICAgb3V0RGlyOiAnZGlzdCcsXHJcbiAgICAgIG1pbmlmeTogJ3RlcnNlcicsXHJcbiAgICAgIHRlcnNlck9wdGlvbnM6IHtcclxuICAgICAgICBjb21wcmVzczoge1xyXG4gICAgICAgICAgZHJvcF9jb25zb2xlOiB0cnVlLFxyXG4gICAgICAgICAgZHJvcF9kZWJ1Z2dlcjogdHJ1ZSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgICBsaWI6IHtcclxuICAgICAgICBlbnRyeTogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vaW5kZXgudHMnKSxcclxuICAgICAgICBuYW1lOiAnY29sb3ItZ3JhZGllbnQtcGlja2VyLXZ1ZTMnLFxyXG4gICAgICAgIGZpbGVOYW1lOiAoZm9ybWF0KSA9PiBgY29sb3ItZ3JhZGllbnQtcGlja2VyLXZ1ZTMuJHtmb3JtYXR9LmpzYCxcclxuICAgICAgfSxcclxuICAgICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICAgIGV4dGVybmFsOiBbJ3Z1ZSddLFxyXG4gICAgICAgIG91dHB1dDoge1xyXG4gICAgICAgICAgZ2xvYmFsczoge1xyXG4gICAgICAgICAgICB2dWU6ICdWdWUnLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9XHJcbn1cclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQVFBLE9BQU8sWUFBWTtBQUNuQixPQUFPLFNBQVM7QUFDaEIsWUFBWSxVQUFVO0FBQ3RCLE9BQU8sb0JBQW9CO0FBQzNCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sWUFBWTtBQUNuQixTQUFTLGtCQUFrQjtBQWQzQixJQUFNLG1DQUFtQztBQWdCekMsSUFBTyxzQkFBUSxDQUFDLEVBQUUsUUFBUSxNQUFtQztBQUMzRCxTQUFPO0FBQUEsSUFDTCxTQUFTO0FBQUEsTUFDUCxJQUFJO0FBQUEsTUFDSixPQUFPO0FBQUEsTUFDUCxPQUFPO0FBQUEsTUFDUCxlQUFlO0FBQUEsTUFDZixXQUFXO0FBQUEsUUFDVCxTQUFTLENBQUMsS0FBSztBQUFBLFFBQ2YsVUFBVTtBQUFBLFVBQ1IsU0FBUztBQUFBLFFBQ1g7QUFBQSxNQUNGLENBQUM7QUFBQSxNQUNELFdBQVc7QUFBQSxJQUNiO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxPQUFPO0FBQUEsUUFDTCxLQUFVLGFBQVEsa0NBQVcsS0FBSztBQUFBLE1BQ3BDO0FBQUEsTUFDQSxZQUFZO0FBQUEsUUFDVjtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFFBQVE7QUFBQSxNQUNOLE1BQU07QUFBQSxJQUNSO0FBQUEsSUFDQSxPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUEsTUFDUixRQUFRO0FBQUEsTUFDUixRQUFRO0FBQUEsTUFDUixlQUFlO0FBQUEsUUFDYixVQUFVO0FBQUEsVUFDUixjQUFjO0FBQUEsVUFDZCxlQUFlO0FBQUEsUUFDakI7QUFBQSxNQUNGO0FBQUEsTUFDQSxLQUFLO0FBQUEsUUFDSCxPQUFZLGFBQVEsa0NBQVcsWUFBWTtBQUFBLFFBQzNDLE1BQU07QUFBQSxRQUNOLFVBQVUsQ0FBQyxXQUFXLDhCQUE4QjtBQUFBLE1BQ3REO0FBQUEsTUFDQSxlQUFlO0FBQUEsUUFDYixVQUFVLENBQUMsS0FBSztBQUFBLFFBQ2hCLFFBQVE7QUFBQSxVQUNOLFNBQVM7QUFBQSxZQUNQLEtBQUs7QUFBQSxVQUNQO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGOyIsCiAgIm5hbWVzIjogW10KfQo=
