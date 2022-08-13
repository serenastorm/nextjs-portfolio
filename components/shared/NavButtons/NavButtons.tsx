import Link from "next/link";
import { useRouter } from "next/router";
import { routes } from "infrastructure/routes/constants";
import {
  AccessibilityIcon,
  HomeIcon,
  ChangelogIcon,
  SnippetsIcon,
} from "assets/icons";
import { useScrollDirection } from "infrastructure/hooks";

import styles from "./NavButtons.module.scss";

const NavButtons = () => {
  const { pathname } = useRouter();
  const scrollDirection = useScrollDirection();

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
    {
      url: routes.accessibility,
      label: "Accessibility",
      icon: <AccessibilityIcon />,
      isCurrent: pathname === routes.accessibility,
    },
    {
      url: routes.changelog,
      label: "Changelog",
      icon: <ChangelogIcon />,
      isCurrent: pathname === routes.changelog,
    },
    {
      url: routes.diary,
      label: "Blog",
      icon: <ChangelogIcon />,
      isCurrent: pathname === routes.diary,
    },
  ];

  const activeBtnIndex = navItems.findIndex((navItem) => navItem.isCurrent);

  return (
    <ul
      className={`${styles.navButtons} ${
        scrollDirection === "down"
          ? styles.navButtonsHidden
          : styles.navButtonsVisible
      }`}
      // list-style-type: "none" removes list semantics so this is needed
      role="list"
    >
      <div
        className={styles.navButtonIndicator}
        data-active-btn-index={`${activeBtnIndex}`}
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
              <p aria-hidden="true" className={styles.navButtonLabel}>
                {navItem.label}
              </p>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavButtons;
