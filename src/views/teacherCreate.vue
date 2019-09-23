<template>
  <div class="page-container">
    <v-breadcrumb></v-breadcrumb>
    <div class="page-content">
      <el-form
        label-position="left"
        label-width="160px"
        :model="teacherFrom"
        :rules="rules"
        ref="teacherFrom"
      >
        <el-row :gutter="20">
          <el-col :lg="10">
            <el-card class="box-card">
              <el-form-item
                label="老师名称"
                prop="teacher_name"
                style="width:400px"
              >
                <el-input v-model="teacherFrom.teacher_name"></el-input>
              </el-form-item>
              <el-form-item
                label="联系方式"
                prop="teacher_phone"
                style="width:400px"
              >
                <el-input v-model="teacherFrom.teacher_phone"></el-input>
              </el-form-item>
              <el-form-item
                label="老师头像"
                prop="imageUrl"
                style="width:600px; "
              >
                <!-- <image class="teacher-image" :src="article.imageUrl"></image> -->
                <el-upload
                  action=""
                  class="avatar-uploader"
                  :show-file-list="false"
                  :before-upload="beforeAvatarUpload"
                  :http-request="teacherImage"
                >
                  <img
                    v-if="teacherFrom.imageUrl"
                    :src="teacherFrom.imageUrl"
                    class="avatar"
                  />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-card>
          </el-col>
          <el-col :lg="14">
            <el-card class="box-card">
              <el-form-item
                label="老师简介"
                prop="teacher_intro"
                style="width:600px; "
              >
                <quill-editor
                  class="quill-editor"
                  v-model="teacherFrom.teacher_intro"
                  ref="myQuillEditor"
                  :options="editorOption"
                >
                </quill-editor>
              </el-form-item>
            </el-card>
          </el-col>
        </el-row>
      </el-form>
      <el-button type="primary" @click="addTeacher" style="margin-top:30px;"
        >添加</el-button
      >
    </div>
  </div>
</template>
<script>
import Breadcrumb from "@/components/BasicBreadcrumb.vue";
import teacherService from "@/global/service/teacher.js";
import qiniuService from "@/global/service/qiniu.js";

import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
import * as Quill from "quill";
import axios from "axios";

const uploadConfig = {
  name: "image_url",
  size: 500, // 图片大小，单位为Kb, 1M = 1024Kb
  accept: "image/png, image/gif, image/jpeg", // 可选 可上传的图片格式
  QINIU_API: "http://upload-z2.qiniup.com"
};
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"],
  ["blockquote", "code-block"],
  [{ header: 1 }, { header: 2 }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ direction: "rtl" }],
  [{ size: ["small", false, "large", "huge"] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],
  ["clean"],
  ["link", "image", "video"]
];

const handlers = {
  image: function(value) {
    let fileInput = document.createElement("input");
    fileInput.setAttribute("type", "file");
    fileInput.setAttribute("accept", uploadConfig.accept);
    fileInput.classList.add("ql-image");
    fileInput.addEventListener("change", () => {
      const file = fileInput.files[0];
      if (uploadConfig.size && file.size >= uploadConfig.size * 1024) {
        fileInput.value = "";
        return;
      }
      qiniuService.setDate(file).then(res => {
        let length = this.quill.getSelection(true).index;
        this.quill.insertEmbed(length, "image", res);
        this.quill.setSelection(length + 1);
      });
    });
    fileInput.click();
  }
};

export default {
  data() {
    return {
      rules: {
        teacher_phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "目前只支持中国大陆的手机号码",
            trigger: "blur"
          }
        ],
        teacher_name: [
          { required: true, message: "请输入姓名", trigger: "blur" }
        ],
        teacher_intro: [
          { required: true, message: "请输入简介", trigger: "blur" }
        ],
        imageUrl: [{ required: true, message: "请选择图片", trigger: "blur" }]
      },
      teacherFrom: {
        teacher_name: "",
        teacher_phone: "",
        teacher_intro: "",
        imageUrl: ""
      },
      editorOption: {
        modules: {
          toolbar: {
            container: toolbarOptions,
            handlers: handlers
          }
        }
      }
    };
  },
  methods: {
    beforeAvatarUpload: function(file) {
      //  const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    teacherImage: function(files) {
      qiniuService.setDate(files.file).then(res => {
        this.teacherFrom.imageUrl = res;
      });
    },
    addTeacher: function() {
      this.$refs.teacherFrom.validate(valid => {
        if (valid) {
          let params = {
            teacher_name: this.teacherFrom.teacher_name,
            teacher_phone: this.teacherFrom.teacher_phone,
            teacher_intro: this.teacherFrom.teacher_intro,
            imageUrl: this.teacherFrom.imageUrl
          };
          this.disabled = true;
          teacherService
            .create(params)
            .then(() => {
              this.$message.success("创建成功");
              this.$router.push({ name: "Teacher" });
            })
            .catch(err => {
              this.$message("创建失败,查看用户是否存在");
            })
            .finally(() => {
              this.disabled = false;
            });
        }
      });
    }
  },
  components: {
    "v-breadcrumb": Breadcrumb,
    "quill-editor": quillEditor
  }
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
