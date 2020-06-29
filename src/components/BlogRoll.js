import React from "react";
import PropTypes from "prop-types";
import { Link, graphql, StaticQuery } from "gatsby";
import PreviewCompatibleImage from "./PreviewCompatibleImage";

const BlogPostExcerpt = ({ image, title, date, description, slug }) => (
  <article className="overflow-hidden shadow-md bg-grey grid font-sans">
    <PreviewCompatibleImage
      imageInfo={{
        image: image,
        alt: `featured image thumbnail for post ${title}`,
      }}
    />
    <div className="px-6 py-4">
      <a href={slug} className="font-bold text-xl hover:text-primary">
        {title}
      </a>
      <p className="text-gray-500 font-bold text-sm my-2">{date}</p>
      <p className="text-gray-700 text-base">{description}</p>
    </div>
    <a href={slug} className="font-bold text-sm mt-2 px-6 py-4 text-primary">
      Read More
    </a>
  </article>
);

export const BlogRoll = ({ data }) => {
  const { edges: posts } = data.allMarkdownRemark;

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-3 justify-center">
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

export default () => (
  <StaticQuery
    query={graphql`
      query BlogRollQuery {
        allMarkdownRemark(
          limit: 3
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 200)
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                description
                date(formatString: "MMMM DD, YYYY")
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 120, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <BlogRoll data={data} count={count} />}
  />
);
