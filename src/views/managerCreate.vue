<template>
<div class="page-content">
  <div class="manager-section" style="max-width:500px">
    <h3>管理员添加</h3>
    <el-form :label-position="labelPosition" :rules="rules" ref="rules"  label-width="80px" :model="manager" >
      <el-form-item label="名字" prop="name">
        <el-input v-model.trim="manager.name"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="phone">
        <el-input v-model.trim="manager.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model.trim="manager.password" show-password></el-input>
      </el-form-item>
      <el-form-item label="权限" prop="status">
        <el-radio v-model.trim="manager.status" label="0">管理员</el-radio>
        <el-radio v-model.trim="manager.status" label="1">前台</el-radio>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="addManager">创建</el-button>
  </div>
</div>
</template>

<script>
import managerAxios from '@/global/service/manager.js'
export default {
  data () {
    return {
      labelPosition: 'left',
      manager: {
        name: '',
        phone: '',
        password: '',
        status: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名称', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入用户手机号码', trigger: 'blur' },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: '目前只支持中国大陆的手机号码',
            trigger: 'blur'
          }
        ],
        password: [{
          required: true, message: '请输入用户密码', trigger: 'blur'
        }],
        status: [
          { required: true, message: '请选择用户权限', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    addManager () {
      this.$refs['rules'].validate(vaild => {
        if (vaild) {
          managerAxios.add(this.manager).then(res => {
            this.$message({
              message: '管理员添加成功',
              type: 'success'
            })
            this.$router.push({ path: '/manager' })
          }).catch(e => {
            this.$message.error('管理员添加失败')
          })
        }
      })
    }
  }
}
</script>
