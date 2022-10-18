import Link from "next/link";
import { SnippetLikeButton, SnippetPills } from "components/snippets";
import { GoToLinkIcon } from "assets/icons";
import { BlogPostResponse } from "infrastructure/blog/types";
import { formatRelativeTime } from "helpers/blog";
import { routes } from "infrastructure/routes/constants";
import { useLikes } from "infrastructure/hooks";

import styles from "./SnippetLink.module.scss";
import blogStyles from "styles/blog/Blog.module.scss";

type BlogPost = BlogPostResponse & {
  postIndex: number;
};

export const SnippetLink = ({ fields, sys }: BlogPost) => {
  const { totalLikes, likesAreLoading, addLike, removeLike } = useLikes(sys.id);
  const { category, date, shortText, slug, subcategory, title } = fields;

  return (
    <article className={blogStyles.blogPost}>
      <Link
        href={`/${encodeURIComponent(category)}/${encodeURIComponent(slug)}`}
        passHref
      >
        <a className={`${styles.blogPostLink}`}>
          <h3 className={styles.blogPostTitle}>
            {title} <GoToLinkIcon className={blogStyles.blogGoToLinkIcon} />
          </h3>
        </a>
      </Link>
      {shortText && <p>{shortText}</p>}

      <div
        className={`${blogStyles.blogArticleMeta} ${styles.blogArticleMeta}`}
      >
        <div className={styles.blogArticleTags}>
          <time dateTime={new Date(date).toISOString()}>
            {formatRelativeTime(new Date(date))}
          </time>
          {!likesAreLoading && (
            <SnippetLikeButton
              total={totalLikes}
              add={addLike}
              remove={removeLike}
              articleId={sys.id}
            />
          )}
        </div>
        <SnippetPills types={[subcategory]} />
      </div>
    </article>
  );
};

const SnippetLinks = ({ posts }: { posts: BlogPostResponse[] | null }) => {
  if (!posts) {
    return (
      <div className={blogStyles.blogPost}>
        No posts to show.{" "}
        <Link href={routes.blog.snippets.url} passHref>
          <a className="semibold">
            All snippets
            <GoToLinkIcon />
          </a>
        </Link>
      </div>
    );
  }
  return (
    <>
      {posts.map((post: BlogPostResponse, postIndex: number) => (
        <SnippetLink postIndex={postIndex} key={post.sys.id} {...post} />
      ))}
    </>
  );
};

export default SnippetLinks;
