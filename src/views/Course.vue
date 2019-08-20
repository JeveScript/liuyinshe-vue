<template>
  <div class="page-container">
    <v-breadcrumb />
    <div class="page-content" v-loading="loading">
      <div class="mb-20">
        <el-button type="primary" @click="handleLinkcourseCreate"
          >添加课程</el-button
        >
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="名称"> </el-table-column>
        <el-table-column prop="teacher" label="老师"> </el-table-column>
        <el-table-column prop="teacher_phone" label="老师电话">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEditCourse(scope.row)"
              >编辑</el-button
            >
            <el-divider direction="vertical"></el-divider>
            <el-button
              type="text"
              @click="handleDeleteCourse(scope.row, scope.$index)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script type="text/javascript">
import Breadcrumb from "@/components/BasicBreadcrumb.vue";
import courseService from "@/global/service/course.js";

export default {
  data() {
    return {
      loading: true,
      tableData: []
    };
  },
  created() {
    courseService
      .list()
      .then(res => {
        let course = res.data;
        this.tableData = course;
      })
      .finally(() => {
        this.loading = false;
      });
  },
  methods: {
    handleLinkcourseCreate() {
      this.$router.push({ name: "CourseCreate" });
    },
    handleEditCourse(row) {
      const { id } = row;
      this.$router.push({
        name: "CourseEdit",
        params: { id }
      });
    },
    handleDeleteCourse(row, index) {
      const { name, id } = row;
      this.$confirm(`此操作将永久删除该${name}课程, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        courseService.delete(id).then(() => {
          this.$message.success("删除成功！");
          this.tableData.splice(index, 1);
        });
      });
    }
  },
  components: {
    "v-breadcrumb": Breadcrumb
  }
};
</script>

<style type="text/css" lang="less" scoped></style>
