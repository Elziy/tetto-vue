<template>
    <el-header style="height: 80px;padding-top: 6px">
        <el-row type="flex" class="row-bg">
            <el-col :span="1" style="padding-left: 10px;padding-top: 6px">
                <!--<el-button type="text" icon="el-icon-s-operation" style="font-size: 20px"></el-button>-->
                <left-drawer></left-drawer>
            </el-col>

            <el-col :span="4" style="padding-top: 12px">
                <logo></logo>
            </el-col>

            <el-col :span="7" style="padding-top: 10px">
                <el-input type="text" placeholder="搜索作品" v-model="search" suffix-icon="el-icon-search">
                </el-input>
            </el-col>

            <template v-if="show">
                <el-col :span="1" :offset="5" style="padding-top: 3px">
                    <notice></notice>
                </el-col>

                <el-col :span="1" style="padding-top: 3px">
                    <email></email>
                </el-col>

                <el-col :span="2" style="padding-top: 10px;padding-left: 20px">
                    <el-button @click="upload" round>投稿</el-button>
                </el-col>

                <el-col :span="2" style="padding-left: 25px">
                    <user></user>
                </el-col>
            </template>

            <!--<el-col v-if="$store.state.auth.uid == null" :span="2" :offset="9" style="padding-top: 10px">-->
            <!--    <el-button @click="login" round>登录/注册</el-button>-->
            <!--</el-col>-->
        </el-row>
    </el-header>
</template>

<script>
import leftDrawer from "@/components/home/leftDrawer";
import logo from "@/components/common/logo";
import notice from "@/components/home/notice";
import email from "@/components/home/email";
import user from "@/components/home/user";

export default {
    name: "navbar",
    components: {
        leftDrawer,
        logo,
        notice,
        email,
        user,
    },
    data() {
        return {
            show: false,
            search: null,
        };
    },
    methods: {
        upload() {
            this.$router.push("/upload");
            // window.location.href = "/upload";
        },
        login() {
            this.$router.push("/login")
        },
    },
    beforeCreate() {
        if (this.$store.state.auth.uid == '' || this.$store.state.auth.username == '' || this.$store.state.auth.avatar == '') {
            console.log("未登录");
            this.$http.get("auth/user/info")
                    .then(res => {
                        if (res.data.code === 0) {
                            this.$store.commit("auth/SET_UID", res.data.data.uid);
                            this.$store.commit("auth/SET_USERNAME", res.data.data.username);
                            this.$store.commit("auth/SET_AVATAR", res.data.data.avatar);
                            // 防止页面没获取到数据抖动
                            setTimeout(() => {
                                this.show = true;
                            }, 100);
                        } else {
                            this.$message.error('登录已过期，请重新登录');
                            this.$router.push("/login");
                        }
                    });
        } else {
            setTimeout(() => {
                this.show = true;
            }, 8);
        }
    }
}
</script>

<style lang="less" scoped>
.el-header {
    font-size: 17px;
    overflow: hidden;
    width: 100%;

    img {
        width: 130px;
        //height: 40px;
    }
}

button:hover {
    color: #333333;
    background: #ecf5ff;
}

button:focus {
    background: #ecf5ff;
    color: #333333;
    /*opacity: 0.5;*/
}
</style>
