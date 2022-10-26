<template>
    <div>
        <el-button @click="drawer = true" type="text" icon="el-icon-s-operation" class="left-drawer"></el-button>

        <el-drawer
                :visible.sync="drawer"
                :direction="direction"
                :with-header="false"
                :show-close="true"
                size="16%">
            <div class="overflowAuto">
                <div style="text-align: center;padding-top: 20px">
                    <logo></logo>
                </div>

                <div style="padding-top: 20px">
                    <h4 style="padding-left: 40px">首页</h4>
                </div>

                <div style="height: 50px">
                    <!--<el-button type="text" class="enum"><i class="el-icon-edit" style="color: black"></i>-->
                    <!--    <span>插画</span></el-button>-->
                    <el-link href="http://art.tetto.com" :underline="false" class="enum">
                        <i class="el-icon-edit" style="color: black"></i>
                        <span>插画</span>
                    </el-link>
                </div>
                <div style="height: 50px">
                    <el-link href="#" :underline="false" class="enum">
                        <i class="el-icon-edit" style="color: black"></i>
                        <span>漫画</span>
                    </el-link>
                </div>
                <div style="height: 50px">
                    <el-link href="#" :underline="false" class="enum">
                        <i class="el-icon-edit" style="color: black"></i>
                        <span>小说</span>
                    </el-link>
                </div>
            </div>
        </el-drawer>
    </div>
</template>

<script>
import logo from "@/components/common/logo";

export default {
    name: "leftDrawer",
    components: {
        logo
    },
    data() {
        return {
            drawer: false,
            direction: 'ltr',
        };
    },
    methods: {
        success() {
            this.$message.success("success");
        },
    },
}
</script>

<style lang="less" scoped>
.left-drawer {
    font-size: 20px;
    color: #2c3e50;
}

.left-drawer:active {
    color: #2c3e50;
}

.left-drawer:focus {
    color: #2c3e50;
}

span {
    padding-left: 3px;
    font-size: 18px;
    font-weight: bold;
    color: #333333;
}

.enum {
    padding-right: 30px;
    width: 100%;
    height: 100%;
    padding-top: 7px;
}

.enum:hover {
    background: #eeeeee;
    text-decoration: none;
}

.overflowAuto {
    overflow-y: auto;
    position: absolute;
    width: 100%;
    height: 100%;
}

.overflowAuto::-webkit-scrollbar {
    height: 6px;
    width: 6px;
}

.overflowAuto::-webkit-scrollbar-thumb {
    background: rgb(224, 214, 235);
}
</style>
