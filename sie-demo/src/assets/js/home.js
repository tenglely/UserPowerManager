import TabAside from '../../vues/home/components/Aside'
import TabTop from '../../vues/home/components/top'
export default {
    name: 'home',
    components:{
      TabAside,
      TabTop,
  },
    data(){
      return{
          user:{},
          powers:[],
          second:[],
      }
    },
    mounted(){
      var storage = localStorage;
      this.user = JSON.parse(storage.getItem('user'));//string转json
      this.$router.push('/home/hello');
      this.menulist();
    },
    methods: {
        //菜单列表
        menulist(){
          let that = this;
          that.queryHasMenu();
        },
        //已有权限
        queryHasMenu(){
            var that = this;
            var url="/queryHasMenu/"+that.user.username;
            var token = JSON.parse(localStorage.getItem('mytoken'));
            that.$axios
                .get(url,{headers:{"mytoken":token}})
                .then(function(resp) {
                if(resp.data.success){
                    that.powers = resp.data.data;
                    //侧栏一级和二级菜单划分数据
                    var one = [];
                    for(var j=0,len=that.powers.length;j<len;j++){
                      var sum =0;
                      if(that.powers[j].menuContents == 1){
                        one.push(that.powers[j]);
                        var two =[];
                        for(var i=0,len=that.powers.length;i<len;i++){
                          if(that.powers[i].menuContents == 2 && that.powers[i].parentMenu == that.powers[j].id){
                            two.push(that.powers[i]);
                          }
                        }
                        one[sum].two = two;
                        sum++;
                      }
                    }
                    that.second = one;
                    var storage = localStorage;
                    storage.setItem('powers',JSON.stringify(that.powers))
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
    
  }