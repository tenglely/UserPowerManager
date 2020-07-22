<template>
<div>
    <el-table
    v-if="$store.state.userbtcheck.searchButton"
    ref="multipleTable"
    :data="$store.state.userTableData"
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
      label="序号">
    </el-table-column>
    <el-table-column
      prop="username"
      label="用户名"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="sex"
      label="性别"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="userPhone"
      label="联系电话"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="email"
      label="邮箱"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      label="创建时间"
      width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ time(scope.row.createTime) }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="最后修改时间"
      width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ time(scope.row.updateTime) }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="状态"
      width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.userStatus===1?'有效':'无效' }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="300" fixed="right">
      <template slot-scope="scope">
        <el-button
          size="mini"
          v-if="$store.state.userbtcheck.updateButton"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          v-if="$store.state.userbtcheck.delButton"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
         <el-button
          size="mini"
          v-bind:type="scope.row.userStatus == 1?'success':'info'"
          v-if="$store.state.userbtcheck.updateStatus"
          @click="updateStatusDialog(scope.$index, scope.row)">{{{1: '有效', 2:'无效'}[scope.row.userStatus]}}</el-button>
        <el-button
          size="mini"
          v-if="$store.state.userbtcheck.setRoleButton"
          @click="setRole(scope.$index, scope.row)">设置角色</el-button>
      </template>
    </el-table-column>
  </el-table>
   <!-- 设置角色弹窗 -->
   <TabSetRoleDialog v-if="$store.state.setRoleDialog"/>
   <!-- 编辑用户弹窗 -->
    <TabUpdateUserDialog v-if="$store.state.updateUserDialog"/>
   <!--删除的弹窗 -->
    <el-dialog
      title="提示"
      :visible.sync="delDialog"
      width="30%" 
      center>
      <span>是否删除序号{{delData}}的数据？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delDialog = false">取 消</el-button>
        <el-button type="primary" @click="deleteUser()">确 定</el-button>
      </span>
    </el-dialog>
  <!--修改状态的弹窗 -->
    <el-dialog
      title="提示"
      :visible.sync="statusDialog"
      width="30%"
      center>
      <span>是否修改状态？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="statusDialog = false">取 消</el-button>
        <el-button type="primary" @click="updateStatusTo()">确 定</el-button>
      </span>
    </el-dialog>
</div>
</template>

<script>
import tableUser from '../../assets/js/user/tableUser.js';
export default tableUser;
</script>