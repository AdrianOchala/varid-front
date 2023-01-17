import Vue from 'vue'
import VueRouter from 'vue-router'
import DogList from '../views/ListView.vue'
import FormView from '../views/FormView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'list',
    component: DogList
  },
  {
    path: '/add',
    name: 'addDog',
    component: FormView
  },
  {
    path: '/:dogID',
    name: 'editDog',
    component: FormView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
