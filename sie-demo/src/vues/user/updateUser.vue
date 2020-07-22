<template>
            <el-dialog title="编辑用户" :visible="$store.state.updateUserDialog" @close="closeDialog" width="30%">
                <el-form :model="userForm" status-icon :rules="rules" ref="userForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="userForm.username"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="userForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="userForm.password" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkPassword">
                        <el-input @input="change($event)" type="password" v-model="userForm.checkPassword" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="sex">
                        <el-select v-model="userForm.sex" placeholder="请选择性别">
                            <el-option label="男" value="男"></el-option>
                            <el-option label="女" value="女"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="联系电话" prop="userPhone">
                        <el-input v-model="userForm.userPhone" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="userForm.email" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="状态" prop="userStatus">
                        <el-radio-group v-model="userForm.userStatus">
                            <el-radio label="1">有效</el-radio>
                            <el-radio label="2">无效</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="备注" prop="userRemarks">
                        <el-input type="textarea" v-model="userForm.userRemarks"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="submitForm('userForm')">修改</el-button>
                        <el-button @click="closeDialog()">取消</el-button>
                    </el-form-item>
                </el-form>
             </el-dialog>
</template>

<script>
import updateUser from '../../assets/js/user/updateUser.js';
export default updateUser;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
