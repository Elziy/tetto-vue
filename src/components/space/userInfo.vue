<template>
    <div>
        <el-row type="flex" class="row-bg">
            <el-col :span="4" :offset="1" :xl="xl">
                <!--头像-->
                <div class="face-space">
                    <img class="face-img" src="@/assets/images/face.jpg" alt="face">
                </div>
            </el-col>

            <el-col :span="9" style="padding-top: 40px">
                <div>
                    <span style="font-weight: bold;font-size: 30px">埃及房管局</span>
                </div>
                <div>
                    <el-row type="flex" class="row-bg">
                        <el-col :span="8">
                            <el-link :underline="false" class="follow" @click="following">
                                关注 <span class="follow-span">1251</span>
                            </el-link>
                        </el-col>
                        <el-col :span="8">
                            <el-link :underline="false" class="follow" @click="follows">
                                粉丝 <span class="follow-span">2166500</span>
                            </el-link>
                        </el-col>
                    </el-row>
                </div>
                <div style="padding-top: 10px">
                    <el-link :underline="false" class="follow" @click="userInfo">
                        <span style="font-size: 15px">查看个人资料</span>
                    </el-link>
                    <user-info-dialog
                            :dialogTableVisible="dialogTableVisible"
                            @closeLog="userInfo"
                    ></user-info-dialog>
                </div>
            </el-col>
            <el-col :span="6" :offset="7" style="padding-top: 40px">
                <el-button round class="info-change-button" @click="changeInfo">
                    <span style="font-weight: bold">编辑个人资料</span>
                </el-button>
                <user-info-change-dialog
                        :infoChangeDialog="infoChangeDialog"
                        @closeLog="changeInfo"
                ></user-info-change-dialog>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import userInfoDialog from "@/components/space/userInfoDialog";
import userInfoChangeDialog from "@/components/space/userInfoChangeDialog";

export default {
    name: "userInfo",
    components: {
        userInfoDialog,
        userInfoChangeDialog
    },
    data() {
        return {
            dialogTableVisible: false,
            infoChangeDialog: false
        }
    },

    methods: {
        following() {
            this.$message.success("关注")
        },
        follows() {
            this.$message.success("粉丝")
        },
        userInfo() {
            this.dialogTableVisible = !this.dialogTableVisible
        },
        changeInfo() {
            this.infoChangeDialog = !this.infoChangeDialog
        },
    }
}
</script>

<style scoped>
.face-space {
    padding-left: 60px;
}

.face-img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    /*align-items: center;*/
}

.follow:hover {
    text-decoration: none;
    color: #333333;
}

.follow-span {
    font-weight: bold;
    font-size: 19px;
    /*color: rgba(51, 51, 51, 0.99);*/
}

.info-change-button {
    width: 250px;
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
