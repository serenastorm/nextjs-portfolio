import Link from "next/link";
import { SnippetLikeButton } from "components/snippets";
import { GoToLinkIcon } from "assets/icons";
import { formatRelativeTime } from "helpers/blog";
import { routes } from "infrastructure/routes/constants";
import { useLikes } from "infrastructure/hooks";

import type { ArticleMetaData } from "../ArticleWrapper/types";

import styles from "./SnippetLink.module.scss";
import blogStyles from "styles/blog/Blog.module.scss";

type BlogPost = ArticleMetaData & {
  postIndex: number;
};

export const SnippetLink = ({
  id,
  category,
  date,
  shortText,
  slug,
  subcategory,
  title,
}: BlogPost) => {
  const { totalLikes, addLike, removeLike, likesStatus } = useLikes(id);

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
          {likesStatus !== "failed" && likesStatus !== "initial" && (
            <SnippetLikeButton
              total={totalLikes}
              add={addLike}
              remove={removeLike}
              articleId={id}
            />
          )}
        </div>
      </div>
    </article>
  );
};

const SnippetLinks = ({ posts }: { posts: ArticleMetaData[] | null }) => {
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
      {posts.map((post: ArticleMetaData, postIndex: number) => (
        <SnippetLink postIndex={postIndex} key={post.slug} {...post} />
      ))}
    </>
  );
};

export default SnippetLinks;
