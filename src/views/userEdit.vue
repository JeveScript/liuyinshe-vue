<template>
<div class="page-content">
  <el-tabs v-model="activeName">
    <el-tab-pane label="用户详情" name="1">
      <div class="user-section" style="max-width:500px">
        <h3>用户详情</h3>
        <el-form :label-position="labelPosition" :rules="rules" ref="rules"  label-width="100px" :model="user" >
        <el-form-item label="名字" prop="name">
          <el-input v-model.trim="user.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model.trim="user.phone"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio v-model.trim="user.sex" :label="1">男</el-radio>
          <el-radio v-model.trim="user.sex" :label="2">女</el-radio>
        </el-form-item>
        <el-form-item label="出生日期" prop="birthday">
          <el-date-picker
            v-model.trim="user.birthday"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="监护人名称" prop="sms_name">
          <el-input v-model.trim="user.sms_name"></el-input>
        </el-form-item>
        <el-form-item label="监护人电话" prop="sms_phone">
          <el-input v-model.trim="user.sms_phone"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model.trim="user.site"></el-input>
        </el-form-item>
        <el-form-item label="学校">
          <el-input v-model.trim="user.school"></el-input>
        </el-form-item>
        </el-form>
        <el-button type="primary" @click="editUser">编辑</el-button>
      </div>
    </el-tab-pane>
    <el-tab-pane label="积分管理" name="2">
      <h3>学员 {{user.name}} 剩余积分: {{user.integral ? user.integral : 0}}</h3>
      <div style="width:500px;">
        <el-form :model="userIntegral" label-position="left" ref="userIntegral" label-width="70px" class="demo-ruleForm">
          <el-form-item
            label="积分"
            prop="integral"
            :rules="[
              { required: true, message: '请输入有效数值', trigger: 'blur' },
              { type: 'number', message: '积分必须为数字值'}
            ]"
          >
            <el-input type="age" v-model.number="userIntegral.integral" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="integralEdit('add')">添加</el-button>
            <el-button @click="integralEdit('reduce')">删减</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-tab-pane>
    <el-tab-pane label="充值/消费" name="3">
      <h3>学员 {{user.name}} 余额: {{user.balance ? user.balance : 0}}</h3>
      <div style="width:500px;">
        <el-form :model="userTotal" label-position="left" ref="userTotal" label-width="70px" class="demo-ruleForm">
          <el-form-item
            label="金额"
            prop="total"
            :rules="[
              { required: true, message: '请输入有效数值', trigger: 'blur' },
              {
                pattern: /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/,
                message: '金额必须为数字值',
                trigger: 'blur'
              }
            ]"
          >
            <el-input type="age" v-model="userTotal.total" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="描述"
            prop="description"
            :rules="[
              { required: true, message: '请输入描述', trigger: 'blur' },
            ]"
          >
            <el-input
              :rows="3"
              placeholder="请输入内容"
              type="textarea"
              v-model="userTotal.description"
              resize="none"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="totalEdit('add')">添加</el-button>
            <el-button @click="totalEdit('reduce')">删减</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-tab-pane>
    <el-tab-pane label="套餐添加" name="4">
      <h3>套餐计划添加</h3>
      <div style="max-width:500px">
        <el-form :label-position="labelPosition" :rules="planRules" ref="planRules"  label-width="160px" :model="planData" >
          <el-form-item label="套餐计划" prop="plan_id">
            <el-cascader
            style="width:300px;"
            v-model="planData.plan_id"
            :options="combo_planArr">
            </el-cascader>
          </el-form-item>
          <el-form-item label="套餐计划价格" prop="plan_price">
            <el-input v-model.number="planData.plan_price"></el-input>
          </el-form-item>
          <el-form-item label="材料费" prop="extra_charge">
            <el-input v-model.number="planData.extra_charge"></el-input>
          </el-form-item>
          <el-form-item label="公开课/一对一总节数">
            <el-input v-model.number="planData.Class_index"></el-input>
          </el-form-item>
          <el-form-item label="完全一对一节数">
            <el-input v-model.number="planData.theOne_index"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input
            :rows="3"
            placeholder="请输入描述"
            type="textarea"
            resize="none"
            v-model="planData.description"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="planAdd">添加</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-tab-pane>
    <el-tab-pane label="套餐列表" name="5">
      <el-table
      :data="userPlanArr"
      style="width: 100%">
      <el-table-column
        prop="combo_name"
        label="套餐名称">
      </el-table-column>
      <el-table-column
        prop="combo_plan_name"
        label="计划名称">
      </el-table-column>
      <el-table-column
        prop="course_name"
        label="科目名称">
      </el-table-column>
      <el-table-column
        prop="created_at"
        label="购买时间">
      </el-table-column>
      <el-table-column
        prop="plan_price"
        label="套餐价格">
      </el-table-column>
      <el-table-column
        prop="extra_charge"
        label="材料费">
      </el-table-column>
      <el-table-column
        prop="Class_index"
        label="课程总节数">
      </el-table-column>
      <el-table-column
        prop="theOne_index"
        label="一对一节数">
      </el-table-column>
      <el-table-column
        prop="description"
        :show-overflow-tooltip="true"
        label="描述">
      </el-table-column>
      <el-table-column
        label="状态">
        <template slot-scope="scope">
          <el-tag v-show="!scope.row.status" type="success">进行中</el-tag>
          <el-tag v-show="scope.row.status == 1" type="info">已完结</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <router-link :to="'/user/plan/'+scope.row.id">
          <el-button
          size="mini">详情</el-button>
          </router-link>
        <el-button
          size="mini"
          type="danger"
          style="margin-left:10px;"
          v-show="!scope.row.status"
          @click="handleDelete(scope.$index, scope.row)">完结</el-button>
      </template>
      </el-table-column>
    </el-table>
    </el-tab-pane>
    <el-tab-pane label="消费列表" name="6">
      <el-table
        :data="paymentArr">
        <el-table-column
          prop="created_at"
          label="日期">
        </el-table-column>
        <el-table-column
          prop="total"
          label="金额">
        </el-table-column>
        <el-table-column
          prop="description"
          :show-overflow-tooltip="true"
          label="描述">
        </el-table-column>
      </el-table>
    </el-tab-pane>
  </el-tabs>
