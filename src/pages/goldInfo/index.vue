<template>
  <div class="good-info-wrap">
    <div v-if="goldInfo.banners.length > 0" class="good-banner-swiper">
      <!-- 异步加载轮播图的情况 -->
      <Swiper>
        <Slide v-for="(item, index) in goldInfo.banners" :key="index">
          <img :src="item.path" alt="" />
        </Slide>
      </Swiper>
    </div>
    <div class="good-info">
      <div class="good-info-price">
        金币:<span>{{ goldInfo.salePrice }}</span>
      </div>
      <div class="good-info-title">{{ goldInfo.name }}</div>
      <div class="good-info-sub">库存：{{ goldInfo.stock }}</div>
    </div>
    <br />
    <br />
    <div class="good-address-box">
      <div>
        <div>
          商品简介
        </div>
        <!-- <div>领券<span> ＞</span></div> -->
      </div>
      <div class="meniu-content" v-html="goldInfo.description" />
    </div>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <div class="fiexd-bottom-button" @click="redeemNow(goldInfo)">
      <div class="join-buy-button">
        <div>立即兑换</div>
      </div>
    </div>
  </div>
</template>
<script>
import { Swiper, Slide } from "vue-swiper-component";
import { Gold } from "api";
import { Toast } from "vant";
import { getQueryString } from "util";

export default {
  components: {
    Swiper,
    Slide
  },
  data() {
    return {
      goldInfo: {
        banners: []
      }
    };
  },
  mounted() {
    console.log(getQueryString("goodId"));
    // alert(location.href);
  },
  apollo: {
    goldProduct() {
      return {
        query: Gold.goldProduct,
        // 响应式参数
        variables() {
          return {
            id: getQueryString("goldProductId")
          };
        },
        // 可选结果钩子
        result({ data }) {
          if (!data) return;
          this.goldInfo = data.goldProduct;
          // this.categories = data.good.categories.map(item => item.id);
          console.log(data);
          // this.ruleForm = data.good;
        }
      };
    }
  },
  methods: {
    async redeemNow(item) {
      const { id, name, cover, salePrice, description } = item;
      location.href = `/activity/exchangeOrders.html?goldProductId=${id}&userId=${getQueryString(
        "userId"
      )}&name=${name}&cover=${cover}&salePrice=${salePrice}&description=${description}`;
    }
  }
};
</script>
<style lang="less">
@import "../../style/index.less";
.good-banner-swiper {
  .wh_content {
    width: 750px;
    height: 750px;
    .flex(center);
    img {
      width: 100%;
    }
  }
}
.good-info-wrap {
  .font-style();
  background: #f8f8f8;
  .good-info {
    .content-box;
  }
  .good-info-price {
    .font-style(@color-origin, 14px);
    span {
      .font-style(@color-origin, 36px);
    }
  }
  .good-info-title {
    margin: 10px 0 20px 0;
    .font-style(@size:30px);
    .text-ellipsis;
  }
  .good-info-sub {
    .font-style(@color-content);
    .text-ellipsis;
  }
  .good-address-box {
    .font-style(@color-content);
    .content-box;
    > div:first-child {
      margin-bottom: 16px;
    }
    > div {
      .flex;
    }
    .meniu-content {
      .font-style(@color-title);
      margin-left: 28px;
    }
  }

  .good-evaluate-box {
    .content-box;
    > div:first-child {
      .flex;
    }
    .see-more {
      color: @color-blue;
    }
  }
  .good-evaluate-user {
    margin: 30px 0 20px 0;
    .flex(flex-strat);
    @color: @color-content;
    .user-name {
      .text-ellipsis;
    }
    img {
      width: 40px;
      height: 40px;
      border-radius: 100%;
      overflow: hidden;
      margin-right: 10px;
    }
  }
  .good-shop-card {
    .content-box(10px);
    .flex;
    > div:first-child {
      .flex;
      img {
        width: 80px;
        height: 80px;
      }
    }
    .good-shop-name {
      .font-style(@size:26px);
      margin-left: 10px;
    }
    .go-shop-button {
      width: 158px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      .font-style(@color-blue, 22px);
      border-radius: 20px;
      border: 1px solid @color-blue;
    }
  }
  .good-shop-info {
    .content-box(10px);
  }
  .fiexd-bottom-button {
    .content-box(22px);
    .flex(center);
    .fiexd-bottom-button-icon {
      width: 52px;
      height: 78px;
    }
    .join-buy-button {
      .font-style(#fff, 28px);
      .flex(center);
      > div:last-child {
        .flex(center);
        width: 400px;
        height: 76px;
        background: linear-gradient(360deg, #2d6effff 0%, #3ec2f3ff 100%);

        border-radius: 40px;
      }
    }

    height: 120px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
