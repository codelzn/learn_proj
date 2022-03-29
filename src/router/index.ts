import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    component: () => import(/* webpackChunkName: "main" */ '@/views/index.vue')
  },
  {
    path: '/page01',
    name: 'Page01',
    component: () => import(/* webpackChunkName: "page" */ '@/views/Page01.vue')
  },
  {
    path: '/page02',
    name: 'Page02',
    component: () => import(/* webpackChunkName: "page" */ '@/views/Page02.vue')
  },
  {
    path: '/page03',
    name: 'Page03',
    component: () => import(/* webpackChunkName: "page" */ '@/views/Page03.vue')
  },
  {
    path: '/page04',
    name: 'Page04',
    component: () => import(/* webpackChunkName: "page" */ '@/views/Page04.vue')
  },
  {
    path: '/page05',
    name: 'Page05',
    component: () => import(/* webpackChunkName: "page" */ '@/views/Page05.vue')
  },
  {
    path: '/page06',
    name: 'Page06',
    component: () => import(/* webpackChunkName: "page" */ '@/views/Page06.vue')
  },
  {
    path: '/page07',
    name: 'Page07',
    component: () => import(/* webpackChunkName: "page" */ '@/views/Page07.vue')
  },
  {
    path: '/page08',
    name: 'Page08',
    component: () => import(/* webpackChunkName: "page" */ '@/views/Page08.vue')
  },
  {
    path: '/page09',
    name: 'Page09',
    component: () => import(/* webpackChunkName: "page" */ '@/views/Page09.vue')
  },
  {
    path: '/page10',
    name: 'Page10',
    component: () => import(/* webpackChunkName: "page" */ '@/views/Page10.vue')
  },
  {
    path: '/page11',
    name: 'Page11',
    component: () => import(/* webpackChunkName: "page" */ '@/views/Page11.vue')
  },
  {
    path: '/page12',
    name: 'Page12',
    component: () => import(/* webpackChunkName: "page" */ '@/views/Page12.vue')
  },
  {
    path: '/page13',
    name: 'Page13',
    component: () => import(/* webpackChunkName: "page" */ '@/views/Page13.vue')
  },
  {
    path: '/page14',
    name: 'Page14',
    component: () => import(/* webpackChunkName: "page" */ '@/views/Page14.vue')
  },
  {
    path: '/page15',
    name: 'Page15',
    component: () => import(/* webpackChunkName: "page" */ '@/views/Page15.vue')
  },
  {
    path: '/page16',
    name: 'Page16',
    component: () => import(/* webpackChunkName: "page" */ '@/views/Page16.vue')
  },
  {
    path: '/page17',
    name: 'Page17',
    component: () => import(/* webpackChunkName: "page" */ '@/views/Page17.vue')
  },
  {
    path: '/page18',
    name: 'Page18',
    component: () => import(/* webpackChunkName: "page" */ '@/views/Page18.vue')
  },
  {
    path: '/page19',
    name: 'Page19',
    component: () => import(/* webpackChunkName: "page" */ '@/views/Page19.vue')
  },
  {
    path: '/page20',
    name: 'Page20',
    component: () => import(/* webpackChunkName: "page" */ '@/views/Page20.vue')
  },
  {
    path: '/page21',
    name: 'Page21',
    component: () => import(/* webpackChunkName: "page" */ '@/views/Page21.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName: "error" */ '@/views/Err.vue')
  },
  // 配置404页面
  {
    path: '/:pathMatch(.*)',
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
