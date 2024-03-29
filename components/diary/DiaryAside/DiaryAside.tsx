import { LocationIcon, TimeIcon } from "assets/diary/icons";

import styles from "./DiaryAside.module.scss";
import diaryImageStyles from "styles/diary/DiaryImage.module.scss";

const DiaryAside = () => {
  return (
    <div className={styles.asideWrapper}>
      <div className={styles.aside}>
        <div className={styles.asideIntro}>
          <div className={styles.asideHero}></div>
          <div
            className={`${styles.asideProfilePicture} ${diaryImageStyles.profilePicture} ${diaryImageStyles.overlayImg}`}
          />
          <h1>Serena’s blog</h1>
          <p>
            Like many others, I started my design + code journey by customising
            Tumblr themes. I miss social media that allowed us to show to show
            our personality, so this my own experiment.
          </p>
        </div>
        <div className={styles.asideStatus}>
          <dl>
            <div className={styles.statusItem}>
              <dt>
                <span className="screenReaderText">Location</span>
                <LocationIcon />
              </dt>
              <dd>Edinburgh</dd>
            </div>
            <div className={styles.statusItem}>
              <dt>
                <span className="screenReaderText">Current time</span>
                <TimeIcon />
              </dt>
              <dd>
                <time dateTime={new Date().toISOString()}>
                  {new Date().toLocaleString("en", {
                    timeZone: "Europe/London",
                    timeStyle: "short",
                  })}
                </time>
              </dd>
            </div>
          </dl>
        </div>
        <div className={styles.asideOnline}>
          <p>1 online</p>
        </div>
      </div>
    </div>
  );
};

export default DiaryAside;
