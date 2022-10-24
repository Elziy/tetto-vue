<template>
    <div class="search">
        <el-input @keyup.enter.native="goto(search)" @focus="focus" type="text" placeholder="搜索作品" v-model="search">
            <el-button @click="goto(search)" type="text" slot="suffix" icon="el-icon-search"></el-button>
        </el-input>
        <div v-show="show" class="search-panel none">
            <div :class="suggestions" style="max-width: 463px;">
                <!--<div class="suggest-item" tabindex="0"><em class="suggest_high_light">css</em>布局</div>-->
                <div
                        v-for="(suggest,index) in suggests"
                        :key="index" class="suggest-item"
                        v-html="suggest.suggest"
                        @click="goto(suggest.tag)"
                >
                </div>
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
            suggests: [],
            show: false,
        };
    },
    computed: {
        search: {
            get() {
                return this.$store.state.search.keyword;
            },
            set(val) {
                this.$store.commit("search/SET_KEYWORD", val);
            }
        },
        trending() {
            return this.search.length > 0 ? "trending none" : "trending";
        },
        suggestions() {
            return this.search.length > 0 ? "suggestions" : "suggestions none";
        },
    },
    methods: {
        goto(val) {
            this.$router.push({path: '/tags/' + val});
            this.blur();
        },
        focus() {
            this.suggests = [];
            document.querySelector(".search-panel").classList.remove("none");
            if (this.search.length <= 0) {
                this.show = true;
            }
        },
        blur() {
            document.querySelector(".search-panel").classList.add("none");
        },
        getSuggestTags(val) {
            this.$http.get('search/tags/suggest/' + val).then(res => {
                if (res.data.code === 0) {
                    this.suggests = res.data.data;
                    this.show = this.suggests.length !== 0;
                }
            })
        },
    },
    // 监视输入框的值
    watch: {
        search(val) {
            if (val.length > 0) {
                if (!document.querySelector(".search-panel").classList.contains("none")) {
                    this.getSuggestTags(val);
                }
            } else {
                this.show = true;
            }
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

<style>
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
