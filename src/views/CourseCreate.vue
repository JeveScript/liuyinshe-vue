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
        <el-form-item label="课程名称" prop="name" style="width:460px;">
          <el-input v-model="formData.name" placeholder="请输入课程名称" />
        </el-form-item>
        <el-form-item label="课程描述" prop="description" style="width:460px;">
          <el-input
            type="textarea"
            :rows="4"
            v-model="formData.description"
            placeholder="请输入课程描述"
            resize="none"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="handleCreatecourse"
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
import courseService from "@/global/service/course.js";

export default {
  data() {
    return {
      disabled: false,
      loading: false,
      rules: {
        name: [{ required: true, message: "请输入课程名称", trigger: "blur" }],
        description: [
          { required: true, message: "请输入课程描述", trigger: "blur" }
        ]
      },
      formData: {
        name: "",
        description: ""
      }
    };
  },
  methods: {
    handleCreatecourse() {
      this.$refs.userForm.validate(valid => {
        if (valid) {
          let params = {
            name: this.formData.name,
            description: this.formData.description
          };
          this.disabled = true;
          courseService
            .create(params)
            .then(() => {
              this.$message.success("创建成功");
              this.$router.push({ name: "Course" });
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
