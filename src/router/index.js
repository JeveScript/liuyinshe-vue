import Vue from 'vue'
import VueRouter from 'vue-router'
import route from './router'
import NProgress from 'nprogress' // 加载条
import 'nprogress/nprogress.css' // 加载条样式

Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: route
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

// eslint-disable-next-line
router.afterEach((to, from) => {
  NProgress.done()
})

export default router
