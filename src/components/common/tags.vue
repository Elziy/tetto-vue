<template>
    <el-row :gutter="20">
        <el-col :span="3" v-for="(tag,index) in tags" :key="index">
            <div :class="'grid-content bg' + hash(tag)" style="text-align: center;line-height: 40px;" ref="container">
                <el-button @click="toTags(tag.substring(1,tag.length))" type="text"
                           style="width: 125px;text-align: center">
                    <span style="color: white;text-align: center;font-size: 12px">{{ tag }}</span>
                </el-button>
            </div>
        </el-col>
    </el-row>
</template>

<script>
export default {
    name: "tags",
    props: {
        tags: {
            type: Array,
            default: []
        },
        routerModel: {
            type: String,
            default: "push"
        }
    },
    methods: {
        toTags(tag) {
            if (this.routerModel === "replace") {
                this.$router.replace({
                    name: 'tags',
                    params: {
                        tag: tag
                    }
                })
            } else {
                this.$router.push({
                    name: 'tags',
                    params: {
                        tag: tag
                    }
                })
            }
        },
        hash(val) {
            let hash = 0;
            if (val.length === 0) return hash;
            for (let i = 0; i < val.length; i++) {
                let char = val.charCodeAt(i);
                hash = ((hash << 5) - hash) + char;
                hash = hash & hash;
            }
            hash = hash % 8;
            // 取绝对值
            if (hash < 0) {
                hash = -hash;
            }
            return hash;
        }
    }
}
</script>

<style>

.bg0 {
    background: rgb(200, 200, 126);
}

.bg1 {
    background: rgb(145, 200, 126);
}

.bg2 {
    background: rgb(126, 141, 200);
}

.bg3 {
    background: rgb(200, 126, 126);
}

.bg4 {
    background: rgb(200, 126, 200);
}

.bg5 {
    background: #87c1c8;
}

.bg6 {
    background: #a47fc9;
}

.bg7 {
    background: #c9a47f;
}


.grid-content {
    border-radius: 4px;
    min-height: 40px;
}
</style>
