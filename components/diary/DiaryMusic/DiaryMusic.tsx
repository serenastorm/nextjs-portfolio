import { useEffect, useState, type CSSProperties } from "react";
import { SONGS } from "./constants";

import styles from "./DiaryMusic.module.scss";
import diaryImageStyles from "styles/diary/DiaryImage.module.scss";

const getRandomSongIndex = (max: number) => {
  return Math.floor(Math.random() * max);
};

const DiaryMusic = () => {
  const [randomSongIndex, setRandomSongIndex] = useState<number>(0);
  const { song, author, image, youtubeUrl } = SONGS[randomSongIndex];

  useEffect(() => {
    const maxSongIndex = SONGS.length;

    setRandomSongIndex(getRandomSongIndex(maxSongIndex));
  }, []);

  const img = require(`../../../assets/diary/images/${image}`);
  const imgSrc = img?.default?.src;

  return (
    <section className={styles.music}>
      <div
        className={`${styles.albumCover} ${diaryImageStyles.overlayImg}`}
        style={
          {
            "--diary-overlay-img": `url(
              ${imgSrc}
            )`,
          } as CSSProperties
        }
      />
      <div>
        <h2>
          <a href={youtubeUrl} target="_blank" rel="noopener noreferrer">
            {author}
          </a>
        </h2>
        <p>{song}</p>
      </div>
    </section>
  );
};

export default DiaryMusic;
