import LikeButtonIcon from "./LikeButtonIcon";
import { useLocalStorage } from "infrastructure/hooks";
import { isBrowser } from "helpers/main/constants";

import styles from "./LikeButton.module.scss";

type LikeButtonProps = {
  total: number;
  add: () => void;
  remove: () => void;
  articleId: number;
  fixed?: boolean;
};

const LikeButton = ({
  total,
  add: addLike,
  remove: removeLike,
  articleId,
  fixed,
}: LikeButtonProps) => {
  const localStorageKey = `${articleId}-liked`;
  const { setValue: setUserHasLikedArticle } = useLocalStorage(
    localStorageKey,
    "false"
  );

  const localStorageItem = window.localStorage.getItem(localStorageKey);
  const inputShouldBeChecked =
    isBrowser && JSON.parse(localStorageItem || "{}") === "true";

  // If user has liked snippet, likes count shouldn't go below 1
  const minLikesCount = inputShouldBeChecked ? 1 : 0;
  const likesCount = total > minLikesCount ? total : minLikesCount;

  const updateLikes = () => {
    if (inputShouldBeChecked) {
      removeLike();
      setUserHasLikedArticle("false");
    } else {
      addLike();
      setUserHasLikedArticle("true");
    }
  };

  return (
    <div
      className={`${styles.likeButton}${
        fixed ? ` ${styles.likeButtonIsFixed}` : ""
      }`}
    >
      <p
        id={`likeButtonLabel${articleId}`}
        className="screenReaderText"
        aria-live="polite"
        aria-atomic="true"
      >
        {inputShouldBeChecked ? "Unlike" : "Like"} this article
      </p>
      <input
        type="checkbox"
        className={styles.likeButtonInput}
        aria-labelledby={`likeButtonLabel${articleId}`}
        checked={inputShouldBeChecked}
        onChange={() => updateLikes()}
        onKeyDown={() => updateLikes()}
      />
      <div className={styles.likeButtonFocusMarker} />
      <LikeButtonIcon filled={inputShouldBeChecked} />
      <p className={styles.likeButtonLabel}>
        {likesCount === 0 && fixed ? "No" : likesCount}
        {fixed ? ` like${likesCount > 1 || likesCount === 0 ? "s" : ""}` : ""}
      </p>
    </div>
  );
};

export default LikeButton;
