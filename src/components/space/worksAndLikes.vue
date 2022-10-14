<template>
    <el-tabs v-model="activeName" type="card" @tab-click="tabClick" :before-leave="before">
        <el-tab-pane label="作品" name="works">
            <user-works></user-works>
        </el-tab-pane>
        <el-tab-pane v-if="$store.state.space.self" label="收藏" name="likes">
            <user-likes empty="暂无收藏"></user-likes>
        </el-tab-pane>
        <!--<el-tab-pane v-if="$store.state.space.self" label="浏览历史" name="histories">-->
        <!--    <user-likes empty="暂无历史"></user-likes>-->
        <!--</el-tab-pane>-->
        <br>
    </el-tabs>
</template>

<script>
import userWorks from "@/components/space/userWorks";
import userLikes from "@/components/space/userLikes";

export default {
    name: "works",
    components: {
        userWorks,
        userLikes
    },
    data() {
        return {
            activeName: 'works',
            likeNum: 10,
            historyNum: 20,
            scrollNum: null
        };
    },
    methods: {
        before() {
            this.scrollNum = document.documentElement.scrollTop || document.body.scrollTop
            console.log(this.scrollNum)
        },
        tabClick(tab, event) {
            // 切换后保持滚动位置
            if (this.scrollNum !== null && this.scrollNum > 0) {
                //确保移动端和pc端都能正确的设置位置
                document.documentElement.scrollTop = this.scrollNum
                document.body.scrollTop = this.scrollNum
                console.log(this.scrollNum)
            }
        }
    },
}
</script>

<style scoped>

</style>
