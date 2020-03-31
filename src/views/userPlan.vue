<template>
  <div class="page-content">
    <el-tabs tab-position="left">
    <el-tab-pane label="选择课程">
       <el-form :inline="true" :model="dateData" ref="dateRule" label-width="60px">
        <el-form-item label="日期"
        prop="date"
        :rules="[
          { required: true, message: '时间不能为空'},
          { type: 'date', message: '必须为时间值'}
        ]">
          <el-date-picker
          v-model="dateData.date"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getlesso">查询</el-button>
        </el-form-item>
        <el-table
          :data="lessonArr"
          style="width: 100%">
          <el-table-column
            prop="start_at"
            label="上课时间">
          </el-table-column>
          <el-table-column
            prop="end_at"
            label="下课时间">
          </el-table-column>
          <el-table-column
            prop="teacher_name"
            label="老师">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button
              size="mini"
              type="primary"
              style="margin-left:10px;"
              v-show="!scope.row.status"
              @click="addUserLesson(scope.$index, scope.row,1)">总课程次数关联</el-button>
              <el-button
              size="mini"
              type="primary"
              style="margin-left:10px;"
              v-show="!scope.row.status"
              @click="addUserLesson(scope.$index, scope.row,2)">完全一对一关联</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="课程列表">
      <div class="class_lesson-index">
        <p>课程总数:</p>
        <el-tag style="margin-left:20px;">{{allUserLesson.length}}</el-tag>
      </div>
      <el-table
        :data="allUserLesson"
        style="width: 100%">
        <el-table-column
          prop="class_name"
          label="上课日期">
        </el-table-column>
        <el-table-column
          prop="start_at"
          label="上课时间">
        </el-table-column>
        <el-table-column
          prop="end_at"
          label="下课时间">
        </el-table-column>
        <el-table-column
          prop="teacher_name"
          label="老师">
        </el-table-column>
        <el-table-column
          label="用户课程状态">
          <template slot-scope="scope">
           <span v-show="scope.row.user_lesson_status == 1">已签到</span>
          <span v-show="scope.row.user_lesson_status == 2">已请假</span>
          <span v-show="scope.row.user_lesson_status == 3">已旷课</span>
          </template>
        </el-table-column>
         <el-table-column
          label="课程状态">
          <template slot-scope="scope">
            <span>{{scope.row.lesson_status ? '已下课' : '未完成'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <router-link :to="'/lesson/'+scope.row.lesson_id">
              <el-button
              size="mini">查看</el-button>
            </router-link>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
  </el-tabs>
  </div>
</template>
<script>
import classAxios from '@/global/service/class.js'
import userAxios from '@/global/service/user.js'

export default {
  data () {
    return {
      dateData: {
        date: ''
      },
      lessonArr: [],
      allUserLesson: []
    }
  },
  created () {
    this.getUserPlan()
  },
  methods: {
    getUserPlan () {
      let id = this.$route.params.id
      userAxios.allUserLessonID(id).then(res => {
        this.allUserLesson = res
      })
    },
    getlesso () {
      this.$refs['dateRule'].validate(valid => {
        if (valid) {
          let date = this.dateData
          classAxios.classReferShow(date).then(res => {
            this.lessonArr = res
          })
        }
      })
    },
    addUserLesson: function (index, row, className) {
      let data = {
        user_plan_id: this.$route.params.id,
        class_name: className,
        lesson_id: row.id
      }
      userAxios.addUserLesson(data).then(res => {
      })
    }
  }
}
</script>
<style lang="less" scoped>
.class_lesson-index{
  display: flex;
  align-items: center;
}
</style>
