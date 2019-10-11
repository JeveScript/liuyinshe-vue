<template>
  <div class="page-container">
    <v-breadcrumb />
    <div class="page-content" v-loading="loading">
      <div class="mb-20">
        <el-row :gutter="12" style="margin-bottom:30px;">
          <el-col :span="12">
            <el-card shadow="always"> 当月收入: {{ accounts.income }} </el-card>
          </el-col>
          <el-col :span="12">
            <el-card shadow="always">
              当月支出: {{ accounts.expenditure }}
            </el-card>
          </el-col>
        </el-row>
        <el-form label-position="right" inline label-width="80px">
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
          <el-form-item label="类型：">
            <el-select v-model="form.status">
              <el-option label="充值" :value="1" />
              <el-option label="消费" :value="2" />
              <el-option label="赠送" :value="3" />
            </el-select>
          </el-form-item>
          <div>
            <el-button type="primary" @click="getData">查询</el-button>
            <el-button @click="handleReset">重置</el-button>
          </div>
        </el-form>
      </div>
      <el-table class="mb-20" :data="tableData" style="width: 100%">
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
import paymentService from "@/global/service/payment.js";

export default {
  data() {
    return {
      accounts: {},
      loading: true,
      tableData: [],
      pagination: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      },
      form: {
        status: "",
        date: []
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
  },
  methods: {
    getData() {
      let params = {
        current_page: this.pagination.currentPage,
        page_size: this.pagination.pageSize,
        status: this.form.status
      };
      let formDate = this.form.date;
      if (formDate.length) {
        params.start_at = formDate[0];
        params.end_at = formDate[1];
      }

      paymentService
        .list(params)
        .then(res => {
          let { income, expenditure } = res;
          this.accounts = { income, expenditure };
          this.tableData = res.datas;
          this.pagination.pageSize = Number(res.pagination.page_size);
          this.pagination.currentPage = Number(res.pagination.current_page);
          this.pagination.total = Number(res.pagination.total);
        })
        .finally(() => {
          this.loading = false;
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
