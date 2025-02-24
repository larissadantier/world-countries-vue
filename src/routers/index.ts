import {createRouter, createWebHistory, type RouteRecordRaw} from 'vue-router';

import Home from '../views/Home.vue'
import Country from '../views/Country.vue'

const routes: RouteRecordRaw[] = [
  {path: '/', component: Home },
  {path: '/country/:id', component: Country }
]


const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router;