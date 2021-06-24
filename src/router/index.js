import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/imageEdit/index.vue')
  },
  {
    path: '/HomeworkReport',
    name: 'HomeworkReport',
    component: () => import('../views/HomeworkReport/index.vue')
  },
  {
    path: '/edit',
    name: 'edit',
    component: () => import('../views/imageEdit/index.vue')
  }

]

const router = new VueRouter({
  routes
})

export default router
