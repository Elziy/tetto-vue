<template>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="作品" name="works" :lazy="true">
            <user-works></user-works>
        </el-tab-pane>
        <el-tab-pane label="收藏" name="likes" :lazy="true">
            <!--<div class="container">-->
            <!--    <el-row>-->
            <!--        <el-col :span="2" :offset="2">-->
            <!--            <div style="font-size: 20px">-->
            <!--                收藏作品-->
            <!--            </div>-->
            <!--        </el-col>-->
            <!--        <el-col :span="4" :offset="16">-->
            <!--            <div>-->
            <!--                公开-->
            <!--            </div>-->
            <!--        </el-col>-->
            <!--    </el-row>-->
            <!--</div>-->
            <user-likes :img-num="likeNum" empty="暂无收藏"></user-likes>
        </el-tab-pane>
        <el-tab-pane label="历史" name="histories" :lazy="true">
            <user-likes :imgNum="historyNum" empty="暂无历史"></user-likes>
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
    methods: {
        handleClick(tab, event) {
            this.$message.success(tab + event)
        }
    }
}
</script>

<style scoped>

</style>
