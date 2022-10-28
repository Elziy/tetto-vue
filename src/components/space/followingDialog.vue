<template>
    <el-dialog :visible.sync="dialog"
               @close="closeLog"
               top="100px"
    >
        <follow-title slot="title" :followers="followerNum" :followings="followingNum"></follow-title>
        <div style="height: 500px;overflow-y: scroll">
            <following-user v-if="$store.state.space.flag === 'following'"
                            v-for="(following,index) in followings" :key='index'
                            :uid="following.uid"
                            :followed="following.followed"
                            :username="following.username"
                            :avatar="following.avatar"
                            :introduce="following.introduce"
            ></following-user>

            <follower-user
                    v-if="$store.state.space.flag === 'follower'"
                    v-for="(follower,index) in followers" :key='index'
                    :uid="follower.uid"
                    :following="follower.following"
                    :username="follower.username"
                    :avatar="follower.avatar"
                    :introduce="follower.introduce"
            >
            </follower-user>

            <div style="padding-right: 20px;text-align: center">
                <el-divider></el-divider>
                <span>暂时没有更多了</span>
            </div>
        </div>
    </el-dialog>
</template>

<script>
import followTitle from "@/components/space/title";
import followingUser from "@/components/space/FollowingUser";
import followerUser from "@/components/space/followerUser";

export default {
    name: "followingDialog",
    components: {
        followTitle,
        followingUser,
        followerUser
    },
    computed: {
        dialog: {
            get() {
                return this.$store.state.space.followingDialog;
            },
            set(val) {
                this.$store.state.space.followingDialog = val
            }
        },
        followerNum: {
            get() {
                return this.$store.state.space.userInfo.followers
            },
            set(val) {
                this.$store.state.space.userInfo.followers = val
            }
        },
        followingNum: {
            get() {
                return this.$store.state.space.userInfo.following
            },
            set(val) {
                this.$store.state.space.userInfo.following = val
            }
        },
        flag: {
            get() {
                return this.$store.state.space.flag
            },
            set(val) {
                this.$store.state.space.flag = val
            }
        },
    },
    data() {
        return {
            followings: [],
            followers: []
        };
    },
    watch: {
        flag(val) {
            if (val === 'follower') {
                this.$http.get('auth/user/followers')
                        .then(res => {
                            if (res.data.code === 0) {
                                this.followers = res.data.data
                            }
                        });
            } else {
                this.$http.get('auth/user/followings')
                        .then(res => {
                            if (res.data.code === 0) {
                                this.followings = res.data.data
                            }
                        });
            }
        }
    },
    methods: {
        closeLog() {
            this.$store.commit('space/CLOSE_FOLLOWING')
        },

    },
    beforeCreate() {
        if (this.$store.state.space.flag === 'follower') {
            this.$http.get('auth/user/followers')
                    .then(res => {
                        if (res.data.code === 0) {
                            this.followers = res.data.data
                        }
                    });
        } else {
            this.$http.get('auth/user/followings')
                    .then(res => {
                        if (res.data.code === 0) {
                            this.followings = res.data.data
                        }
                    });
        }
    },

}
</script>

<style>
.el-dialog__body {
    padding: 0 0 0 20px;
    color: #606266;
    word-break: break-all;
}
</style>
