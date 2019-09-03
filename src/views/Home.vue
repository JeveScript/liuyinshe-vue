<template>
  <div class="page-container">
    <header class="header-container">
      <div>
        <img
          src=""
          alt=""
          class="header-logo"
          @click="arrive"
          data-id="background_container"
        />
      </div>

      <nav class="link-list">
        <a href="javascript:;" class="link-list_item">留音社</a>
        <a
          href="javascript:;"
          class="link-list_item"
          @click="arrive"
          data-id="intro_container"
          >我们的老师</a
        >
        <a
          href="javascript:;"
          class="link-list_item"
          @click="arrive"
          data-id="class_container"
          >我们的课程</a
        >
        <a
          href="javascript:;"
          class="link-list_item"
          @click="arrive"
          data-id="evaluate_container"
          >学员的评价</a
        >
      </nav>
    </header>
    <div class="body-container">
      <div class="background-container" id="background_container">
        <p class="background-title">
          留音社艺术 <br />
          art
        </p>
        <p class="background-desc">用心的艺术教学</p>
      </div>
      <div class="intro-container" id="intro_container">
        <div class="intro-text">
          <p class="intro-title">我们的老师</p>
          <p class="intro-desc">100%的艺术，来源于用心的导师</p>
        </div>
        <div class="intro-list">
          <div class="intro-list_item">
            <img src="" alt="" class="list_item-image" />
            <div class="intro-item-content">
              <p class="intro-item-content-title">李龙</p>
              <p class="intro-item-content-desc">钢琴导师</p>
              <p class="intro-item-content-text">某某专业</p>
            </div>
          </div>
          <div class="intro-list_item">
            <img src="" alt="" class="list_item-image" />
            <div class="intro-item-content">
              <p class="intro-item-content-title">李敏</p>
              <p class="intro-item-content-desc">舞蹈导师</p>
              <p class="intro-item-content-text">某某专业</p>
            </div>
          </div>
          <div class="intro-list_item">
            <img src="" alt="" class="list_item-image" />
            <div class="intro-item-content">
              <p class="intro-item-content-title">陈垣</p>
              <p class="intro-item-content-desc">声乐导师</p>
              <p class="intro-item-content-text">某某专业</p>
            </div>
          </div>
        </div>
      </div>
      <div class="class-container" id="class_container">
        <p class="class-title">我们的课程</p>
        <p class="class-desc">周一到周日，皆用心教学</p>
        <div class="class-list">
          <div class="class-item">
            <p class="class-item_title">钢琴培训</p>
            <p class="class-item_desc">按照你的要求走，按照我的规范来！</p>
          </div>
          <div class="class-item">
            <p class="class-item_title">声乐教学</p>
            <p class="class-item_desc">按照你的要求走，按照我的规范来！</p>
          </div>
          <div class="class-item">
            <p class="class-item_title">舞蹈练习</p>
            <p class="class-item_desc">按照你的要求走，按照我的规范来！</p>
          </div>
          <div class="class-item">
            <p class="class-item_title">吉他训练</p>
            <p class="class-item_desc">按照你的要求走，按照我的规范来！</p>
          </div>
        </div>
      </div>
      <div class="evaluate-container" id="evaluate_container">
        <p class="evaluate-title">学员评价</p>
        <p class="evaluate-desc">来听听大家怎么说</p>
        <div class="evaluate-list">
          <div class="evaluate-item">
            <img src="" alt="" class="evaluate-item-image" />
            <div class="evaluate-item-text">
              <p class="evaluate-item-text-title">
                从一开始羞于开口到与老师谈笑风生，对英语的乐趣也慢慢积累起来。如同跑步一样，我每天会利用早上状态最好的时刻，从自己最感兴趣的领域开始学习。
              </p>
              <p class="evaluate-item-text_desc">Jay 来自成都</p>
            </div>
          </div>
          <div class="evaluate-item">
            <img src="" alt="" class="evaluate-item-image" />
            <div class="evaluate-item-text">
              <p class="evaluate-item-text-title">
                从一开始羞于开口到与老师谈笑风生，对英语的乐趣也慢慢积累起来。如同跑步一样，我每天会利用早上状态最好的时刻，从自己最感兴趣的领域开始学习。
              </p>
              <p class="evaluate-item-text_desc">Jay 来自成都</p>
            </div>
          </div>
          <div class="evaluate-item">
            <img src="" alt="" class="evaluate-item-image" />
            <div class="evaluate-item-text">
              <p class="evaluate-item-text-title">
                从一开始羞于开口到与老师谈笑风生，对英语的乐趣也慢慢积累起来。如同跑步一样，我每天会利用早上状态最好的时刻，从自己最感兴趣的领域开始学习。
              </p>
              <p class="evaluate-item-text_desc">Jay 来自成都</p>
            </div>
          </div>
          <div class="evaluate-item">
            <img src="" alt="" class="evaluate-item-image" />
            <div class="evaluate-item-text">
              <p class="evaluate-item-text-title">
                从一开始羞于开口到与老师谈笑风生，对英语的乐趣也慢慢积累起来。如同跑步一样，我每天会利用早上状态最好的时刻，从自己最感兴趣的领域开始学习。
              </p>
              <p class="evaluate-item-text_desc">Jay 来自成都</p>
            </div>
          </div>
          <div class="evaluate-item">
            <img src="" alt="" class="evaluate-item-image" />
            <div class="evaluate-item-text">
              <p class="evaluate-item-text-title">
                从一开始羞于开口到与老师谈笑风生，对英语的乐趣也慢慢积累起来。如同跑步一样，我每天会利用早上状态最好的时刻，从自己最感兴趣的领域开始学习。
              </p>
              <p class="evaluate-item-text_desc">Jay 来自成都</p>
            </div>
          </div>
        </div>
      </div>
      <div class="relation-container">
        <p class="relation-title">让我们一起来吧</p>
        <p class="relation-desc">我们的教室：中国</p>
        <div class="relation-list">
          <div class="relation-item">
            <img src="" alt="" class="relation-item-img" />
            <p class="relation-item-title">微信公众号</p>
          </div>
        </div>
      </div>
    </div>
    <footer class="footer-container">
      <p class="footer-title">广东留音社:中华人民共和国广东省广州市增城区</p>
      <p class="footer-desc">origin 2018</p>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      duration: 500,
      isLock: false
    };
  },
  methods: {
    arrive: function(e) {
      let id = e.srcElement.dataset.id;
      let endTranslateY = document.getElementById(id).offsetTop;
      this.animateTo(endTranslateY);
    },
    animateTo: function(end) {
      if (this.isLock == true) {
        return;
      }
      this.isLock = true;
      let duration = this.duration;
      let startTime = Date.now();
      let PAGE = this;
      let begin = document.documentElement.scrollTop;
      requestAnimationFrame(function update() {
        let dataNow = Date.now();
        let time = dataNow - startTime;
        let value = PAGE.linear(time, begin, end, duration);
        document.documentElement.scrollTop = value;
        if (startTime + duration > dataNow) {
          requestAnimationFrame(update);
        } else {
          document.documentElement.scrollTop = end;
          PAGE.isLock = false;
        }
      });
    },
    linear: function(time, begin, end, duration) {
      return ((end - begin) * time) / duration + begin;
    }
  }
};
</script>

