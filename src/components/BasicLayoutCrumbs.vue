<template>
    <div class="crumbs-container">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in crumbs" :key="item.to" :to="{ path: item.to }">{{item.title}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
</template>
<script>
import DataStore from '@/global/storage/index.js'
export default {
  data () {
    return {
      crumbs: []
    }
  },
  watch: {
    '$route': 'getRouter'
  },
  created () {
    this.getRouter()
    this.jurisdiction()
  },
  methods: {
    jurisdiction () {
      let route = this.$route
      let status = DataStore.getManagerStatus()
      if (route.meta && route.meta.jurisdiction && status !== 0) this.$router.replace({ name: 'homepage' })
    },
    getRouter () {
      let crumbs = []
      this.$route.matched.forEach(data => {
        if (data.meta && data.meta.breadcrumb) {
          crumbs.push({
            title: data.meta.breadcrumb.title,
            to: data.path
          })
        }
      })
      this.crumbs = crumbs
    }
  }
}
</script>
<style lang="less">
  .crumbs-container{
    background-color: #fff;
    width: 100%;
    padding: 16px 32px;
  }
</style>
