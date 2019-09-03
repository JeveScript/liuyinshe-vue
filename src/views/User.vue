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
          >添加学员</el-button
        >
        <el-form label-position="right" inline label-width="80px">
          <el-form-item label="姓名：">
            <el-input v-model="formData.name" placeholder="请输入姓名" />
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="formData.phone" placeholder="请输入手机号" />
          </el-form-item>
          <div>
            <el-button type="primary" @click="getData">查询</el-button>
            <el-button @click="handleReset">重置</el-button>
          </div>
        </el-form>
      </div>
      <div class="table-secton">
        <el-table :data="tableData" class="mb-20" style="width: 100%">
          <el-table-column prop="name" label="姓名"> </el-table-column>
          <el-table-column prop="phone" label="电话"> </el-table-column>
          <el-table-column prop="sex" label="性别">
            <template slot-scope="scope">
              <el-tag :type="scope.row.sex === 1 ? '' : 'success'">
                {{ scope.row.sex === 1 ? "男" : "女" }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="birthday" label="生日" />
          <el-table-column prop="sms_name" label="紧急联系人" />
          <el-table-column prop="sms_phone" label="紧急电话" />
          <el-table-column prop="balance" label="余额/元" />
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
  </div>
</template>

<script type="text/javascript">
import Breadcrumb from "@/components/BasicBreadcrumb.vue";
import userService from "@/global/service/user.js";

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
      formData: {
        name: "",
        phone: ""
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
        name: this.formData.name,
        phone: this.formData.phone
      };

      userService
        .list(params)
        .then(res => {
          this.tableData = res.datas;
          this.pagination.pageSize = Number(res.pagination.page_size);
          this.pagination.currentPage = Number(res.pagination.current_page);
          this.pagination.total = Number(res.pagination.total);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleLinkCreate() {
      this.$router.push({ name: "UserCreate" });
    },
    handleEdit(row) {
      const { id } = row;
      this.$router.push({
        name: "UserEdit",
        params: { id }
      });
    },
    handleDetail(row) {
      const { id } = row;
      this.$router.push({
        name: "UserItem",
        params: { id }
      });
    },
    handleReset() {
      this.formData.name = "";
      this.formData.phone = "";
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
