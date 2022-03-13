/** @type {import('unified').Plugin<Array<void>, import('hast').Root>} */

import { visit } from "unist-util-visit";

const rehypeMetaAsAttributes = () => {
  return (tree) => {
    visit(tree, "element", (node) => {
      if (node.tagName === "code" && node.data && node.data.meta) {
        node.properties.metastring = node.data.meta;
      }
    });
  };
};

export default rehypeMetaAsAttributes;
