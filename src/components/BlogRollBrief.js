import React from "react";
import { graphql, StaticQuery } from "gatsby";
import { BlogRoll } from "./BlogRoll";

export default () => (
  <StaticQuery
    query={graphql`
      query BlogRollBriefQuery {
        allMarkdownRemark(
          limit: 3
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: {
            frontmatter: {
              templateKey: { eq: "blog-post" }
              isDraft: { ne: true }
            }
          }
        ) {
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
                externalLink
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
    `}
    render={(data, count) => <BlogRoll data={data} count={count} />}
  />
);
