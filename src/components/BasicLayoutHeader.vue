<template>
  <div class="header-section">
    <div class="header-hd">
      <div class="collapse-icon" @click="handleCollapse">
        <i :class="[collapse ? 'el-icon-s-unfold' : 'el-icon-s-fold']"></i>
      </div>
    </div>
    <div class="header-bd"></div>
    <div class="header-ft">
      <div class="bar-info-container">
        <i class="el-icon-question"></i>
      </div>
      <el-dropdown style="height: 100%;" @command="handleMenu">
        <div class="bar-info-container">
          <i class="el-icon-user-solid userInfo-avatar"></i>
          <span class="userInfo-name">{{ user_name }}</span>
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
import getStore from "@/global/storage/index.js";
export default {
  data() {
    return {
      user_name: ""
    };
  },
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  created: function() {
    let user_name = getStore.getUser_name();
    let token = getStore.getToken();
    if (!user_name || !token) {
      return this.$router.replace({ name: "AccountLogin" });
    }
    this.user_name = user_name;
  },
  methods: {
    handleCollapse() {
      this.$emit("update:collapse", !this.collapse);
    },
    handleMenu: function(value) {
      if (value == "secede") {
        getStore.storage.delete("token");
        getStore.storage.delete("user_name");
        getStore.storage.delete("user_id");
        getStore.storage.delete("user_status");
        return this.$router.replace({ name: "AccountLogin" });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.header-section {
  position: relative;
  height: 100%;
  display: flex;
  .header-bd {
    flex: 1;
  }
}

.header-hd,
.header-bd,
.header-ft {
  display: flex;
  align-items: center;
}

.header-hd {
  .collapse-icon {
    font-size: 22px;
    cursor: pointer;
  }
}

.bar-info-container {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 10px;
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
