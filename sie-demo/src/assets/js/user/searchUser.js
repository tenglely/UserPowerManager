import TabAddUserDialog from '../../../vues/user/addUser'

export default {
    components:{
      TabAddUserDialog
    },
    data(){
       return{
        pageSize:10,
        username:'',
        name:'',
        userStatus:'',
        datavalue:'',
        options: [{ value: '',label: '请选择状态'},{value: '1',label: '有效'}, {value: '2',label: '无效'}],
        startTime:'',
        overTime:'',
        token:'',
        delDialog:false,//删除弹窗
        delData:[],//需删除的对象
       } 
    },
    mounted(){
        this.token = JSON.parse(localStorage.getItem('mytoken'));
    },
    methods:{
      //跳转添加用户
      addUser(){
        var that = this;
        that.$store.commit('setAddUserDialog',true);
        //that.$router.push('/home/addUser');
      },
        //查询数据
      search(){
        var that = this;
        var datavalue = that.$store.state.datavalue;
        if(datavalue!=undefined){
          that.startTime=datavalue[0]+' 00:00:00';
          that.overTime=datavalue[1]+' 23:59:59';
        }else{
          that.startTime = '';
          that.overTime = '';
        }
        this.$store.commit('setUserCurrentPage',1);
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
       //批量删除
       deleteMore(){
        this.delDialog = true;
        this.delData=[];
        var multipleSelection = this.$store.state.userMultipleSelection;
        for(var j=0 ,len=multipleSelection.length;j<len;j++){
           this.delData.push(multipleSelection[j].id);
        }
         console.log("多选:"+this.delData);
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
    },
    watch:{
        username:{
            handler(n,o){
                 this.$store.commit('setUserName',this.username);
            }
        },
        name:{
            handler(n,o){
                 this.$store.commit('setName',this.name);
            }
        },
        userStatus:{
            handler(n,o){
                 this.$store.commit('setUserStatus',this.userStatus);
            }
        },
        datavalue:{
            handler(n,o){
                 this.$store.commit('setDatavalue',this.datavalue);
            }
        },
    },
   
}