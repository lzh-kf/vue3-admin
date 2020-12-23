import { Rule } from '@/utils/base';

// 查询参数
interface Param {
    [key: string]: any;
}

// 表单参数
interface FormData {
    roleName: string;
    menuIds: Array<number>;
    permissionIds: Array<string>;
    roleId?: string;
}

// 当前表格行数据
interface Record extends FormData {
    _id: string;
}

// data的数据
interface Data {
    param: {
        roleName?: string;
    };
    formData: FormData;
    rules: Rule;
    defaultProps: {
        children: string;
        label: string;
    };
    menus: Array<Param>;
    actions: Array<Param>;
}

export { Data, Record, FormData, Param }