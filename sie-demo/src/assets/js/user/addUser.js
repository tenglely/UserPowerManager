export default {
    data() {
         var validatePass = (rule, value, callback) => {
           if (value === '') {
             callback(new Error('请输入密码'));
           } else {
             if (this.userForm.checkPassword !== '') {
               this.$refs.userForm.validateField('checkPassword');
             }
             callback();
           }
         };
         var validatePass2 = (rule, value, callback) => {
           if (value === '') {
             callback(new Error('请再次输入密码'));
           } else if (value !== this.userForm.password) {
             callback(new Error('两次输入密码不一致!'));
           } else {
             callback();
           }
         };
         return {
           userForm: {
             username: '',
             name: '',
             password: '',
             checkPassword:'',
             sex: '',
             userPhone: '',
             email: '',
             userStatus: '',
             userRemarks: ''
           },
           token:'',//令牌
           checkuser:'',
           rules: {
             password: [
               { validator: validatePass, trigger: 'blur' },
               { required: true, message: '请输入密码', trigger: 'blur' },
             ],
             checkPassword: [
               { validator: validatePass2, trigger: 'blur' }
             ],
             userPhone: [
              { required: false, message: '', trigger: 'blur' }
            ],
             username: [
               { required: true, message: '请输入用户名', trigger: 'blur' },
               { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
             ],
             name: [
               { required: true, message: '请输入姓名', trigger: 'blur' },
               { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
             ],
             sex: [
               { required: true, message: '请选择性别', trigger: 'change' }
             ],
             userStatus: [
               { required: true, message: '请选择状态', trigger: 'change' }
             ],
             userRemarks: [
               { required: false, message: '', trigger: 'blur' }
             ],
           }
         };
       },
       mounted(){
        this.token = JSON.parse(localStorage.getItem('mytoken'));
      },
       methods: {
         submitForm(formName) {
           this.$refs[formName].validate((valid) => {
             if (valid) {
               var that = this;
               var url="/insertUser";
               let param = new URLSearchParams();
               if(that.userForm.userPhone){
                var partten = /^1[3,4,5,7,8]\d{9}$/;
                if(!partten.test(that.userForm.userPhone)){
                  alert('手机号码格式错误');
                  return;
                }
                param.set("userPhone",that.userForm.userPhone);
               }
              //  that.checkUsername(that.userForm.username);
              //  if(that.checkuser == 'true'){
              //   param.set("username",that.userForm.username);
              //  }else{
              //    alert("用户名重复!!!");
              //    that.userForm.username='';
              //    return;
              //  }
               param.set("username",that.userForm.username);
               param.set("name",that.userForm.name);
               param.set("password",that.userForm.password);
               param.set("sex",that.userForm.sex);
               param.set("email",that.userForm.email);
               param.set("userStatus",that.userForm.userStatus);
               param.set("userRemarks",that.userForm.userRemarks);
   
               that.$axios
                 .post(url,param,{headers:{"mytoken":that.token}})
                 .then(function(resp) {
                  if(resp.data.success){
                    alert('提交成功!!');
                    that.closeDialog();
                    that.searchdata(1);
                    //that.$router.push('/home/user');
                  }else{
                    alert('插入失败!!!用户名重复!!!');
                    that.userForm.username='';
                  }
               })
                 .catch(function (error) { // 请求失败处理
                  if(error.response.status == 401){
                    that.$router.push('/');//会话超时，返回登录页面
                  }
                  console.log(error);
               });
             } else {
               alert('提交失败!!');
               return false;
             }
           });
         },
         //关闭弹窗
         closeDialog(){
          var that = this;
          that.resetForm('userForm');
          that.$store.commit('setAddUserDialog',false);
         },
         //校验用户名是否重复
        //  checkUsername(username){
        //    var that = this;
        //    var url="/checkUsername";
        //    var param = new URLSearchParams();
        //    param.set("username",username);
        //   that.$axios
        //   .post(url,param,{headers:{"mytoken":that.token}})
        //   .then(function(resp) {
        //    if(resp.data.success){
        //     that.checkuser = resp.data.check;
        //     console.log("check:"+that.checkuser);
        //    }else{
        //      alert('请求失败!!!');
        //    }
        // })
        //   .catch(function (error) { // 请求失败处理
        //     if(error.response.status == 401){
        //       that.$router.push('/');//会话超时，返回登录页面
        //     }  
        //     console.log(error);
        // });
        //  },
         resetForm(formName) {
           this.$refs[formName].resetFields();
         },
         searchdata(pageNumber){
          var that = this;
           var url="/queryUserPage";
           let param = new URLSearchParams();
           param.append("pageSize",that.$store.state.userPageSize);
           param.append("pageNumber",pageNumber);
           param.append("username",that.$store.state.user.username);
           param.append("name",that.$store.state.user.name);
           param.append("userStatus",that.$store.state.user.userStatus);
           if(that.startTime!=undefined){
             param.append("startTime",that.startTime);
           }
           if(that.overTime!=undefined){
             param.append("overTime",that.overTime);
           }
           that.$axios
             .post(url,param,{headers:{"mytoken":that.token}})
             .then(function(resp) {
               that.$store.commit('setUserTableData',resp.data.data);
               that.$store.commit('setUserTotal',resp.data.total);
           })
             .catch(function (error) { // 请求失败处理
                 if(error.response.status == 401){
                   that.$router.push('/');//会话超时，返回登录页面
                 }  
                 console.log(error);
           });
     },
        //  goBack(){
        //    var that = this;
        //    that.$router.push('/home/user');
        //  },
       }
   
   }