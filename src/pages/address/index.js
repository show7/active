import Vue from "vue";
import address from "./index.vue";
import { createProvider } from "@/vue-apollo";
import { AddressList } from "vant";
Vue.use(AddressList);
new Vue({
  apolloProvider: createProvider(),
  render: h => h(address)
}).$mount("#app");
