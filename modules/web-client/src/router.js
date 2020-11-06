import VueRouter from 'vue-router';
import store from './store.js'
import Login from './components/Login';
import SignUp from './components/SignUp';
import Dashboard from "./components/Dashboard";
import Game from "./components/Game";

const router = new VueRouter({
  mode: 'history',
  routes:[
    {
      path:'/',
      name:'Dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true,
        requiresSocket: true,
      }
    },
    {
      path:'/login',
      name:'Login',
      component: Login
    },
    {
      path:'/sign-up',
      name:'Sign Up',
      component: SignUp
    },
    {
      path:'/game/:game?',
      name:'Game',
      component: Game,
      meta: {
        requiresAuth: true,
        requiresSocket: true,
      }
    },
  ]
});

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      return next();
    }
    next('/login')
  } else {
    next()
  }
})

export default router;