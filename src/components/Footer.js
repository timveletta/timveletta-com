import React from "react";
import Contact from "./Contact";

import { MailIcon } from "./Icon";

const Footer = class extends React.Component {
  render() {
    return (
      <footer className="bg-gray-800">
        <div className="container mx-auto py-10 grid gap-8 grid-cols-1 md:grid-cols-contact items-center">
          <div>
            <h1 className="text-white text-sans font-bold tracking-wide text-3xl mb-8">
              Got a question? Just want to say hi?
            </h1>
            <p className="flex items-center text-white text-sans font-bold tracking-wide">
              <MailIcon fill="#01bfa6" className="mr-4" />
              tim.veletta@gmail.com
            </p>
          </div>
          <Contact />
        </div>
      </footer>
    );
  }
};

export default Footer;
