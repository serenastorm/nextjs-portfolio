import { useState, useRef } from "react";
import { CopyToClipboardIcon } from "assets/icons";

import styles from "./CopyToClipboardButton.module.scss";

type CopyToClipboardButtonProps = {
  className?: string;
  textToCopy: string;
};

const CopyToClipboardButton = ({
  className = "",
  textToCopy,
}: CopyToClipboardButtonProps) => {
  const [textCopiedToClipboard, setTextCopiedToClipboard] =
    useState<boolean>(false);
  // For browsers that don’t support navigator.clipboard, we need to add the email to an input, select it, and copy the value
  const textInputRef = useRef<HTMLInputElement | null>(null);

  const showCopiedSuccessMessage = () => {
    setTextCopiedToClipboard(true);

    setTimeout(() => {
      setTextCopiedToClipboard(false);
    }, 2000);
  };

  const onCopyButtonClick = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(textToCopy).then(showCopiedSuccessMessage);
    } else {
      textInputRef?.current?.select();
      document.execCommand("copy");
      showCopiedSuccessMessage();
      textInputRef?.current?.blur();
    }
  };

  return (
    <>
      <div
        className={`${styles.CopyToClipboardButtonWrapper} ${className}`}
      >
        <input
          className="screenReaderText"
          readOnly
          ref={textInputRef}
          tabIndex={-1}
          type="text"
          value={textToCopy}
          aria-hidden
        />
        <button
          onClick={onCopyButtonClick}
          className={styles.CopyToClipboardButton}
          title="Copy to clipboard"
        >
          <CopyToClipboardIcon copied={textCopiedToClipboard} />
        </button>
        {textCopiedToClipboard && (
          <p
            aria-live="assertive"
            aria-relevant="additions"
            className={styles.CopyToClipboardButtonLabel}
          >
            Copied!
          </p>
        )}
      </div>
    </>
  );
};

export default CopyToClipboardButton;
