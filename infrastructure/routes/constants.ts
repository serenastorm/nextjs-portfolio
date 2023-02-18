const baseUrl = "/";
const codeSnippetsBaseUrl = `${baseUrl}snippets`;
const codeSnippetUrl = (slug: string) => `${codeSnippetsBaseUrl}/${slug}`;

export const routes = {
  home: baseUrl,
  accessibility: `${baseUrl}accessibility`,
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
