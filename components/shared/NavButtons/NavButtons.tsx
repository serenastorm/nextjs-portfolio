import Link from "next/link";
import { useRouter } from "next/router";
import { routes } from "infrastructure/routes/constants";
import { HomeIcon, SnippetsIcon } from "assets/icons";

import styles from "./NavButtons.module.scss";

const NavButtons = () => {
  const { pathname } = useRouter();

  const isSnippets = pathname.startsWith("/snippets");
  const isHomepage = pathname === "/";

  const navItems = [
    {
      url: routes.home,
      label: "Home",
      icon: <HomeIcon />,
      isCurrent: isHomepage,
    },
    {
      url: routes.blog.snippets.url,
      label: "Snippets",
      icon: <SnippetsIcon />,
      isCurrent: isSnippets,
    },
  ];

  const activeBtnIndex = () => {
    if (isSnippets) {
      return 2;
    } else if (isHomepage) {
      return 1;
    } else {
      return 0;
    }
  }

  return (
    <ul className={styles.navButtons}>
      <div
        className={styles.navButtonIndicator}
        data-active-btn-index={`${activeBtnIndex()}`}
      />
      {navItems.map((navItem) => (
        <li className={styles.navButton} key={navItem.label}>
          <Link href={navItem.url} passHref>
            <a
              className={styles.navButtonLink}
              aria-label={navItem.label}
              aria-current={navItem.isCurrent ? "page" : "false"}
            >
              {navItem.icon}
            </a>
          </Link>
          <p aria-hidden="true" className={styles.navButtonLabel}>
            {navItem.label}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default NavButtons;
