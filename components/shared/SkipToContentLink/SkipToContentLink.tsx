import { useRouter } from "next/router";

import styles from "./SkipToContentLink.module.scss";

const SkipToContentLink = () => {
  const { pathname } = useRouter();

  const isSnippets = pathname.startsWith("/snippets/");

  return (
    <>
      {isSnippets && (
        <a className={styles.skipToContentLink} href="#mainContent">
          Skip to main content
        </a>
      )}
    </>
  );
};

export default SkipToContentLink;
