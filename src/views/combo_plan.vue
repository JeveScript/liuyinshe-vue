<template>
<div class="page-content">
  <router-link to="/comboPlan/create">
  <el-button type="primary">添加套餐计划</el-button>
  </router-link>
  <el-table
      :data="combo_planArr"
      style="width: 100%">
      <el-table-column
        prop="plan_name"
        label="计划名称">
      </el-table-column>
      <el-table-column
        prop="combo_name"
        label="套餐名称">
      </el-table-column>
      <el-table-column
        prop="course_name"
        label="科目名称">
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="description"
        label="描述">
      </el-table-column>
      <el-table-column
        prop="created_at"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="created_at"
        label="操作">
        <template slot-scope="scope">
        <router-link :to="'/comboPlan/Edit/' + scope.row.id" >
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
import comboPlanAxios from '@/global/service/combo_plan.js'
export default {
  data () {
    return {
      combo_planArr: []
    }
  },
  created () {
    comboPlanAxios.all().then(res => {
      this.combo_planArr = res
    })
  },
  methods: {
    handleDelete (index, row) {
      comboPlanAxios.del(row.id).then(() => {
        this.combo_planArr.splice(index, 1)
      })
    }
  }
}
</script>
