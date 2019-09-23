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
        <h3>{{ formData.name }} 学员信息</h3>
        <el-form-item label="真实姓名" prop="name" style="width:460px;">
          <el-input v-model="formData.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="性别" prop="sex" style="width:460px;">
          <el-select v-model="formData.sex" placeholder="请选择">
            <el-option :label="'男'" :value="1"></el-option>
            <el-option :label="'女'" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生日" prop="birthday" style="width:460px;">
          <el-date-picker
            v-model="formData.birthday"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="手机号" prop="phone" style="width:460px;">
          <el-input v-model="formData.phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item
          label="紧急联系人姓名"
          prop="sms_name"
          style="width:460px;"
        >
          <el-input
            v-model="formData.sms_name"
            placeholder="请输入紧急联系人姓名"
          />
        </el-form-item>
        <el-form-item
          label="紧急联系人电话"
          prop="sms_phone"
          style="width:460px;"
        >
          <el-input
            v-model="formData.sms_phone"
            placeholder="请输入紧急联系人手机号"
          />
        </el-form-item>
        <el-form-item label="学生状态" style="width:460px;">
          <el-radio-group v-model="formData.status">
            <el-radio :label="1">在学</el-radio>
            <el-radio :label="2">休假</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="学员地址" style="width:460px;">
          <el-input v-model="formData.site" placeholder="请输入学员地址" />
        </el-form-item>
        <el-form-item label="学校" style="width:460px;">
          <el-input v-model="formData.school" placeholder="请输入学校" />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="handleCreateManager"
            :disabled="disabled"
            >编辑</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script type="text/javascript">
import Breadcrumb from "@/components/BasicBreadcrumb.vue";
import userService from "@/global/service/user.js";

export default {
  data() {
    return {
      disabled: false,
      loading: false,
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "目前只支持中国大陆的手机号码",
            trigger: "blur"
          }
        ],
        sex: [{ required: true, message: "请输入性别", trigger: "blur" }],
        birthday: [
          { required: true, message: "请输入出生年月", trigger: "blur" }
        ],
        sms_name: [
          { required: true, message: "请输入紧急联系人姓名", trigger: "blur" }
        ],
        sms_phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "目前只支持中国大陆的手机号码",
            trigger: "blur"
          }
        ]
      },
      formData: {
        name: "",
        phone: "",
        sex: "",
        birthday: "",
        sms_name: "",
        sms_phone: "",
        status: "",
        site: "",
        school: ""
      }
    };
  },
  created() {
    let id = this.$route.params.id;
    userService.show(id).then(res => {
      let userInfo = res.user;
      this.formData = userInfo;
    });
  },
  methods: {
    handleCreateManager() {
      this.$refs.userForm.validate(valid => {
        if (valid) {
          let params = {
            name: this.formData.name,
            phone: this.formData.phone,
            sex: this.formData.sex,
            birthday: this.formData.birthday,
            sms_name: this.formData.sms_name,
            sms_phone: this.formData.sms_phone,
            status: this.formData.status,
            site: this.formData.site,
            school: this.formData.school
          };
          this.disabled = true;
          let id = this.$route.params.id;
          userService
            .update(id, params)
            .then(() => {
              this.$message.success("编辑成功");
              this.$router.push({ name: "User" });
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
