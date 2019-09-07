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
            <img
              src="./../image/teacher/teacher-1.png"
              alt=""
              class="list_item-image"
            />
            <div class="intro-item-content">
              <p class="intro-item-content-title">魏大力</p>
              <p class="intro-item-content-desc">钢琴导师</p>
              <div class="intro-item-content-text-section">
                <p class="intro-item-content-text">
                  中共党员 获星海音乐学院学士文凭
                  作为中国内地首位《手指建立与音色表达》课程的研学者.他坚持依靠科学与理论实践相结合，潜心探索研究科学的钢琴演奏.他出生于音乐世家.六岁在家人的影响下开始学琴.并多次在校际节的音乐比赛中荣获第一名.自幼即有钢琴神童之美誉.在15岁时由于钢琴与文化课都出类拔萃被广州市艺术学校钢琴演奏专业录取.期间获奖学金.并随香港演艺学院大提琴演奏家庄家粱兼学大提琴演奏课程.后来于2009年以名列前茅的成绩被录取到星海音乐学院学习.得到施坦威艺术家冼劲松的专业指导.大学期间除了学习钢琴演奏.还兼学钢琴教学法.伴奏等课程.毕业后得到中央音乐学院钢琴系周广仁先生的赏析，并求学于周先生门下.
                </p>
              </div>
            </div>
          </div>
          <div class="intro-list_item">
            <img
              src="./../image/teacher/teacher-2.png"
              alt=""
              class="list_item-image"
            />
            <div class="intro-item-content">
              <p class="intro-item-content-title">伦雅颂</p>
              <p class="intro-item-content-desc">钢琴导师</p>
              <div class="intro-item-content-text-section">
                <p class="intro-item-content-text">
                  5岁初学钢琴，自幼师从星海音乐学院钢琴系原副教授黄文娟。2015年入读大学进修钢琴，曾师从华南师范大学王大立教授、美国路易斯安那州立大学钢琴博士赖筠憓教授。现跟随纽约国际室内乐团钢琴兼指挥家DANIEL
                  FENG学习。
                </p>
              </div>
            </div>
          </div>
          <div class="intro-list_item">
            <img
              src="./../image/teacher/teacher-3.png"
              alt=""
              class="list_item-image"
            />
            <div class="intro-item-content">
              <p class="intro-item-content-title">赖静瑜</p>
              <p class="intro-item-content-desc">钢琴导师</p>
              <div class="intro-item-content-text-section">
                <p class="intro-item-content-text">
                  自幼开始接触音乐，在众多的音乐比赛中获奖，在钢琴演奏方面有特别的天赋与才华。2015年以优异成绩被录取到广东省外语艺术职业学院学习，除了钢琴演奏，还兼学“教育心理学”，“奥尔夫”，“柯达伊”，“钢琴教学法”。以优秀毕业生荣誉毕业并获学位，后来又考入广州第二师范学院，潜心研学钢琴演奏与教学。致力于钢琴启蒙教学
                  ，钢琴考级等学术科研。2019年起受聘于留音社钢琴部。
                </p>
              </div>
            </div>
          </div>
          <div class="intro-list_item">
            <img
              src="./../image/teacher/teacher-4.png"
              alt=""
              class="list_item-image"
            />
            <div class="intro-item-content">
              <p class="intro-item-content-title">杨依琳</p>
              <p class="intro-item-content-desc">钢琴导师</p>
              <div class="intro-item-content-text-section">
                <p class="intro-item-content-text">
                  自幼开始接触音乐，在钢琴演奏与教学方面有较高的造诣。特别是在钢琴教学方面，在获得大学毕业文凭后，就一直走在钢琴教学的最前线，在近五年的幼儿钢琴教学过程中积累了丰富的教学经验，特别是个别课中，能因材施教、针对学生的不同年龄层，掌握学生的心理状况，积极去培养学生学习音乐的兴趣，并加以循循善诱，让学生对音乐艺术能够充分的感受和体会。并且每年积极组织学生参加钢琴等级与比赛，均获得优异的成绩。2015年获得“The
                  one钢琴智能钢琴课程教师培训资格”。
                </p>
              </div>
            </div>
          </div>
          <div class="intro-list_item">
            <img
              src="./../image/teacher/teacher-0.png"
              alt=""
              class="list_item-image"
            />
            <div class="intro-item-content">
              <p class="intro-item-content-title">梁富翔</p>
              <p class="intro-item-content-desc">钢琴导师</p>
              <div class="intro-item-content-text-section">
                <p class="intro-item-content-text">
                  毕业于广东第二师范学院。师从程昱教授学习音乐教育法、奥尔夫教学法，教学经验丰富。参加广东省大学生艺术展演声乐大赛获得合唱一等奖、参加广东省大学生艺术展演器乐演奏获得乐团一等奖、获得花都区中小学合唱比赛优秀导师
                </p>
              </div>
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
            <img src="./../image/7.png" alt="" class="evaluate-item-image" />
            <div class="evaluate-item-text">
              <p class="evaluate-item-text-title">
                从一开始羞于开口到与老师谈笑风生，对音乐的乐趣也慢慢积累起来。如同跑步一样，我每天会利用早上状态最好的时刻，从自己最感兴趣的领域开始学习。
              </p>
              <p class="evaluate-item-text_desc">Jay 来自成都</p>
            </div>
          </div>
          <div class="evaluate-item">
            <img src="./../image/5.png" alt="" class="evaluate-item-image" />
            <div class="evaluate-item-text">
              <p class="evaluate-item-text-title">
                从一开始羞于开口到与老师谈笑风生，对音乐的乐趣也慢慢积累起来。如同跑步一样，我每天会利用早上状态最好的时刻，从自己最感兴趣的领域开始学习。
              </p>
              <p class="evaluate-item-text_desc">Jay 来自成都</p>
            </div>
          </div>
          <div class="evaluate-item">
            <img src="./../image/4.png" alt="" class="evaluate-item-image" />
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
        广东留音社:中华人民共和国广东省广州市增城区
        <router-link to="/login"><span>I I</span></router-link>
      </p>
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
    border: 10px solid #f5f5f5;
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
    // justify-content: center;
    width: 1000px;
    flex-wrap: wrap;
    .intro-list_item {
      width: 235px;
      height: 300px;
      margin-right: 20px;
      text-align: center;
      padding: 60px 0 0 0;
      position: relative;
      background-color: #fff;
      margin-top: 60px;
      position: relative;
      &:nth-child(4n + 0) {
        margin-right: 0;
      }
      &:before {
        position: absolute;
        top: 0;
        left: 0;
        display: inline-block;
        width: 100%;
        height: 2px;
        content: "";
        background-image: linear-gradient(to right, #23b8ff, #3a7dff);
        background-color: #23b8ff;
      }
      .list_item-image {
        width: 84px;
        height: 84px;
        display: inline-block;
        border-radius: 50%;
        background-color: #547a8a;
        position: absolute;
        top: -40px;
        left: 50%;
        transform: translateX(-50%);
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
        .intro-item-content-text-section {
          font-size: 12px;
          color: #333;
          margin: 15px 37.5px;
          // padding: 0 37.5px;
          width: 160px;
          height: 130px;
          overflow: hidden;
          text-align: left;
          .intro-item-content-text {
            // display: inline-block;
            width: 177px;
            overflow-y: scroll;
            height: 130px;
          }
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
