<template>
  <div>
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      @add="onAdd"
      @edit="onEdit"
      @select="select"
    />
  </div>
</template>
<script>
import { getQueryString } from "util";
import { Toast } from "vant";
import { Address } from "api";
export default {
  data() {
    return {
      chosenAddressId: "",
      list: [],
      userId: ""
    };
  },
  mounted() {
    this.userId = getQueryString("userId");
  },
  apollo: {
    queryAddress() {
      return {
        query: Address.queryAddress,
        skip: () => !this.userId,
        variables() {
          return {
            AddressQuery: {
              userId: this.userId
            }
          };
        },
        result({ data }) {
          if (!data) return;
          const list = data.address.map(item => {
            return {
              ...item,
              address1: item.address,
              address: `${item.province}${item.city}${item.district}${item.address}`,
              tel: item.phone
            };
          });
          const chosenAddressId = data.address.filter(item => item.isDefault);
          this.chosenAddressId =
            chosenAddressId && chosenAddressId.length
              ? chosenAddressId[0].id
              : "";
          this.list = list;
        }
      };
    }
  },
  methods: {
    onAdd() {
      location.href = `/activity/addAddress.html?userId=${this.userId}`;
    },
    onEdit(item, index) {
      location.href = `/activity/addAddress.html?userId=${
        this.userId
      }&addressInfo=${JSON.stringify(item)}&edit=true`;
      Toast("编辑地址:" + index);
    },
    async select(item, i) {
      console.log(item, i);
      const UpdateAddressInput = Object.assign(item, {
        address: item.address1,
        isDefault: true
      });
      delete item.__typename;
      delete item.tel;
      delete item.address1;
      try {
        await this.$apollo.mutate({
          mutation: Address.updateAddress,
          variables: {
            UpdateAddressInput
          }
        });
        this.$apollo.queries.queryAddress.refetch();
        window.history.back();
      } catch (e) {
        Toast(e);
      }
    },
    updataAddress() {}
  }
};
</script>
<style lang="less">
@import "../../style/index.less";
</style>
