import { useEffect, useState } from "react";
import Head from "next/head";
import Router, { useRouter } from "next/router";
import { Loader, NavButtons, SkipToContentLink } from "components/shared";
import { routes } from "infrastructure/routes/constants";
import { usePrefersReducedMotion } from "infrastructure/hooks";
import type { AppProps } from "next/app";

import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const userPrefersReducedMotion = usePrefersReducedMotion();

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

  useEffect(() => {
    // Add cursor sparkle trail on Diary page
    const script = document.createElement("script");
    script.src = "/diary/sparkles.js";
    script.defer = true;

    const removeScript = () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      return null;
    };

    if (pathname === routes.diary && !userPrefersReducedMotion) {
      document.body.appendChild(script);
      script.onload = () => {
        window.initDots();
        window.initSparkles();
      };
    } else {
      removeScript();
    }

    return () => {
      removeScript();
    };
  }, [pathname, userPrefersReducedMotion]);

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
