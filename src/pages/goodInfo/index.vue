<template>
  <div class="good-info-wrap">
    <div class="good-banner-swiper">
      <!-- 异步加载轮播图的情况 -->
      <Swiper v-if="list.length > 0">
        <Slide v-for="(item, index) in list" :key="index">
          <img src="" alt="" />
        </Slide>
      </Swiper>
    </div>
    <div class="good-info">
      <div class="good-info-price">￥<span>85.00</span></div>
      <div class="good-info-title">鼎合 GT5 SJ 合成汽车润滑油</div>
      <div class="good-info-sub">汽配协会自营 正品保障 12桶起售</div>
    </div>
    <br />
    <div class="good-address-box">
      <div>
        <div>发货<span class="meniu-content">上海 | 快递：8元</span></div>
        <div>已售：1789</div>
      </div>
      <div>
        <div>优惠</div>
        <div>领券<span> ></span></div>
      </div>
    </div>
    <br />
    <div class="good-address-box">
      <div>
        <div>
          服务<span class="meniu-content">不支持7天无理由·10天内发货</span>
        </div>
        <div><span> ＞</span></div>
      </div>
      <div>
        <div>规格<span class="meniu-content">品牌 型号…</span></div>
        <div>领券<span> ＞</span></div>
      </div>
    </div>
    <br />
    <div class="good-evaluate-box">
      <div>
        <div>宝贝评价(30)</div>
        <div class="see-more">查看全部 ＞</div>
      </div>
      <div class="good-evaluate-user">
        <img
          src="https://avatars2.githubusercontent.com/u/29848297?s=40&v=4"
          alt=""
        />
        <div class="user-name">哈**哈</div>
      </div>
      <div>还没收到，不过应该不错，收到后再来追加评</div>
    </div>
    <br />
    <div class="good-shop-card">
      <div>
        <img
          src="https://avatars2.githubusercontent.com/u/29848297?s=40&v=4"
          alt="1212"
        />
        <span class="good-shop-name">邻家小铺</span>
      </div>
      <div class="go-shop-button">进入店铺</div>
    </div>
    <br />
    <div class="good-shop-info">
      <div v-html="html"></div>
    </div>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <div class="fiexd-bottom-button">
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
import { Goods } from "../api";
import { getQueryString } from "../../util";

export default {
  data() {
    return {
      list: [1, 2, 3],
      html: "<p>dadkjadliajdajdla</p>"
    };
  },
  mounted() {
    console.log(getQueryString("id"));
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
              id: getQueryString("id")
            }
          };
        },
        // 可选结果钩子
        result({ data }) {
          if (!data) return;

          // this.categories = data.good.categories.map(item => item.id);
          console.log(data);
          // this.ruleForm = data.good;
        }
      };
    },
    banners() {
      return {
        query: Goods.banners,
        variables() {
          return {
            bannerQueryInput: { bannerTypeId: getQueryString("id") }
          };
        },
        result({ data }) {
          if (!data) return;
          console.log(data);
          // this.banners = data.banners.map(item => {
          //   return {
          //     url: item.path
          //   };
          // });
          // this.ruleForm.banners = data.banners.map(item => item.path);
        }
      };
    }
  },
  components: {
    Swiper,
    Slide
  }
};
</script>
<style lang="less">
@import "../../style/index.less";
.good-banner-swiper {
  .wh_content {
    width: 750px;
    height: 750px;
    border: 1px solid red;
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
