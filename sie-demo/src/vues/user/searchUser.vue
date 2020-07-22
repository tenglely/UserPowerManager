<template>
    <div>
       <div align="left"><h2 style="color:Gray">用户管理</h2></div>
       <el-row :gutter="20" v-if="$store.state.userbtcheck.searchButton">
        <!-- 用户管理的搜索栏 -->
        <el-col :span="4">
          <el-input
            size="medium"
            placeholder="请输入用户名"
            suffix-icon="el-icon-edit el-input__icon"
            v-model="username">
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-input
            size="medium"
            placeholder="请输入姓名"
            suffix-icon="el-icon-edit el-input__icon"
            v-model="name">
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-select size="medium" v-model="userStatus" placeholder="请选择状态">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="5">
          <el-date-picker
            size="medium"
            value-format="yyyy-MM-dd"
            v-model="datavalue"
            type="daterange"
            start-placeholder="(创建)开始日期"
            end-placeholder="结束日期"
            >
          </el-date-picker>
        </el-col>    
        <el-col :span="6">
          <el-button type="primary"
          @click="search()">查询</el-button>
          <el-button v-if="$store.state.userbtcheck.addButton"
          @click="addUser()">新增</el-button>
          <el-button
          type="danger" v-if="$store.state.userbtcheck.delButton"
          @click="deleteMore()">删除</el-button>
        </el-col> 
      </el-row>
      <TabAddUserDialog />
       <!--批量删除的弹窗 -->
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
    </div>
</template>

<script>
import searchUser from '../../assets/js/user/searchUser.js';
export default searchUser;
</script>