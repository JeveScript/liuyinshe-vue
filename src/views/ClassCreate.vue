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
        <el-row :gutter="20">
          <el-col :lg="10">
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
            <el-form-item label="带课老师" style="width:460px;">
              <el-checkbox-group v-model="formData.teacher_id">
                <el-checkbox
                  v-for="item in teacherData"
                  :label="item.id"
                  :key="item.id"
                  >{{ item.teacher_name }}</el-checkbox
                >
              </el-checkbox-group>
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
          </el-col>
          <el-col :lg="10">
            <el-form-item
              label="课时总数"
              prop="lesson_count"
              style="width:460px;"
            >
              {{ formData.lesson.length || 0 }} 节
            </el-form-item>
            <el-form-item label="新课时节数" style="width:460px;">
              <el-input
                type="number"
                v-model="showLesson_count"
                placeholder="添加新课时节数"
              >
                <el-button slot="append" @click.prevent="addlesson"
                  >添加</el-button
                >
              </el-input>
              <el-input
                type="number"
                v-model="showLesson_price"
                placeholder="统一价格"
                style="margin-top:10px;"
              >
                <el-button slot="append" @click.prevent="editLesson_price"
                  >修改</el-button
                >
              </el-input>
              <div
                style="margin-top: 15px;"
                v-for="(data, index) in formData.lesson"
                :key="index"
              >
                带课老师:
                {{
                  data.teacher_id
                    ? teacherData.filter(
                        newdata => newdata.id == data.teacher_id
                      )[0].teacher_name
                    : "未指定"
                }}
                <el-input
                  placeholder="请输入内容"
                  v-model="data.lesson_price"
                  class="input-with-select"
                >
                  <el-select
                    v-model="data.teacher_id"
                    slot="prepend"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in teacherData"
                      :key="item.id"
                      :label="item.teacher_name"
                      :value="item.id"
                    ></el-option>
                  </el-select>

                  <el-button></el-button>
                </el-input>
              </div>
            </el-form-item>
            <el-form-item label="课时总价" style="width:460px;">
              {{
                formData.lesson.length > 0
                  ? formData.lesson
                      .map(data => {
                        return data.lesson_price;
                      })
                      .reduce((a, b) => {
                        return Number(a) + Number(b);
                      })
                  : 0
              }}
              元
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script type="text/javascript">
import Breadcrumb from "@/components/BasicBreadcrumb.vue";
import classService from "@/global/service/class.js";
import courseService from "@/global/service/course.js";
import teacherService from "@/global/service/teacher.js";
export default {
  data() {
    return {
      showLesson_price: "",
      showLesson_count: null,
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
        description: [
          { required: true, message: "请输入班级描述", trigger: "blur" }
        ]
      },
      formData: {
        name: "",
        start_at: "",
        course_id: "",
        end_at: "",
        lesson: [],
        description: "",
        teacher_id: []
      },
      teacherData: []
    };
  },
  created() {
    this.getCourse();
    this.getTeacher();
  },
  methods: {
    getTeacher() {
      teacherService
        .list()
        .then(res => {
          this.teacherData = res;
        })
        .catch(e => {});
    },
    getCourse() {
      courseService.list().then(res => {
        this.courses = res;
      });
    },
    addlesson() {
      let lesson = [];
      for (var i = 0; i < Number(this.showLesson_count); i++) {
        lesson.push({ lesson_price: "", teacher_id: "" });
      }
      this.formData.lesson = lesson;
      this.showLesson_count = "";
    },
    editLesson_price() {
      let showLesson_price = this.showLesson_price;
      if (showLesson_price)
        this.formData.lesson.forEach(
          item => (item.lesson_price = showLesson_price)
        );
      this.showLesson_price = "";
    },
    handleCreateManager() {
      if (this.formData.teacher_id <= 0) return this.$message("请选择带课老师");
      if (this.formData.lesson.length <= 0) {
        return this.$message("请添加课时");
      }
      let priceSome = this.formData.lesson.some(data => !data.lesson_price);
      let teacherSome = this.formData.lesson.some(data => !data.teacher_id);
      if (priceSome) return this.$message("输入课时价格");
      if (teacherSome) return this.$message("请选择带课老师");

      this.$refs.classForm.validate(valid => {
        if (valid) {
          let params = {
            name: this.formData.name,
            start_at: this.formData.start_at,
            end_at: this.formData.end_at,
            course_id: this.formData.course_id,
            lesson: this.formData.lesson,
            description: this.formData.description,
            teacher_id: this.formData.teacher_id
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
