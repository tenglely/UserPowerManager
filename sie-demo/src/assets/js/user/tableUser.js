import TabUpdateUserDialog from '../../../vues/user/updateUser'
import TabSetRoleDialog from '../../../vues/user/setRole'


export default {
    components:{
      TabUpdateUserDialog,
      TabSetRoleDialog
    },
    data(){
        return{
            pageSize:10,//分页数目
            statusDialog:false,
            updateStatus:{id:'',userStatus:''},//修改状态的对象
            token:'',
            delDialog:false,//删除弹窗
            delData:[],//需删除的对象
        }
    },
     mounted(){
           this.token = JSON.parse(localStorage.getItem('mytoken'));
    },
    methods:{
        //多选
        handleSelectionChange(val) {
          this.$store.commit('setUserMultipleSelection',val);
        },
        //编辑
        handleEdit(index, row) {
          console.log(index, row);
          var that = this;
          // var storage = localStorage;
          // storage.setItem('updateUser',JSON.stringify(row));
          //that.$router.push('/home/updateUser');
          that.$store.commit('setUpdateUser',JSON.stringify(row));
          that.$store.commit('setUpdateUserDialog',true);
        },
          //跳转设置角色
      setRole(index, row){
        var that = this;
        var storage = localStorage;
        storage.setItem('setRoleUser',JSON.stringify(row));
        //that.$router.push('/home/setRole');
        that.$store.commit('setSetRoleDialog',true);
      },
      //修改状态弹窗
      updateStatusDialog(index, row){
        var that = this;
        that.statusDialog = true;  
        that.updateStatus.id = row.id;
        if(row.userStatus == 1){
          that.updateStatus.userStatus = 2;
        };
        if(row.userStatus == 2){
          that.updateStatus.userStatus = 1;
        }
      },
      //修改状态
      updateStatusTo(){
        var that = this;
        var url="/updateUser";
        let param = new URLSearchParams();
        param.set("id",that.updateStatus.id);
        param.set("userStatus",that.updateStatus.userStatus);
         that.$axios
                .post(url,param,{headers:{"mytoken":that.token}})
                .then(function(resp) {
                 if(resp.data.success){
                  that.statusDialog = false; 
                  that.searchdata(that.$store.state.userCurrentPage);
                 }
              })
                .catch(function (error) { // 请求失败处理
                  if(error.response.status == 401){
                    that.$router.push('/');//会话超时，返回登录页面
                  }  
                  console.log(error);
              });
      },
      //分页
      searchdata(pageNumber){
           var that = this;
            var url="/queryUserPage";
            let param = new URLSearchParams();
            param.append("pageSize",that.$store.state.userPageSize);
            param.append("pageNumber",pageNumber);
            that.$axios
              .post(url,param,{headers:{"mytoken":this.token}})
              .then(function(resp) {
                //that.tableData = resp.data.data;
                that.$store.commit('setUserTableData',resp.data.data);
                that.total = resp.data.total;
            })
              .catch(function (error) { // 请求失败处理
                  if(error.response.status == 401){
                    that.$router.push('/');//会话超时，返回登录页面
                  }  
                  console.log(error);
            });
      },
       //删除弹出
        handleDelete(index, row) {
          this.delData=[];
          this.delDialog = true;
          this.delData.push(row.id);
        },
        //删除
        deleteUser(){
          var that = this;
          var data = that.delData;
            var url="/deleteUser";
            let param = new URLSearchParams();
            param.append("uid",that.delData);
            that.$axios
              .post(url,param,{headers:{"mytoken":that.token}})
              .then(function(resp) {
               if(resp.data.success){
                 that.delDialog = false;
                 that.searchdata(1);
               }
            })
              .catch(function (error) { // 请求失败处理
                if(error.response.status == 401){
                  that.$router.push('/');//会话超时，返回登录页面
                }  
                console.log(error);
            });
        },
        //时间格式转换
        time(time){
          if(time!=undefined&&time!=''){
            return time.substr(0, 19).replace('T',' ');
          }
        }
    }

}