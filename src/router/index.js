import Vue from 'vue'
import VueRouter from 'vue-router'

import Battlefield from '../views/Battlefield.vue'
import Home from '../views/Home.vue'
import Map from '../views/Map.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/map/ships',
    name: 'Map',
    component: Map
  },
  {
    path: '/battlefield',
    name: 'Battlefield',
    component: Battlefield 
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
