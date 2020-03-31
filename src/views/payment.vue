<template>
<div class="page-content">
  <div class="header-section">
    <el-form :inline="true" :model="paymentParams" class="demo-form-inline">
      <el-form-item label="查询日期">
        <el-date-picker
          v-model="paymentParams.date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="带课老师">
        <el-select v-model="paymentParams.teacher_id" placeholder="带课老师">
          <el-option
            v-for="item in teacherArr"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学生">
        <el-select v-model="paymentParams.user_id" filterable placeholder="学生">
          <el-option
            v-for="item in userArr"
            :key="item.id"
            :label="item.name"
            :value="item.id">
            <span style="float: left">{{ item.name }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.phone }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item  label="状态">
        <template>
          <el-radio v-model="paymentParams.status" label="1">消费</el-radio>
          <el-radio v-model="paymentParams.status" label="2">充值</el-radio>
        </template>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="inquire">查询</el-button>
        <el-button type="primary" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="header-index">
      <p>
        充值: <el-tag style="margin-left:10px;">{{income}}</el-tag>
      </p>
      <p>
        消费: <el-tag style="margin-left:10px;" type="danger">{{expend}}</el-tag>
      </p>
    </div>
  </div>
  <el-table
    :data="paymentArr"
    style="width: 100%">
    <el-table-column
      prop="user_name"
      label="消费用户"
      width="100px;"
      >
    </el-table-column>
    <el-table-column
      prop="description"
      label="详情"
      :show-overflow-tooltip="true">
    </el-table-column>
    <el-table-column
      prop="total"
      label="消费金额"
      width="120px;">
    </el-table-column>
    <el-table-column
      prop="created_at"
      label="时间"
       width="200px;">
    </el-table-column>
    <el-table-column
      prop="teacher_name"
      label="老师"
       width="120px;">
    </el-table-column>
    <el-table-column
      prop="manager_name"
       width="120px;"
      label="操作者">
    </el-table-column>
    <el-table-column
      prop="status"
      label="消费状态"
      width="100px;">
      <template slot-scope="scope">
        <el-tag v-if="scope.row.status == 2">充值</el-tag>
        <el-tag v-if="scope.row.status == 1" type="danger">消费</el-tag>
      </template>
    </el-table-column>
  </el-table>
    <el-pagination
      style="margin-top:10px;"
      background
      layout="prev, pager, next"
      @current-change="editCurrentPage"
      :current-page="currentPage"
      :total="count"
      :page-count="total">
    </el-pagination>
</div>
</template>
<script>
import paymentAxios from '@/global/service/payment.js'
import teacherService from '@/global/service/teacher.js'
import transformDate from '@/utils/authcode.js'
import userAxios from '@/global/service/user.js'

export default {
  data () {
    return {
      count: 0,
      total: 0,
      pageSize: 10,
      currentPage: 1,
      paymentArr: [],
      userArr: [],
      paymentParams: {
        date: [],
        teacher_id: '',
        status: '',
        user_id: ''
      },
      teacherArr: [],
      income: 0,
      expend: 0
    }
  },
  created () {
    this.getData()
    teacherService.all().then(res => {
      this.teacherArr = res
    })
    userAxios.paymentUser().then(res => {
      this.userArr = res
    })
  },
  methods: {
    editCurrentPage (index) {
      this.currentPage = index
      this.getData()
    },
    reset () {
      this.paymentParams = {
        date: [],
        teacher_id: '',
        status: ''
      }
      this.pageSize = 10
      this.currentPage = 1
      this.getData()
    },
    inquire () {
      this.pageSize = 10
      this.currentPage = 1
      this.getData()
    },
    getData () {
      let data = {}
      if (this.paymentParams.date.length > 0) {
        data.start_at = transformDate.formatDate(this.paymentParams.date[0])
        data.end_at = transformDate.formatDate(this.paymentParams.date[1])
      }
      if (this.paymentParams.status) data.status = this.paymentParams.status
      if (this.paymentParams.teacher_id) data.teacher_id = this.paymentParams.teacher_id
      if (this.paymentParams.user_id) data.user_id = this.paymentParams.user_id

      data.pageSize = this.pageSize
      data.currentPage = this.currentPage
      paymentAxios.all(data).then(res => {
        this.paymentArr = res.paymentArr
        this.total = Math.ceil(res.total / 10)
        this.count = res.total
        this.income = res.income
        this.expend = res.expend
      })
    }
  }
}
</script>
<style lang="less" scoped>
.header-section{

  .header-index{
    display: flex;
    font-size: 14px;
    color: #606266;
    p{
      margin-right: 20px;
    }
  }
}
</style>
