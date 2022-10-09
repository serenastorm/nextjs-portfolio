import { SandpackTheme } from "@codesandbox/sandpack-react";

export const sandpackTheme: SandpackTheme = {
  colors: {
    surface1: "#282a36", // code-bg-color
    surface2: "#e4e7eb", // border
    surface3: "rgba(0, 0, 0, 0.6)", // hover background
    disabled: "#856b6b", // text-light
    base: "#856b6b", // text-light
    clickable: "#f8f8f2", // code
    hover: "#ffffff",
    accent: "#8ae8fc", // code-blue
  },
  syntax: {
    plain: "#f8f8f2", // code
    comment: { color: "#6272a4", fontStyle: "normal" },
    keyword: "#8ae8fc", // code-blue
    tag: { color: "#ffb86c", fontWeight: "600" }, // code-orange
    punctuation: "#f8f8f2", // code
    definition: "#4ff67a", // code-green 
    property: { color: "#4ff67a", fontWeight: "600" }, // code-green
    static: "#ff79c6", // code-pink
    string: "#f1fa8c", // code-yellow
  },
  // Light mode
  //   colors: {
  //     surface1: "#f8f9fb", // background
  //     surface2: "#e4e7eb", // border
  //     surface3: "rgba(228, 231, 235, 0.7)", // hover background
  //     disabled: "#856b6b", // text-light
  //     base: "#856b6b", // text-light
  //     clickable: "#856b6b", // text-light
  //     hover: "#1f2933",
  //     accent: "#ed5497", // code-pink
  //   },
  //   syntax: {
  //     plain: "#5e5252", // text
  //     comment: { color: "#757678", fontStyle: "italic" },
  //     keyword: "#cd2b31", // red
  //     tag: "#ed5497",
  //     punctuation: "#5e5252", // text
  //     definition: "#793aaf", // purple
  //     property: "#0c7792", // cyan
  //     static: "#c64f9c", // pink
  //     string: "#0078a1", // sky
  //   },
  font: {
    body: '""IBM Plex Sans"", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    mono: '"Inconsolata", "Lucida Console", monospace',
    size: "1.34rem",
    lineHeight: "1.5",
  },
};
