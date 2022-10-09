<template>
    <div>
        <navbar></navbar>
        <div>
            <div style="text-align: center">
                <upload ref="upload" :limit="10"></upload>
            </div>
            <hr>
            <div class="container" style="width: 1000px;">
                <upload-form></upload-form>
            </div>
        </div>
    </div>
</template>

<script>
import navbar from "@/components/common/navbar";
import upload from "@/components/upload/upload";
import uploadForm from "@/components/upload/uploadForm";

export default {
    name: "index",
    components: {
        navbar,
        upload,
        uploadForm
    },
    computed: {
        imgUrls() {
            return this.$refs.upload.imgUrls;
        },
        thumbnailUrl() {
            return this.$refs.upload.thumbnailUrl;
        },
    },
    methods: {
        show() {
            console.log(this.$refs.upload.imgUrls)
            console.log(this.thumbnailUrl)
        },
    }
};
</script>

<style scoped>

</style>
