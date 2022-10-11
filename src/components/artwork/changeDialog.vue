<template>
    <el-dialog title="编辑作品"
               :visible.sync="$store.state.artwork.dialog"
               @close="closeLog"
               center
               :destroy-on-close="true"
               :close-on-click-modal="false"
    >
        <el-form ref="form" :rules="rules" :model="form" label-width="60px" label-position="top">
            <el-form-item prop="title">
                <span style="color:#99a9bf;">标题</span>
                <el-input maxlength="32" show-word-limit placeholder="标题" type="text" v-model="form.title"></el-input>
            </el-form-item>
            <!--说明-->
            <el-form-item prop="introduce">
                <span style="color:#99a9bf;">说明</span>
                <el-input :autosize="{ minRows: 3, maxRows: 6}" show-word-limit maxlength="200" placeholder="说明"
                          type="textarea" v-model="form.introduce"></el-input>
            </el-form-item>

            <el-form-item>
                <span style="color:#99a9bf;">是否公开</span>
                <el-radio-group v-model="form.isPublic" style="margin-left: 50px">
                    <el-radio :label="1">公开</el-radio>
                    <el-radio :label="0">不公开</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item style="text-align: center">
                <el-button :disabled="disabled" round style="width: 200px;" @click="onSubmit">确认修改</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>

export default {
    name: "changeDialog",
    data() {
        return {
            disabled: false,
            form: {
                id: this.$store.state.artwork.atlas.id,
                uid: this.$store.state.artwork.atlas.uid,
                title: this.$store.state.artwork.atlas.title,
                introduce: this.$store.state.artwork.atlas.introduce,
                isPublic: this.$store.state.artwork.atlas.isPublic,
            },
            rules: {
                title: [
                    {required: true, message: '请输入标题', trigger: 'blur'},
                    {min: 1, max: 32, message: '长度在 1 到 32 个字符', trigger: 'blur'}
                ],
                introduce: [
                    {required: true, message: '请输入说明', trigger: 'blur'},
                    {min: 1, max: 200, message: '长度在 1 到 200 个字符', trigger: 'blur'}
                ],
            }
        };
    },
    methods: {
        closeLog() {
            this.$store.commit('artwork/closeDialog');
        },
        onSubmit() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    console.log(this.form);
                    this.$http.post('image/atlas/update', this.form).then(res => {
                        if (res.data.code === 0) {
                            this.$store.commit('artwork/changeAtlasInfo', this.form);
                            this.$message.success('修改成功');
                            this.disabled = true;
                            this.closeLog()
                        } else {
                            this.$message({
                                message: res.data.msg,
                                type: 'error'
                            });
                        }
                    });
                } else {
                    this.$message.warning('请完善信息');
                    return false;
                }
            });
        }
    },
}
</script>

<style scoped>

</style>
