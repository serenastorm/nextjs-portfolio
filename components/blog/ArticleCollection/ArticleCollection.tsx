import Link from "next/link";
import { LikeButton } from "components/blog";
import { ArrowIcon } from "assets/icons";
import { formatRelativeTime } from "helpers/blog";
import { routes } from "infrastructure/routes/constants";
import { useLikes } from "infrastructure/hooks";

import type { ArticleMetaData } from "../ArticleWrapper/types";

import styles from "./ArticleCollection.module.scss";
import blogStyles from "styles/blog/Blog.module.scss";

type ArticleLinkProps = ArticleMetaData & { className?: string };

export const ArticleLink = ({
  id,
  category,
  className = "",
  date,
  slug,
  title,
}: ArticleLinkProps) => {
  const { totalLikes, addLike, removeLike, likesStatus } = useLikes(id);

  const titleWords = title.split(" ");
  const titleLastWord = titleWords.pop();
  const titleWordsTotal = titleWords.length;

  return (
    <article className={`${blogStyles.blogPost} ${className}`}>
      <Link
        href={`/${encodeURIComponent(category)}/${encodeURIComponent(slug)}`}
        className={`${styles.blogPostLink}`}
      >
        <h3 className={styles.blogPostTitle}>
          {titleWordsTotal > 0 && <span>{titleWords.join(" ")} </span>}
          <span>
            {titleLastWord}
            <ArrowIcon />
          </span>
        </h3>
      </Link>

      <div className={styles.blogArticleMeta}>
        <div className={styles.blogArticleTags}>
          <time dateTime={new Date(date).toISOString()}>
            {formatRelativeTime(new Date(date))}
          </time>
          {likesStatus !== "failed" && likesStatus !== "initial" && (
            <LikeButton
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

type ArticleCollectionProps = {
  posts: ArticleMetaData[] | null;
};

export const ArticleCollection = ({ posts }: ArticleCollectionProps) => {
  if (!posts) {
    return (
      <div className={blogStyles.blogPost}>
        No posts to show.{" "}
        <Link href={routes.blog.snippets.url} className="semibold">
          All snippets
          <ArrowIcon />
        </Link>
      </div>
    );
  }

  return (
    <div>
      {posts.map((post: ArticleMetaData) => (
        <ArticleLink key={post.slug} {...post} />
      ))}
    </div>
  );
};
