import Head from "next/head";
import { Flexbox } from "lessons/Flexbox";

import styles from "styles/Lesson.module.scss";

const FlexboxPage = () => {
  return (
    <>
      <Head>
        <title>Flexbox | Serena Antonetti</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Cabin:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,500;1,400&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#181a1d" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
      </Head>
      <div className={styles.lessonPage}>
        <Flexbox />
      </div>
    </>
  );
};

export default FlexboxPage;
