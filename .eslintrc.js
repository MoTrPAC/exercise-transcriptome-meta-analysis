module.exports = {
  "extends": [
    "react-app",
    "react-app/jest",
    "plugin:prettier/recommended",
    "prettier"
  ],
  "plugins": [
    "prettier"
  ],
  "rules": {
    "jsx-a11y/label-has-for": "off",
    "jsx-a11y/label-has-associated-control": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "import/no-extraneous-dependencies": [
      "error",
      {"devDependencies": true}
    ],
    "react/jsx-props-no-spreading": "off",
    "prettier/prettier": "off"
  },
  "env": {
    "browser": true,
    "jest": true
  }
};
