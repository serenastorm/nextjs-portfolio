/** @type {import('next').NextConfig} */

import nextMdx from "@next/mdx";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { visit } from "unist-util-visit";
// import rehypeRaw from "rehype-raw";

// A regex that looks for a simplified attribute name, optionally followed
// by a double, single, or unquoted attribute value
const re = /\b([-\w]+)(?:=(?:"([^"]*)"|'([^']*)'|([^"'\s]+)))?/g;

const withMDX = nextMdx({
  extension: /\.mdx?$/,
  options: {
    // If you use remark-gfm, you'll need to use next.config.mjs
    // as the package is ESM only
    // https://github.com/remarkjs/remark-gfm#install
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      // Support stuff like ```js filename="App.js"
      function rehypeMetaAsAttributes() {
        return (tree) => {
          visit(tree, "element", (node) => {
            let match;

            let nodeIsCode = node.tagName === "code";
            let nodeIsInline = !node.properties.className;
            let nodeHasMetaAttributes =
              nodeIsCode && node.data && node.data.meta;

            if (nodeIsCode) {
              node.properties["inline"] = nodeIsInline;

              if (nodeHasMetaAttributes) {
                re.lastIndex = 0; // Reset regex.

                while ((match = re.exec(node.data.meta))) {
                  node.properties[match[1]] =
                    match[2] || match[3] || match[4] || "";
                }
              }
            }
          });
        };
      },
      rehypeHighlight,
    ],
    // If you use `MDXProvider`, uncomment the following line.
    providerImportSource: "@mdx-js/react",
  },
});

export default withMDX({
  // Append the default value with md extensions
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  reactStrictMode: true,
});
