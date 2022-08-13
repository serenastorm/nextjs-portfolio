import styles from "./DiaryMusic.module.scss";
import diaryImageStyles from "styles/diary/DiaryImage.module.scss";

const DiaryMusic = ({ song, author }: { song: string; author: string }) => {
  return (
    <section className={styles.music}>
      <div className={`${styles.albumCover} ${diaryImageStyles.overlayImg}`} />
      <div>
        <h2>
          <a>{author}</a>
        </h2>
        <p>{song}</p>
      </div>
    </section>
  );
};

export default DiaryMusic;
