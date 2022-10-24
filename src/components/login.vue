<template>
    <main>
        <img style="width: 130px;position: absolute;top: 15px;left: 30px" src="@/assets/logo/logo2.png" alt="logo">
        <div class="box">
            <div class="inner-box">
                <div class="forms-wrap">
                    <form class="sign-in-form" autocapitalize="off">
                        <div class="logo">
                            <img src="@/assets/logo/logo2.png" alt="">
                        </div>

                        <!--<div class="heading" style="text-align: center">-->
                        <!--    <h2>欢迎回来</h2>-->
                        <!--</div>-->

                        <div class="actual-form">
                            <div class="input-wrap">
                                <input @focus="focus" @blur="blur" @change="checkEmail(form.email)" type="text"
                                       minlength="6"
                                       class="input-field"
                                       v-model="form.email"
                                       required>
                                <!--<i class="el-icon-message"></i>-->
                                <label for="email">邮箱</label>
                                <div style="padding-top: 2rem">
                                    <span style="color: #f56c6c">{{ error.email }}</span>
                                </div>
                            </div>

                            <div class="input-wrap">
                                <input @focus="focus" @blur="blur"
                                       @change="checkPassword(form.password)"
                                       type="password"
                                       minlength="6"
                                       class="input-field"
                                       v-model="form.password"
                                       required>
                                <!--<i class="el-icon-key"></i>-->
                                <label>密码</label>
                                <div style="padding-top: 2rem">
                                    <span style="color: #f56c6c">{{ error.password }}</span>
                                </div>
                            </div>


                            <el-button :disabled="disabled" class="sign-btn" @click="login" v-html="name">登录
                            </el-button>

                            <!--<p class="text">忘记账号或密码？</p>-->
                            <div class="heading" style="text-align: right">
                                <h6>还没有注册账号？</h6>
                                <a href="javascript:;" @click="register" class="toggle">点击注册</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import {mapActions} from "vuex";

