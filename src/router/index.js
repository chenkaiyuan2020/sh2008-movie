import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 引入路由模块化文件
import centerRouter from './routes/center';
import cityRouter from './routes/city';
import vuexRouter from './routes/vuex';
import cinemaRouter from './routes/cinema';
import filmRouter from './routes/film';
import detailRouter from "./routes/detail";
import authRouter from './routes/auth';

const routes = [
    {
        path: "/",
        // 访问根路由跳转到电影页面
        redirect: "/film",
    },
    centerRouter,
    cinemaRouter,
    filmRouter,
    detailRouter,
    cityRouter,
    vuexRouter,
    ...authRouter,
];

const router = new VueRouter({
  mode: 'history',
  
  routes
});

router.beforeEach((to,from,next) =>{
  let arr =[
    // 需要登录才能访问的集合
    "/cinema",
  ];
  if(!arr.includes(to.path)){
    next();
  }else{
    if(localStorage.getItem("_token")){
      next();
    }else{
      next({path:"/login",query:{refer:to.fullPath}});
    }
  }
});

export default router
