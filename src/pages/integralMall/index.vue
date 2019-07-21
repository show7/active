<template>
  <div class="integral-mall-wrap">
    <div class="integral-top">
      <div>积分<span>100</span></div>
      <div>兑换记录</div>
    </div>
    <div class="gift-box">
      <div class="gift-item" v-for="(item, index) in gifts" :key="index">
        <div class="gift-img"><img :src="item.img" alt="" /></div>
        <div class="gift-title">{{ item.title }}</div>
        <div class="gift-operation">
          <div>{{ item.price }}积分</div>
          <div @click.stop="redeemNow">立即兑换</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "integralMall",
  data() {
    return {
      msg: "ppppppp",
      gifts: [
        {
          title: "5元无门槛券",
          price: "800",
          img: "https://user-gold-cdn.xitu.io/collection/default-images/14.jpg"
        },
        {
          title: "5元无门槛券",
          price: "800",
          img: "https://user-gold-cdn.xitu.io/collection/default-images/14.jpg"
        },
        {
          title: "5元无门槛券",
          price: "800",
          img: "https://user-gold-cdn.xitu.io/collection/default-images/14.jpg"
        },
        {
          title: "5元无门槛券",
          price: "800",
          img: "https://user-gold-cdn.xitu.io/collection/default-images/14.jpg"
        }
      ]
    };
  },
  methods: {
    redeemNow() {
      console.log("兑换");
    }
  }
};
</script>
<style lang="less">
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
  padding: 10px 0;
  justify-content: space-around;
}
.gift-item {
  width: 326px;
  padding: 19px;
  margin: 5px 0;
}
.gift-img {
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
    font-size: 28px;
    font-weight: 500;
    color: rgba(204, 159, 94, 1);
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
