<template>
  <div class="page-container">
    <v-breadcrumb />
    <div class="page-content" v-loading="loading">
      <div class="mb-20">
        <el-tabs v-model="activeName">
          <el-tab-pane label="短信列表" name="1">
            <h3>短信列表</h3>
            <el-table :data="noteData" style="width: 100%">
              <el-table-column prop="name" label="姓名"> </el-table-column>
              <el-table-column prop="phone" label="手机"> </el-table-column>
              <el-table-column prop="content" label="短信"> </el-table-column>
              <el-table-column prop="type" label="类型"> </el-table-column>
              <el-table-column prop="state" label="状态">
                <template slot-scope="scope">
                  <el-tag v-if="scope.row.state == 0" type="success"
                    >发送成功</el-tag
                  >
                  <el-tag v-if="scope.row.state == 1" type="info"
                    >发送失败</el-tag
                  >
                </template>
              </el-table-column>
            </el-table>
            <div>
              <el-pagination
                v-if="notePagination.total > notePagination.pageSize"
                background
                layout="prev, pager, next"
                :current-page.sync="notePagination.currentPage"
                :page-size="notePagination.pageSize"
                :total="notePagination.total"
                @current-change="getNoteDate"
              >
              </el-pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane label="发送管理" name="2">
            <h3>发送管理</h3>

            <el-row :gutter="20" style="margin-bottom:30px;">
              <el-col :lg="6"
                ><el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>请假模版</span>
                    <el-button style="float: right; padding: 3px 0" type="text">
                      <el-radio v-model="radio" label="1"
                        >选择</el-radio
                      ></el-button
                    >
                  </div>
                  亲爱的某某同学，你的报名的某某课程于某月某日某时的课时请假申请已确认，请注意安排补课、调课时间，有问题可直接联系13400000000，谢谢。
                  <h5>请添加数据</h5>
                  <el-form
                    :model="leaveForm"
                    label-position="left"
                    status-icon
                    :rules="rules"
                    ref="leaveForm"
                    label-width="100px"
                    style="margin-top:10px; max-width:320px;"
                    class="demo-ruleForm"
                  >
                    <el-form-item label="请假日期" prop="date">
                      <el-date-picker
                        v-model="leaveForm.date"
                        type="date"
                        placeholder="选择日期"
                      >
                      </el-date-picker>
                    </el-form-item>
                    <el-form-item label="课程名称" prop="className">
                      <el-input
                        v-model="leaveForm.className"
                        placeholder="请输入班级名称"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="课程时间" prop="time">
                      <el-time-picker
                        v-model="leaveForm.time"
                        placeholder="任意时间点"
                      >
                      </el-time-picker>
                    </el-form-item>
                    <el-form-item label="联系号码" prop="phone">
                      <el-input v-model.number="leaveForm.phone"></el-input>
                    </el-form-item>
                  </el-form> </el-card
              ></el-col>
              <el-col :lg="6"><el-card class="box-card"></el-card></el-col>
              <el-col :lg="6"><el-card class="box-card"></el-card></el-col>
              <el-col :lg="6"><el-card class="box-card"></el-card></el-col>
            </el-row>
            <div>
              <el-form label-position="right" inline label-width="80px">
                <el-form-item label="姓名：">
                  <el-input v-model="formData.name" placeholder="请输入姓名" />
                </el-form-item>
                <el-form-item label="手机号">
                  <el-input
                    v-model="formData.phone"
                    placeholder="请输入手机号"
                  />
                </el-form-item>
                <el-form-item style="margin-left:30px;">
                  <el-button type="primary" @click="getUserData"
                    >查询</el-button
                  >
                  <el-button @click="handleReset">重置</el-button>
                </el-form-item>
              </el-form>
            </div>

            <el-table
              :data="
                userData.filter(
                  data =>
                    !search ||
                    data.name.toLowerCase().includes(search.toLowerCase())
                )
              "
              ref="multipleTable"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55"> </el-table-column>
              <el-table-column prop="name" label="姓名"> </el-table-column>
              <el-table-column prop="phone" label="电话"> </el-table-column>
              <el-table-column prop="sex" label="性别">
                <template slot-scope="scope">
                  <el-tag :type="scope.row.sex === 1 ? '' : 'success'">
                    {{ scope.row.sex === 1 ? "男" : "女" }}</el-tag
                  >
                </template>
              </el-table-column>
              <el-table-column prop="birthday" label="生日" />
              <el-table-column prop="sms_name" label="紧急联系人" />
              <el-table-column prop="sms_phone" label="紧急电话" />
              <el-table-column prop="balance" label="余额/元" />
              <el-table-column align="right">
                <template slot="header">
                  <el-input
                    v-model="search"
                    size="mini"
                    placeholder="输入姓名搜索"
                  />
                </template>
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="danger"
                    @click="sendNote(scope.$index, scope.row)"
                    >发送通知</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
            <div>
              <el-pagination
                v-if="pagination.total > pagination.pageSize"
                background
                layout="prev, pager, next"
                :current-page.sync="pagination.currentPage"
                :page-size="pagination.pageSize"
                :total="pagination.total"
                @current-change="getUserData"
              >
              </el-pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane label="角色管理" name="3">角色管理</el-tab-pane>
          <el-tab-pane label="定时任务补偿" name="4">定时任务补偿</el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import Breadcrumb from "@/components/BasicBreadcrumb.vue";
