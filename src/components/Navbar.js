import React, { useState } from "react";
import { Link } from "gatsby";

import logo from "../img/logo.svg";
import twitter from "../img/social/twitter.svg";
import linkedin from "../img/social/linkedin-in.svg";
import github from "../img/github-icon.svg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <nav
      className="container mx-auto flex items-center justify-between flex-wrap mt-4 absolute z-10 left-1/2 transform -translate-x-1/2 px-4 md:px-0"
      role="navigation"
      aria-label="main-navigation"
    >
      <Link
        to="/"
        title="Logo"
        className="flex items-center flex-shrink-0 mr-6"
      >
        <img src={logo} alt="Tim Veletta Logo" style={{ width: "88px" }} />
      </Link>
      <div className="flex md:hidden items-center">
        <button
          className="flex items-center px-3 py-2 border rounded text-primary border-secondary hover:bg-secondary"
          onClick={toggleMenu}
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div
        className={`${
          !isOpen ? "hidden" : ""
        } w-full flex justify-end md:block md:w-auto`}
      >
        <div className="border border-gray-500 rounded mt-2 p-4 md:p-0 text-lg font-light w-64 bg-white block md:flex md:w-auto md:border-none md:bg-transparent">
          <a
            href="/#aboutme"
            className="block lg:inline-block md:mt-0 mr-6 p-2 border-b-2 border-transparent hover:border-primary w-full md:w-auto"
          >
            About Me
          </a>
          <a
            href="/blog"
            className="block lg:inline-block md:mt-0 mr-6 p-2 border-b-2 border-transparent hover:border-primary w-full md:w-auto"
          >
            Blog
          </a>
          {/* <a
            href="#responsive-header"
            className="block lg:inline-block md:mt-0 mr-6 p-2 border-b-2 hover:border-primary w-full md:w-auto"
          >
            Projects
          </a> */}
          <div className="flex mt-4 md:mt-0 p-2 md:p-0 md:py-2">
            <a
              href="https://twitter.com/timveletta"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={twitter}
                alt="Twitter"
                style={{ width: "24px" }}
                className="mr-4"
              />
            </a>
            <a
              href="https://github.com/timveletta"
              target="_blank"
              rel="noreferrer"
              className="mr-4"
            >
              <img src={github} alt="Github" style={{ width: "24px" }} />
            </a>
            <a
              href="https://linkedin.com/in/tim-veletta"
              target="_blank"
              rel="noreferrer"
            >
              <img src={linkedin} alt="LinkedIn" style={{ width: "24px" }} />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
