<template>
  <div class="asid-container">
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" :router="true" :collapse="isCollapse">
      <el-menu-item v-for="(item,index) in routerArr" :key="index" :index="item.path">
        <i :class="item.nav.icon"></i>
        <span slot="title">{{item.nav.title}}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
import router from '@/router/router.js'
import DataStore from '@/global/storage/index.js'
export default {
  data () {
    return {
      routerArr: []
    }
  },
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  created: function () {
    this.getAside()
  },
  methods: {
    getAside: function () {
      let status = DataStore.getManagerStatus()
      let data = router[1].children
      let routerArr = []
      data.forEach(item => {
        let zhi = {}
        if (item.meta && item.meta.jurisdiction && status !== 0) return
        if (item.path) zhi.path = item.path
        if (item.meta && item.meta.nav) zhi.nav = item.meta.nav
        if (zhi.nav) routerArr.push(zhi)
      })
      this.routerArr = routerArr
    }
  }
}
</script>
<style lang="less" scoped>
.asid-container{
  background-color: #fff;
}
</style>
