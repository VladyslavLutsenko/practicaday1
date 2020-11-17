import Vue from 'vue'
import VueRouter from 'vue-router'
import VModal from 'vue-js-modal'
import axios from 'axios'
import VueAxios from 'vue-axios'

import App from './App.vue'
import Students from './components/Students.vue'
import StudentInfo from './components/StudentInfo.vue'
import Login from './components/Login.vue'
import store from './store.js'

const routes = [
   { path: '/', component: Students, meta: {requiresAuth: true} },
   { path: '/login', component: Login },
   { path: '/student-info/:id', component: StudentInfo, props: true, meta: {requiresAuth: true} },
]
 
const router = new VueRouter({
   routes
})

router.beforeEach((to, from, next) => {
   if (to.matched.some(record => record.meta.requiresAuth)) {
     // этот путь требует авторизации, проверяем залогинен ли
     // пользователь, и если нет, перенаправляем на страницу логина
     if (store.getters.getUser === null) {
         next({
            path: '/login',
            query: { redirect: to.fullPath }
         })
      } 
      else {
         next()
      }
   } 
   else {
      next() // всегда так или иначе нужно вызвать next()!
   }
 })

Vue.use(VueAxios, axios)
Vue.use(VueRouter)
Vue.use(VModal)

new Vue({
   render: h => h(App),
   el: '#app',
   router,
   store
})
