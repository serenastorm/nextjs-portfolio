import { LandingProject, LandingFooterProject, ProjectType } from "./types";

export const FOOTER_PROJECTS_TYPES_LABELS: { [key in ProjectType]: string } = {
  open_source: "Open source",
  experiment: "Experiments",
};

export const FOOTER_PROJECTS_TYPES: ProjectType[] = [
  "open_source",
  "experiment",
];

export const PROJECTS: LandingProject[] = [
  {
    title: "Moov",
    description: "Mobile, branding",
    slug: "moov",
  },
  {
    title: "Hummingbird",
    description: "Web, branding",
    slug: "hummingbird",
  },
  {
    title: "myqr",
    description: "Web",
    slug: "myqr",
  },
  {
    title: "Sol d’Oa",
    description: "Web, branding",
    slug: "soldoa",
  },
  {
    title: "Motherf**king List",
    description: "Web, branding",
    slug: "motherfucking-list",
  },
  {
    title: "La Princière",
    description: "Web, branding",
    slug: "la-princiere",
  },

  {
    title: "Calleis",
    description: "Web, branding",

    slug: "calleis",
  },
];

export const FOOTER_PROJECTS: LandingFooterProject[] = [
  {
    type: "open_source",
    title: "antonettiserena.com",
    year: "2016 — Now",
    description: "Portfolio source code",
    url: "https://github.com/serenastorm/nextjs-portfolio",
  },
  {
    type: "open_source",
    title: "Developer handoff",
    year: "2022",
    description: "Figma widget",
    url: "https://www.figma.com/community/widget/1173343953294737171",
  },
  {
    type: "open_source",
    title: "react-native-side-nav",
    year: "2021",
    description: "Open source NPM package for React Native",
    url: "https://github.com/serenastorm/react-native-side-nav",
  },

  {
    type: "experiment",
    title: "Hawkins map",
    year: "2022",
    description: "Interactive map of Hawkins, Indiana",
    url: "https://hawkins-map.vercel.app",
  },
  {
    type: "experiment",
    title: "/fun",
    year: "2022",
    description: "Online garden",
    url: "/fun",
  },
  {
    type: "experiment",
    title: "/flexbox",
    year: "2021",
    description: "Interactive flexbox guide",
    url: "/flexbox",
  },
  // {
  //   type: "experiment",
  //   title: "myqr",
  //   year: "2021",
  //   description: "Case study",
  //   url: "https://zealous-visvesvaraya-033757.netlify.app",
  // },
];
