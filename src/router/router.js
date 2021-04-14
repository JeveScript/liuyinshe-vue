import BasicLayout from '@/components/BasicLayout.vue'

// const homepage = () =>
//   import(/* webpackChunkName: "account" */ '@/views/homepage.vue')
const login = () =>
  import(/* webpackChunkName: "account" */ '@/views/login.vue')
// const home = () =>
//   import(/* webpackChunkName: "account" */ '@/views/Home.vue')
const manager = () =>
  import(/* webpackChunkName: "account" */ '@/views/manager.vue')
const managerCreate = () =>
  import(/* webpackChunkName: "account" */ '@/views/managerCreate.vue')
const managerEdit = () =>
  import(/* webpackChunkName: "account" */ '@/views/managerEdit.vue')
const user = () =>
  import(/* webpackChunkName: "account" */ '@/views/user.vue')
const userCreate = () =>
  import(/* webpackChunkName: "account" */ '@/views/userCreate.vue')
const userEdit = () =>
  import(/* webpackChunkName: "account" */ '@/views/userEdit.vue')
const userPlan = () =>
  import(/* webpackChunkName: "account" */ '@/views/userPlan.vue')
const teacher = () =>
  import(/* webpackChunkName: "account" */ '@/views/teacher.vue')
const teacherCreate = () =>
  import(/* webpackChunkName: "account" */ '@/views/teacherCreate.vue')
const teacherEdit = () =>
  import(/* webpackChunkName: "account" */ '@/views/teacherEdit.vue')
const Class = () =>
  import(/* webpackChunkName: "account" */ '@/views/class.vue')
const classDetails = () =>
  import(/* webpackChunkName: "account" */ '@/views/classDetails.vue')
const comboPlan = () =>
  import(/* webpackChunkName: "account" */ '@/views/combo_plan.vue')
const comboPlanCreate = () =>
  import(/* webpackChunkName: "account" */ '@/views/combo_planCreate.vue')
const comboPlanEdit = () =>
  import(/* webpackChunkName: "account" */ '@/views/combo_planEdit.vue')
const combo = () =>
  import(/* webpackChunkName: "account" */ '@/views/combo.vue')
const comboCreate = () =>
  import(/* webpackChunkName: "account" */ '@/views/comboCreate.vue')
const comboEdit = () =>
  import(/* webpackChunkName: "account" */ '@/views/comboEdit.vue')
const leave = () =>
  import(/* webpackChunkName: "account" */ '@/views/leave.vue')
const lesson = () =>
  import(/* webpackChunkName: "account" */ '@/views/lesson.vue')
const payment = () =>
  import(/* webpackChunkName: "account" */ '@/views/payment.vue')
const course = () =>
  import(/* webpackChunkName: "account" */ '@/views/course.vue')
