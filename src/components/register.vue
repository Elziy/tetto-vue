<template>
    <div class="login_container" style="padding-bottom: 20px">
        <div class="login_box" style="text-align: center">
            <h1 style="padding-bottom: 40px">欢迎注册</h1>
            <el-form
                    :model="addForm"
                    :rules="addFormRules"
                    ref="addFormRef"
                    class="demo-ruleForm"
                    title="注册">
                <el-form-item prop="email">
                    <el-input prefix-icon="el-icon-message" v-model="addForm.email" placeholder="请输入您的邮箱"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input prefix-icon="el-icon-lock" type="password" v-model="addForm.password"
                              placeholder="请输入密码"></el-input>
                </el-form-item>
                <hr>
                <el-button round type="info" @click="login">返回登录</el-button>
                <el-button round type="primary" @click="addUser">注 册</el-button>
            </el-form>
            <hr>
            <span slot="footer" class="dialog-footer" style="padding-bottom: 20px">

      </span>
        </div>
    </div>
</template>
<script>
import axios from "axios";

export default {
    data() {
        return {
            addForm: {
                password: '',
                email: '',
            },
            addFormRules: {
                password: [
                    {required: true, message: '请输入密码', trigger: 'blur'},
                    {
                        min: 6,
                        max: 15,
                        message: '长度在 6 到 15 个字符',
                        trigger: 'blur',
                    },
                ],
                email: [
                    {required: true, message: '请输入邮箱地址', trigger: 'blur'},
                    {
                        type: 'email',
                        message: '请输入正确的邮箱地址',
                        trigger: ['blur', 'change'],
                    },
                ]
            },
        }
    },
    methods: {
        login() {
            this.$router.push("/login")
        },
        addUser() {
            //先进行校验
            this.$refs.addFormRef.validate(async (valid) => {
                if (!valid) return
                axios.post("http://192.168.31.243:88/api/auth/user/register", this.addForm)
                        .then(response => {
                                    if (response.data.code === 0) {
                                        this.$message.success("注册成功");
                                        this.$router.push("/login")
                                    } else if (response.data.code === 150001) {
                                        this.$message.error("该邮箱已被注册");
                                    } else {
                                        this.$message.error("网络异常,请稍后重试");
                                    }
                                },
                                error => {
                                    this.$message({
                                        message: error.message,
                                        type: "error"
                                    });
                                    return false;
                                }
                        );
            })
        },
    },
}
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
    background: rgba(255, 255, 255, 0.8);
    width: 460px;
    border: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 50px;
    padding-bottom: 10px;
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
