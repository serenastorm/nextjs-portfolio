import styles from "./LandingScreenReaderLink.module.scss";

type LandingScreenReaderLinkProps = {
  text: string;
  url: string;
  label: string;
};

const LandingScreenReaderLink = ({
  text,
  url,
  label,
}: LandingScreenReaderLinkProps) => (
  <span className={styles.screenReaderLink}>
    {/* We need to add the text both before and after the link:
       before so it's read by screen readers in the right order,
       after so we can target it in CSS to add focus styles to the link */}
    <span className="screenReaderText">{text}</span>
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      title={`${label} (opens in a new tab)`}
    >
      {label} (opens in a new tab)
    </a>
    <span className={styles.screenReaderLinkText} aria-hidden="true">
      {text}
    </span>
  </span>
);

export default LandingScreenReaderLink;
