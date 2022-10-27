<template>
    <div>
        <el-link :underline="false" type="text" @click="imgDetail">
            <div style="position: static">
                <img :src="imgUrl" class="main-image" :alt="title">
                <div class="Sxcoo">
                    <div class="dHgPNe">
                        <div :class="topClass">{{ top }}</div>
                    </div>
                </div>
            </div>
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
    name: "imgTopCard",
    props: {
        top: Number,
        title: String,
        imgUrl: String,
        aid: Number,
        uid: Number,
        username: String,
        avatar: String,
    },
    computed: {
        topClass() {
            if (this.top === 1 || this.top === 2 || this.top === 3) {
                return "icVnJq top" + this.top;
            } else {
                return "icVnJq top";
            }
        },
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
        },
        imgDetail() {
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

.Sxcoo {
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    box-sizing: border-box;
    display: flex;
    align-items: flex-start;
    padding: 4px 4px 0px;
    pointer-events: none;
}

.dHgPNe {
    margin-right: 4px;
}

.icVnJq {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    border-radius: 50%;
    font-weight: bold;
    color: rgb(255, 255, 255);
    width: 30px;
    height: 30px;
    font-size: 14px;
    line-height: 24px;
}

.top1 {
    background-color: rgb(214, 186, 73, 0.9);
}

.top2 {
    background-color: rgb(133, 133, 133, 0.9);
}

.top3 {
    background-color: rgb(200, 161, 126, 0.9);
}

.top {
    background-color: rgba(0, 0, 0, 0.32);
}

</style>
