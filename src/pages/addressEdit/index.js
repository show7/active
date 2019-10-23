import Vue from "vue";
import addressEdit from "./index.vue";
import { createProvider } from "@/vue-apollo";
import { AddressEdit } from "vant";
Vue.use(AddressEdit);
new Vue({
  apolloProvider: createProvider(),
  render: h => h(addressEdit)
}).$mount("#app");
