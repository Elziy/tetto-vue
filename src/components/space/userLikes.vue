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
        <div style="text-align: center">
            <el-pagination
                    hide-on-single-page
                    @current-change="currentChangeHandle"
                    layout="prev, pager, next"
                    :current-page="currPage"
                    :page-size="pageSize"
                    :total="totalCount">
            </el-pagination>
        </div>
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
            totalPage: 0,
            totalCount: 0,
            currPage: 1,
            pageSize: 8,
        };
    },
    props: {
        empty: String,
    },
    methods: {
        currentChangeHandle(val) {
            this.currPage = val;
            this.getLikes();
        },
        getLikes() {
            NProgress.start();
            this.$http.get('image/atlas/likes/page', {
                params: {
                    page: this.currPage,
                    limit: this.pageSize,
                }
            }).then(res => {
                if (res.data.code === 0) {
                    this.likes = res.data.data.list;
                    this.totalPage = res.data.data.totalPage;
                    this.totalCount = res.data.data.totalCount;
                    this.currPage = res.data.data.currPage;
                    this.pageSize = res.data.data.pageSize;
                } else {
                    this.$message.error("获取收藏失败");
                }
            }).catch(err => {
                this.$message.error("获取收藏失败");
            })
            NProgress.done();
        },
    },
    beforeCreate() {
        NProgress.start();
        this.$http.get('image/atlas/likes/page', {
            params: {
                page: 1,
                limit: 8,
            }
        }).then(res => {
            if (res.data.code === 0) {
                this.likes = res.data.data.list;
                this.totalPage = res.data.data.totalPage;
                this.totalCount = res.data.data.totalCount;
                this.currPage = res.data.data.currPage;
                this.pageSize = res.data.data.pageSize;
            } else {
                this.$message.error("获取收藏失败");
            }
        }).catch(err => {
            this.$message.error("获取收藏失败");
        })
        NProgress.done();
    },
    activated() {
        this.getLikes();
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
