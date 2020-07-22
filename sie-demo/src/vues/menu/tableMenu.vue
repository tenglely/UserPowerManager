<template>
    <div>
    <el-table
      v-if="$store.state.menubtcheck.searchButton" 
      ref="multipleTable"
      :data="$store.state.menuTableData"
      stripe
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      
      <el-table-column
        prop="id"
        label="序号"
         width="100">
      </el-table-column>
      <el-table-column
        prop="menuName"
        label="菜单名称"
        width="100">
      </el-table-column>

      <el-table-column
        label="上级菜单"
        width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{{1:'系统管理',2: '用户管理', 3:'角色管理',4:'菜单管理'}[scope.row.parentMenu]}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="菜单类型"
        width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{{1: '目录', 2:'菜单',3:'功能'}[scope.row.menuContents]}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="menuIdentification"
        label="菜单标识"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="menuUrl"
        label="菜单地址"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="menuPhoto"
        label="图标"
        show-overflow-tooltip>
      </el-table-column>
       <el-table-column
        prop="sortNum"
        label="排序号"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label="状态"
        width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.menuStatus===1?'有效':'无效' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            v-if="$store.state.menubtcheck.updateButton"
            @click="handleEdit(scope.$index, scope.row)">修改</el-button>
          <el-button
            size="mini"
            type="danger"
            v-if="$store.state.menubtcheck.delButton"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑菜单的弹窗 -->
    <TabUpdateMenuDialog  v-if="$store.state.updateMenuDialog"/>
    <!--删除的弹窗 -->
    <el-dialog
      title="提示"
      :visible.sync="delDialog"
      width="30%"
      center>
      <span>是否删除序号{{delData}}的数据？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delDialog = false">取 消</el-button>
        <el-button type="primary" @click="deleteMenu()">确 定</el-button>
      </span>
    </el-dialog>
    </div>
</template>

<script>
import tableMenu from '../../assets/js/menu/tableMenu.js';
export default tableMenu;
</script>