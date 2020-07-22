import TabSearchMenu from '../../../vues/menu/searchMenu'
import TabTableMenu from '../../../vues/menu/tableMenu'
import TabMenuPage from '../../../vues/menu/menuPage'

export default {
    components:{
      TabSearchMenu,
      TabTableMenu,
      TabMenuPage
    },
    data(){
      return{
        pageSize:10,//分页数目
       btcheck:{
          //权限列
          searchButton:false,//查询
          addButton:false,//新增
          delButton:false,//删除
          updateButton:false,//编辑
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
           if(powers[j].menuIdentification == 'search_menu'){
             that.btcheck.searchButton = true;
           }
           if(powers[j].menuIdentification == 'add_menu'){
             that.btcheck.addButton = true;
           }
           if(powers[j].menuIdentification == 'del_menu'){
             that.btcheck.delButton = true;
           }
           if(powers[j].menuIdentification == 'update_menu'){
             that.btcheck.updateButton = true;
           }
         }
         that.$store.commit('setMenubtcheck',that.btcheck);
       },
       //查询数据
       search(){
         var that = this;
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
                 //that.tableData = resp.data.data;
                 that.$store.commit('setMenuTableData',resp.data.data);
                 that.$store.commit('setMenuTotal',resp.data.total);
                 //that.total = resp.data.total;
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