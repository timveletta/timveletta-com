import React from "react";
import { Link } from "gatsby";

import logo from "../img/logo.svg";
import facebook from "../img/social/facebook.svg";
import instagram from "../img/social/instagram.svg";
import twitter from "../img/social/twitter.svg";
import vimeo from "../img/social/vimeo.svg";

const Footer = class extends React.Component {
  render() {
    return (
      <footer className="bg-gray-800">
        <div className="container mx-auto py-10 grid grid-cols-3">
          <div>
            <h1 className="text-white text-sans font-bold tracking-wide text-3xl">
              Got a question? Just want to say hi?
            </h1>
          </div>
        </div>
      </footer>
    );
  }
};

export default Footer;
