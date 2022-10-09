<template>
    <div v-if="show">
        <navbar></navbar>
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
    name: "index",
    components: {
        navbar,
        userInfo,
        worksAndLikes
    },
    data() {
        return {
            show: false,
        };
    },
    beforeCreate() {
        this.uid = this.$route.params.uid;
        this.$store.dispatch("space/setUserInfo", this.uid);
        setTimeout(() => {
            this.show = true;
        }, 20);
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
