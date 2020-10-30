import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 一级路由
const login = ()=>import("../pages/login/login")
const index = ()=>import("../pages/index/index")

// 二级路由
const home = () => import('../pages/home/home')
const role = () => import('../pages/role/role')
const manger = () => import('../pages/manger/manger')
const cate = () => import('../pages/cate/cate')
const menu = () => import('../pages/menu/menu')
const spces = () => import('../pages/spces/spces')
const loop = () => import('../pages/loop/loop')
const seckill = () => import('../pages/seckill/seckill')
const goods = () => import('../pages/goods/goods')
const member = () => import('../pages/member/member')


// 二级路由path不需要加/
export const indexRouters = [
  {
    path:"role",
    component:role,
    name:"角色列表"
  },
  {
    path:"manger",
    component:manger,
    name:"管理员列表"
  },
  {
    path:"cate",
    component:cate,
    name:"商品分类"
  },
  {
    path:"menu",
    component:menu,
    name:"菜单列表"
  },
  {
    path:"spces",
    component:spces,
    name:"商品规格"
  },
  {
    path:"loop",
    component:loop,
    name:"轮播图管理"
  },
  {
    path:"seckill",
    component:seckill,
    name:"秒杀活动"
  },
  {
    path:"goods",
    component:goods,
    name:"商品管理"
  },
  {
    path:"member",
    component:member,
    name:"会员管理"
  },
]

export default new Router({
  routes: [
    {
      path:"/login",
      component:login
    },
    {
      path:"/index",
      component:index,
      children:[
        {
          path:"home",
          component:home
        },
        ...indexRouters
      ]
    },
    {
      path:"/",
      redirect:"login"
    }
  ]
})
