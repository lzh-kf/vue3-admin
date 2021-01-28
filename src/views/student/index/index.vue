<template>
  <div>
    <el-form :inline="true" :model="param">
      <el-form-item label="名字">
        <el-input
          v-model="param.name"
          placeholder="请输入名字"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="班级">
        <el-input
          v-model="param.class"
          placeholder="请输入班级"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="兴趣">
        <el-input
          v-model="param.interest"
          placeholder="请输入兴趣"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="param.gender">
          <el-radio label="0">女</el-radio>
          <el-radio label="1">男</el-radio>
        </el-radio-group>
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
      <el-col :span="24" style="margin: 15px 0px; text-align: right">
        <el-button
          @click="exportExcel"
          style="margin-right: 0px"
          v-permission="'student.download'"
          ><i class="iconfont icon-daochu"></i>导出excel</el-button
        >
        <el-button
          @click="handleCreate"
          type="primary"
          style="margin-right: 0px"
          v-permission="'student.create'"
          ><i class="iconfont icon-zengjiaxinzeng"></i>创建学生</el-button
        >
      </el-col>
    </el-row>
    <el-table :data="list" v-loading="loading" border>
      <el-table-column
        prop="name"
        label="姓名"
        align="center"
        header-align="center"
      ></el-table-column>
      <el-table-column
        prop="class"
        label="班级"
        align="center"
        header-align="center"
      ></el-table-column>
      <el-table-column
        prop="interest"
        label="兴趣"
        align="center"
        header-align="center"
      ></el-table-column>
      <el-table-column
        prop="gender"
        label="性别"
        align="center"
        header-align="center"
        :formatter="formatterGender"
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
          <el-button @click="handleEdit(row)" v-permission="'student.update'"
            ><i class="iconfont icon-bianji"></i>编辑</el-button
          >
          <el-popconfirm title="确定删除吗？" @confirm="handleDeleteEvent(row)">
            <template #reference>
              <el-button
                type="danger"
                style="margin-left: 10px"
                v-permission="'student.del'"
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
      :title="isCreated ? '创建学生' : '编辑学生'"
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
        <el-form-item label="名字" prop="name">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="班级" prop="class">
          <el-input v-model="formData.class"></el-input>
        </el-form-item>
        <el-form-item label="兴趣" prop="interest">
          <el-input type="textarea" v-model="formData.interest"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="formData.gender">
            <el-radio label="0">女</el-radio>
            <el-radio label="1">男</el-radio>
          </el-radio-group>
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
import { Data, Record, FormData } from './dataType'
import { Config } from '@/utils/base'
import { genderMap } from '@/utils/const'
import {
  studentCreate,
  studentUpdate,
  studentdel,
  studentQuery,
  donwloadStudentInfo,
} from '@/apis/student'
import lodash from 'lodash'

const formData: FormData = {
  name: '',
  gender: '',
  interest: '',
  class: '',
}

// 配置项
const config: Config = {
  handleAdd: studentCreate,
  handleDel: studentdel,
  handleUpdate: studentUpdate,
  handleQuery: studentQuery,
  handleExcel: donwloadStudentInfo,
  queryParam: {},
}

export default defineComponent({
  setup(props) {
    console.log(props)
    const ruleForm = ref()
    const data = reactive<Data>({
      param: lodash.cloneDeep(formData), // 查询参数
      formData: lodash.cloneDeep(formData), // 表单数据
      rules: {
        name: [{ required: true, message: '请输入名字', trigger: 'blur' }],
        class: [{ required: true, message: '请输入班级', trigger: 'blur' }],
        interest: [{ required: true, message: '请输入兴趣', trigger: 'blur' }],
        gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
      }, // 校验规则
    })

    // 基础数据（分页数据），和增删改查处理函数，以及分页查询变化处理函数
    const {
      baseData,
      handleAdd,
      handleDel,
      handleUpdate,
      handleQuery,
      handleExcel,
      handleSizeChange,
      handleCurrentChange,
      handleDialog,
    } = getHandleFn(config)

    const handleSearch = () => {
      config.queryParam = { ...data.param }
      handleQuery()
    }

    const handleReset = () => {
      data.param = lodash.cloneDeep(formData)
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

    const exportExcel = () => {
      handleExcel()
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

    const handleSubmit = () => {
      ruleForm.value.validate((valid: boolean) => {
        if (valid) {
          if (baseData.isCreated) {
            handleAdd(data.formData)
          } else {
            handleUpdate(data.formData)
          }
        }
      })
    }

    const formatterGender = (
      row: Record,
      column: unknown,
      value: '0' | '1'
    ): string => genderMap[value]

    handleSearch()

    return {
      ...toRefs(data),
      ...toRefs(baseData),
      handleSearch,
      handleReset,
      ruleForm,
      handleCreate,
      handleEdit,
      exportExcel,
      handleDeleteEvent,
      handleCancel,
      handleSubmit,
      handleSizeChange,
      handleCurrentChange,
      formatterGender,
    }
  },
})
</script>