module.exports = {
  extends: ["airbnb", "prettier"],
  parser: "babel-eslint",
  plugins: ["react-hooks"],
  env: {
    jest: true,
  },
  rules: {
    "no-use-before-define": "off",
    "react/jsx-filename-extension": "off",
    "react/prop-types": "off",
    "import/prefer-default-export": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "import/extensions": "off",
  },
  globals: {
    fetch: false,
  },
};
