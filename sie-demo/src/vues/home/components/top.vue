<template>
    <div>
        <span>{{username}},欢迎您，点击这里</span>
        <el-link class="fontsize" type="primary" :underline="false" v-on:click="toLogin">退出</el-link>
    </div>
</template>

<script>
export default {
    props:['username'],
    methods:{
          //退出至登录
        toLogin(){
          var that = this;
          that.$router.push('/login');
        },
    }    
}
</script>