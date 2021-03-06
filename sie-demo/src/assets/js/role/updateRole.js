export default {
    data() {
         return {
           roleForm: {
             id:'',
             roleCode: '',
             roleName: '',
             startTime: '',
             overTime:'',
             roleStatus: '',
             roleRemarks: '',
           },
           token:'',//令牌
           rules: {
             roleCode: [
               { required: true, message: '请输入角色编码', trigger: 'blur' },
             ],
             roleName: [
               { required: true, message: '请输入角色名称', trigger: 'blur' },
               { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
             ],
             startTime: [
              { required: true, message: '请选择生效日期', trigger: 'change' }
            ],
            overTime: [
              { required: true, message: '请选择失效日期', trigger: 'change' }
            ],
             roleStatus: [
               { required: true, message: '请选择状态', trigger: 'change' }
             ],
             roleRemarks: [
               { required: false, message: '', trigger: 'blur' }
             ],
           }
         };
       },
       mounted(){
           var storage = localStorage;
           this.token = JSON.parse(localStorage.getItem('mytoken'));
           //var role =JSON.parse(storage.getItem('updateRole'));
           var role = JSON.parse(this.$store.state.updateRole);
           role.roleStatus = role.roleStatus + '';
           if(role.roleRemarks == null){
               role.roleRemarks = '';
           }
           this.roleForm = role;
       },
       methods: {
         submitForm(formName) {
           this.$refs[formName].validate((valid) => {
             if (valid) {
               console.log(this.roleForm);
               var that = this;
               var url="/updateRole";
               let param = new URLSearchParams();
               param.set("id",that.roleForm.id);
               param.set("roleCode",that.roleForm.roleCode);
               param.set("roleName",that.roleForm.roleName);
               param.set("startTime",that.roleForm.startTime);
               param.set("overTime",that.roleForm.overTime);
               param.set("roleStatus",that.roleForm.roleStatus);
               param.set("roleRemarks",that.roleForm.roleRemarks);
               that.$axios
                 .post(url,param,{headers:{"mytoken":that.token}})
                 .then(function(resp) {
                  if(resp.data.success){
                    alert('修改成功!!');
                    that.closeDialog();
                    that.searchdata(that.$store.state.roleCurrentPage);
                   //that.$router.push('/home/role');
                  }
               })
                 .catch(function (error) { // 请求失败处理
                  if(error.response.status == 401){
                    that.$router.push('/');//会话超时，返回登录页面
                  }   
                  console.log(error);
               });
             } else {
               alert('修改失败!!');
               return false;
             }
           });
         },
          //关闭弹窗
          closeDialog(){
            var that = this;
            //localStorage.removeItem('updateUser');
            that.$store.commit('setUpdateRoleDialog',false);
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
       }
   
   }