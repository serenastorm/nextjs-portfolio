import SnippetLikeButtonHeart from "./SnippetLikeButtonHeart";
import { useLocalStorage } from "infrastructure/hooks";
import { isBrowser } from "helpers/main/constants";

import styles from "./SnippetLikeButton.module.scss";

type SnippetLikeButtonProps = {
  total: number;
  add: () => void;
  remove: () => void;
  articleId: string;
  fixed?: boolean;
};

const SnippetLikeButton = ({
  total,
  add: addLike,
  remove: removeLike,
  articleId,
  fixed,
}: SnippetLikeButtonProps) => {
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
      <input
        type="checkbox"
        className={styles.likeButtonInput}
        aria-label="Like this article"
        checked={inputShouldBeChecked}
        onChange={() => updateLikes()}
        onKeyDown={() => updateLikes()}
      />
      <div className={styles.likeButtonFocusMarker} />
      <SnippetLikeButtonHeart filled={inputShouldBeChecked} />
      <p className={styles.likeButtonLabel} role="text">
        {likesCount === 0 && fixed ? "No" : likesCount}{" "}
        <span className={fixed ? undefined : "screenReaderText"}>
          {likesCount > 1 || likesCount === 0 ? "likes" : "like"}
        </span>
      </p>
    </div>
  );
};

export default SnippetLikeButton;
