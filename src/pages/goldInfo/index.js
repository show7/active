import Vue from "vue";
import GoldInfo from "./index.vue";
import { createProvider } from "../../vue-apollo";
new Vue({
  render: h => h(GoldInfo),
  apolloProvider: createProvider()
}).$mount("#app");
