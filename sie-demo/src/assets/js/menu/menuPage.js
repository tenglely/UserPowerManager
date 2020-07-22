export default {
    data(){
        return{
            pageSizes:[10, 8, 6, 4,2],//每页条数
            currentPage:1,
            token:'',//令牌
        }
    },
    mounted(){
            this.token = JSON.parse(localStorage.getItem('mytoken'));
     },
    methods:{
        //跳转页数
         handleCurrentChange(val) {
           //console.log(`当前页: ${val}`);
           this.$store.commit('setMenuCurrentPage',val);
           this.searchdata(val);
         },
         //每页条数
         handleSizeChange(val) {
          //console.log(`每页 ${val} 条`);
          this.$store.commit('setMenupPageSize',val);
          this.$store.commit('setMenuCurrentPage',1);
          this.searchdata(1);
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