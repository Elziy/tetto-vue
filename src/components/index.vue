<template>
    <div>
        <br>
        <div class="container">
            <!--标签分类-->
            <tags></tags>
            <br>
            <!--推荐作品-->
            <recommended-works></recommended-works>
            <new-works></new-works>
        </div>
        <!--<el-footer>-->
        <!--</el-footer>-->
    </div>
</template>

<script>
import navbar from "@/components/common/navbar";
import tags from "@/components/common/tags";
import recommendedWorks from "@/components/home/recommendedWorks";
import newWorks from "@/components/home/NewWorks";

export default {
    name: "index_home",
    components: {
        navbar,
        tags,
        recommendedWorks,
        newWorks
    },
    data() {
        return {
            scrollNum: null
        };
    },
    beforeRouteLeave(to, from, next) {
        this.scrollNum = document.documentElement.scrollTop || document.body.scrollTop
        next();
    },
    activated() {
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

</style>
