<template>
  <div class="rotary-wrap">
    <div class="rotary-banner">
      <img src="../../assets/images/title.png" alt="" />
      <img src="../../assets/images/taili.png" alt="" />
      <br />
      <div class="rotary-btn" @click="checkIn">
        <img src="../../assets/images/qiandao.png" alt="" />
      </div>
    </div>
    <img class="rotary-title" src="../../assets/images/choujiang.png" alt="" />
    <div id="rotary-table">
      <div
        v-for="(award, index) in awards"
        :key="index"
        class="award"
        :class="['award' + index]"
      >
        <img class="gift-img" :src="award.cover" alt="" />
        <div class="gift-award-gold">{{ award.gold }}</div>
        <div :class="['awards', { active: index == current }]" />
      </div>
      <div id="start-btn" @click="start">开始抽奖</div>
    </div>
  </div>
</template>
<script>
import { Activity } from "api";
import { getQueryString } from "util";
import { Toast } from "vant";
const userId = getQueryString("userId");
export default {
  name: "Raffle",
  data() {
    return {
      current: 0,
      userId,
      // awards: [
      //   {
      //     id: 1,
      //     name: "空",
      //     image:
      //       "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563686049&di=1360772e2b7cd4ae5d2c058a8c7e5be4&imgtype=jpg&er=1&src=http%3A%2F%2Fwww.adwzw.com%2Fuploadfile%2F2018%2F0611%2F20180611054725305.jpg"
      //   },
      //   {
      //     id: 2,
      //     name: "眼镜",
      //     image:
      //       "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563686049&di=1360772e2b7cd4ae5d2c058a8c7e5be4&imgtype=jpg&er=1&src=http%3A%2F%2Fwww.adwzw.com%2Fuploadfile%2F2018%2F0611%2F20180611054725305.jpg"
      //   },
      //   {
      //     id: 3,
      //     name: "包",
      //     image:
      //       "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563686049&di=1360772e2b7cd4ae5d2c058a8c7e5be4&imgtype=jpg&er=1&src=http%3A%2F%2Fwww.adwzw.com%2Fuploadfile%2F2018%2F0611%2F20180611054725305.jpg"
      //   },
      //   {
      //     id: 4,
      //     name: "笨驴",
      //     image:
      //       "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563686049&di=1360772e2b7cd4ae5d2c058a8c7e5be4&imgtype=jpg&er=1&src=http%3A%2F%2Fwww.adwzw.com%2Fuploadfile%2F2018%2F0611%2F20180611054725305.jpg"
      //   },
      //   {
      //     id: 5,
      //     name: "书",
      //     image:
      //       "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563686049&di=1360772e2b7cd4ae5d2c058a8c7e5be4&imgtype=jpg&er=1&src=http%3A%2F%2Fwww.adwzw.com%2Fuploadfile%2F2018%2F0611%2F20180611054725305.jpg"
      //   },
      //   {
      //     id: 6,
      //     name: "手链",
      //     image:
      //       "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563686049&di=1360772e2b7cd4ae5d2c058a8c7e5be4&imgtype=jpg&er=1&src=http%3A%2F%2Fwww.adwzw.com%2Fuploadfile%2F2018%2F0611%2F20180611054725305.jpg"
      //   },
      //   {
      //     id: 7,
      //     name: "美女",
      //     image:
      //       "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563686049&di=1360772e2b7cd4ae5d2c058a8c7e5be4&imgtype=jpg&er=1&src=http%3A%2F%2Fwww.adwzw.com%2Fuploadfile%2F2018%2F0611%2F20180611054725305.jpg"
      //   },
      //   {
      //     id: 8,
      //     name: "iphone",
      //     image:
      //       "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563686049&di=1360772e2b7cd4ae5d2c058a8c7e5be4&imgtype=jpg&er=1&src=http%3A%2F%2Fwww.adwzw.com%2Fuploadfile%2F2018%2F0611%2F20180611054725305.jpg"
      //   }
      // ],
      speed: 200,
      diff: 15,
      award: {},
      time: 0
    };
  },
  apollo: {
    awards() {
      return {
        query: Activity.query,
        update: value => {
          console.log(value);
          return value.activity.products;
        }
      };
    }
  },
  methods: {
    start() {
      // 开始抽奖
      this.drawAward();
      this.time = Date.now();
      this.speed = 200;
      this.diff = 15;
    },
    async checkIn() {
      try {
        await this.$apollo.mutate({
          mutation: Activity.checkIn,
          variables: {
            userId: this.userId
          }
        });
        Toast("签到成功");
      } catch (e) {
        const message = e.message.split(":")[1];
        Toast(message);
      }
    },
    async drawAward() {
      // 请求接口, 这里我就模拟请求后的数据(请求时间为2s)
      try {
        const { data } = await this.$apollo.mutate({
          mutation: Activity.luckDraw,
          variables: {
            input: {
              userId: this.userId,
              activityId: "YWN0aXZpdHkvMg=="
            }
          }
        });
        console.log(data);
        this.award = data.luckDraw;
        this.move();
      } catch (e) {
        const message = e.message.split(":")[1];
        Toast(message);
      }
    },
    move() {
      window.timeout = setTimeout(() => {
        this.current++;
        if (this.current > 7) {
          this.current = 0;
        }
        if (this.award.id && (Date.now() - this.time) / 1000 > 2) {
          this.speed += this.diff;
          if (
            (Date.now() - this.time) / 1000 > 4 &&
            this.award.id == this.awards[this.current].id
          ) {
            clearTimeout(window.timeout);
            setTimeout(() => {
              Toast(`恭喜你，抽中了${this.award.gold}${this.award.name}`);
            }, 0);
            return;
          }
        } else {
          this.speed -= this.diff;
        }

        console.log(this.speed);
        this.move();
      }, this.speed);
    }
  }
};
</script>

