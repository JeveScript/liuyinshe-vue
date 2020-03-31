<template>
  <div class="header-section">
    <div class="icon-section">
      <i :class="isCollapse ? 'el-icon-s-unfold' :'el-icon-s-fold'" @click="switchover" />
    </div>
    <div class="manager-section">
      <div class="bar-info-container" style="width:auto;">
        <i class="el-icon-question"></i>
      </div>
      <el-dropdown style="height: 100%;" @command="handleMenu">
        <div class="bar-info-container">
          <i class="el-icon-user-solid userInfo-avatar"></i>
          <span class="userInfo-name">{{ name }}</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-video-pause" command="secede"
            >退出</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import DataStore from '@/global/storage/index.js'

export default {
  data () {
    return {
      name: null
    }
  },
  props: {
    isCollapse: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    '$route': 'getName'
  },
  created () {
    this.getName()
  },
  methods: {
    getName  () {
      let name = DataStore.getManagerName()
      if (!name) {
        return this.$router.replace({ name: 'login' })
      }
      this.name = name
    },
    switchover () {
      this.$emit('update:isCollapse', (!this.isCollapse))
    },
    handleMenu (value) {
      if (value === 'secede') {
        DataStore.clear()
        // return this.$router.replace({ name: 'login' })
      }
    }
  }
}
</script>
<style lang="less" scoped>
.header-section{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}
.icon-section{
  font-size: 24px;
}
.manager-section{
  display: flex;
  align-items: center;
}
.bar-info-container {
  display: flex;
  align-items: center;
  height: 100%;
  transition: all 0.2s ease;
  cursor: pointer;
  &:hover {
    background-color: #ecf5ff;
  }
  .userInfo-name {
    font-size: 14px;
    vertical-align: middle;
  }
  .userInfo-avatar {
    display: inline-block;
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    background-color: #ccc;
    border-radius: 50%;
    outline: none;
    margin: 0 10px;
  }
}
</style>
