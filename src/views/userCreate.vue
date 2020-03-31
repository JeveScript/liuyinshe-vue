<template>
<div class="page-content">
  <div class="user-section" style="max-width:500px">
    <h3>学员添加</h3>
    <el-form :label-position="labelPosition" :rules="rules" ref="rules"  label-width="100px" :model="user" >
      <el-form-item label="名字" prop="name">
        <el-input v-model.trim="user.name"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="phone">
        <el-input v-model.trim="user.phone"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio v-model.trim="user.sex" label="1">男</el-radio>
        <el-radio v-model.trim="user.sex" label="2">女</el-radio>
      </el-form-item>
      <el-form-item label="出生日期" prop="birthday">
        <el-date-picker
          v-model.trim="user.birthday"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="监护人名称" prop="sms_name">
        <el-input v-model.trim="user.sms_name"></el-input>
      </el-form-item>
      <el-form-item label="监护人电话" prop="sms_phone">
        <el-input v-model.trim="user.sms_phone"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model.trim="user.site"></el-input>
      </el-form-item>
      <el-form-item label="学校">
        <el-input v-model.trim="user.school"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="addUser">创建</el-button>
  </div>
</div>
</template>
<script>
import userAxios from '@/global/service/user.js'
import transformDate from '@/utils/authcode.js'
export default {
  data () {
    return {
      labelPosition: 'left',
      user: {
        name: '',
        phone: '',
        sex: '',
        birthday: '',
        sms_name: '',
        sms_phone: '',
        site: '',
        school: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入学员名称', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入学员手机号码', trigger: 'blur' },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: '目前只支持中国大陆的手机号码',
            trigger: 'blur'
          }
        ],
        sex: [
          { required: true, message: '请选择学员性别', trigger: 'blur' }
        ],
        birthday: [
          { required: true, message: '请输入学员出生日期', trigger: 'blur' }
        ],
        sms_name: [
          { required: true, message: '请输入监护人姓名', trigger: 'blur' }
        ],
        sms_phone: [
          { required: true, message: '请输入监护人手机号码', trigger: 'blur' },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: '目前只支持中国大陆的手机号码',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    addUser () {
      this.$refs['rules'].validate(vaild => {
        if (vaild) {
          let data = this.user
          if (data.birthday) data.birthday = transformDate.formatDate(data.birthday)
          userAxios.add(data).then(() => {
            this.$router.push({ path: '/user' })
          })
        }
      })
    }
  }
}
</script>
