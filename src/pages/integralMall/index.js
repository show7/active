import Vue from "vue";
import integralMall from "./index.vue";
import { createProvider } from "@/vue-apollo";
import { List } from "vant";
Vue.use(List);

new Vue({
  apolloProvider: createProvider(),
  render: h => h(integralMall)
}).$mount("#app");
