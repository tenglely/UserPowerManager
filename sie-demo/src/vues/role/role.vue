<template>
  <div>
    <div>
      <!-- 角色搜索栏一列 -->
      <TabRoleSearch />
    </div><br>
    <!-- 角色表格 -->
    <TabRoleTable />
    <!-- 分页栏 -->
    <TabRolePage />
   
  </div>
</template>

<script>
import role from '../../assets/js/role/role.js';
export default role;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
