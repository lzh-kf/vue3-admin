import { Rule } from '@/utils/base';

// 表单参数
interface FormData {
    userName: string;
    password?: string;
    sourcePassword?: string;
    userAccount: string;
    email: string;
    roleId: Array<number>;
}

// 当前表格行数据
interface Record extends FormData {
    [key: string]: any;
}

// data的数据
interface Data {
    param: {
        userName?: string;
        email?: string;
    };
    formData: FormData;
    rules: Rule;
    roles: Array<{
        [key: string]: any;
    }>;
}

export { Data, Record, FormData }