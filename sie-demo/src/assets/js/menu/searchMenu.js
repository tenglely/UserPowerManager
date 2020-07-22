import TabAddMenuDialog from '../../../vues/menu/addMenu'

export default {
    components:{
      TabAddMenuDialog
    },
    data(){
        return{
            options: [{value: '',label: '请选择状态'},{value: '1',label: '有效'}, {value: '2',label: '无效'}],
            menutype: [{value: '',label: '请选择菜单类型'},{value: '1',label: '目录'}, {value: '2',label: '菜单'}, {value: '3',label: '功能'}],
            pageSize:10,//分页数目
            menuName:'',
            menuStatus:'',
            menuContents:'',
            delDialog:false,//删除弹窗
            delData:[],//需删除的对象
            token:'',//令牌
        }
    },
    mounted(){
        this.token = JSON.parse(localStorage.getItem('mytoken'));
    },
    methods:{
        //批量删除
        deleteMore(){
            this.delDialog = true;
            this.delData=[];
            console.log(this.multipleSelection);
            var multipleSelection = this.$store.state.menuMultipleSelection;
            for(var j=0 ,len=multipleSelection.length;j<len;j++){
               this.delData.push(multipleSelection[j].id);
            }
             console.log("多选:"+this.delData);
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
        //添加菜单页面
        addMenu(){
          var that = this;
          //that.$router.push('/home/addMenu');
          that.$store.commit('setAddMenuDialog',true);
        },
         //查询数据
       search(){
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
    },
    watch:{
        menuName:{
            handler(n,o){
                 this.$store.commit('setMenuName',this.menuName);
            }
        },
        menuStatus:{
            handler(n,o){
                 this.$store.commit('setMenuStatus',this.menuStatus);
            }
        },
        menuContents:{
            handler(n,o){
                 this.$store.commit('setMenuContents',this.menuContents);
            }
        },
    }
}