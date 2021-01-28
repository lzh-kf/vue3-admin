<template>
  <div>
    <el-form :inline="true" :model="param">
      <el-form-item label="用户名">
        <el-input
          v-model="param.userName"
          placeholder="请输入用户名"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input
          v-model="param.email"
          placeholder="请输入邮箱"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item style="margin-left: 10px">
        <el-button type="primary" @click="handleSearch"
          ><i class="iconfont icon-chaxun"></i>查询</el-button
        >
        <el-button @click="handleReset"
          ><i class="iconfont icon-zhongzhi"></i>重置</el-button
        >
      </el-form-item>
    </el-form>
    <el-row>
      <el-col :span="24" style="margin: 15px 0; text-align: right">
        <el-button
          @click="handleCreate"
          type="primary"
          v-permission="'user.create'"
          ><i class="iconfont icon-zengjiaxinzeng"></i>创建用户</el-button
        >
      </el-col>
    </el-row>
    <el-table :data="list" style="width: 100%" v-loading="loading" border>
      <el-table-column
        prop="userName"
        label="用户名"
        align="center"
        header-align="center"
      ></el-table-column>
      <el-table-column
        prop="userAccount"
        label="用户账号"
        align="center"
        header-align="center"
      ></el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        align="center"
        header-align="center"
      ></el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        align="center"
        header-align="center"
      ></el-table-column>
      <el-table-column
        prop="updateTime"
        label="更新时间"
        align="center"
        header-align="center"
      ></el-table-column>
      <el-table-column label="操作" align="center" header-align="center">
        <template #default="{ row }">
          <el-button @click="handleEdit(row)" v-permission="'user.update'"
            ><i class="iconfont icon-bianji"></i>编辑</el-button
          >
          <el-popconfirm title="确定删除吗？" @confirm="handleDeleteEvent(row)">
            <template #reference>
              <el-button
                type="danger"
                style="margin-left: 10px"
                v-permission="'user.del'"
                ><i class="iconfont icon--delete"></i>删除</el-button
              >
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.pageNum"
        :page-sizes="pageSizes"
        :page-size="pagination.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <el-dialog
      :title="isCreated ? '创建用户' : '编辑用户'"
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
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="formData.userName"></el-input>
        </el-form-item>
        <el-form-item label="用户账号" prop="userAccount">
          <el-input v-model="formData.userAccount"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="formData.email" type="email"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
          :rules="{
            required: isCreated,
            message: '请输入密码',
            trigger: 'blur',
          }"
        >
          <el-input type="password" v-model="formData.password"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="roleId">
          <el-select v-model="formData.roleId" multiple placeholder="请选择">
            <el-option
              v-for="item in roles"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId"
            >
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
  userCreate,
  userDel,
  userUpdate,
  userQuery,
} from '@/apis/user/user/index'
import { allRoleQuery } from '@/apis/user/role/index'
import lodash from 'lodash'
import blueimpmd5 from 'blueimp-md5'

const formData: FormData = {
  userName: '',
  password: '',
  sourcePassword: '',
  userAccount: '',
  email: '',
  roleId: [],
}
// 配置项
const config: Config = {
  handleAdd: userCreate,
  handleDel: userDel,
  handleUpdate: userUpdate,
  handleQuery: userQuery,
  queryParam: {},
}

export default defineComponent({
  setup() {
    const ruleForm = ref()
    const data = reactive<Data>({
      param: { userName: '', email: '' }, // 查询参数
      formData: lodash.cloneDeep(formData), // 表单数据
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        userAccount: [
          { required: true, message: '请输入用户账号', trigger: 'blur' },
        ],
        email: [{ required: true, message: '请输入用户邮箱', trigger: 'blur' }],
        roleId: [{ required: true, message: '请选择角色', trigger: 'change' }],
      }, // 校验规则
      roles: [],
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

    const handleSearch = () => {
      config.queryParam = data.param
      handleQuery()
    }

    const handleReset = () => {
      data.param = { userName: '', email: '' }
      handleSearch()
    }

    const handleCreate = () => {
      baseData.isCreated = true
      handleDialog(true)
    }

    const handleEdit = (row: Record) => {
      baseData.isCreated = false
      data.formData = lodash.cloneDeep(row)
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

    const setParam = (): FormData => {
      const params: FormData = lodash.cloneDeep(data.formData)
      if (params.password) {
        params.sourcePassword = params.password
        params.password = blueimpmd5(params.password)
      }
      return params
    }

    const handleSubmit = () => {
      ruleForm.value.validate((valid: boolean) => {
        if (valid) {
          if (baseData.isCreated) {
            handleAdd(setParam())
          } else {
            handleUpdate(setParam())
          }
        }
      })
    }

    const getRoles = () => {
      allRoleQuery().then((res) => {
        data.roles = res.data
      })
    }

    handleSearch()
    getRoles()

    return {
      ...toRefs(data),
      ...toRefs(baseData),
      handleSearch,
      handleReset,
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