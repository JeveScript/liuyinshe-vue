import BasicLayout from "@/components/BasicLayout.vue";

const AccountLogin = () =>
  import(/* webpackChunkName: "account" */ "@/views/AccountLogin.vue");
const Dashboard = () =>
  import(/* webpackChunkName: "Dashboard" */ "@/views/Dashboard.vue");
const Manager = () =>
  import(/* webpackChunkName: "Manager" */ "@/views/Manager.vue");
const ManagerCreate = () =>
  import(/* webpackChunkName: "Manager" */ "@/views/ManagerCreate.vue");
const ManagerEdit = () =>
  import(/* webpackChunkName: "Manager" */ "@/views/ManagerEdit.vue");
const User = () => import(/* webpackChunkName: "User" */ "@/views/User.vue");
const UserCreate = () =>
  import(/* webpackChunkName: "User" */ "@/views/UserCreate.vue");
const UserEdit = () =>
  import(/* webpackChunkName: "User" */ "@/views/UserEdit.vue");
const UserItem = () =>
  import(/* webpackChunkName: "User" */ "@/views/UserItem.vue");
const Payment = () =>
  import(/* webpackChunkName: "Payment" */ "@/views/Payment.vue");
const Home = () => import(/* webpackChunkName: "Home" */ "@/views/Home.vue");
const Course = () =>
  import(/* webpackChunkName: "Course" */ "@/views/Course.vue");
const CourseCreate = () =>
  import(/* webpackChunkName: "Course" */ "@/views/CourseCreate.vue");
const CourseEdit = () =>
  import(/* webpackChunkName: "Course" */ "@/views/CourseEdit.vue");
const Class = () => import(/* webpackChunkName: "Class" */ "@/views/Class.vue");
const ClassCreate = () =>
  import(/* webpackChunkName: "Class" */ "@/views/ClassCreate.vue");
const ClassEdit = () =>
  import(/* webpackChunkName: "Class" */ "@/views/ClassEdit.vue");
const ClassItem = () =>
  import(/* webpackChunkName: "Class" */ "@/views/ClassItem.vue");
const Lesson = () =>
  import(/* webpackChunkName: "Class" */ "@/views/Lesson.vue");
const Leave = () => import(/* webpackChunkName: "Leave" */ "@/views/Leave.vue");
const teacher = () =>
  import(/* webpackChunkName: "teacher" */ "@/views/teacher.vue");
const teacherCreate = () =>
  import(/* webpackChunkName: "teacher" */ "@/views/teacherCreate.vue");
const teacherItem = () =>
  import(/* webpackChunkName: "teacher" */ "@/views/teacherItem.vue");

