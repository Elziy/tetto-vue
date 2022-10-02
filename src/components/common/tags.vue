<template>
    <el-row :gutter="20">
        <el-col :span="3" v-for="o in 8" :key="o">
            <div class="grid-content bg-purple" style="text-align: center;line-height: 40px;" ref="container">
                <el-button type="text" style="width: 125px;text-align: center">
                    <span style="color: white;text-align: center;font-size: 12px">{{ tag }}</span>
                </el-button>
            </div>
        </el-col>
    </el-row>
</template>

<script>
export default {
    name: "tags",
    data() {
        return {
            tag: '#嘎嘎哈哈阿法狗',
        };
    }
}
</script>

<style scoped>
.bg-purple {
    background: #bb7fc9;
}

.grid-content {
    border-radius: 4px;
    min-height: 40px;
}
</style>
