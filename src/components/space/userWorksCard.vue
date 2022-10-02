<template>
    <div>
        <div>
            <el-link @click="imgDetail">
                <img :src="work" class="main-image" alt="img">
            </el-link>
        </div>
        <div style="height: 22px;">
            <el-button type="text" @click="imgDetail">
                <span style="color: black">title</span>
            </el-button>
        </div>
    </div>
</template>

<script>
import work from "@/assets/images/face.jpg";

export default {
    name: "userWorksCard",
    data() {
        return {
            work
        }
    },
    methods: {
        imgDetail() {
            this.$message.success("success");
        },
    }
}
</script>

<style scoped>
.main-image {
    border-radius: 8%;
    width: 180px;
    height: 180px;
}

span {
    color: black;
    font-size: 15px;
    font-weight: bold;
}
</style>
