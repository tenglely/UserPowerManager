import TabUpdateMenuDialog from '../../../vues/menu/updateMenu'

export default {
    components:{
      TabUpdateMenuDialog
    },
    data(){
        return{
            delDialog:false,//删除弹窗
            delData:[],//需删除的对象
            token:'',//令牌
        }
    },
    mounted(){
           this.token = JSON.parse(localStorage.getItem('mytoken'));
    },
    methods:{
        //删除弹出
         handleDelete(index, row) {
           this.delData=[];
           this.delDialog = true;
           this.delData.push(row.id);
         },
         //删除
         deleteMenu(){
           var that = this;
           var data = that.delData;
             var url="/deleteMenu";
             let param = new URLSearchParams();
             param.append("mid",that.delData);
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
         //分页
       searchdata(pageNumber){
            var that = this;
             var url="/queryMenuPage";
             let param = new URLSearchParams();
             param.append("pageSize",that.$store.state.menupPageSize);
             param.append("pageNumber",pageNumber);
             param.append("menuName",that.$store.state.menuName);
             param.append("menuStatus",that.$store.state.menuStatus);
             param.append("menuContents",that.$store.state.menuContents);
             that.$axios
               .post(url,param,{headers:{"mytoken":that.token}})
               .then(function(resp) {
                 //that.tableData = resp.data.data;
                 this.$store.commit('setMenuTableData',resp.data.data);
                 this.$store.commit('setMenuTotal',resp.data.total);
                 //that.total = resp.data.total;
             })
               .catch(function (error) { // 请求失败处理
                if(error.response.status == 401){
                  that.$router.push('/');//会话超时，返回登录页面
                }  
                console.log(error);
             });
       },
         //多选
         handleSelectionChange(val) {
           this.$store.commit('setMenuMultipleSelection',val);
         },
         //编辑
         handleEdit(index, row) {
           console.log(index, row);
           var that = this;
          //  var storage = localStorage;
          //  storage.setItem('updateMenu',JSON.stringify(row));
          //  that.$router.push('/home/updateMenu');
          that.$store.commit('setUpdateMenu',JSON.stringify(row));
          that.$store.commit('setUpdateMenuDialog',true);
         },
    }
}