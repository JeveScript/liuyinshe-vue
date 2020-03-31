<template>
<div class="page-content">
    <h3>老师编辑</h3>
      <div class="teacher-section">
        <el-form label-position="left" :rules="rules" ref="teacher"  label-width="80px" :model="teacher" style="height:520px;">
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item label="名称" prop='name'>
                <el-input v-model.trim="teacher.name"></el-input>
              </el-form-item>
              <el-form-item label="手机号码" prop="phone">
                  <el-input v-model.trim="teacher.phone"></el-input>
              </el-form-item>
              <el-form-item label="头像" prop='image'>
                <el-upload
                  action=''
                  class='avatar-uploader'
                  :show-file-list='false'
                  :before-upload='getImage'
                  :http-request='setImage'
                  >
                  <img v-if='teacher.image' :src='teacher.image' class='avatar'>
                  <i v-else class='el-icon-plus avatar-uploader-icon'></i>
                </el-upload>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12" :offset="3">
            <div class="grid-content bg-purple">
              <el-form-item label="描述" prop='desc' style="height:450px">
                <quill-editor
                  class="quill-editor"
                  style="height:100%"
                  v-model.trim="teacher.desc"
                  ref="myQuillEditor"
                  :options="editorOption">
                </quill-editor>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>
      </div>
      <el-button type="primary" @click="editTeacher">编辑</el-button>
  </div>
</template>
<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import qiniuService from '@/global/service/qiniu.js'
import teacherService from '@/global/service/teacher.js'
const uploadConfig = {
  accept: 'image/png, image/gif, image/jpeg' // 可选 可上传的图片格式
}
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  [{ 'header': 1 }, { 'header': 2 }],
  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  [{ 'script': 'sub' }, { 'script': 'super' }],
  [{ 'indent': '-1' }, { 'indent': '+1' }],
  [{ 'direction': 'rtl' }],
  [{ 'size': ['small', false, 'large', 'huge'] }],
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  [{ 'color': [] }, { 'background': [] }],
  [{ 'font': [] }],
  [{ 'align': [] }],
  ['clean'],
  ['link', 'image', 'video']
]
const handlers = {
  image: function (value) {
    let fileInput = document.createElement('input')
    fileInput.setAttribute('type', 'file')
    fileInput.setAttribute('accept', uploadConfig.accept)
    fileInput.classList.add('ql-image')
    fileInput.addEventListener('change', () => {
      const file = fileInput.files[0]
      qiniuService.setDate(file).then(res => {
        let length = this.quill.getSelection(true).index
        this.quill.insertEmbed(length, 'image', res)
        this.quill.setSelection(length + 1)
      })
    })
    fileInput.click()
  }
}
export default {
  data () {
    return {
      teacher: {
        name: '',
        phone: '',
        image: '',
        desc: ''
      },
      teacherId: null,
      editorOption: {
        modules: {
          toolbar: {
            container: toolbarOptions,
            handlers: handlers
          }
        }
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'change' }
        ],
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'change' },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: '目前只支持中国大陆的手机号码',
            trigger: 'blur'
          }
        ],
        image: [
          { required: true, message: '请选择头像', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请输入老师描述', trigger: 'change' }
        ]
      }
    }
  },
  created () {
    let id = this.teacherId = this.$route.params.id
    teacherService.show(id).then(res => {
      this.teacher = res.data
    })
  },
  methods: {
    getImage (file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    setImage (res) {
      qiniuService.setDate(res.file).then(res => {
        this.teacher.image = res
      })
    },
    editTeacher () {
      let data = this.teacher
      let id = this.teacherId
      this.$refs['teacher'].validate(vaild => {
        if (vaild) {
          teacherService.edit(id, data).then(() => {
            this.$router.push({ path: '/teacher' })
          })
        }
      })
    }
  },
  components: {
    'quill-editor': quillEditor
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
.ql-container{
  height: 280px;
}
</style>
