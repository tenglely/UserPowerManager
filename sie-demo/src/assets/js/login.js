export default {
    data(){
        return {
            username: '',
            password:'',
        }
    },
  
     methods:{
        // 方法定义
        login(){
            var that = this;
            var url="/login/"+this.username+"/"+this.password;
            that.$axios
              .get(url)
              .then(function(resp) {
              if(resp.data.code==200){
                  //跳转
                  var d=JSON.stringify(resp.data.data);//json转string
                  var storage = localStorage;
                  storage.setItem('user',d);
                  storage.setItem('mytoken',JSON.stringify(resp.data.mytoken));
                  console.log(JSON.stringify(resp.data.mytoken));
                  that.$router.push("/home");
              }else{
                  alert("用户名/密码错误或账户失效!!!");
              }
            })
              .catch(function (error) { // 请求失败处理
                  console.log(error);
              });
        },
       
      }
  }