import userService from "@/global/service/user.js";
import noteService from "@/global/service/note.js";
import dateFunction from "@/utils/authcode.js";
export default {
  data() {
    return {
      loading: false,
      activeName: "2",
      loading: true,
      noteData: [],
      userData: [],
      pagination: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      },
      notePagination: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      },
      formData: {
        name: "",
        phone: ""
      },
      multipleSelection: [],
      search: "",
      radio: "",
      leaveForm: {
        date: "",
        time: new Date(2016, 9, 10, 18, 40),
        phone: "",
        className: ""
      },
      rules: {
        date: [{ required: true, message: "请输入日期", trigger: "blur" }],
        time: [{ required: true, message: "请输入时间", trigger: "blur" }],
        className: [
          { required: true, message: "请输入班级名称", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "目前只支持中国大陆的手机号码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.getUserData();
    this.getNoteDate();
    console.log(dateFunction);
  },
  methods: {
    getNoteDate() {
      let params = {
        current_page: this.notePagination.currentPage,
        page_size: this.notePagination.pageSize,
        name: this.formData.name,
        phone: this.formData.phone
      };
      noteService
        .showNote(params)
        .then(res => {
          this.noteData = res.datas;
          this.notePagination.pageSize = Number(res.notePagination.page_size);
          this.notePagination.currentPage = Number(
            res.notePagination.current_page
          );
          this.notePagination.total = Number(res.notePagination.total);
          console.log(this.notePagination, res.notePagination.total);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getUserData() {
      let params = {
        current_page: this.pagination.currentPage,
        page_size: this.pagination.pageSize,
        name: this.formData.name,
        phone: this.formData.phone
      };

      userService
        .list(params)
        .then(res => {
          this.userData = res.datas;
          this.pagination.pageSize = Number(res.pagination.page_size);
          this.pagination.currentPage = Number(res.pagination.current_page);
          this.pagination.total = Number(res.pagination.total);
          console.log(this.pagination);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleReset() {
      this.formData.name = "";
      this.formData.phone = "";
      this.pagination.currentPage = 1;
      this.getUserData();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    sendNote: function(index, row) {
      let indexs = this.radio;
      switch (Number(indexs)) {
        case 1:
          this.sendNoteLeave(row);
          break;
        case 2:
          break;
        default:
          this.$message.error("请选择消息模版");
      }
    },
    sendNoteLeave: function(row) {
      this.$refs.leaveForm.validate(valid => {
        if (valid) {
          let leaveForm = this.leaveForm;
          let time =
            new Date(leaveForm.time).getHours() +
            ":" +
            new Date(leaveForm.time).getMinutes();
          let date = dateFunction.formatDate(leaveForm.date);
          let params = {
            noteJson: {
              name: row.name,
              className: leaveForm.className,
              date: date,
              time: time,
              phone: leaveForm.phone
            },
            userPhone: row.phone,
            user_id: row.id,
            template_code: "SMS_173760644",
            content: `亲爱的${row.name}同学，你的报名的${leaveForm.className}课程于${date}-${time}的课时请假申请已确认，请注意安排补课、调课时间，有问题可直接联系${leaveForm.phone}，谢谢。`,
            type: "请假"
          };
          noteService.sendNote(params).then(res => {
            this.$message({
              message: "发送成功",
              type: "success"
            });
          });
        } else {
          this.$message.error("请填写模版内容");
        }
      });
    }
  },
  components: {
    "v-breadcrumb": Breadcrumb
  }
};
</script>

<style type="text/css" lang="less" scoped></style>
