<template>
  <div class="page-container">
    <v-breadcrumb />
    <div class="page-content" v-loading="loading">
      <el-form
        :model="formData"
        :rules="rules"
        ref="userForm"
        label-position="left"
        label-width="160px"
      >
        <h3>子管理员信息</h3>
        <el-form-item label="真实姓名" prop="name" style="width:460px;">
          <el-input v-model="formData.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="手机号码" prop="phone" style="width:460px;">
          <el-input v-model="formData.phone" placeholder="请输入手机号码" />
        </el-form-item>
        <el-form-item label="管理员权限" prop="status" style="width:460px;">
          <el-radio v-model="formData.status" label="0">管理员</el-radio>
          <el-radio v-model="formData.status" label="1">前台</el-radio>
        </el-form-item>
        <el-form-item label="密码" prop="phone" style="width:460px;">
          <el-input
            v-model="formData.password"
            type="password"
            show-password
            placeholder="请输入管理员密码"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="handleCreateManager"
            :disabled="disabled"
            >添加</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script type="text/javascript">
import Breadcrumb from "@/components/BasicBreadcrumb.vue";
import managerService from "@/global/service/manager.js";

export default {
  data() {
    return {
      disabled: false,
      loading: false,
      rules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "目前只支持中国大陆的手机号码",
            trigger: "blur"
          }
        ],
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        status: [{ required: true, message: "请选择权限", trigger: "blur" }]
      },
      formData: {
        name: "",
        phone: "",
        password: "",
        status: ""
      }
    };
  },
  methods: {
    handleCreateManager() {
      this.$refs.userForm.validate(valid => {
        if (valid) {
          let params = {
            name: this.formData.name,
            phone: this.formData.phone,
            password: this.formData.password,
            status: this.formData.status
          };
          this.disabled = true;
          managerService
            .create(params)
            .then(() => {
              this.$message.success("创建成功");
              this.$router.push({ name: "Manager" });
            })
            .catch(err => {
              this.$message("创建失败,查看用户是否存在");
            })
            .finally(() => {
              this.disabled = false;
            });
        }
      });
    }
  },
  components: {
    "v-breadcrumb": Breadcrumb
  }
};
</script>

<style type="text/css" lang="less" scoped></style>
