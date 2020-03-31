<template>
  <div class="account-login-contaienr">
    <div class="account-login-bd">
      <div class="company-info-container">
        <img class="company-info-logo" src="~@/assets/logo.png" />
        <span class="company-info-name">留音社</span>
      </div>
      <div class="company-info-desc">规范的音乐教学</div>
      <div class="account-login-mainer">
        <div class="login-form-container">
          <div class="login-form-password">
            <el-form
              status-icon
              :rules="passwordRules"
              ref="passwordFrom"
              :model="passwordFrom"
            >
              <el-form-item prop="phone">
                <el-input
                  type="number"
                  prefix-icon="el-icon-mobile-phone"
                  placeholder="请输手机号"
                  autocomplete="off"
                  v-model="passwordFrom.phone"
                ></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  type="password"
                  prefix-icon="el-icon-lock"
                  placeholder="请输入密码"
                  autocomplete="off"
                  show-password
                  v-model="passwordFrom.password"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  style="width: 100%"
                  @click="login"
                  >登录</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import managerAxios from '@/global/service/manager.js'
import DataStore from '@/global/storage/index.js'

export default {
  data () {
    return {
      passwordFrom: {
        phone: '',
        password: ''
      },
      passwordRules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: '目前只支持中国大陆的手机号码',
            trigger: 'blur'
          }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  created: function () {
    let id = DataStore.getManagerId()
    let token = DataStore.getToken()
    let name = DataStore.getManagerName()
    let status = DataStore.getManagerStatus()
    if (id && token && name && !isNaN(status)) {
      this.$router.replace({ name: 'user' })
    }
  },
  methods: {
    login () {
      this.$refs['passwordFrom'].validate(valid => {
        if (valid) {
          let data = this.passwordFrom
          managerAxios.login(data).then(res => {
            this.$router.replace({ name: 'user' })
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.flex-cell {
  display: flex;
  .flex-cell-bd {
    flex: 1;
  }
  .flex-cell-ft {
    width: 130px;
    margin-left: 8px;
    &:after {
      display: none;
    }
    &.link {
      font-size: 14px;
      font-weight: 500;
      text-align: center;
      color: #409eff;
      text-decoration: none;
      vertical-align: top;
    }
  }
}
.account-login-contaienr {
  display: flex;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f0f2f5;
  background-position: center;
  padding-top: 40px;
  box-sizing: border-box;
}
.account-login-bd {
  flex: 1;
  padding: 32px 0;
}
.company-info-container {
  display: flex;
  justify-content: center;
  align-items: center;
  .company-info-logo {
    height: 44px;
    margin-right: 20px;
  }
  .company-info-name {
    line-height: 44px;
    font-size: 33px;
    font-weight: 600;
    font-family: Avenir;
  }
}
.company-info-desc {
  margin: 12px 0 40px;
  font-size: 14px;
  opacity: 0.5;
  text-align: center;
}
.account-login-mainer {
  max-width: 388px;
  margin: 40px auto;
}
.login-tab-container {
  text-align: center;
  margin-bottom: 24px;
  .login-tab-item {
    display: inline-block;
    position: relative;
    box-sizing: border-box;
    margin-right: 32px;
    padding: 12px 16px;
    cursor: pointer;
    font-size: 14px;
    line-height: 20px;
    color: #666;
    border-bottom: 2px solid transparent;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    &:last-child {
      margin-right: 0;
    }
    &.active {
      color: #1890ff;
      font-weight: 500;
      border-color: #1890ff;
    }
  }
}
</style>
