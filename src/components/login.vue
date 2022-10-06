<template>
    <div class="login_container">
        <div class="login_box">
            <div class="avatar_box" style="padding-top: 15px">
                <img src="../assets/logo/logo2.png" alt/>
            </div>
            <!-- 表单登录 -->
            <el-form
                    ref="LoginRef"
                    label-width="0px"
                    class="login_from"
                    :model="form_login"
                    :rules="loginFormRules"
            >
                <el-form-item prop="email">
                    <el-input placeholder="请输入您的邮箱" prefix-icon="el-icon-user"
                              v-model="form_login.email"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                            placeholder="请输入密码"
                            prefix-icon="el-icon-lock"
                            v-model="form_login.password"
                            type="password"
                            @keyup.enter.native="login"
                    ></el-input>
                </el-form-item>

                <el-form-item class="btns">
                    <el-button type="primary" @click="login" round>登录</el-button>
                    <el-button type="info" @click="register" round>注册</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
    data() {
        return {
            form_login: {
                email: "lzy@163.com",
                password: "123456"
            },
            loginFormRules: {
                email: [
                    {required: true, message: "请输入您的邮箱", trigger: "blur"},
                    {
                        type: 'email',
                        message: '请输入正确的邮箱地址',
                        trigger: ['blur', 'change'],
                    },
                ],
                password: [
                    {required: true, message: "请输入密码", trigger: "blur"},
                    {min: 6, max: 15, message: "密码长度在 6 到 15 个字符", trigger: "blur"}
                ]
            }
        };
    },
    methods: {
        ...mapActions('auth', {Login: 'login'}),
        register() {
            this.$router.replace('/register')
        },
        login() {
            // this.$router.push("/home")
            this.$refs.LoginRef.validate(async valid => {
                if (!valid) return;
                this.$http.post("auth/user/login", this.form_login)
                        .then(response => {
                                    if (response.data.code === 0) {
                                        let userInfo = response.data.data;
                                        let username = userInfo.username
                                        this.Login(userInfo);
                                        this.$message.success(username + '  登录成功')
                                        this.$router.push("/")
                                    } else if (response.data.code === 401) {
                                        this.$message.error("账号或密码错误！");
                                    } else {
                                        this.$message.error("服务器异常,请稍后重试");
                                    }
                                },
                                error => {
                                    this.$message.error('网络异常,请稍后重试');
                                    return false;
                                }
                        );
            });
        },
    },
    beforeCreate() {
        if (this.$store.state.auth.uid !== '' && this.$store.state.auth.avatar !== '' && this.$store.state.auth.username !== '' && this.$store.state.auth.token !== '') {
            this.$router.push('/')
        }
        this.$store.commit('auth/SET_TOKEN', '');
        this.$store.commit('auth/SET_UID', '');
        this.$store.commit('auth/SET_USERNAME', '');
        this.$store.commit('auth/SET_AVATAR', '');
    }
};
</script>

<style lang="less" scoped>
.login_container {
    // background-color: rgb(43, 95, 173);
    height: 100%;
    background-image: url('../assets/images/login.jpg');
    background-size: cover;
    background-position: 0 60%;
}

.login_box {
    // background-color: white;
    background: rgba(255, 255, 255, 0.8);
    height: 350px;
    width: 460px;
    // border-radius: 7px;
    border: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .avatar_box {
        //width: 100px;
        //height: 100px;
        border-radius: 50%;
        margin: 0 auto;
        //border: 2px solid white;
        // box-shadow: white;
        position: absolute;
        //left: 5%;
        //transform: translate(-50%, -50%);
        text-align: center;

        img {
            height: 60%;
            width: 60%;
            border-radius: 50%;
            //transform: scale(1);
        }
    }
}

.login_from {
    position: absolute;
    bottom: 30px;
    width: 80%;
    left: 50%;
    transform: translate(-50%);
}

.btns {
    display: flex;
    justify-content: center;
    margin-top: 50px;
}

.el-button.is-round {
    border-radius: 20px;
    padding: 12px 50px;
}

.el-button + .el-button {
    margin-left: 30px;
}
</style>
