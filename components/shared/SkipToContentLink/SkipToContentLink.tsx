import Link from "next/link";
import { useRouter } from "next/router";

import styles from "./SkipToContentLink.module.scss";

const SkipToContentLink = () => {
  const { pathname } = useRouter();

  const isSnippets = pathname.startsWith("/snippets/");
  const isAccessibility = pathname.startsWith("/accessibility");

  return (
    <>
      {!isAccessibility && (
        <Link href="/accessibility" passHref>
          <a className={styles.skipToContentLink}>
            Accessibility feedback
          </a>
        </Link>
      )}
      {isSnippets && (
        <a className={styles.skipToContentLink} href="#mainContent">
          Skip to main content
        </a>
      )}
    </>
  );
};

export default SkipToContentLink;
