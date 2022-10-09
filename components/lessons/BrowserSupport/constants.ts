import { BrowserLogos } from "./Logos";
import type { BrowserProps } from "./types";

export const desktopBrowsers: BrowserProps[] = [
  {
    label: "Chrome",
    code: "chrome",
    logo: BrowserLogos.Chrome,
    marketShare: 65.68,
  },
  {
    label: "Safari",
    code: "safari",
    logo: BrowserLogos.Safari,
    marketShare: 18.68,
  },
  {
    label: "Firefox",
    code: "firefox",
    logo: BrowserLogos.Firefox,
    marketShare: 3.15,
  },
  { label: "IE", code: "ie", logo: BrowserLogos.IE, marketShare: 0.33 },
  { label: "Edge", code: "edge", logo: BrowserLogos.Edge, marketShare: 4.33 },
];

// export const mobileBrowsers = [
//   {
//     label: "Android Chrome",
//     code: "and_chr",
//     logo: BrowserLogos.Chrome,
//     marketShare: "",
//   },
//   {
//     label: "iOS Safari",
//     code: "ios_saf",
//     logo: BrowserLogos.Safari,
//     marketShare: "",
//   },
//   {
//     label: "Android Firefox",
//     code: "and_ff",
//     logo: BrowserLogos.Firefox,
//     marketShare: "",
//   },
//   // { label: "Android", code: "firefox", marketShare: "", },
// ];
