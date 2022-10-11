<template>
    <div>
        <navbar></navbar>
        <div class="container">
            <!--标签分类-->
            <tags></tags>
            <br>
            <!--推荐作品-->
            <recommended-works></recommended-works>
        </div>
        <el-footer>
        </el-footer>
    </div>
</template>

<script>
import navbar from "@/components/common/navbar";
import tags from "@/components/common/tags";
import recommendedWorks from "@/components/home/recommendedWorks";

export default {
    name: "index",
    components: {
        navbar,
        tags,
        recommendedWorks
    },
};
</script>
<style scoped>

</style>
