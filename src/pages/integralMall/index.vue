<template>
  <div class="integral-mall-wrap">
    <div class="integral-top">
      <div>
        金币<span>{{ userInfo.gold }}</span>
      </div>
      <div @click="goGoldRecord">
        兑换记录
      </div>
    </div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div class="gift-box">
        <div
          v-for="(item, index) in gifts"
          :key="index"
          class="gift-item"
          @click="goGoldInfo(item.id)"
        >
          <div class="gift-img"><img :src="item.cover" alt="" /></div>
          <div class="gift-title">{{ item.name }}</div>
          <div class="gift-operation">
            <div>{{ item.salePrice }}金币</div>
            <div @click.stop="redeemNow(item)">立即兑换</div>
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>
<script>
import { Gold, User } from "api";
import { getQueryString } from "util";
import { Toast } from "vant";
export default {
  name: "IntegralMall",
  data() {
    return {
      msg: "ppppppp",
      list: [],
      loading: false,
      finished: false,
      filters: {
        limit: 10,
        offset: 0
      },
      gifts: [],
      userInfo: {}
    };
  },
  apollo: {
    queryOrder() {
      return {
        query: Gold.goldOrders,
        variables() {
          return {
            GoldOrdersQuery: { userId: getQueryString("userId") }
          };
        },
        result({ data }) {
          console.log(data);
        }
      };
    },
    queryUser() {
      return {
        query: User.queryUser,
        variables() {
          return {
            UserQueryInput: {
              id: getQueryString("userId")
            }
          };
        },
        result({ data }) {
          if (!data) return;
          this.userInfo = data.user;
        }
      };
    },
    query() {
      return {
        query: Gold.goldProducts,
        deep: true,
        skip: () => !this.filters.offset,
        variables() {
          return {
            GoldProductsQuery: this.filters
          };
        },
        result({ data }) {
          if (!data) return;
          console.log(data.goldProducts.edges);
          this.gifts.push(...data.goldProducts.edges);
          this.$set(this, "gifts", this.gifts);
          this.loading = false;
          this.finished = data.goldProducts.edges.length < this.filters.limit;
        }
      };
    }
  },
  methods: {
    onLoad() {
      this.filters.offset += 1;
      if (this.finished) {
        this.loading = false;
      }
    },
    goGoldRecord() {
      location.href = `/activity/goldRecord.html?userId=${getQueryString(
        "userId"
      )}`;
    },
    async redeemNow(item) {
      const { id, name, cover, salePrice, description } = item;
      // try {
      //   await this.$apollo.mutate({
      //     mutation: Gold.createGoldOrder,
      //     variables: {
      //       input: {
      //         userId: getQueryString("userId"),
      //         goldProductId: id
      //       }
      //     }
      //   });
      // } catch (e) {
      //   Toast(e.message);
      // }

      // console.log(id, "兑换");
      location.href = `/activity/exchangeOrders.html?goldProductId=${id}&userId=${getQueryString(
        "userId"
      )}&name=${name}&cover=${cover}&salePrice=${salePrice}&description=${description}`;
      // this.$router.push({
      //   name: "exchangeOrders",
      //   query: {
      //     goldProductId: id,
      //     userId: getQueryString("userId"),
      //     name,
      //     cover,
      //     salePrice,
      //     description
      //   }
      // });
    },
    goGoldInfo(goldProductId) {
      location.href = `/activity/goldInfo.html?goldProductId=${goldProductId}&userId=${getQueryString(
        "userId"
      )}`;
    }
  }
};
</script>
<style lang="less">
@import "../../style/index.less";
.integral-top {
  display: flex;
  padding: 34px;
  justify-content: space-around;
  border: 1px solid #d0d0d0;
  span {
    color: #ff0000;
    padding-left: 18px;
  }
}
.gift-box {
  display: flex;
  flex-wrap: wrap;
  padding: 10px 30px;
  justify-content: space-between;
}
.gift-item {
  width: 326px;
  padding: 19px;
  margin: 5px 0;
}
.gift-img {
  .flex(center);
  width: 268px;
  height: 230px;
  margin: auto;

  img {
    width: 100%;
  }
}
.gift-title {
  font-size: 28px;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
  margin: 38px 0;
}
.gift-operation {
  display: flex;
  justify-content: space-between;
  align-items: center;

  div:nth-child(1) {
    flex: 1;
    font-size: 28px;
    font-weight: 500;
    color: rgba(204, 159, 94, 1);
    .text-ellipsis;
  }
  div:nth-child(2) {
    width: 140px;
    height: 50px;
    font-size: 30px;
    font-weight: 500;
    color: rgba(255, 255, 254, 1);
    text-align: center;
    line-height: 50px;
    background: rgba(204, 159, 94, 1);
    border-radius: 10px;
  }
}
</style>
