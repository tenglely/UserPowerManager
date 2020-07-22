import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);
const store = new vuex.Store({
    state:{
        //用户
        user:{
            username:'',
            name:'',
            userStatus:'',
          },
        datavalue:'',
        userTableData:[],
        userTotal:0,
        userMultipleSelection:[],
        userbtcheck:{//用户管理权限列
            searchButton:false,//查询
            addButton:false,//新增
            delButton:false,//删除
            updateButton:false,//编辑
            updateStatus:false,//修改状态
            setRoleButton:false,//设置角色
         },
         userPageSize:10,//分页数目
         userCurrentPage:1,//当前页
         addUserDialog:false,//添加用户弹框
         updateUserDialog:false,//编辑用户弹窗
         updateUser:'',//需编辑用户对象
         setRoleDialog:false,//设置角色弹窗
        //角色
        roleName:'',
        roleStatus:'',
        rolebtcheck:{
            //角色管理权限列
            searchButton:false,//查询
            addButton:false,//新增
            delButton:false,//删除
            updateButton:false,//编辑
            setRolePowerButton:false,//设置角色权限
          },
        roleTableData:[],
        roleTotal:0,
        roleMultipleSelection:[],
        rolePageSize:10,//分页数目
        roleCurrentPage:1,//当前页
        addRoleDialog:false,//添加角色弹框
        updateRoleDialog:false,//编辑角色弹窗
        updateRole:'',//需编辑角色对象
        rolePermissionsDialog:false,//设置角色权限弹窗
        //菜单
        menuName:'',
        menuStatus:'',
        menuContents:'',
        menubtcheck:{
            //菜单管理权限列
            searchButton:false,//查询
            addButton:false,//新增
            delButton:false,//删除
            updateButton:false,//编辑
          },
        menuTableData:[],
        menuTotal:0,
        menuMultipleSelection:[],
        menupPageSize:10,//分页数目
        menuCurrentPage:1,//当前页
        addMenuDialog:false,//添加角色弹框
        updateMenuDialog:false,//编辑角色弹窗
        updateMenu:'',//需编辑角色对象

    },
    mutations:{
        //菜单
        setMenuName(state,menuName){
            state.menuName = menuName;
        },
        setMenuStatus(state,menuStatus){
            state.menuStatus = menuStatus;
        },
        setMenuContents(state,menuContents){
            state.menuContents = menuContents;
        },
        setMenubtcheck(state,menubtcheck){
            state.menubtcheck = menubtcheck;
        },
        setMenuTableData(state,tableDate){
            state.menuTableData = tableDate;
        },
        setMenuMultipleSelection(state,menuMultipleSelection){
            state.menuMultipleSelection = menuMultipleSelection;
        },
        setMenuTotal(state,menuTotal){
            state.menuTotal = menuTotal;
        },
        setMenupPageSize(state,menupPageSize){
            state.menupPageSize = menupPageSize;
        },
        setMenuCurrentPage(state,menuCurrentPage){
            state.menuCurrentPage = menuCurrentPage;
        },
        setAddMenuDialog(state,addMenuDialog){
            state.addMenuDialog = addMenuDialog;
        },
        setUpdateMenuDialog(state,updateMenuDialog){
            state.updateMenuDialog = updateMenuDialog;
        },
        setUpdateMenu(state,updateMenu){
            state.updateMenu = updateMenu;
        },
        //用户
        setUserName(state,username){
            state.user.username = username;
        },
        setName(state,name){
            state.user.name = name;
        },
        setUserStatus(state,userStatus){
            state.user.userStatus = userStatus;
        },
        setDatavalue(state,datavalue){
            state.datavalue = datavalue;
        },
        setUserTableData(state,tableDate){
            state.userTableData = tableDate;
        },
        setUserbtcheck(state,userbtcheck){
            state.userbtcheck = userbtcheck;
        },
        setUserMultipleSelection(state,userMultipleSelection){
            state.userMultipleSelection = userMultipleSelection;
        },
        setUserTotal(state,userTotal){
            state.userTotal = userTotal;
        },
        setUserpPageSize(state,userPageSize){
            state.userPageSize = userPageSize;
        },
        setUserCurrentPage(state,userCurrentPage){
            state.userCurrentPage = userCurrentPage;
        },
        setAddUserDialog(state,addUserDialog){
            state.addUserDialog = addUserDialog;
        },
        setUpdateUserDialog(state,updateUserDialog){
            state.updateUserDialog = updateUserDialog;
        },
        setUpdateUser(state,updateUser){
            state.updateUser = updateUser;
        },
        setSetRoleDialog(state,setRoleDialog){
            state.setRoleDialog = setRoleDialog;
        },
        //角色
        setRoleName(state,roleName){
            state.roleName = roleName;
        },
        setRoleStatus(state,roleStatus){
            state.roleStatus = roleStatus;
        },
        setRolebtcheck(state,rolebtcheck){
            state.rolebtcheck = rolebtcheck;
        },
        setRoleTableData(state,tableDate){
            state.roleTableData = tableDate;
        },
        setRoleMultipleSelection(state,roleMultipleSelection){
            state.roleMultipleSelection = roleMultipleSelection;
        },
        setRoleTotal(state,roleTotal){
            state.roleTotal = roleTotal;
        },
        setRolePageSize(state,rolePageSize){
            state.rolePageSize = rolePageSize;
        },
        setRoleCurrentPage(state,roleCurrentPage){
            state.roleCurrentPage = roleCurrentPage;
        },
        setAddRoleDialog(state,addRoleDialog){
            state.addRoleDialog = addRoleDialog;
        },
        setUpdateRoleDialog(state,updateRoleDialog){
            state.updateRoleDialog = updateRoleDialog;
        },
        setUpdateRole(state,updateRole){
            state.updateRole = updateRole;
        },
        setRolePermissionsDialog(state,rolePermissionsDialog){
            state.rolePermissionsDialog = rolePermissionsDialog;
        }
    },
    actions:{
       
    }
})
export default store;