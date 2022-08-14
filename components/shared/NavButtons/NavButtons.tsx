import Link from "next/link";
import { useRouter } from "next/router";
import { routes } from "infrastructure/routes/constants";
import {
  AccessibilityIcon,
  DiaryIcon,
  HomeIcon,
  ChangelogIcon,
  SnippetsIcon,
} from "assets/icons";
import { useAnimatedCursor, useScrollDirection } from "infrastructure/hooks";
import styles from "./NavButtons.module.scss";
import cursorStyles from "styles/diary/DiaryCursor.module.scss";

const NavButtons = () => {
  const activeCursorIndex = useAnimatedCursor();

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
      url: routes.diary,
      label: "Blog",
      icon: <DiaryIcon />,
      isCurrent: pathname === routes.diary,
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
        <li
          key={navItem.label}
          className={`${styles.navButton} ${
            navItem.label === "Blog" ? cursorStyles.cursorContainer : ""
          }`}
          data-cursor-index={
            navItem.label === "Blog" ? activeCursorIndex + 1 : null
          }
        >
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
