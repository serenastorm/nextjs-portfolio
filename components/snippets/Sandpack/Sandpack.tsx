import { SandpackSetup } from "@codesandbox/sandpack-react";
import { SandpackWrapper } from "./SandpackWrapper";
import { CodeSnippetProps } from "./types";

const Sandpack = ({
  markdown,
  setup,
}: {
  markdown: string;
  setup: SandpackSetup;
}) => {
  /* This is definitely not the best code I've written 
  Basically using @mdx-js to compile and run the markdown
  renders a single child which doesn't work with our
  SandpackWrapper component so we need to manually separate
  our code files 
  The only libraries that current work with remote .mdx 
  files are all for NextJS so migrating would be a more
  elegant solution but a bit overkill for now */

  const preTags = markdown
    .split("```")
    ?.filter((tag) => !!tag && tag !== "\n\n" && tag !== "\n");

  const preTagsObjectArray = (): CodeSnippetProps[] => {
    let result: CodeSnippetProps[] = [];

    for (let i = 0; i < preTags.length; i++) {
      const preTag = preTags[i];
      const firstLine: string[] = preTag.match(/^.*$/m) || [];
      const metastring = firstLine[0]?.match(/meta:/)
        ? firstLine[0].slice("meta:".length)
        : null;

      if (metastring) {
        const [language, name, ...params] = metastring.split(" ");
        const hidden = metastring.includes("hidden");
        const active = metastring.includes("active");
        const filePath = "/" + name;

        result.push({
          language,
          metastring,
          hidden,
          active,
          filePath,
          code: preTag.substring(preTag.indexOf("\n") + 1),
        });
      } else {
        console.log(`metastring not found for code block ${preTag}`);
      }
    }
    return result;
  };

  return <SandpackWrapper setup={setup} codeSnippets={preTagsObjectArray()} />;
};

export default Sandpack;
