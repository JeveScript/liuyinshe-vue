<template>
  <div class="page-container">
    <v-breadcrumb></v-breadcrumb>
    <div class="page-content">
      <el-form label-position="left" label-width="160px">
        <el-form-item label="老师名称" style="width:460px">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="联系方式" style="width:460px">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="简介" style="width:460px">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入简介"
            resize="none"
          />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import Breadcrumb from "@/components/BasicBreadcrumb.vue";
export default {
  components: {
    "v-breadcrumb": Breadcrumb
  }
};
</script>
