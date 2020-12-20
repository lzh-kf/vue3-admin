<template>
  <div>
    <el-row>
      <el-col :span="24" style="margin: 15px 20px 15px 0; text-align: right">
        <el-button
          @click="handleCreate"
          type="primary"
          style="margin-right: 10px"
          v-permission="''"
          >创建</el-button
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
          <el-button type="text" @click="handleEdit(data)">编辑</el-button>
          <el-popconfirm
            title="确定删除吗？"
            @confirm="handleDeleteEvent(data)"
          >
            <template #reference>
              <el-button type="text" style="margin-left: 10px">删除</el-button>
            </template>
          </el-popconfirm>
        </span>
      </template>
    </el-tree>
    <el-dialog
      :title="isCreated ? '创建菜单' : '修改菜单'"
      v-model="visible"
      width="30%"
      :destroy-on-close="true"
      :before-close="handleClose"
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
import getHandleFn from "@/utils/curd";
import { defineComponent, reactive, toRefs, ref, nextTick } from "vue";
import { Done, Config } from "@/utils/base";
import { Data, Record, FormData } from "./dataType";
import {
  menuCreate,
  menuDel,
  menuUpdate,
  menuQuery,
} from "@/apis/user/menu/index";
import lodash from "lodash";
import { findParentElement, Menu } from "@/utils";

const formData: FormData = {
  menuName: "",
  path: "",
  ids: [],
  componentFilePath: "",
};

// 配置项
const config: Config = {
  handleAdd: menuCreate,
  handleDel: menuDel,
  handleUpdate: menuUpdate,
  handleQuery: menuQuery,
  queryParam: {},
  customHandle: (baseData, res) => {
    baseData.list = res.data;
  },
};

export default defineComponent({
  setup() {
    const ruleForm = ref();
    const data: Data = reactive({
      formData: lodash.cloneDeep(formData), // 表单数据
      rules: {}, // 校验规则
      customProps: {
        label: "menuName",
        value: "menuId",
        checkStrictly: true,
      },
    });

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
    } = getHandleFn(config);

    const handleCreate = () => {
      baseData.isCreated = true;
      handleDialog(true);
    };

    const handleEdit = (row: Record) => {
      baseData.isCreated = false;
      const parentIds = findParentElement(
        baseData.list,
        row.parentId,
        baseData.list
      ).map((item: any) => item.menuId);
      data.formData = lodash.cloneDeep(row);
      data.formData.ids = [...parentIds, row.menuId];
      handleDialog(true);
    };

    const handleDeleteEvent = (row: Record) => {
      handleDel({ _id: row._id });
    };

    const handleCancel = () => {
      data.formData = lodash.cloneDeep(formData);
      nextTick(ruleForm.value.clearValidate);
      handleDialog(false);
    };

    const handleClose = (done: Done) => {
      handleCancel();
      done();
    };

    const setParams = () => {
      const params = lodash.cloneDeep(data.formData);
      const ids: Array<number> = params.ids || [];
      const length: number = ids?.length;
      if (baseData.isCreated) {
        params.parentId = ids[length - 1];
      } else {
        if (ids[length - 1] === params.menuId) {
          params.parentId = ids[length - 2];
        } else {
          params.parentId = ids[length - 1];
        }
      }
      return params;
    };

    const handleSubmit = () => {
      ruleForm.value.validate((valid: boolean) => {
        if (valid) {
          if (baseData.isCreated) {
            handleAdd(setParams());
          } else {
            handleUpdate(setParams());
          }
        }
      });
    };

    handleQuery();

    return {
      ...toRefs(data),
      ...toRefs(baseData),
      ruleForm,
      handleClose,
      handleCreate,
      handleEdit,
      handleDeleteEvent,
      handleCancel,
      handleSubmit,
      handleSizeChange,
      handleCurrentChange,
    };
  },
});
</script>

<style lang="scss" scoped>
.pagination {
  margin: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>