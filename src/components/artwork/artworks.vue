<template>
    <div v-if="show">
        <navbar></navbar>
        <div style="background:#f5f5f5;display: flex;position: relative;flex-flow: column">
            <div style="margin: 0 auto;max-width: 1224px;">
                <div style="margin-top: 40px;display: flex;padding-bottom: 56px;">
                    <!--白色主区域-->
                    <main style="flex: 0 0 auto;width: 912px;display: block">
                        <!--&lt;!&ndash;主区域顶部&ndash;&gt;-->
                        <!--<div style="text-align: center;">-->
                        <!--    <div style="width: 90%;">-->
                        <!--        <el-image style="width: 911px; height: 512.6px"-->
                        <!--                  src="http://static.tetto.com/2022/10/08/c5553736785147ba8003c47aa0b09d9c.jpg"-->
                        <!--                  :preview-src-list="srcList">-->
                        <!--        </el-image>-->
                        <!--        &lt;!&ndash;<el-image style="width: 400px; height: 700px"&ndash;&gt;-->
                        <!--        &lt;!&ndash;          src="http://static.tetto.com/2022/10/08/69000b46e8b24027a80996fb70782c3c.jpg"&ndash;&gt;-->
                        <!--        &lt;!&ndash;          :preview-src-list="srcList">&ndash;&gt;-->
                        <!--        &lt;!&ndash;</el-image>&ndash;&gt;-->
                        <!--    </div>-->
                        <!--</div>-->

                        <section>
                            <div style="margin-top: -16px;border-radius: 8px 8px 0 0;margin-left: -16px;margin-right: -16px;background:#fafafa">
                                <div style="position: relative;z-index: 0;">
                                    <!--图-->
                                    <figure style="margin: 0">
                                        <div style="text-align: center;">
                                            <div>
                                                <el-image
                                                        v-for="(item,index) in $store.state.artwork.imgs"
                                                        :key="index"
                                                        :src="item.imgUrl"
                                                        :style="item.width > item.height ? 'border-radius: 1%;width: 944px;' : 'border-radius: 1%;height: 700px;weight: auto'"
                                                        :preview-src-list="list"
                                                >
                                                </el-image>

                                                <!--<el-image style="width: 911px; height: 513px;border-radius: 1%;"-->
                                                <!--          src="http://static.tetto.com/2022/10/08/c5553736785147ba8003c47aa0b09d9c.jpg"-->
                                                <!--          :preview-src-list="srcList"-->
                                                <!--          lazy>-->
                                                <!--</el-image>-->
                                                <!--<el-image style="width: 400px; height: 700px;border-radius: 1%;"-->
                                                <!--          src="http://static.tetto.com/2022/10/08/69000b46e8b24027a80996fb70782c3c.jpg"-->
                                                <!--lazy>-->
                                                <!--</el-image>-->
                                            </div>
                                        </div>
                                    </figure>
                                    <!--赞-->
                                    <div style="position: sticky;bottom: 0;z-index: 1;">
                                        <div>
                                            <section
                                                    style="display: flex;flex-flow: row-reverse;padding: 8px 12px;height: 48px;box-sizing: border-box;flex: 1 0 0;">
                                                <div style="position: relative;margin-right: 10px;">
                                                    <button type="button"
                                                            style="display: block;box-sizing: content-box;padding: 0;color: inherit;background: none;border: none;line-height: 1;height: 32px;cursor: pointer;">
                                                        <svg viewBox="0 0 32 32" width="32" height="32">
                                                            <path d="M17,9.91842728 L17,18.0042137 C17,18.5564985 16.5522847,19.0042137 16,19.0042137
