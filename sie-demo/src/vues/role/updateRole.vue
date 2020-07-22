<template>
             <el-dialog title="编辑角色" :visible="$store.state.updateRoleDialog" @close="closeDialog" width="30%">
                <el-form :model="roleForm" status-icon :rules="rules" ref="roleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="角色编码" prop="roleCode">
                        <el-input v-model="roleForm.roleCode"></el-input>
                    </el-form-item>
                    <el-form-item label="角色名称" prop="roleName">
                        <el-input v-model="roleForm.roleName"></el-input>
                    </el-form-item>
                   
                    <el-form-item label="生效日期" prop="startTime">
                        <el-col :span="24">
                            <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss" v-model="roleForm.startTime" style="width: 100%;"></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="失效日期" prop="overTime">
                        <el-col :span="24">
                            <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd 23:59:59" v-model="roleForm.overTime" style="width: 100%;"></el-date-picker>
                        </el-col>
                    </el-form-item>

                    <el-form-item label="状态" prop="roleStatus">
                        <el-radio-group v-model="roleForm.roleStatus">
                            <el-radio label="1">有效</el-radio>
                            <el-radio label="2">无效</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="备注" prop="userRemarks">
                        <el-input type="textarea" v-model="roleForm.roleRemarks"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="submitForm('roleForm')">修改</el-button>
                        <el-button @click="closeDialog()">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
</template>

<script>
import updateRole from '../../assets/js/role/updateRole.js';
export default updateRole;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .bgep{
        background-color: white;
        color:black;
    }
</style>
