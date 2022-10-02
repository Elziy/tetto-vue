<template>
    <div>
        <el-link @click="imgDetail">
            <img :src="like" class="main-image" alt="img">
        </el-link>
    </div>
</template>

<script>
import like from "@/assets/images/face.jpg";

export default {
    name: "userLikeCard",
    data() {
        return {
            like
        }
    },
    methods: {
        imgDetail() {
            this.$message.success("success");
        },
    }
};
</script>

<style scoped>
.main-image {
    border-radius: 8%;
    width: 180px;
    height: 180px;
}
</style>
