<template>
    <el-dialog title="编辑个人资料"
               :visible.sync="dialog"
               @close="closeLog"
               top="50px"
               center
               class="dialog"
               :destroy-on-close="true"
               :close-on-click-modal="false"
    >
        <!--头像-->
        <el-row>
            <el-col :span="3">
                <span style="color: #99a9bf">头像</span>
            </el-col>
            <el-col :span="12">
                <div style="width: 100px;height: 100px;position: relative">
                    <div>
                        <el-avatar :size="100" :src="avatar" alt="avatar">
                            <el-avatar style="padding-top: 12px" icon="el-icon-user-solid"></el-avatar>
                        </el-avatar>
                        <!--<img class="face-img" :src="avatar" alt="avatar">-->
                    </div>
                    <div style="position: absolute;bottom: 0;right: 0;">
                        <el-button @click="changeFace" style="background: #ecf5ff;color: #333333" icon="el-icon-edit"
                                   circle></el-button>
                    </div>
                    <avatar-cropper
                            :dialogVisible.sync="avatarDialog"
                            @closeAvatarDialog="closeAvatarDialog">
                    </avatar-cropper>
                </div>
            </el-col>
        </el-row>
        <hr>
        <user-info-change-form></user-info-change-form>
        <div style="text-align: center">
            <el-button @click="dialog = false">返 回</el-button>
        </div>
    </el-dialog>
</template>

<script>
import userInfoChangeForm from "@/components/space/userInfoChangeForm";
import {mapState} from "vuex";
import avatarCropper from "@/components/space/avatarCropper";


export default {
    name: "userInfoChangeDialog",
    components: {
        userInfoChangeForm,
        avatarCropper
    },
    data() {
        return {
            dialog: false,
            avatarDialog: false
        };
    },
    methods: {
        closeLog() {
            this.$emit('closeLog')
        },
        changeFace() {
            this.avatarDialog = true;
        },
        closeAvatarDialog(data) {
            let file = new FormData();
            file.append("file", data);
            this.$http.post('http://art.tetto.com/static/upload', file).then(res => {
                if (res.data.code === 200) {
                    let avatar = res.data.url;
                    this.$http.post('auth/user/update', {
                        id: this.$store.state.auth.uid,
                        header: avatar
                    }).then(res => {
                                if (res.data.code === 0) {
                                    this.$store.commit('auth/SET_AVATAR', avatar);
                                    this.$store.state.space.userInfo.avatar = avatar;
                                    this.$message.success('头像修改成功');
                                } else {
                                    this.$message.error('头像修改失败,请稍后重试');
                                }
                            },
                            err => {
                                this.$message.error('头像修改失败,请稍后重试');
                            })
                } else {
                    this.$message.error('头像上传失败,请稍后重试');
                }
            }, err => {
                this.$message.error('头像上传失败,请稍后重试');
            })
            this.dialogVisible = false
        }
    },
    computed: {
        ...mapState('auth', {avatar: 'avatar'})
    }
};
</script>

<style>
.face-img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    /*align-items: center;*/
}

::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    /*background-color: #f5f5f5;*/
}

::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #c0c0c0;
}

::-webkit-scrollbar-track {
    border-radius: 0;
    /*background: rgba(0, 0, 0, 0.1);*/
}
</style>
