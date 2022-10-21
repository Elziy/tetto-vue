<template>
    <a  href="javascript:;" @click="index">
        <img src="@/assets/logo/logo2.png" alt="logo">
    </a>
</template>

<script>
export default {
    name: "logo",
    methods: {
        index() {
            this.$router.push("/");
        }
    }
}
</script>

<style lang="less" scoped>
img {
    width: 130px;
    //height: 40px;
}
</style>
