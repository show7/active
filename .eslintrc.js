module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/prettier"],
  rules: {
    "no-console": "off",
    "no-debugger": "off",
    singleQuote: true
    // 'graphql/template-strings': [
    //   'error',
    //   {
    //     env: 'literal',
    //     projectName: 'app',
    //     schemaJsonFilepath: 'node_modules/.temp/graphql/schema.json'
    //   }
    // ]
  },

  parserOptions: {
    parser: "babel-eslint"
  }

  // plugins: ['graphql']
};