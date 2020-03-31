<template>
<div class="page-content">
  <router-link to="/teacher/create">
    <el-button type="primary">添加老师</el-button>
  </router-link>
    <template>
      <el-table
        :data="teacherArr"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="ID"
          width="160px">
        </el-table-column>
        <el-table-column
          prop="address"
          label="头像">
          <template slot-scope='scope'>
            <el-image
              style='width: 50px; height: 50px'
              :src='scope.row.image'>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号码">
        </el-table-column>
        <el-table-column
          label="描述">
          <template slot-scope="scope"><article v-html="scope.row.desc"></article></template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <router-link :to="'/teacher/Edit/' + scope.row.id" >
             <el-button
              size="mini"
              @click="handleEdit(scope.row)">详情</el-button>
            </router-link>
            <el-button
              size="mini"
              type="danger"
               style="margin-left:10px;"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>
<script>
import teacherService from '@/global/service/teacher.js'
export default {
  data () {
    return {
      teacherArr: []
    }
  },
  created () {
    teacherService.all().then(res => {
      this.teacherArr = res
    })
  },
  methods: {
    handleEdit (row) {
    },
    handleDelete (index, row) {
      teacherService.del(row.id).then(res => {
        this.teacherArr.splice(index, 1)
      })
    }
  }
}
</script>
