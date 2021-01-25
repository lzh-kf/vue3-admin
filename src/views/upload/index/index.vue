<template>
  <div>
    <div class="single-upload">
      <el-tag class="title">单图上传</el-tag>
      <el-upload
        action=""
        class="avatar-uploader"
        :show-file-list="false"
        :http-request="customUpload"
      >
        <img v-if="imgUrl" :src="imgUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { checkFile, checkFileSize, UploadFile } from '@/utils/upload'
import { uploadFileSize, uploadType } from '@/utils/const'
import { uploadFile } from '@/apis/upload'
export default defineComponent({
  setup() {
    const imgUrl = ref<string>('')

    const beforeCheckUpload = ({ file }: UploadFile): boolean => {
      const isCanUpload = checkFile(file.type)
      if (!isCanUpload) {
        ElMessage.error(
          `请检查上传类型,仅可上传以下图片类型:${uploadType.join(', ')}`
        )
        return false
      }
      if (!checkFileSize(file.size)) {
        ElMessage.error(`上传图片大小不能超过${uploadFileSize}MB`)
        return false
      }
      return true
    }

    const handleUploadFile = ({ file }: UploadFile): void => {
      const formData = new FormData()
      formData.append('file', file)
      uploadFile(formData).then((res) => {
        imgUrl.value = res.data.path
      })
    }

    const customUpload = (UploadFile: UploadFile): void => {
      beforeCheckUpload(UploadFile) && handleUploadFile(UploadFile)
    }

    return {
      imgUrl,
      customUpload,
    }
  },
})
</script>


<style lang="scss" scoped>
.single-upload {
  text-align: center;
  width: 178px;
  .title {
    margin-bottom: 10px;
  }
}
</style>
<style lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>