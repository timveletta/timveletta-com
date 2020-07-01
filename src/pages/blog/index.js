import React from "react";

import Layout from "../../components/Layout";
import BlogRollPaged from "../../components/BlogRollPaged";

export default class BlogIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <div className="container mx-auto py-20 mt-20">
          <h1 className="text-3xl leading-9 font-extrabold text-gray-900 tracking-tight sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
            Blog
          </h1>
          <hr className="h-4 w-20 mt-6 mb-6 bg-primary" />
          <BlogRollPaged />
        </div>
      </Layout>
    );
  }
}
