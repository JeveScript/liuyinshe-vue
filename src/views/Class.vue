<template>
  <div class="page-container">
    <v-breadcrumb />
    <div class="page-content" v-loading="loading">
      <div class="mb-20">
        <el-button
          type="primary"
          plain
          style="float:right;"
          @click="handleLinkCreate"
          >添加班级</el-button
        >
        <el-form label-position="right" inline label-width="80px">
          <el-form-item label="班名：">
            <el-input v-model="form.name" placeholder="请输入姓名" />
          </el-form-item>
          <el-form-item label="课程：">
            <el-select v-model="form.course_id">
              <el-option label="全部" :value="''" />
              <el-option
                v-for="item in courses"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="状态：">
            <el-select v-model="form.status">
              <el-option label="全部" :value="''" />
              <el-option label="未开启" :value="0" />
              <el-option label="进行中" :value="1" />
              <el-option label="已结束" :value="2" />
            </el-select>
          </el-form-item>
          <el-form-item label="时间：">
            <el-date-picker
              v-model="form.date"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
          </el-form-item>
          <div>
            <el-button type="primary" @click="getData">查询</el-button>
            <el-button @click="handleReset">重置</el-button>
          </div>
        </el-form>
      </div>
      <el-table class="mb-20" :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="班级名称" />
        <el-table-column prop="course_name" label="课程分类" />
        <el-table-column prop="start_at" label="开始时间" />
        <el-table-column prop="end_at" label="结束时间" />
        <el-table-column prop="price" label="价格" />
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="!scope.row.status" type="info">未开启</el-tag>
            <el-tag v-if="scope.row.status === 1" type="">进行中</el-tag>
            <el-tag v-if="scope.row.status === 2" type="success">已结束</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-divider direction="vertical"></el-divider>
            <el-button type="text" @click="handleDetail(scope.row)"
              >详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div>
        <el-pagination
          v-if="pagination.total > pagination.pageSize"
          background
          layout="prev, pager, next"
          :current-page.sync="pagination.currentPage"
          :page-size="pagination.pageSize"
          :total="pagination.total"
          @current-change="getData"
        >
        </el-pagination>
      </div>
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
      loading: true,
      tableData: [],
      courses: [],
      pagination: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      },
      form: {
        name: "",
        status: "",
        date: [],
        course_id: ""
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      }
    };
  },
  created() {
    this.getData();
    this.getCourse();
  },
  methods: {
    getCourse() {
      courseService.list().then(res => {
        this.courses = res;
      });
    },
    getData() {
      let params = {
        current_page: this.pagination.currentPage,
        page_size: this.pagination.pageSize,
        status: this.form.status,
        course_id: this.form.course_id,
        name: this.form.name
      };
      console.log(params);
      let formDate = this.form.date;
      if (formDate.length) {
        params.start_at = formDate[0];
        params.end_at = formDate[1];
      }

      classService
        .list(params)
        .then(res => {
          this.tableData = res.datas;
          this.pagination.pageSize = Number(res.pagination.page_size);
          this.pagination.currentPage = Number(
            res.pagination.current_page
          );
          this.pagination.total = Number(res.pagination.total);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleLinkCreate() {
      this.$router.push({ name: "ClassCreate" });
    },
    handleEdit(row) {
      const { id } = row;
      this.$router.push({
        name: "ClassEdit",
        params: { id }
      });
    },
    handleDetail(row) {
      const { id } = row;
      this.$router.push({
        name: "ClassItem",
        params: { id }
      });
    },
    handleReset() {
      this.form.status = "";
      this.form.date = [];
      this.pagination.currentPage = 1;
      this.getData();
    }
  },
  components: {
    "v-breadcrumb": Breadcrumb
  }
};
</script>

<style type="text/css" lang="less" scoped></style>
