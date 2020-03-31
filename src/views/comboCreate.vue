<template>
<div class="page-content">
  <h3>套餐添加</h3>
  <div class="combo-section"  style="max-width:500px">
    <el-form label-position="left" :rules="rules" ref="rules"  label-width="80px" :model="combo" >
      <el-form-item label="套餐名称" prop="combo_name">
        <el-input v-model="combo.combo_name"></el-input>
      </el-form-item>
      <el-form-item label="所属科目" prop="course_id">
        <el-select v-model="combo.course_id" placeholder="请选择">
            <el-option
              v-for="item in CourseArr"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input
          type="textarea"
          :rows="3"
          placeholder="请输入内容"
          v-model="combo.description"
          maxlength="300"
          :show-word-limit="true"
          resize="none">
        </el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="addcombo">创建</el-button>
  </div>
</div>
</template>
<script>
import courseAxios from '@/global/service/course.js'
import comboAxios from '@/global/service/combo.js'

export default {
  data () {
    return {
      combo: {
        combo_name: null,
        course_id: null,
        description: null
      },
      CourseArr: [],
      rules: {
        combo_name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        course_id: [
          { required: true, message: '请选择科目', trigger: 'blur' }
        ],
        description: [{
          required: true, message: '请输入描述', trigger: 'blur'
        }]
      }
    }
  },
  created () {
    courseAxios.all().then(res => {
      this.CourseArr = res
    })
  },
  methods: {
    addcombo () {
      let data = this.combo
      this.$refs['rules'].validate(vaild => {
        if (vaild) {
          comboAxios.add(data).then(res => {
            this.$router.push({ path: '/combo' })
          })
        }
      })
    }
  }
}
</script>
