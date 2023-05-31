<template>
  <div>
    <!-- :model="form" ref="form" :rules="rules" label-width="80px" :inline="false" size="normal" -->
    <el-form label-width="80px">
      <el-form-item label="sku名称">
        <el-input v-model="skuParams.skuName" placeholder="sku"></el-input>
      </el-form-item>
      <el-form-item label="价格">
        <el-input v-model="skuParams.price" placeholder="price" type="number"></el-input>
      </el-form-item>
      <el-form-item label="重量">
        <el-input v-model="skuParams.weight" placeholder="weight" type="number"></el-input>
      </el-form-item>
      <el-form-item label="sku描述">
        <el-input v-model="skuParams.skuDesc" placeholder="sku dec" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form :inline="true" label-width="80px">
          <el-form-item v-for="(item, index) in attrArr" :key="item.id" :label="item.attrName" style="margin-top: 5px">
            <!-- 不需要在找个响应式数据存，直接存在item自身上就行，提交时统一处理 -->
            <el-select v-model="item.attrIdAndValueId">
              <el-option v-for="(attrValue, index) in item.attrValueList" :key="attrValue.id" :label="attrValue.valueName"
                :value="`${attrValue.attrId}:${attrValue.id}`"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form :inline="true">
          <el-form-item v-for="(item, index) in saleArr" :key="item.id" :label="item.saleAttrName">
            <el-select v-model="item.saleIdAndValueId">
              <el-option v-for="(saleAttrValue, index) in item.spuSaleAttrValueList" :key="saleAttrValue.id"
                :label="saleAttrValue.saleAttrValueName"
                :value="`${saleAttrValue.spuId}:${saleAttrValue.id}`"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片名称">
        <el-table :data="imgArr" border ref="table">
          <el-table-column type="selection" width="80px" align="center"></el-table-column>
          <el-table-column label="图片">
            <template #="{ row, $index }">
              <img :src="row.imgUrl" alt="" style="width: 40px; height: 40px" />
            </template>
          </el-table-column>
          <el-table-column label="名称" prop="imgName"></el-table-column>
          <el-table-column label="操作">
            <template #="{ row, $index }">
              <el-button type="primary" size="small" @click="handleImg(row)">
                设置为默认
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">save</el-button>
        <el-button type="primary" @click="cancel">cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
// api
import { reqAttr } from '@/api/product/attr'
import { reqSpuImageList, reqSpuSaleAttr, reqAddSku } from '@/api/product/spu'
// ts type
import type {
  SpuImgResponseData,
  SaleAttrResponseData,
  SpuData,
  SaleAttr,
  SpuImg,
  SkuData,
} from '@/api/product/spu/type'
import type { Attr, AttrResponseData } from '@/api/product/attr/type'
import { ElMessage } from 'element-plus'

// 储存平台属性
let attrArr = ref<Attr[]>([])
// 销售属性
let saleArr = ref<SaleAttr[]>([])
// 照片墙
let imgArr = ref<SpuImg[]>([])
// 收集sku参数
let skuParams = reactive<SkuData>({
  // 父组件传过来的
  category3Id: '',
  spuId: '',
  tmId: '',
  // vmodle
  skuName: '',
  price: '',
  weight: '',
  skuDesc: '',

  skuAttrValueList: [],
  skuSaleAttrValueList: [],
  skuDefaultImg: '',
})
// 照片 table实例
let table = ref<any>()

// 自定义事件
type Obj = { flag: number; params?: string }
let emit = defineEmits<{
  (event: 'changeScene', obj: Obj): void
}>()
// 取消按钮
const cancel = () => {
  emit('changeScene', { flag: 0 })
}
// 当前子组件的方法向外暴露
const initAddSku = async (
  c1Id: number | string,
  c2Id: number | string,
  spu: SpuData,
) => {
  // 收集数据
  skuParams.category3Id = spu.category3Id
  skuParams.spuId = spu.id!
  skuParams.tmId = spu.tmId
  // 获取平台属性
  let attrResult: AttrResponseData = await reqAttr(c1Id, c2Id, spu.category3Id)
  // 获取销售属性
  let saleAttrRes: SaleAttrResponseData = await reqSpuSaleAttr(spu.id!)
  // 获取照片墙
  let spuImgListRes: SpuImgResponseData = await reqSpuImageList(spu.id!)

  // 存数据
  attrArr.value = attrResult.data
  saleArr.value = saleAttrRes.data
  imgArr.value = spuImgListRes.data
}
// 设置默认图片
const handleImg = (row: SpuImg) => {
  // 排他思想：全部不勾选
  imgArr.value.forEach((item: SpuImg) => {
    table.value.toggleRowSelection(item, false)
  })
  // 复选框选中
  table.value.toggleRowSelection(row, true)
  // 收集图片地址
  skuParams.skuDefaultImg = row.imgUrl!
}
// 保存按钮
const save = async () => {
  // 整理参数
  // 平台属性
  skuParams.skuAttrValueList = attrArr.value.reduce((prev: any, cur: Attr) => {
    if (cur.attrIdAndValueId) {
      let [attrId, valueId] = cur.attrIdAndValueId.split(':')
      prev.push({ attrId, valueId })
    }
    return prev
  }, [])
  // 销售属性
  skuParams.skuSaleAttrValueList = saleArr.value.reduce(
    (prev: any, cur: SaleAttr) => {
      if (cur.saleIdAndValueId) {
        let [saleAttrId, saleAttrValueId] = cur.saleIdAndValueId.split(':')
        prev.push({ saleAttrId, saleAttrValueId })
      }
      return prev
    },
    [],
  )
  // 发请求
  let result: any = await reqAddSku(skuParams)
  // console.log(result);
  if (result.code === 200) {
    ElMessage.success('添加sku成功')
    emit('changeScene', { flag: 0 })
  } else {
    ElMessage.error('添加sku失败')
  }
}

// 暴露方法
defineExpose({
  initAddSku,
})
</script>

<style scoped lang="scss"></style>
