import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

import {
  getComponentChunkLinks,
  getFontFaceStyles,
  getFontLinks,
  getIconLinks,
  getInitialStyles,
  getMetaTagsAndIconLinks,
} from "@porsche-design-system/components-react/partials";

const transformIndexHtmlPlugin = () => {
  return {
    name: "html-transform",
    transformIndexHtml(html: string) {
      const headPartials = [
        // injects stylesheet which defines visibility of pre-hydrated PDS components
        getInitialStyles(),
        // injects stylesheet which defines Porsche Next CSS font-face definition (=> minimize FOUT)
        getFontFaceStyles(),
        // preloads Porsche Next font (=> minimize FOUT)
        getFontLinks(),
        // preloads PDS component core chunk from CDN for PDS component hydration (=> improve loading performance)
        getComponentChunkLinks(),
        // preloads Porsche icons (=> minimize FOUC)
        getIconLinks(),
        // injects favicon, apple touch icons, android touch icons, etc.
        getMetaTagsAndIconLinks({ appTitle: "Porsche" }),
      ].join("");

      return html.replace(/<\/head>/, `${headPartials}$&`);
    },
  };
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), transformIndexHtmlPlugin()],
  base: "/",
  build: {
    outDir: "dist",
  },
});
