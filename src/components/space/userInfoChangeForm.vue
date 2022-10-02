<template>
    <el-form ref="form" :model="form" label-width="60px" label-position="top" size="medium">
        <el-form-item label="昵称">
            <el-input type="text" v-model="form.name"></el-input>
        </el-form-item>
        <!--自我介绍-->
        <el-form-item label="自我介绍">
            <el-input type="textarea" v-model="form.introduce"></el-input>
        </el-form-item>

        <el-form-item>
            <span style="color:#99a9bf;">性别&nbsp; &nbsp;</span>
            <el-radio v-model="form.sex" :label="1">男性</el-radio>
            <el-radio v-model="form.sex" :label="2">女性</el-radio>
            <el-radio v-model="form.sex" :label="3">未知</el-radio>
        </el-form-item>

        <el-form-item label="邮箱">
            <el-input type="text" v-model="form.email"></el-input>
        </el-form-item>

        <el-form-item label="生日">
            <el-input type="date" v-model="form.birthday"></el-input>
        </el-form-item>

        <!--<el-form-item>-->
        <!--    <el-button type="primary" @click="onSubmit">立即创建</el-button>-->
        <!--    <el-button>取消</el-button>-->
        <!--</el-form-item>-->
    </el-form>
</template>

<script>
export default {
    name: "userInfoChangeForm",
    data() {
        return {
            form: {
                name: 'Takagi',
                introduce: 'agagaeghah',
                sex: 1,
                email: 'lzy@163.com',
                birthday: new Date()
            }
        }
    },
    methods: {
        onSubmit() {
            console.log('submit!');
        }
    }
}
</script>

<style scoped>

</style>
