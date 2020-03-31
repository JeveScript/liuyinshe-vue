<template>
  <div class="page-content">
    <router-link to="/manager/create" >
        <el-button
          type="primary">添加管理员</el-button>
      </router-link>
    <el-table
      :data="managerArr"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="名称">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机号码">
      </el-table-column>
      <el-table-column
        prop="statuss"
        label="权限">
      </el-table-column>
      <el-table-column
        prop="created_at"
        label="时间">
      </el-table-column>
      <el-table-column label="操作">
      <template slot-scope="scope">
        <router-link :to="'/manager/Edit/' + scope.row.id" >
        <el-button
          size="mini"
          type="primary">编辑</el-button>
        </router-link>
        <el-button
          size="mini"
          type="danger"
          style="margin-left:10px;"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>
</template>
<script>
import managerAxios from '@/global/service/manager.js'
export default {
  data () {
    return {
      managerArr: []
    }
  },
  created () {
    managerAxios.all().then(res => {
      this.managerArr = res.map(data => {
        data.statuss = data.status === 0 ? '管理' : '前台'
        return data
      })
    })
  },
  methods: {
    handleDelete (index, data) {
      managerAxios.del(data.id).then(res => {
        this.$message({
          message: '管理员删除成功',
          type: 'success'
        })
        this.managerArr.splice(index, 1)
      })
    }
  }
}
</script>
