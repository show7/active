import Vue from "vue";
import addAddress from "./index.vue";
import { AddressEdit } from "vant";
import { createProvider } from "@/vue-apollo";
Vue.use(AddressEdit);
new Vue({
  apolloProvider: createProvider(),
  render: h => h(addAddress)
}).$mount("#app");
