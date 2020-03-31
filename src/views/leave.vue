<template>
<div class="page-content">
  <el-table
    :data="leaveArr"
    style="width: 100%">
    <el-table-column
      prop="user_name"
      label="学生">
    </el-table-column>
    <el-table-column
      prop="user_phone"
      label="联系方式">
    </el-table-column>
    <el-table-column
      prop="class_start_at"
      label="课程日期">
    </el-table-column>
    <el-table-column
      prop="lesson_start_at"
      label="上课时间">
    </el-table-column>
     <el-table-column
      prop="lesson_end_at"
      label="下课时间">
    </el-table-column>
     <el-table-column
      prop="teacher_name"
      label="授课老师">
    </el-table-column>
    <el-table-column
    label="操作">
      <template slot-scope="scope">
        <el-button
          type="text"
          @click="handleEdit(scope.$index, scope.row)">批准</el-button>
          <el-divider direction="vertical"></el-divider>
        <el-button
          type="text"
          style="color: #f56c6c;"
          @click="handleDelete(scope.$index, scope.row)">拒绝</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>
<script>
import leaveAxios from '@/global/service/leave.js'
export default {
  data () {
    return {
      leaveArr: []
    }
  },
  created () {
    leaveAxios.all().then(res => {
      this.leaveArr = res
    })
  },
  methods: {
    handleEdit (index, row) {
      const id = row.id
      const status = 1
      this.$confirm('确认批准？')
        .then(_ => {
          leaveAxios.edit({ leave_id: id, status }).then(() => {
            this.leaveArr.splice(index, 1)
          })
        })
        .catch(_ => {})
    },
    handleDelete (index, row) {
      const id = row.id
      const status = 2
      this.$confirm('确认拒绝？')
        .then(_ => {
          leaveAxios.edit({ leave_id: id, status }).then(() => {
            this.leaveArr.splice(index, 1)
          })
        })
        .catch(_ => {})
    }
  }
}
</script>
