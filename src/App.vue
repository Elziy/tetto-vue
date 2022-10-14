<template>
    <div id="app">
        <keep-alive :include="keepAlive">
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script>

export default {
    data() {
        return {
            keepAlive: ['space', 'index_home', 'navbar']
        }
    }
}
</script>


<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    /*-webkit-font-smoothing: antialiased;*/
    /*-moz-osx-font-smoothing: grayscale;*/
    /*text-align: center;*/
    color: #2c3e50;
}

/*#nav {*/
/*  padding: 30px;*/
/*}*/

/*#nav a {*/
/*  font-weight: bold;*/
/*  color: #2c3e50;*/
/*}*/

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

html {
    overflow-y: auto;
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
