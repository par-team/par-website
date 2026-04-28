import hljs from "highlight.js/lib/core";

import parLanguage from "./parLanguage.js";

hljs.registerLanguage("par", parLanguage);

export function highlightPar(source) {
  return hljs.highlight(source, { language: "par" }).value;
}
