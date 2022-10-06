<template>
    <div>
        <ul>
            <li v-if="imgNum" v-for="o in imgNum" :key="o">
                <img-card></img-card>
            </li>
        </ul>
        <el-empty :image-size="200" v-if="imgNum === 0" :description="empty"></el-empty>
    </div>
</template>

<script>
import imgCard from "@/components/common/imgCard";

export default {
    name: "userLike",
    components: {
        imgCard
    },
    props: {
        empty: String,
        imgNum: Number
    },
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
    margin-bottom: 1px;
    margin-right: 30px;
    line-height: 30px;
}
</style>
