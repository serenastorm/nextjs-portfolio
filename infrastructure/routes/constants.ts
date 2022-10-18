export const apiUrl = process.env.API_URL || "http://localhost:3000/api";

const baseUrl = "/";
const codeSnippetsBaseUrl = `${baseUrl}snippets`;
const codeSnippetUrl = (slug: string) => `${codeSnippetsBaseUrl}/${slug}`;

export const routes = {
  home: baseUrl,
  accessibility: `${baseUrl}accessibility`,
  changelog: `${baseUrl}changelog`,
  diary: `${baseUrl}fun`,
  blog: {
    snippet: {
      title: "Snippet",
      url: (slug: string = ":slug") => codeSnippetUrl(slug),
    },
    snippets: {
      title: "Snippets",
      url: codeSnippetsBaseUrl,
    },
  },
};
