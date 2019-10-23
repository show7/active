import Vue from "vue";
import exchangeOrders from "./index.vue";

import { createProvider } from "@/vue-apollo";
import { Card, SubmitBar, Dialog } from "vant";
Vue.use(Card)
  .use(SubmitBar)
  .use(Dialog);
new Vue({
  apolloProvider: createProvider(),
  render: h => h(exchangeOrders)
}).$mount("#app");
