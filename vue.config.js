const glob = require("glob");
const path = require("path");
const PAGE_PATH = "./src/pages/*/*.js";

// console.log(glob.sync(PAGE_PATH));
const chineseNameMap = {
  aboutUs: "关于我们",
  agreement: "注册协议",
  goodInfo: "商品信息",
  integralMall: "金币商城",
  luckDraw: "签到抽奖",
  shopInfo: "商家详情",
  goldInfo: "金币商品详情",
  addAddress: "添加收货地址",
  address: "收货地址列表",
  exchangeOrders: "订单确认",
  goldRecord: "兑换记录"
};
const page = page => {
  return {
    entry: page,
    title: chineseNameMap[page.split("/")[3]],
    template: "./index.html",
    filename: `${page.split("/")[3]}.html`,
    chunks: ["chunk-vendors", "chunk-common", page.split("/")[3]]
  };
};
const pageMap = {};
glob.sync(PAGE_PATH).forEach(item => {
  pageMap[item.split("/")[3]] = page(item);
});
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/activity/" : "/",
  lintOnSave: false,
  outputDir: "activity",
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    }
  },
  pages: pageMap,
  chainWebpack: config => {
    config.resolve.alias.set("api", path.resolve(__dirname, "./src/api")); // key,value自行定义，比如.set('@@', resolve('src/components'))
    config.resolve.alias.set("util", path.resolve(__dirname, "./src/util"));
  },
  pluginOptions: {
    apollo: {
      enableMocks: true,
      enableEngine: true
    }
  }
};
