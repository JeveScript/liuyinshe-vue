<template>
  <div class="page-container">
    <v-breadcrumb />
    <div class="page-content" v-loading="loading">
      <el-tabs v-model="activeTabName">
        <el-tab-pane label="用户信息" name="userInfo">
          <div class="userInfo-section mb-20">
            <el-form ref="userForm" label-position="left" label-width="160px">
              <h3>学员信息</h3>
              <el-form-item label="姓名" prop="sex" style="width:460px;">
                {{ formData.name }}
              </el-form-item>
              <el-form-item label="性别" prop="sex" style="width:460px;">
                {{ formData.sex === 1 ? "男" : "女" }}
              </el-form-item>
              <el-form-item label="生日" prop="birthday" style="width:460px;">
                {{ formData.birthday }}
              </el-form-item>
              <el-form-item label="手机号" prop="phone" style="width:460px;">
                {{ formData.phone }}
              </el-form-item>
              <el-form-item
                label="紧急联系人姓名"
                prop="sms_name"
                style="width:460px;"
              >
                {{ formData.sms_name }}
              </el-form-item>
              <el-form-item
                label="紧急联系人电话"
                prop="sms_phone"
                style="width:460px;"
              >
                {{ formData.sms_phone }}
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="用户班级" name="userClass">
          <div class="table-secton mb-20">
            <h3>所报班级</h3>
            <el-table :data="classDatas" class="mb-20" style="width: 100%">
              <el-table-column prop="name" label="班级名称" />
              <el-table-column prop="start_at" label="开班时间" />
              <el-table-column prop="end_at" label="结束时间" />
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="用户消费" name="userPayment">
          <div class="payment-section">
            <h3>消费记录</h3>
            <el-table class="mb-20" :data="paymentDatas" style="width: 100%">
              <el-table-column prop="created_at" label="时间">
              </el-table-column>
              <el-table-column prop="total" label="金额"></el-table-column>
              <el-table-column label="类型">
                <template slot-scope="scope">
                  <el-tag :type="scope.row.status === 1 ? 'success' : ''">
                    {{ scope.row.status === 1 ? "充值" : "消费" }}</el-tag
                  >
                </template>
              </el-table-column>
              <el-table-column prop="remark" label="备注"></el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script type="text/javascript">
import Breadcrumb from "@/components/BasicBreadcrumb.vue";
import userService from "@/global/service/user.js";

export default {
  data() {
    return {
      loading: false,
      activeTabName: "userInfo",
      formData: {
        name: "",
        phone: "",
        sex: "",
        birthday: "",
        sms_name: "",
        sms_phone: ""
      },
      classDatas: [],
      paymentDatas: []
    };
  },
  created() {
    let id = this.$route.params.id;
    userService.show(id).then(res => {
      let userInfo = res.data.user;
      this.classDatas = res.data.class;
      this.paymentDatas = res.data.payments;
      this.formData = userInfo;
    });
  },
  methods: {},
  components: {
    "v-breadcrumb": Breadcrumb
  }
};
</script>

<style type="text/css" lang="less" scoped></style>
