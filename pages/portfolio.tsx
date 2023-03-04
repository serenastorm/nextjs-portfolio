import { useEffect, useState, type FormEvent } from "react";
import Head from "next/head";
import { Link, Page } from "components/shared";
import { InfoIcon } from "assets/icons";
import type { NextPage } from "next";

import styles from "styles/Portfolio.module.scss";

const Portfolio: NextPage = () => {
  const [password, setPassword] = useState<string>("");
  const [portfolioUrl, setPortfolioUrl] = useState<string | null>(null);
  const [errorCode, setErrorCode] = useState<number | null>(null);

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();

    const authRes = await fetch(`/api/portfolio`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${Buffer.from(":" + password).toString(
          "base64"
        )}`,
      },
    });

    if (!authRes.ok) {
      setErrorCode(authRes.status);
    }

    const { redirectUrl } = await authRes.json();

    setPortfolioUrl(redirectUrl);
  };

  useEffect(() => {
    if (portfolioUrl) {
      window.location.href = portfolioUrl;
    }
  }, [portfolioUrl]);

  return (
    <>
      <Head>
        <title>Portfolio | Serena Antonetti</title>
        <meta name="theme-color" content="#f5f7fb" />
        <meta
          name="theme-color"
          content="#181a1d"
          media="(prefers-color-scheme: dark)"
        />
      </Head>
      <style jsx global>{`
        html {
          background-color: var(--homepage-bg);
        }
      `}</style>
      <Page as="main" type="blog">
        {portfolioUrl ? (
          <div className={styles.portfolioForm}>
            <h1>Redirecting...</h1>
            <p>
              <Link href={portfolioUrl}>
                Take me to the portfolio
              </Link>
            </p>
          </div>
        ) : (
          <form
            onSubmit={submitForm}
            className={styles.portfolioForm}
            noValidate
          >
            <label htmlFor="password">Password</label>
            <input
              id="password"
              aria-invalid={errorCode === 401}
              aria-errormessage="passwordError"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrorCode(null);
              }}
              autoComplete="current-password"
              required
              autoFocus
            />
            <p id="passwordError">
              {errorCode === 401 && (
                <>
                  <InfoIcon />
                  Wrong password!
                </>
              )}
            </p>
            <input type="submit" value="Submit" />
            <p role="alert" aria-atomic="true">
              {errorCode && errorCode !== 401 && (
                <>
                  <InfoIcon />
                  There was an error. Please try again.
                </>
              )}
            </p>
          </form>
        )}
      </Page>
    </>
  );
};

export default Portfolio;
