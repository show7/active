const glob = require("glob");
const path = require("path");
const PAGE_PATH = "./src/pages/*/*.js";

// console.log(glob.sync(PAGE_PATH));
const page = page => {
  return {
    entry: page,
    title: page.split("/")[3],
    template: "public/index.html",
    filename: `${page.split("/")[3]}.html`,
    chunks: ["chunk-vendors", "chunk-common", page.split("/")[3]]
  };
};
const pageMap = {};
glob.sync(PAGE_PATH).forEach(item => {
  pageMap[item.split("/")[3]] = page(item);
});
// console.log(pageMap);
module.exports = {
  lintOnSave: true,
  outputDir: "activity",
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    }
  },
  pages: pageMap,
  chainWebpack: config => {
    config.resolve.alias.set("api", path.resolve(__dirname, "src/api")); // key,value自行定义，比如.set('@@', resolve('src/components'))
  },
  pluginOptions: {
    apollo: {
      enableMocks: true,
      enableEngine: true
    }
  }
};
