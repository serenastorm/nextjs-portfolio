import type { AppProps } from "next/app";
import { NavButton } from "components/shared/NavButton";

import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NavButton />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
