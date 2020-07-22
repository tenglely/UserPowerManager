import TabUpdateRoleDialog from '../../../vues/role/updateRole'
import TabRolePermissionsDialog from '../../../vues/role/rolePermissions'

export default {
    components:{
      TabUpdateRoleDialog,
      TabRolePermissionsDialog
    },
    data(){
        return{
            pageSize:10,//分页数目
            delDialog:false,//删除弹窗
            delData:[],//需删除的对象
            token:'',//令牌  
        }
    },
    mounted(){
           this.token = JSON.parse(localStorage.getItem('mytoken'));
    },
    methods:{
         //删除弹出
         handleDelete(index, row) {
           this.delData=[];
           this.delDialog = true;
           this.delData.push(row.id);
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
          //多选
         handleSelectionChange(val) {
           //this.multipleSelection = val;
           this.$store.commit('setRoleMultipleSelection',val);
         },
         //编辑
         handleEdit(index, row) {
           console.log(index, row);
           var that = this;
          //  var storage = localStorage;
          //  storage.setItem('updateRole',JSON.stringify(row));
          //  that.$router.push('/home/updateRole');
          that.$store.commit('setUpdateRole',JSON.stringify(row));
          that.$store.commit('setUpdateRoleDialog',row);
         },
         //设置角色权限
         handleAddRolePermissions(index, row) {
           var that = this;
          //  console.log(index, row);
          //  that.$router.push({
          //          name:'rolePermissions',
          //          params:{
          //              role:row
          //          }
          //      });
          localStorage.setItem('role',JSON.stringify(row));
          that.$store.commit('setRolePermissionsDialog',true);
         },
         time(time){
           if(time){
            return time.substr(0, 19).replace('T',' ');
           }
           return '';
        }
    }
}