<style lang="less" scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.page-container {
  padding-top: 88px;
}
.header-container {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  height: 88px;
  font-size: 0;
  z-index: 1;
  .link-list {
    width: 100%;
    height: 88px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    .link-list_item {
      text-decoration: none;
      margin: 0 18px;
      color: #547a8a;
    }
  }
  .header-logo {
    border-radius: 50%;
    background-color: #547a8a;
    width: 56px;
    height: 56px;
    display: block;
    position: absolute;
    bottom: -28px;
    left: 50%;
    border: 10px solid #f5f5f5;
    transform: translateX(-28px);
  }
}
.background-container {
  background-color: #547a8a;
  height: 582px;
  width: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .background-title {
    font-size: 45px;
    color: #fff;
    position: relative;
    text-align: center;
    &::before {
      content: " ";
      background-color: #fff;
      display: inline-block;
      height: 2px;
      margin: 0 20px;
      position: absolute;
      right: 100%;
      top: 50%;
      width: 80px;
      zoom: 1;
    }
    &::after {
      content: "";
      background-color: #fff;
      display: inline-block;
      height: 2px;
      margin: 0 20px;
      position: absolute;
      top: 50%;
      left: 100%;
      width: 80px;
      zoom: 1;
    }
  }
  .background-desc {
    font-size: 20px;
    color: #fff;
    line-height: 100px;
  }
}
.intro-container {
  padding: 80px 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: #f4eee3;
  .intro-title {
    font-size: 36px;
    color: #786154;
    position: relative;
    text-align: center;
    font-weight: 500;
    &::before {
      content: " ";
      background-color: #786154;
      display: inline-block;
      height: 2px;
      margin: 0 20px;
      position: absolute;
      right: 100%;
      top: 50%;
      width: 80px;
      zoom: 1;
    }
    &::after {
      content: "";
      background-color: #786154;
      display: inline-block;
      height: 2px;
      margin: 0 20px;
      position: absolute;
      top: 50%;
      left: 100%;
      width: 80px;
      zoom: 1;
    }
  }
  .intro-desc {
    color: #547a8a;
    font-size: 20px;
    font-weight: 500;
    line-height: 100px;
  }
  .intro-list {
    display: flex;
    justify-content: center;
    .intro-list_item {
      margin: 0 40px;
      text-align: center;
      .list_item-image {
        width: 146px;
        height: 146px;
        display: inline-block;
        border-radius: 50%;
        background-color: #547a8a;
      }
      .intro-item-content {
        .intro-item-content-title {
          font-size: 24px;
          color: #444444;
          font-weight: 500;
          margin: 15px;
        }
        .intro-item-content-desc {
          font-size: 16px;
          color: #3388ab;
          font-weight: 800;
          margin: 0px;
        }
        .intro-item-content-text {
          font-size: 15ox;
          color: #50555b;
          margin: 15px;
        }
      }
    }
  }
}
.class-container {
  padding: 120px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #3388ab;
  .class-title {
    font-size: 36px;
    color: #fff;
    position: relative;
    text-align: center;
    font-weight: 500;
    margin: 0;
    &::before {
      content: " ";
      background-color: #fff;
      display: inline-block;
      height: 2px;
      margin: 0 20px;
      position: absolute;
      right: 100%;
      top: 50%;
      width: 80px;
      zoom: 1;
    }
    &::after {
      content: "";
      background-color: #fff;
      display: inline-block;
      height: 2px;
      margin: 0 20px;
      position: absolute;
      top: 50%;
      left: 100%;
      width: 80px;
      zoom: 1;
    }
  }
  .class-desc {
    font-size: 20px;
    color: #fff;
    line-height: 100px;
  }
  .class-list {
    display: flex;
    width: 680px;
    font-size: 0;
    flex-wrap: wrap;
    .class-item {
      width: 310px;
      height: 110px;
      border: 2px solid #fff;
      margin: 15px;
      padding: 20px 0 0 20px;
      box-sizing: border-box;
      .class-item_title {
        margin: 0;
        font-size: 24px;
        color: #fff;
        font-weight: 500;
      }
      .class-item_desc {
        margin: 0;
        font-size: 15px;
        color: #fff;
        font-weight: 500;
        margin-top: 10px;
      }
    }
  }
}
.evaluate-container {
  background-color: #f4eee3;
  padding: 100px 0;
  text-align: center;
  width: 100%;
  .evaluate-title {
    display: inline-block;
    font-size: 36px;
    color: #fff;
    position: relative;
    text-align: center;
    font-weight: 500;
    margin: 0;
    &::before {
      content: " ";

      background-color: #fff;
      display: inline-block;
      height: 2px;
      margin: 0 20px;
      position: absolute;
      right: 100%;
      top: 50%;
      width: 80px;
      zoom: 1;
    }
    &::after {
      content: "";
      background-color: #fff;
      display: inline-block;
      height: 2px;
      margin: 0 20px;
      position: absolute;
      top: 50%;
      left: 100%;
      width: 80px;
      zoom: 1;
    }
  }
  .evaluate-desc {
    color: #547a8a;
    font-size: 20px;
    line-height: 100px;
  }
  .evaluate-list {
    width: 1000px;
    margin: 0 auto;
    .evaluate-item {
      margin-bottom: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      .evaluate-item-image {
        width: 160px;
        height: 160px;
        border-radius: 50%;
        background-color: #3388ab;
        flex-shrink: 0;
        margin-right: 20px;
      }
      .evaluate-item-text {
        text-align: left;
        .evaluate-item-text-title {
          font-size: 19px;
          color: #444444;
        }
        .evaluate-item-text_desc {
          margin: 0;
          display: inline-block;
          margin-top: 10px;
          font-weight: 500;
          color: #3388ab;
        }
      }
    }
  }
}
.relation-container {
  padding: 80px 0;
  text-align: center;
  background-color: #3388ab;
  .relation-title {
    font-size: 32px;
    color: #fff;
    position: relative;
    text-align: center;
    display: inline-block;
    &::before {
      content: " ";
      background-color: #fff;
      display: inline-block;
      height: 2px;
      margin: 0 20px;
      position: absolute;
      right: 100%;
      top: 50%;
      width: 80px;
      zoom: 1;
    }
    &::after {
      content: "";
      background-color: #fff;
      display: inline-block;
      height: 2px;
      margin: 0 20px;
      position: absolute;
      top: 50%;
      left: 100%;
      width: 80px;
      zoom: 1;
    }
  }
  .relation-desc {
    font-size: 20px;
    color: #fff;
    line-height: 100px;
  }
  .relation-list {
    display: flex;
    justify-content: center;
    margin-top: 30px;
    .relation-item {
      margin: 0 30px;
      .relation-item-img {
        width: 160px;
        height: 160px;
        background-color: #f5f5f5;
        display: inline-block;
        border-radius: 50%;
      }
      .relation-item-title {
        font-size: 15px;
        line-height: 70px;
        color: #fff;
      }
    }
  }
}
.footer-container {
  background-color: #fbf8f0;
  text-align: center;
  padding: 10px;
  .footer-title {
    font-size: 12px;
    font-weight: 500px;
  }
  .footer-desc {
    font-size: 12px;
  }
}
</style>
