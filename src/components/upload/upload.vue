<template>
    <div>
        <div>
            <el-upload :limit="limit"
                       action="http://art.tetto.com/static/upload"
                       accept="image/*"
                       :before-upload="beforeUpload"
                       :on-success="success"
                       :on-error="error"
                       list-type="picture-card"
                       :auto-upload="true"
                       :on-preview="handlePictureCardPreview"
                       :on-remove="handleRemove"
                       :on-exceed="handleExceed"
                       ref="upload"
                       class="avatar-uploader"
                       :class="{hide:showUpload}"
                       :disabled="disabled"
            >
                <span class="upload-span">上传作品</span>
            </el-upload>
            <!--<el-button style="padding-top: 20px" @click="submitUpload">上传</el-button>-->
            <el-dialog
                    title="作品详情"
                    width="800px" :visible.sync="dialogVisible"
                    top="60px">
                <img height="350px;" style="object-fit: cover;width: auto;" :src="url" alt/>
                <span slot="footer" class="dialog-footer" style="text-align: end">
                      <el-button class="th-button" round @click="setTh(newThumbnailFile)">设置为缩略图</el-button>
                </span>

            </el-dialog>
        </div>
        <div style="padding-top: 20px">
            <thumbnail></thumbnail>
        </div>
    </div>
</template>

<script>
import thumbnail from "@/components/upload/thumbnail";

