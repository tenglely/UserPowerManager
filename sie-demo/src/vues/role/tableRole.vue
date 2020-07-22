<template>
    <div>
    <el-table
      ref="multipleTable"
      v-if="$store.state.rolebtcheck.searchButton"
      :data="$store.state.roleTableData"
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
        width="80">
      </el-table-column>
      <el-table-column
        prop="roleCode"
        label="角色编码"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色名称"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label="生效日期"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ time(scope.row.startTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="失效日期"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ time(scope.row.overTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="状态"
        width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.roleStatus===1?'有效':'无效' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            v-if="$store.state.rolebtcheck.updateButton"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            v-if="$store.state.rolebtcheck.delButton"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          <el-button
            size="mini"
            v-if="$store.state.rolebtcheck.setRolePowerButton"
            @click="handleAddRolePermissions(scope.$index, scope.row)">设置角色权限</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 设置角色权限弹窗 -->
    <TabRolePermissionsDialog v-if="$store.state.rolePermissionsDialog"/>
    <!-- 编辑角色弹窗 -->
    <TabUpdateRoleDialog v-if="$store.state.updateRoleDialog" />
    <!--删除的弹窗 -->
    <el-dialog
      title="提示"
      :visible.sync="delDialog"
      width="30%"
      center>
      <span>是否删除序号{{delData}}的数据？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delDialog = false">取 消</el-button>
        <el-button type="primary" @click="deleteRole()">确 定</el-button>
      </span>
    </el-dialog>
</div>
</template>

<script>
import tableRole from '../../assets/js/role/tableRole.js';
export default tableRole;
</script>