export default {
    data() {
        return {
            disabled: false,
            name: '登录',
            form: {
                email: "lzy@163.com",
                password: "123456"
            },
            error: {
                email: "",
                password: ""
            }
        };
    },
    methods: {
        ...mapActions('auth', {Login: 'login'}),
        register() {
            this.$router.replace('/register')
        },
        login() {
            // 验证
            if (this.checkEmail(this.form.email) && this.checkPassword(this.form.password)) {
                this.disabled = true;
                this.name = '登陆中<i class="el-icon-loading"></i>';
                this.$http.post("auth/user/login", this.form)
                        .then(response => {
                                    if (response.data.code === 0) {
                                        let userInfo = response.data.data;
                                        let username = userInfo.username
                                        this.Login(userInfo);
                                        window.location.href = "/";
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
                setTimeout(() => {
                    this.disabled = false;
                    this.name = '登录';
                }, 1000)
            } else {
                this.$message.warning("请输入正确的邮箱");
            }
        },
        validEmail(email) {
            let reg = /^\w+@[\da-z\.-]+\.([a-z]{2,6}|[\u2E80-\u9FFF]{2,3})$/;
            return reg.test(email);
        },
        checkEmail(value) {
            if (value === '') {
                this.error.email = '邮箱不能为空'
                return false
            } else {
                if (!this.validEmail(value)) {
                    this.error.email = '请输入正确的邮箱'
                    return false
                } else {
                    this.error.email = ''
                    return true
                }
            }
        },
        checkPassword(value) {
            if (value === '') {
                this.error.password = '密码不能为空'
                return false
            } else {
                if (value.length < 6) {
                    this.error.password = '密码不能小于6位'
                    return false
                } else {
                    this.error.password = ''
                    return true
                }
            }
        },
        focus(event) {
            event.target.classList.add("active");
            this.error.email = ''
            this.error.password = ''
        },
        blur(event) {
            if (event.target.value !== '') return;
            event.target.classList.remove("active");
        }
    },
    beforeCreate() {
        this.$store.commit('defaultStore/setShowNav', false);
        if (this.$store.state.auth.uid !== '' && this.$store.state.auth.avatar !== '' && this.$store.state.auth.username !== '' && this.$store.state.auth.token !== '') {
            window.location.href = '/'
        } else {
            this.$store.commit('auth/SET_TOKEN', '');
            this.$store.commit('auth/SET_UID', '');
            this.$store.commit('auth/SET_USERNAME', '');
            this.$store.commit('auth/SET_AVATAR', '');
        }
    },
    mounted() {
        if (this.form.email !== '' || this.form.password !== '') {
            const inputs = document.querySelectorAll(".input-field");
            inputs.forEach(input => {
                input.classList.add("active");
            });
        }
    }
};
</script>

<style scoped>
*,
*::before,
*::after {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

body,
input {
    font-family: "Poppins", sans-serif;
}

main {
    height: 100%;
    background-size: cover;
    background-position: 0 60%;
    background-image: url("../assets/images/login.jpg");
    width: 100%;
    min-height: 100vh;
    overflow: hidden;
    padding: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.box {
    position: relative;
    width: 100%;
    max-width: 500px;
    height: 563px;
    background-color: rgba(255, 255, 255, 0.95);
    border-radius: 1.4rem;
    box-shadow: 0 60px 40px -30px rgba(0, 0, 0, 0.27);
}

.inner-box {
    position: absolute;
    width: calc(100% - 4.1rem);
    height: calc(100% - 4.1rem);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.forms-wrap {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    transition: 0.8s ease-in-out;
}

form {
    max-width: 350px;
    width: 100%;
    margin: 0 auto;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    grid-column: 1 / 2;
    grid-row: 1 / 2;
    transition: opacity 0.02s 0.4s;
}

form.sign-up-form {
    opacity: 0;
    pointer-events: none;
}

.logo {
    display: flex;
    justify-content: center;
    padding-top: 1rem;
}

.logo img {
    width: 85%;
    border-radius: 50%;
}

.logo h4 {
    font-size: 1.1rem;
    margin-top: -9px;
    letter-spacing: -0.5px;
    color: #151111;
}


.heading h2 {
    font-size: 1.8rem;
    font-weight: 600;
    color: #151111;
}

.heading h6 {
    color: #bababa;
    font-weight: 400;
    font-size: 0.65rem;
    display: inline;
}

.toggle {
    color: #151111;
    text-decoration: none;
    font-size: 0.65rem;
    font-weight: 500;
    transition: 0.3s;
}

.toggle:hover {
    color: #3996fb;
    text-decoration: none;
}

.input-wrap {
    position: relative;
    height: 37px;
    margin-bottom: 2rem;
}

.input-field {
    position: absolute;
    width: 100%;
    height: 100%;
    background: none;
    border: none;
    outline: none;
    border-bottom: 1px solid #bbb;
    padding: 0;
    font-size: 0.95rem;
    color: #151111;
    transition: 0.4s;
}

label {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    font-size: 0.9rem;
    color: #bbb;
    pointer-events: none;
    transition: 0.4s;
}

.input-field.active {
    border-bottom-color: #151111;
}

.input-field.active + label {
    font-size: 0.7rem;
    top: -0.35rem;
}

.sign-btn {
    display: inline-bLock;
    width: 100%;
    height: 43px;
    background-coLor: #3996fb;
    color: #fff;
    border: none;
    cursor: pointer;
    border-radius: 0.8rem;
    font-size: 0.8rem;
    margin-bottom: 2rem;
    transition: 0.3s;
}

.sign-btn:hover {
    background-color: rgb(0, 144, 240, 0.80);
}

.text {
    color: #bbb;
    font-size: 0.7rem;
}

.text a {
    color: #bbb;
    transition: 0.3s;
}

.text a:hover {
    color: #3286e1;
    text-decoration: none;
}
</style>
