<template>
  <div class="page-container">
    <div class="page-content">
      <el-card class="box-card">
        <h3>请假列表</h3>
        <el-table class="mb-20" :data="leaveData" style="width: 100%">
          <el-table-column prop="user_name" label="姓名"> </el-table-column>
          <el-table-column prop="name" label="班级名称"> </el-table-column>
          <el-table-column prop="date" label="请假日期"> </el-table-column>
          <el-table-column prop="start_time" label="上课时间">
          </el-table-column>
          <el-table-column label="类型">
            <template slot-scope="scope">
              <el-tag v-if="!scope.row.status" type="info">未处理</el-tag>
              <el-tag v-if="scope.row.status === 1" type="primary"
                >已确认</el-tag
              >
              <el-tag v-if="scope.row.status === 2" type="success"
                >已补课</el-tag
              >
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
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <el-row style="margin-top:30px;">
        <el-col :span="12">
          <el-card class="box-card">
            <h3>今日点名课程</h3>
            <el-table :data="lessonNewDate" style="width: 100%">
              <el-table-column prop="date" label="日期"> </el-table-column>
              <el-table-column prop="name" label="班级"> </el-table-column>
              <el-table-column prop="start_time" label="上课时间">
              </el-table-column>
              <el-table-column prop="end_time" label="下课时间">
              </el-table-column>
              <el-table-column label="点名">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="linkEditSubmit(scope.$index, scope.row)"
                    >点名</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
        <el-col :span="11" :push="1">
          <el-card class="box-card">
            <h3>提醒用户列表</h3>
            <el-table :data="userSdata" style="width: 100%">
              <el-table-column prop="name" label="姓名"> </el-table-column>
              <el-table-column prop="phone" label="手机"> </el-table-column>
              <el-table-column prop="balance" label="余额"> </el-table-column>
            </el-table>
          </el-card>
        </el-col>
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import leaveService from "@/global/service/leave.js";
import lessonService from "@/global/service/lesson.js";
import userService from "@/global/service/user.js";
export default {
  data() {
    return {
      loading: true,
      tableData: [],
      leaveData: [],
      pagination: {
        total: 0,
        currentPage: 1,
        pageSize: 200
      },
      form: {
        status: 0
      },
      lessonNewDate: [],
      userSdata: []
    };
  },
  created() {
    this.getLeaveData();
    this.getNewLsoon();
    this.getUserS();
  },
  methods: {
    getUserS() {
      userService
        .userS()
        .then(res => {
          this.userSdata = res;
        })
        .catch(e => {});
    },
    getNewLsoon() {
      lessonService
        .newDate()
        .then(res => {
          this.lessonNewDate = res;
        })
        .catch(e => {});
    },
    getLeaveData() {
      let params = {
        current_page: this.pagination.currentPage,
        page_size: this.pagination.pageSize,
        status: this.form.status
      };

      leaveService
        .index(params)
        .then(res => {
          this.leaveData = res.datas;
          this.pagination.pageSize = Number(res.pagination.page_size);
          this.pagination.currentPage = Number(res.pagination.current_page);
          this.pagination.total = Number(res.pagination.total);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleChangeStatus(row, index, status) {
      this.changeStatus(row, index, status);
    },
    linkEditSubmit(index, row) {
      this.$router.push({ name: "Lesson", params: { id: row.id } });
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
          this.tableData.splice(index, 1);
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style lang="less" scoped></style>
