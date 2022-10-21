<template>
    <div class="search">
        <el-input @keyup.enter.native="goto" @focus="focus" type="text" placeholder="搜索作品" v-model="search">
            <el-button @click="goto" type="text" slot="suffix" icon="el-icon-search"></el-button>
        </el-input>
        <div class="search-panel none">
            <div :class="suggestions" style="max-width: 463px;">
                <div class="suggest-item" tabindex="0"><em class="suggest_high_light">css</em>布局</div>
            </div>

            <div :class="trending" style="max-width: 463px;">
                <div class="header">
                    <div class="title">大家都在搜</div>
                </div>
                <TrendingDouble></TrendingDouble>
            </div>
        </div>
    </div>
</template>

<script>
import TrendingDouble from "@/components/common/trending-double";
export default {
    name: "search",
    components: {
        TrendingDouble
    },
    data() {
        return {
            search: "",
        }
    },
    computed: {
        trending() {
            return this.search.length > 0 ? "trending none" : "trending";
        },
        suggestions() {
            return this.search.length > 0 ? "suggestions" : "suggestions none";
        }
    },
    methods: {
        goto() {
            this.$message({
                message: '搜索功能暂未开放',
                type: 'warning'
            });
        },
        focus() {
            document.querySelector(".search-panel").classList.remove("none");
        },
        blur() {
            document.querySelector(".search-panel").classList.add("none");
        }
    },
    created() {
        document.addEventListener("click", (e) => {
            let search = document.querySelector(".search");
            let searchPanel = document.querySelector(".search-panel");
            if (e.target !== search && !search.contains(e.target)) {
                searchPanel.classList.add("none");
            }
        })
    }
}
</script>

<style scoped>
.none {
    display: none;
}

.search-panel {
    width: 100%;
    max-height: 612px;
    background: #ffffff;
    border-radius: 0 0 8px 8px;
    padding: 13px 0 16px;
    -webkit-font-smoothing: antialiased;
}

.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
}

.header .title {
    height: 24px;
    font-size: 16px;
    line-height: 24px;
}

.suggestions {
    margin-top: -6px;
    margin-bottom: -6px;
}

.suggest-item {
    height: 32px;
    display: block;
    line-height: 32px;
    font-size: 14px;
    position: relative;
    text-align: left;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    cursor: pointer;
    padding: 0 16px;
    margin-bottom: 4px;
}

.suggest-item:hover {
    outline: none;
    background: #E3E5E7;
}

.suggest-item:focus {
    outline: none;
    background: #E3E5E7;
}

.suggest_high_light {
    color: #409eff;
    font-style: normal;
}
</style>
