<!--
 * @Author: 周跃强
 * @LastEditTime: 2019-10-13 23:45:36
 -->
<template>
  <div class="video-component">
    <video-player class="video-player-box"
                  ref="videoPlayer"
                  :options="playerOptions"
                  :playsinline="true"
                  customEventName="customstatechangedeventname">
    </video-player>
    <div class="shop-info">
      <img :src="profilePicture"
           alt="" />
      <h1>{{ name }}</h1>
    </div>
    <div class="contact-us">
      <a href="https://www.pgyer.com/DuZy">点击下载</a>
    </div>
  </div>
</template>
<script>
import "video.js/dist/video-js.css";

import { videoPlayer } from "vue-video-player";
import { Video } from "api";
import { getQueryString } from "util";
export default {
  components: {
    videoPlayer
  },
  data () {
    return {
      name: "",
      profilePicture: "",
      playerOptions: {
        // videojs options
        muted: true,
        autoplay: true,
        fluid: true,
        language: "zh-CN",
        aspectRatio: "16:9",
        notSupportedMessage: "此视频暂无法播放，请稍后再试",
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [
          {
            type: "video/mp4",
            src: ""
          }
        ],
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true
        }
      }
    };
  },
  apollo: {
    awards () {
      return {
        query: Video.query,
        variables () {
          return {
            id: getQueryString("videoId")
          };
        },
        result ({ data }) {
          if (!data) return;
          const {
            videoUrl,
            user: { profilePicture, name }
          } = data.video;

          this.playerOptions.sources[0].src = videoUrl;
          this.profilePicture = profilePicture;
          this.name = name;
          console.log(data);
        }
      };
    }
  }
};
</script>
<style lang="less">
@import "../../style/index.less";
.video-component {
  background: #f2f2f2;
  min-height: 100vh;
}
.vjs_video_3-dimensions {
  width: 100% !important;
  height: 400px;
  .vjs-big-play-button {
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    margin: auto;
  }
}
.shop-info {
  width: 100%;
  height: 100px;

  display: flex;
  padding: 0 20px;
  align-items: center;
  background: #fff;

  img {
    width: 66px;
    height: 66px;

    border-radius: 100%;
    margin-right: 20px;
    box-shadow: 5px 5px 0 #f2f2f2;
  }
}
.contact-us {
  position: absolute;
  bottom: 40px;
  left: 0;
  right: 0;

  a {
    width: 100%;
    height: 100px;
    margin: auto;
    .flex(center);
    border-radius: 10px;
    background: #55a2f0;
    color: #fff;
    font-size: 36px;
  }
}
</style>
