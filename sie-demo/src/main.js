import Vue from 'vue'
import App from './App.vue'
//引入element ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//引入axios
import axios from 'axios'
import store from './store/store'

//引入vuex
import vuex from 'vuex'
//引入组件
import Login from './vues/login.vue'
import HelloWorld from './vues/HelloWorld.vue'
import User from './vues/user/user.vue'
import Role from './vues/role/role.vue'
import List from './vues/menu/list.vue'
// import RolePermissions from './vues/role/rolePermissions.vue'
// import AddUser from './vues/user/addUser.vue'
// import AddMenu from './vues/menu/addMenu.vue'
// import AddRole from './vues/role/addRole.vue'
// import UpdateUser from './vues/user/updateUser.vue'
// import UpdateRole from './vues/role/updateRole.vue'
// import UpdateMenu from './vues/menu/updateMenu.vue'
// import SetRole from './vues/user/setRole.vue'
import Home from './vues/home/home.vue'

//引入路由
import VueRouter from 'vue-router'
//使用vuex
Vue.use(vuex);
//使用路由
Vue.use(VueRouter);
//使用axios
Vue.prototype.$axios = axios
//使用element ui
Vue.use(ElementUI)
Vue.config.productionTip = false
axios.defaults.baseURL="/apis"//需要请求的后端域名 
//创建路由实例
const router = new VueRouter({
  mode: 'hash',
  routes: [
   {path:'/',name:'login',component:Login},//运行后的首页
    {
      path:'/home',
      name:'home',
      component:Home,
      children:[
        {path:'/home/user',component:User},//用户管理页面
        //{path:'/home/rolePermissions',name:'rolePermissions',component:RolePermissions},//角色权限
        {path:'/home/role',component:Role},//角色管理页面
        {path:'/home/hello',component:HelloWorld}, //首页欢迎页面
        {path:'/home/list',component:List},//菜单管理页面
        //{path:'/home/addUser',component:AddUser},//添加用户页面
        //{path:'/home/updateUser',component:UpdateUser},//修改用户页面
        //{path:'/home/addMenu',component:AddMenu},//添加菜单页面
        //{path:'/home/updateMenu',component:UpdateMenu},//修改菜单页面
        //{path:'/home/addRole',component:AddRole},//添加角色页面
        //{path:'/home/updateRole',component:UpdateRole},//修改角色页面
        //{path:'/home/setRole',component:SetRole},//设置角色页面
       ]
     },
     //主页面
     {path:'/login',name:'login',component:Login},
     //登录页面
   {path:'*',redirect:'/'} //404
   //当路径错误或没有这个路径的时候我们会给予一个默认路径
  ]
 });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
