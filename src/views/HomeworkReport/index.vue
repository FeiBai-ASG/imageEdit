<template>
  <div>
    <div class="head">
      <div class="head-title">{{ studentName }}作业报告</div>
      <img
        class="head-image"
        src="@/assets/image/zyyh-bgbg-nor@2x.png"
        alt=""
      />
      <div class="head-info">
        <div class="head-info-classname">课程名称：{{ classroomName }}</div>
        <div class="head-info-time">上课时间：{{ classroomTime }}</div>
        <div class="head-info-handout">{{ handoutName }}</div>
      </div>
    </div>
    <div class="content">
      <div class="content-topbar">
        <div class="content-topbar1"></div>
        <div class="content-topbar2"></div>
      </div>
      <div class="content-homework">
        <div class="homework-answer">
          <div class="homework-time">
            <div class="homework-time-title">提交作业时间</div>
            <div class="homework-time-text">2020-03-03 18:09:09</div>
          </div>
          <div class="homework-choice">
            <div class="homework-choice-title">
              <div class="homework-choice-title-text">选择题</div>
              <div class="homework-choice-title-key">
                <div class="right">
                  <img
                    class="right-icon"
                    src="@/assets/image/zyyh-zq-nor@2x.png"
                  />
                  <div class="right-text">正确 5</div>
                </div>
                <div class="wrong">
                  <img
                    class="wrong-icon"
                    src="@/assets/image/zyyh-cw-nor@2x.png"
                  />
                  <div class="wrong-text">错误 2</div>
                </div>
              </div>
            </div>
            <div class="homework-choice-answer">
              <div
                class="answer-item"
                :class="{ wrong: item % 2 }"
                v-for="item in 10"
                :key="item"
              >
                {{ item }}
              </div>
            </div>
          </div>
          <div class="homework-fill">
            <div class="homework-fill-title">非选择题</div>
            <div class="homework-fill-answer">
              <div class="answer-item" v-for="item in 10" :key="item">
                {{ item }}
              </div>
            </div>
          </div>
        </div>
        <div class="homework-review">
          <div class="teacher">
            <div class="teacher-avatar"></div>
            <div class="teacher-info">
              <div class="teacher-name">徐函老师</div>
              <div class="teacher-time">2020-03-03 18:09:09</div>
            </div>
          </div>
          <div class="review">
            <div class="need-correct">需要订正</div>
            <div class="review-text">
              点评：作业完成的不太理想，上课认真听讲哦～
            </div>
            <div class="review-image">
              <div class="review-image-item" v-for="item in 10" :key="item">
                {{ item }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="content-homework correct">
        <div class="correct-title">作业订正</div>
        <div class="homework-answer">
          <div class="homework-time">
            <div class="homework-time-title">提交作业时间</div>
            <div class="homework-time-text">2020-03-03 18:09:09</div>
          </div>
          <div class="homework-choice">
            <div class="homework-choice-title">
              <div class="homework-choice-title-text">选择题</div>
              <div class="homework-choice-title-key">
                <div class="right">
                  <img
                    class="right-icon"
                    src="@/assets/image/zyyh-zq-nor@2x.png"
                  />
                  <div class="right-text">正确 5</div>
                </div>
                <div class="wrong">
                  <img
                    class="wrong-icon"
                    src="@/assets/image/zyyh-cw-nor@2x.png"
                  />
                  <div class="wrong-text">错误 2</div>
                </div>
              </div>
            </div>
            <div class="homework-choice-answer">
              <div
                class="answer-item"
                :class="{ wrong: item % 2 }"
                v-for="item in 10"
                :key="item"
              >
                {{ item }}
              </div>
            </div>
          </div>
          <div class="homework-fill">
            <div class="homework-fill-title">非选择题</div>
            <div class="homework-fill-answer">
              <div class="answer-item" v-for="item in 10" :key="item">
                {{ item }}
              </div>
            </div>
          </div>
        </div>
        <div class="homework-review">
          <div class="teacher">
            <div class="teacher-avatar"></div>
            <div class="teacher-info">
              <div class="teacher-name">徐函老师</div>
              <div class="teacher-time">2020-03-03 18:09:09</div>
            </div>
          </div>
          <div class="review">
            <div class="need-correct">需要订正</div>
            <div class="review-text">
              点评：作业完成的不太理想，上课认真听讲哦～
            </div>
            <div class="review-image">
              <div
                class="review-image-item"
                :class="{ wrong: item % 2 }"
                v-for="item in 10"
                :key="item"
              >
                {{ item }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="conent-bottom" style="height: 35px"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeworkReport',
  props: {},
  data () {
    return {
      handoutName: '',
      studentName: ''
    }
  },
  created () {
    const { classroom, handoutBind, studentId } = this.$route.query
    this.handoutName = handoutBind
    console.log({ classroom, handoutBind, studentId })
    this.setStudentInfo(studentId)
    this.setClassInfo(classroom)
  },
  methods: {
    setClassInfo (classroom) {
      const weekday = '日一二三四五六'
      const formateTime = classroomInfo => {
        const data = new Date(classroomInfo.attends_date_time * 1000)

        return `${data.getFullYear()}-${(data.getMonth() + 1)
          .toString()
          .padStart(2, '0')}-${data
          .getDate()
          .toString()
          .padStart(2, '0')} ${classroomInfo.start_text}-${
          classroomInfo.end_text
        } 周${weekday[data.getDay()]}`
      }
      this.$api.classroomNumList({ id: classroom }).then(classroomInfoList => {
        const classroomInfo = classroomInfoList[0]
        if (classroomInfo) {
          this.classroomName = classroomInfo.name
          this.classroomTime = formateTime(classroomInfo)
        }
      })
    },
    setStudentInfo (studentId) {
      this.$api.getStudentList({ id: studentId }).then(studentList => {
        studentList = studentList.data
        const studentInfo = studentList[0]
        if (studentInfo) {
          this.studentName = studentInfo.name
          document.title = studentInfo.name + '作业报告'
        }
      })
    }
  }

}
</script>

<style lang="less" scoped>
.head {
  &-title {
    font-size: 56px;
    font-weight: 600;
    color: #ffffff;
    line-height: 80px;
    position: absolute;
    top: 46px;
    left: 48px;
  }
  &-image {
    width: 750px;
  }
  &-info {
    width: 654px;
    background: #ffffff;
    box-shadow: 0px 4px 22px 0px rgba(218, 218, 218, 0.5);
    border-radius: 24px;
    position: absolute;
    top: 332px;
    margin: 0 24px;
    padding: 28px 24px;
    &-classname {
      font-size: 32px;
      font-weight: 500;
      color: #333333;
      line-height: 44px;
    }

    &-handout,
    &-time {
      margin-top: 28px;
      font-size: 28px;
      font-weight: 400;
      color: #333333;
      line-height: 40px;
    }
  }
}
.content {
  padding-top: 132px;
  padding-bottom: 70px;
  margin-bottom: 1px;
  background: #f8f5ff;
  min-height: calc(99vh - 600px);
  display: flex;
  align-items: center;
  flex-direction: column;
  &-topbar {
    width: 702px;
    height: 26px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  &-topbar1 {
    width: 702px;
    height: 26px;
    background: #a589fd;
    border-radius: 13px;
  }
  &-topbar2 {
    width: 670px;
    height: 14px;
    background: #6f54c5;
    border-radius: 10px;
    position: relative;
    top: -14px;
  }
  &-homework {
    width: 656px;
    background: #ffffff;
    position: relative;
    top: -4px;
    .homework-answer {
      padding: 32px 24px;
      .homework-time {
        display: flex;
        justify-content: space-between;
        align-items: center;
        &-title {
          font-size: 28px;
          font-weight: 500;
          color: #000000;
          line-height: 40px;
        }
        &-text {
          font-size: 26px;
          font-weight: 400;
          color: #666666;
          line-height: 36px;
        }
      }
      .homework-choice-title {
        margin-top: 32px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        &-text {
          font-size: 28px;
          font-weight: 400;
          color: #000000;
          line-height: 40px;
        }
        &-key {
          font-size: 24px;
          font-weight: 400;
          line-height: 34px;
          display: flex;
          .wrong,
          .right {
            display: flex;
            align-items: center;
            color: #64c385;
          }
          .wrong {
            margin-left: 40px;
            color: #ea5352;
          }
          .right-icon,
          .wrong-icon {
            width: 24px;
            height: 24px;
            margin-right: 12px;
          }
        }
      }
      .homework-choice-answer {
        display: grid;
        margin-top: 32px;
        padding: 0 8px;
        grid-template-columns: repeat(auto-fill, 72px);
        grid-template-rows: repeat(auto-fill, 72px);
        grid-row-gap: 28px;
        grid-column-gap: 32px;
        .answer-item {
          display: inline-grid;
          width: 72px;
          height: 72px;
          border-radius: 72px;
          background: #def8e7;
          font-size: 32px;
          font-weight: 600;
          color: #64c385;
          line-height: 72px;
          text-align: center;
          &.wrong {
            background: #fde8e7;
            color: #ea5352;
          }
        }
      }
      .homework-fill {
        &-title {
          font-size: 28px;
          font-weight: 400;
          color: #000000;
          line-height: 40px;
          margin-top: 24px;
          margin-bottom: 24px;
        }
        &-answer {
          display: grid;
          grid-template-columns: repeat(auto-fill, 184px);
          grid-template-rows: repeat(auto-fill, 184px);
          grid-row-gap: 28px;
          grid-column-gap: 26px;
          .answer-item {
            display: inline-grid;
            width: 184px;
            height: 184px;
            background: #f2f2f2;
            border-radius: 8px;
          }
        }
      }
    }
    .homework-review {
      padding: 28px 20px 32px 20px;
      .teacher {
        display: flex;
        margin-bottom: 16px;
        &-avatar {
          width: 92px;
          height: 92px;
          border-radius: 92px;
          background: #edf6fd;
          margin-right: 20px;
        }
        &-name {
          font-size: 28px;
          font-weight: 400;
          color: #000000;
          line-height: 40px;
        }
        &-time {
          font-size: 26px;
          font-weight: 400;
          color: #666666;
          line-height: 36px;
          margin-top: 6px;
        }
      }
      .review {
        width: 576px;
        background: #f0efff;
        border-radius: 8px;
        padding: 20px;
        .need-correct {
          font-size: 26px;
          font-weight: 500;
          color: #000000;
          line-height: 36px;
        }
        .review-text {
          margin-top: 20px;
          font-size: 26px;
          font-weight: 400;
          color: #000000;
          line-height: 36px;
        }
        .review-image {
          margin-top: 24px;
          display: grid;
          grid-template-columns: repeat(auto-fill, 122px);
          grid-template-rows: repeat(auto-fill, 122px);
          grid-row-gap: 28px;
          grid-column-gap: 20px;
          &-item {
            display: inline-grid;
            width: 122px;
            height: 122px;
            background: #f2f2f2;
            border-radius: 8px;
          }
        }
      }
    }
  }
}
.correct {
  margin-top: 28px;
  &-title {
    width: 128px;
    height: 44px;
    font-size: 32px;
    font-weight: 500;
    color: #000000;
    line-height: 44px;
    margin-top: 36px;
    margin-left: 26px;
  }
}
</style>
