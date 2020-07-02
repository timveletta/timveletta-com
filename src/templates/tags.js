import React from "react";
import { Helmet } from "react-helmet";
import { Link, graphql } from "gatsby";
import Layout from "../components/Layout";
import { BlogRoll } from "../components/BlogRoll";

const TagRoute = ({ data, pageContext }) => {
  const tag = pageContext.tag;
  const title = data.site.siteMetadata.title;

  return (
    <Layout>
      <Helmet title={`${tag} | ${title}`} />
      <div className="container mx-auto py-20 mt-20">
        <a
          href="/blog"
          className="font-bold text-sm my-4 py-4 text-primary self-end"
        >
          ⭠ Back to the blog
        </a>
        <h1 className="text-3xl leading-9 font-extrabold text-gray-900 tracking-tight sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 mt-4">
          Posts tagged with "{tag}"
        </h1>
        <hr className="h-4 w-20 mt-6 mb-6 bg-primary" />
        <BlogRoll data={data} />
      </div>
    </Layout>
  );
};

export default TagRoute;

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
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
                fluid(maxWidth: 420, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;
