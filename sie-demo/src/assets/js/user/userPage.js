export default {
    data(){
        return{
            startTime:'',
            overTime:'',
            token:'',
            // pageSize:10,//分页数目
            pageSizes:[10, 8, 6, 4,2],//每页条数
        }
    },
     mounted(){
           this.token = JSON.parse(localStorage.getItem('mytoken'));
    },
    methods:{
         handleCurrentChange(val) {
          //console.log(`当前页: ${val}`);
          this.$store.commit('setUserCurrentPage',val);
          this.search(val);
        },
        //每页条数
        handleSizeChange(val) {
          //console.log(`每页 ${val} 条`);
          this.$store.commit('setUserpPageSize',val);
          this.$store.commit('setUserCurrentPage',1);
          this.searchdata(1);
        },
         //查询数据
        search(val){
            var that = this;
            var datavalue = that.$store.state.datavalue;
            if(datavalue!=undefined){
            that.startTime=datavalue[0];
            that.overTime=datavalue[1];
            }else{
            that.startTime = '';
            that.overTime = '';
            }
            console.log(that.startTime,that.overTime);
            this.searchdata(val);
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
    }
}