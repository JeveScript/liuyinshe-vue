<template>
  <div class="page-container">
    <v-breadcrumb />
    <div class="page-content" v-loading="loading">
      <h3>课时信息</h3>
      <el-form inline label-position="left" label-width="80px">
        <el-form-item label="开始时间" style="width:240px;">
          {{ lesson.start_time }}
        </el-form-item>
        <el-form-item label="结束时间" style="width:240px;">
          {{ lesson.end_time }}
        </el-form-item>
        <el-form-item label="课时状态" style="width:280px;">
          <el-select v-model="lesson.status" placeholder="课时状态">
            <el-option :label="'已结束'" :value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <h3>报名学员</h3>
      <el-table :data="users" style="width: 100%">
        <el-table-column prop="name" label="学员名称"></el-table-column>
        <el-table-column label="点名情况">
          <template slot-scope="scope">
            <el-tag v-if="!scope.row.status" type="info">未点名</el-tag>
            <el-tag v-if="scope.row.status === 1" type="">已点名</el-tag>
            <el-tag v-if="!scope.row.status === 2" type="success">请假</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="finish_at" label="点名时间"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script type="text/javascript">
import Breadcrumb from "@/components/BasicBreadcrumb.vue";
import lessonService from "@/global/service/lesson.js";

export default {
  data() {
    return {
      loading: true,
      users: [],
      lesson: {
        status: ""
      },
      lessonStatus: ""
    };
  },
  created() {
    let id = this.$route.params.id;
    lessonService
      .list(id)
      .then(res => {
        this.users = res.data.users;
        this.lesson = res.data.lesson;
        this.lessonStatus = res.data.lesson.status || "";
      })
      .finally(() => {
        this.loading = false;
      });
  },
  methods: {},
  components: {
    "v-breadcrumb": Breadcrumb
  }
};
</script>

<style type="text/css" lang="less" scoped></style>
