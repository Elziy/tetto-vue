<template>
    <div>
        <h2>推荐作品</h2>
        <ul>
            <li v-for="o in 10" :key="o">
                <img-card></img-card>
            </li>
        </ul>
    </div>
</template>

<script>
import imgCard from "@/components/common/imgCard";

export default {
    name: "imgs",
    components: {
        imgCard
    },
}
</script>

<style scoped>
ul{
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
