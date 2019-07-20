import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/cards',
      name: 'cards',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "cards" */ './views/Cards.vue')
    },
    {
      path: '/words',
      name: 'words',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "words" */ './views/Words.vue')
    },
    {
      path: '/account',
      name: 'account',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "account" */ './views/Account.vue')
    },
    {
      path: '/upload',
      name: 'upload',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "upload" */ './views/Upload.vue')
    },
    {
      path: '/reset',
      name: 'reset',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "reset" */ './views/Reset.vue')      
    }
  ]
})
