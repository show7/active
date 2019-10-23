<template>
  <div class="shop-info-wrap">
    <div class="shop-banner">
      <!-- 异步加载轮播图的情况 -->
      <Swiper v-if="banners.length > 0">
        <Slide v-for="(item, index) in banners" :key="index">
          <img :src="item" alt="" />
        </Slide>
      </Swiper>
    </div>
    <div class="shop-infomation">
      <div class="shop-name">
        <h1>{{ shop.name }}</h1>
        <div class="go-shop-btn" @click="downLoadApp">
          进店逛逛
        </div>
      </div>
      <div class="shop-phone-tel">
        <div>
          <div>地址：{{ shop.address }}</div>
          <div>电话：{{ shop.phone }}</div>
        </div>
        <div class="go-shop-btn" @click="downLoadApp">
          联系卖家
        </div>
      </div>
    </div>

    <div class="shop-qq-wechat">
      <div>
        <img src="../../assets/images/qq.png" alt="" />
        <div>{{ shop.qqchat }}</div>
      </div>
      <div>
        <img src="../../assets/images/wechat.png" alt="" />
        <div>{{ shop.wechat }}</div>
      </div>
    </div>
    <br />
    <div class="shop-main-business">
      <h1>主营</h1>
      <div class="main-business-types text-ellipsis">
        <span v-for="(item, index) in shop.categories" :key="index"
          >{{ item.name }} 、</span
        >
      </div>
      <h2>详情</h2>
      <div class="shop-all-business">
        {{ shop.description }}
      </div>
    </div>
    <br />
    <div class="shop-enterprise-introduction">
      <h1>企业介绍</h1>
      <div>
        {{ shop.description }}
      </div>
    </div>
    <br />
    <div class="shop-introduction-images">
      <div>
        <h1>企业相册</h1>
        <div>更多 ></div>
      </div>
      <div class="scroll-box">
        <ul>
          <li v-for="(img, index) in images" :key="index">
            <img :src="img.path" alt="" />
          </li>
        </ul>
      </div>
    </div>
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
        进入店铺
      </div>
    </div>
  </div>
</template>
<script>
import { Swiper, Slide } from "vue-swiper-component";
import { Shop, Banners, Images } from "api";
import { getQueryString } from "../../util";
export default {
  components: {
    Swiper,
    Slide
  },
  data() {
    return {
      banners: [],
      value: ""
    };
  },
  apollo: {
    images() {
      return {
        query: Images.query,
        variables() {
          return {
            ImageSearchInput: { imageTypeId: getQueryString("shopId") }
          };
        }
      };
    },
    shop() {
      return {
        query: Shop.shop,
        variables() {
          return {
            input: {
              id: getQueryString("shopId")
            }
          };
        },
        result({ data }) {
          if (!data) return;
          console.log(data);
          this.shopInfo = data.shop;
        }
      };
    },
    banners() {
      return {
        query: Banners.query,
        variables() {
          return {
            input: { bannerTypeId: getQueryString("shopId") }
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
    }
  },
  mounted() {
    const str = "hello world";
    const reveseStr = str => {
      return str
        .split("")
        .reverse()
        .join("");
    };
    // Array.s
    console.log(reveseStr(str));
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
.shop-info-wrap {
  background: #eaeaeaff;
  h1 {
    .font-style(@size:34px);
    font-weight: 500;
  }
  .shop-banner {
    .wh_content {
      width: 750px;
      height: 284px;

      img {
        width: 100%;
      }
    }
  }
  .shop-infomation {
    .content-box;
    .font-style(@color:#999999FF, @size:26px);
    border-bottom: 1px solid #00000014;
    .shop-name {
      .flex;
      .go-shop-btn {
        background: #f96f1cff;
        .common-btn(@borderColor:#F96F1CFF);
        .font-style(@color:#fff, @size:12px);
      }
    }
  }
  .shop-phone-tel {
    margin-top: 20px;

    & > div:first-child {
      & > div:first-child {
        margin-bottom: 20px;
      }
    }
    .flex;
    .go-shop-btn {
      background: #fff;
      .common-btn(@borderColor:#F96F1CFF);
      .font-style(@color:#F96F1CFF, @size:12px);
    }
  }
  .shop-qq-wechat {
    .content-box;
    > div {
      .flex(flex-start);
    }
  }
  .shop-main-business {
    .main-business-types {
      padding: 20px 0;
      border-bottom: 1px solid #00000014;
    }
    .content-box;

    h2 {
      .font-style(@size:34px);
      margin: 20px 0;
    }
    .shop-all-business {
      line-height: 40px;
    }
  }
  .shop-enterprise-introduction {
    h1 {
      .font-style(@size:34px);
    }
    .content-box;
    div {
      margin: 20px 0;
      line-height: 40px;
    }
  }
  .shop-introduction-images {
    .content-box;
    .scroll-box {
      overflow: hidden;
      overflow-x: scroll;
      -webkit-overflow-scrolling: touch;
    }
    ul {
      display: -webkit-box;
      li {
        width: 210px;
        height: 140px;
        margin-right: 20px;
        img {
          width: 100%;
        }
      }
    }
    & > div:first-child {
      .flex;
      div {
        .font-style(@color-content);
      }
    }
  }
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
    .flex(center);
    width: 260px;
    height: 76px;
    background: linear-gradient(
      360deg,
      rgba(76, 166, 252, 1) 0%,
      rgba(144, 190, 250, 1) 100%
    );
    border-radius: 40px;
  }

  height: 120px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
