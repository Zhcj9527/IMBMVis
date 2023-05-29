<template>
  <div>
    <!-- 三级分类全局组件 -->
    <Category :scene="scene"></Category>
    <el-card shadow="hover" style="margin: 10px 0">
      <template v-if="scene">
        <el-button type="primary" size="default" icon="Plus" :disabled="categoryStore.c3Id ? false : true"
          @click="addAttr">
          添加属性
        </el-button>
        <!-- :data="" -->
        <el-table :data="attrArr" border style="margin-top: 10px">
          <!-- v-for="col in columns" :prop="col.id" :key="col.id" :label="col.label" :width="col.width" -->
          <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="120px"></el-table-column>
          <el-table-column label="属性值名称">
            <template #="{ row, $index }">
              <el-tag v-for="(attrValue, index) in row.attrValueList" :key="attrValue.id" style="margin-left: 5px">
                {{ attrValue.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120px">
            <template #="{ row, $index }">
              <el-button type="primary" size="small" icon="Edit" @click="updateAttr(row)"></el-button>
              <el-popconfirm :title="`Are you sure to delete ${row.attrName}?`" width="250px" @confirm="deleteAttr(row.id)">
                <template #reference>
                  <el-button type="primary" size="small" icon="Delete"></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <!-- add/update attr -->
      <template v-else>
        <!--  :model="form" ref="form" :rules="rules" label-width="80px" :inline="false" size="normal" -->
        <el-form :model="attrParams" :inline="true">
          <el-form-item label="attrName">
            <el-input placeholder="请你输入attrname" v-model="attrParams.attrName"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" size="default" icon="Plus" @click="addAttrValue"
          :disabled="attrParams.attrName ? false : true">
          add attrValue
        </el-button>
        <el-button type="primary" size="default" @click="cancel">
          Cancel
        </el-button>
        <el-table :data="attrParams.attrValueList" border style="margin: 10px 0">
          <el-table-column label="序号" width="80px" type="index" align="center"></el-table-column>
          <el-table-column label="attrValue">
            <template #="{ row, $index }">
              <el-input :ref="((vc: any) => inputArr[$index] = vc)" v-if="row.flag" v-model="row.valueName"
                placeholder="Please input you valuename..." @blur="toLook(row, $index)"></el-input>
              <div v-else @click="toEdit(row, $index)">{{ row.valueName }}</div>
            </template>
          </el-table-column>
          <el-table-column label="Options">
            <template #="{ row, $index }">
              <el-button type="primary" icon="Delete" size="small"
                @click="attrParams.attrValueList.splice($index, 1)"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" size="default" :disabled="attrParams.attrName ? false : true" @click="save">
          Save
        </el-button>
        <el-button type="primary" size="default" @click="cancel">
          Cancel
        </el-button>
      </template>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { watch, ref, reactive, nextTick, onBeforeUnmount } from 'vue'
// api
import { reqAttr, reqAddOrUpdateAttr, reqRemoveAttr } from '@/api/product/attr'
// ts type
import type { AttrResponseData, Attr, AttrValue } from '@/api/product/attr/type'
// 获取分类仓库
import { useCategoryStore } from '@/store/modules/category'
import { storeToRefs } from 'pinia'
import { ElMessage } from 'element-plus'

let categoryStore = useCategoryStore()
// 存储已有的attr数据
let attrArr = ref<Attr[]>([])
// 定义card切换
let scene = ref<boolean>(true)
// 收集新增的数据
let attrParams = reactive<Attr>({
  attrName: '',
  attrValueList: [],
  categoryId: '',
  categoryLevel: 3,
})
// 存储el-input组件实例
let inputArr = ref<any>([])

// 监听三级分类的id
watch(
  () => categoryStore.c3Id,
  () => {
    // 清空原有的attr数据
    attrArr.value = []
    // 要保证三级分类有再发请求
    if (categoryStore.c3Id) {
      getAttr()
    }
  },
)
// 获取已有属性和属性值
const getAttr = async () => {
  const { c1Id, c2Id, c3Id } = storeToRefs(categoryStore)
  let result: AttrResponseData = await reqAttr(
    c1Id.value,
    c2Id.value,
    c3Id.value,
  )
  if (result.code === 200) {
    attrArr.value = result.data
  }
}
// 添加属性
const addAttr = () => {
  // 每次点击的时候先清空数据
  Object.assign(attrParams, {
    attrName: '',
    attrValueList: [],
    categoryId: categoryStore.c3Id, // // 收集三级分类的id
    categoryLevel: 3,
  })
  // 切换添加、修改属性结构
  scene.value = false
}
// table中修改属性
const updateAttr = (row: Attr) => {
  // 切换添加、修改属性结构
  scene.value = false
  // 将已有的attr属性给attrParams对象 
  // 深拷贝
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)))
}
// 取消按钮
const cancel = () => {
  // 切回初始页面
  scene.value = true
}
// 添加属性值
const addAttrValue = () => {
  attrParams.attrValueList.push({
    valueName: '',
    flag: true, // 定义编辑模式和查看模式的切换
  })
  // 获取最后的input框聚焦
  nextTick(() => {
    inputArr.value[attrParams.attrValueList.length - 1].focus()
  })
}
// 保存按钮的回调
const save = async () => {
  // 收集数据发请求
  let result = await reqAddOrUpdateAttr(attrParams)
  if (result.code === 200) {
    // 切换场景
    scene.value = true
    // 提示信息
    ElMessage.success((attrParams.id ? 'UPDARE' : 'ADD') + ' SUCCESS')
    getAttr()
  } else {
    ElMessage.error((attrParams.id ? 'UPDARE' : 'ADD') + ' FAILURE')
  }
}
// 属性值表单元素失去焦点, 变为div查看模式
const toLook = (row: AttrValue, $index: number) => {
  // 非法情况判断1
  if (row.valueName.trim() == '') {
    // 删除掉属性值为空的就不要了
    attrParams.attrValueList.splice($index, 1)
    // 属性值不能为空
    ElMessage.error('属性值不能为空，请重新输入.....')
    return
  }
  // 非法情况判断2 重复
  let result = attrParams.attrValueList.find((item: AttrValue) => {
    // 将最新的一项与原来的数组分开，去做对比
    if (item !== row) {
      return item.valueName === row.valueName
    }
  })
  if (result) {
    ElMessage.error('属性值不能重复')
    // 删除掉属性值重复的
    attrParams.attrValueList.splice($index, 1)
    return
  }
  row.flag = false
}
// 点击div，变为编辑模式
const toEdit = (row: AttrValue, $index: number) => {
  // 变为input
  row.flag = true
  // 获取组件实例对象
  nextTick(() => {
    inputArr.value[$index].focus()
  })
}
// 删除某个属性的ffa
const deleteAttr = async (attrId: number) => {
  let result = await reqRemoveAttr(attrId)
  console.log(result);
  
  if (result.code === 200) {
    ElMessage.success('delete success')
    // 在渲染一下页面
    getAttr()
  } else {
    ElMessage.error('delete failure')
  }
}

// 路由组件销毁的时候，把仓库的相关数据清空
onBeforeUnmount(() => {
  categoryStore.$reset()
})

</script>

<style scoped lang="scss"></style>
