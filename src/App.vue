<template>
    <div id="app" class="overflowAuto">
        <router-view/>
    </div>
</template>

<script>

export default {
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
</style>
