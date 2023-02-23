const files = {
  "index.tsx": {
    hidden: true,
    code: `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
`,
  },
  "App.tsx": {
    code: `import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import Search from "./Search";

import "./styles.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/search",
    element: <Search />
  }
]);

export default function App() {
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
}

  `,
  },
  "Home.tsx": {
    active: true,
    code: `export default function Home() {
  return (
    <form role="search" action="/search">
      <input aria-label="Search articles" type="search" name="q" required />
      <input type="submit" value="Search" />
    </form>
  );
}
`,
  },
  "Search.tsx": {
    code: `import { useSearchParams } from "react-router-dom";

export default function Search() {
  let [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  return <p>Showing results for: {query}</p>;
}
`,
  },
  "styles.css": {
    code: `/* These styles are for presentation purposes only,
they're not required for the component to work  */

@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Inconsolata:wght@400;500&display=swap");

:root {
  --bg: #e0eafc;
  --white: #fff;
  --text: #5e5252;
  --text-hover: #403434;
  --primary: #c64f9c;
}

html {
  font-size: 62.5%;
}

html,
body {
  width: 100%;
  min-height: 100%;
  padding: 0;
  margin: 0;
}

body {
  background-color: var(--bg);
  color: var(--text);
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 1.6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#root {
  padding: 10vmin;
}

input {
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 1.6rem;
  line-height: 180%;
  border-radius: 2px;
  border: none;
}

input[type="search"] {
}

input[type="submit"] {
  background-color: var(--primary);
  color: var(--white);
}

form {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
`,
  },
};

export default files;
