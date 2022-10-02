<template>
    <div>
        <ul>
            <li v-if="workNum !== 0" v-for="o in workNum" :key="o">
                <user-works-card></user-works-card>
            </li>
        </ul>
        <el-empty :image-size="200" v-if="workNum === 0" description="暂无作品"></el-empty>
    </div>

</template>

<script>
import userWorksCard from "@/components/space/userWorksCard";

export default {
    name: "userWorks",
    components: {
        userWorksCard
    },
    data() {
        return {
            workNum: 0,
        };
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
    margin-bottom: 25px;
    margin-right: 30px;
    line-height: 30px;
}
</style>
