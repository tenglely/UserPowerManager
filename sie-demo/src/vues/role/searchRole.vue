<template>
    <div>
      <div align="left"><h2 style="color:Gray">角色管理</h2></div>
      <el-row :gutter="20" v-if="$store.state.rolebtcheck.searchButton">
         <el-col :span="4">
          <el-input
            size="medium"
            placeholder="请输入角色名称"
            suffix-icon="el-icon-edit el-input__icon"
            v-model="roleName">
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-select size="medium" v-model="roleStatus" placeholder="请选择状态">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-button
          type="primary"
          @click="search()">查询</el-button>
          <el-button
          v-if="$store.state.rolebtcheck.addButton"
          @click="addRole()">新增</el-button>
          <el-button
          type="danger"
          v-if="$store.state.rolebtcheck.delButton"
          @click="deleteMore()">删除</el-button>
        </el-col>
        <el-col :span="10">
        </el-col> 
      </el-row>
      <!-- 添加角色 -->
      <TabAddRoleDialog v-if="$store.state.addRoleDialog" />
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
import searchRole from '../../assets/js/role/searchRole.js';
export default searchRole;
</script>