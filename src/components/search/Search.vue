<template>
    <div class="container">
        <br>
        <div>
            <!--<div style="font-size: 22px;font-weight: bold">-->
            <!--    <span>{{ tag }}</span>-->
            <!--</div>-->
            <div v-if="tags.length != 0" class="fRhrLK">
                <!--<span class="djoQZQ">{{ totalCount || 0 }}</span>-->
                <span style="color: rgb(133, 133, 133);"> 相关标签</span>
            </div>
        </div>
        <div style="padding-top: 9px">
            <tags :tags="tags"></tags>
        </div>
        <br>
        <div>
            <div class="jcvOjL">
                <h3 class="ghVHhh">检索结果</h3>

                <div class="dVRwUc">
                    <div class="kZlOCw"><span>{{ totalCount || 0 }}</span></div>
                </div>
            </div>
            <show-atlas :works="works"></show-atlas>
            <div style="text-align: center;">
                <el-pagination style="font-size: 50px"
                               hide-on-single-page
                               @current-change="currentChangeHandle"
                               layout="prev, pager, next"
                               :current-page="currPage"
                               :page-size="pageSize"
                               :total="totalCount">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import navbar from "@/components/common/navbar";
import tags from "@/components/common/tags";
import showAtlas from "@/components/search/showAtlas";
import NProgress from "nprogress";

export default {
    name: "Search",
    components: {
        navbar,
        tags,
        showAtlas
    },
    data() {
        return {
            tags: [],
            works: [],
            scrollNum: null,
            totalPage: 0,
            totalCount: 0,
            currPage: 1,
            pageSize: 20,
        }
    },
    methods: {
        search(keyword) {
            this.$store.commit("search/SET_KEYWORD", keyword);
            document.title = keyword + " - 搜索结果 - tetto";
            NProgress.start();
            this.$http.post('search/atlas', {
                keyword: keyword,
                page: this.currPage
            }).then(res => {
                if (res.data.code === 0) {
                    this.works = res.data.data.atlas;
                    this.totalPage = res.data.data.totalPage;
                    this.totalCount = res.data.data.totalCount;
                    this.currPage = res.data.data.currPage;
                    this.pageSize = res.data.data.pageSize;
                }
            })
            NProgress.done();
        },
        getTags(keyword) {
            NProgress.start();
            this.$http.get('search/tags/related/' + keyword).then(res => {
                if (res.data.code === 0) {
                    this.tags = res.data.data;
                }
            })
            NProgress.done();
        },
        currentChangeHandle(val) {
            this.currPage = val;
            //确保移动端和pc端都能正确的设置位置
            document.documentElement.scrollTop = 0
            document.body.scrollTop = 0
            this.search(this.$store.state.search.keyword);
        },
    },
    beforeCreate() {
        let keyword = this.$route.params.tag;
        if (keyword) {
            this.$store.commit("search/SET_KEYWORD", keyword);
        }
        document.title = keyword + " - 搜索结果 - tetto";
        NProgress.start();
        this.$http.post('search/atlas', {
            keyword: keyword,
            page: 1
        }).then(res => {
            if (res.data.code === 0) {
                this.works = res.data.data.atlas;
                this.totalPage = res.data.data.totalPage;
                this.totalCount = res.data.data.totalCount;
                this.currPage = res.data.data.currPage;
                this.pageSize = res.data.data.pageSize;
            }
        })
        this.$http.get('search/tags/related/' + keyword).then(res => {
            if (res.data.code === 0) {
                this.tags = res.data.data;
            }
        })
        NProgress.done();
    },
    beforeRouteUpdate(to, from, next) {
        let keyword = to.params.tag;
        this.currPage = 1;
        this.search(keyword);
        this.getTags(keyword);
        next();
    },
    beforeRouteLeave(to, from, next) {
        this.scrollNum = document.documentElement.scrollTop || document.body.scrollTop
        next();
    },
    activated() {
        let keyword = this.$route.params.tag;
        // 检索词改变则重新检索
        if (keyword !== this.$store.state.search.keyword) {
            this.currPage = 1;
            console.log(1)
            this.search(keyword);
            this.getTags(keyword);
        }
        //组件激活时，将离开组件是记录的页面位置赋值
        if (this.scrollNum !== null && this.scrollNum > 0) {
            //确保移动端和pc端都能正确的设置位置
            document.documentElement.scrollTop = this.scrollNum
            document.body.scrollTop = this.scrollNum
        }
    }
}
</script>

<style scoped>
.djoQZQ {
    color: rgb(71, 71, 71);
    font-weight: bold;
    margin-right: 4px
}

.fRhrLK {
    font-size: 16px;
    font-weight: bold;
    line-height: 24px;
}

.jcvOjL {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: start;
    justify-content: start;
}

.ghVHhh {
    font-size: 20px;
    line-height: 28px;
    color: rgb(71, 71, 71);
    font-weight: bold;
    margin: 0px;
}

h3 {
    display: block;
    font-size: 1.17em;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
}

.dVRwUc {
    margin-left: 8px;
}

.kZlOCw {
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    flex: 0 0 auto;
    box-sizing: border-box;
    height: 20px;
    min-width: 20px;
    color: rgb(255, 255, 255);
    font-weight: bold;
    padding: 0px 6px;
    background: rgba(0, 0, 0, 0.32);
    border-radius: 10px;
    font-size: 10px;
    line-height: 10px;
}
</style>
