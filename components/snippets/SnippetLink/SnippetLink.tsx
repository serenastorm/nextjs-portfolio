import Link from "next/link";
import { SnippetLikeButton, SnippetPills } from "components/snippets";
import { GoToLinkIcon } from "assets/icons";
import { BlogPostResponse } from "infrastructure/blog/types";
import { getCategory } from "helpers/blog";
import { routes } from "infrastructure/routes/constants";
import { useLikes } from "infrastructure/hooks";

import blogStyles from "styles/blog/Blog.module.scss";
import blogIndexStyles from "styles/blog/BlogIndex.module.scss";

type BlogPost = BlogPostResponse & {
  postIndex: number;
};

export const SnippetLink = ({ fields, sys }: BlogPost) => {
  const { totalLikes, likesAreLoading, addLike, removeLike } = useLikes(sys.id);
  const relativeTimeFormatter = new Intl.RelativeTimeFormat("en", {
    numeric: "auto",
  });
  const { category, date, shortText, slug, subcategory, title } = fields;

  const timeDivisions: {
    amount: number;
    name: Intl.RelativeTimeFormatUnit;
  }[] = [
    { amount: 60, name: "seconds" },
    { amount: 60, name: "minutes" },
    { amount: 24, name: "hours" },
    { amount: 7, name: "days" },
    { amount: 4.34524, name: "weeks" },
    { amount: 12, name: "months" },
    { amount: Number.POSITIVE_INFINITY, name: "years" },
  ];

  const formatRelativeTime = (date: Date) => {
    let duration = (date.getTime() - new Date().getTime()) / 1000;

    for (let i = 0; i <= timeDivisions.length; i++) {
      const division = timeDivisions[i];
      if (Math.abs(duration) < division.amount) {
        return relativeTimeFormatter.format(
          Math.round(duration),
          division.name
        );
      }
      duration /= division.amount;
    }
  };

  return (
    <li className={blogIndexStyles.blogPost}>
      <Link
        href={`/${encodeURIComponent(category)}/${encodeURIComponent(slug)}`}
        passHref
      >
        <a
          className={`${blogIndexStyles.blogPostLink} ${blogIndexStyles.linkWithIcon}`}
        >
          <h3 className={blogIndexStyles.blogPostTitle}>
            {title}{" "}
            <GoToLinkIcon className={blogIndexStyles.blogGoToLinkIcon} />
          </h3>
        </a>
      </Link>
      {shortText && <p>{shortText}</p>}

      <div
        className={`${blogStyles.blogArticleMeta} ${blogIndexStyles.blogArticleMeta}`}
      >
        <time dateTime={new Date(date).toISOString()}>
          <p className="semibold">
            {formatRelativeTime(new Date(date))}

            {subcategory && (
              <>
                {"  "}
                in{" "}
                <Link
                  href={{
                    pathname: routes.blog.snippets.url,
                    query: { cat: subcategory },
                  }}
                  passHref
                >
                  <a className="medium">{getCategory(subcategory).label}</a>
                </Link>
              </>
            )}
          </p>
          {!likesAreLoading && (
            <SnippetLikeButton
              total={totalLikes}
              add={addLike}
              remove={removeLike}
              articleId={sys.id}
            />
          )}
        </time>
        {fields.tags && <SnippetPills types={fields.tags} />}
      </div>
    </li>
  );
};

const SnippetLinks = ({ posts }: { posts: BlogPostResponse[] | null }) => {
  if (!posts) {
    return (
      <li className={blogIndexStyles.blogPost}>
        No posts to show.{" "}
        <Link href={routes.blog.snippets.url} passHref>
          <a className="semibold">
            All snippets
            <GoToLinkIcon />
          </a>
        </Link>
      </li>
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