export default [
  {
    path: "/",
    component: Home,
    name: "Home"
  },
  {
    path: "/login",
    component: AccountLogin,
    name: "AccountLogin"
  },
  {
    path: "/admin",
    name: "Admin",
    component: BasicLayout,
    children: [
      {
        path: "/admin",
        name: "Dashboard",
        component: Dashboard,
        meta: {
          breadcrumb: {
            title: "概况",
            replace: false
          },
          nav: {
            icon: "el-icon-pie-chart",
            title: "概况"
          }
        }
      },
      {
        path: "/admin/user",
        name: "UserRoot",
        component: { render: h => h("router-view") },
        redirect: { name: "User" },
        meta: {
          nav: {
            icon: "el-icon-user",
            title: "学员"
          },
          breadcrumb: {
            title: "学员"
          }
        },
        children: [
          {
            path: "/admin/user",
            name: "User",
            component: User,
            meta: {
              breadcrumb: {
                title: "所有学员"
              }
            }
          },
          {
            path: "/admin/user/create",
            name: "UserCreate",
            component: UserCreate,
            meta: {
              breadcrumb: {
                title: "新建"
              }
            }
          },
          {
            path: "/admin/user/:id",
            name: "UserItem",
            component: UserItem,
            meta: {
              breadcrumb: {
                title: "详情"
              }
            }
          },
          {
            path: "/admin/user/:id/edit",
            name: "UserEdit",
            component: UserEdit,
            meta: {
              breadcrumb: {
                title: "编辑"
              }
            }
          }
        ]
      },
      {
        path: "/leave",
        name: "Leave",
        component: Leave,
        meta: {
          breadcrumb: {
            title: "请假管理",
            replace: false
          },
          nav: {
            icon: "el-icon-headset",
            title: "请假"
          }
        }
      },
      {
        path: "/payment",
        name: "Payment",
        component: Payment,
        meta: {
          breadcrumb: {
            title: "收支",
            replace: false
          },
          nav: {
            icon: "el-icon-bank-card",
            title: "收支"
          }
        }
      },
      {
        path: "/admin/course",
        name: "courseRoot",
        component: { render: h => h("router-view") },
        redirect: { name: "Course" },
        meta: {
          nav: {
            icon: "el-icon-reading",
            title: "课程"
          },
          breadcrumb: {
            title: "课程"
          }
        },
        children: [
          {
            path: "/admin/course",
            name: "Course",
            component: Course
          },
          {
            path: "/admin/course/create",
            name: "CourseCreate",
            component: CourseCreate,
            meta: {
              breadcrumb: {
                title: "新建"
              }
            }
          },
          {
            path: "/admin/course/:id/edit",
            name: "CourseEdit",
            component: CourseEdit,
            meta: {
              breadcrumb: {
                title: "详情"
              }
            }
          }
        ]
      },
      {
        path: "/admin/class",
        name: "ClassRoot",
        component: { render: h => h("router-view") },
        redirect: { name: "Class" },
        meta: {
          nav: {
            icon: "el-icon-c-scale-to-original",
            title: "班级"
          },
          breadcrumb: {
            title: "班级"
          }
        },
        children: [
          {
            path: "/admin/class",
            name: "Class",
            component: Class,
            meta: {
              breadcrumb: {
                title: "所有班级"
              }
            }
          },
          {
            path: "/admin/class/create",
            name: "ClassCreate",
            component: ClassCreate,
            meta: {
              breadcrumb: {
                title: "新建"
              }
            }
          },
          {
            path: "/admin/class/:id",
            name: "ClassItem",
            component: ClassItem,
            meta: {
              breadcrumb: {
                title: "详情"
              }
            }
          },
          {
            path: "/admin/class/:id/edit",
            name: "ClassEdit",
            component: ClassEdit,
            meta: {
              breadcrumb: {
                title: "编辑"
              }
            }
          },
          {
            path: "/admin/lesson/:id",
            name: "Lesson",
            component: Lesson,
            meta: {
              breadcrumb: {
                title: "课时"
              }
            }
          }
        ]
      },
      {
        path: "/admin/manager",
        name: "ManagerRoot",
        component: { render: h => h("router-view") },
        redirect: { name: "Manager" },
        meta: {
          nav: {
            icon: "el-icon-user",
            title: "管理员"
          },
          breadcrumb: {
            title: "管理员"
          }
        },
        children: [
          {
            path: "/admin/manager",
            name: "Manager",
            component: Manager
          },
          {
            path: "/admin/manager/create",
            name: "ManagerCreate",
            component: ManagerCreate,
            meta: {
              breadcrumb: {
                title: "新建"
              }
            }
          },
          {
            path: "/admin/manager/:id/edit",
            name: "ManagerEdit",
            component: ManagerEdit,
            meta: {
              breadcrumb: {
                title: "详情"
              }
            }
          }
        ]
      },
      {
        path: "/admin/teacher",
        name: "TeacherRoot",
        component: { render: h => h("router-view") },
        redirect: { name: "Teacher" },
        meta: {
          nav: {
            icon: "el-icon-user",
            title: "老师"
          },
          breadcrumb: {
            title: "老师"
          }
        },
        children: [
          {
            path: "/admin/teacher",
            name: "Teacher",
            component: teacher
          },
          {
            path: "/admin/teacher/create",
            name: "TeacherCreate",
            component: teacherCreate,
            meta: {
              breadcrumb: {
                title: "新建"
              }
            }
          },
          {
            path: "/admin/teacher/:id/edit",
            name: "TeacherEdit",
            component: teacherItem,
            meta: {
              breadcrumb: {
                title: "详情"
              }
            }
          }
        ]
      }
    ]
  }
];
