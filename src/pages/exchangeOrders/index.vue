<template>
  <div class="exchange-orders-wrap">
    <div class="address-Info-wrap">
      <div>
        <img
          class="address-icon"
          src="../../assets/images/address.png"
          alt=""
        />
      </div>
      <div @click="goAddress">
        <div v-if="Object.keys(defaultAddress).length !== 0">
          <span class="address-name">{{ defaultAddress.name }}</span>
          <span class="address-phone">{{ defaultAddress.tel }}</span>
          <div class="address-content">
            {{ defaultAddress.address }}
          </div>
        </div>
        <div v-else>
          选择收货地址
        </div>
      </div>
      <div>></div>
    </div>
    <br />
    <van-card
      num="1"
      :price="salePrice"
      currency="金币："
      :desc="description"
      :title="name"
      :thumb="cover"
    />
    <van-submit-bar
      label="金币"
      currency="    :"
      :price="salePrice * 100"
      :decimal-length="0"
      button-text="提交订单"
      @submit="onSubmit"
    />
    <van-dialog
      v-model="show"
      title="兑换成功"
      show-cancel-button
      @click="confirm"
    >
      <img class="gold-img" :src="cover" />
    </van-dialog>
  </div>
</template>
<script>
import { Gold, Address } from "api";
import { getQueryString } from "util";
import { Toast } from "vant";
export default {
  data() {
    return {
      cover: "",
      salePrice: "",
      description: "",
      name: "",
      userId: "",
      show: false,
      defaultAddress: {}
    };
  },
  mounted() {
    // console.log(this.$route.query.cover);
    this.cover = getQueryString("cover");
    this.salePrice = getQueryString("salePrice");
    this.description = getQueryString("description");
    this.name = getQueryString("name");
    this.userId = getQueryString("userId");
    this.goldProductId = getQueryString("goldProductId");
  },
  apollo: {
    queryDefault() {
      return {
        query: Address.defaultAddress,
        skip: () => !this.userId,
        variables() {
          return {
            defaultAddressQuery: {
              userId: this.userId
            }
          };
        },
        result({ data }) {
          if (!data) return;

          const Address = data.defaultAddress;
          this.defaultAddress = Object.assign(
            Address,
            {
              address: `${Address.province}${Address.city}${Address.district}${Address.address}`
            },
            { tel: Address.phone }
          );
        }
      };
    }
  },
  methods: {
    goAddress() {
      location.href = `address.html?userId=${this.userId}`;
    },
    confirm() {
      location.href = `integralMall.html?userId=${this.userId}`;
    },
    async onSubmit() {
      try {
        await this.$apollo.mutate({
          mutation: Gold.createGoldOrder,
          variables: {
            input: {
              userId: this.userId,
              addressId: this.defaultAddress.id,
              goldProductId: this.goldProductId
            }
          }
        });
        this.show = true;
      } catch (e) {
        Toast(e.message);
      }
    }
  }
};
</script>
<style lang="less">
@import "../../style/index.less";
.address-Info-wrap {
  .content-box;
  .flex;
  background: #fafafa;
  > div:nth-child(2) {
    flex: 1;
  }
  .address-phone {
    color: #999;
    font-size: 16px;
    margin-left: 10px;
  }
  .address-content {
    margin-top: 20px;
    font-size: 16px;
    line-height: 35px;
  }
}
.gold-img {
  width: 100%;
}
.van-dialog__content {
  padding: 20px;
}
.address-icon {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}
</style>
