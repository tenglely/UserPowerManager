export default {
    data() {
         return {
           menuForm: {
             menuContents: '',
             parentMenu: '',
             menuName: '',
             menuIdentification:'',
             menuUrl: '',
             menuPhoto: '',
             sortNum: '',
             menuStatus: '',
             menuRemarks: '',
           },
           token:'',//令牌
           catalog:[],
           menu:[],
           rules: {
             menuContents: [
               { required: true, message: '请选择菜单类型', trigger: 'change' }
             ],
            //  parentMenu: [
            //    { required: true, message: '请选择上级菜单', trigger: 'blur' },
            //  ],
             menuName: [
               { required: true, message: '请输入菜单名称', trigger: 'blur' },
               { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
             ],
             menuIdentification: [
               { required: false, message: '', trigger: 'blur' }
             ],
             menuUrl: [
               { required: false, message: '', trigger: 'blur' }
             ],
             menuPhoto: [
               { required: false, message: '', trigger: 'blur' }
             ],
             sortNum: [
               { required: true, message: '请输入排序号', trigger: 'blur' },
             ],
             menuStatus: [
               { required: true, message: '请选择状态', trigger: 'blur' },
             ],
             menuRemarks: [
               { required: false, message: '', trigger: 'blur' }
             ],
           }
         };
       },
       mounted(){
        this.token = JSON.parse(localStorage.getItem('mytoken'));
        //动态上级菜单
        this.propParentMenu();
      },
       methods: {
         //提交表单
         submitForm(formName) {
           this.$refs[formName].validate((valid) => {
             if (valid) {
               console.log(this.menuForm);
               var that = this;
               var url="/insertMenu";
               let param = new URLSearchParams();
               param.set("menuContents",that.menuForm.menuContents);
               param.set("parentMenu",that.menuForm.parentMenu);
               param.set("menuName",that.menuForm.menuName);
               param.set("menuIdentification",that.menuForm.menuIdentification);
               param.set("menuUrl",that.menuForm.menuUrl);
               param.set("menuPhoto",that.menuForm.menuPhoto);
               param.set("sortNum",that.menuForm.sortNum);
               param.set("menuStatus",that.menuForm.menuStatus);
               param.set("menuRemarks",that.menuForm.menuRemarks);
   
               that.$axios
                 .post(url,param,{headers:{"mytoken":that.token}})
                 .then(function(resp) {
                  if(resp.data.success){
                    alert('提交成功!!');
                    that.searchdata(1);
                    that.closeDialog();
                   //that.$router.push('/home/list');
                  }else{
                    alert('插入失败!!!');
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
         //动态上级菜单显示
         propParentMenu(){
          var that = this;
          var url="/propParentMenu";
          that.$axios
          .get(url,{headers:{"mytoken":that.token}})
          .then(function(resp) {
            if(resp.data.success){
              that.catalog = resp.data.catalog;
              that.menu = resp.data.menu;
            }
          })
            .catch(function (error) { // 请求失败处理
            if(error.response.status == 401){
              that.$router.push('/');//会话超时，返回登录页面
            }
            console.log(error);
            });
         },
         resetForm(formName) {
           this.$refs[formName].resetFields();
         },
        //关闭弹窗
        closeDialog(){
            var that = this;
            that.resetForm('menuForm');
            that.$store.commit('setAddMenuDialog',false);
        },
        //分页
      searchdata(pageNumber){
         var that = this;
         var url="/queryMenuPage";
         let param = new URLSearchParams();
         param.append("pageSize",that.$store.state.menupPageSize);
         param.append("pageNumber",pageNumber);
         if(that.$store.state.menuName != undefined){
          param.append("menuName",that.$store.state.menuName);
         }
         if(that.$store.state.menuStatus != undefined){
          param.append("menuStatus",that.$store.state.menuStatus);
         }
         if(that.$store.state.menuContents != undefined){
          param.append("menuContents",that.$store.state.menuContents);
         }
         that.$axios
           .post(url,param,{headers:{"mytoken":that.token}})
           .then(function(resp) {
             that.$store.commit('setMenuTableData',resp.data.data);
             that.$store.commit('setMenuTotal',resp.data.total);
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