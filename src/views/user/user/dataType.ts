import { Rule } from '@/utils/base';

// 表单参数
interface FormData {
    userName: string;
    password: string;
    userAccount: string;
    roleId: Array<string>;
}

// 当前表格行数据
interface Record extends FormData {
    [key: string]: any;
}

// 查询的数据
interface Param {
    userName?: string;
}

// data的数据
interface Data {
    param: Param;
    formData: FormData;
    rules: Rule;
    roles: Array<{
        [key: string]: any;
    }>;
}

export { Data, Record, FormData }