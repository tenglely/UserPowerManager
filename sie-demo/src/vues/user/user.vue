<template>
  <div>
    <div>
      <!-- 用户管理的搜索栏一列 -->
      <TabsearchUser />
    </div><br>
  <!-- 用户表格 -->
  <TabUserTable />
  <!-- 分页栏 -->
  <TabUserPage />
  </div>
</template>

<script>
import user from '../../assets/js/user/user.js';
export default user;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
