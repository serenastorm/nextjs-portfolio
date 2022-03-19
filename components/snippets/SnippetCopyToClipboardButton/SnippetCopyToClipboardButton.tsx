import { useState, useRef } from "react";
import { CopyToClipboardIcon } from "assets/icons";

import styles from "./SnippetCopyToClipboardButton.module.scss";

type SnippetCopyToClipboardButtonProps = {
  textToCopy: string;
};

const SnippetCopyToClipboardButton = ({ textToCopy }: SnippetCopyToClipboardButtonProps) => {
  const [textCopiedToClipboard, setTextCopiedToClipboard] =
    useState<boolean>(false);
  // For browsers that don't support navigator.clipboard, we need to add the email to an input, select it, and copy the value
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
        className={styles.snippetCopyToClipboardButton}
        title="Copy to clipboard"
      >
        <CopyToClipboardIcon copied={textCopiedToClipboard} />
      </button>
      {textCopiedToClipboard && (
        <p
          aria-live="assertive"
          aria-relevant="additions"
          className={styles.snippetCopyToClipboardButtonLabel}
        >
          Copied!
        </p>
      )}
    </>
  );
};

export default SnippetCopyToClipboardButton;
