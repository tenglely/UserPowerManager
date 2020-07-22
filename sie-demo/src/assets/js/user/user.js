import TabsearchUser from '../../../vues/user/searchUser'
import TabUserTable from '../../../vues/user/tableUser'
import TabUserPage from '../../../vues/user/userPage'

export default {
    components:{
      TabsearchUser,
      TabUserTable,
      TabUserPage
    },
    data(){
      return{
        startTime:'',
        overTime:'',
        pageSize:10,//分页数目
        btcheck:{//权限列
             searchButton:false,//查询
             addButton:false,//新增
             delButton:false,//删除
             updateButton:false,//编辑
             updateStatus:false,//修改状态
             setRoleButton:false,//设置角色
          },
          token:'',//令牌
      }
    },
    mounted(){
           this.token = JSON.parse(localStorage.getItem('mytoken'));
           this.searchdata(1);
           this.updatePowers();
    },
    methods: {
      //更新权限
      updatePowers(){
        var that = this;
        var storage = localStorage;
        var powers = JSON.parse(storage.getItem('powers'));
        console.log(powers);
        for(var j=0,len=powers.length;j<len;j++){
          if(powers[j].menuIdentification == 'search_user'){
            that.btcheck.searchButton = true;
          }
          if(powers[j].menuIdentification == 'add_user'){
            that.btcheck.addButton = true;
          }
          if(powers[j].menuIdentification == 'del_user'){
            that.btcheck.delButton = true;
          }
          if(powers[j].menuIdentification == 'update_user'){
            that.btcheck.updateButton = true;
          }
          if(powers[j].menuIdentification == 'update_user_status'){
            that.btcheck.updateStatus = true;
          }
          if(powers[j].menuIdentification == 'set_user_role'){
            that.btcheck.setRoleButton = true;
          }
        }
        that.$store.commit('setUserbtcheck',that.btcheck);
      },
      //查询数据
      search(){
        var that = this;
        var datavalue = that.$store.state.datavalue;
        if(datavalue!=undefined){
          that.startTime=datavalue[0];
          that.overTime=datavalue[1];
        }else{
          that.startTime = '';
          that.overTime = '';
        }
        this.searchdata(1);
      },
      //分页
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
    },
  }