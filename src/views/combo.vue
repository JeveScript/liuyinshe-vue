<template>
<div class="page-content">
  <router-link to="/combo/create">
    <el-button type="primary">添加套餐</el-button>
  </router-link>
  <el-table
      :data="comboArr"
      style="width: 100%">
      <el-table-column
        prop="combo_name"
        label="名称">
      </el-table-column>
      <el-table-column
        prop="course_name"
        label="科目"
        width="180">
      </el-table-column>
      <el-table-column
        prop="description"
        :show-overflow-tooltip="true"
        label="描述">
      </el-table-column>
      <el-table-column
        prop="created_at"
        label="创建时间">
      </el-table-column>
      <el-table-column label="操作">
      <template slot-scope="scope">
         <router-link :to="'/combo/Edit/' + scope.row.id" >
          <el-button
            size="mini">编辑</el-button>
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
import comboAxios from '@/global/service/combo.js'
export default {
  data () {
    return {
      comboArr: []
    }
  },
  created () {
    comboAxios.all().then(res => {
      this.comboArr = res
    })
  },
  methods: {
    handleDelete (index, row) {
      comboAxios.del(row.id).then(() => {
        this.comboArr.splice(index, 1)
      })
    }
  }
}
</script>
