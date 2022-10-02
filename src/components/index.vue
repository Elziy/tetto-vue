<template>
    <div>
        <navbar></navbar>
        <el-main class="container">
            <!--标签分类-->
            <tags></tags>
            <br>
            <!--推荐作品-->
            <recommended-works></recommended-works>
        </el-main>
        <el-footer>
        </el-footer>
    </div>
</template>

<script>
import navbar from "@/components/common/navbar";
import tags from "@/components/common/tags";
import recommendedWorks from "@/components/home/recommendedWorks";

export default {
    components: {
        navbar,
        tags,
        recommendedWorks
    },
    created() {
        this.master = window.sessionStorage.getItem('username')
        this.activePath = window.sessionStorage.getItem('activePath');
    },
    data() {
        return {
            activeIndex: '/index',
            activeIndex2: '1',
        };
    }
};
</script>
<style scoped>

</style>
