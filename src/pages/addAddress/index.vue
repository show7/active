<template>
  <div>
    <van-address-edit
      :area-list="cityList"
      :show-postal="false"
      :address-info="addressInfo"
      :show-delete="edit"
      show-set-default
      ow-search-result
      :search-result="searchResult"
      @save="onSave"
      @delete="onDelete"
      change-detail="onChangeDetail"
    />
  </div>
</template>
<script>
import { cityList, getQueryString } from "util";
import { Address } from "api";
import { Toast } from "vant";
export default {
  data() {
    return {
      cityList,
      searchResult: [],
      addressInfo: {},
      edit: false
    };
  },
  mounted() {
    this.edit = Boolean(getQueryString("edit"));
    this.addressInfo = JSON.parse(getQueryString("addressInfo"));
    console.log(cityList);
  },
  methods: {
    async onSave(userInfo) {
      const {
        name,
        tel: phone,
        province,
        city,
        county: district,
        addressDetail: address,
        isDefault
      } = userInfo;
      console.log(userInfo);
      try {
        const id = !this.edit
          ? { userId: getQueryString("userId") }
          : { id: this.addressInfo.id };
        const AddressInput = !this.edit
          ? "createAddressInput"
          : "UpdateAddressInput";
        await this.$apollo.mutate({
          mutation: this.edit ? Address.updateAddress : Address.createAddress,
          variables: {
            [AddressInput]: {
              ...id,
              name,
              phone,
              province,
              city,
              district,
              address,
              isDefault
            }
          }
        });
        Toast("新增成功");
        window.history.back();
      } catch (e) {
        Toast(e);
      }
    }
  }
};
</script>
<style lang="less">
@import "../../style/index.less";
</style>
