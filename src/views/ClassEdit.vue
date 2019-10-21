<template>
  <div class="page-container">
    <v-breadcrumb />
    <div class="page-content" v-loading="loading">
      <el-row :gutter="10">
        <el-col :lg="12">
          <el-form
            :model="formData"
            :rules="rules"
            ref="classForm"
            label-position="left"
            label-width="160px"
          >
            <h3>班级信息</h3>
            <el-form-item label="班级名称" prop="name" style="width:460px;">
              <el-input v-model="formData.name" placeholder="班级名称" />
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
            <el-form-item label="状态" prop="status" style="width:460px;">
              <el-select v-model="formData.status" placeholder="请选择">
                <el-option :label="'未开启'" :value="0"></el-option>
                <el-option :label="'进行中'" :value="1"></el-option>
                <el-option :label="'已结束'" :value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="带课老师" style="width:460px;">
              <el-checkbox-group v-model="nowTeacher_id">
                <el-checkbox
                  v-for="item in teacherData"
                  :label="Number(item.id)"
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
                placeholder="选择开始时间"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间" prop="end_at" style="width:460px;">
              <el-date-picker
                v-model="formData.end_at"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择结束时间"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item
              label="课程描述"
              prop="description"
              style="width:460px;"
            >
              <el-input
                type="textarea"
                :rows="4"
                v-model="formData.description"
                placeholder="请输入课程描述"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleEdit" :disabled="disabled"
                >修改</el-button
              >
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :lg="12">
          <h3>课时信息</h3>
          <el-table :data="lessons" class="mb-20" style="width: 100%">
            <el-table-column prop="date" label="带课老师">
              <template slot-scope="scope">
                {{
                  scope.row.teacher_name || "未指定"
                }}
              </template>
            </el-table-column>
            <el-table-column prop="date" label="日期">
              <template slot-scope="scope">
                {{ scope.row.date || "-" }}
              </template>
            </el-table-column>
            <el-table-column prop="start_time" label="开始时间">
              <template slot-scope="scope">
                {{ scope.row.start_time || "-" }}
              </template>
            </el-table-column>
            <el-table-column prop="end_time" label="结束时间">
              <template slot-scope="scope">
                {{ scope.row.end_time || "-" }}
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  @click="handleEditLesson(scope.row, scope.$index)"
                  >编辑</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>

    <el-dialog
      title="修改课时"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose"
    >
      <div>
        <el-form
          :model="lessonDatas"
          :rules="LessonRules"
          ref="classForm"
          label-position="left"
        >
          <el-form-item label="带课老师" prop="date">
            <el-select v-model="lessonDatas.teacher_id" placeholder="请选择">
              <el-option
                v-for="item in teacherData"
                :key="item.id"
                :label="item.teacher_name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开始日期" prop="date">
            <el-date-picker
              v-model="lessonDatas.date"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择开始日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="上课时间" prop="start_time">
            <el-time-select
              class="start_time"
              placeholder="上课时间"
              v-model="lessonDatas.start_time"
              :picker-options="{
                start: '08:30',
                step: '00:15',
                end: '18:30',
                maxTime: lessonDatas.end_time
              }"
            >
            </el-time-select>
          </el-form-item>

          <el-form-item label="下课时间" prop="end_time">
            <el-time-select
              class="end_time"
              placeholder="下课时间"
              v-model="lessonDatas.end_time"
              :picker-options="{
                start: '08:30',
                step: '00:15',
                end: '18:30',
                minTime: lessonDatas.start_time
              }"
            >
            </el-time-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmitLessons">确 定</el-button>
      </span>
    </el-dialog>
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
      disabled: false,
      loading: false,
      courses: [],
      lessons: [],
      teacherData: [],
      dialogVisible: false,
      selectLessonIndex: null,
      selectLessonId: null,
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
        status: [{ required: true, message: "请输班级状态", trigger: "blur" }],
        description: [
          { required: true, message: "请输入班级描述", trigger: "blur" }
        ]
      },
      nowTeacher_id: [],
      formData: {
        name: "",
        start_at: "",
        course_id: "",
        teacher_id: [],
        end_at: "",
        lesson_count: "",
        price: "",
        description: ""
      },
      lessonDatas: {
        date: "",
        start_time: "",
        end_time: "",
        teacher_id: ""
      },
      LessonRules: {
        date: [{ required: true, message: "请输入课时日期", trigger: "blur" }],
        start_time: [
          { required: true, message: "请输入课时开始时间", trigger: "blur" }
        ],
        end_time: [
          { required: true, message: "请输入课时结束时间", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getCourse();
    this.getClassInfo();
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
    getClassInfo() {
      let id = this.$route.params.id;
      classService.show(id).then(res => {
        console.log(res)
        this.formData = res.class;
        this.lessons = res.lessons;
        this.nowTeacher_id = res.teacher;
      });
    },
    getCourse() {
      courseService.list().then(res => {
        this.courses = res;
      });
    },
    handleEdit() {
      this.formData.teacher_id = this.nowTeacher_id;
      this.$refs.classForm.validate(valid => {
        if (valid) {
          let params = {
            name: this.formData.name,
            start_at: this.formData.start_at,
            end_at: this.formData.end_at,
            course_id: this.formData.course_id,
            status: this.formData.status,
            description: this.formData.description,
            teacher_id: this.formData.teacher_id
          };
          this.disabled = true;
          let id = this.$route.params.id;
          classService
            .update(id, params)
            .then(() => {
              this.$message.success("编辑成功");
            })
            .finally(() => {
              this.disabled = false;
            });
        }
      });
    },
    handleEditLesson(data, index) {
      this.lessonDatas.date = data.date;
      this.lessonDatas.start_time = data.start_time;
      this.lessonDatas.end_time = data.end_time;
      this.selectLessonIndex = index;
      this.selectLessonId = data.id;
      this.dialogVisible = true;
    },
    handleClose() {
      this.dialogVisible = false;
    },
    handleSubmitLessons() {
      let id = this.selectLessonId;
      classService.updateLesson(id, this.lessonDatas).then(() => {
        this.lessons[this.selectLessonIndex].date = this.lessonDatas.date;
        this.lessons[
          this.selectLessonIndex
        ].start_time = this.lessonDatas.start_time;
        this.lessons[
          this.selectLessonIndex
        ].end_time = this.lessonDatas.end_time;
        this.lessons[
          this.selectLessonIndex
        ].teacher_id = this.lessonDatas.teacher_id;
        this.dialogVisible = false;
      });
    }
  },
  components: {
    "v-breadcrumb": Breadcrumb
  }
};
</script>

<style type="text/css" lang="less" scoped></style>
