<template>
  <div class="page-container">
    <header class="header-container" style="z-index:999">
      <div>
        <img
          src="@/image/logo/logo.png"
          alt=""
          class="header-logo"
          @click="arrive"
          data-id="background_container"
        />
      </div>

      <nav class="link-list">
        <a
          href="javascript:;"
          class="link-list_item"
          @click="arrive"
          data-id="background_container"
          >留音社</a
        >
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
        <el-carousel
          :interval="4000"
          type="card"
          height="300px"
          style="width:80%"
        >
          <el-carousel-item v-for="item in teacher" :key="item.imageUrl">
            <div class="intro-list_item">
              <img :src="item.imageUrl" class="list_item-image" />
              <div class="intro-item-content">
                <p class="intro-item-content-title">{{ item.name }}</p>
                <p class="intro-item-content-desc">{{ item.course }}</p>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
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
            <img src="@/image/7.png" alt="" class="evaluate-item-image" />
            <div class="evaluate-item-text">
              <p class="evaluate-item-text-title">
                从一开始羞于开口到与老师谈笑风生，对音乐的乐趣也慢慢积累起来。如同跑步一样，我每天会利用早上状态最好的时刻，从自己最感兴趣的领域开始学习。
              </p>
              <p class="evaluate-item-text_desc">Jay 来自成都</p>
            </div>
          </div>
          <div class="evaluate-item">
            <img src="@/image/5.png" alt="" class="evaluate-item-image" />
            <div class="evaluate-item-text">
              <p class="evaluate-item-text-title">
                从一开始羞于开口到与老师谈笑风生，对音乐的乐趣也慢慢积累起来。如同跑步一样，我每天会利用早上状态最好的时刻，从自己最感兴趣的领域开始学习。
              </p>
              <p class="evaluate-item-text_desc">Jay 来自成都</p>
            </div>
          </div>
          <div class="evaluate-item">
            <img src="@/image/4.png" alt="" class="evaluate-item-image" />
            <div class="evaluate-item-text">
              <p class="evaluate-item-text-title">
                从一开始羞于开口到与老师谈笑风生，对音乐的乐趣也慢慢积累起来。如同跑步一样，我每天会利用早上状态最好的时刻，从自己最感兴趣的领域开始学习。
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
      <p class="footer-title">
        地址:
        广州市增城区荔城街民乐路18号汇港豪庭首层12号留音社（即阳光国际大厦东门对面）
      </p>
    </footer>
  </div>
</template>

<script>
import teacher_1 from "@/image/teacher/teacher-1.png";
import teacher_2 from "@/image/teacher/teacher-2.png";
import teacher_3 from "@/image/teacher/teacher-3.png";
import teacher_4 from "@/image/teacher/teacher-4.png";
import teacher_0 from "@/image/teacher/teacher-0.png";
import teacher_5 from "@/image/teacher/teacher-5.png";
import teacher_6 from "@/image/teacher/teacher-6.png";
import teacher_7 from "@/image/teacher/teacher-7.png";
import teacher_8 from "@/image/teacher/teacher-8.png";
export default {
  data() {
    return {
      teacher: [
        {
          name: "魏大力",
          course: "钢琴导师",
          imageUrl: teacher_1
        },
        {
          name: "伦雅颂",
          course: "钢琴导师",
          imageUrl: teacher_2
        },
        {
          name: "赖静瑜",
          course: "钢琴导师",
          imageUrl: teacher_3
        },
        {
          name: "杨依琳",
          course: "钢琴导师",
          imageUrl: teacher_4
        },
        {
          name: "梁富翔",
          course: "钢琴导师",
          imageUrl: teacher_0
        },
        {
          name: "邹子博",
          course: "舞蹈导师",
          imageUrl: teacher_5
        },
        {
          name: "李媛媛",
          course: "舞蹈导师",
          imageUrl: teacher_6
        },
        {
          name: "闵捷",
          course: "钢琴导师",
          imageUrl: teacher_7
        },
        {
          name: "刘洋",
          course: "声乐导师",
          imageUrl: teacher_8
        }
      ],
      duration: 500,
      isLock: false
    };
  },
  methods: {
    arrive: function(e) {
      let id = e.srcElement.dataset.id;
      let endTranslateY = document.getElementById(id).offsetTop - 88;
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
    },
    showPiano: function() {}
  }
};
</script>

<style lang="less" scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
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
    background-color: #f4f4f4;
    width: 56px;
    height: 56px;
    display: block;
    position: absolute;
    bottom: -28px;
    left: 50%;
    border: 3px solid #f5f5f5;
    transform: translateX(-28px);
  }
}
.background-container {
  // background-color: #547a8a;
  background-image: url("./../image/3.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  height: 582px;
  width: 100%;
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
  position: relative;
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

  .el-carousel__item:nth-child(2n) {
    background-color: #f4eee3;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #f4eee3;
  }
  .intro-list_item {
    text-align: center;
    position: relative;
    margin-top: 60px;
    position: relative;
    .list_item-image {
      width: 120px;
      height: 120px;
      display: inline-block;
      border-radius: 50%;
      background-color: #547a8a;
      border: 2px solid #fff;
    }
    .intro-item-content {
      .intro-item-content-title {
        font-size: 16px;
        color: #333;
        font-weight: 500;
        line-height: 30px;
      }
      .intro-item-content-desc {
        font-size: 13px;
        color: #999;
        font-weight: 400;
        line-height: 20px;
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
  // background-color: #3388ab;
  background-image: url("./../image/10.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
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
  // background-color: #3388ab;
  background-image: url("./../image/11.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
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
        background-color: #f4f4f4;
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
}
</style>
