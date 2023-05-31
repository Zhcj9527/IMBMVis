<template>
  <div>
    <el-card shadow="hover">
      <el-table :data="skuArr" border style="margin: 10px 0;">
        <el-table-column label="序号" type="index" width="80px" align="center">
        </el-table-column>
        <el-table-column label="名称" prop="skuName" show-overflow-tooltip width="180px">
        </el-table-column>
        <el-table-column label="描述" prop="skuDesc" show-overflow-tooltip width="180px">
        </el-table-column>
        <el-table-column label="默认图片" width="180px">
          <template #="{ row, $index }">
            <img :src="row.skuDefaultImg" style="width: 100px;height: 100px;">
          </template>
        </el-table-column>
        <el-table-column label="重量" prop="weight" width="180px">
        </el-table-column>
        <el-table-column label="价格" prop="price" width="180px">
        </el-table-column>
        <el-table-column label="操作" width="250px" fixed="right">
          <template #="{ row, $index }">
            <!-- Bottom Top -->
            <el-button type="primary" :icon="row.isSale === 1 ? 'Bottom' : 'Top'" size="small"
              @click="updateSale(row)"></el-button>
            <el-button type="primary" icon="Edit" size="small" @click="updateSku"></el-button>
            <el-button type="primary" icon="InfoFilled" size="small" @click="findSku(row)"></el-button>
            <el-popconfirm :title="`Are you sure to delete ${row.skuName}?`" width="250px" @confirm="removeSku(row)">
              <template #reference>
                <el-button type="primary" icon="Delete" size="small"></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- @size-change="handleSizeChange" @current-change="handleCurrentChange" -->
      <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 40]"
        :background="true" layout="prev, pager, next, jumper, -> , sizes, total" :total="total" @current-change="getSku"
        @size-change="handleSizeChange" />
      <!-- 抽屉组件：展示详情 -->
      <el-drawer v-model="drawer" direction="rtl">
        <template #header>
          <h4>查看商品标题</h4>
        </template>
        <template #default>
          <el-row :gutter="20">
            <el-col :span="6" :offset="0">名称</el-col>
            <el-col :span="18" :offset="0">{{ skuInfo.skuName }}</el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6" :offset="0">描述</el-col>
            <el-col :span="18" :offset="0">{{ skuInfo.skuDesc }}</el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6" :offset="0">价格</el-col>
            <el-col :span="18" :offset="0">{{ skuInfo.price }}</el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6" :offset="0">平台属性</el-col>
            <el-col :span="18" :offset="0">
              <el-tag v-for="(item, index) in skuInfo.skuAttrValueList" :key="item.id" type="danger" size="default"
                effect="dark" closable @close="" style="margin: 5px;">{{ item.valueName }}</el-tag>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6" :offset="0">销售属性</el-col>
            <el-col :span="18" :offset="0">
              <el-tag v-for="(item, index) in skuInfo.skuSaleAttrValueList" :key="item.saleAttrId" type="success"
                size="default" effect="dark" closable @close="" style="margin: 5px;">{{ item.saleAttrValueName }}</el-tag>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6" :offset="0">商品图片</el-col>
            <el-col :span="18" :offset="0">
              <el-carousel :interval="4000" type="card" height="200px">
                <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
                  <img :src="item.imgUrl" alt="" style="width: 100%; height: 100%">
                </el-carousel-item>
              </el-carousel>
            </el-col>
          </el-row>
        </template>
      </el-drawer>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
// api
import { reqSkuList, reqCancelSale, reqOnSale, reqSkuInfo, reqRemoveSku } from '@/api/product/sku';
// ts type
import type { SkuResponseData, SkuData, SkuInfoResponseData } from '@/api/product/sku/type'
import { ElMessage } from 'element-plus';

// 分页器当前页码
let pageNo = ref<number>(1)
let pageSize = ref<number>(10)
// 存储数据
let total = ref<number>(0)
let skuArr = ref<SkuData[]>([])
// 控制抽屉显示与隐藏
let drawer = ref<boolean>(false)
// 存储sku的商品详情显示
let skuInfo = ref<SkuData>({})

// 拿到sku数据
const getSku = async (pager = 1) => {
  // 收集当前页，默认是第一页
  pageNo.value = pager
  let result: SkuResponseData = await reqSkuList(pageNo.value, pageSize.value)
  if (result.code === 200) {
    total.value = result.data.total
    skuArr.value = result.data.records
  }
}
// pageSize发生变化时回调
const handleSizeChange = () => {
  getSku()
}
// 上架与下架
const updateSale = async (row: SkuData) => {
  // 当前的商品的isSale为1，为上架状态，需要更新为下架
  if (row.isSale == 1) {
    let result: any = await reqCancelSale(row.id!)
    if (result.code === 200) {
      ElMessage.success("下架成功")
      // 再次发请求
      getSku(pageNo.value)
    }
  } else {
    let result: any = await reqOnSale(row.id!)
    if (result.code === 200) {
      ElMessage.success("上架成功")
      // 再次发请求
      getSku(pageNo.value)
    }
  }
}
// 更新sku
const updateSku = () => {
  ElMessage.success("程序员正在努力的更新中...")
}
// 查看商品详情
const findSku = async (row: SkuData) => {
  // 显示drawer
  drawer.value = true
  // 发请求
  let result: SkuInfoResponseData = await reqSkuInfo(row.id!)
  if (result.code === 200) {
    skuInfo.value = result.data
  }
}
// 删除sku
const removeSku = async (row: SkuData) => {
  let result: any = await reqRemoveSku(row.id!)
  if (result.code === 200) {
    ElMessage.success("删除成功")
    // 再次发请求
    getSku(pageNo.value)
  } else {
    ElMessage.error("删除失败")
  }
}

// 组将挂载发请求
onMounted(() => {
  getSku()
})
</script>

<style scoped lang="scss"></style>
<style scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
