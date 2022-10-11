<template>
    <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="作品" name="works">
            <user-works></user-works>
        </el-tab-pane>
        <el-tab-pane v-if="$store.state.space.self" label="收藏" name="likes" :lazy="true">
            <user-likes empty="暂无收藏"></user-likes>
        </el-tab-pane>
        <el-tab-pane v-if="$store.state.space.self" label="浏览历史" name="histories" :lazy="true">
            <user-likes empty="暂无历史"></user-likes>
        </el-tab-pane>
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
        };
    },
}
</script>

<style scoped>

</style>
