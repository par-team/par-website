import { defineConfig } from "astro/config";
import rehypeHighlight from "rehype-highlight";

import parLanguage from "./src/lib/parLanguage.js";

export default defineConfig({
  site: "https://par.run",
  output: "static",
  trailingSlash: "always",
  markdown: {
    syntaxHighlight: false,
    rehypePlugins: [
      [
        rehypeHighlight,
        {
          aliases: {
            par: ["par"],
          },
          languages: {
            par: parLanguage,
          },
        },
      ],
    ],
  },
});
