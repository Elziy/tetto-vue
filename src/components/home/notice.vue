<template>
    <button style="border: none;height: 60px;background: white">
        <el-badge :value="sum" class="item">
            <i class="el-icon-bell" style="font-size: 30px;color: #858585"></i>
        </el-badge>
    </button>
</template>

<script>
export default {
    name: "notice",
    data() {
        return {
            sum: 10
        };
    },
}
</script>

<style scoped>

</style>
