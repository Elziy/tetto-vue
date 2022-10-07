<template>
    <el-dialog :visible.sync="dialog"
               @close="closeLog"
               top="50px"
    >
        <div style="text-align: center">
            <el-avatar :size="80" :src="userInfo.avatar" alt="avatar">
                <el-avatar style="padding-top: 12px" icon="el-icon-user-solid"></el-avatar>
            </el-avatar>
            <!--<img class="face-img" src="@/assets/images/face.jpg" alt="face">-->
        </div>
        <div style="text-align: center;padding-top: 5px">
            <span>{{ userInfo.username }}</span>
        </div>
        <div v-if="$store.state.space.self === true" style="text-align: center;padding-top: 5px">
            <el-button round class="info-change-button" @click="changeInfo">
                <span style="font-weight: bold">编辑个人资料</span>
            </el-button>
        </div>
        <div v-if="$store.state.space.self === false" style="text-align: center;padding-top: 5px">
            <el-button v-if="this.$store.state.space.userInfo.isFollow" round class="follow-button" @click="isFollow">
                    <span style="font-weight: bold">
                        <i class="el-icon-check"></i>
                        已关注
                    </span>
            </el-button>
            <el-button v-else round class="follow-button" @click="toFollowing">
                    <span style="font-weight: bold">
                        <i class="el-icon-plus"></i>
                        关注
                    </span>
            </el-button>
        </div>
        <div v-if="userInfo.introduce" style="text-align: center">
            <el-divider><span style="color: #858585">个人简介</span></el-divider>
            <!--    个人简介-->
            <div v-for="(i,index) in introduceShow" :key="index">
                <span>{{ i }}</span>
            </div>
        </div>
        <div>
            <el-divider><span style="color: #858585">详细信息</span></el-divider>

            <div style="padding-left: 180px">
                <el-descriptions :column="1">
                    <!--<el-descriptions-item v-if="userInfo.introduce != null" label="自我介绍">{{ userInfo.introduce }}-->
                    <!--</el-descriptions-item>-->
                    <el-descriptions-item v-if="userInfo.sex != null" label="性别">{{
                            userInfo.sex
                        }}
                    </el-descriptions-item>
                    <el-descriptions-item v-if="userInfo.email != null" label="邮箱">{{
                            userInfo.email
                        }}
                    </el-descriptions-item>
                    <el-descriptions-item v-if="userInfo.birthday != null" label="生日">{{
                            userInfo.birthday | birthdayFormat
                        }}
                    </el-descriptions-item>
                </el-descriptions>
            </div>
        </div>
    </el-dialog>
</template>

<script>
import {mapState} from "vuex";
import axios from "axios";

export default {
    name: "userInfoDialog",
    computed: {
        ...mapState('space', {userInfo: 'userInfo'}),
        introduceShow() {
            // 将个人简介按照\n分割成数组
            if (this.userInfo.introduce != null) {
                return this.userInfo.introduce.split("\n");
            }
        },
    },
    data() {
        return {
            dialog: false,
        }
    },
    methods: {
        closeLog() {
            this.$emit('closeLog')
        },
        changeInfo() {
            this.dialog = false
            setTimeout(() => {
                this.$emit('changeInfo')
            }, 300)
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
    },
};
</script>

<style scoped>
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

.follow-button {
    width: 250px;
    color: #ecf5ff;
    background: #559eff !important;
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
