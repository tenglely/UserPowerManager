<template>
            <el-dialog title="编辑菜单" :visible="$store.state.updateMenuDialog" @close="closeDialog" width="30%">
                <el-form :model="menuForm" status-icon :rules="rules" ref="menuForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="菜单类型" prop="menuContents">
                        <el-radio-group v-model="menuForm.menuContents">
                            <el-radio label="1">目录</el-radio>
                            <el-radio label="2">菜单</el-radio>
                            <el-radio label="3">功能</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="上级菜单" prop="parentMenu">
                        <!-- <el-select v-model="menuForm.parentMenu" placeholder="请选择上级菜单">
                            <el-option v-if="menuForm.menuContents == 1" label="无上级菜单" value=""></el-option>
                            <el-option v-if="menuForm.menuContents == 2" label="系统管理" value="1"></el-option>
                            <el-option v-if="menuForm.menuContents == 3" label="用户管理" value="2"></el-option>
                            <el-option v-if="menuForm.menuContents == 3" label="角色管理" value="3"></el-option>
                            <el-option v-if="menuForm.menuContents == 3" label="菜单管理" value="4"></el-option>
                        </el-select> -->
                         <el-select v-model="menuForm.parentMenu" placeholder="请选择上级菜单">
                            <el-option v-if="menuForm.menuContents == 1" label="" value=""></el-option>
                            <template v-if="menuForm.menuContents == 2">
                                <el-option v-for="(item,kk) in catalog" :key="kk" v-bind:label="item.menuName" v-bind:value="item.id"></el-option>
                            </template>
                            <template v-if="menuForm.menuContents == 3">
                                <el-option v-for="(item,akk) in menu" :key="akk" v-bind:label="item.menuName" v-bind:value="item.id"></el-option>
                            </template>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="菜单名称" prop="menuName">
                        <el-input v-model="menuForm.menuName"></el-input>
                    </el-form-item>
                    <el-form-item label="菜单标识" prop="menuIdentification">
                        <el-input v-model="menuForm.menuIdentification"></el-input>
                    </el-form-item>
                    <el-form-item label="菜单地址" prop="menuUrl">
                        <el-input v-model="menuForm.menuUrl"></el-input>
                    </el-form-item>
                    <el-form-item label="图标" prop="menuPhoto">
                        <el-input v-model="menuForm.menuPhoto"></el-input>
                    </el-form-item>
                    <el-form-item label="排序号" prop="sortNum">
                        <el-input v-model="menuForm.sortNum"></el-input>
                    </el-form-item>
                    <el-form-item label="状态" prop="menuStatus">
                        <el-radio-group v-model="menuForm.menuStatus">
                            <el-radio label="1">有效</el-radio>
                            <el-radio label="2">无效</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="备注" prop="menuRemarks">
                        <el-input type="textarea" v-model="menuForm.menuRemarks"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('menuForm')">修改</el-button>
                        <el-button @click="closeDialog()">取消</el-button>
                    </el-form-item>
                </el-form>
             </el-dialog>
</template>

<script>
import updateMenu from '../../assets/js/menu/updateMenu.js';
export default updateMenu;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .bgep{
        background-color: white;
        color:black;
    }
</style>
