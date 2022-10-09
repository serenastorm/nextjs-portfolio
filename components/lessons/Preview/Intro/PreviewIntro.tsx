import styles from "./PreviewIntro.module.scss";

type PreviewIntroProps = {
  name: string;
  title: string;
};

const PreviewIntro = ({ name, title }: PreviewIntroProps) => {
  return (
    <div key={`intro-${name}`} className={styles.coursePreviewIntro}>
      <p aria-hidden="true" className={styles.coursePreviewTitle}>
        {title}
      </p>
    </div>
  );
};

export default PreviewIntro;
