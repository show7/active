import Vue from "vue";
import goldRecord from "./index.vue";
import { createProvider } from "../../vue-apollo";
import { List, Cell, CellGroup } from "vant";
Vue.use(List)
  .use(Cell)
  .use(CellGroup);
new Vue({
  render: h => h(goldRecord),
  apolloProvider: createProvider()
}).$mount("#app");
