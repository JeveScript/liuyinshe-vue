<template>
<el-container  class="h100">
  <el-aside :width="siderWidth"><Aside :isCollapse.sync="isCollapse" /></el-aside>
  <el-container>
    <el-header class="page-header" height="64px"><Headers  :isCollapse.sync="isCollapse"/></el-header>
    <el-main  class="page-mainer">
      <div class="page-container">
        <Crumbs/>
        <router-view/>
        <!-- <el-footer>Footer</el-footer> -->
      </div>
    </el-main>
  </el-container>
</el-container>

</template>
<script>
import Aside from './BasicLayoutAside'
import Headers from './BasicLayoutHeader'
import Crumbs from './BasicLayoutCrumbs'
export default {
  data () {
    return {
      isCollapse: true
    }
  },
  computed: {
    siderWidth () {
      let zhi = this.isCollapse ? '64px' : '256px'
      return zhi
    }
  },
  components: {
    Aside,
    Headers,
    Crumbs
  }
}
</script>
<style lang="less">
.h100 {
  height: 100vh;
  background-color: #f0f2f5;
}

.page-header {
  background-color: #fff;
  box-shadow: 0 2px 8px #f0f1f2;
  position: relative;
  z-index: 10;
  height: 64px;
}
.el-aside{
  height: 100%;
  background-color: #fff;
}
.aside-active{
  width: 56px;
}
.page-sider {
  position: relative;
  background-color: #fff;
  box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.05);
  .el-menu {
    border-right: none;
  }
}

.page-mainer {
  padding: 0 !important;
}
.page-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.page-content {
  flex: 1;
  margin: 16px;
  padding: 16px;
  margin-bottom: 0;
  background-color: #fff;
  h3 {
    font-size: 16px;
    margin-top: 0;
    margin-bottom: 16px;
  }
}
</style>
