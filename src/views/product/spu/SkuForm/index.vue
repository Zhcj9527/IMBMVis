<template>
  <div>
    <!-- :model="form" ref="form" :rules="rules" label-width="80px" :inline="false" size="normal" -->
    <el-form label-width="80px">
      <el-form-item label="sku名称">
        <el-input v-model="skuparams.skuName" placeholder="sku"></el-input>
      </el-form-item>
      <el-form-item label="价格">
        <el-input v-model="skuparams.price" placeholder="price" type="number"></el-input>
      </el-form-item>
      <el-form-item label="重量">
        <el-input v-model="skuparams.weight" placeholder="weight" type="number"></el-input>
      </el-form-item>
      <el-form-item label="sku描述">
        <el-input v-model="skuparams.skuDesc" placeholder="sku dec" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form :inline="true" label-width="80px">
          <el-form-item v-for="(item, index) in attrArr" :key="item.id" :label="item.attrName" style="margin-top: 5px;">
            <el-select>
              <el-option v-for="(attrValue, index) in item.attrValueList" :key="attrValue.id" :label="attrValue.valueName"
                value="123"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form :inline="true">
          <el-form-item v-for="(item, index) in saleArr" :key="item.id" :label="item.saleAttrName">
            <el-select>
              <el-option v-for="(saleAttrValue, index) in item.spuSaleAttrValueList" :key="saleAttrValue.id"
                :label="saleAttrValue.saleAttrValueName" :value="123"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片名称">
        <el-table :data="imgArr" border>
          <el-table-column type="selection" width="80px" align="center"></el-table-column>
          <el-table-column label="图片">
            <template #="{ row, $index }">
              <img :src="row.imgUrl" alt="" style="width: 40px; height: 40px;">
            </template>
          </el-table-column>
          <el-table-column label="名称" prop="imgName"></el-table-column>
          <el-table-column label="操作">
            <template #="{ row, $index }">
              <el-button type="primary" size="small" @click="">设置为默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="">save</el-button>
        <el-button type="primary" @click="cancel">cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
// api
import { reqAttr } from '@/api/product/attr';
import { reqSpuImageList, reqSpuSaleAttr } from '@/api/product/spu';
// ts type
import { SpuImgResponseData, SaleAttrResponseData, SpuData, SaleAttr, SpuImg, SkuData } from '@/api/product/spu/type';
import { Attr, AttrResponseData } from '@/api/product/attr/type';

// 储存平台属性
let attrArr = ref<Attr[]>([])
// 销售属性
let saleArr = ref<SaleAttr[]>([])
// 照片墙
let imgArr = ref<SpuImg[]>([])
// 收集sku参数
let skuparams = reactive<SkuData>({
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
  skuDefaultImg: ''
})

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
const initAddSku = async (c1Id: number | string, c2Id: number | string, spu: SpuData) => {
  // 收集数据
  skuparams.category3Id = spu.category3Id
  skuparams.spuId = spu.id!
  skuparams.tmId = spu.tmId
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


// 暴露方法
defineExpose({
  initAddSku,
})
</script>

<style scoped lang="scss"></style>
