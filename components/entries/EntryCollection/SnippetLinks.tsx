import Link from "next/link";
import { SnippetLikeButton } from "components/snippets";
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

  const titleWords = title.split(" ");
  const titleLastWord = titleWords.pop();
  const titleWordsTotal = titleWords.length;

  return (
    <article className={blogStyles.blogPost}>
      <Link
        href={`/${encodeURIComponent(category)}/${encodeURIComponent(slug)}`}
        className={`${styles.blogPostLink}`}
      >
        <h3 className={styles.blogPostTitle}>
          {titleWordsTotal > 0 && <span>{titleWords.join(" ")} </span>}
          <span>
            {titleLastWord}
            <GoToLinkIcon className={blogStyles.blogGoToLinkIcon} />
          </span>
        </h3>
      </Link>
      {shortText && <p>{shortText}</p>}

      <div className={styles.blogArticleMeta}>
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
      </div>
    </article>
  );
};

const SnippetLinks = ({ posts }: { posts: BlogPostResponse[] | null }) => {
  if (!posts) {
    return (
      <div className={blogStyles.blogPost}>
        No posts to show.{" "}
        <Link href={routes.blog.snippets.url} className="semibold">
          All snippets
          <GoToLinkIcon />
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
