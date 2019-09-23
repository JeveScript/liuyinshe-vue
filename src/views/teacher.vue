<template>
  <div class="page-container">
    <v-breadcrumb></v-breadcrumb>
    <div class="page-content">
      <router-link to="/admin/teacher/create"
        ><el-button type="primary">添加老师</el-button></router-link
      >
      <el-table :data="teacherData" style="width: 100%">
        <el-table-column prop="teacher_phone" label="手机号码" width="180">
        </el-table-column>
        <el-table-column prop="teacher_name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="teacher_intro" label="简介"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="mini"
              @click="teacherItem(scope.$index, scope.row)"
              >详情</el-button
            >
            |
            <el-button
              type="text"
              size="mini"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import Breadcrumb from "@/components/BasicBreadcrumb.vue";
import teacherService from "@/global/service/teacher.js";
export default {
  data() {
    return {
      teacherData: []
    };
  },
  created: function() {
    teacherService
      .list()
      .then(res => {
        this.teacherData = res;
      })
      .catch(e => {});
  },
  methods: {
    teacherItem: function(index, row) {
      this.$router.push({
        name: "TeacherEdit",
        params: { id: row.id }
      });
    }
  },
  components: {
    "v-breadcrumb": Breadcrumb
  }
};
</script>
