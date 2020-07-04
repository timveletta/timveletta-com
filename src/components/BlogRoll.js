import React from "react";
import PropTypes from "prop-types";
import PreviewCompatibleImage from "./PreviewCompatibleImage";

const BlogPostExcerpt = ({ image, title, date, description, slug }) => (
  <article className="overflow-hidden shadow-md bg-grey grid font-sans">
    <PreviewCompatibleImage
      className="lg:h-200 xl:h-250"
      imageInfo={{
        image: image,
        alt: `featured image thumbnail for post ${title}`,
      }}
    />
    <div className="px-6 py-4">
      <a
        href={slug}
        className="font-bold text-gray-900 text-xl hover:text-primary"
      >
        {title}
      </a>
      <p className="text-gray-500 font-bold text-sm my-2">{date}</p>
      <p className="text-gray-700 text-base">{description}</p>
    </div>
    <a
      href={slug}
      className="font-bold text-sm mt-2 px-6 py-4 text-primary self-end"
    >
      Read More ⭢
    </a>
  </article>
);

export const BlogRoll = ({ data }) => {
  const { edges: posts } = data.allMarkdownRemark;

  return (
    <div className="grid gap-8 grid-cols-1 lg:grid-cols-3 justify-center">
      {posts &&
        posts.map(({ node: post }) => (
          <BlogPostExcerpt
            key={post.title}
            image={post.frontmatter.featuredimage}
            title={post.frontmatter.title}
            date={post.frontmatter.date}
            description={post.frontmatter.description}
            slug={post.fields.slug}
          />
        ))}
    </div>
  );
};

BlogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};
