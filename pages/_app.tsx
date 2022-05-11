import { useEffect, useState } from "react";
import Head from "next/head";
import Router from "next/router";
import type { AppProps } from "next/app";
import { Loader, NavButtons, SkipToContentLink } from "components/shared";

import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const start = () => {
      setIsLoading(true);
    };
    const end = () => {
      setIsLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {isLoading && <Loader />}
      <SkipToContentLink />
      <NavButtons />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
