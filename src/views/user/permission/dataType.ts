import { Rule } from '@/utils/base';

// 查询参数
interface Param {
    [key: string]: any;
}

// 表单参数
interface FormData {
    action: string,
    permissionName: string,
    ids?: Array<number>;
    parentId?: number,
    menuId?:number
}

// 当前表格行数据
interface Record {
    action: string,
    permissionName: string,
    parentId: number;
    [key: string]: any;
}

// data的数据
interface Data {
    formData: FormData;
    rules: Rule;
}

export { Data, Record, FormData }