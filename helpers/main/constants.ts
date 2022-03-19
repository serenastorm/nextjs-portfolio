import { routes } from "infrastructure/routes/constants";
import { LinkProps } from "./types";

export const projectLinks: LinkProps[] = [
  {
    label: "myqr.studio",
    description: "case study",
    url: routes.myqr.intro.url,
  },
  {
    label: "cmts2a",
    description: "custom wordpress theme",
    url: "https://cmts2a.fr/",
    isExternal: true,
  },
  {
    label: "react-native-side-nav",
    description: "open source npm package",
    url: "https://github.com/serenastorm/react-native-side-nav",
    isExternal: true,
  },
  {
    label: "2018 portfolio",
    description: "UI/UX works from 2018",
    url: "https://silly-ramanujan-4dd4c1.netlify.app/",
    isExternal: true,
  },
];
