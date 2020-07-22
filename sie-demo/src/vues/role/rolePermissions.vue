<template>
    <div>
    <!-- <el-row :gutter="20">
        <el-col :span="2">
            <el-button @click="goBack()" type="primary">返回上一级</el-button>
        </el-col>
    </el-row><br> -->
    <el-dialog title="设置角色" :visible="$store.state.rolePermissionsDialog" @close="closeDialog" width="40%">
        <div>
            <el-row :gutter="20">
                <el-col >
                    <el-row :gutter="10">
                        <el-col :span="8"><span style="color:red">*</span><span class="ff">角色名称:</span></el-col>
                        <el-col :span="8">
                            <el-input
                                placeholder="请输入内容"
                                :disabled="true"
                                v-model="role.roleName">
                            </el-input>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row><br>
            <el-row :gutter="20">
                <el-col >
                    <el-row :gutter="10">
                        <el-col :span="8"><span style="color:red">*</span><span class="ff">设置权限名称:</span></el-col>
                        <el-col :span="16">
                            <el-tree
                                :data="data"
                                show-checkbox
                                default-expand-all
                                :default-checked-keys="powers"
                                node-key="id"
                                ref="tree"
                                highlight-current
                                :props="defaultProps">
                            </el-tree>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </div>
        <br>
        <div class="buttons">
            <el-button @click="getCheckedKeys">提交设置</el-button>
            <el-button @click="resetChecked">清空</el-button>
        </div>
    </el-dialog>
    </div>
</template>

<script>
import rolePermissions from '../../assets/js/role/rolePermissions.js';
export default rolePermissions;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .bgep{
        background-color: white;
        color:black;
    }
    .ff{
        font-size: 20px;
    }
</style>
