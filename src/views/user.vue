<template>
<div class="page-content">
  <router-link to="/user/create">
    <el-button
          type="primary">添加学员</el-button>
  </router-link>
  <div style="margin:20px 0;">
    <el-input style="width:200px;" v-model="phone" placeholder="请输入学生手机号码"></el-input>
     <el-button
     style="margin-left: 30px;"
      size="mini"
      @click="getPhone"
      type="primary">查询</el-button>
    <el-button type="danger"
      style="margin-left: 30px;"
      @click="clear"
      size="mini">清除</el-button>
  </div>
  <el-table
    :data="userArr"
    style="width: 100%;margin-bottom:20px;">
    <el-table-column
      prop="id"
      label="ID"
      width="80px;">
    </el-table-column>
    <el-table-column
      prop="phone"
      label="手机号码"
       width="130px;">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="120px;">
    </el-table-column>
    <el-table-column
      prop="sexs"
      label="性别"
      width="80px;">
    </el-table-column>
    <el-table-column
      prop="sms_name"
      label="紧急联系人"
       width="120px;">
    </el-table-column>
    <el-table-column
      prop="sms_phone"
      label="紧急联系方式"
      width="130px;">
    </el-table-column>
    <el-table-column
      prop="integral"
      label="用户积分"
       width="120px;">
    </el-table-column>
    <el-table-column
      prop="balance"
      label="用户余额">
    </el-table-column>
    <el-table-column label="操作"
    width="120px;">
      <template slot-scope="scope">
        <el-tag v-if="scope.row.status == 2">退学</el-tag>
        <el-tag v-if="scope.row.status == 1" type="danger">在校</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <router-link :to="'/user/Edit/' + scope.row.id" >
        <el-button
          size="mini"
          type="text">详情</el-button>
        </router-link>
        <el-divider v-if="scope.row.status == 1" direction="vertical"></el-divider>
        <el-button
          size="mini"
          type="text"
          v-if="scope.row.status == 1"
          @click="handleDelete(scope.$index, scope.row, 2)">退学</el-button>
           <el-divider  v-if="scope.row.status == 2" direction="vertical"></el-divider>
        <el-button
        size="mini"
        type="text"
        v-if="scope.row.status == 2"
        @click="handleDelete(scope.$index, scope.row, 1)">重学</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    background
    layout="prev, pager, next"
    @current-change="current"
    :total="total">
  </el-pagination>
</div>
</template>
<script>
import userAxios from '@/global/service/user.js'
export default {
  data () {
    return {
      userArr: [],
      phone: '',
      newPhone: '',
      total: 0,
      pageSize: 10,
      currentPage: 1
    }
  },
  created () {
    this.getDate()
  },
  methods: {
    clear () {
      this.phone = ''
      this.newPhone = ''
      this.currentPage = 1
      this.getDate()
    },
    current (index) {
      this.currentPage = index
      this.getDate()
    },
    getPhone () {
      if (this.phone) {
        this.newPhone = this.phone
        this.getDate()
      } else {
        this.$message({
          message: '请输入手机号码',
          type: 'warning'
        })
      }
    },
    handleDelete (index, data, status) {
      let text = status === 1 ? '确定该学生是否重学' : '确定该学生是否退学?'
      this.$confirm(text, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        userAxios.del(data.id, { status }).then(res => {
          this.userArr[index].status = status
        })
      }).catch(() => {})
    },
    getDate () {
      let data = {
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }
      if (this.newPhone) {
        data.phone = this.newPhone
        data.currentPage = 1
      }
      userAxios.all(data).then(res => {
        this.total = res.total[0].total
        this.userArr = res.data.map(data => {
          data.sexs = data.sex === 1 ? '男' : '女'
          if (!data.integral) data.integral = 0
          if (!data.balance)data.balance = 0
          return data
        })
      })
    }
  }
}
</script>
