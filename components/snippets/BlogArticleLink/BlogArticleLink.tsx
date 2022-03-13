import Link from "next/link";
import { LikeButton, Pills } from "components/snippets";
import { GoToLinkIcon } from "assets/icons";
import { BlogPostResponse, BlogPosts } from "infrastructure/blog/types";
import { getCategory } from "helpers/blog/constants";
import { routes } from "infrastructure/routes/constants";
import { useLikes } from "infrastructure/hooks";

import blogStyles from "styles/blog/Blog.module.scss";
import blogIndexStyles from "styles/blog/BlogIndex.module.scss";

type BlogPost = BlogPostResponse & {
  postIndex: number;
};

const BlogArticleLink = ({ fields, sys, postIndex }: BlogPost) => {
  const { totalLikes, likesAreLoading, addLike, removeLike } = useLikes(sys.id);
  const relativeTimeFormatter = new Intl.RelativeTimeFormat("en", {
    numeric: "auto",
  });

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
        href={`/${encodeURIComponent(fields.category)}/${encodeURIComponent(
          fields.slug
        )}`}
        passHref
      >
        <a
          className={`${blogIndexStyles.blogPostLink} ${blogIndexStyles.linkWithIcon}`}
        >
          <h3 className={blogIndexStyles.blogPostTitle}>
            {fields.title}{" "}
            <GoToLinkIcon className={blogIndexStyles.blogGoToLinkIcon} />
          </h3>
        </a>
      </Link>
      {fields.shortText && <p>{fields.shortText}</p>}

      <div
        className={`${blogStyles.blogArticleMeta} ${blogIndexStyles.blogArticleMeta}`}
      >
        <time dateTime={new Date(fields.date).toISOString()}>
          <p className="semibold">
            {formatRelativeTime(new Date(fields.date))}

            {fields.subcategory && (
              <>
                {"  "}
                in{" "}
                <Link
                  href={{
                    pathname: routes.blog.snippets.url,
                    query: { cat: fields.subcategory },
                  }}
                  passHref
                >
                  <a className="medium">
                    {getCategory(fields.subcategory).label}
                  </a>
                </Link>
              </>
            )}
          </p>
          {!likesAreLoading && (
            <LikeButton
              total={totalLikes}
              add={addLike}
              remove={removeLike}
              articleId={sys.id}
            />
          )}
        </time>
        {fields.tags && <Pills types={fields.tags} />}
      </div>
    </li>
  );
};

const BlogArticleLinks = ({ posts, isLoading, isEmpty }: BlogPosts) => {
  if (isLoading) return <p className={blogIndexStyles.loading}>Loading...</p>;

  return isEmpty ? (
    <li className={blogIndexStyles.blogPost}>
      No posts to show.{" "}
      <Link href={routes.blog.snippets.url} passHref>
        <a className="semibold">
          All snippets
          <GoToLinkIcon />
        </a>
      </Link>
    </li>
  ) : (
    <>
      {posts.map((post: BlogPostResponse, postIndex: number) => (
        <BlogArticleLink postIndex={postIndex} key={post.sys.id} {...post} />
      ))}
    </>
  );
};

export default BlogArticleLinks;
