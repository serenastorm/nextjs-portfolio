import { ReactNode } from "react";

import styles from "./Paragraph.module.scss";

type ParagraphProps = {
  children: ReactNode;
};

const Paragraph = ({ children }: ParagraphProps) => {
  /* ARIA role="text" prevents 'text splitting' in VoiceOver iOS https://axesslab.com/text-splitting/  */
  // eslint-disable-next-line jsx-a11y/aria-role
  return <p role="text">{children}</p>;
};

export default Paragraph;
