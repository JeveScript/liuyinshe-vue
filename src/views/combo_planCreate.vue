<template>
<div class="page-content">
  <h3>套餐计划添加</h3>
  <el-form label-position="left" label-width="80px" :rules="rules" ref="ruleForm"  :model="combo_plan" style="max-width:500px">
  <el-form-item label="计划名称" prop="plan_name">
    <el-input v-model="combo_plan.plan_name"></el-input>
  </el-form-item>
  <el-form-item label="所属套餐" prop="combo_id">
    <el-select v-model="combo_plan.combo_id" placeholder="请选择">
      <el-option
        v-for="item in comboArr"
        :key="item.value"
        :label="item.combo_name"
        :value="item.id">
        <span style="float: left">{{ item.combo_name }}</span>
        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.course_name }}</span>
      </el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="描述" prop="description">
    <el-input type="textarea"
    :show-word-limit="true"
    :rows="3"
    placeholder="请输入内容"
    minlength="300"
    resize="none"
    v-model="combo_plan.description"></el-input>
  </el-form-item>
</el-form>
  <el-button type="primary" @click="addCombo_plan">创建</el-button>
</div>
</template>
<script>
import comboAxios from '@/global/service/combo.js'
import comboPlanAxios from '@/global/service/combo_plan.js'

export default {
  data () {
    return {
      combo_plan: {
        combo_id: null,
        plan_name: null,
        description: null
      },
      comboArr: [],
      rules: {
        combo_id: [
          { required: true, message: '请输入计划名称', trigger: 'blur' }
        ],
        plan_name: [
          { required: true, message: '请选择所属套餐', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入计划描述', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    comboAxios.all().then(res => {
      this.comboArr = res
    })
  },
  methods: {
    addCombo_plan () {
      let data = this.combo_plan
      this.$refs['ruleForm'].validate(vaild => {
        if (vaild) {
          comboPlanAxios.add(data).then(() => {
            this.$router.push({ path: '/comboPlan' })
          })
        }
      })
    }
  }
}
</script>
