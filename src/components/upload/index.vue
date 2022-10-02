<template>
    <div>
        <navbar></navbar>
        <el-main>
            <div class="container" style="text-align: center">
                <upload></upload>
            </div>
        </el-main>
    </div>
</template>

<script>
import navbar from "@/components/common/navbar";
import upload from "@/components/upload/upload";

export default {
    name: "index",
    components: {
        navbar,
        upload
    }
}
</script>

<style scoped>

</style>
