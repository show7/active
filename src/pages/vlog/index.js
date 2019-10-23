/*
 * @Author: 周跃强
 * @LastEditTime: 2019-10-13 18:17:01
 */
import Vue from "vue";
import { createProvider } from "../../vue-apollo";
import Vlog from "./index.vue";

new Vue({
  el: "#app",
  apolloProvider: createProvider(),
  render: h => h(Vlog)
});
