<template>
    <el-dialog
            title="裁剪缩略图"
            :visible.sync="$store.state.upload.thumbnailCropperDialog"
            :show-close="true"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            top="30px"
            width="600px"
    >
        <div class="avatar-container">
            <!-- 已上传图片 -->
            <div v-show="$store.state.upload.cropperImage" class="avatar-crop">
                <vueCropper
                        class="crop-box"
                        ref="cropper"
                        :img="$store.state.upload.cropperImage"
                        :autoCrop="options.autoCrop"
                        :fixedBox="options.fixedBox"
                        :canMoveBox="options.canMoveBox"
                        :autoCropWidth="options.autoCropWidth"
                        :autoCropHeight="options.autoCropHeight"
                        :centerBox="options.centerBox"
                        :fixed="options.fixed"
                        :fixedNumber="options.fixedNumber"
                        :canMove="options.canMove"
                        :canScale="options.canScale"
                ></vueCropper>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
      <div>
          <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="getCrop">确 定</el-button>
      </div>
    </span>
    </el-dialog>
</template>

<script>
import {VueCropper} from 'vue-cropper'

export default {
    name: "thumbnailCropper",
    components: {
        VueCropper
    },
    data() {
        return {
            // vueCropper组件 裁剪配置信息
            options: {
                // img: '', // 原图文件
                autoCrop: true, // 默认生成截图框
                fixedBox: false, // 固定截图框大小
                canMoveBox: true, // 截图框可以拖动
                autoCropWidth: 400, // 截图框宽度
                autoCropHeight: 400, // 截图框高度
                fixed: true, // 截图框宽高固定比例
                fixedNumber: [1, 1], // 截图框的宽高比例
                centerBox: true, // 截图框被限制在图片里面
                canMove: true, // 上传图片不允许拖动
                canScale: true // 上传图片不允许滚轮缩放
            }
        };
    },
    methods: {
        // 获取截图信息
        getCrop() {
            // 获取截图的 blob 数据
            this.$refs.cropper.getCropBlob(data => {
                let file = new FormData();
                file.append("file", data);
                this.$http.post("http://art.tetto.com/static/upload", file)
                        .then(res => {
                            if (res.data.code === 200) {
                                this.$store.state.upload.thumbnailUrl = res.data.url;
                                this.$message.success("设置缩略图成功");
                            }
                        })
                this.closeDialog()
            })
        },
        // 关闭弹框
        closeDialog() {
            this.$store.state.upload.thumbnailCropperDialog = false
        }
    }
}
</script>

<style scoped>

.avatar-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 560px;
    height: 400px;
    background-color: #f0f2f5;
    margin-right: 10px;
    border-radius: 4px;
}

.avatar-container .upload {
    text-align: center;
    margin-bottom: 24px;
}

.avatar-container .avatar-crop {
    width: 560px;
    height: 400px;
    position: relative;
}

.avatar-container .avatar-crop .crop-box {
    width: 100%;
    height: 100%;
    border-radius: 4px;
    overflow: hidden;
}

</style>
