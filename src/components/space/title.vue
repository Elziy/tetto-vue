<template>
    <div class="following-follower">
        <div href="javascript:;" @click.stop="toFollowings" :class="followingClass">关注 ({{ followings }})</div>
        <div href="javascript:;" @click.stop="toFollowers" :class="followerClass">粉丝 ({{ followers }})</div>
    </div>
</template>

<script>
export default {
    name: "title",
    props: {
        followings: {
            type: Number,
            default: 0
        },
        followers: {
            type: Number,
            default: 0
        }
    },
    computed: {
        followingClass() {
            return this.$store.state.space.flag === 'following' ? 'following active' : 'following un-active'
        },
        followerClass() {
            return this.$store.state.space.flag === 'follower' ? 'follower active' : 'follower un-active'
        }
    },
    methods: {
        toFollowings() {
            this.$store.state.space.flag = 'following'
        },
        toFollowers() {
            this.$store.state.space.flag = 'follower'
        }
    }
}
</script>

<style scoped>
.following-follower {
    display: flex;
    flex-direction: row;
}


.following, .follower {
    cursor: pointer;
    color: #606266;
    font-weight: 600;
    font-size: 18px;
    line-height: 26px;
    margin-right: 40px;
}

.following:hover, .follower:hover {
    color: #333333;
}

.active {
    font-weight: bold;
    color: #18191C;
}

.un-active {
    color: rgba(47, 48, 53, .7);
    font-weight: 400;
}
</style>
