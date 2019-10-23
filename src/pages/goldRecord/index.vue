<template>
  <div class="integral-mall-wrap">
    <div class="integral-top">
      <div>兑换记录</div>
    </div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(item, index) in goldReaordList"
        :key="index"
        :title="item.goldProduct.name"
        :value="item.status"
        size="large"
        :label="item.createdAt"
      />
    </van-list>
  </div>
</template>
<script>
import { Gold, User } from "api";
import { getQueryString } from "util";
import { Toast } from "vant";
import moment from "moment";
import { constants } from "crypto";
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
      goldReaordList: [],
      userInfo: {},
      statusMap: {
        WAIT_SHIP: "待发货",
        WAIT_RECEIPT: "待收货",
        UNUSUAL: "异常",
        COMPLETE: "订单完成"
      }
    };
  },
  apollo: {
    queryOrder() {
      return {
        query: Gold.goldOrders,
        skip: () => !this.filters.offset,
        variables() {
          return {
            GoldOrdersQuery: {
              userId: getQueryString("userId"),
              ...this.filters
            }
          };
        },
        result({ data }) {
          if (!data) return;
          //   console.log(data.goldOrders.edges);
          data.goldOrders.edges.forEach(item => {
            item.createdAt = moment(Number(item.createdAt)).format(
              "YYYY-MM-DD HH:mm:ss"
            );
            item.status = this.statusMap[item.status];
          });
          this.goldReaordList = this.goldReaordList.concat(
            data.goldOrders.edges
          );
          this.loading = false;
          this.finished = data.goldOrders.edges.length < this.filters.limit;
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
    }
  },
  mounted() {
    console.log(moment(1566278784444).format("YYYY-MM-DD HH:mm:ss"));
  },
  methods: {
    onLoad() {
      this.filters.offset += 1;
      if (this.finished) {
        this.loading = false;
      }
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
