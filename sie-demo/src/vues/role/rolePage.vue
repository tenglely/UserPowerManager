<template>
     <!-- 角色管理分页栏 -->
     <div class="block">
      <br>
      <el-pagination
        v-if="$store.state.rolebtcheck.searchButton"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="$store.state.roleCurrentPage"
        :page-sizes="pageSizes"
        :page-size="$store.state.rolePageSize"
        background
        layout="total, sizes, prev, pager, next"
        :total="$store.state.roleTotal">
      </el-pagination>
    </div>
</template>

<script>
import rolePage from '../../assets/js/role/rolePage.js';
export default rolePage;
</script>