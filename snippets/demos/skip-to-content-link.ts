const files = {
  "index.tsx": {
    hidden: true,
    code: `import { render } from "react-dom";

import App from "./App";

const rootElement = document.getElementById("root");
render(<App />, rootElement);`,
  },
  "App.tsx": {
    active: true,
    code: `import { Toaster } from "react-hot-toast";
import { Navigation } from "./components/Navigation";
import { useDemoProps } from "./hooks/useDemoProps";

import "./styles/styles.scss";

export default function App() {
  const { demoLinkProps, demoTriggerProps } = useDemoProps();

  return (
    <>
      <a
        id="skiptocontent"
        href="#mainContent"
        // The following props are for demo purposes only
        // DO NOT copy the following line
        {...demoLinkProps}
      >
        Skip to main content
      </a>
      <Navigation />
      <main id="mainContent">
        <h1>Main content</h1>
        <p>
          Use your keyboard's <kbd>Tab</kbd> key to show or hide the skip
          navigation button. You might be running into some issues with the tab
          order since this demo is in an iframe.
          <button {...demoTriggerProps}>
            Click here to manually trigger focus on the button.
          </button>
        </p>
        <p>
          If you press your keyboard's enter key while the button is focused, it
          will move focus to the main content and ignore the nav links above.
        </p>
        <Toaster />
      </main>
    </>
  );
}`,
  },
  "styles/styles.scss": {
    hidden: true,
    code: `@import "demo.scss";
@import "additional-styles.scss";`,
  },
  "styles/additional-styles.scss": {
    hidden: true,
    code: `/* These styles are for presentation purposes only,
they’re not required for the component to work */

@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Inconsolata:wght@400;500&display=swap");

$nav-gap: 8px;

html,
body {
  width: 100%;
  min-height: 100%;
  padding: 0;
  margin: 0;
}

#skiptocontent {
  padding: 0.4rem 0.8rem;
  font-weight: 400;
  font-size: 1em;
  line-height: 140%;
  color: #f5f7fb;
  background-color: #ed5497;
  border-bottom-right-radius: 6px;
  text-decoration: none;

  &:focus {
    outline: none;
  }
}

h1,
p,
a,
li {
  font-family: "IBM Plex Sans", sans-serif;
  line-height: 160%;
}

nav {
  width: 100%;
  padding: 4px 16px;
  background-color: #f5f7fb;
}

ul {
  display: flex;
  flex-wrap: wrap;
  gap: $nav-gap;
  list-style-type: none;
  padding: 0;

  li + li {
    position: relative;

    &:before {
      content: "|";
      display: inline-block;
      margin-right: $nav-gap;
    }
  }
}

button,
ul li a {
  color: #cd1d8d;
  text-decoration: none;
  border-bottom: 2px solid transparent;

  &:focus,
  &:focus-visible,
  &:hover {
    background-color: #fce5f3;
    border-bottom-color: #cd1d8d;
    outline: none;
  }
}

button {
  border-left-width: 0;
  border-right-width: 0;
  border-top-width: 0;
  font-family: "IBM Plex Sans", sans-serif;
  cursor: pointer;
  font-size: 1em;
  background-color: transparent;
}

main {
  padding: 16px;
}

.toast {
  font-family: "IBM Plex Sans", sans-serif;
  line-height: 140%;
}

kbd {
  font-family: "Inconsolata", monospace;
  font-weight: 500;
  background-color: #f5f7fb;
  padding: 0 4px;
  border-radius: 2px;
}`,
  },
  "styles/demo.scss": {
    code: `#skiptocontent {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 200;
  transition: all 250ms ease-out;
  transform: translateY(-100%);
  opacity: 0;

  &:focus {
    transform: translateY(0);
    opacity: 1;
  }
}`,
  },
  "hooks/useDemoProps.ts": {
    hidden: true,
    code: `/* PLEASE READ: These props are for demo purposes
only and should NOT be used in your actual code */

import { useRef } from "react";
import toast from "react-hot-toast";

export const useDemoProps = () => {
  const skipToContentRef = useRef<HTMLAnchorElement | null>(null);

  const notify = () =>
    toast.success(
      "Success! Your keyboard focus is now within the main content area.",
      {
        duration: 4000,
        position: "top-right",
        iconTheme: {
          primary: "#CD1D8D",
          secondary: "#fff",
        },
        className: "toast",
      }
    );

  const triggerFocus = () => {
    if (skipToContentRef?.current) {
      skipToContentRef.current.focus();
    }
  };

  return {
    demoLinkProps: {
      ref: skipToContentRef,
      onClick: () => notify(),
    },
    demoTriggerProps: { onClick: () => triggerFocus() },
  };
};`,
  },
  "components/Navigation.tsx": {
    hidden: true,
    code: `export const Navigation = () => {
return (
  <nav>
    <ul>
      <li>
        <a href="/">Nav link 1</a>
      </li>
      <li>
        <a href="/">Nav link 2</a>
      </li>
      <li>
        <a href="/">Nav link 3</a>
      </li>
    </ul>
  </nav>
);
};`,
  },
};

export default files;
