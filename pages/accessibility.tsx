import { Page } from "components/shared/Page";

import { NewTabLink } from "components/shared";

import styles from "styles/Accessibility.module.scss";
import blogStyles from "styles/blog/Blog.module.scss";
import blogPageStyles from "styles/blog/BlogPage.module.scss";

const Accessibility = () => {
  return (
    <>
      <Page
        className={`${blogStyles.blog} ${blogPageStyles.blogPage} ${styles.accessibilityPage}`}
      >
        <h1 className={blogStyles.blogIndexTitle}>Accessibility</h1>
        <div className={blogStyles.blogPost}>
          <p>
            The web should be accessible to everyone. If your accessibility
            requirements are not met, please{" "}
            <NewTabLink
              copy="open an issue on Github."
              to="https://github.com/serenastorm/nextjs-portfolio/issues"
              shouldOpenInNewTab
              className={`medium ${blogStyles.newTabLink}`}
              withUnderline={false}
            />
          </p>
        </div>
      </Page>
    </>
  );
};

export default Accessibility;
