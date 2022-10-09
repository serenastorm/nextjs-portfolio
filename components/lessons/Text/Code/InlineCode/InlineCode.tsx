import { CodeProps } from "../types";

import styles from "./InlineCode.module.scss";

const InlineCode = ({ code }: CodeProps) => {
  return <code className={styles.inlineCode}>{code}</code>;
};

export default InlineCode;
