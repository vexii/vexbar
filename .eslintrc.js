module.exports = {
  "env": {
    "es6": true,
    "node": true,
  },
  "plugins": [
    "flowtype",
    "react",
    "react-hooks",
  ],
  "extends": "airbnb",
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "settings": {
    "import/resolver": {
      "node": {
        "moduleDirectory": [
          "src",
          "node_modules"
        ]
      }
    }
  },
  "rules": {
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "never"
    ],
    "react-hooks/rules-of-hooks": "error",
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }]
  }
};
