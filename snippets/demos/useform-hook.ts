const files = {
  "index.tsx": {
    hidden: true,
    code: `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import Form from "./Form";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);

root.render(
  <StrictMode>
    <Form />
  </StrictMode>
);
`,
  },
  "Form.tsx": {
    active: true,
    code: `import "./styles.css";

import { useForm } from "./hooks/useForm";

type FormDataType = {
  fullName: string;
  birthYear: number;
};

const initialData: FormDataType = {
  fullName: "John Doe",
  birthYear: 1990
};

export default function Form() {
  const { formData, updateFormField } = useForm<FormDataType>(initialData);

  return (
    <form>
      <label htmlFor="fullName">Full name</label>
      <input
        type="text"
        name="fullName"
        autoComplete="name"
        value={formData.fullName}
        onChange={(e) => updateFormField(e)}
        required
      />
      <label htmlFor="birthYear">Birth year</label>
      <input
        type="number"
        name="birthYear"
        autoComplete="bday-year"
        value={formData.birthYear}
        onChange={(e) => updateFormField(e)}
        required
      />
      <input type="submit" value="Submit" />
      <output name="result" htmlFor="fullName birthYear">
        {JSON.stringify(formData)}
      </output>
    </form>
  );
}
`,
  },
  "styles.css": {
    hidden: true,
    code: `/* These styles are for presentation purposes only,
they’re not required for the component to work  */

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

form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: min(90vw, 40rem);
}

label {
  font-weight: 500;
}

input {
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 1.6rem;
  line-height: 180%;
  border-radius: 4px;
  border: none;
  padding: 4px 6px;
}

input[type="submit"] {
  background-color: var(--primary);
  color: var(--white);
}
`,
  },
  "hooks/useForm.ts": {
    code: `import { useReducer } from "react";
import type { ChangeEvent } from "react";

type Action = {
  type: "UPDATE";
  field: string;
  inputType?: string;
  value: string;
};

export function useForm<FormData>(
  initialState: FormData
): {
  formData: FormData;
  updateFormField: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
} {
  function reducer(state: FormData, action: Action) {
    switch (action.type) {
      case "UPDATE":
        return {
          ...state,
          [action.field]:
            action.inputType === "number"
              ? parseInt(action.value)
              : action.value
        };
      default:
        return state;
    }
  }

  const [formData, dispatch] = useReducer(reducer, initialState);

  const updateFormField = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch({
      type: "UPDATE",
      inputType: e.target.type,
      value: e.target.value,
      field: e.target.name
    });
  };

  return { formData, updateFormField };
}

`,
  },
};

export default files;
