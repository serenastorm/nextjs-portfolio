import { CategoryLabels, CategoryValues } from "./types";

export const getCategory = (
  value: string
): {
  label: CategoryLabels | string;
  value: CategoryValues;
} => {
  switch (value) {
    case "accessibility":
      return { label: "Accessibility", value: "accessibility" };
    case "typescript":
      return { label: "TypeScript", value: "tsx" };
    case "javascript":
      return { label: "JavaScript", value: "js" };
    case "react":
      return { label: "React", value: "react" };
    case "html":
      return { label: "HTML", value: "html" };
    case "css":
      return { label: "CSS", value: "css" };
    case "scss":
      return { label: "SCSS", value: "scss" };
    default:
      return { label: "SCSS", value: "scss" };
  }
};
