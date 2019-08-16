<template>
  <div class="page-container">
    <v-breadcrumb />
    <div class="page-content" v-loading="loading">
      <div class="mb-20">
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
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="created_at" label="时间"> </el-table-column>
        <el-table-column prop="total" label="金额"></el-table-column>
        <el-table-column label="类型">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status === 1 ? 'success' : ''">
              {{ scope.row.status === 1 ? "充值" : "消费" }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script type="text/javascript">
import Breadcrumb from "@/components/BasicBreadcrumb.vue";
import paymentService from "@/global/service/payment.js";

export default {
  data() {
    return {
      loading: true,
      tableData: [],
      pagination: {
        total: 0,
        currentPage: 1,
        pageSize: 10
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
        page_size: this.pagination.pageSize
      };

      paymentService
        .list(params)
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
    }
  },
  components: {
    "v-breadcrumb": Breadcrumb
  }
};
</script>

<style type="text/css" lang="less" scoped></style>
