import React from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import { Helmet } from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";

export const BlogPostTemplate = ({
  content,
  contentComponent,
  date,
  tags,
  title,
  helmet,
  image,
}) => {
  const PostContent = contentComponent || Content;

  return (
    <article>
      {helmet || ""}
      <div className="container mx-auto max-w-screen-lg py-20 md:mt-20">
        <dd className="text-base leading-6 font-medium text-gray-500 text-center mb-4">
          {date}
        </dd>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl md:text-5xl leading-snug text-center">
          {title}
        </h1>
        <hr className="h-4 w-20 mt-3 mb-8 bg-primary mx-auto" />
        <PreviewCompatibleImage
          imageInfo={{
            image: image,
            alt: `featured image thumbnail for post ${title}`,
          }}
          className="mb-8"
        />
        <PostContent
          content={content}
          className="text-gray-900 text-base leading-7"
        />
        {tags && tags.length ? (
          <div className="my-10">
            <span className="text-gray-500 text-base mr-4">Tags</span>
            {tags.map((tag) => (
              <span className="inline-block border border-gray-700 rounded-full py-1 px-3 mr-2 mb-1 bg-gray-700 text-white hover:bg-primary hover:border-primary">
                <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
              </span>
            ))}
          </div>
        ) : null}
        <a
          href="/blog"
          className="font-bold text-sm mt-4 py-4 text-primary self-end"
        >
          ⭠ Back to the blog
        </a>
      </div>
    </article>
  );
};

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  title: PropTypes.string,
  date: PropTypes.string,
  helmet: PropTypes.object,
};

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
        date={post.frontmatter.date}
        image={post.frontmatter.featuredimage}
      />
    </Layout>
  );
};

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
        featuredimage {
          childImageSharp {
            fluid(maxWidth: 1280, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
