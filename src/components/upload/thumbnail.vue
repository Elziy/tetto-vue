<template>
    <div v-if="imgUrl" class="thumbnail">
        <el-row align="middle">
            <el-col :span="10" style="padding-top: 5px">
                <div>
                    <img class="thumbnail-img" :src="imgUrl" alt="">
                </div>
            </el-col>
            <el-col :span="10" style="padding-top: 25px">
                <div>
                    <span>作品封面</span>
                </div>
                <div>
                    <span style="font-size: 12px">(请尽量选择1:1图片)</span>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
// 缩略图
export default {
    name: "thumbnail",
    props: {
        imgUrl: {
            type: String,
            default: null
        }
    },
    // watch: {
    //     imgUrl(url){
    //         return url
    //     }
    // },
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
    object-fit: cover;
}
</style>
