<template>
    <div>
        <button style="border: none;height: 60px;background: white">
            <el-badge :value="sum" class="item">
                <i class="el-icon-chat-dot-square" style="font-size: 30px;color: #858585"></i>
            </el-badge>
        </button>
    </div>
</template>

<script>
export default {
    name: "email",
    data() {
        return {
            sum: 5
        };
    },
}
</script>

<style scoped>

</style>
