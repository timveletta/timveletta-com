import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";

import Layout from "../components/Layout";
import { HTMLContent } from "../components/Content";
import BlogRoll from "../components/BlogRoll";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";

export const IndexPageTemplate = ({
  title,
  image,
  subheading,
  aboutMeImage,
  aboutMe,
}) => (
  <>
    <div className="container mx-auto h-screen grid md:grid-cols-2 sm:grid-cols-1 content-center items-center gap-8 sm:mt-0">
      <div>
        <h1 className="font-sans text-6xl font-bold tracking-wide">{title}</h1>
        <hr className="h-4 w-20 mt-3 mb-3 bg-primary" />
        <h2 className="font-sans text-4xl font-thin tracking-wide leading-relaxed">
          {subheading}
        </h2>
      </div>
      <div className="w-full flex justify-center md:justify-end">
        <img className="max-h-1/2" src={image.publicURL} alt="Developer" />
      </div>
    </div>
    <section className="container mx-auto my-20">
      <h1 className="font-sans text-3xl font-bold tracking-wide text-center">
        Recent Articles
      </h1>
      <hr className="h-4 w-20 mt-3 mb-12 bg-primary mx-auto" />
      <BlogRoll />
      <div className="my-12 flex justify-center">
        <a
          href="/blog"
          className="bg-primary text-white font-bold px-4 py-2 rounded hover:bg-opacity-75"
        >
          See All Posts
        </a>
      </div>
    </section>
    <section className="container mx-auto my-20">
      <a name="aboutme" />
      <h1 className="font-sans text-3xl font-bold tracking-wide text-center">
        About Me
      </h1>
      <hr className="h-4 w-20 mt-3 mb-12 bg-primary mx-auto" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 align-center">
        <HTMLContent content={aboutMe} className="leading-loose" />
        <PreviewCompatibleImage imageInfo={aboutMeImage} className="rounded" />
      </div>
    </section>
  </>
);

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  subheading: PropTypes.string,
  description: PropTypes.string,
  aboutMe: PropTypes.string,
  aboutMeImage: PropTypes.object,
};

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        subheading={frontmatter.subheading}
        aboutMe={data.markdownRemark.html}
        aboutMeImage={frontmatter.aboutMeImage}
      />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      html
      frontmatter {
        title
        image {
          publicURL
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        aboutMeImage {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        subheading
      }
    }
  }
`;
