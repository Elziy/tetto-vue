<template>
    <el-dialog :visible.sync="dialogTableVisible"
               @close="closeLog"
               top="50px"
    >
        <div style="text-align: center">
            <img class="face-img" src="@/assets/images/face.jpg" alt="face">
        </div>
        <div style="text-align: center;padding-top: 5px">
            <span>埃及房管局</span>
        </div>
        <div style="text-align: center;padding-top: 5px">
            <el-button round class="info-change-button">
                <span style="font-weight: bold">编辑个人资料</span>
            </el-button>
        </div>
        <div>
            <el-divider><span style="color: #858585">详细信息</span></el-divider>
            <div style="text-align: center">
                <!--<div>-->
                <!--    <el-row justify="center">-->
                <!--        <el-col :span="12">-->
                <!--            性别-->
                <!--        </el-col>-->
                <!--        <el-col :span="12">-->
                <!--            男-->
                <!--        </el-col>-->
                <!--    </el-row>-->
                <!--</div>-->
            </div>

            <div style="padding-left: 200px">
                <el-descriptions :column="1">
                    <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
                    <el-descriptions-item label="居住地">苏州市</el-descriptions-item>
                    <el-descriptions-item label="性别">男</el-descriptions-item>
                    <el-descriptions-item label="联系地址">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
                </el-descriptions>
            </div>
        </div>
    </el-dialog>
</template>

<script>
export default {
    name: "userInfoDialog",
    data() {
        return {
            dialogFormVisible: false,
        };
    },
    methods: {
        closeLog() {
            this.$emit('closeLog')
        },
    },
    props: {
        dialogTableVisible: {
            type: Boolean,
            default: false
        }
    }
};
</script>

<style scoped>
.face-img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    /*align-items: center;*/
}

span {
    font-weight: bold;
    font-size: 15px;
    /*color: rgba(51, 51, 51, 0.99);*/
}

.info-change-button {
    width: 250px;
    background: #f0f0f0;
}

.info-change-button:hover {
    color: #333333;
    background: #ecf5ff;
}

.info-change-button:focus {
    background: #ecf5ff;
    color: #333333;
    /*opacity: 0.5;*/
}
</style>
