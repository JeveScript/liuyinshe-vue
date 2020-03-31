<template>
  <div class="page-content">
    <el-button type="primary" @click="addShow">添加科目</el-button>
     <template>
      <el-table
        :data='CourseArr'
        style='width: 100%'>
        <el-table-column
          label='图片'>
          <template slot-scope='scope'>
            <el-image
              style='width: 50px; height: 50px'
              :src='scope.row.course_image'>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column
          prop='name'
          label='名称'>
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top-start" width="500">
              <p>{{ scope.row.description }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.name }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
         <el-table-column
          prop='created_at'
          label='创建时间'>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="ShowEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="courseDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <el-dialog
      :title="show == 1 ? '添加科目' :'编辑科目'"
      v-if='dialogVisible'
      :visible.sync='dialogVisible'
      width='50%'>
      <span style='display: block;max-width:500px;'>
        <el-form label-position='left' label-width='80px' :model='newCourse'  :rules='rules' ref='rules'>
          <el-form-item label='名称' prop='name'>
            <el-input v-model='newCourse.name'></el-input>
          </el-form-item>
          <el-form-item label='描述' prop='description' >
            <el-input type='textarea' resize='none' rows='3' maxlength='300' :show-word-limit='true' v-model='newCourse.description'></el-input>
          </el-form-item>
          <el-form-item label='封面' prop='course_image'>
            <el-upload
              action=''
              class='avatar-uploader'
              :show-file-list='false'
              :before-upload='getImage'
              :http-request='setImage'
              >
              <img v-if='newCourse.course_image' :src='newCourse.course_image' class='avatar'>
              <i v-else class='el-icon-plus avatar-uploader-icon'></i>
            </el-upload>
          </el-form-item>
        </el-form>
      </span>
      <span slot='footer' class='dialog-footer'>
        <el-button @click='dialogVisible = false'>取 消</el-button>
        <el-button type='primary' @click='handleCourse'>确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import qiniuService from '@/global/service/qiniu.js'
import courseAxios from '@/global/service/course.js'
export default {
  data () {
    return {
      dialogVisible: false,
      CourseArr: [],
      newindex: null,
      show: 1,
      newCourse: {
        name: '',
        description: '',
        course_image: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入科目名称', trigger: 'change' }
        ],
        description: [
          { required: true, message: '请输入描述', trigger: 'change' }
        ],
        course_image: [
          { required: true, message: '请选择图片', trigger: 'change' }
        ]
      }
    }
  },
  created () {
    this.getCourse()
  },
  methods: {
    ShowEdit (index, row) {
      courseAxios.show(row.id).then(res => {
        this.newCourse = res[0]
        this.show = 2
        this.newindex = index
        this.dialogVisible = true
      })
    },
    getCourse () {
      courseAxios.all().then(res => {
        this.CourseArr = res
      })
    },
    addShow  () {
      this.newCourse = {
        name: '',
        description: '',
        course_image: ''
      }
      this.show = 1
      this.dialogVisible = true
    },
    handleCourse () {
      if (this.show === 1) {
        this.addCourse()
      } else if (this.show === 2) {
        this.editCourse()
      }
    },
    courseDelete (index, row) {
      courseAxios.del(row.id).then(() => {
        this.getCourse()
      })
    },
    editCourse () {
      let data = this.newCourse
      this.$refs['rules'].validate(vaild => {
        if (vaild) {
          courseAxios.edit(data.id, data).then(() => {
            this.getCourse()
            this.dialogVisible = false
          })
        }
      })
    },
    addCourse () {
      let data = this.newCourse
      this.$refs['rules'].validate(vaild => {
        if (vaild) {
          courseAxios.add(data).then(res => {
            this.getCourse()
            this.dialogVisible = false
          })
        }
      })
    },
    getImage (file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    setImage (res) {
      qiniuService.setDate(res.file).then(res => {
        this.newCourse.course_image = res
      })
    }
  }
}
</script>
<style lang="less">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  display: block;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
