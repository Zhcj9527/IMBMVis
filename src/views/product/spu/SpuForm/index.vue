<template>
  <div>
    <!-- :model="form" ref="form" :rules="rules" label-width="80px" :inline="false" size="normal" -->
    <el-form label-width="120px">
      <el-form-item label="SPU名称">
        <el-input placeholder="请输入SPU名称..." v-model="spuParams.spuName"></el-input>
      </el-form-item>
      <el-form-item label="SPU品牌">
        <!-- v-model="" value-key="" placeholder="" clearable filterable @change="" -->
        <el-select v-model="spuParams.tmId" placeholder="请选择...">
          <!-- v-for="item in options" :key="item.value" :label="item.label" :value="item.value" -->
          <el-option v-for="(item, index) in allTradeMark" :key="item.id" :label="item.tmName"
            :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input v-model="spuParams.description" placeholder="请输入描述..." type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="SPU照片墙">
        <!-- list-type: 文件怎么展示 :on-preview="handlePictureCardPreview" :on-remove="handleRemove" -->
        <el-upload v-model="imgList" action="/api/admin/product/fileUpload" list-type="picture-card"
          :on-preview="handlePictureCardPreview">
          <el-icon>
            <Plus />
          </el-icon>
        </el-upload>
        <el-dialog v-model="dialogVisible">
          <img w-full :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="SPU销售属性">
        <!-- v-model="" value-key="" placeholder="" clearable filterable @change="" -->
        <el-select v-model="saleAttrIdAndName" :placeholder="
          unSelectSaleAttr.length
            ? `还未选择${unSelectSaleAttr.length}个`
            : '无'
        ">
          <!-- v-for="item in options" :key="item.value" :label="item.label" :value="item.value" -->
          <el-option :value="`${item.id}:${item.name}`" v-for="(item, index) in unSelectSaleAttr" :key="item.id"
            :label="item.name"></el-option>
        </el-select>
        <el-button :disabled="saleAttrIdAndName ? false : true" style="margin-left: 10px" type="primary" size="default"
          icon="Plus" @click="addSaleAttr">
          添加属性
        </el-button>
        <!-- table展示销售属性与属性值的地方  -->
        <el-table :data="saleAttr" border stripe style="margin-top: 10px">
          <!-- v-for="col in columns" :prop="col.id" :key="col.id" :label="col.label" :width="col.width" -->
          <el-table-column type="index" label="序号" width="80px"></el-table-column>
          <el-table-column label="属性名" prop="saleAttrName" width="80px"></el-table-column>
          <el-table-column label="销售属性值">
            <template #="{ row, $index }">
              <!-- v-for="tag in dynamicTags" :key="tag" class="mx-1" closable :disable-transitions="false"
                @close="handleClose(tag)" -->
              <el-tag v-for="(item, index) in row.spuSaleAttrValueList" :key="item.id" :closable="true"
                style="margin: 0 5px" @close="row.spuSaleAttrValueList.splice($index, 1)">
                {{ item.saleAttrValueName }}
              </el-tag>
              <el-input @blur="toLook(row)" v-model="row.saleAttrValue" v-if="row.flag == true" style="width: 80px"
                size="small" />
              <el-button v-else style="width: 80px" icon="Plus" size="small" @click="showInput(row)"></el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="80px">
            <template #="{ row, $index }">
              <el-button type="primary" size="small" icon="Delete" @click="saleAttr.splice($index, 1)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :disabled="unSelectSaleAttr.length !== 3 ? false : true" size="default" @click="save">
          save
        </el-button>
        <el-button type="primary" size="default" @click="cancel">
          cancel
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
// api
import {
  reqAllTrademark,
  reqSpuImageList,
  reqSpuSaleAttr,
  reqAllSaleAttr,
  reqAddOrUpdateSpu,
} from '@/api/product/spu'
// ts type
import type {
  AllSaleAttr,
  SaleAttr,
  SpuData,
  SaleAttrValue,
  AllTrademarkResponseData,
  SpuImgResponseData,
  SaleAttrResponseData,
  AllSaleAttrResponseData,
  TradeMark,
  SpuImg,
} from '@/api/product/spu/type'
import { ElMessage } from 'element-plus'

type Obj = { flag: number; params: string }
const emit = defineEmits<{
  (event: 'changeScene', obj: Obj): void
}>()

// 储存已有的spu的品牌
let allTradeMark = ref<TradeMark[]>([])
// 已有的spu图片列表
let imgList = ref<SpuImg[]>([])
// 已有的spu属性
let saleAttr = ref<SaleAttr[]>([])
// 已有的spu全部的销售属性
let allSaleAttr = ref<AllSaleAttr[]>([])
// 存储已有的spu对象
let spuParams = ref<SpuData>({
  spuName: '', // spu名字
  description: '', // spu描述
  category3Id: '', // 三级分类的id
  tmId: '', // 品牌的id
  spuSaleAttrList: [], // 销售属性
  spuImageList: [], // 照片墙
})
// 控制对话框的显示与隐藏
let dialogVisible = ref<boolean>(false)
// 储存预览图片的地址
let dialogImageUrl = ref<string>('')
// 收集还未选择的属性的id和name
let saleAttrIdAndName = ref<string>('')

