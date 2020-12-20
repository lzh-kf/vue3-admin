<template>
  <div>
    <el-form :inline="true" :model="param" class="demo-form-inline">
      <el-form-item label="角色名：">
        <el-input
          v-model="param.roleName"
          placeholder="请输入"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item style="margin-left: 10px">
        <el-button type="primary" @click="handleSearch">查询</el-button>
        <el-button @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>
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
    <el-table :data="list" style="width: 100%" v-loading="loading">
      <el-table-column
        prop="roleName"
        label="角色名"
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
        prop="roleName"
        label="角色名"
        align="center"
        header-align="center"
      ></el-table-column>
      <el-table-column label="操作" align="center" header-align="center">
        <template #default="{ row }">
          <el-button @click="handleEdit(row)" v-permission="''">编辑</el-button>
          <el-popconfirm title="确定删除吗？" @confirm="handleDeleteEvent(row)">
            <template #reference>
              <el-button
                type="danger"
                style="margin-left: 10px"
                v-permission="''"
                >删除</el-button
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
      :title="isCreated ? '录入' : '修改'"
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
        <el-form-item label="角色名" prop="roleName">
          <el-input v-model="formData.roleName"></el-input>
        </el-form-item>
        <el-form-item label="菜单" prop="menuIds" style="width: 45%">
          <el-tree
            :data="menus"
            show-checkbox
            node-key="menuId"
            ref="menuTree"
            :default-checked-keys="formData.menuIds"
            :props="defaultProps"
          >
          </el-tree>
        </el-form-item>
        <el-form-item label="权限" prop="permissionIds" style="width: 45%">
          <el-tree
            :data="actions"
            show-checkbox
            node-key="menuId"
            ref="permissionTree"
            :default-checked-keys="formData.permissionIds"
            :props="defaultProps"
          >
          </el-tree>
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
import { defineComponent, reactive, toRefs, ref, nextTick, watch } from "vue";
import { Done, Config } from "@/utils/base";
import { Data, Record, FormData, Param } from "./dataType";
import { menuQuery } from "@/apis/user/menu";
import { permissionQuery } from "@/apis/user/permission";
import lodash from "lodash";
import {
  roleCreate,
  roleDel,
  roleUpdate,
  roleQuery,
} from "@/apis/user/role/index";

const formData: FormData = {
  roleName: "",
  menuIds: [],
  permissionIds: [],
};

// 配置项
const config: Config = {
  handleAdd: roleCreate,
  handleDel: roleDel,
  handleUpdate: roleUpdate,
  handleQuery: roleQuery,
  queryParam: {},
};

export default defineComponent({
  setup() {
    const ruleForm = ref();
    const menuTree = ref();
    const permissionTree = ref();
    const data: Data = reactive({
      param: { roleName: "" }, // 查询参数
      formData: lodash.cloneDeep(formData), // 表单数据
      rules: {
        roleName: [
          { required: true, message: "请输入角色名", trigger: "blur" },
        ],
      }, // 校验规则
      defaultProps: {
        children: "children",
        label: "menuName",
      },
      menus: [],
      actions: [],
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

    const handleSearch = () => {
      config.queryParam = { ...data.param };
      handleQuery();
    };

    const handleReset = () => {
      data.param = { roleName: "" };
      handleSearch();
    };

    const getMenusKeys = () => {
      data.formData.menuIds = menuTree.value
        .getCheckedNodes(false, true)
        .map((item: Param) => item.menuId);
    };

    const getPermissionKeys = () => {
      data.formData.permissionIds = permissionTree.value.getCheckedKeys(true);
    };

    const handleCreate = () => {
      baseData.isCreated = true;
      handleDialog(true);
    };

    const handleEdit = (row: Record) => {
      baseData.isCreated = false;
      data.formData = lodash.cloneDeep(row);
      handleDialog(true);
    };

    const handleDeleteEvent = (row: Record) => {
      handleDel({ _id: row._id });
    };

    const handleCancel = () => {
      data.formData = lodash.cloneDeep(formData);
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
          getMenusKeys();
          getPermissionKeys();
          if (baseData.isCreated) {
            handleAdd(data.formData);
          } else {
            handleUpdate(data.formData);
          }
        }
      });
    };

    const getMenus = () => {
      menuQuery().then((res) => {
        data.menus = res.data;
      });
    };

    const getPermission = () => {
      permissionQuery().then((res) => {
        data.actions = res.data;
      });
    };

    handleSearch();
    getPermission();
    getMenus();

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
      menuTree,
      permissionTree,
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