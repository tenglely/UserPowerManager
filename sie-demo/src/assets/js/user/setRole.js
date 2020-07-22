export default {
    data(){
      return{
        tableData:[],
        multipleSelection: [],
        options: [
           {
             value: '',
             label: '请选择状态'
           },
           {
             value: '1',
             label: '有效'
           }, {
             value: '2',
             label: '无效'
           }],
        user: {
             id:'',
             username: '',
             name: '',
             password: '',
             checkPassword:'',
             sex: '',
             userPhone: '',
             email: '',
             userStatus: '',
             userRemarks: '',
           },
        Role:[],
        token:'',//令牌
      }
    },
     mounted(){
         var that = this;
         var storage = localStorage;
         that.user = JSON.parse(storage.getItem('setRoleUser'));
         that.token = JSON.parse(localStorage.getItem('mytoken'));
        // that.user.roleId = that.user.roleId;
         console.log(that.user);
         this.searchdata();
     },
      methods: {
        //查询已拥有的角色
        searchRole(){
          var that = this;
          var url="/queryAllUserRoleByUsername/"+that.user.username;
          that.$axios
          .get(url,{headers:{"mytoken":that.token}})
          .then(function(resp) {
            that.Role = resp.data.data;
            that.toggleSelection();
        })
          .catch(function (error) { // 请求失败处理
            if(error.response.status == 401){
              that.$router.push('/');//会话超时，返回登录页面
            }  
            console.log(error);
        });
        },
       //修改用户角色
       updateUser(){
             var that = this;
             if(that.multipleSelection.length==0){
                 alert("请选择一个角色!!!");
                 return;
             }
             var url="/updateUserRole";
             var addData=[];
              for(var j=0 ,len=that.multipleSelection.length;j<len;j++){
                addData.push(that.multipleSelection[j].id);
              }
             let param = new URLSearchParams();
             param.set("username",that.user.username);
             param.set("userId",that.user.id);
             param.set("roleId",addData);
             that.$axios
             .post(url,param,{headers:{"mytoken":that.token}})
             .then(function(resp) {
                  if(resp.data.success){
                    alert('修改成功!!');
                    that.closeDialog();
                   //that.$router.push('/home/user');
                  }
              })
              .catch(function (error) { // 请求失败处理
                if(error.response.status == 401){
                  that.$router.push('/');//会话超时，返回登录页面
                }  
                console.log(error);
              });
       },
       getCurrentRow(row){ 
           //获取选中数据
           this.user.RoleId = row.id;
           console.log(this.user.RoleId);
       },
        //关闭弹窗
        closeDialog(){
          var that = this;
          that.$store.commit('setSetRoleDialog',false);
         },
       //分页
       searchdata(){
            var that = this;
             var url="/queryAllRole";
             that.$axios
               .get(url,{headers:{"mytoken":that.token}})
               .then(function(resp) {
                 that.tableData = resp.data.data;
                 that.searchRole();
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
          this.multipleSelection = val;
          
        },
       toggleSelection() {
         var that = this;
         var rows = that.Role;
        if (rows) {
          rows.forEach(row => {
            that.tableData.forEach(role =>{
              if(row.id == role.id){
                that.$refs.multipleTable.toggleRowSelection(role);
              }
            });
          });
        } else {
          that.$refs.multipleTable.clearSelection();
        }
      },
       //时间格式转换
       time(time){
        if(time!=undefined&&time!=''){
          return time.substr(0, 19).replace('T',' ');
        }
      },
      //  //跳转
      //  goBack(){
      //      var that = this;
      //      that.$router.push('/home/user');
      //  },
       //清空
       clear(){
        this.$refs.multipleTable.clearSelection();
       }
     },
   }