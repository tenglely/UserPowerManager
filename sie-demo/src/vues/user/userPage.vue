<template>
    <!-- 用户管理的分页栏 -->
    <div class="block">
    <br>
    <el-pagination
      v-if="$store.state.userbtcheck.searchButton"
       @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="$store.state.userCurrentPage"
      :page-sizes="pageSizes"
      :page-size="$store.state.userPageSize"
      background
      layout="total, sizes, prev, pager, next"
      :total="$store.state.userTotal">
    </el-pagination>
  </div>
</template>

<script>
import userPage from '../../assets/js/user/userPage.js';
export default userPage;
</script>