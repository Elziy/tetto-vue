<template>
    <el-form ref="form" :model="form" label-width="60px" label-position="top" size="medium">
        <el-form-item>
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

        <el-form-item>
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
            <el-button type="primary" @click="onSubmit">保存修改</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    name: "userInfoChangeForm",
    data() {
        return {
            form: {
                id: this.$store.state.auth.uid,
                username: this.$store.state.space.userInfo.username,
                introduce: this.$store.state.space.userInfo.introduce,
                sex: this.$store.state.space.userInfo.sex,
                email: this.$store.state.space.userInfo.email,
                birthday: this.$store.state.space.userInfo.birthday
            }
        }
    },
    methods: {
        onSubmit() {
            this.$http.post('auth/user/update', this.form).then(res => {
                        if (res.data.code === 0) {
                            this.$store.dispatch('space/setUserInfo', this.$store.state.auth.uid);
                            this.$store.commit('auth/SET_UID', this.form.id);
                            this.$store.commit('auth/SET_USERNAME', this.form.username);
                            this.$message.success('修改成功');
                        } else {
                            this.$message.error('修改失败');
                        }
                    },
                    error => {
                        this.$message.error('修改失败');
                    });

        }
    },
}
</script>

<style scoped>

</style>
