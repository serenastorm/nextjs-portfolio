import Head from "next/head";
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
      <div className={styles.sparklesContainer}>
        <div id="sparkles-container" />
      </div>
      <Page
        className={`${styles.fun} ${cursorStyles.cursorContainer}`}
        data-cursor-index={activeCursorIndex + 1}
      >
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
                src="/diary/images/alba-river.gif"
                alt="Alba, a small black puppy, sleeps peacefully on a rock while a river flows behind her"
                width="400"
                height="533.33"
              />
              <figcaption>Alba at the river 🐾</figcaption>
            </figure>
          </DiaryEntry>
          <DiaryEntry type="Snapshot" date={new Date("2022-08-06")}>
            <figure>
              <Image
                src="/diary/images/home.jpg"
                alt="A landscape at sundown with the sun light creating a gradient of greens accross the different layers. There is snow on one of the most distant peaks."
                width="750.98"
                height="500"
              />
              <figcaption>The mountains near my village</figcaption>
            </figure>
          </DiaryEntry>
          <DiaryEntry type="Quote" date={new Date("2022-08-04")}>
            <blockquote>
              The trains at our parties are the best in Rome. They're the best
              'cause they go nowhere.
              <cite>La grande bellezza · Jep Gambardella</cite>
            </blockquote>
          </DiaryEntry>
          <DiaryEntry type="Snapshot" date={new Date("2022-08-02")}>
            <figure>
              <Image
                src="/diary/images/alba-scirocco.jpg"
                alt="Alba, a small black puppy, is booping her nose against a foal's. They're surrounded by flowers."
                width="400"
                height="533.33"
              />
              <figcaption>Starting to feel like Snow White</figcaption>
            </figure>
          </DiaryEntry>
          <DiaryEntry type="Diary" date={new Date("2022-08-01")}>
            <p>Welcome to my garden 🌸</p>
          </DiaryEntry>
          <p className={styles.diaryCredits}>
            Credits:{" "}
            <a
              href="http://www.rw-designer.com/user/wildflower"
              target="_blank"
              rel="noopener noreferrer"
            >
              Animated cursor
            </a>{" "}
            |{" "}
            <a
              href="https://codepen.io/sarahwfox"
              target="_blank"
              rel="noopener noreferrer"
            >
              Sparkle trail
            </a>
          </p>
        </main>
      </Page>
    </>
  );
};

export default Fun;
