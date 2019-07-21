import Vue from "vue";
import goodInfo from "./index.vue";
import { createProvider } from "../../vue-apollo";
new Vue({
  apolloProvider: createProvider(),
  render: h => h(goodInfo)
}).$mount("#app");
