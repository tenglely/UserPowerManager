<template>
    <div>
      <div align="left"><h2 style="color:Gray">菜单管理</h2></div>
      <el-row v-if="$store.state.menubtcheck.searchButton" >
        <el-col :span="4">
          <el-input
            size="medium"
            placeholder="请输入菜单名称"
            suffix-icon="el-icon-edit el-input__icon"
            v-model="menuName">
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-select size="medium" v-model="menuStatus" placeholder="请选择状态">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select size="medium" v-model="menuContents" placeholder="请选择菜单类型">
            <el-option
              v-for="item in menutype"
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
          v-if="$store.state.menubtcheck.addButton"
          @click="addMenu()">新增</el-button>
          <el-button
          type="danger"
          v-if="$store.state.menubtcheck.delButton"
          @click="deleteMore()">删除</el-button>
        </el-col> 
      </el-row>
      <TabAddMenuDialog  v-if="$store.state.addMenuDialog"/>
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
import searchMenu from '../../assets/js/menu/searchMenu.js';
export default searchMenu;
</script>