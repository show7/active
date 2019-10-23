<template>
  <div class="good-info-wrap">
    <div class="good-banner-swiper">
      <!-- 异步加载轮播图的情况 -->
      <Swiper v-if="banners.length > 0">
        <Slide v-for="(item, index) in banners" :key="index">
          <img :src="item" alt="" />
        </Slide>
      </Swiper>
    </div>
    <div class="good-info">
      <div class="good-info-price">
        ￥<span>{{ goodInfo.goodSalePrice }}</span>
      </div>
      <div class="good-info-title">{{ goodInfo.name }}</div>
      <div class="good-info-sub">{{ goodInfo.subTitle }}</div>
    </div>
    <br />
    <div class="good-address-box">
      <div>
        <div>
          发货<span v-show="goodInfo.shippingAddress" class="meniu-content"
            >{{ goodInfo.shippingAddress }} | 快递费:{{
              goodInfo.freight
            }}</span
          >
        </div>
        <div>已售：{{ goodInfo.goodsSales }}</div>
      </div>
      <div>
        <div>优惠</div>
        <div @click="downLoadApp">领券<span> ></span></div>
      </div>
    </div>
    <br />
    <div class="good-address-box">
      <div>
        <div>
          服务<span class="meniu-content">{{ goodInfo.terms }}</span>
        </div>
        <div><span> ＞</span></div>
      </div>
      <div>
        <div>
          规格
        </div>
        <div class="meniu-content" v-html="goodInfo.goodParamter" />
        <!-- <div>领券<span> ＞</span></div> -->
      </div>
    </div>
    <br />
    <div v-show="total" class="good-evaluate-box">
      <div>
        <div>宝贝评价({{ total }})</div>
        <div class="see-more" @click="downLoadApp">查看全部 ＞</div>
      </div>
      <div v-for="(item, index) in comments" :key="index">
        <div class="good-evaluate-user">
          <img :src="item.user.profilePicture" alt="" />
          <div class="user-name">{{ item.user.name }}</div>
        </div>
        <div>{{ item.comment }}</div>
      </div>
    </div>
    <br />
    <div class="good-shop-card">
      <div>
        <img :src="shopInfo.cover" alt="1212" />
        <span class="good-shop-name">{{ shopInfo.name }}</span>
      </div>
      <div class="go-shop-button" @click="downLoadApp">进入店铺</div>
    </div>
    <br />
    <div class="good-shop-info">
      <div>
        {{ shopInfo.description }}
      </div>
    </div>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <div class="fiexd-bottom-button" @click="downLoadApp">
      <img
        class="fiexd-bottom-button-icon"
        src="../../assets/images/call_helper.png"
        alt=""
      />
      <img
        class="fiexd-bottom-button-icon"
        src="../../assets/images/favourite.png"
        alt=""
      />
      <div class="join-buy-button">
        <div>加入购物车</div>
        <div>立即购买</div>
      </div>
    </div>
  </div>
</template>
<script>
import { Swiper, Slide } from "vue-swiper-component";
import { Goods, Shop, Banners, Comments } from "api";
import { getQueryString } from "../../util";

export default {
  components: {
    Swiper,
    Slide
  },
  data() {
    return {
      goodInfo: {},
      banners: [],
      html: "<p>dadkjadliajdajdla</p>",
      total: "",
      comments: [],
      shopInfo: {}
    };
  },
  mounted() {
    console.log(getQueryString("goodId"));
  },
  apollo: {
    queryGood() {
      return {
        query: Goods.queryGood,
        deep: true,
        // 响应式参数
        variables() {
          return {
            input: {
              id: getQueryString("goodId")
            }
          };
        },
        // 可选结果钩子
        result({ data }) {
          if (!data) return;
          this.goodInfo = data.good;
          // this.categories = data.good.categories.map(item => item.id);
          console.log(data);
          // this.ruleForm = data.good;
        }
      };
    },
    banners() {
      return {
        query: Banners.query,
        variables() {
          return {
            input: { bannerTypeId: getQueryString("goodId") }
          };
        },
        result({ data }) {
          if (!data) return;
          console.log(data);
          this.banners = data.banners.map(item => item.path);
          // this.banners = data.banners.map(item => {
          //   return {
          //     url: item.path
          //   };
          // });
          // this.ruleForm.banners = data.banners.map(item => item.path);
        }
      };
    },
    queryComments() {
      return {
        query: Comments.query,
        variables() {
          return {
            getCommentInput: {
              typeId: getQueryString("goodId"),
              limit: 1,
              offset: 1
            }
          };
        },
        result({ data }) {
          if (!data) return;
          this.total = data.comments.pageInfo.total;
          this.comments = data.comments.edges;
          console.log(data);
        }
      };
    },
    shop() {
      return {
        query: Shop.shop,
        skip: () => !this.goodInfo.shopId,
        variables() {
          return {
            input: {
              id: this.goodInfo.shopId
            }
          };
        },
        result({ data }) {
          if (!data) return;
          console.log(data);
          this.shopInfo = data.shop;
        }
      };
    }
  },
  methods: {
    downLoadApp() {
      window.location.href = "http://www.baidu.com";
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
    .fiexd-bottom-button-icon {
      width: 52px;
      height: 78px;
    }
    .flex;
    .join-buy-button {
      .font-style(#fff, 28px);
      .flex;
      > div:last-child {
        .flex(center);
        width: 218px;
        height: 76px;
        background: linear-gradient(360deg, #2d6effff 0%, #3ec2f3ff 100%);

        border-radius: 0px 40px 40px 0px;
      }
      > div:first-child {
        .flex(center);
        width: 218px;
        height: 76px;
        background: linear-gradient(
          360deg,
          rgba(76, 166, 252, 1) 0%,
          rgba(144, 190, 250, 1) 100%
        );
        border-radius: 40px 0 0 40px;
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
