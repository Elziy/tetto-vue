<template>
    <div id="app">
        <navbar v-if="showNav"></navbar>
        <keep-alive :include="keepAlive">
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script>
import navbar from "@/components/common/navbar";
import {mapState} from "vuex";

export default {
    components: {
        navbar,
    },
    data() {
        return {
            keepAlive: ['space', 'index_home', 'navbar', 'Search'],
        }
    },
    computed: {
        ...mapState("defaultStore", ["showNav"])
    }
}
</script>


<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    color: #2c3e50;
}

.overflowAuto {
    overflow-y: auto;
    position: absolute;
    width: 100%;
    height: 100%;
}

.overflowAuto::-webkit-scrollbar {
    height: 4px;
    width: 4px;
}

.overflowAuto::-webkit-scrollbar-thumb {
    background: #c1c1c1;
}

html, body {
    height: 100%;
    overflow: auto;
    margin: 0;
}

::-webkit-scrollbar {
    width: 4px;
    height: 4px;
    /*background-color: #f5f5f5;*/
}

::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #c0c0c0;
}

::-webkit-scrollbar-track {
    border-radius: 0;
    /*background: rgba(0, 0, 0, 0.1);*/
}
</style>
