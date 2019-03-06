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
      path: '/create',
      name: 'create',
      component: () => import('./views/blogs/BlogCreate.vue')
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
        },
        {
          path: 'article/:id',
          name: 'article',
          component: () => import('./views/blogs/ArticleDetail.vue')
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
      path: '/usercenter',
      name: 'usercenter',
      component: () => import('./views/usercenter/UserCenter.vue'),
      children: [
        {
          path: 'myinfo',
          name: '我的信息',
          component: () => import('./views/usercenter/UserInfo.vue')
        },
        {
          path: 'myalbums',
          name: '我的专辑',
          component: () => import('./views/usercenter/UserAlbums.vue')
        },
        {
          path: 'myarticles',
          name: '我的文章',
          component: () => import('./views/home/About.vue')
        },
        {
          path: 'myfavors',
          name: '我的收藏',
          component: () => import('./views/home/About.vue')
        },
        {
          path: 'myfocus',
          name: '我的关注',
          component: () => import('./views/home/About.vue')
        },
        {
          path: 'mymessage',
          name: '我的消息',
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
