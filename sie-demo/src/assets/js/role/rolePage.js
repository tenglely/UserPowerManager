export default {
    data(){
        return{
            token:'',
            pageSizes:[10, 8, 6, 4,2],//每页条数
        }
    },
     mounted(){
           this.token = JSON.parse(localStorage.getItem('mytoken'));
    },
    methods:{
          //跳转页数
         handleCurrentChange(val) {
           //console.log(`当前页: ${val}`);
           this.$store.commit('setRoleCurrentPage',val);
           this.searchdata(val);
         },
          //每页条数
        handleSizeChange(val) {
          //console.log(`每页 ${val} 条`);
          this.$store.commit('setRolePageSize',val);
          this.$store.commit('setRoleCurrentPage',1);
          this.searchdata(1);
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