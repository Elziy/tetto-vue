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
            <el-button round class="info-change-button">
                <span style="font-weight: bold">编辑个人资料</span>
            </el-button>
        </div>
        <div v-if="$store.state.space.self === false" style="text-align: center;padding-top: 5px">
            <el-button round class="follow-button" style="background: #559eff">
                <span style="font-weight: bold">+关注</span>
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
                    <el-descriptions-item v-if="userInfo.introduce != null" label="自我介绍">{{ userInfo.introduce }}
                    </el-descriptions-item>
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

export default {
    name: "userInfoDialog",
    computed: {
        ...mapState('space', {userInfo: 'userInfo'}),
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
    },
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
