const files = {
  "index.tsx": {
    hidden: true,
    code: `import { render } from "react-dom";

import Form from "./Form";

const rootElement = document.getElementById("root");
render(<Form />, rootElement)`,
  },
  "Form.tsx": {
    active: true,
    code: `import { useState } from "react";
    import Checkbox from "./components/Checkbox";
    import { formSchema } from "./validation/FormValidationSchema";
    
    import type { FormEvent } from "react";
    
    import "./styles/styles.scss";
    
    const ALL_HOBBIES = ["Hiking", "Reading", "Sleeping", "Coding"] as const;
    type Hobby = typeof ALL_HOBBIES[number];
    
    export default function Form() {
      const [selectedHobbies, setSelectedHobbies] = useState<Hobby[]>([]);
      const [checkboxError, setCheckboxError] = useState<string>("");
    
      const onFieldChange = async (fieldValue: Hobby) => {
        const updatedHobbies = selectedHobbies.includes(fieldValue)
          ? selectedHobbies.filter((selectedHobby) => selectedHobby !== fieldValue)
          : [...selectedHobbies, fieldValue];
    
        setSelectedHobbies(updatedHobbies);
    
        // Check if the form is valid now that the values have changed
        const isFormValid = await formSchema.isValid(
          { hobbies: updatedHobbies },
          {
            abortEarly: false // Prevent aborting validation after first error
          }
        );
    
        // Remove checkbox error if needed
        if (checkboxError && isFormValid) {
          setCheckboxError("");
        }
      };
    
      const submitForm = async (e: FormEvent) => {
        e.preventDefault();
    
        const isFormValid = await formSchema.isValid(
          { hobbies: selectedHobbies },
          {
            abortEarly: false
          }
        );
    
        if (isFormValid) {
          alert("Success!");
        } else {
          // If the form is invalid, check which fields are incorrect
          // In our case, it can only be the "hobbies" field
          formSchema
            .validate({ hobbies: selectedHobbies }, { abortEarly: false })
            .catch((err) => {
              const errors = err.inner.reduce(
                (acc: any, error: { path: any; message: any }) => {
                  return {
                    ...acc,
                    [error.path]: error.message
                  };
                },
                {}
              );
    
              if (errors.hobbies) {
                setCheckboxError(errors.hobbies);
              }
            });
        }
      };
      return (
        <form onSubmit={submitForm} noValidate>
          <fieldset
            // Let screen readers know when field is invalid
            aria-invalid={checkboxError ? "true" : "false"}
            // And where to look for the error
            aria-describedby="hobbies-error"
          >
            <legend>Hobbies</legend>
            {ALL_HOBBIES.map((hobby) => (
              <Checkbox
                key={hobby}
                value={hobby}
                onChange={() => onFieldChange(hobby)}
              />
            ))}
            {/* We set role="alert" on the error message */}
            <p className="error" id="hobbies-error" role="alert" aria-atomic="true">
              {checkboxError}
            </p>
          </fieldset>
          <input type="submit" value="Submit" />
          <output name="result" htmlFor="hobbies">
            <pre>
              <code>
                {JSON.stringify({ selectedHobbies, error: checkboxError })}
              </code>
            </pre>
          </output>
        </form>
      );
    }`,
  },
  "validation/FormValidationSchema.tsx": {
    code: `import { array, object, string } from "yup";

export const formSchema = object({
  hobbies: array()
    .of(
      string().oneOf(
        ["Hiking", "Reading", "Sleeping", "Coding"],
        "Please select one of the available options."
      )
    )
    .min(1, "Please select at least one hobby.")
    .required("Please select at least one hobby.")
});
    `,
  },
  "components/Checkbox.tsx": {
    code: `import type { ChangeEventHandler } from "react";

type CheckboxProps = {
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
};

const Checkbox = ({ onChange, value }: CheckboxProps) => {
  return (
    <label>
      {value}
        <input
          type="checkbox"
          name="hobbies"
          value={value}
          onChange={onChange}
        />
      <span className="checkmark" />
    </label>
  );
};

export default Checkbox;`,
  },
  "styles/styles.scss": {
    hidden: true,
    code: `@import "additional-styles";
@import "checkbox";`,
  },
  "styles/variables.scss": {
    hidden: true,
    code: `$nav-gap: 8px;
$white: #fff;
$text: #5e5252;
$text-hover: #403434;`,
  },
  "styles/additional-styles.scss": {
    hidden: true,
    code: `/* These styles are for presentation purposes only,
they’re not required for the component to work */

@import "variables";
@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Inconsolata:wght@400;500&display=swap");

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
  background-color: $white;
  color: $text;
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 1.6rem;
}

#root {
  padding: 10vmin;
}

fieldset {
  appearance: none;
  margin: 24px 0 0 0;
  border: 2px solid $text;
  padding: 16px;
}

legend {
  font-weight: 600;
  font-size: 1.6rem;
}

label {
  color: $text;
  font-weight: 500;
}

input[type="submit"] {
  background-color: $text;
  border: none;
  color: $white;
  font-family: inherit;
  font-size: 1.6rem;
  font-weight: 500;
  margin-top: 12px;
  border-radius: 4px;
  padding: 4px 12px;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    background-color: $text-hover;
  }
}

pre {
  background-color: $text-hover;
  border-radius: 4px;
  margin-top: 24px;
  padding: 6px 12px;

  code {
    color: $white;
    font-family: "Inconsolata", monospace;
    white-space: normal;
  }
}`,
  },
  "styles/checkbox.scss": {
    code: `@import "variables";

label {
  /* We need position: relative on the label
  to be able to position the checkbox */
  position: relative;
  display: block;
  font-size: 1.6rem;
  /* Since our checkbox width is 1.2em,
  the line-height and the left padding
  need to be at least 1.2em
  we’ll go for more to give it some breathing space */
  line-height: 1.6;
  padding: 0 0 0 2em;
  /* Since our input is inside the label, users
  can click on the whole label to tick the checkbox
  this is great for accessibility! */
  cursor: pointer;
  user-select: none;

  /* Spacing between the checkboxes */
  & + label {
    margin-top: 8px;
  }

  /* Hide the default input */
  input {
    position: absolute;
    opacity: 0;
    height: 0;
    width: 0;
    cursor: pointer;

    /* When the input is checked, update the
    background and colour of the fake checkbox */
    &:checked ~ .checkmark {
      background-color: $text;

      &:after {
        opacity: 1;
        border-color: $white;
      }
    }

    /* Change the checkmark opacity on focus */
    &:focus-visible ~ .checkmark::after {
      opacity: 0.5;
    }
  }

  /* Change the checkmark opacity when hovering
  over the whole label */
  &:hover input ~ .checkmark::after {
    opacity: 0.5;
  }
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 1.2em;
  width: 1.2em;
  border: 0.15em solid rgba(94, 82, 82, 0.7);
  border-radius: 4px;

  &:after {
    content: "";
    position: absolute;
    display: block;
    opacity: 0;
    /* We use relative values to support Zoom */
    left: 0.35em;
    top: 0.05em;
    width: 0.3em;
    height: 0.7em;
    border-color: $text;
    border-style: solid;
    /* We create the checkmark using two invisible borders */
    border-width: 0 0.15em 0.15em 0;
    transform: rotate(45deg);
  }
}`,
  },
};

export default files;