C15.4477153,19.0042137 15,18.5564985 15,18.0042137 L15,9.91842728 L11.7071068,13.2113205
C11.3165825,13.6018448 10.6834175,13.6018448 10.2928932,13.2113205
C9.90236893,12.8207962 9.90236893,12.1876312 10.2928932,11.7971069 L16,6.09000015 L21.7071068,11.7971069
C22.0976311,12.1876312 22.0976311,12.8207962 21.7071068,13.2113205
C21.3165825,13.6018448 20.6834175,13.6018448 20.2928932,13.2113205 L17,9.91842728 Z
M25,17 L25,24 C25,25.6568542 23.6568542,27 22,27 L10,27 C8.34314575,27 7,25.6568542 7,24 L7,17
C7,16.4477153 7.44771525,16 8,16 C8.55228475,16 9,16.4477153 9,17 L9,24
C9,24.5522847 9.44771525,25 10,25 L22,25 C22.5522847,25 23,24.5522847 23,24 L23,17
C23,16.4477153 23.4477153,16 24,16 C24.5522847,16 25,16.4477153 25,17 Z" transform=""></path>
                                                        </svg>
                                                    </button>
                                                </div>
                                                <div style="display: flex;position: relative;margin-right: 13px;">
                                                    <button type="button" @click="addOrCancelLike"
                                                            style="display: block;box-sizing: content-box;padding: 0;color: inherit;background: none;border: none;line-height: 1;height: 32px;cursor: pointer;">
                                                        <svg :style="svg"
                                                             viewBox="0 0 32 32" width="32" height="32"
                                                             class="sc-j89e3c-1 bXjFLc">
                                                            <defs>
                                                                <mask id="uid-mask-1">
                                                                    <rect x="0" y="0" width="32" height="32"
                                                                          fill="white"></rect>
                                                                    <path :style="path" d="M16,11.3317089 C15.0857201,9.28334665 13.0491506,7.5 11,7.5
C8.23857625,7.5 6,9.73857647 6,12.5 C6,17.4386065 9.2519779,21.7268174 15.7559337,25.3646328
C15.9076021,25.4494645 16.092439,25.4494644 16.2441073,25.3646326 C22.7480325,21.7268037 26,17.4385986 26,12.5
C26,9.73857625 23.7614237,7.5 21,7.5 C18.9508494,7.5 16.9142799,9.28334665 16,11.3317089 Z"></path>
                                                                </mask>
                                                            </defs>
                                                            <g mask="url(#uid-mask-1)">
                                                                <path d="
M21,5.5 C24.8659932,5.5 28,8.63400675 28,12.5 C28,18.2694439 24.2975093,23.1517313 17.2206059,27.1100183
C16.4622493,27.5342993 15.5379984,27.5343235 14.779626,27.110148 C7.70250208,23.1517462 4,18.2694529 4,12.5
C4,8.63400691 7.13400681,5.5 11,5.5 C12.829814,5.5 14.6210123,6.4144028 16,7.8282366
C17.3789877,6.4144028 19.170186,5.5 21,5.5 Z"></path>
                                                                <path d="M16,11.3317089 C15.0857201,9.28334665 13.0491506,7.5 11,7.5
