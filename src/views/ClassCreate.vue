<template>
  <div class="page-container">
    <v-breadcrumb />
    <div class="page-content" v-loading="loading">
      <el-form
        :model="formData"
        :rules="rules"
        ref="classForm"
        label-position="left"
        label-width="160px"
      >
        <h3>班级信息</h3>
        <el-form-item label="班级名称" prop="name" style="width:460px;">
          <el-input v-model="formData.name" placeholder="请输入班级名称" />
        </el-form-item>
        <el-form-item label="课程" prop="course_id" style="width:460px;">
          <el-select v-model="formData.course_id">
            <el-option
              v-for="item in courses"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间" prop="start_at" style="width:460px;">
          <el-date-picker
            v-model="formData.start_at"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="start_at" style="width:460px;">
          <el-date-picker
            v-model="formData.end_at"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="课时总数" prop="lesson_count" style="width:460px;">
          <el-input
            type="number"
            v-model="formData.lesson_count"
            placeholder="请输入课时总数"
          />
        </el-form-item>
        <el-form-item label="价格" prop="price" style="width:460px;">
          <el-input
            type="number"
            v-model="formData.price"
            placeholder="请输入总价格"
          />
        </el-form-item>
        <el-form-item label="课时单价" style="width:460px;">
          {{ formData.price / formData.lesson_count || 0 }} 元 / 小节
        </el-form-item>
        <el-form-item label="描述" prop="description" style="width:460px;">
          <el-input
            type="textarea"
            :rows="4"
            v-model="formData.description"
            placeholder="请输入班级描述"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            s
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
import classService from "@/global/service/class.js";
import courseService from "@/global/service/course.js";

export default {
  data() {
    return {
      disabled: false,
      loading: false,
      courses: [],
      rules: {
        name: [{ required: true, message: "请输入班级名称", trigger: "blur" }],
        course_id: [
          { required: true, message: "请输入关联课程", trigger: "blur" }
        ],
        start_at: [
          { required: true, message: "请输入开始时间", trigger: "blur" }
        ],
        end_at: [
          { required: true, message: "请输入结束时间", trigger: "blur" }
        ],
        lesson_count: [
          { required: true, message: "请输入课时总数", trigger: "blur" }
        ],
        price: [{ required: true, message: "请输入班级总价", trigger: "blur" }],
        description: [
          { required: true, message: "请输入班级描述", trigger: "blur" }
        ]
      },
      formData: {
        name: "",
        start_at: "",
        course_id: "",
        end_at: "",
        lesson_count: "",
        price: "",
        description: ""
      }
    };
  },
  created() {
    this.getCourse();
  },
  methods: {
    getCourse() {
      courseService.list().then(res => {
        this.courses = res;
      });
    },
    handleCreateManager() {
      this.$refs.classForm.validate(valid => {
        if (valid) {
          let params = {
            name: this.formData.name,
            start_at: this.formData.start_at,
            end_at: this.formData.end_at,
            course_id: this.formData.course_id,
            lesson_count: this.formData.lesson_count,
            price: this.formData.price,
            description: this.formData.description
          };
          this.disabled = true;

          classService
            .create(params)
            .then(res => {
              let id = res.class_id;
              this.$message.success("创建成功");
              this.$router.push({ name: "ClassEdit", params: { id } });
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