// 点击取消按钮。切换场景为0
const cancel = () => {
  emit('changeScene', { flag: 0, params: 'update' })
}
// 获取完整的spu数据
const initHasSpuData = async (spu: SpuData) => {
  // 存储已有的SPU对象，在模板中动态展示
  spuParams.value = spu
  // 最先spu是不完整的，需要发请求获取
  // 获取全部品牌
  let tmResult: AllTrademarkResponseData = await reqAllTrademark()
  // 获取spu的照片
  let imgResult: SpuImgResponseData = await reqSpuImageList(spu.id!)
  // 获取spu已有的销售属性
  let saleValRes: SaleAttrResponseData = await reqSpuSaleAttr(spu.id!)
  // 获取全部的spu销售属性
  let hasSaleValRes: AllSaleAttrResponseData = await reqAllSaleAttr()

  // 储存数据
  allTradeMark.value = tmResult.data
  imgList.value = imgResult.data.map((item) => {
    return {
      name: item.imgName,
      url: item.imgUrl,
    }
  })
  saleAttr.value = saleValRes.data
  allSaleAttr.value = hasSaleValRes.data
}
// 照片预览
const handlePictureCardPreview = (file: any) => {
  // 对话框弹出来
  dialogVisible.value = true
  // 展示照片
  dialogImageUrl.value = file.url
}
// 计算出SPU还未有的属性
let unSelectSaleAttr = computed(() => {
  return allSaleAttr.value.filter((item) => {
    return saleAttr.value.every((d) => {
      return d.saleAttrName !== item.name
    })
  })
})
// 添加属性
const addSaleAttr = () => {
  /* baseSaleAttrId: number
  saleAttrName: string
  spuSaleAttrValueList: SaleAttrValue[] */
  const [baseSaleAttrId, saleAttrName] = saleAttrIdAndName.value.split(':')
  // 准备一个新的销售属性
  let newSaleAttr: SaleAttr = {
    baseSaleAttrId,
    saleAttrName,
    spuSaleAttrValueList: [],
  }
  // 追加到数据中
  saleAttr.value.push(newSaleAttr)
  // 追加后，select框中要清空数据
  saleAttrIdAndName.value = ''
}
// 属性值按钮事件 showInput
const showInput = (row: SaleAttr) => {
  // 点击按钮的时候，编辑模式
  row.flag = true
  // 给row加一个属性
  row.saleAttrValue = ''
}
// 表单元素失去焦点
const toLook = (row: SaleAttr) => {
  // 整理收集到的属性id和属性值的名字
  const { baseSaleAttrId, saleAttrValue } = row
  // 追加新的属性值
  let newSaleAttrValue: SaleAttrValue = {
    baseSaleAttrId,
    saleAttrValueName: saleAttrValue!,
  }
  // 非法判断  非空
  if (saleAttrValue?.trim() === '') {
    ElMessage.error('属性值不能为空')
    return
  }
  // 非法判断  不能重复
  let result = row.spuSaleAttrValueList.find((item: SaleAttrValue) => {
    return item.saleAttrValueName === saleAttrValue
  })
  if (result) {
    ElMessage.error('属性值重复，请重新输入...')
    return
  }
  // 追加一个属性值
  row.spuSaleAttrValueList.push(newSaleAttrValue)
  // 变为查看模式
  row.flag = false
}
// 保存按钮的回调
const save = async () => {
  // 整理参数
  // 照片墙
  spuParams.value.spuImageList = imgList.value.map((item: any) => {
    return {
      imgName: item.name,
      imgUrl: (item.response && item.response.data) || item.url,
    }
  })
  // 销售属性的数据
  spuParams.value.spuSaleAttrList = saleAttr.value

  //发请求
  let result = await reqAddOrUpdateSpu(spuParams.value)
  if (result.code === 200) {
    ElMessage.success(
      `${spuParams.value.id}` ? 'UPDATE SUCCESS' : 'ADD SUCCESS',
    )
    // 切换场景
    emit('changeScene', {
      flag: 0,
      params: spuParams.value.id ? 'update' : 'add',
    })
  } else {
    ElMessage.success(`${spuParams.value.id}` ? 'UPDATE error' : 'ADD error')
  }
}
// 添加一个新的SPU初始化的请求方法
const initAddSpu = async (category3Id: number | string) => {
  // 清空数据
  Object.assign(spuParams.value, {
    spuName: '', // spu名字
    description: '', // spu描述
    category3Id: '', // 三级分类的id
    tmId: '', // 品牌的id
    spuSaleAttrList: [], // 销售属性
    spuImageList: [], // 照片墙
  })
  // 照片墙
  imgList.value = []
  // 销售属性
  saleAttr.value = []
  saleAttrIdAndName.value = ''
  // 存储三级分类的id
  spuParams.value.category3Id = category3Id
  // 获取全部品牌
  let tmResult: AllTrademarkResponseData = await reqAllTrademark()
  // 获取全部的spu销售属性
  let hasSaleValRes: AllSaleAttrResponseData = await reqAllSaleAttr()

  //存储数据
  allTradeMark.value = tmResult.data
  allSaleAttr.value = hasSaleValRes.data
}

// 暴露出去
defineExpose({
  initHasSpuData,
  initAddSpu,
})
</script>

<style scoped lang="scss"></style>
