<template>
  <div id="app" >
    <!-- <router-link to="/home">主页</router-link><br>
    <router-link to="/hello">欢迎页</router-link> -->
   <router-view></router-view>
    <!-- <Login></Login> -->
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
      
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 850px;
}
</style>
