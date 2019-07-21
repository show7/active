<template>
  <div class="shop-info-wrap">
    <div class="shop-banner"></div>
    <div class="shop-infomation">
      <div class="shop-name">
        <h1>济南王大汽车配件有限公司</h1>
        <div class="go-shop-btn">
          进店逛逛
        </div>
      </div>
      <div class="shop-phone-tel">
        <div>
          <div>地址：山东汽配基地总部A区47号</div>
          <div>电话：12345678901(拨打次数:</div>
        </div>
        <div class="go-shop-btn">
          联系卖家
        </div>
      </div>
    </div>

    <div class="shop-qq-wechat">
      <div>
        <img src="../../assets/images/qq.png" alt="" />
        <div>层1729836638</div>
      </div>
      <div>
        <img src="../../assets/images/wechat.png" alt="" />
        <div>层1729836638</div>
      </div>
    </div>
    <br />
    <div class="shop-main-business">
      <h1>主营</h1>
      <div class="main-business-types text-ellipsis">
        别克、雪弗兰、凯迪拉克、福特
      </div>
      <h2>详情</h2>
      <div class="shop-all-business">
        别克系列:凯悦、英朗、君越、昂科威等全车配件
        雪弗兰系列:克鲁兹、赛欧、景程、乐风、爱唯欧、乐风等全车配件
        凯迪拉克系列:ATS-L、XT4、XTS、CT6等全车配件
        福特系列:福睿斯、福克斯、蒙迪欧、锐界、翼虎、金牛座、翼搏等全车配件
      </div>
    </div>
    <br />
    <div class="shop-enterprise-introduction">
      <h1>企业介绍</h1>
      <div>
        公司主营别克、雪弗兰、凯迪拉克、福特全车配件
        济南王大汽车配件有限公司可开增值税发票 业务电话:0531-85664288/83157941
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
          <li>
            <img
              src="https://ss1.bdstatic.com/5eN1bjq8AAUYm2zgoY3K/r/www/cache/static/protocol/https/home/img/qrcode/zbios_x2_5869f49.png"
              alt=""
            />
          </li>
          <li>
            <img
              src="https://ss1.bdstatic.com/5eN1bjq8AAUYm2zgoY3K/r/www/cache/static/protocol/https/home/img/qrcode/zbios_x2_5869f49.png"
              alt=""
            />
          </li>
          <li>
            <img
              src="https://ss1.bdstatic.com/5eN1bjq8AAUYm2zgoY3K/r/www/cache/static/protocol/https/home/img/qrcode/zbios_x2_5869f49.png"
              alt=""
            />
          </li>
          <li>
            <img
              src="https://ss1.bdstatic.com/5eN1bjq8AAUYm2zgoY3K/r/www/cache/static/protocol/https/home/img/qrcode/zbios_x2_5869f49.png"
              alt=""
            />
          </li>
          <li>
            <img
              src="https://ss1.bdstatic.com/5eN1bjq8AAUYm2zgoY3K/r/www/cache/static/protocol/https/home/img/qrcode/zbios_x2_5869f49.png"
              alt=""
            />
          </li>
          <li>
            <img
              src="https://ss1.bdstatic.com/5eN1bjq8AAUYm2zgoY3K/r/www/cache/static/protocol/https/home/img/qrcode/zbios_x2_5869f49.png"
              alt=""
            />
          </li>
          <li>
            <img
              src="https://ss1.bdstatic.com/5eN1bjq8AAUYm2zgoY3K/r/www/cache/static/protocol/https/home/img/qrcode/zbios_x2_5869f49.png"
              alt=""
            />
          </li>
        </ul>
      </div>
    </div>
    <br />
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: ""
    };
  },
  apollo: {},
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
  methods: {}
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
    width: 750px;
    height: 284px;
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
</style>
