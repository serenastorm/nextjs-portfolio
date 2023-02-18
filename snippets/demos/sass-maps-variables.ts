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
    code: `import "./styles/styles.scss";

export default function App() {
  return (
    <main>
      <ul className="button-group">
        <li>
          <button className="button-primary">Primary</button>
        </li>
        <li>
          <button className="button-secondary">Secondary</button>
        </li>
      </ul>
    </main>
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

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  background: white;
  border-radius: 8px;
  padding: 8px;
}

ul, li {
  list-style-type: none;
}

button {
  border-radius: 4px;
  border: none;
  color: white;
  cursor: pointer;
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 1em;
  padding: 6px 12px;

  @media (prefers-reduced-motion: no-preference) {
    transition: all 0.1s ease-in;
  }
}`,
  },
  "styles/theme.scss": {
    code: `/* Let's create our map */
$brand-colors: (
  "primary": (
    10: #fbeff7,
    20: #f8e6f2,
    30: #f4d9eb,
    40: #ecc8e0,
    50: #e2b1d2,
    60: #d793c0,
    70: #c64f9c,
    80: #c14394,
    90: #bd368a,
    100: #360f29,
  ),
  "secondary": (
    10: #f4f2fe,
    20: #ece9fc,
    30: #e3dffa,
    40: #d6d0f6,
    50: #c1b9ef,
    60: #a69ce6,
    70: #685bc8,
    80: #5f54ba,
    90: #524ba9,
    100: #1d1648,
  ),
);`,
  },
  "styles/demo.scss": {
    code: `/* Import the map */
@import "theme.scss";

:root {
  @each $shade, $values in $brand-colors {
    @each $name, $hex in $values {
      /* Generate variable for each value
      ex: --brand-primary-10: #fbeff7; */
      --brand-#{$shade}-#{$name}: #{$hex};
    }
  }
}

/* We also want to generate our button styles */
@each $variant, $values in $brand-colors {
  .button-#{$variant} {
    /* The colours in our palette are designed
    for white foregroup text from step 70
    so we should use --brand-primary-70 */
    background-color: var(--brand-#{$variant}-70);

    &:hover {
      /* On hover, use a darker value */
      background-color: var(--brand-#{$variant}-90);
    }
  }
}`,
  },
};

export default files;
