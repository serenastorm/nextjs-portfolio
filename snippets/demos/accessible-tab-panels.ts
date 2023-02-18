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
    code: `import { useRef, useState, KeyboardEvent } from "react";
import { tabs } from "./constants";

import "./styles/styles.scss";

export default function App() {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
  const tabsRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const totalTabs = tabs.length;

  const activateTab = (newTabIndex: number) => {
    /* Focus new tab button */
    tabsRefs?.current[newTabIndex]?.focus();
    /* Set new tab as active */
    setActiveTabIndex(newTabIndex);
  };

  const onKeyPressed = (
    event: KeyboardEvent<HTMLButtonElement>,
    tabIndex: number
  ) => {
    const shouldGoToNextTab = event.key === "ArrowRight";
    const shouldGoToPreviousTab = event.key === "ArrowLeft";
    const shouldGoToFirstTab = event.key === "Home";
    const shouldGoToLastTab = event.key === "End";

    const prevTab = tabIndex - 1;
    const nextTab = tabIndex + 1;
    const lastTab = totalTabs - 1;

    if (shouldGoToNextTab) {
      if (tabIndex >= totalTabs - 1) {
        activateTab(0);
      } else {
        activateTab(nextTab);
      }
    } else if (shouldGoToPreviousTab) {
      if (tabIndex <= 0) {
        activateTab(lastTab);
      } else {
        activateTab(prevTab);
      }
    } else if (shouldGoToFirstTab) {
      activateTab(0);
    } else if (shouldGoToLastTab) {
      activateTab(lastTab);
    } else {
      return null;
    }
  };

  return (
    <div className="tabs">
      <ul role="tablist" aria-label="The Grand Budapest Hotel characters">
        {tabs.map((tab, tabIndex) => {
          const { id, label } = tab;
          return (
            <li key={\`\${id}-tab\`}>
              <button
                type="button"
                role="tab"
                aria-selected={tabIndex === activeTabIndex ? "true" : "false"}
                aria-controls={\`\${id}-tab\`}
                id={id}
                tabIndex={tabIndex === activeTabIndex ? 0 : -1}
                ref={(el: HTMLButtonElement) =>
                  (tabsRefs.current[tabIndex] = el)
                }
                onKeyDown={(event: KeyboardEvent<HTMLButtonElement>) =>
                  onKeyPressed(event, tabIndex)
                }
                onClick={() => activateTab(tabIndex)}
              >
                {label}
              </button>
            </li>
          );
        })}
      </ul>
      {tabs.map((tab, tabIndex) => {
        const { id, content } = tab;
        return (
          <div
            tabIndex={0}
            role="tabpanel"
            id={\`\${id}-tab\`}
            key={\`\${id}-panel\`}
            aria-labelledby={id}
            className={tabIndex === activeTabIndex ? "" : "isHidden"}
          >
            <p>{content}</p>
          </div>
        );
      })}
    </div>
  );
}
`,
  },
  "styles/styles.scss": {
    hidden: true,
    code: `@import "demo.scss";
@import "additional-styles.scss";`,
  },
  "styles/additional-styles.scss": {
    hidden: true,
    code: `/* These styles are for presentation purposes only,
they're not required for the component to work */

@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500&display=swap");

html,
body {
  width: 100%;
  min-height: 100%;
  padding: 0;
  margin: 0;
}

html {
  background: #E0EAFC;  /* fallback */
  background: -webkit-linear-gradient(to right, #CFDEF3, #E0EAFC);
  background: linear-gradient(to right, #CFDEF3, #E0EAFC);
}

#root {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5vh 5vw;
}

.tabs {
  width: 100%;
  max-width: 40em;
  font-family: "IBM Plex Sans", sans-serif;
}

[role="tab"] {
  border-radius: 0.2rem 0.2rem 0 0;

  /* Add top border */
  &:hover::before,
  &:focus::before,
  &[aria-selected="true"]::before {
    border-radius: 0.2rem 0.2rem 0 0;
  }
}

[role="tabpanel"] {
  border-radius: 0 0.2rem 0.2rem 0.2rem;

  p {
    margin: 0;
    line-height: 150%;
  }

  * + p {
    margin-top: 1em;
  }
}`,
  },
  "styles/demo.scss": {
    code: `$primary: #006adc;
$primary-light: rgba(0, 106, 220, 0.15);
$tab-bg: rgba(255, 255, 255, 0.65);

[role="tab"] {
  position: relative;
  padding: 0.5rem 1rem;

  /* Reset button styles */
  border: none;
  font-family: inherit;
  font-size: inherit;
  background-color: rgba(255, 255, 255, 0.3);

  /* Active tab button */
  &[aria-selected="true"] {
    background-color: $tab-bg;
    font-weight: 500;
  }

  /* Remove default focus styles */
  &:focus,
  &:active {
    outline: 0;
  }

  /* Add top border */
  &:hover::before,
  &:focus::before,
  &[aria-selected="true"]::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    border-top: 3px solid $primary;
  }

  /* Inactive tabs */
  &[aria-selected="false"] {
    &:hover,
    &:focus {
    background-color: $primary-light;
    color: $primary;
    cursor: pointer;
  }
 }
}

[role="tabpanel"] {
  position: relative;
  z-index: 2;
  padding: 1rem;
  background-color: $tab-bg;

  /* Hide tab panel when inacttive */
  &.isHidden {
    display: none;
  }
}

[role="tablist"] {
  list-style-type: none;
  margin: 0;
  padding: 0;

  li {
    display: inline;
  }
}`,
  },
  "constants.ts": {
    code: `export const tabs = [
  {
    id: "gustave",
    label: "Monsieur Gustave",
    content:
      "Monsieur Gustave holds the position of concierge at the Grand Budapest Hotel. He makes sure everyone on staff is doing their duty, and all the guests are enjoying themselves to the utmost of comfort. Monsieur Gustave makes an inspirational speech in front of the breakfasting hotel staffs every morning but the speech is usually end up as reading a poetry."
  },
  {
    id: "henckels",
    label: "Henckels",
    content:
      "Henckels was captain of the Lutz border patrol and friend of Monsieur Gustave. He was responsible for recapturing him when he escaped prison. Henckels is presumed to be dead at the end of the film after the card he used to save Zero was torn up. As a child, he visited the hotel and remembers Monsieur Gustave, which gives him a certain fondness for the dutiful concierge."
  },
  {
    id: "serge",
    label: "Serge",
    content:
      "Serge is the chief male servant of a Desgoffe-und-Taxis household who has charge of other employees, receives guests, directs the serving of meals, and performs various personal services. He accuses Monsieur Gustave of murdering Madame D., because of Dmitri's pressure and threatening."
  }
];`,
  },
};

export default files;
