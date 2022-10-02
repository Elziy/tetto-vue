<template>
    <el-dialog title="编辑个人资料"
               :visible.sync="infoChangeDialog"
               @close="closeLog"
               top="50px"
               center
               class="dialog"
    >
        <el-row>
            <!--头像-->
            <el-col :span="3">
                <span style="color: #99a9bf ">头像</span>
            </el-col>
            <el-col :span="12">
                <div style="width: 100px;height: 100px;position: relative">
                    <div>
                        <img class="face-img" src="@/assets/images/face.jpg" alt="face">
                    </div>
                    <div style="position: absolute;bottom: 0;right: 0;">
                        <el-button @click="changeFace" style="background: silver;color: white" icon="el-icon-edit"
                                   circle></el-button>
                    </div>
                </div>
            </el-col>
        </el-row>
        <hr>
        <user-info-change-form></user-info-change-form>
    </el-dialog>
</template>

<script>
import userInfoChangeForm from "@/components/space/userInfoChangeForm";

export default {
    name: "userInfoChangeDialog",
    components: {
        userInfoChangeForm
    },
    props: {
        infoChangeDialog: {
            default: false,
            type: Boolean
        }
    },
    methods: {
        closeLog() {
            this.$emit('closeLog')
        },
        changeFace() {
            this.$message.success("修改头像")
        },
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