export default {
    name: 'upload',
    components: {
        thumbnail,
    },
    props: {
        limit: Number,
        disabled: Boolean,
    },
    data() {
        return {
            showUpload: false, //控制limit最大值之后 关闭上传按钮
            dialogVisible: false, //查看图片弹出框
            fileList: [], //上传的文件列表
            imgUrls: [], //上传图片后地址合集
            url: null,
            newThumbnailFile: null,
            form: {
                title: null,
                introduce: null,
                tags: [],
                isPublic: 1
            }
        };
    },
    methods: {
        change(file, fileList) {
            let reader = new FileReader()
            reader.readAsDataURL(file.raw)
            reader.onload = e => {
                let img = e.target.result;
                let image = new Image()
                image.src = img

                image.onload = _ => {
                    this.width = image.width
                    this.height = image.height
                }
            }
        },
        handleRemove(file, fileList) {
            if (typeof (file.response) !== "undefined") {
                // 删除数组中特定的元素
                this.imgUrls = this.imgUrls.filter((item, index) => {
                    return item.url !== file.response.url
                });
            }
            // 如果删除的是缩略图对应的作品
            if (file === this.$store.state.upload.thumbnailFile) {
                if (fileList.length > 0) {
                    this.$store.state.upload.thumbnailFile = fileList[0]
                    this.$store.state.upload.thumbnailUrl = fileList[0].response.url
                } else {
                    this.$store.state.upload.thumbnailFile = null
                    this.$store.state.upload.thumbnailUrl = null
                }
            }
        },
        //点击文件列表中已上传的文件时的函数
        handlePictureCardPreview(file) {
            this.url = file.url;
            this.newThumbnailFile = file;
            // if (typeof (file.response) !== "undefined") {
            //     this.$store.state.upload.thumbnailUrl = file.response.url;
            //     this.$store.state.upload.thumbnailFile = file;
            // }
            this.dialogVisible = true;
        },
        beforeUpload(file) {
            console.log(file)
            const size = file.size / 1024 / 1024;
            if (!(file.type === "image/png" || file.type === "image/gif" || file.type === "image/jpg" || file.type === "image/jpeg")) {
                this.$message.warning("请上传格式为image/png, image/gif, image/jpg, image/jpeg的图片",);
                return false
            } else if (size > 10) {
                this.$message.warning("图片大小必须小于10M",);
                return false
            }
            return new Promise(async (resolve, reject) => {
                this.imgCompress(file).then(res => {
                    resolve(res)
                })
            })
        },
        // 上传成功
        success(response, file, fileList) {
            if (response.code === 200) {
                // 设置缩略图
                if (this.$store.state.upload.thumbnailUrl === null) {
                    this.$store.state.upload.thumbnailUrl = response.url;
                    this.$store.state.upload.thumbnailFile = file;
                }
                let reader = new FileReader()
                reader.readAsDataURL(file.raw)
                reader.onload = e => {
                    let img = e.target.result;
                    let image = new Image()
                    image.src = img

                    image.onload = _ => {
                        let width = image.width
                        let height = image.height
                        let imgUrl = {
                            url: response.url,
                            width,
                            height
                        };
                        this.imgUrls.push(imgUrl);
                        this.fileList = fileList;
                        this.$message.success(file.name + " 上传成功");
                    }
                }
            } else {
                this.$message.error(file.name + " 上传失败，请重新上传");
                let index = 0;
                for (const i in fileList) {
                    if (fileList[i] === file) {
                        index = i;
                        break;
                    }
                }
                fileList.splice(index, 1);
            }
        },
        error(err, file, fileList) {
            this.$message.error("文件上传失败,请稍后重试")
        },
        setTh(file) {
            if (file !== null) {
                console.log(file);
                this.$store.state.upload.thumbnailUrl = file.response.url;
                this.$store.state.upload.thumbnailFile = file;
                this.$message.success("设置成功,如果不是不是1:1比例的图片请手动裁剪");
            } else {
                this.$message.error("设置失败");
            }
        },
        //文件超出个数限制时的函数
        handleExceed(files, fileList) {
            this.$message.warning(`最多只允许上传${this.limit}张图片`);
        },
        //获取图片宽高
        getWH(file) {
            let reader = new FileReader()
            reader.readAsDataURL(file.raw)
            reader.onload = e => {
                let img = e.target.result;
                let image = new Image()
                image.src = img

                image.onload = _ => {
                    this.width = image.width
                    this.height = image.height
                }
            }
        },
        async imgCompress(file) {
            // 将文件转img对象
            const img = await this.fileToImg(file)
            return new Promise((resolve, reject) => {
                const canvas = document.createElement('canvas')
                const context = canvas.getContext('2d')
                // 获取文件宽高比例
                const {width: originWidth, height: originHeight} = img
                // 自定义等比例缩放宽高属性，这里我用的是固定800宽度，高度是等比例缩放
                const scale = +(originWidth / originHeight).toFixed(2) // 比例取小数点后两位)
                const targetWidth = 800 // 固定宽
                const targetHeight = Math.round(800 / scale) // 等比例缩放高

                canvas.width = targetWidth
                canvas.height = targetHeight
                context.clearRect(0, 0, targetWidth, targetHeight)
                // canvas重新绘制图片
                context.drawImage(img, 0, 0, targetWidth, targetHeight)
                // canvas转二进制对象转文件对象，返回
                const type = 'image/png'
                canvas.toBlob(function (blob) {
                    const f = new File([blob], file.name, {
                        type,
                        lastModified: file.lastModified
                    })
                    resolve(f)
                }, type)
            })
        },

        // file转换成img对象
        fileToImg(file) {
            return new Promise((resolve, reject) => {
                const img = new Image()
                const reader = new FileReader()
                reader.onload = function (e) {
                    img.src = e.target.result
                }
                reader.onerror = function (e) {
                    reject(e)
                }
                reader.readAsDataURL(file)
                img.onload = function () {
                    resolve(img)
                }
                img.onerror = function (e) {
                    reject(e)
                }
            })
        }
    },
    // watch: {
    //     imgUrls(imgUrl) {
    //         if (imgUrl.length > 0) {
    //             this.$store.state.upload.thumbnailUrl = imgUrl[0].url;
    //             this.$store.state.upload.thumbnailFile = this.fileList[0];
    //         } else {
    //             this.$store.state.upload.thumbnailUrl = null;
    //             this.$store.state.upload.thumbnailFile = null;
    //         }
    //
    //     },
    // },
    mounted() {
        this.$bus.$on('submit', (form) => {
            this.form = form
            if (this.imgUrls.length === 0) {
                this.$message.error("请上传作品");
                return false;
            } else if (this.$store.state.upload.thumbnailUrl === null) {
                this.$message.error("请设置缩略图");
                return false;
            }
            this.$http.post('image/atlas/upload', {
                title: this.form.title,
                introduce: this.form.introduce,
                tags: this.form.tags,
                isPublic: this.form.isPublic,
                imgUrls: this.imgUrls,
                thumbnailUrl: this.$store.state.upload.thumbnailUrl
            }).then(res => {
                if (res.data.code === 0) {
                    window.location.href = '/space/' + this.$store.state.auth.uid;
                    this.$message.success("上传成功");
                } else {
                    this.$message.error("上传失败,请稍后重试");
                }
            }).catch(err => {
                this.$message.error("上传失败,请稍后重试");
            })
        });
    }
};
</script>

<style>
.el-upload__input {
    display: none !important;
}

.avatar-uploader > .el-upload-list {
    display: flex;
}

.avatar-uploader > .el-upload-list > .el-upload-list__item {
    width: auto;
    height: 200px;
    display: block;
    object-fit: cover;
}

.avatar-uploader > .el-upload-list > .el-upload-list__item > img {
    width: auto;
    height: 200px;
    border-radius: 2px;
}

.upload-span {
    font-weight: bold;
    font-size: 18px;
    color: #858585;
}

.th-button:hover {
    color: #333333;
    background: #ecf5ff;
}

.th-button:focus {
    background: #ecf5ff;
    color: #333333;
    /*opacity: 0.5;*/
}
</style>
