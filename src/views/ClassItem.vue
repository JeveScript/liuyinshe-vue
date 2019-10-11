<template>
  <div class="page-container">
    <v-breadcrumb />
    <div class="page-content" v-loading="loading">
      <el-card class="box-card mb-20">
        <div slot="header" class="clearfix mb-20">
          <span>报名学员</span>
          <div style="float: right;">
            <el-select
              remote
              filterable
              v-model="user_id"
              style="margin-right: 20px;"
              :remote-method="remoteMethod"
              :loading="searchLoading"
              no-data-text="查无此用户"
              placeholder="请输入姓名或手机号"
            >
              <el-option
                v-for="item in searchUsers"
                :key="item.value"
                :label="item.name"
                :value="item.id"
                :disabled="hasSelectIds.includes(item.id)"
              >
              </el-option>
            </el-select>
            <el-button type="primary" plain @click="handleAddUser"
              >添加</el-button
            >
          </div>
        </div>
        <el-table
          :data="users"
          class="mb-20"
          style="width: 100%"
          height="350"
          border
        >
          <el-table-column prop="name" label="姓名" />
          <el-table-column prop="phone" label="手机" />
          <el-table-column prop="created_at" label="加入时间" />
        </el-table>
      </el-card>

      <el-row :gutter="20">
        <el-col :lg="12">
          <el-card class="box-card mb-20">
            <div slot="header" class="clearfix">
              <span>班级信息</span>
            </div>
            <el-form
              :model="formData"
              ref="classForm"
              label-position="left"
              label-width="160px"
            >
              <el-form-item label="班级名称" prop="name" style="width:460px;">
                {{ formData.name }}
              </el-form-item>
              <el-form-item label="课程" prop="course_id" style="width:460px;">
                {{ formData.course_name }}
              </el-form-item>
              <el-form-item
                label="带课老师"
                prop="teacher_name"
                style="width:460px;"
              >
                {{ formData.teacher_name }}
              </el-form-item>
              <el-form-item
                label="手机号码"
                prop="teacher_phone"
                style="width:460px;"
              >
                {{ formData.teacher_phone }}
              </el-form-item>
              <el-form-item label="状态" prop="status" style="width:460px;">
                {{
                  formData.status
                    ? formData.status === 1
                      ? "进行中"
                      : "已结束"
                    : "未开启"
                }}
              </el-form-item>
              <el-form-item
                label="开始时间"
                prop="start_at"
                style="width:460px;"
              >
                {{ formData.start_at }}
              </el-form-item>
              <el-form-item label="结束时间" prop="end_at" style="width:460px;">
                {{ formData.end_at }}
              </el-form-item>
              <el-form-item
                label="课程描述"
                prop="description"
                style="width:460px;"
              >
                {{ formData.description }}
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
        <el-col :lg="12">
          <el-card class="box-card mb-20">
            <div slot="header" class="clearfix">
              <span>课时信息</span>
              <span style="float: right; padding: 3px 0" type="text"
                >课时: {{ lessons.length }}节</span
              >
            </div>
            <el-table :data="lessons" class="mb-20" style="width: 100%">
              <el-table-column prop="date" label="日期">
                <template slot-scope="scope">
                  {{ scope.row.date || "-" }}
                </template>
              </el-table-column>
              <el-table-column prop="start_time" label="开始时间">
                <template slot-scope="scope">
                  {{ scope.row.start_time || "-" }}
                </template>
              </el-table-column>
              <el-table-column prop="end_time" label="结束时间">
                <template slot-scope="scope">
                  {{ scope.row.end_time || "-" }}
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="text" @click="handleLink(scope.row)"
                    >去点名</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script type="text/javascript">
import Breadcrumb from "@/components/BasicBreadcrumb.vue";
import classService from "@/global/service/class.js";
import userService from "@/global/service/user.js";
export default {
  data() {
    return {
      disabled: false,
      loading: false,
      searchLoading: false,
      courses: [],
      lessons: [],
      users: [],
      formData: {},
      user_id: "",
      searchUsers: []
    };
  },
  computed: {
    hasSelectIds() {
      return this.users.map(data => data.id);
    }
  },
  created() {
    this.getClassInfo();
  },
  methods: {
    getClassInfo() {
      let id = this.$route.params.id;
      classService.show(id).then(res => {
        this.formData = res.class;
        this.lessons = res.lessons;
        this.users = res.users;
      });
    },
    linkClassEdit() {
      let id = this.$route.params.id;
      this.$router.push({ name: "ClassEdit", params: { id } });
    },
    remoteMethod(value) {
      let isName = isNaN(value);
      let params = {};
      if (isName) {
        params.name = value;
      } else {
        params.phone = value;
      }
      this.searchLoading = true;
      userService
        .list(params)
        .then(res => {
          this.searchUsers = res.datas;
        })
        .finally(() => {
          this.searchLoading = false;
        });
    },
    handleAddUser() {
      let id = this.$route.params.id;
      let user_id = this.user_id;
      if (!user_id) {
        this.$message.error("请先选择用户！");
        return;
      }
      this.loading = true;
      classService
        .addUser(id, { user_id })
        .then(res => {
          this.user_id = "";
          this.$message.success("添加成功！");
          let user = this.searchUsers.find(data => data.id === user_id);
          this.users.push(user);
        })
        .catch(err => {
          this.$message.error(res.message);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleLink(row) {
      this.$router.push({ name: "Lesson", params: { id: row.id } });
    }
  },
  components: {
    "v-breadcrumb": Breadcrumb
  }
};
</script>

<style type="text/css" lang="less" scoped></style>
