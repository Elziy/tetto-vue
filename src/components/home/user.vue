<template>
    <el-dropdown @command="handleCommand" trigger="click">
        <el-button round class="row" size="mini" type="text">
            <img class="face" src="@/assets/images/face.jpg" alt="face"/>
            <!--<span style="font-size: 15px;color: black;font-weight: bold">takagi</span>-->
            <i class="el-icon-arrow-down" style="font-size: 20px;color: black;"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
            <!--<el-dropdown-item>-->
            <!--    <img class="face1" src="@/assets/images/face.jpg" alt="face"/>-->
            <!--</el-dropdown-item>-->
            <!--<el-dropdown-item>takagi</el-dropdown-item>-->
            <!--<el-dropdown-item><span style="font-size: 10px">@takagi</span></el-dropdown-item>-->
            <el-dropdown-item command="account" icon="el-icon-user">个人中心</el-dropdown-item>
            <el-dropdown-item command="logout" icon="el-icon-switch-button" divided>退出登录</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
export default {
    name: "user",
    methods: {
        handleCommand(command) {
            if (command === 'logout') {
                this.logout();
            }
            if (command === 'account') {
                this.$router.push("/space")
            }
        },
        logout() {
            this.$router.push("/login")
            this.$message.success("注销成功")
        },
    },
}
</script>

<style scoped>
.face {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    align-items: center;
}

.face1 {
    width: 60px;
    height: 60px;
    border-radius: 50%;
}

.button:hover {
    color: #333333;
}
</style>
