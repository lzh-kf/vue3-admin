<template>
  <div>
    <el-row>
      <el-col :span="24" style="text-align: right">
        <el-button
          @click="handleCreate"
          type="primary"
          v-permission="'menu.create'"
          ><i class="iconfont icon-zengjiaxinzeng"></i>创建菜单</el-button
        >
      </el-col>
    </el-row>
    <el-tree
      :data="list"
      node-key="menuId"
      empty-text="暂无菜单"
      default-expand-all
      :expand-on-click-node="false"
    >
      <template #default="{ data }">
        <span>
          <span style="font-size: 12px; margin-right: 10px">{{
            data.menuName
          }}</span>
          <el-button
            type="text"
            v-permission="'menu.update'"
            @click="handleEdit(data)"
            >编辑</el-button
          >
          <el-popconfirm
            title="确定删除吗？"
            @confirm="handleDeleteEvent(data)"
          >
            <template #reference>
              <el-button
                type="text"
                style="margin-left: 10px"
                v-permission="'menu.del'"
                >删除</el-button
              >
            </template>
          </el-popconfirm>
        </span>
      </template>
    </el-tree>
    <el-dialog
      :title="isCreated ? '创建菜单' : '编辑菜单'"
      v-model="visible"
      width="30%"
      :destroy-on-close="true"
    >
      <el-form
        :model="formData"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="菜单名" prop="menuName">
          <el-input v-model.trim="formData.menuName" clearable></el-input>
        </el-form-item>
        <el-form-item label="页面路径" prop="path">
          <el-input v-model.trim="formData.path" clearable></el-input>
        </el-form-item>
        <el-form-item label="所属层级" prop="ids">
          <el-cascader
            clearable
            :options="list"
            :show-all-levels="false"
            :props="customProps"
            v-model="formData.ids"
          ></el-cascader>
        </el-form-item>

        <el-form-item label="组件路径" prop="componentFilePath">
          <el-input
            v-model.trim="formData.componentFilePath"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <el-select v-model="formData.icon" placeholder="请选择">
            <el-option v-for="item in iconList" :key="item" :value="item">
              <i :class="`iconfont ${item}`"></i>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleCancel">取 消</el-button>
          <el-button type="primary" @click="handleSubmit">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import getHandleFn from '@/utils/curd'
import { defineComponent, reactive, toRefs, ref, nextTick, watch } from 'vue'
import { Config } from '@/utils/base'
import { Data, Record, FormData } from './dataType'
import {
  menuCreate,
  menuDel,
  menuUpdate,
  menuQuery,
} from '@/apis/user/menu/index'
import lodash from 'lodash'
import { findParentElement, Result, Menu } from '@/utils'
import { iconList } from '@/utils/const'

const formData: FormData = {
  menuName: '',
  path: '',
  ids: [],
  componentFilePath: '',
  icon: 'icon-morentubiao',
}

// 配置项
const config: Config = {
  handleAdd: menuCreate,
  handleDel: menuDel,
  handleUpdate: menuUpdate,
  handleQuery: menuQuery,
  queryParam: {},
  customHandle: (baseData, res) => {
    baseData.list = res.data
  },
}

export default defineComponent({
  setup() {
    const ruleForm = ref()
    const data = reactive<Data>({
      formData: lodash.cloneDeep(formData), // 表单数据
      rules: {
        menuName: [
          { required: true, message: '请输入菜单名', trigger: 'blur' },
        ],
        path: [{ required: true, message: '请输入页面路径', trigger: 'blur' }],
        componentFilePath: [
          { required: true, message: '请输入组件路径', trigger: 'blur' },
        ],
        icon: [{ required: true, message: '请选择图标', trigger: 'change' }],
      }, // 校验规则
      customProps: {
        label: 'menuName',
        value: 'menuId',
        checkStrictly: true,
      },
      iconList,
    })
    // 基础数据（分页数据），和增删改查处理函数，以及分页查询变化处理函数
    const {
      baseData,
      handleAdd,
      handleDel,
      handleUpdate,
      handleQuery,
      handleSizeChange,
      handleCurrentChange,
      handleDialog,
    } = getHandleFn(config)

    const handleCreate = () => {
      baseData.isCreated = true
      handleDialog(true)
    }

    const handleEdit = (row: Record) => {
      baseData.isCreated = false
      const parentIds = findParentElement(
        baseData.list as Array<Menu>,
        row.parentId,
        baseData.list as Array<Menu>
      ).map((item: Result) => item.menuId)
      data.formData = lodash.cloneDeep(row)
      data.formData.ids = [...parentIds, row.menuId]
      handleDialog(true)
    }

    const handleDeleteEvent = (row: Record) => {
      handleDel({ _id: row._id })
    }

    const handleCancel = () => {
      handleDialog(false)
      data.formData = lodash.cloneDeep(formData)
      nextTick(ruleForm.value.clearValidate)
    }

    watch(
      () => baseData.visible,
      (newVal) => {
        !newVal && handleCancel()
      }
    )

    const setParams = () => {
      const params: FormData = lodash.cloneDeep(data.formData)
      const ids: Array<number> = params.ids || []
      const length: number = ids?.length
      if (baseData.isCreated) {
        params.parentId = ids[length - 1]
      } else {
        if (ids[length - 1] === params.menuId) {
          params.parentId = ids[length - 2]
        } else {
          params.parentId = ids[length - 1]
        }
      }
      return params
    }

    const handleSubmit = () => {
      ruleForm.value.validate((valid: boolean) => {
        if (valid) {
          if (baseData.isCreated) {
            handleAdd(setParams())
          } else {
            handleUpdate(setParams())
          }
        }
      })
    }

    handleQuery()

    return {
      ...toRefs(data),
      ...toRefs(baseData),
      ruleForm,
      handleCreate,
      handleEdit,
      handleDeleteEvent,
      handleCancel,
      handleSubmit,
      handleSizeChange,
      handleCurrentChange,
    }
  },
})
</script>

<style lang="scss" scoped>
.pagination {
  margin: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>