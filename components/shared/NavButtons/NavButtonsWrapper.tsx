import { Fragment, type ReactNode } from "react";
import { useRouter } from "next/router";
import { routes } from "infrastructure/routes/constants";
import {
  AccessibilityIcon,
  DiaryIcon,
  HomeIcon,
  ChangelogIcon,
  SnippetsIcon,
} from "assets/icons";

type NavButtonsWrapperProps = {
  children: (
    navItems: Array<{
      url: string;
      label: string;
      icon: JSX.Element;
      isCurrent: boolean;
    }>
  ) => ReactNode;
};

const NavButtonsWrapper = ({ children }: NavButtonsWrapperProps) => {
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

  return <Fragment>{children(navItems)}</Fragment>;
};

export default NavButtonsWrapper;
