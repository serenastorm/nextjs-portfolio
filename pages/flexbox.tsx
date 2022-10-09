import Head from "next/head";
import { Flexbox } from "lessons/Flexbox";

import styles from "styles/Lesson.module.scss";

const FlexboxPage = () => {
  return (
    <>
      <Head>
        <title>Flexbox | Serena Antonetti</title>
        <meta name="theme-color" content="#181a1d" />
      </Head>
      <div className={styles.lessonPage}>
        <Flexbox />
      </div>
    </>
  );
};

export default FlexboxPage;
