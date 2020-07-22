<template>
  <div>
    <el-dialog title="设置角色" :visible="$store.state.setRoleDialog" @close="closeDialog" width="60%">
    <el-row :gutter="20">
        <el-col :span="24">
            <el-row>
                <el-col :span="2"><span style="color:red">*</span><span>用户名:</span></el-col>
                <el-col :span="22">
                    <el-input v-model="user.username" :disabled="true"></el-input>
                </el-col>
            </el-row>
        </el-col>
    </el-row><br>
    <el-row :gutter="20">
        <el-col :span="24">
            <el-row>
                <el-col :span="2"><span style="color:red">*</span><span>设置角色:</span></el-col>
                <el-col :span="22">
                     <el-table
                        ref="multipleTable"
                        :data="tableData"
                        stripe
                        tooltip-effect="dark"
                        @selection-change="handleSelectionChange"
                        style="width: 100%">
                        <el-table-column
                        type="selection"
                        width="55"></el-table-column>
                       
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
                    </el-table>
                </el-col>
            </el-row>
        </el-col>
    </el-row>

    <br><br>
    <el-row :gutter="20">
        <el-col :span="24" center>
            <el-button @click="updateUser()" type="primary">提交</el-button>

            <el-button @click="clear()">清空</el-button>
        </el-col>
    </el-row><br>
    </el-dialog>
  </div>
</template>

<script>
import setRole from '../../assets/js/user/setRole.js';
export default setRole;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
     .bgep{
        background-color: white;
        color:black;
    }
</style>
