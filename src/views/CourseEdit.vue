<template>
  <div class="page-container">
    <v-breadcrumb />
    <div class="page-content" v-loading="loading">
      <el-form
        :model="formData"
        :rules="rules"
        ref="userForm"
        label-position="left"
        label-width="160px"
      >
        <h3>课程信息</h3>

        <el-row :gutter="20">
          <el-col :lg="10">
            <el-card class="box-card">
              <el-form-item label="课程名称" prop="name" style="width:460px;">
                <el-input
                  v-model="formData.name"
                  placeholder="请输入课程名称"
                />
              </el-form-item>
              <el-form-item
                label="课程图片"
                prop="course_image"
                style="width:600px; "
              >
                <!-- <image class="teacher-image" :src="article.course_image"></image> -->
                <el-upload
                  class="avatar-uploader"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                  :http-request="courseImage"
                >
                  <img
                    v-if="formData.course_image"
                    :src="formData.course_image"
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
                label="课程简介"
                prop="description"
                style="width:600px; "
              >
                <quill-editor
                  class="quill-editor"
                  v-model="formData.description"
                  ref="myQuillEditor"
                  :options="editorOption"
                >
                </quill-editor>
              </el-form-item>
            </el-card>
          </el-col>
        </el-row>
        <el-button
          type="primary"
          @click="handleCreatecourse"
          :disabled="disabled"
          style="margin-top:30px;"
          >编辑</el-button
        >
      </el-form>
    </div>
  </div>
</template>

<script type="text/javascript">
import Breadcrumb from "@/components/BasicBreadcrumb.vue";
import courseService from "@/global/service/course.js";
import qiniuService from "@/global/service/qiniu.js";

import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
import axios from "axios";

const uploadConfig = {
  name: "image_url",
  size: 500, // 图片大小，单位为Kb, 1M = 1024Kb
  accept: "image/png, image/gif, image/jpeg", // 可选 可上传的图片格式
  TOKEN_API: "https://www.jevescript.com/api/qiniu-uploadtoken",
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
  ["link", "image"]
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
      console.log(123);
      qiniuService
        .getToken()
        .then(qiniuGet => {
          console.log(123);

          const key = "test/" + Date.now() + "_" + file.name;
          // 获取 TOKEN
          let domain = qiniuGet.domain;
          let token = qiniuGet.uploadToken;
          let formData = new FormData();
          formData.append("file", file); // 文件
          formData.append("key", key); // 在七牛存储中的路径
          formData.append("token", token); // token
          // 上传图片
          console.log(123);

          return axios
            .post(uploadConfig.QINIU_API, formData, {
              headers: {
                "Content-Type": "multiple/form-data"
              }
            })
            .then(res => {
              console.log(123);

              let course_image = "http://" + domain + "/" + res.key;
              let length = this.quill.getSelection(true).index;
              this.quill.insertEmbed(length, "image", course_image);
              this.quill.setSelection(length + 1);
              console.log(course_image);
            })
            .catch(e => {
              console.log(e);
            });
        })
        .catch(err => {});
    });
    fileInput.click();
  }
};

export default {
  data() {
    return {
      disabled: false,
      loading: false,
      rules: {
        name: [{ required: true, message: "请输入课程名称", trigger: "blur" }],
        description: [
          { required: true, message: "请输入课程描述", trigger: "blur" }
        ],
        course_image: [
          { required: true, message: "请选择课程图片", trigger: "blur" }
        ]
      },
      formData: {
        name: "",
        description: "",
        course_image: ""
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
  created() {
    let id = this.$route.params.id;
    courseService.show(id).then(res => {
      let userInfo = res;
      this.formData = userInfo;
    });
  },
  methods: {
    handleCreatecourse() {
      this.$refs.userForm.validate(valid => {
        if (valid) {
          let params = {
            name: this.formData.name,
            teacher: this.formData.teacher,
            teacher_phone: this.formData.teacher_phone,
            description: this.formData.description
          };
          this.disabled = true;
          let id = this.$route.params.id;
          courseService
            .update(id, params)
            .then(() => {
              this.$message.success("编辑成功");
              this.$router.push({ name: "Course" });
            })
            .finally(() => {
              this.disabled = false;
            });
        }
      });
    },
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
    courseImage: function(files) {
      let file = files.file;
      let domain;
      const key = "test/" + Date.now() + "_" + file.name;
      // 获取 TOKEN
      qiniuService
        .getToken()
        .then(qiniuGet => {
          domain = qiniuGet.domain;
          let token = qiniuGet.uploadToken;
          let formData = new FormData();
          formData.append("file", file); // 文件
          formData.append("key", key); // 在七牛存储中的路径
          formData.append("token", token); // token
          // 上传图片
          return axios
            .post(uploadConfig.QINIU_API, formData, {
              headers: {
                "Content-Type": "multiple/form-data"
              }
            })
            .then(ImageRes => {
              // console.log(ImageRes,123123,ImageRes.key)
              let image_url = "http://" + domain + "/" + ImageRes.key;
              this.formData.course_image = image_url;
            })
            .catch(e => {
              console.log(e);
            });
        })
        .catch(err => {});
    }
  },
  components: {
    "v-breadcrumb": Breadcrumb,
    "quill-editor": quillEditor
  }
};
</script>

<style type="text/css">
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
