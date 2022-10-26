<template>
    <div class="trendings-double">
        <div class="trendings-col" style="max-width: 226.5px;">
            <div class="trending-item" tabindex="0" v-for="(hot,index) in hotSearch1" :key="index" @click="goto(hot)">
                <div class="trendings-rank search-rank-top">{{ index + 1 }}</div>
                <div class="trending-text">{{ hot }}</div>
            </div>
        </div>
        <div class="trendings-col" style="max-width: 226.5px;">
            <div class="trending-item" tabindex="0" v-for="(hot,index) in hotSearch2" :key="index" @click="goto(hot)">
                <div class=" trendings-rank">{{ index + hotSearch1.length + 1 }}
                </div>
                <div class="trending-text">{{ hot }}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "trending-double",
    data() {
        return {
            hotSearch: []
        }
    },
    computed: {
        hotSearch1() {
            // 取前一半热搜
            return this.hotSearch.slice(0, Math.ceil(this.hotSearch.length / 2))
        },

        hotSearch2() {
            // 取后一半热搜
            return this.hotSearch.slice(Math.ceil(this.hotSearch.length / 2), this.hotSearch.length)
        }
    },
    methods: {
        goto(val) {
            // 调用父组件的方法
            this.$emit('goto', val)
        }
    },
    beforeCreate() {
        this.$http.get('search/hotSearch').then(res => {
            if (res.data.code === 0) {
                this.hotSearch = res.data.data;
            }
        })
    }
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
