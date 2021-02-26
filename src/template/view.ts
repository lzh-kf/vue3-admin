`<template>
  <div>
    <el-form :inline="true" :model="param">
      <el-form-item label="属性标签：">
        <el-input
          v-model="param.defaultProperty"
          placeholder="请输入"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item style="margin-left: 10px">
        <el-button type="primary" @click="handleSearch"><i class="iconfont icon-chaxun"></i> 查询</el-button>
        <el-button @click="handleReset"><i class="iconfont icon-zhongzhi"></i>重置</el-button>
      </el-form-item>
    </el-form>
    <el-row>
      <el-col :span="24" style="text-align: right">
      <el-button
      @click="exportExcel"
      style="margin-right: 0px"
      v-permission="'{{moduleName}}.download'"
      ><i class="iconfont icon-daochu"></i>导出excel</el-button
    >
        <el-button
          @click="handleCreate"
          type="primary"
          v-permission="'{{moduleName}}.create'"
          ><i class="iconfont icon-zengjiaxinzeng"></i>创建</el-button
        >
      </el-col>
    </el-row>
    <el-table :data="list" style="width: 100%" v-loading="loading" border>
      <el-table-column
        prop="defaultProperty"
        label="属性名"
        align="center"
        header-align="center"
      ></el-table-column>
      <el-table-column label="操作" align="center" header-align="center">
        <template #default="{ row }">
          <el-button @click="handleEdit(row)" v-permission="'{{moduleName}}.update'"
            ><i class="iconfont icon-bianji"></i>编辑</el-button
          >
          <el-popconfirm title="确定删除吗？" @confirm="handleDeleteEvent(row)">
            <template #reference>
              <el-button
                type="danger"
                style="margin-left: 10px"
                v-permission="'{{moduleName}}.del'"
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
      :title="isCreated ? '录入' : '编辑'"
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
        <el-form-item label="属性名" prop="defaultProperty">
          <el-input v-model="formData.defaultProperty"></el-input>
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
import getHandleFn from "@/utils/curd"
import { defineComponent, reactive, toRefs, ref, nextTick, watch } from "vue"
import { Config } from "@/utils/base"
import { Data, Record, FormData } from "./dataType"
import { {{create}}, {{del}}, {{update}}, {{query}}, {{export}} } from "@/apis/{{apiFilePath}}/index"
import lodash from "lodash";

const formData: FormData = {
}

// 配置项
const config: Config = {
  handleAdd: {{create}},
  handleDel: {{del}},
  handleUpdate: {{update}},
  handleQuery: {{query}},
  handleExcel: {{export}},
  queryParam: {},
}

export default defineComponent({
  setup() {
    const ruleForm = ref();
    const data = reactive<Data>({
      param: lodash.cloneDeep(formData), // 查询参数
      formData: lodash.cloneDeep(formData), // 表单数据
      rules: {
      }, // 校验规则
    })
    // 基础数据（分页数据），和增删改查处理函数，以及分页查询变化处理函数
    const {
      baseData,
      handleAdd,
      handleDel,
      handleUpdate,
      handleExcel,
      handleQuery,
      handleSizeChange,
      handleCurrentChange,
      handleDialog,
    } = getHandleFn(config)

    const handleSearch = () => {
      config.queryParam = { ...data.param }
      handleQuery()
    }

    const handleReset = () => {
      data.param = { ...formData }
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
      handleDel({ id: row._id })
    }

    const exportExcel = () => {
      handleExcel()
    }

    const handleCancel = () => {
      handleDialog(false)
      data.formData = lodash.cloneDeep(formData)
      nextTick(ruleForm.value.clearValidate);
    };

    watch(
      () => baseData.visible,
      (newVal) => {
        !newVal && handleCancel();
      }
    );

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

    handleSearch()

    return {
      ...toRefs(data),
      ...toRefs(baseData),
      handleSearch,
      handleReset,
      ruleForm,
      handleCreate,
      handleEdit,
      handleDeleteEvent,
      exportExcel,
      handleCancel,
      handleSubmit,
      handleSizeChange,
      handleCurrentChange,
    }
  },
})
</script>`