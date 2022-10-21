<template>
    <div class="trendings-single">
        <div class="trending-item" tabindex="0">
            <div class="trendings-rank search-rank-top">1</div>
            <div class="trending-text">央视曝光间谍被抓现场</div>
        </div>
        <div class="trending-item" tabindex="0">
            <div class="trendings-rank search-rank-top">2</div>
            <div class="trending-text">屠呦呦以身试药改变世界</div>
        </div>
        <div class="trending-item" tabindex="0">
            <div class="trendings-rank search-rank-top">3</div>
            <div class="trending-text">Yagao说369是世一上</div>
        </div>
        <div class="trending-item" tabindex="0">
            <div class="trendings-rank">4</div>
            <div class="trending-text">中式日料完爆传统日料</div>
        </div>
        <div class="trending-item" tabindex="0">
            <div class="trendings-rank">5</div>
            <div class="trending-text">英伟达取消RTX4080 12GB</div>
        </div>
        <div class="trending-item" tabindex="0">
            <div class="trendings-rank">6</div>
            <div class="trending-text">过了20在幼儿园穿成熟点</div>
        </div>
        <div class="trending-item" tabindex="0">
            <div class="trendings-rank">7</div>
            <div class="trending-text">林志颖车祸后首露面</div>
        </div>
        <div class="trending-item" tabindex="0">
            <div class="trendings-rank">8</div>
            <div class="trending-text">叶罗丽不要再误人子弟</div>
        </div>
        <div class="trending-item" tabindex="0">
            <div class="trendings-rank">9</div>
            <div class="trending-text">间谍教室 莉莉角色PV</div>
        </div>
        <div class="trending-item" tabindex="0">
            <div class="trendings-rank">10</div>
            <div class="trending-text">宝可梦朱紫新精灵电肚蛙</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "trending-single"
}
</script>

<style scoped>
.trendings-double {
    display: flex;
}

.trendings-double .trendings-col {
    flex: 1;
}

.trending-item {
    box-sizing: border-box;
    height: 38px;
    display: flex;
    align-items: center;
    cursor: pointer;
    padding-left: 16px;
}

.trending-item:hover {
    outline: none;
    background: #E3E5E7;
}

.trending-item:focus {
    outline: none;
    background: #E3E5E7;
}

.trending-item .trendings-rank {
    width: 15px;
    min-width: 15px;
    height: 17px;
    line-height: 17px;
    text-align: center;
    font-size: 14px;
    margin-right: 7px;
    color: #18191C;
}

.trending-item .trending-text {
    font-size: 14px;
    line-height: 17px;
    height: 17px;
    margin-right: 6px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    letter-spacing: 0;
}
</style>
