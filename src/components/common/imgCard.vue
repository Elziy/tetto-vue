<template>
    <div>
        <div>
            <a href="#"><img :src="i" class="main-image" alt="img"></a>
        </div>
        <div style="height: 22px;">
            <el-button type="text"><span style="color: black">title</span></el-button>
        </div>
        <div>
            <img :src="i" style="" class="face-avatar-image" alt="img">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <el-button type="text" @click="imgDetail"><span style="color: black">userName</span></el-button>
        </div>
    </div>
</template>

<script>
import i from '@/assets/images/face.jpg'

export default {
    name: "imgCard",
    data() {
        return {
            i,
            currentDate: new Date().getDate()
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

.face-avatar-image {
    height: 20px;
    width: 20px;
    border-radius: 50%;
}

span {
    color: black;
    font-size: 15px;
    font-weight: bold;
}
</style>
