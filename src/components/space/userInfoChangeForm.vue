<template>
    <el-form ref="form" :model="form" :rules="rules" label-width="60px" label-position="top" size="medium">
        <el-form-item prop="username">
            <span style="color:#99a9bf;">昵称</span>
            <el-input show-word-limit maxlength="12" type="text" v-model="form.username"></el-input>
        </el-form-item>
        <!--自我介绍-->
        <el-form-item>
            <span style="color:#99a9bf;">自我介绍</span>
            <el-input :autosize="{ minRows: 2, maxRows: 6}" show-word-limit maxlength="200" type="textarea"
                      v-model="form.introduce"></el-input>
        </el-form-item>

        <el-form-item>
            <span style="color:#99a9bf;">性别</span>
            <el-radio-group v-model="form.sex" style="margin-left: 50px">
                <el-radio v-model="form.sex" label="男">男性</el-radio>
                <el-radio v-model="form.sex" label="女">女性</el-radio>
                <el-radio v-model="form.sex" label="未知">未知</el-radio>
            </el-radio-group>
        </el-form-item>

        <el-form-item prop="email">
            <span style="color:#99a9bf;">邮箱</span>
            <el-input type="text" v-model="form.email"></el-input>
        </el-form-item>

        <el-form-item>
            <span style="color:#99a9bf;">生日</span>
            <el-date-picker v-model="form.birthday" style="width: 100%;"
                            type="date"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            placeholder="选择日期">
            </el-date-picker>
            <!--<el-input type="date" v-model="form.birthday"></el-input>-->
        </el-form-item>

        <el-form-item style="text-align: center">
            <el-button :disabled="disable" type="primary" @click="onSubmit">保存修改</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import NProgress from "nprogress";

export default {
    name: "userInfoChangeForm",
    data() {
        let checkEmail = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入邮箱'));
            } else {
                if (this.validEmail(value)) {
                    this.$http.get('auth/user/checkEmail/' + value)
                            .then((res) => {
                                if (res.data.code === 0) {
                                    callback();
                                } else {
                                    callback(new Error('该邮箱已被注册'));
                                }
                            });
                } else {
                    callback(new Error('请输入正确的邮箱'));
                }
            }
        };
        return {
            disable: false,
            form: {
                id: this.$store.state.auth.uid,
                username: this.$store.state.space.userInfo.username,
                introduce: this.$store.state.space.userInfo.introduce,
                sex: this.$store.state.space.userInfo.sex,
                email: this.$store.state.space.userInfo.email,
                birthday: this.$store.state.space.userInfo.birthday
            },
            rules: {
                email: [
                    {validator: checkEmail, trigger: 'blur'}
                ],
                username: [
                    {required: true, message: '请输入昵称', trigger: 'blur'}
                ]
            }

        }
    },
    methods: {
        validEmail(email) {
            let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
            return reg.test(email);
        },
        onSubmit() {
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    NProgress.start();
                    if (this.form.email === this.$store.state.space.userInfo.email) {
                        this.form.email = null;
                    }
                    this.$http.post('auth/user/update', this.form).then(res => {
                                if (res.data.code === 0) {
                                    this.$store.dispatch('space/setUserInfo', this.$store.state.auth.uid);
                                    this.$store.commit('auth/SET_USERNAME', this.form.username);
                                    this.$message.success('修改成功');
                                    this.disable = true;
                                } else {
                                    this.$message.error('修改失败');
                                }
                            },
                            error => {
                                this.$message.error('修改失败');
                            });
                    this.form.email = this.$store.state.space.userInfo.email;
                    NProgress.done();
                } else {
                    this.$message({
                        message: '请检查输入',
                        type: 'error'
                    });
                    return false;
                }
            });
        }
    },
}
</script>

<style scoped>

</style>