</div>
</template>
<script>
import userAxios from '@/global/service/user.js'
import transformDate from '@/utils/authcode.js'
import DataStore from '@/global/storage/index.js'

export default {
  data () {
    return {
      activeName: '1',
      userId: '',
      labelPosition: 'left',
      user: {
        name: '',
        phone: '',
        sex: '',
        birthday: '',
        sms_name: '',
        sms_phone: '',
        site: '',
        school: ''
      },
      userIntegral: {
        integral: null
      },
      rules: {
        name: [
          { required: true, message: '请输入学员名称', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入学员手机号码', trigger: 'blur' },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: '目前只支持中国大陆的手机号码',
            trigger: 'blur'
          }
        ],
        sex: [
          { required: true, message: '请选择学员性别', trigger: 'blur' }
        ],
        birthday: [
          { required: true, message: '请输入学员出生日期', trigger: 'blur' }
        ],
        sms_name: [
          { required: true, message: '请输入监护人姓名', trigger: 'blur' }
        ],
        sms_phone: [
          { required: true, message: '请输入监护人手机号码', trigger: 'blur' }
        ]
      },
      combo_planArr: [],
      planData: {
        plan_id: null,
        plan_price: null,
        extra_charge: null,
        Class_index: 0,
        theOne_index: 0,
        description: null
      },
      planRules: {
        plan_id: [
          { required: true, message: '请选择套餐计划', trigger: 'blur' }
        ],
        plan_price: [
          { required: true, message: '请输入套餐计划价格', trigger: 'blur' },
          { type: 'number', message: '套餐计划价格必须为数字值', trigger: 'blur' }
        ],
        extra_charge: [
          { required: true, message: '请输入材料费价格', trigger: 'blur' },
          { type: 'number', message: '材料费价格必须为数字值', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入描述', trigger: 'blur' }
        ]
      },
      userTotal: {
        total: null,
        description: null
      },
      userPlanArr: [],
      paymentArr: []
    }
  },
  created () {
    let id = this.userId = this.$route.params.id
    userAxios.show(id).then(res => {
      this.user = res.data
      this.paymentArr = res.paymentArr
    })
    userAxios.userAllPlan().then(res => {
      this.combo_planArr = res
    })
    this.getUserAllPlan()
  },
  methods: {
    handleDelete: function (index, row) {
      this.$confirm('确认关闭？')
        .then(_ => {
          userAxios.delUserIdPlan(row.id).then(() => {
            this.userPlanArr[index].status = 1
          })
        })
        .catch(_ => {})
    },
    getUserAllPlan () {
      userAxios.userIdAllPlan(this.userId).then(res => {
        this.userPlanArr = res
      })
    },
    editUser () {
      let id = this.userId
      let data = this.user
      if (data.birthday) {
        data.birthday = transformDate.formatDate(new Date(data.birthday))
      }
      this.$refs['rules'].validate(vaild => {
        if (vaild) {
          userAxios.edit(id, data)
        }
      })
    },
    integralEdit (type) {
      this.$refs['userIntegral'].validate(vaild => {
        if (vaild) {
          let data = {
            id: this.userId,
            index: this.userIntegral.integral
          }
          userAxios.integral(type, data).then(() => {
            if (type === 'add') {
              this.user.integral += this.userIntegral.integral
            } else {
              this.user.integral -= this.userIntegral.integral
            }
            this.userIntegral.integral = null
          })
        }
      })
    },
    planAdd () {
      this.$refs['planRules'].validate(vaild => {
        if (vaild) {
          let data = this.planData
          if (!data.Class_index && !data.theOne_index) return this.$message('需要一个节数')
          if (data.Class_index && data.theOne_index) return this.$message('只需要一个节数')
          let Length = data.plan_id.length
          data.plan_id = data.plan_id[Length - 1]
          data.user_id = this.userId
          let managerId = DataStore.getManagerId()
          if (managerId) data.manager_id = managerId
          else return this.$router.replace({ name: 'login' })
          userAxios.userAddPlan(data).then(res => {
            this.user.balance -= this.planData.extra_charge
            this.getUserAllPlan()
            this.planData = {
              plan_id: null,
              plan_price: null,
              extra_charge: null,
              Class_index: 0,
              theOne_index: 0,
              description: null
            }
          })
        }
      })
    },
    totalEdit (type) {
      this.$refs['userTotal'].validate(vaild => {
        if (vaild) {
          let data = this.userTotal
          data.id = this.userId
          let managerId = DataStore.getManagerId()
          if (managerId) data.managerId = managerId
          else return this.$router.replace({ name: 'login' })
          userAxios.total(type, data).then(() => {
            if (type === 'add') {
              this.user.balance += Number(this.userTotal.total)
            } else {
              this.user.balance -= Number(this.userTotal.total)
            }
            this.userTotal.total = null
            this.userTotal.description = null
          })
        }
      })
    }
  }
}
</script>