<style rel="stylesheet/less" lang="less">
.rotary-wrap {
  min-height: 100vh;
  background: url("../../assets/images/bg.png") no-repeat center;
  background-size: 100%;
}
.rotary-banner {
  padding-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 650px;
  height: 434px;
  margin: auto;
  background: url("../../assets/images/hua.png");
  background-size: 100%;
}
.gift-img {
  width: 100%;
}
#rotary-table {
  width: 646px;
  height: 444px;
  position: relative;
  margin: auto;
  background: url("../../assets/images/panbg.png");
  background-size: cover;
  .award {
    width: 194px;
    height: 127px;
    display: flex;
    align-items: center;
    border-radius: 10px 10px 10px 10px;
    // line-height: 96px;
    text-align: center;
    float: left;
    position: absolute;
    overflow: hidden;
    background-color: aquamarine;
    active {
      background-color: #e7c000;
    }
  }
  .active {
    background-color: #e7c000;
    opacity: 0.5;
  }
  .awards {
    position: absolute;
    z-index: 10;
    width: 100%;
    height: 100%;
    top: 0;
    border-radius: 10px 10px 10px 10px;
  }
  .award0 {
    top: 21px;
    left: 21px;
  }
  .award1 {
    top: 21px;
    left: 226px;
  }
  .award2 {
    top: 21px;
    right: 22px;
  }
  .award3 {
    top: 160px;
    right: 22px;
  }
  .award4 {
    bottom: 22.5px;
    right: 22px;
  }
  .award5 {
    bottom: 22.5px;
    right: 226px;
  }
  .award6 {
    bottom: 22.5px;
    left: 21px;
  }
  .award7 {
    top: 160px;
    left: 21px;
  }
  #start-btn {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    transform: translateY(-50%);
    width: 194px;
    height: 127px;
    margin: auto;
    line-height: 127px;
    text-align: center;
    font-size: 34px;
    color: #fff;
    border-radius: 10px 10px 10px 10px;
    background-color: #0092ef;
  }
}
.rotary-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 252px;
  height: 82px;
  img {
    width: 162px;
    height: 38px;
  }
  background: url("../../assets/images/qiandaobg.png");
  background-size: cover;
}
.rotary-title {
  display: block;
  margin: 50px auto;
}
.gift-award-gold {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  font-size: 5vmin;
  justify-content: center;
  align-items: center;
}
</style>
