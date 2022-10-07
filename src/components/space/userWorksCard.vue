<template>
    <div>
        <div>
            <el-link :underline="false" type="text" @click="imgDetail">
                <img :src="imgUrl" class="main-image" alt="img">
            </el-link>
        </div>
        <div style="height: 22px;">
            <el-button type="text" @click="imgDetail">
                <span style="color: black">{{ title |title }}</span>
            </el-button>
        </div>
    </div>
</template>

<script>

export default {
    name: "userWorksCard",
    props: {
        title: String,
        imgUrl: null
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
    width: 220px;
    height: 220px;
    /*object-fit: cover;*/
}

span {
    color: black;
    font-size: 15px;
    font-weight: bold;
}

el-link:hover {
    cursor: pointer;
}

/*鼠标放在图片上高亮*/
.main-image:hover {
    border: 1px solid #409EFF;
}
</style>
