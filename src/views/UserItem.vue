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
              <el-form-item label="状态" prop="status" style="width:460px;">
                {{ formData.status == 1 ? '在学' : '休假'}}
              </el-form-item>
              <el-form-item label="学校" prop="school" style="width:460px;">
                {{ formData.school ? formData.school : "尚未填写"}}
              </el-form-item>
              <el-form-item label="居住地址" prop="site" style="width:460px;">
                {{ formData.site ? formData.site : '尚未填写'}}
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="用户班级" name="userClass">
          <div class="table-secton mb-20">
            <h3>所报班级</h3>
            <el-table
              :data="classDatas"
              class="mb-20"
              style="width: 100%"
              height="600"
              border
            >
              <el-table-column prop="name" label="班级名称" />
              <el-table-column prop="start_at" label="开班时间" />
              <el-table-column prop="end_at" label="结束时间" />
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="消费记录" name="userPayment">
          <div class="payment-section">
            <h3>消费记录</h3>
            <el-table
              class="mb-20"
              :data="paymentDatas"
              style="width: 100%"
              height="600"
              border
            >
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
        <el-tab-pane label="用户充值" name="userDeposit">
          <div class="user-deposit" style="width:460px;">
            <h3>用户充值</h3>
            <el-form
              label-position="left"
              label-width="80px"
              :model="userDeposit"
            >
              <el-form-item label="充值金额" :hide-required-asterisk="true">
                <el-input
                  v-model="userDeposit.price"
                  placeholder="请输入充值金额，默认单位元"
                ></el-input>
              </el-form-item>
              <el-form-item label="充值备注" hide-required-asterisk="true">
                <el-input
                  type="textarea"
                  v-model="userDeposit.remark"
                  placeholder="请输入此次充值备注"
                  resize="none"
                ></el-input>
              </el-form-item>
            </el-form>
            <el-button type="warning" @click="Deposit">确认充值</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="用户消费" name="userPurchase">
          <div class="user-purchase" style="width:460px;">
            <h3>用户消费</h3>
            <el-form
              label-position="left"
              label-width="80px"
              :model="userPurchase"
            >
              <el-form-item label="消费金额" :hide-required-asterisk="true">
                <el-input
                  v-model="userPurchase.price"
                  placeholder="请输入消费金额，默认单位元"
                ></el-input>
              </el-form-item>
              <el-form-item label="消费备注" hide-required-asterisk="true">
                <el-input
                  type="textarea"
                  v-model="userPurchase.remark"
                  placeholder="请输入此次消费备注"
                  resize="none"
                ></el-input>
              </el-form-item>
            </el-form>
            <el-button type="danger" @click="purchase">确认消费</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script type="text/javascript">
import Breadcrumb from "@/components/BasicBreadcrumb.vue";
import userService from "@/global/service/user.js";
import paymentService from "@/global/service/payment.js";

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
        sms_phone: "",
        status:'',
        site:'',
        school:'',
      },
      userDeposit: {
        price: "",
        remark: ""
      },
      userPurchase: {
        price: "",
        remark: ""
      },
      classDatas: [],
      paymentDatas: []
    };
  },
  created() {
    let id = this.$route.params.id;
    userService.show(id).then(res => {
      let userInfo = res.user;
      this.classDatas = res.class;
      this.paymentDatas = res.payments;
      this.formData = userInfo;
    });
  },
  methods: {
    Deposit: function() {
      let userDeposit = this.userDeposit;
      if (isNaN(userDeposit.price)) {
        return this.$message("金额必须为数字");
      }
      if (userDeposit.price < 0) {
        return this.$message("金额必须为正数");
      }
      if (userDeposit.price && userDeposit.remark) {
        let id = this.$route.params.id;
        let data = {
          status: 1,
          user_id: id,
          total: userDeposit.price,
          remark: userDeposit.remark
        };
        paymentService
          .create(data)
          .then(() => {
            this.$message("充值成功");
            this.userDeposit.remark = "";
            this.userDeposit.price = "";
          })
          .catch(() => {
            this.$message("服务器错误");
          });
      } else {
        this.$message("两者是必填项，请输入");
      }
    },
    purchase: function() {
      let userPurchase = this.userPurchase;
      if (isNaN(userPurchase.price)) {
        return this.$message("金额必须为数字");
      }
      if (userPurchase.price < 0) {
        return this.$message("金额必须为正数");
      }
      if (userPurchase.price && userPurchase.remark) {
        let id = this.$route.params.id;
        let data = {
          status: 2,
          user_id: id,
          total: -userPurchase.price,
          remark: userPurchase.remark
        };
        paymentService
          .create(data)
          .then(() => {
            this.$message("消费成功");
            this.userPurchase.remark = "";
            this.userPurchase.price = "";
          })
          .catch(() => {
            this.$message("服务器错误");
          });
      } else {
        this.$message("两者是必填项，请输入");
      }
    }
  },
  components: {
    "v-breadcrumb": Breadcrumb
  }
};
</script>

<style type="text/css" lang="less" scoped></style>
