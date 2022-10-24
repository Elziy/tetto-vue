<template>
    <div v-if="show">
        <!--封面-->
        <div style="height: 180px;width: 100%">
            <div class="userInfo-bg-img" style="background: #fafafa"></div>
            <!--<img class="userInfo-bg-img" src="@/assets/images/board.png" alt="">-->
        </div>
        <el-main>
            <!--用户信息-->
            <user-info></user-info>
        </el-main>
        <!--作品和收藏-->
        <div class="container">
            <works-and-likes></works-and-likes>
        </div>
    </div>
</template>

<script>
import navbar from "@/components/common/navbar";
import userInfo from "@/components/space/userInfo";
import worksAndLikes from "@/components/space/worksAndLikes";

export default {
    name: "space",
    components: {
        navbar,
        userInfo,
        worksAndLikes
    },
    data() {
        return {
            show: false,
            scrollNum: null
        };
    },
    beforeCreate() {
        let uid = this.$route.params.uid;
        this.$store.dispatch("space/setUserInfo", uid);
        setTimeout(() => {
            this.show = true;
        }, 40);
    },
    beforeRouteLeave(to, from, next) {
        this.scrollNum = document.documentElement.scrollTop || document.body.scrollTop
        next();
    },
    activated() {
        let uid = this.$route.params.uid;
        this.$store.dispatch("space/setUserInfo", uid);
        setTimeout(() => {
            this.show = true;
        }, 60);
        //组件激活时，将离开组件是记录的页面位置赋值
        if (this.scrollNum !== null && this.scrollNum > 0) {
            //确保移动端和pc端都能正确的设置位置
            document.documentElement.scrollTop = this.scrollNum
            document.body.scrollTop = this.scrollNum
        }

    }
};
</script>

<style scoped>
.userInfo-bg-img {
    height: 120%;
    width: 100%;
    object-fit: cover;
}

</style>
