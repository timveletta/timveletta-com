const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: [],
  theme: {
    extend: {
      maxHeight: {
        "1/2": "50vh",
      },
      height: {
        hero: "calc(100vh - 6rem)",
      },
      maxWidth: {
        "1/2": "50vw",
      },
      colors: {
        primary: "#01bfa6",
        secondary: "#0f3d56",
        grey: "#F4F4F4",
      },
      inset: {
        "1/2": "50%",
      },
    },
  },
  variants: {},
  plugins: [],
};
