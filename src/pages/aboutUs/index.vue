<template>
  <div class="about-us-wrap">
    <img class="about-icon" src="../../assets/images/icon.png" alt="" />
    <br />
    <div>汽配管家</div>
    <br />
    <div>
      0531-87152993
    </div>
    <img class="code-image" src="../../assets/images/code.jpg" alt="" />
    <div class="contact-us"><a href="tel:0531-87152993">联系客服</a></div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
@import "../../style/index.less";
.about-us-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 45px 0;
  color: #333333;
  font-weight: bold;
  font-size: 32px;
  min-height: 100vh;
  .about-icon {
    width: 120px;
    height: 122px;
  }
  .code-image {
    margin-top: 150px;
    width: 350px;
    height: 350px;
    // border: 1px solid red;
  }
  .contact-us {
    position: absolute;
    bottom: 40px;
    left: 0;
    right: 0;

    a {
      width: 680px;
      height: 100px;
      margin: auto;
      .flex(center);
      border-radius: 10px;
      background: #55a2f0;
      color: #fff;
      font-size: 36px;
    }
  }
}
</style>
