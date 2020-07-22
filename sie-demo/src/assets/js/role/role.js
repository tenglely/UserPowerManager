import TabRoleSearch from '../../../vues/role/searchRole'
import TabRoleTable from '../../../vues/role/tableRole'
import TabRolePage from '../../../vues/role/rolePage'

export default {
    components:{
      TabRoleSearch,
      TabRoleTable,
      TabRolePage
    },
    data(){
      return{
        pageSize:10,//分页数目
        btcheck:{
          //权限列
          searchButton:false,//查询
          addButton:false,//新增
          delButton:false,//删除
          updateButton:false,//编辑
          setRolePowerButton:false,//设置角色
        },
        // delDialog:false,//删除弹窗
        // delData:[],//需删除的对象
        token:'',//令牌
      }
    },
     mounted(){
            this.token = JSON.parse(localStorage.getItem('mytoken'));
            this.searchdata(1);
            this.updatePowers();
     },
      methods: {
      //    //批量删除
      //    deleteMore(){
      //      this.delDialog = true;
      //      this.delData=[];
      //      console.log(this.multipleSelection);
      //      var multipleSelection = this.$store.state.roleMultipleSelection;
      //      for(var j=0 ,len=multipleSelection.length;j<len;j++){
      //         this.delData.push(multipleSelection[j].id);
      //      }
      //       console.log("多选:"+this.delData);
      //    },
      //    //删除
      //    deleteRole(){
      //      var that = this;
      //      var data = that.delData;
      //        var url="/deleteRole";
      //        let param = new URLSearchParams();
      //        param.append("rid",that.delData);
      //        that.$axios
      //          .post(url,param,{headers:{"mytoken":that.token}})
      //          .then(function(resp) {
      //           if(resp.data.success){
      //             that.delDialog = false;
      //             that.searchdata(1);
      //           }
      //        })
      //          .catch(function (error) { // 请求失败处理
      //           if(error.response.status == 403){
      //             that.$router.push('/');//会话超时，返回登录页面
      //           }  
      //           console.log(error);
      //        });
      //    },
      //  //跳转添加用户
      //  addRole(){
      //     var that = this;
      //    that.$router.push('/home/addRole');
      //  },
        //更新权限
       updatePowers(){
         var that = this;
         var storage = localStorage;
         var powers = JSON.parse(storage.getItem('powers'));
         console.log(powers);
         for(var j=0,len=powers.length;j<len;j++){
           if(powers[j].menuIdentification == 'search_role'){
             that.btcheck.searchButton = true;
           }
           if(powers[j].menuIdentification == 'add_role'){
             that.btcheck.addButton = true;
           }
           if(powers[j].menuIdentification == 'del_role'){
             that.btcheck.delButton = true;
           }
           if(powers[j].menuIdentification == 'update_role'){
             that.btcheck.updateButton = true;
           }
           if(powers[j].menuIdentification == 'set_role_power'){
             that.btcheck.setRolePowerButton = true;
           }
         }
         that.$store.commit('setRolebtcheck',that.btcheck);
       },
       //查询数据
       search(){
         var that = this;
         this.searchdata(1);
       },
       //分页
       searchdata(pageNumber){
            var that = this;
             var url="/queryRolePage";
             let param = new URLSearchParams();
             param.append("pageSize",that.pageSize);
             param.append("pageNumber",pageNumber);
             param.append("roleName",that.$store.state.roleName);
             param.append("roleStatus",that.$store.state.roleStatus);
             that.$axios
               .post(url,param,{headers:{"mytoken":that.token}})
               .then(function(resp) {
                that.$store.commit('setRoleTableData',resp.data.data);
                that.$store.commit('setRoleTotal',resp.data.total);
             })
               .catch(function (error) { // 请求失败处理
                if(error.response.status == 401){
                  that.$router.push('/');//会话超时，返回登录页面
                }   
                console.log(error);
             });
       },
     },
   }