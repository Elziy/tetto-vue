<template>
    <div v-if="show">
        <h2>最新作品</h2>
        <ul>
            <li v-if="work.length !== 0" v-for="work in works" :key="work.id">
                <img-card :title="work.title"
                          :imgUrl="work.thumbnailUrl"
                          :aid="work.id"
                          :uid="work.uid"
                          :username="work.username"
                          :avatar="work.avatar"
                ></img-card>
            </li>
        </ul>
    </div>
</template>

<script>
import imgCard from "@/components/common/imgCard";
import NProgress from "nprogress";

export default {
    name: "NewWorks",
    components: {
        imgCard
    },
    data() {
        return {
            works: [],
            show: false
        };
    },
    beforeCreate() {
        NProgress.start();
        this.$http.get('image/atlas/new').then(res => {
            if (res.data.code === 0) {
                this.works = res.data.data;
            } else if (res.data.code === 401) {
                this.$store.commit('auth/SET_TOKEN', '');
                this.$router.replace('/login');
            } else {
                this.$message.error('获取推荐作品失败');
            }
        }).catch(err => {
            this.$message.error("获取推荐作品失败");
        })
        setTimeout(() => {
            this.show = true;
            NProgress.done();
        }, 60);
    }
}
</script>

<style scoped>
ul {
    padding: 20px 0 0 65px;
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
    margin-bottom: 20px;
    margin-right: 28px;
    line-height: 30px;
}
</style>
