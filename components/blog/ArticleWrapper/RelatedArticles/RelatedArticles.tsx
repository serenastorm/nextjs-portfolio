import Link from "next/link";
import type { RelatedPosts } from "pages/api/snippets/[id]/related";

import styles from "./RelatedArticles.module.scss";

export const RelatedArticles = ({ nextPost, previousPost }: RelatedPosts) => {
  return (
    <>
      {(nextPost || previousPost) && (
        <aside className={styles.nav}>
          <div className={styles.navLink}>
            {previousPost && (
              <>
                <p>Previous post</p>
                <Link href={`/${previousPost.category}/${previousPost.slug}`}>
                  {previousPost.title}
                </Link>
              </>
            )}
          </div>
          <div className={styles.navLink}>
            {nextPost && (
              <>
                <p>Next post</p>
                <Link href={`/${nextPost.category}/${nextPost.slug}`}>
                  {nextPost.title}
                </Link>
              </>
            )}
          </div>
        </aside>
      )}
    </>
  );
};
