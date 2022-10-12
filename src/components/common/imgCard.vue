<template>
    <div>
        <el-link :underline="false" type="text" @click="imgDetail">
            <el-image :src="imgUrl" class="main-image"></el-image>
        </el-link>
        <div style="height: 22px;">
            <el-link @click="imgDetail" :underline="false" type="text"><span>{{ title |title }}</span></el-link>
        </div>
        <div>
            <img :src="avatar" class="face-avatar-image" alt="avatar">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <el-link :underline="false" type="text" @click="userSpace">
                <span>{{ username }}</span>
            </el-link>
        </div>
    </div>
</template>

<script>

export default {
    name: "imgCard",
    props: {
        title: String,
        imgUrl: String,
        aid: Number,
        uid: Number,
        username: String,
        avatar: String,
    },
    methods: {
        userSpace() {
            this.$router.push(
                    {
                        name: "space",
                        params: {
                            uid: this.uid
                        }
                    }
            );
            // window.location.href = "/space/" + this.uid;
        },
        imgDetail() {
            // window.location.href = "/artworks/" + this.aid;
            this.$router.push(
                    {
                        name: "artworks",
                        params: {
                            aid: this.aid
                        }
                    }
            );
        },
    }
}
</script>

<style scoped>
.main-image {
    border-radius: 8%;
    width: 180px;
    height: 180px;
    object-fit: cover;
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

el-link:hover {
    cursor: pointer;
}

/*鼠标放在图片上高亮*/
.main-image:hover {
    /*border: 1px solid #409EFF;*/
    opacity: 0.9;
}

a:focus, a:hover {
    color: #23527c;
    text-decoration: none !important;
}
</style>
