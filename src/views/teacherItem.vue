<template>
  <div class="page-container">
    <v-breadcrumb></v-breadcrumb>
    <div class="page-content">
      <el-tabs v-model="activeName">
        <el-tab-pane label="用户详情" name="1">
          <h3用户详情<h3 />
          <div class="teacherItem-details">
            <el-form label-position="left" label-width="160px">
              <el-form-item label="老师名称" style="width:460px">
                <el-input></el-input>
              </el-form-item>
              <el-form-item label="联系方式" style="width:460px">
                <el-input></el-input>
              </el-form-item>
              <el-form-item label="简介" style="width:460px">
                <el-input
                  type="textarea"
                  :rows="4"
                  placeholder="请输入简介"
                  resize="none"
                />
              </el-form-item>
            </el-form>
            <el-button type="primary">编辑</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="教授班级" name="2">
          <div class="teacherItem-class">
            <h3>教授班级</h3>
            <el-table :data="tableData" height="600" border style="width: 100%">
              <el-table-column prop="date" label="日期" width="180">
              </el-table-column>
              <el-table-column prop="name" label="姓名" width="180">
              </el-table-column>
              <el-table-column prop="address" label="地址"> </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" @click="">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "@/components/BasicBreadcrumb.vue";

export default {
  data() {
    return {
      activeName: "1",
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ]
    };
  },
  components: {
    "v-breadcrumb": Breadcrumb
  }
};
</script>
