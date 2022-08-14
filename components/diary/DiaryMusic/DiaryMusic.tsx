import Link from "next/link";

import styles from "./DiaryMusic.module.scss";
import diaryImageStyles from "styles/diary/DiaryImage.module.scss";

const DiaryMusic = ({
  song,
  author,
  youtubeUrl,
}: {
  song: string;
  author: string;
  youtubeUrl: string;
}) => {
  return (
    <section className={styles.music}>
      <div className={`${styles.albumCover} ${diaryImageStyles.overlayImg}`} />
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
