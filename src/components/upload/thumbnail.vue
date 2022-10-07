<template>
    <div v-if="this.$store.state.upload.thumbnailUrl" class="thumbnail">
        <el-row align="middle">
            <el-col :span="8" style="padding-top: 5px">
                <div>
                    <img class="thumbnail-img" :src="this.$store.state.upload.thumbnailUrl" alt="">
                </div>
            </el-col>
            <el-col :span="6" style="padding-top: 40px">
                <span>作品缩略图</span>
            </el-col>
            <el-col :span="10" style="padding-top: 35px">
                <el-button size="mini" round @click="cropper">手动裁剪</el-button>
            </el-col>
        </el-row>
        <thumbnail-cropper></thumbnail-cropper>
    </div>
</template>

<script>
import ThumbnailCropper from "./thumbnailCropper";
// 缩略图
export default {
    name: "thumbnail",
    components: {
        ThumbnailCropper
    },
    methods: {
        cropper() {
            let reader = new FileReader()
            reader.readAsDataURL(this.$store.state.upload.thumbnailFile.raw)
            reader.onload = e => {
                this.$store.state.upload.cropperImage = e.target.result // base64
            }
            this.$store.state.upload.thumbnailCropperDialog = true
        },
    }
}
</script>

<style scoped>
.thumbnail {
    margin: auto;
    width: 300px;
    height: 100px;
    background: rgba(212, 214, 219, 0.44);
}

.thumbnail-img {
    width: 80px;
    height: 80px;
    border-radius: 15%;
    /*object-fit: cover;*/
}
</style>
