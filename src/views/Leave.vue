<template>
  <div class="page-container">
    <v-breadcrumb />
    <div class="page-content" v-loading="loading">
      <div class="mb-20">
        <el-form label-position="right" inline label-width="80px">
          <el-form-item label="类型：">
            <el-select v-model="form.status">
              <el-option label="未处理" :value="0" />
              <el-option label="已确定" :value="1" />
              <el-option label="已补课" :value="2" />
            </el-select>
          </el-form-item>
          <div>
            <el-button type="primary" @click="getData">查询</el-button>
            <el-button @click="handleReset">重置</el-button>
          </div>
        </el-form>
      </div>
      <el-table class="mb-20" :data="tableData" style="width: 100%">
        <el-table-column prop="user_name" label="姓名"> </el-table-column>
        <el-table-column prop="name" label="班级名称"> </el-table-column>
        <el-table-column prop="date" label="请假日期"> </el-table-column>
        <el-table-column prop="start_time" label="上课时间"> </el-table-column>
        <el-table-column label="类型">
          <template slot-scope="scope">
            <el-tag v-if="!scope.row.status" type="info">未处理</el-tag>
            <el-tag v-if="scope.row.status === 1" type="primary">已确认</el-tag>
            <el-tag v-if="scope.row.status === 2" type="success">已补课</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              plain
              @click="handleChangeStatus(scope.row, scope.$index, 1)"
              v-if="!scope.row.status"
              >确认</el-button
            >
            <el-button
              type="success"
              plain
              @click="handleChangeStatus(scope.row, scope.$index, 2)"
              v-if="scope.row.status === 1"
              >补课</el-button
            >
            <span v-if="scope.row.status === 2"> - </span>
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
import leaveService from "@/global/service/leave.js";

export default {
  data() {
    return {
      loading: true,
      tableData: [],
      pagination: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      },
      form: {
        status: ""
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      let params = {
        current_page: this.pagination.currentPage,
        page_size: this.pagination.pageSize,
        status: this.form.status
      };

      leaveService
        .index(params)
        .then(res => {
          this.tableData = res.data.datas;
          this.pagination.pageSize = Number(res.data.pagination.page_size);
          this.pagination.currentPage = Number(
            res.data.pagination.current_page
          );
          this.pagination.total = Number(res.data.pagination.total);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleReset() {
      this.form.status = "";
      this.pagination.currentPage = 1;
      this.getData();
    },
    handleChangeStatus(row, index, status) {
      if (status === 2) {
        this.$confirm(
          `确定为${row.user_name} 于 ${row.date} ${row.start_time} 课时进行补课`,
          "补课即签到扣款"
        ).then(() => {
          this.changeStatus(row, index, status);
        });
      } else {
        this.changeStatus(row, index, status);
      }
    },
    changeStatus(row, index, status) {
      this.loading = true;
      leaveService
        .update(row.id, {
          status,
          user_id: row.user_id,
          lesson_id: row.lesson_id
        })
        .then(() => {
          this.tableData[index].status = status;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
  components: {
    "v-breadcrumb": Breadcrumb
  }
};
</script>

<style type="text/css" lang="less" scoped></style>
