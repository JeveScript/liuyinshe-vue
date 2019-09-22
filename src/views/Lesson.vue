<template>
  <div class="page-container">
    <v-breadcrumb />
    <div class="page-content" v-loading="loading">
      <h3>课时信息</h3>
      <el-form inline label-position="left" label-width="80px">
        <el-form-item label="开始时间" style="width:240px;">
          {{ lesson.date }} {{ lesson.start_time }}
        </el-form-item>
        <el-form-item label="结束时间" style="width:240px;">
          {{ lesson.date }} {{ lesson.end_time }}
        </el-form-item>
        <el-form-item label="课时状态" style="width:280px;">
          <el-select
            v-model="lesson.status"
            @change="handleChangeStatus"
            placeholder="课时状态"
          >
            <el-option :label="'进行中'" :value="0"></el-option>
            <el-option :label="'取消'" :value="1"></el-option>
            <el-option :label="'已完成'" :value="2"></el-option>
            <!-- <el-option :label="'已结束'" :value="1"></el-option> -->
          </el-select>
        </el-form-item>
      </el-form>

      <h3>报名学员</h3>
      <el-table
        :data="users"
        @selection-change="handleSelectionChange"
        style="width: 100%"
        class="mb-20"
      >
        <el-table-column
          type="selection"
          :selectable="row => !row.status"
          width="55"
        >
        </el-table-column>
        <el-table-column prop="name" label="学员名称"></el-table-column>
        <el-table-column label="点名情况">
          <template slot-scope="scope">
            <el-tag v-if="!scope.row.status" type="info">未点名</el-tag>
            <el-tag v-if="scope.row.status === 2" type="">请假</el-tag>
            <el-tag v-if="scope.row.status === 1" type="success">已点名</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="finish_at" label="时间"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="informNote(scope.row)"
              >通知上课</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div>
        <el-button
          type="primary"
          @click="handleSubmit"
          :disabled="!selectUserIds.length"
          >点名</el-button
        >
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import Breadcrumb from "@/components/BasicBreadcrumb.vue";
import lessonService from "@/global/service/lesson.js";
import noteService from "@/global/service/note.js";
import dateFunction from "@/utils/authcode.js";
export default {
  data() {
    return {
      loading: true,
      users: [],
      selectUserIds: [],
      lesson: {
        status: ""
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    informNote(row) {
      let lesson = this.lesson;
      let time = lesson.start_time;
      let date = lesson.date;
      if (!time || !date) {
        return this.$message({
          message: "请先选择课程时间"
        });
      }
      let params = {
        noteJson: {
          name: row.name,
          className: lesson.className,
          date: date,
          time: time
        },
        userPhone: row.phone,
        user_id: row.id,
        template_code: "SMS_174277611",
        content: `亲爱的${row.name}同学，你的报名的 ${lesson.className} 于 ${date} ${time} 的课时即将上课，期待您准时到来。`,
        type: "通知上课"
      };
      noteService.sendNote(params).then(res => {
        this.$message({
          message: "发送成功",
          type: "success"
        });
      });
    },
    getData() {
      let id = this.$route.params.id;
      lessonService
        .list(id)
        .then(res => {
          this.users = res.users;
          this.lesson = res.lesson;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleChangeStatus() {
      let id = this.$route.params.id;
      lessonService
        .status(id, {
          status: this.lesson.status
        })
        .then(res => {
          if (res.code === 200) {
            this.$message.success("成功修改课时状态！");
          }
        });
    },
    handleSelectionChange(row) {
      this.selectUserIds = row
        .filter(data => !data.status)
        .map(data => data.id);
    },
    handleSubmit: async function() {
      let id = this.$route.params.id;
      let selectUserIds = this.selectUserIds;
      if (!selectUserIds.length) {
        this.$message.error("没有选择的学员");
        return;
      }
      try {
        selectUserIds.forEach(async user_id => {
          await lessonService.callnow(id, { user_id });
        });
        this.handleResetUsers();
      } catch (e) {
        console.log(e);
      }
    },
    handleResetUsers() {
      this.users.forEach(data => {
        if (this.selectUserIds.includes(data.id)) {
          data.status = 1;
          data.finish_at = new Date().toJSON();
        }
      });
      this.selectUserIds = [];
    }
  },
  components: {
    "v-breadcrumb": Breadcrumb
  }
};
</script>

<style type="text/css" lang="less" scoped></style>
