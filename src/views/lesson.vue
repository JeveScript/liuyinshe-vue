<template>
  <div class="page-content">
    <h3>日期: {{lessonData.class_name}}</h3>
    <el-form :inline="true"
      v-show="!lessonData.status"
      :rules="rules" ref="ruleForm"
      label-position="left"
      style="margin-top:30px;"
      label-width="80px" :model="lessonData">
      <el-form-item label="上课时间" prop="time">
        <el-time-picker
          is-range
          v-model="lessonData.time"
          range-separator="至"
          start-placeholder="上课时间"
          end-placeholder="下课时间"
          placeholder="选择时间范围">
        </el-time-picker>
      </el-form-item>
      <el-form-item label="授课老师" prop="teacher_id">
        <el-select v-model="lessonData.teacher_id" placeholder="请选择">
          <el-option
            v-for="item in teacherArr"
            :key="item.value"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="editLesson">编辑单节课</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="userArr"
      style="width: 100%">
      <el-table-column
        prop="user_name"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="user_phone"
        label="手机号码">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button-group v-show="!scope.row.status && !lessonData.status">
            <el-button type="primary" @click="editLessonStatus(scope.row.user_lesson_id, 1)">签到</el-button>
            <el-button type="warning" @click="editLessonStatus(scope.row.user_lesson_id,2)">请假</el-button>
            <el-button type="danger" @click="editLessonStatus(scope.row.user_lesson_id,3)">旷课</el-button>
          </el-button-group>
          <span v-show="scope.row.status == 1">已签到</span>
          <span v-show="scope.row.status == 2">已请假</span>
          <span v-show="scope.row.status == 3">已旷课</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import lessonAxios from '@/global/service/lesson.js'
import userAxios from '@/global/service/user.js'
import teacherService from '@/global/service/teacher.js'

export default {
  data () {
    return {
      lessonId: null,
      rules: {
        teacher_id: [{ required: true, message: '请选择授课老师', trigger: 'blur' }],
        time: [{ required: true, message: '请选择时间', trigger: 'blur' }]
      },
      lessonData: {},
      teacherArr: [],
      userArr: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      let id = this.lessonId = this.$route.params.id
      lessonAxios.show(id).then(res => {
        this.lessonData = res.data
        this.userArr = res.userArr
        this.lessonData.time = []
        this.lessonData.time[0] = new Date(`2020-01-15 ${res.data.start_at}`)
        this.lessonData.time[1] = new Date(`2020-01-15 ${res.data.end_at}`)
      })
      teacherService.all().then(res => {
        this.teacherArr = res
      })
    },
    editLesson () {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          let data = this.lessonData
          data.end_at = this.lessonData.time[1]
          data.start_at = this.lessonData.time[0]
          lessonAxios.edit(data.id, data).then(() => {
            this.getData()
          })
        }
      }
      )
    },
    editLessonStatus (id, status) {
      this.$confirm('确认进行此项操作？')
        .then(_ => {
          userAxios.endUserLessonID(id, { status }).then(() => {
            this.getData()
          })
        })
        .catch(_ => {})
    }
  }
}
</script>
