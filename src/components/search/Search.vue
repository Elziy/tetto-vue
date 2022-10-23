<template>
    <div>
        <navbar></navbar>
        <br>
        <div class="container">
            <!--标签分类-->
            <tags></tags>
            <br>
        </div>
    </div>
</template>

<script>
import navbar from "@/components/common/navbar";
import tags from "@/components/common/tags";

export default {
    name: "Search",
    components: {
        navbar,
        tags
    },
}
</script>

<style scoped>

</style>
