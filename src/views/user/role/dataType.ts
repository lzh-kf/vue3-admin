import { Rule } from '@/utils/base';

// 查询参数
interface Param {
    [key: string]: any;
}

// 表单参数
interface FormData {
    roleName: string;
    menuIds: Array<Param>;
    permissionIds: Array<Param>;
    roleId?: string;
}

// 当前表格行数据
interface Record extends FormData {
    _id: string;
}

// data的数据
interface Data {
    param: Param;
    formData: FormData;
    rules: Rule;
    defaultProps: {
        children: "children";
        label: "menuName";
    };
    menus: Array<Param>;
    actions: Array<Param>;
}

export { Data, Record, FormData, Param }