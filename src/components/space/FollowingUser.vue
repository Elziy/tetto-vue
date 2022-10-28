<template>
    <div class="following-user">
        <div class="avatar">
            <a href="javascript:;" type="text" @click="userSpace">
                <img :src="avatar" class="face-avatar-image" alt="avatar">
            </a>
        </div>
        <div class="username-introduce">
            <div class="TXnCOMLE">
                <a href="javascript:;" type="text" @click="userSpace">
                    <span class="username">{{ username }}</span>
                </a>
                <div style="padding-top: 10px">
                    <span class="introduce">{{ introduceShow ? introduceShow[0] : '' }}</span>
                </div>
            </div>
        </div>
        <div>
            <el-button v-if="follow && followed" round class="follow-button"
                       @click="cancelFollow"><span style="font-weight: bold">
                        <i class="el-icon-check"></i>相互关注</span>
            </el-button>

            <el-button v-if="follow && !followed" round class="follow-button"
                       @click="cancelFollow"><span style="font-weight: bold">
                        <i class="el-icon-check"></i>已关注</span>
            </el-button>

            <el-button v-if="!follow" round class="un-follow-button" @click="toFollowing">
                <span style="font-weight: bold"><i class="el-icon-plus"></i>关注</span>
            </el-button>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "FollowingUser",
    data() {
        return {
            follow: true,
        }
    },
    props: {
        followed: {
            default: false,
            type: Boolean
        },
        uid: Number,
        username: String,
        avatar: String,
        introduce: String,
    },
    computed: {
        introduceShow() {
            // 将个人简介按照\n分割成数组
            if (this.introduce != null) {
                return this.userInfo.introduce.split("\n");
            } else {
                return []
            }
        }
    },
    methods: {
        userSpace() {
            this.$store.commit('space/CLOSE_FOLLOWING')
            this.$router.push('/space/' + this.uid);
        },
        toFollowing() {
            let fid = this.uid
            axios.get("auth/user/follow/" + fid,)
                    .then(res => {
                        if (res.data.code === 0) {
                            this.follow = true
                            this.$store.state.space.userInfo.following += 1
                        } else {
                            this.$message.error(res.data.message)
                        }
                    }, err => {
                        this.$message.error(err)
                    })
        },
        cancelFollow() {
            this.$confirm('确认取关   ' + this.username + '  吗？')
                    .then(() => {
                        let fid = this.uid
                        axios.get("auth/user/unfollow/" + fid,)
                                .then(res => {
                                    if (res.data.code === 0) {
                                        this.$store.state.space.userInfo.following -= 1
                                        this.follow = false
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
.face-avatar-image {
    height: 60px;
    width: 60px;
    border-radius: 50%;
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
}

.un-follow-button {
    width: 120px;
}

.un-follow-button:hover {
    color: #333333;
    background: #ecf5ff;
}

.un-follow-button:focus {
    background: #ecf5ff;
    color: #333333;
}

.username {
    color: #18191C;
    font-weight: bold;
    font-size: 16px;
}

a {
    text-decoration: none !important;
}

.introduce {
    color: #18191C;
    font-size: 14px;
}

.following-user {
    align-items: center;
    display: flex;
    margin: 17px 27px 0 0;
    padding-bottom: 10px;
}

.following-user .avatar {
    cursor: pointer;
}

.following-user .username-introduce {
    flex: 1 1;
    margin: 0 16px;
    width: 0;
}
</style>
