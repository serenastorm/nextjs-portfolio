import Head from "next/head";
import Script from "next/script";
import Image from "next/image";
import { Page } from "components/shared/Page";
import {
  DiaryAside,
  DiaryEntry,
  DiaryEntryStat,
  DiaryMusic,
  DiaryMouseEffect,
} from "components/diary";

import styles from "styles/diary/Diary.module.scss";

const Fun = () => {
  return (
    <>
      <Head>
        <title>Blog | Serena Antonetti</title>
        <meta name="theme-color" content="#F8F3F4" />
      </Head>
      <DiaryMouseEffect />

      <Page className={`${styles.fun}`}>
        {/* <Script src="/diary/sparkles.js" /> */}
        <DiaryAside />
        <main className={styles.main}>
          <DiaryMusic
            author="Céline Dion"
            song="J'irai où tu iras (en duo avec Jean-Jacques Goldman)"
          />
          <DiaryEntry type="Diary" date={new Date()}>
            <p>
              Like many others, I started my design + code journey by
              customising Tumblr themes. I miss social media that allowed us to
              show to show our personnality, so this my own experiment.
            </p>
          </DiaryEntry>
          <DiaryEntry type="Stats" date={new Date()}>
            <ul>
              <DiaryEntryStat label="Coding" score={5} />
              <DiaryEntryStat label="Sleeping" score={3} />
              <DiaryEntryStat label="Gym" score={4} />
              <DiaryEntryStat label="Adulting" score={3} />
            </ul>
          </DiaryEntry>
          <DiaryEntry type="Snapshot" date={new Date()}>
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
        </main>
      </Page>
    </>
  );
};

export default Fun;
