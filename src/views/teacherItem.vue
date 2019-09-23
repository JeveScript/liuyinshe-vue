<template>
  <div class="page-container">
    <v-breadcrumb></v-breadcrumb>
    <div class="page-content">
      <el-tabs v-model="activeName">
        <el-tab-pane label="用户详情" name="1">
          <h3用户详情<h3 />
          <div class="teacherItem-details">
            <el-form
              label-position="left"
              label-width="160px"
              :model="teacherData"
              :rules="rules"
              ref="teacherData"
            >
              <el-row :gutter="20">
                <el-col :lg="10">
                  <el-card class="box-card">
                    <el-form-item
                      label="老师名称"
                      prop="teacher_name"
                      style="width:400px"
                    >
                      <el-input v-model="teacherData.teacher_name"></el-input>
                    </el-form-item>
                    <el-form-item
                      label="联系方式"
                      prop="teacher_phone"
                      style="width:400px"
                    >
                      <el-input v-model="teacherData.teacher_phone"></el-input>
                    </el-form-item>
                    <el-form-item
                      label="老师头像"
                      prop="imageUrl"
                      style="width:600px; "
                    >
                      <!-- <image class="teacher-image" :src="article.imageUrl"></image> -->
                      <el-upload
                        class="avatar-uploader"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                        :http-request="teacherImage"
                      >
                        <img
                          v-if="teacherData.imageUrl"
                          :src="teacherData.imageUrl"
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
                        v-model="teacherData.teacher_intro"
                        ref="myQuillEditor"
                        :options="editorOption"
                      >
                      </quill-editor>
                    </el-form-item>
                  </el-card>
                </el-col>
              </el-row>
            </el-form>
            <el-button
              type="primary"
              @click="editTeacher"
              style="margin-top:30px;"
              >编辑</el-button
            >
          </div>
        </el-tab-pane>
        <el-tab-pane label="教授班级" name="2">
          <div class="teacherItem-class">
            <h3>教授班级</h3>
            <el-table :data="tableData" height="600" border style="width: 100%">
              <el-table-column prop="date" label="日期" width="180">
              </el-table-column>
              <el-table-column prop="name" label="姓名" width="180">
              </el-table-column>
              <el-table-column prop="address" label="地址"> </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
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
      qiniuService
        .getToken()
        .then(qiniuGet => {
          const key = "test/" + Date.now() + "_" + file.name;
          // 获取 TOKEN
          let domain = qiniuGet.domain;
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
            .then(res => {
              let imageUrl = "http://" + domain + "/" + res.key;
              let length = this.quill.getSelection(true).index;
              this.quill.insertEmbed(length, "image", imageUrl);
              this.quill.setSelection(length + 1);
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
      activeName: "1",
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
      teacherData: {},
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
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
    console.log(id);
    teacherService.show(id).then(res => {
      console.log(res);
      this.teacherData = res;
    });
  },
  methods: {
    editTeacher: function() {
      let teacherData = this.teacherData;
      let id = this.$route.params.id;
      teacherService
        .edit(id, teacherData)
        .then(res => {
          this.$message({
            message: "修改成功",
            type: "success"
          });
        })
        .catch(e => {
          this.$message.error("编辑失败");
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
    teacherImage: function(files) {
      console.log(files);
      let file = files.file;
      let domain;
      const key = "test/" + Date.now() + "_" + file.name;
      // 获取 TOKEN
      console.log(key, uploadConfig.TOKEN_API);
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
              console.log(image_url);
              this.teacherData.imageUrl = image_url;
              console.log(this.teacherData.imageUrl, this);
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

<style lang="less">
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
