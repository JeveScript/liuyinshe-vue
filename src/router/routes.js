import BasicLayout from "@/components/BasicLayout.vue";

const AccountLogin = () =>
  import(/* webpackChunkName: "account" */ "@/views/AccountLogin.vue");
const Dashboard = () =>
  import(/* webpackChunkName: "Dashboard" */ "@/views/Dashboard.vue");
const Manager = () =>
  import(/* webpackChunkName: "article" */ "@/views/Manager.vue");
const ManagerCreate = () =>
  import(/* webpackChunkName: "Manager" */ "@/views/ManagerCreate.vue");
const ManagerEdit = () =>
  import(/* webpackChunkName: "Manager" */ "@/views/ManagerEdit.vue");
const Payment = () =>
  import(/* webpackChunkName: "Manager" */ "@/views/Payment.vue");
const Home = () => import(/* webpackChunkName: "Home" */ "@/views/Home.vue");

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
              // nav: {
              //   icon: "el-icon-circle-plus-outline",
              //   title: "创建"
              // },
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
      }
    ]
  }
];
