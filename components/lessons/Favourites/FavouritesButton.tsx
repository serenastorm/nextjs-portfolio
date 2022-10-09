import { useState } from "react";
import { FavouriteIcon } from "assets/lessons/icons";

import styles from "styles/lessons/ResourceButton.module.scss";

const FavouritesButton = () => {
  const [isFavourite, setIsFavourite] = useState<boolean>(false);

  return (
    <button
    className={`${styles.icon} ${styles.favouriteIcon}`}
    onClick={() => setIsFavourite(!isFavourite)}
      data-selected={isFavourite ? "true" : "false"}
    >
      <FavouriteIcon />
    </button>
  );
};

export default FavouritesButton;
