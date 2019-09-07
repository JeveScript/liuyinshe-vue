<template>
  <div class="page-container">
    <v-breadcrumb></v-breadcrumb>
    <div class="page-content">
      <router-link to="/admin/teacher/create"
        ><el-button type="primary">添加老师</el-button></router-link
      >
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
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

export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  methods: {
    teacherItem: function(index, row) {
      console.log(row);
      this.$router.push({
        name: "TeacherEdit",
        params: { id: 1 }
      });
    }
  },
  components: {
    "v-breadcrumb": Breadcrumb
  }
};
</script>
