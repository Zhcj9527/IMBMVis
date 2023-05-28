<template>
  <div>
    <el-card shadow="hover">
      <!-- 添加品牌按钮 -->
      <el-button
        type="primary"
        size="default"
        icon="Plus"
        @click="addTrademark"
      >
        添加品牌
      </el-button>
      <!-- 表格组件：用于展示已有数据平台数据 -->
      <!-- :data="" -->
      <el-table :data="trademarkAttr" border style="margin: 10px 0">
        <el-table-column
          label="序号"
          width="80px"
          align="center"
          type="index"
        ></el-table-column>
        <!--  el-table-column，默认用div展示, 可以通过插槽自定义 -->
        <el-table-column label="品牌名称" prop="tmName"></el-table-column>
        <el-table-column label="品牌logo">
          <template #="{ row, $index }">
            <img
              :src="row.logoUrl"
              alt="loading..."
              style="width: 50px; height: 50px"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #="{ row, $index }">
            <el-button
              type="primary"
              icon="Edit"
              size="small"
              @click="updateTrademark(row)"
            ></el-button>
            <el-popconfirm
              :title="`Are you sure to delete ${row.tmName} ?`"
              width="250px"
              icon="Delete"
              @confirm="deleteTrademark(row)"
            >
              <template #reference>
                <el-button
                  type="primary"
                  icon="Delete"
                  size="small"
                ></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="limit"
        :page-sizes="[3, 5, 7, 9]"
        :background="true"
        layout="prev, pager, next, jumper,->, sizes, total"
        :total="total"
        @current-change="getTrademark"
        @size-change="handleSizeChange"
      />
    </el-card>
    <!-- 对话框组件：添加、删除修改已有品牌的业务使用 -->
    <el-dialog
      v-model="dialogFormVisible"
      :title="trademarkForm.id ? '修改品牌' : '添加品牌'"
    >
      <el-form
        :model="trademarkForm"
        :rules="rules"
        ref="formRef"
        style="width: 80%"
      >
        <el-form-item label="Name" label-width="100px" prop="tmName">
          <el-input
            v-model="trademarkForm.tmName"
            placeholder="请输入name"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="Logo" label-width="100px" prop="logoUrl">
          <el-upload
            v-model="trademarkForm.logoUrl"
            class="avatar-uploader"
            action="api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="trademarkForm.logoUrl"
              :src="trademarkForm.logoUrl"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">Cancel</el-button>
          <el-button type="primary" @click="confirm">Confirm</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { ElMessage } from 'element-plus'
// 引入api
import {
  reqTrademark,
  reqAddOrUpdateTrademark,
  reqDeleteTrademark,
} from '@/api/product/trademark'
// trademark的ts类型
import type {
  TradeMark,
  TradeMarkResponseData,
} from '@/api/product/trademark/type'
import type { UploadProps, UploadRawFile, FormInstance } from 'element-plus'
// 当前页码
let pageNo = ref<number>(1)
// 每页显示条目个数
let limit = ref<number>(3)
// 存储已有品牌的总数
let total = ref<number>(0)
// 储存已有品牌的数据
let trademarkAttr = ref<TradeMark[]>([])
// 控制对话框显示与隐藏
let dialogFormVisible = ref<boolean>(false)
// 收集新增品牌的name/logo
let trademarkForm = reactive<TradeMark>({
  tmName: '',
  logoUrl: '',
})
// 获取el-form组件实例
let formRef = ref<FormInstance>()

