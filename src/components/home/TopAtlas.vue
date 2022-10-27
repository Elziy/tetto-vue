<template>
    <div v-if="show">
        <div>
            <h2 style="float: left">昨日排行</h2>
            <div style="float: right">
                <el-button class="all" type="text">查看全部</el-button>
            </div>
        </div>
        <ul style="clear: both">
            <li v-if="work.length !== 0" v-for="(work,index) in works" :key="work.id">
                <img-top-card
                        :top="index + 1"
                        :title="work.title"
                        :imgUrl="work.thumbnailUrl"
                        :aid="work.id"
                        :uid="work.uid"
                        :username="work.username"
                        :avatar="work.avatar"
                ></img-top-card>
            </li>
        </ul>
    </div>
</template>

<script>
import imgTopCard from "@/components/common/imgTopCard";

export default {
    name: "imgTopAtlas",
    components: {
        imgTopCard
    },
    data() {
        return {
            works: [],
            show: false
        };
    },
    beforeCreate() {
        this.$http.get('image/atlas/hot')
                .then(res => {
                    if (res.data.code === 0) {
                        this.works = res.data.data;
                        this.show = true;
                    }
                }).catch(err => {
            this.$message.error("获取推荐作品失败");
        })
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

.all {
    color: rgb(133, 133, 133);
    padding-right: 70px;
    padding-top: 30px;
    font-size: 15px;
}
</style>
