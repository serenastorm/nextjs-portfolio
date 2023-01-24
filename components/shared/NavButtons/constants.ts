import { routes } from "infrastructure/routes/constants";
import {
  AccessibilityIcon,
  DiaryIcon,
  HomeIcon,
  ChangelogIcon,
  SnippetsIcon,
} from "assets/icons";

export const NAV_ITEMS = [
  {
    url: routes.home,
    label: "Home",
    icon: HomeIcon,
  },
  {
    url: routes.blog.snippets.url,
    label: "Snippets",
    icon: SnippetsIcon,
  },
  {
    url: routes.diary,
    label: "Blog",
    icon: DiaryIcon,
  },
  {
    url: routes.accessibility,
    label: "Accessibility",
    icon: AccessibilityIcon,
  },
  {
    url: routes.changelog,
    label: "Changelog",
    icon: ChangelogIcon,
  },
];
