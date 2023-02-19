import Link from "next/link";
import { routes } from "infrastructure/routes/constants";
import { getCategory } from "helpers/blog";

import styles from "./Breadcrumbs.module.scss";

const category = "snippets";

export const Breadcrumbs = ({ subcategory }: { subcategory?: string }) => {
  return (
    <nav>
      <ul aria-label="Breadcrumbs" className={styles.breadcrumbs} role="list">
        <li>
          <Link href={`/${category}`}>Code Snippets</Link>
        </li>
        {subcategory && (
          <li>
            <Link
              href={{
                pathname: routes.blog.snippets.url,
                query: { cat: subcategory },
              }}
            >
              {getCategory(subcategory).label}
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};
