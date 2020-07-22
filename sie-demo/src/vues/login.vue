<template>
    <div>
        <div>
            <el-row :gutter="20">
                <el-col :span="6" :offset="9">
                    <div class="a">
                         <h2>用户权限管理系统</h2><br>
                        <el-input v-model="username" placeholder="请输入用户名"></el-input><br><br>
                        <el-input placeholder="请输入密码" v-model="password" show-password></el-input><br><br>
                        <el-button v-on:click="login" type="primary" round>登录</el-button>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import login from '../assets/js/login.js';
export default login;
</script>

<style scoped>
 .a{
     border:1px solid #000;
     padding: 10px 10px 15px 15px;
    box-shadow:1px 2px 3px 4px #ccc;
 }
</style>
