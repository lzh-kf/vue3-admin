<template>
  <div>
    <el-row>
      <el-col :span="24" style="text-align: right">
        <el-button
          @click="handleCreate"
          type="primary"
          v-permission="'permission.create'"
          style="margin: 15px 0; text-align: right"
        >
          <i class="iconfont icon-zengjiaxinzeng"></i>
          创建权限</el-button
        >
      </el-col>
    </el-row>
    <el-table :data="list" row-key="menuId" border :stripe="true">
      <el-table-column prop="menuName" label="菜单名" />
      <el-table-column prop="icon" label="图标">
        <template #default="{ row }">
          <i :class="'iconfont ' + row.icon" />
        </template>
      </el-table-column>
      <el-table-column prop="path" label="路由路径" />
      <el-table-column prop="componentFilePath" label="文件夹路径" />
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column prop="updateTime" label="更新时间" />
      <el-table-column label="操作" align="center">
        <template #default="{ row }">
          <el-button v-permission="'permission.update'" @click="handleEdit(row)"
            ><i class="iconfont icon-bianji"></i>修改
          </el-button>
          <el-popconfirm
            title="确定删除吗？"
            @confirm="handleDeleteEvent(data)"
          >
            <template #reference>
              <el-button type="danger" v-permission="'permission.del'"
                ><i class="iconfont icon--delete"></i>删除</el-button
              >
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="isCreated ? '创建权限' : '编辑权限'"
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
        <el-form-item label="权限行为" prop="action">
          <el-input v-model.trim="formData.action" clearable></el-input>
        </el-form-item>
        <el-form-item label="权限名" prop="permissionName">
          <el-input v-model.trim="formData.permissionName" clearable></el-input>
        </el-form-item>
        <el-form-item label="所属页面" prop="ids">
          <el-cascader
            :options="list"
            :show-all-levels="false"
            :props="customProps"
            v-model="formData.ids"
          ></el-cascader>
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
  permissionCreate,
  permissionDel,
  permissionUpdate,
  permissionQuery
} from '@/apis/user/permission/index'
import { findParentElement, Result, Menu } from '@/utils'
import lodash from 'lodash'

const formData: FormData = {
  action: '',
  permissionName: '',
  ids: []
}

// 配置项
const config: Config = {
  handleAdd: permissionCreate,
  handleDel: permissionDel,
  handleUpdate: permissionUpdate,
  handleQuery: permissionQuery,
  queryParam: {},
  customHandle: (baseData, res) => {
    baseData.list = res.data
  }
}

export default defineComponent({
  setup() {
    const ruleForm = ref()
    const data = reactive<Data>({
      formData: lodash.cloneDeep(formData), // 表单数据
      rules: {
        action: [
          { required: true, message: '请输入权限行为', trigger: 'blur' }
        ],
        permissionName: [
          { required: true, message: '请输入权限名', trigger: 'blur' }
        ],
        ids: [{ required: true, message: '请选择所属页面', trigger: 'change' }]
      }, // 校验规则
      customProps: {
        label: 'menuName',
        value: 'menuId',
        checkStrictly: true
      }
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
      handleDialog
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
      handleCurrentChange
    }
  }
})
</script>

<style lang="scss" scoped>
.pagination {
  margin: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>