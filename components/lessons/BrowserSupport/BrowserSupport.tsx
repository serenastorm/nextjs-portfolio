import Image from "next/image";
import { CheckmarkIcon } from "assets/lessons/icons";
import { desktopBrowsers } from "./constants";
import type { BrowserProps, BrowserSupportProps } from "./types";

import styles from "./BrowserSupport.module.scss";

const caniuse = require("caniuse-api");

interface BrowsersProps extends BrowserSupportProps {
  browsers: BrowserProps[];
}

const Browsers = ({ browsers, feature }: BrowsersProps) => {
  return (
    <ul className={styles.wrapper}>
      {browsers.map((browser) => {
        const supportedBrowserVersion =
          caniuse.getSupport(feature)[`${browser.code}`] &&
          caniuse.getSupport(feature)[`${browser.code}`].y;

        return (
          <li className={styles.browser} key={browser.code}>
            <span
              className={styles.logo}
              data-supported={supportedBrowserVersion ? "true" : "false"}
            >
              <Image src={browser.logo} alt="" width="40" height="40" />
            </span>
            <p className={styles.browserName}>{browser.label}</p>
            <p className={styles.marketShare}>
              {browser.marketShare < 10
                ? browser.marketShare
                : Math.round(browser.marketShare)}
              % of users
            </p>
            <span
              className={styles.supportTag}
              data-supported={supportedBrowserVersion ? "true" : "false"}
            >
              {supportedBrowserVersion ? (
                <>
                  <CheckmarkIcon />
                  <span className="screenReaderText">
                    Supported from version:
                  </span>
                  {supportedBrowserVersion}
                </>
              ) : (
                "No support"
              )}
            </span>
          </li>
        );
      })}
    </ul>
  );
};

const BrowserSupport = ({ feature }: BrowserSupportProps) => {
  return (
    <aside className={styles.browserSupport}>
      <h3>Browser support</h3>
      <Browsers browsers={desktopBrowsers} feature={feature} />
      <p className={styles.caption}>
        Browser support data is from{" "}
        <a
          href="https://caniuse.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Caniuse.com
        </a>
        , visit their page for more details
        <br />
        Market share percentages are from{" "}
        <a
          href="https://gs.statcounter.com/browser-market-share"
          target="_blank"
          rel="noopener noreferrer"
        >
          StatsCounter
        </a>
      </p>
    </aside>
  );
};

export default BrowserSupport;
