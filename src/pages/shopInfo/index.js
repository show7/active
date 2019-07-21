import Vue from "vue";
import shopInfo from "./index.vue";
import { createProvider } from "../../vue-apollo";
Vue.config.productionTip = false;
new Vue({
  apolloProvider: createProvider(),
  render: h => h(shopInfo)
}).$mount("#app");
