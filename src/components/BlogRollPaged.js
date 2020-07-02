import React from "react";
import { graphql, StaticQuery } from "gatsby";
import { BlogRoll } from "./BlogRoll";

export default () => (
  <StaticQuery
    query={graphql`
      query BlogRollPagedQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
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