export default [
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/',
    name: 'Admin',
    component: BasicLayout,
    redirect: { name: 'manager' },
    children: [
      // {
      //   path: '/',
      //   name: 'homepage',
      //   component: homepage,
      //   meta: {
      //     breadcrumb: {
      //       title: '概括'
      //     },
      //     nav: {
      //       icon: 'el-icon-more-outline',
      //       title: '概括'
      //     }
      //   }
      // },
      {
        path: '/manager',
        name: 'manager',
        component: { render: h => h('router-view') },
        meta: {
          jurisdiction: true,
          breadcrumb: {
            title: '管理员'
          },
          nav: {
            icon: 'el-icon-user-solid',
            title: '管理员'
          }
        },
        children: [
          {
            path: '/manager',
            name: 'manager',
            component: manager
          },
          {
            path: '/manager/create',
            name: 'managerCreate',
            component: managerCreate,
            meta: {
              breadcrumb: {
                title: '创建'
              }
            }
          },
          {
            path: '/manager/Edit/:id',
            name: 'managerEdit',
            component: managerEdit,
            meta: {
              breadcrumb: {
                title: '编辑'
              }
            }
          }
        ]
      },
      {
        path: '/teacher',
        name: 'teacher',
        component: { render: h => h('router-view') },
        meta: {
          jurisdiction: true,
          breadcrumb: {
            title: '老师'
          },
          nav: {
            icon: 'el-icon-user-solid',
            title: '老师'
          }
        },
        children: [
          {
            path: '/teacher',
            name: 'teacher',
            component: teacher
          },
          {
            path: '/teacher/create',
            name: 'teacherCreate',
            component: teacherCreate,
            meta: {
              breadcrumb: {
                title: '创建'
              }
            }
          },
          {
            path: '/teacher/Edit/:id',
            name: 'teacherEdit',
            component: teacherEdit,
            meta: {
              breadcrumb: {
                title: '详情'
              }
            }
          }
        ]
      },
      {
        path: '/user',
        name: 'user',
        component: { render: h => h('router-view') },
        meta: {
          breadcrumb: {
            title: '学员'
          },
          nav: {
            icon: 'el-icon-user',
            title: '学员'
          }
        },
        children: [
          {
            path: '/user',
            name: 'user',
            component: user
          },
          {
            path: '/user/create',
            name: 'userCreate',
            component: userCreate,
            meta: {
              breadcrumb: {
                title: '创建'
              }
            }
          },
          {
            path: '/user/Edit/:id',
            name: 'userEdit',
            component: userEdit,
            meta: {
              breadcrumb: {
                title: '编辑'
              }
            }
          },
          {
            path: '/user/plan/:id',
            name: 'userPlan',
            component: userPlan,
            meta: {
              breadcrumb: {
                title: '学员套餐'
              }
            }
          }
        ]
      },
      {
        path: '/class',
        name: 'class',
        component: { render: h => h('router-view') },
        meta: {
          breadcrumb: {
            title: '课程'
          },
          nav: {
            icon: 'el-icon-s-data',
            title: '课程'
          }
        },
        children: [
          {
            path: '/class',
            name: 'class',
            component: Class
          },
          {
            path: '/class/details/:id',
            name: 'classCreate',
            component: classDetails,
            meta: {
              breadcrumb: {
                title: '详情'
              }
            }
          },
          {
            path: '/lesson/:id',
            name: 'lesson',
            component: lesson,
            meta: {
              breadcrumb: {
                title: '单节课'
              }
            }
          }
        ]
      },
      {
        path: '/combo',
        name: 'combo',
        component: { render: h => h('router-view') },
        meta: {
          jurisdiction: true,
          breadcrumb: {
            title: '套餐'
          },
          nav: {
            icon: 'el-icon-tickets',
            title: '套餐'
          }
        },
        children: [
          {
            path: '/combo',
            name: 'combo',
            component: combo
          },
          {
            path: '/combo/create',
            name: 'comboCreate',
            component: comboCreate,
            meta: {
              breadcrumb: {
                title: '创建'
              }
            }
          },
          {
            path: '/combo/Edit/:id',
            name: 'comboEdit',
            component: comboEdit,
            meta: {
              breadcrumb: {
                title: '编辑'
              }
            }
          }
        ]
      },
      {
        path: '/comboPlan',
        name: 'comboPlan',
        component: { render: h => h('router-view') },
        meta: {
          jurisdiction: true,
          breadcrumb: {
            title: '套餐计划'
          },
          nav: {
            icon: 'el-icon-document-copy',
            title: '套餐计划'
          }
        },
        children: [
          {
            path: '/comboPlan',
            name: 'comboPlan',
            component: comboPlan
          },
          {
            path: '/comboPlan/create',
            name: 'comboPlanCreate',
            component: comboPlanCreate,
            meta: {
              breadcrumb: {
                title: '创建'
              }
            }
          },
          {
            path: '/comboPlan/Edit/:id',
            name: 'comboPlanEdit',
            component: comboPlanEdit,
            meta: {
              breadcrumb: {
                title: '编辑'
              }
            }
          }
        ]
      },
      {
        path: '/course',
        name: 'course',
        component: course,
        meta: {
          jurisdiction: true,
          breadcrumb: {
            title: '科目'
          },
          nav: {
            icon: 'el-icon-document',
            title: '科目'
          }
        }
      },
      {
        path: '/leave',
        name: 'leave',
        component: leave,
        meta: {
          breadcrumb: {
            title: '请假列表'
          },
          nav: {
            icon: 'el-icon-headset',
            title: '请假列表'
          }
        }
      },
      {
        path: '/payment',
        name: 'payment',
        component: payment,
        meta: {
          jurisdiction: true,
          breadcrumb: {
            title: '收支'
          },
          nav: {
            icon: 'el-icon-bank-card',
            title: '收支'
          }
        }
      }
    ]
  }
]
