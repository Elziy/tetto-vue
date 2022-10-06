<template>
    <div>
        <el-form ref="form" :model="form" label-width="60px" label-position="top">
            <el-form-item>
                <el-input maxlength="32" show-word-limit placeholder="标题" type="text" v-model="form.title"></el-input>
            </el-form-item>
            <!--说明-->
            <el-form-item>
                <el-input :autosize="{ minRows: 3, maxRows: 6}" show-word-limit maxlength="200" placeholder="说明"
                          type="textarea" v-model="form.introduce"></el-input>
            </el-form-item>

            <!--<el-form-item>-->
            <!--    <el-select style="width: 670px;"-->
            <!--               v-model="form.tags"-->
            <!--               multiple-->
            <!--               maxlength="10"-->
            <!--               show-word-limit-->
            <!--               filterable-->
            <!--               allow-create-->
            <!--               :clearable="true"-->
            <!--               :multiple-limit="10"-->
            <!--               placeholder="请输入标签">-->
            <!--    </el-select>-->
            <!--</el-form-item>-->

            <el-form-item>
                <div>
                    <el-tag
                            :key="tag"
                            v-for="tag in form.tags"
                            closable
                            effect="plain"
                            @close="handleClose(tag)">
                        {{ tag }}
                    </el-tag>
                    <el-input
                            class="input-new-tag"
                            v-if="inputVisible"
                            v-model="inputValue"
                            ref="saveTagInput"
                            size="small"
                            @blur="handleInputConfirm"
                    >
                    </el-input>
                    <el-button v-else class="button-new-tag" size="small" @click="showInput">添加标签</el-button>
                </div>
            </el-form-item>

            <el-form-item>
                <span style="color:#99a9bf;">是否公开</span>
                <el-radio-group v-model="form.isPublic" style="margin-left: 50px">
                    <el-radio :label="1">公开</el-radio>
                    <el-radio :label="0">不公开</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item style="text-align: center">
                <el-button round style="width: 200px;" @click="onSubmit">投 稿</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

export default {
    name: "uploadForm",
    data() {
        return {
            form: {
                title: null,
                introduce: null,
                tags: [],
                isPublic: 1
            },
            inputVisible: false,
            inputValue: ''
        };
    },
    methods: {
        onSubmit() {
            this.$message.success('投稿');
            this.$bus.$emit('tougao', this.form)
        },

        handleClose(tag) {
            console.log(tag)
            this.form.tags.splice(this.form.tags.indexOf(tag), 1);
        },

        showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },

        // 添加标签
        handleInputConfirm() {
            if (this.form.tags.length >= 10) {
                this.$message.error('最多只能添加10个标签');
                this.inputVisible = false;
                this.inputValue = '';
            } else {
                let inputValue = this.inputValue;
                if (inputValue === '') {
                    this.$message.warning('标签不能为空');
                } else if (!this.form.tags.includes('#' + inputValue)) {
                    this.form.tags.push('#' + inputValue);
                } else {
                    this.$message.warning('标签 ' + inputValue + ' 已存在');
                }
                this.inputVisible = false;
                this.inputValue = '';
            }
        }
    }

}
</script>

<style scoped>
.el-tag + .el-tag {
    margin-left: 10px;
}

.button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
}

.input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
}

button:hover {
    color: #333333;
    background: #ecf5ff;
}

button:focus {
    background: #ecf5ff;
    color: #333333;
    /*opacity: 0.5;*/
}
</style>
