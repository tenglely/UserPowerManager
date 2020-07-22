<template>
    <div class="block">
      <br>
      <el-pagination
        v-if="$store.state.menubtcheck.searchButton"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="$store.state.menuCurrentPage"
        :page-sizes="pageSizes"
        :page-size="$store.state.menuPageSize"
        background
        layout="total, sizes, prev, pager, next"
        :total="$store.state.menuTotal">
      </el-pagination>

    </div>
</template>

<script>
import menuPage from '../../assets/js/menu/menuPage.js';
export default menuPage;
</script>