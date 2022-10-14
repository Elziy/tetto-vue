<template>
    <main>
        <div class="box">
            <div class="inner-box">
                <div class="forms-wrap">
                    <form class="sign-in-form" autocapitalize="off">
                        <div class="heading" style="text-align: center">
                            <h2>欢迎注册</h2>
                        </div>

                        <div class="actual-form" style="padding-top: 10px">
                            <div class="input-wrap">
                                <input @focus="focus" @blur="blur" @change="emailChange" type="text" minlength="6"
                                       class="input-field"
                                       v-model="form.email"
                                       required>
                                <label for="email">邮箱</label>
                                <el-button v-if="show" :disabled="disabled" @click="sendCode"
                                           style="position: absolute;right: 0;padding-top: 0.3rem;font-size: 0.7rem"
                                           type="text">发送验证码
                                </el-button>
                                <el-button v-if="!show" :disabled="true"
                                           style="position: absolute;right: 0;padding-top: 0.3rem"
                                           type="text">{{ count }}s后重新获取
                                </el-button>
                                <div style="padding-top: 2rem">
                                    <span style="color: #f56c6c">{{ error.email }}</span>
                                </div>
                            </div>

                            <div class="input-wrap">
                                <input @focus="focus" @blur="blur" @change="checkPassword(form.password)"
                                       type="password"
                                       minlength="6"
                                       class="input-field"
                                       v-model="form.password"
                                       required>
                                <label>密码</label>
                                <div style="padding-top: 2rem">
                                    <span style="color: #f56c6c">{{ error.password }}</span>
                                </div>
                            </div>

                            <div class="input-wrap">

                                <input @focus="focus" @blur="blur" @change="checkCode(form.code)" type="code"
                                       minlength="6"
                                       class="input-field"
                                       v-model="form.code"
                                       required>
                                <label>邮箱验证码</label>
                                <div style="padding-top: 2rem">
                                    <span style="color: #f56c6c">{{ error.code }}</span>
                                </div>
                            </div>

                            <el-button class="sign-btn" @click="register">点击注册</el-button>

                            <!--<button class="sign-btn">点击注册</button>-->

                            <!--<p class="text">忘记账号或密码？</p>-->
                            <div class="heading">
                                <h6>已经有账号了吗？</h6>
                                <a href="javascript:;" @click="login" class="toggle">点击登录</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </main>
</template>
<script>
import axios from "axios";

export default {
    data() {
        return {
            // 是否显示发送验证码按钮
            show: true,
            count: '',
            time: null,
            // 发送验证码按钮是否可用
            disabled: true,
            form: {
                email: '',
                password: '',
                code: ''
            },
            error: {
                email: '',
                password: '',
                code: ''
            }
        }
    },
    methods: {
        login() {
            this.$router.replace('/login')
        },
        sendCode() {
            axios.get('auth/user/code', {
                params: {
                    email: this.form.email
                }
            }).then(res => {
                if (res.data.code === 0) {
                    this.$message.success('验证码发送成功')

                    if (!this.time) {
                        this.count = 60;
                        this.show = false;
                        this.time = setInterval(() => {
                            if (this.count > 0 && this.count <= 60) {
                                this.count--;
                            } else {
                                this.show = true;
                                clearInterval(this.time);
                                this.time = null;
                            }
                        }, 1000)
                    }
                } else {
                    this.$message.error(res.data.msg);
                }
            })
        },
        register() {
            //先进行校验
            if (this.checkEmail(this.form.email) && this.checkPassword(this.form.password) && this.checkCode(this.form.code)) {
                //校验通过
                axios.post("auth/user/register", this.form)
                        .then(response => {
                                    if (response.data.code === 0) {
                                        this.$message.success("注册成功");
                                        this.$router.replace("/login")
                                    } else if (response.data.code === 150001) {
                                        this.$message.error("该邮箱已被注册");
                                    } else if (response.data.code === 150008) {
                                        this.$message.error("验证码错误");
                                    } else {
                                        this.$message.error("服务器异常,请稍后重试");
                                    }
                                },
                                error => {
                                    this.$message.error('网络异常,请稍后重试');
                                    return false;
                                }
                        );
            } else {
                this.$message.warning("请检查输入信息");
                return false;
            }
        },
        validEmail(email) {
            let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
            return reg.test(email);
        },
        validPassword(password) {
            let reg = /^(?=.*[a-z])(?=.*\d)[^]{8,16}$/;
            return reg.test(password);
        },
        validCode(code) {
            let reg = /^[0-9]{6}$/;
            return reg.test(code);
        },
        checkEmail(value) {
            if (value === '') {
                this.error.email = '邮箱不能为空'
                return false
            } else {
                if (this.validEmail(value)) {
                    return this.$http.get('auth/user/checkEmail/' + value)
                            .then((res) => {
                                if (res.data.code === 0) {
                                    this.error.email = ''
                                    return true
                                } else {
                                    this.error.email = '该邮箱已被注册'
                                    return false
                                }
                            }, (err) => {
                                this.error.email = '该邮箱已被注册'
                                return false
                            })
                } else {
                    this.error.email = '请输入正确的邮箱'
                    return false
                }
            }
        },
        checkPassword(value) {
            if (value === '') {
                this.error.password = '密码不能为空'
                return false
            } else {
                if (this.validPassword(value)) {
                    this.error.password = ''
                    return true
                } else {
                    this.error.password = '密码必须包含字母和数字，长度为8-16位'
                    return false
                }
            }
        },
        checkCode(value) {
            if (value === '') {
                this.error.code = '验证码不能为空'
                return false
            } else {
                if (this.validCode(value)) {
                    this.error.code = ''
                    return true
                } else {
                    this.error.code = '验证码长度为6位数字'
                    return false
                }
            }
        },
        focus(event) {
            event.target.classList.add("active");
            this.error.code = ''
            this.error.email = ''
            this.error.password = ''
        },
        blur(event) {
            if (event.target.value !== '') return;
            event.target.classList.remove("active");
        },
        emailChange() {
            this.disabled = !this.checkEmail(this.form.email);
        },
    },
}
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
}

.logo img {
    width: 80%;
}

.heading h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #757c80;
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
    height: 32px;
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
    font-size: 0.95rem;
    color: #bbb;
    pointer-events: none;
    transition: 0.4s;
}

.input-field.active {
    border-bottom-color: #151111;
}

.input-field.active + label {
    font-size: 0.75rem;
    top: -2px;
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
