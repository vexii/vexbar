module.exports = {
  "env": {
    "es6": true,
    "node": true,
  },
  "plugins": [
    "flowtype",
    "react"
  ],
  "extends": "airbnb",
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
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
    ]
  }
};
