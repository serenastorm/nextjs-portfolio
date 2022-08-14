import { useEffect, useState } from "react";
import Head from "next/head";
// import Script from "next/script";
import Image from "next/image";
import { Page } from "components/shared/Page";
import {
  DiaryAside,
  DiaryEntry,
  DiaryEntryStat,
  DiaryMusic,
} from "components/diary";
import { useAnimatedCursor } from "infrastructure/hooks";

import styles from "styles/diary/Diary.module.scss";
import cursorStyles from "styles/diary/DiaryCursor.module.scss";

const Fun = () => {
  const activeCursorIndex = useAnimatedCursor();

  return (
    <>
      <Head>
        <title>Blog | Serena Antonetti</title>
        <meta name="theme-color" content="#F8F3F4" />
      </Head>
      {/* <div id="sparkles-container" className={styles.sparklesContainer}>
        <div />
      </div> */}
      <Page
        className={`${styles.fun} ${cursorStyles.cursorContainer}`}
        data-cursor-index={activeCursorIndex + 1}
      >
        {/* <Script src="/diary/sparkles.js" strategy="lazyOnload" /> */}
        <DiaryAside />
        <main className={styles.main}>
          <DiaryMusic
            author="Céline Dion"
            song="J'irai où tu iras (en duo avec Jean-Jacques Goldman)"
            youtubeUrl="https://www.youtube.com/watch?v=0J3wIDAaLSU"
          />
          <DiaryEntry type="Quote" date={new Date("2022-08-13")}>
            <blockquote>
              For some, who are travelers, the stars are guides.
              <cite>Antoine de Saint-Exupéry</cite>
            </blockquote>
          </DiaryEntry>
          <DiaryEntry type="Stats" date={new Date("2022-08-08")}>
            <ul>
              <DiaryEntryStat label="Coding" score={5} />
              <DiaryEntryStat label="Sleeping" score={3} />
              <DiaryEntryStat label="Gym" score={4} />
              <DiaryEntryStat label="Adulting" score={3} />
            </ul>
          </DiaryEntry>
          <DiaryEntry type="Snapshot" date={new Date("2022-08-06")}>
            <figure>
              <Image
                src="/diary/images/alba.jpg"
                alt="Alba at the river"
                width="400"
                height="533.33"
              />
              <figcaption>Alba at the river 🐾</figcaption>
            </figure>
          </DiaryEntry>
          <DiaryEntry type="Diary" date={new Date("2022-08-02")}>
            <p>Welcome to my garden 🌸</p>
          </DiaryEntry>
        </main>
      </Page>
    </>
  );
};

export default Fun;