C8.23857625,7.5 6,9.73857647 6,12.5 C6,17.4386065 9.2519779,21.7268174 15.7559337,25.3646328
C15.9076021,25.4494645 16.092439,25.4494644 16.2441073,25.3646326 C22.7480325,21.7268037 26,17.4385986 26,12.5
C26,9.73857625 23.7614237,7.5 21,7.5 C18.9508494,7.5 16.9142799,9.28334665 16,11.3317089 Z"
                                                                      class="sc-j89e3c-0 dUurgf"></path>
                                                            </g>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </section>
                                        </div>
                                    </div>
                                    <!--介绍-->
                                    <div style="position: relative;overflow: hidden;">
                                        <div style="display: flex;-webkit-box-pack: center;justify-content: center;margin: 48px auto;padding: 0 16px;">
                                            <div style="width: 600px">
                                                <h1 style="margin: 0 0 8px;color: rgb(31, 31, 31);font-size: 20px;line-height: 24px;font-weight: bold;">
                                                    {{ $store.state.artwork.atlas.title }}</h1>
                                                <footer style="display: flex;margin: 16px 0;color: rgb(173, 173, 173);line-height: 18px;">
                                                    <ul style="display: flex;-webkit-box-align: center;align-items: center;margin: 16px -4px;list-style: none;padding: 0px;">
                                                        <li style="display: inline;margin: 0 12px 0 0"
                                                            v-for="(item,index) in $store.state.artwork.tags"
                                                            :key="index">
                                                            <span><a
                                                                    :href="'/tags/'+ item.substring(1,item.length) +'/artworks'">
                                                                {{ item }}</a></span>
                                                        </li>
                                                    </ul>
                                                </footer>
                                                <!--投稿时间-->
                                                <div title="投稿时间" style="font-size: 12px;line-height: 1;">投稿于
                                                    {{ $store.state.artwork.atlas.date }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </main>
                    <!--侧边栏作者信息-->
                    <aside style="margin-left: 24px;width: 288px;flex: 0 0 auto;display: block">
                        <div style="display: grid;grid-template-columns: 1fr;font-size: 12px;padding-left: 10px">
                            <div style="display: flex;-webkit-box-align: center;align-items: center;margin: 0px;font-size: 1em;">
                                <div style="display: flex;-webkit-box-align: center;align-items: center;">
                                    <el-avatar :size="50"
                                               :src="$store.state.artwork.userInfo.avatar"></el-avatar>
                                </div>
                                <div style="display: grid;gap: 2px;margin: 0 8px;color: rgb(173, 173, 173);font-size: 1rem;line-height: calc(1em + 8px);">
                                    <a style="font-size: 20px;font-weight: bold;margin-left: 0px;word-break: break-all;color: rgb(31, 31, 31);text-decoration: none;"
                                       :href="'/space/' + $store.state.artwork.userInfo.uid">
                                        <div>{{ $store.state.artwork.userInfo.username }}</div>
                                    </a>
                                </div>
                            </div>
                            <!--按钮-->
                            <div style="display: grid;grid-template-columns: 1fr;row-gap: 8px;margin: 8px 0px 16px;">
                                <div style="display: flex;flex-flow: column;flex: 1 1 auto;">
                                    <div v-if="$store.state.artwork.self">
                                        <el-button round class="follow-button" @click="edit">
                                                    <span style="font-weight: bold">
                                                        <i class="el-icon-edit-outline"></i>
                                                        编辑作品
                                                    </span>
                                        </el-button>
                                        <change-dialog></change-dialog>
                                    </div>

                                    <div v-else>
                                        <el-button v-if="$store.state.artwork.userInfo.isFollow" round
                                                   class="follow-button"
                                                   @click="isFollow">
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
                                </div>
                            </div>
                            <!--最新三个作品-->
                            <div style="margin: 0;border-radius: 8px;">
                                <header style="display: flex;margin: 6px 0">
                                    <div style="color: rgb(92, 92, 92);font-size: inherit;line-height: inherit;margin: 0px;font-weight: bold;">
                                        最新作品
                                    </div>
                                    <a style="margin-left: auto;color: rgb(173, 173, 173);font-size: 12px;line-height: calc(1em + 4px);font-weight: normal;text-decoration: none;"
                                       :href="'/space/' + $store.state.artwork.userInfo.uid">
                                        查看全部作品
                                    </a>
                                </header>
                                <nav style="display: flex;-webkit-box-pack: center;justify-content: center;margin: 12px 0px;">
                                    <div v-for="(item,index) in $store.state.artwork.latestAtlas" :key="index"
                                         style="margin: 0 4px;width: 90px;height: 90px;">
                                        <a href="javascript:;" @click="toAtlas(item.id)"
                                           style="text-decoration: none;background-color: transparent;">
                                            <div style="position: relative;display: flex;-webkit-box-align: center;align-items: center;-webkit-box-pack: center;justify-content: center;width: 100%;height: 100%;">
                                                <img style="object-fit: cover;object-position: center center;width: 100%;height: 100%;border-radius: 8px;background-color: rgb(255, 255, 255);transition: opacity 0.2s ease 0s;border-style: none;"
                                                     :src="item.thumbnailUrl" :alt="item.title">
                                            </div>
                                        </a>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import navbar from "@/components/common/navbar";
import changeDialog from "@/components/artwork/changeDialog";
import axios from "axios";
import NProgress from "nprogress";
import ChangeDialog from "@/components/artwork/changeDialog";
import {mapState} from "vuex";

export default {
    name: "artworks",
    components: {
        ChangeDialog,
        navbar,
        changeDialog
    },
    data() {
        return {
            show: false,
            list: [],
        }
    },
    computed: {
        ...mapState('artwork', {like: 'like'}),

        svg() {
            return this.like ? 'color: #ff4060;fill: currentcolor;' : ''
        },
        path() {
            return this.like ? 'fill: white;' : ''
        },
    },
    methods: {
        toFollowing() {
            let fid = this.$store.state.artwork.userInfo.uid
            axios.get("auth/user/follow/" + fid,)
                    .then(res => {
                        if (res.data.code === 0) {
                            this.$message.success("关注成功")
                            this.$store.state.artwork.userInfo.followers += 1
                            this.$store.state.artwork.userInfo.isFollow = true
                        } else {
                            this.$message.error('关注失败')
                        }
                    }, err => {
                        this.$message.error(err)
                    })
        },
        isFollow() {
            this.$confirm('确认取关   ' + this.$store.state.artwork.userInfo.username + '  吗？')
                    .then(() => {
                        let fid = this.$store.state.space.userInfo.uid
                        axios.get("auth/user/unfollow/" + fid,)
                                .then(res => {
                                    if (res.data.code === 0) {
                                        this.$message.success("取关成功")
                                        this.$store.state.artwork.userInfo.followers -= 1
                                        this.$store.state.artwork.userInfo.isFollow = false
                                    } else {
                                        this.$message.error(res.data.message)
                                    }
                                }, err => {
                                    this.$message.error(err)
                                })
                    })
        },
        edit() {
            this.$store.state.artwork.dialog = true
        },
        addOrCancelLike() {
            if (this.like) {
                this.$confirm('确认取消收藏 ' + this.$store.state.artwork.atlas.title + ' 吗？')
                        .then(() => {
                            axios.delete("image/like/" + this.$store.state.artwork.atlas.id)
                                    .then(res => {
                                        if (res.data.code === 0) {
                                            this.$store.commit('artwork/cancelLike')
                                            this.$message.success("取消收藏成功")
                                        } else {
                                            this.$message.error('取消收藏失败')
                                        }
                                    }, err => {
                                        this.$message.error(err)
                                    })
                        })
            } else {
                axios.post("image/like/" + this.$store.state.artwork.atlas.id)
                        .then(res => {
                            if (res.data.code === 0) {
                                this.$message.success("收藏成功")
                                this.$store.commit('artwork/like')
                            } else {
                                this.$message.error('收藏失败')
                            }
                        }, err => {
                            this.$message.error(err)
                        })
            }
        },
        toAtlas(id) {
            this.$store.dispatch("artwork/setImg", id);
            setTimeout(() => {
                this.$store.state.artwork.imgs.forEach((item, index) => {
                    this.list.push(item.imgUrl)
                })
                this.show = true;
            }, 60);
        },
    },
    beforeCreate() {
        let aid = this.$route.params.aid;
        this.$store.dispatch("artwork/set", aid);
        setTimeout(() => {
            this.$store.state.artwork.imgs.forEach((item, index) => {
                this.list.push(item.imgUrl)
            })
            this.show = true;
        }, 60);
    },
}
</script>

<style scoped>
.follow-button {
    width: 300px;
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

/*.bXjFLc {*/
/*    color: #ff4060;*/
/*    fill: currentcolor;*/
/*}*/

/*.bXjFLc mask .sc-j89e3c-0 {*/
/*    fill: white;*/
/*}*/
</style>
