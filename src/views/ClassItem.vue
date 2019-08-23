<template>
  <div class="page-container">
    <v-breadcrumb />
    <div class="page-content" v-loading="loading">
      <el-card class="box-card mb-20">
        <div slot="header" class="clearfix">
          <span>报名学员</span>
        </div>
        <el-table :data="users" class="mb-20" style="width: 100%">
          <el-table-column prop="name" label="姓名" />
          <el-table-column prop="phone" label="手机" />
          <el-table-column prop="created_at" label="加入时间" />
        </el-table>
      </el-card>

      <el-row :gutter="20">
        <el-col :lg="12">
          <el-card class="box-card mb-20">
            <div slot="header" class="clearfix">
              <span>班级信息</span>
            </div>
            <el-form
              :model="formData"
              ref="classForm"
              label-position="left"
              label-width="160px"
            >
              <el-form-item label="班级名称" prop="name" style="width:460px;">
                {{ formData.name }}
              </el-form-item>
              <el-form-item label="课程" prop="course_id" style="width:460px;">
                {{ formData.course_name }}
              </el-form-item>
              <el-form-item label="状态" prop="status" style="width:460px;">
                {{
                  formData.status
                    ? formData.status === 1
                      ? "进行中"
                      : "已结束"
                    : "未开启"
                }}
              </el-form-item>
              <el-form-item
                label="开始时间"
                prop="start_at"
                style="width:460px;"
              >
                {{ formData.start_at }}
              </el-form-item>
              <el-form-item label="结束时间" prop="end_at" style="width:460px;">
                {{ formData.end_at }}
              </el-form-item>
              <el-form-item
                label="课程描述"
                prop="description"
                style="width:460px;"
              >
                {{ formData.description }}
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
        <el-col :lg="12">
          <el-card class="box-card mb-20">
            <div slot="header" class="clearfix">
              <span>课时信息</span>
            </div>
            <el-table :data="lessons" class="mb-20" style="width: 100%">
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
            </el-table>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script type="text/javascript">
import Breadcrumb from "@/components/BasicBreadcrumb.vue";
import classService from "@/global/service/class.js";

export default {
  data() {
    return {
      disabled: false,
      loading: false,
      courses: [],
      lessons: [],
      users: [],
      formData: {}
    };
  },
  computed: {},
  created() {
    this.getClassInfo();
  },
  methods: {
    getClassInfo() {
      let id = this.$route.params.id;
      classService.show(id).then(res => {
        this.formData = res.data.class;
        this.lessons = res.data.lessons;
        this.users = res.data.users;
      });
    },
    linkClassEdit() {
      let id = this.$route.params.id;
      this.$router.push({ name: "ClassEdit", params: { id } });
    }
  },
  components: {
    "v-breadcrumb": Breadcrumb
  }
};
</script>

<style type="text/css" lang="less" scoped></style>
