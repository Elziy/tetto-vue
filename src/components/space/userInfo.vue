<template>
    <div>
        <el-row type="flex" class="row-bg">
            <el-col :span="4" :offset="1">
                <!--头像-->
                <div class="face-space">
                    <el-avatar :size="100" :src="$store.state.space.userInfo.avatar" alt="avatar">
                        <el-avatar style="padding-top: 12px" icon="el-icon-user-solid"></el-avatar>
                    </el-avatar>
                    <!--<img class="face-img" :src="loginUser.avatar" alt="avatar">-->
                </div>
            </el-col>

            <el-col :span="9" style="padding-top: 40px">
                <div>
                    <span style="font-weight: bold;font-size: 30px">{{ $store.state.space.userInfo.username }}</span>
                </div>
                <div>
                    <el-row type="flex" class="row-bg">
                        <el-col :span="6">
                            <el-link :underline="false" class="follow" @click="following()">
                                关注 <span class="follow-span">{{ $store.state.space.userInfo.following || 0 }}</span>
                            </el-link>
                        </el-col>
                        <el-col :span="8">
                            <el-link :underline="false" class="follow" @click="followers">
                                粉丝 <span class="follow-span">{{ $store.state.space.userInfo.followers || 0 }}</span>
                            </el-link>
                        </el-col>
                    </el-row>
                    <following-dialog></following-dialog>
                </div>
                <div v-if="this.$store.state.space.userInfo.introduce" style="padding-top: 10px">
                    <span style="font-size: 14px;color: #606266">个人介绍</span>
                    <el-divider direction="vertical"></el-divider>
                    <span style="font-size: 14px;color: #606266">{{
                            $store.state.space.userInfo.introduce | introduce
                        }}</span>
                </div>
                <div style="padding-top: 10px">
                    <el-link :underline="false" class="follow" @click="userInfo">
                        <span style="font-size: 15px">查看个人资料</span>
                    </el-link>
                    <user-info-dialog
                            ref="info-dialog"
                            @closeLog="userInfo"
                            @changeInfo="changeInfo"
                    ></user-info-dialog>
                </div>
            </el-col>

            <el-col v-if="$store.state.space.self === false" :span="6" :offset="7" style="padding-top: 40px">
                <el-button v-if="this.$store.state.space.userInfo.isFollow" round class="follow-button"
                           @click="isFollow">
                    <span style="font-weight: bold">
                        <i class="el-icon-check"></i>
                        <!--<i class="el-icon-loading"></i>-->
                        已关注
                    </span>
                </el-button>
                <el-button v-else round class="follow-button" @click="toFollowing">
                    <span style="font-weight: bold">
                        <i class="el-icon-plus"></i>
                        关注
                    </span>
                </el-button>
            </el-col>

            <el-col v-else :span="6" :offset="7" style="padding-top: 40px">
                <el-button round class="info-change-button" @click="changeInfo">
                    <span style="font-weight: bold">编辑个人资料</span>
                </el-button>
                <user-info-change-dialog ref="change-dialog"
                                         @closeLog="changeInfo"
                                         @changeOver="changeInfo"
                ></user-info-change-dialog>
            </el-col>

        </el-row>
    </div>
</template>

<script>
import userInfoDialog from "@/components/space/userInfoDialog";
import userInfoChangeDialog from "@/components/space/userInfoChangeDialog";
import followingDialog from "@/components/space/followingDialog";
import axios from "axios";

export default {
    name: "userInfo",
    components: {
        userInfoDialog,
        userInfoChangeDialog,
        followingDialog
    },
    data() {
        return {
            infoDialog: false,
            infoChangeDialog: false
        }
    },
    methods: {
        following() {
            if (!this.$store.state.space.self) {
                this.$message.warning("只能查看自己的关注列表");
                return;
            }
            if (this.$store.state.space.userInfo.following === 0) {
                this.$message({
                    message: '您还没有关注任何人',
                    type: 'warning'
                });
            } else {
                this.$store.commit('space/OPEN_FOLLOWING', 'following')
            }
        },
        followers() {
            if (!this.$store.state.space.self) {
                this.$message.warning("只能查看自己的粉丝列表");
                return;
            }
            if (this.$store.state.space.userInfo.followers === 0) {
                this.$message({
                    message: '您还没有粉丝',
                    type: 'warning'
                });
            } else {
                this.$store.commit('space/OPEN_FOLLOWING', 'follower')
            }
        },
        userInfo() {
            this.infoDialog = !this.infoDialog
            this.$refs["info-dialog"].dialog = this.infoDialog
        },
        changeInfo() {
            this.infoChangeDialog = !this.infoChangeDialog
            this.$refs["change-dialog"].dialog = this.infoChangeDialog
        },
        toFollowing() {
            let fid = this.$store.state.space.userInfo.uid
            axios.get("auth/user/follow/" + fid,)
                    .then(res => {
                        if (res.data.code === 0) {
                            this.$message.success("关注成功")
                            this.$store.state.space.userInfo.followers += 1
                            this.$store.state.space.userInfo.isFollow = true
                        } else {
                            this.$message.error(res.data.message)
                        }
                    }, err => {
                        this.$message.error(err)
                    })
        },
        isFollow() {
            this.$confirm('确认取关   ' + this.$store.state.space.userInfo.username + '  吗？')
                    .then(() => {
                        let fid = this.$store.state.space.userInfo.uid
                        axios.get("auth/user/unfollow/" + fid,)
                                .then(res => {
                                    if (res.data.code === 0) {
                                        this.$message.success("取关成功")
                                        this.$store.state.space.userInfo.followers -= 1
                                        this.$store.state.space.userInfo.isFollow = false
                                    } else {
                                        this.$message.error(res.data.message)
                                    }
                                }, err => {
                                    this.$message.error(err)
                                })
                    })
        }
    }
}
</script>

<style scoped>
.face-space {
    padding-left: 60px;
}

.follow:hover {
    text-decoration: none;
    color: #333333;
}

.follow-span {
    font-weight: bold;
    font-size: 19px;
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

.follow-button {
    width: 120px;
    color: #ecf5ff;
    background: #3996fb !important;
}

.follow-button:hover {
    color: #ecf5ff;
    background: #3286e1 !important;
}

.follow-button:focus {
    color: #ecf5ff;
    background: #3286e1 !important;
    /*opacity: 0.5;*/
}
</style>
