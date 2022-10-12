<template>
    <el-dropdown @command="handleCommand" trigger="click">
        <el-button round class="row" size="mini" type="text">
            <el-avatar class="face" :src="avatar" alt="avatar">
                <el-avatar icon="el-icon-user-solid"></el-avatar>
            </el-avatar>
        </el-button>
        <el-dropdown-menu slot="dropdown">
            <div style="text-align: center">
                <el-avatar class="face1" :src="avatar" alt="avatar">
                    <el-avatar style="padding-top: 10px" icon="el-icon-user-solid"></el-avatar>
                </el-avatar>
            </div>
            <div style="padding-top: 10px;padding-left: 20px">
                <span style="height: 20px">{{ username }}</span>
            </div>
            <el-dropdown-item command="space" icon="el-icon-user" divided>个人中心</el-dropdown-item>
            <el-dropdown-item command="logout" icon="el-icon-switch-button" divided>退出登录</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
import {mapState} from "vuex";

export default {
    name: "user",
    computed: {
        ...mapState('auth', ['uid', 'username', 'avatar']),
    },
    methods: {
        handleCommand(command) {
            if (command === 'logout') {
                this.logout();
            }
            if (command === 'space') {
                // window.location.href = '/space/' + this.uid;
                this.$router.push('/space/' + this.uid);
            }
        },
        logout() {
            this.$http.get('auth/user/logout').then(res => {
                if (res.data.code === 0) {
                    this.$store.dispatch('auth/logout');
                    this.$router.push('/login');
                    this.$message.success('注销成功');
                } else if (res.data.code === 401) {
                    this.$store.dispatch('auth/logout');
                    this.$router.push('/login');
                    this.$message.success('注销成功');
                } else {
                    this.$message.error('注销失败');
                }
            }, err => {
                this.$message.error('注销失败');
            });
        },
    },
};
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

/*.button:hover {*/
/*    color: #333333;*/
/*}*/
</style>
