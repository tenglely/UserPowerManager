import TabAddRoleDialog from '../../../vues/role/addRole'


export default {
    components:{
      TabAddRoleDialog
    },
    data(){
        return{
            roleName:'',
            roleStatus:'',
            options: [{ value: '',label: '请选择状态'},{value: '1',label: '有效'}, {value: '2',label: '无效'}],
            delDialog:false,//删除弹窗
            delData:[],//需删除的对象
            token:'',//令牌
            pageSize:10,//分页数目
        }
    },
    mounted(){
        this.token = JSON.parse(localStorage.getItem('mytoken'));
    },
    methods:{
         //批量删除
         deleteMore(){
            this.delDialog = true;
            this.delData=[];
            console.log(this.multipleSelection);
            var multipleSelection = this.$store.state.roleMultipleSelection;
            for(var j=0 ,len=multipleSelection.length;j<len;j++){
               this.delData.push(multipleSelection[j].id);
            }
             console.log("多选:"+this.delData);
          },
          //删除
          deleteRole(){
            var that = this;
            var data = that.delData;
              var url="/deleteRole";
              let param = new URLSearchParams();
              param.append("rid",that.delData);
              that.$axios
                .post(url,param,{headers:{"mytoken":that.token}})
                .then(function(resp) {
                 if(resp.data.success){
                   that.delDialog = false;
                   that.searchdata(1);
                 }
              })
                .catch(function (error) { // 请求失败处理
                 if(error.response.status == 403){
                   that.$router.push('/');//会话超时，返回登录页面
                 }  
                 console.log(error);
              });
          },
        //跳转添加用户
        addRole(){
           var that = this;
           that.$store.commit('setAddRoleDialog',true);
        },
         //查询数据
       search(){
        var that = this;
        this.$store.commit('setRoleCurrentPage',1);
        this.searchdata(1);
      },
      //分页
      searchdata(pageNumber){
           var that = this;
            var url="/queryRolePage";
            let param = new URLSearchParams();
            param.append("pageSize",that.$store.state.rolePageSize);
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
    watch:{
        roleName:{
            handler(n,o){
                 this.$store.commit('setRoleName',this.roleName);
            }
        },
        roleStatus:{
            handler(n,o){
                 this.$store.commit('setRoleStatus',this.roleStatus);
            }
        },
    }
}