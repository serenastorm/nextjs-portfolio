import Head from "next/head";
import type { AppProps } from "next/app";
import { NavButton } from "components/shared/NavButton";

import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <NavButton />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
