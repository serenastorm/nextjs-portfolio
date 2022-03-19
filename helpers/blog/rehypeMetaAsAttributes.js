import { visit } from "unist-util-visit";

// A regex that looks for a simplified attribute name, optionally followed
// by a double, single, or unquoted attribute value
const re = /\b([-\w]+)(?:=(?:"([^"]*)"|'([^']*)'|([^"'\s]+)))?/g;

/** @type {import('unified').Plugin<Array<void>, import('hast').Root>} */
export const rehypeMetaAsAttributes = () => {
  return (tree) => {
    visit(tree, "element", (node) => {
      let match;

      if (node.tagName === "code" && node.data && node.data.meta) {
        re.lastIndex = 0; // Reset regex.

        while ((match = re.exec(node.data.meta))) {
          node.properties[match[1]] = match[2] || match[3] || match[4] || "";
        }
      }
    });
  };
};
