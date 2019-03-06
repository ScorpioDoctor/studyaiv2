import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/sign/Login.vue')
    },
    {
      path: '/regist',
      name: 'regist',
      component: () => import('./views/sign/Regist.vue')
    },
    {
      path: '/blog/:cat1id/',
      name: 'blog',
      component: () => import('./views/blogs/BlogLayout.vue'),
      children: [
        {
          path: 'album/:id',
          name: 'album',
          component: () => import('./views/blogs/AlbumDetail.vue')
        }
      ]
    },
    {
      path: '/jqxx',
      name: 'jqxx',
      component: () => import('./views/jqxx/Jqxx.vue'),
      children: [
        {
          path: 'basis',
          name: 'ML基础',
          component: () => import('./views/jqxx/JqxxBasis.vue')
        },
        {
          path: 'frontier',
          name: 'ML前沿',
          component: () => import('./views/home/About.vue')
        },
        {
          path: 'sklearn',
          name: 'SKLearn',
          component: () => import('./views/home/About.vue')
        },
        {
          path: 'matlab',
          name: 'MATLAB-ML',
          component: () => import('./views/home/About.vue')
        },
        {
          path: 'r',
          name: 'R语言',
          component: () => import('./views/home/About.vue')
        }
      ]
    },
    {
      path: '/jqsj',
      name: 'jqsj',
      component: () => import('./views/jqsj/Jqsj.vue')
    }
  ]
})
