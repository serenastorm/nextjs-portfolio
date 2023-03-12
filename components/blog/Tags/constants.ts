import type { CategoryLabels, CategoryUrls } from "helpers/blog/types";
import type { SnippetColor } from "./types";

export const getTag = (
  type: string
): {
  color: SnippetColor;
  label: CategoryLabels | string;
  url: CategoryUrls | "";
} => {
  switch (type) {
    case "accessibility":
      return { color: "red", label: "Accessibility", url: "accessibility" };
    case "features":
      return { color: "pink", label: "Features", url: "" };
    case "tsx":
      return { color: "pink", label: "TypeScript", url: "typescript" };
    case "js":
      return { color: "plum", label: "JavaScript", url: "javascript" };
    case "react":
      return { color: "purple", label: "React", url: "react" };
    case "html":
      return { color: "violet", label: "HTML", url: "html" };
    case "css":
      return { color: "sky", label: "CSS", url: "css" };
    case "scss":
      return { color: "cyan", label: "SCSS", url: "scss" };
    default:
      return { color: "lime", label: type, url: "" };
  }
};
