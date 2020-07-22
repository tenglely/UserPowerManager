<template>
  <div class="home">
    <el-container>
        <!--侧栏 -->
        <TabAside v-bind:second="second" />
        <el-container>
            <!-- 顶部 -->
            <el-header>
                <TabTop v-bind:username="user.username" />
            </el-header>
            <!-- 中间 -->
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>

  </div>
</template>

<script>
import homejs from '../../assets/js/home.js';
export default homejs;

</script>
<style scoped>
@import '../../assets/css/home.css';
</style>