// 获取已有品牌的接口封装为函数
const getTrademark = async (pager = 1) => {
  pageNo.value = pager
  let result: TradeMarkResponseData = await reqTrademark(
    pageNo.value,
    limit.value,
  )
  if (result.code === 200) {
    total.value = result.data.total
    trademarkAttr.value = result.data.records
  }
}
/* // 分页器，当前页码执行的回调函数,回传了当前的页码
const handleCurrentChange = () => {
  // 当前页码发生变化的时候，发请求展示数据
  getTrademark()
} */
// 当下拉菜单发生变化的时候, 回传了当前的页面展示的数据
const handleSizeChange = () => {
  // 当前页数据量发生变化的时候
  // pageNo.value = 1
  getTrademark()
}
// 添加品牌
const addTrademark = () => {
  //dialog显示
  dialogFormVisible.value = true
  // 数据回显
  trademarkForm.id = 0
  trademarkForm.tmName = ''
  trademarkForm.logoUrl = ''
  // 清除表单验证信息
  formRef.value?.clearValidate()
}
// 修改品牌
const updateTrademark = (row: TradeMark) => {
  // trademarkForm.id = row.id
  // // 展示row数据
  // trademarkForm.tmName = row.tmName
  // trademarkForm.logoUrl = row.logoUrl
  Object.assign(trademarkForm, row)
  //dialog显示
  dialogFormVisible.value = true
  // 清除表单验证信息
  formRef.value?.clearValidate()
}
// 对话框cancel
const cancel = () => {
  //dialog隐藏
  dialogFormVisible.value = false
}
// 对话框confirm
const confirm = async () => {
  // 发请求之前。对整个表单进行校验
  // 返回一个promise,校验通过接下的操作
  await formRef.value?.validate()
  // 发请求add/update
  let result = await reqAddOrUpdateTrademark(trademarkForm)
  if (result.code === 200) {
    //success
    //dialog隐藏
    dialogFormVisible.value = false
    //淡出success
    ElMessage.success((trademarkForm.id ? 'UPDATE' : 'ADD') + ' SUCCESS')
    // 再次发请求获取已有品牌的
    getTrademark(trademarkForm.id ? pageNo.value : 1)
  } else {
    //failure
    ElMessage.error((trademarkForm.id ? 'UPDATE' : 'ADD') + ' FAILURE')
    //dialog隐藏
    dialogFormVisible.value = false
  }
}
// 上传图片之间触发的钩子
const beforeAvatarUpload: UploadProps['beforeUpload'] = (
  rawFile: UploadRawFile,
) => {
  // 约束图片：大小，类型
  // 上传文件格式 png|jpg|gif 4m
  if (
    rawFile.type === 'image/png' ||
    rawFile.type === 'image/jpeg' ||
    rawFile.type === 'image/gif'
  ) {
    if (rawFile.size / 1024 / 1024 < 4) {
      return true
    } else {
      ElMessage.error('Avatar picture size can not exceed 4MB!')
      return false
    }
  } else {
    ElMessage.error('上传错了呦')
    return false
  }
}
// 上传图片成功
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile,
) => {
  // response为上传图片的数据，upLoadFile
  trademarkForm.logoUrl = response.data
  // 图片上传之后，清除掉对应图片校验结果, 对应字段的prop属性值
  formRef.value?.clearValidate('logoUrl')
}
// 气泡确认框，confirm的回调
const deleteTrademark = async (row: TradeMark) => {
  let result = await reqDeleteTrademark(row.id!)
  if (result.code === 200) {
    ElMessage.success('DELETE SUCCESS')
    getTrademark(pageNo.value)
  } else {
    ElMessage.error('DELETE ERROR')
  }
}

// 品牌自定义校验规则的方法
const validateTmName = (rule: any, value: any, callback: any) => {
  // 自定义校验规则
  if (value.trim().length >= 2) {
    callback()
  } else {
    callback(new Error('品牌名称位数大于等于两位！！'))
  }
}

const validateLogoUrl = (rule: any, value: any, callback: any) => {
  // 图片上传，value有值则是上传了
  if (value) {
    callback()
  } else {
    callback(new Error('Logo的图片必须是要上传。'))
  }
}

// 表单校验规则对象
const rules = {
  tmName: [
    {
      required: true,
      trigger: 'blur',
      validator: validateTmName,
    },
  ],
  logoUrl: [
    {
      required: true,
      validator: validateLogoUrl,
    },
  ],
}

// 组件挂载完的钩子
onMounted(() => {
  getTrademark()
})
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
