export default {
    data(){
      return{
          role:{},
          data: [],
          powers:[],
          defaultProps: {
            children: 'children',
            label: 'label'
          },
          usercheck:false,
          rolecheck:false,
          menucheck:false,
          token:'',//令牌
      }
    },
    mounted(){
      this.token = JSON.parse(localStorage.getItem('mytoken'));
      this.role =  JSON.parse(localStorage.getItem('role'));
      //权限列表
      this.queryRolePermissionsList();
      //已有权限
      this.queryHasRolePermissions();
    },
    methods: {
         //已有权限
      queryHasRolePermissions(){
          var that = this;
          var url="/queryRolePowers/"+that.role.id;
          that.$axios
              .get(url,{headers:{"mytoken":that.token}})
              .then(function(resp) {
              if(resp.data.success){
                  let list = resp.data.data;
                  console.log(list);
                  for(let j = 0,len=list.length; j < len; j++) {
                      if(list[j] == 1 || list[j] == 2 || list[j] == 3 || list[j] == 4){
                          delete list[j];
                      };
                  };
                  console.log("list:"+list);
                  that.powers =list;
              }
            })
              .catch(function (error) { // 请求失败处理
                if(error.response.status == 401){
                  that.$router.push('/');//会话超时，返回登录页面
                }  
                console.log(error);
              });
      },
        //权限列表
       queryRolePermissionsList(){
          var that = this;
          var url="/queryMenuTree";
          that.$axios
              .get(url,{headers:{"mytoken":that.token}})
              .then(function(resp) {
              if(resp.data.success){
                  that.data = resp.data.data;
              }
            })
              .catch(function (error) { // 请求失败处理
                if(error.response.status == 401){
                  that.$router.push('/');//会话超时，返回登录页面
                }  
                console.log(error);
              });
       },
      //通过key获取menuid,提交
        getCheckedKeys() {
            let that = this;
            let url="/updateRolePowers";
            let param = new URLSearchParams();
            let menuList = that.$refs.tree.getCheckedKeys();
            console.log(menuList);
            if(menuList.length==0){
              alert("请给角色赋予权限!!!");
              return;
            }
            if(menuList.length>0){
                 menuList.push(1);
            }
            menuList.forEach((item,i) => {
                  if(item===5||item ===6||item ===7||item ===8||item ===17||item ===18){
                      that.usercheck=true;
                  }
                  if(item===9||item ===10||item ===11||item ===12||item ===19){
                      that.rolecheck=true;
                  }
                  if(item===13||item ===14||item ===15||item ===16){
                      that.menucheck=true;
                  }
              })
            if(that.usercheck){
                menuList.push(2);
            };
            if(that.rolecheck){
                menuList.push(3);
            };
            if(that.menucheck){
                menuList.push(4);
            };
            menuList = that.unique4(menuList);
            console.log(menuList);
            param.append("menuIdList",menuList);
            param.append("roleId",that.role.id);
            that.$axios
              .post(url,param,{headers:{"mytoken":that.token}})
              .then(function(resp) {
               if(resp.data.success){
                   //that.queryHasRolePermissions();
                   alert("提交成功!请刷新页面!!!");
                   that.$store.commit('setRolePermissionsDialog',false);
               }else{
                   alert("请求处理失败!!!!");
               }
            })
              .catch(function (error) { // 请求失败处理
                if(error.response.status == 401){
                  that.$router.push('/');//会话超时，返回登录页面
                }    
                console.log(error);
            });
        },
        resetChecked() {
          this.$refs.tree.setCheckedKeys([]);
        },
         //关闭弹窗
        closeDialog(){
          var that = this;
          that.$store.commit('setRolePermissionsDialog',false);
        },
        //返回角色页面
        // goBack() {
        //   var that = this;
        //   that.$router.push('/home/role');
        // },
        //去除重复数组
        unique4(arr){
          var hash=[];
          for (var i = 0; i < arr.length; i++) {
              for (var j = i+1; j < arr.length; j++) {
              if(arr[i]===arr[j]){
                  ++i;
              }
              }
              hash.push(arr[i]);
          }
          return hash;
       }
    },
    
  }