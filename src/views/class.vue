<template>
  <div class="page-content">
    <div class="class-date">
      <el-date-picker
        v-model="month"
        type="month"
        placeholder="选择月">
      </el-date-picker>
      <el-button type="primary" style="margin-left:30px" @click="getMonth">查询</el-button>
    </div>
    <div class="class-container" style="margin-top: 30px">
      <div class="class-list">
        <div v-for="item in dayQuantity" :key="item.day" :class="[{'class-item ': true}, {'active': item.status}]" @click="openClass(item)">
          <p>{{item.day}}/{{item.month}}</p>
          <p>周{{item.week}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import classAxios from '@/global/service/class.js'
export default {
  data () {
    return {
      dayQuantity: [],
      month: null
    }
  },
  created () {
    var date = new Date()
    this.month = date
    this.getMonth()
  },
  methods: {
    getMonth () {
      let date = this.month
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var quantity = new Date(year, month, 0).getDate()
      let dateArr = []
      let weekArr = ['日', '一', '二', '三', '四', '五', '六']
      for (let i = 1; i <= quantity; i++) {
        let index = new Date(year, month - 1, i).getDay()
        dateArr.push({
          day: i,
          year,
          month,
          week: weekArr[index],
          start_at: new Date(year, month - 1, i),
          status: false
        })
      }
      this.dayQuantity = dateArr
      let data = {
        thisYear: year,
        thisMonth: month
      }
      classAxios.all((data)).then(res => {
        res.forEach(item => {
          let time = new Date(item.start_at).getDate()
          this.dayQuantity[time - 1].status = true
          this.dayQuantity[time - 1].id = item.id
        })
      })
    },
    openClass (item) {
      let desc = '是否开启' + (item.year) + '/' + (item.month) + '/' + (item.day) + '课程?'
      if (item.status) {
        this.$router.push({ path: '/class/details/' + item.id })
      } else {
        this.$confirm(desc, '开启课程', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'success'
        }).then(() => {
          classAxios.add({ start_at: item.start_at }).then((res) => {
            this.dayQuantity[item.day - 1].status = true
            this.dayQuantity[item.day - 1].id = res
          })
        }).catch(() => {

        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
.class-list{
  display: flex;
  width: 100%;
  flex-wrap:wrap;
}
.class-item{
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100px;;
  height: 100px;;
  text-align: center;
  border: 1px solid #DCDFE6;
  margin: 3px;
  border-radius: 3px;
  font-size: 24px;
  counter-reset: #333;
}
.class-item.active{
  background-color: #409EFF;
  color: #fff;
}
</style>
