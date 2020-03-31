<template>
  <div class="page-content">
    <h3>日期: {{classData.start_at}}</h3>
    <el-form :inline="true"
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
      <el-form-item label="课程类型" prop="type">
        <el-select v-model="lessonData.type" placeholder="请选择">
          <el-option
            v-for="item in typeArr"
            :key="item.index"
            :label="item.script"
            :value="item.index">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addLesson">添加单节课</el-button>
      </el-form-item>
    </el-form>
    <template>
      <el-table
        :data="lessonArr"
        stripe
        style="width: 100%">
        <el-table-column
          prop="start_at"
          label="上课时间"
          width="180">
        </el-table-column>
         <el-table-column
          prop="end_at"
          label="下课时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="teacher_name"
          label="老师"
          width="180">
        </el-table-column>
        <el-table-column
          prop="created_at"
          label="创建时间">
        </el-table-column>
        <el-table-column
          label="操作"
          width="180">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.type == 1">一对一</el-tag>
            <el-tag v-if="scope.row.type == 2" type="success">公开课</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="180">
          <template slot-scope="scope">
            <router-link :to="'/lesson/' + scope.row.id" >
              <el-button
                size="mini"
                type="primary">详情</el-button>
            </router-link>
            <el-button
              v-if="!scope.row.status"
              size="mini"
              type="danger"
              style="margin-left:10px;"
              @click="editLesson(scope.row)">下课</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>
<script>
import classAxios from '@/global/service/class.js'
import lessonAxios from '@/global/service/lesson.js'
import teacherService from '@/global/service/teacher.js'
export default {
  data () {
    return {
      classId: null,
      classData: {},
      lessonArr: [],
      lessonData: {
        time: [new Date(2020, 1, 1, 0, 0), new Date(2020, 1, 1, 23, 59)],
        teacher_id: null,
        type: null
      },
      typeArr: [{
        index: 1,
        script: '一对一'
      }, {
        index: 2,
        script: '公开课'
      }],
      teacherArr: [],
      rules: {
        teacher_id: [{ required: true, message: '请选择授课老师', trigger: 'blur' }],
        time: [{ required: true, message: '请选择时间', trigger: 'blur' }],
        type: [{ required: true, message: '请选择课程类型', trigger: 'blur' }]
      }
    }
  },
  created () {
    let id = this.classId = this.$route.params.id
    classAxios.show(id).then(res => {
      this.classData = res
    })
    teacherService.all().then(res => {
      this.teacherArr = res
    })
    this.getLesson()
  },
  methods: {
    editLesson (row) {
      this.$confirm('确认下课了？')
        .then(_ => {
          lessonAxios.del(row.id).then(res => {
            this.getLesson()
          })
        }).catch(() => {})
    },
    getLesson () {
      let id = this.classId
      lessonAxios.all({ id }).then(res => {
        this.lessonArr = res
      })
    },
    addLesson () {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          let data = {
            teacher_id: this.lessonData.teacher_id,
            end_at: this.lessonData.time[1],
            start_at: this.lessonData.time[0],
            class_id: this.classId,
            type: this.lessonData.type
          }
          lessonAxios.add(data).then(res => {
            this.lessonData = {
              time: [new Date(2020, 1, 1, 0, 0), new Date(2020, 1, 1, 23, 59)],
              teacher_id: null,
              type: null
            }
            this.getLesson()
          })
        }
      })
    }
  }
}
</script>
