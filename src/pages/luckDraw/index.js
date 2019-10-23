import Vue from "vue";
import luckDraw from "./index.vue";
import { createProvider } from "../../vue-apollo";
new Vue({
  apolloProvider: createProvider(),
  render: h => h(luckDraw)
}).$mount("#app");
