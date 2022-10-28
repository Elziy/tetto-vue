<template>
    <div v-if="show">
        <ul>
            <li v-if="work.length !== 0" v-for="work in works" :key="work.id">
                <user-works-card
                        :title="work.title"
                        :imgUrl="work.thumbnailUrl"
                        :aid="work.id"
                ></user-works-card>
            </li>
        </ul>
        <el-empty :image-size="200" v-if="works.length === 0" description="暂无作品"></el-empty>
    </div>

</template>

<script>
import userWorksCard from "@/components/space/userWorksCard";
import NProgress from "nprogress";

export default {
    name: "userWorks",
    components: {
        userWorksCard
    },
    data() {
        return {
            show: false,
            works: []
        };
    },
    methods: {
        getWorks(uid) {
            this.$http.get('image/atlas/info/' + uid).then(res => {
                if (res.data.code === 0) {
                    this.works = res.data.data;
                }
            })
            setTimeout(() => {
                this.show = true;
            }, 40);
        },
    },
    beforeCreate() {
        NProgress.start();
        let uid = this.$route.params.uid;
        this.$http.get('image/atlas/info/' + uid).then(res => {
            if (res.data.code === 0) {
                this.works = res.data.data;
            } else {
                this.$message.error("获取作品失败");
            }
        }).catch(err => {
            this.$message.error("获取作品失败");
        })
        NProgress.done();
        setTimeout(() => {
            this.show = true;
        }, 40);
    },

    activated() {
        let uid = this.$route.params.uid;
        this.$http.get('image/atlas/info/' + uid).then(res => {
            if (res.data.code === 0) {
                this.works = res.data.data;
            } else {
                this.$message.error("获取作品失败");
            }
        }).catch(err => {
            this.$message.error("获取作品失败");
        })
        setTimeout(() => {
            this.show = true;
        }, 40);
    },
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
