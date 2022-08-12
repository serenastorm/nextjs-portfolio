const api = {
  dev: "http://localhost:5000/api",
  prod: "https://antonettiserena-api.herokuapp.com/api",
};

export const apiUrl =
  process.env.NODE_ENV === "production" ? api.prod : api.prod;

const baseUrl = "/";
const codeSnippetsBaseUrl = `${baseUrl}snippets`;
const codeSnippetUrl = (slug: string) => `${codeSnippetsBaseUrl}/${slug}`;

export const routes = {
  home: baseUrl,
  accessibility: `${baseUrl}accessibility`,
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
