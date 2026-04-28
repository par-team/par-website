// Synced from par-lang/docs/par-theme/highlight.js.
// Keep this grammar close to the mdBook highlighter until Par has a shared package for it.
export default function parLanguage(hljs) {
  return {
    name: "Par",
    aliases: ["par"],
    keywords: {
      keyword:
        "dec def type chan dual let do in case begin unfounded loop module import as export either choice recursive iterative self box data number signed catch try throw default else if is and or not neg poll repoll submit external",
      literal: "",
    },
    illegal: "",
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.COMMENT("/\\*", "\\*/", { contains: ["self"] }),
      {
        className: "string",
        begin: /"(.|\n)*?"/,
      },
      {
        className: "string",
        begin: /`(\\[\s\S]|[^`\\])*`/,
      },
      {
        className: "type",
        begin: /\b[A-Z][a-zA-Z0-9_]*/,
      },
      {
        className: "number",
        begin: /-?\b\d[_\d]*(?:\.\d[_\d]*)?(?:[eE][+-]?\d[_\d]*)?\b/,
      },
    ],
  };
}
