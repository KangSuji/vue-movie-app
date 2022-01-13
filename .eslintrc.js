module.exports = {
  env:{
    browser: true,
    node: true
  },
  extends: [
    // vue
    //'plugin:vue/vue3-essential',
    'plugin:vue/vue3-strongly-recommanded',
    //'plugin:vue/vue3-recommanded',
    // js
    'eslint: recommended'
  ],
  parseroption: {
    parser: 'babel-eslint'
  },
  rules: {
    "vue/html-closing-bracket-newline": ["error", {
      "singleline": "never",
      "multiline": "never"
    }],
    "vue/html-self-closing": ["error", {
      "html": {
        "void": "always",
        "normal": "never",
        "component": "always"
      },
      "svg": "always",
      "math": "always"
    }]
  }
}