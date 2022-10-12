<template>
    <div>
        <ul>
            <li v-if="likes" v-for="like in likes" :key="like.id">
                <user-works-card
                        :title="like.title"
                        :imgUrl="like.thumbnailUrl"
                        :aid="like.id"
                ></user-works-card>
            </li>
        </ul>
        <el-empty :image-size="200" v-if="likes.length === 0" :description="empty"></el-empty>
    </div>
</template>

<script>
import userWorksCard from "@/components/space/userWorksCard";
import NProgress from "nprogress";

export default {
    name: "userLike",
    components: {
        userWorksCard
    },
    data() {
        return {
            likes: [],
        };
    },
    props: {
        empty: String,
    },
    beforeCreate() {
        NProgress.start();
        this.$http.get('image/atlas/likes').then(res => {
            if (res.data.code === 0) {
                this.likes = res.data.data;
            } else {
                this.$message.error("获取收藏失败");
            }
        }).catch(err => {
            this.$message.error("获取收藏失败");
        })
        NProgress.done();
    },
    activated() {
        this.$http.get('image/atlas/likes').then(res => {
            if (res.data.code === 0) {
                this.likes = res.data.data;
            } else {
                this.$message.error("获取收藏失败");
            }
        }).catch(err => {
            this.$message.error("获取收藏失败");
        })
    }
}
</script>

<style scoped>
ul {
    padding: 20px 0 0 80px;
    /*padding: 20px;*/
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
}

ul li {
    min-width: 80px;
    font-size: 16px;
    list-style: none;
    /*text-align: center;*/
    margin-bottom: 25px;
    margin-right: 30px;
    line-height: 30px;
}
</style>
