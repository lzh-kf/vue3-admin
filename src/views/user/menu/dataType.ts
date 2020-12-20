import { Rule } from '@/utils/base';

// 查询参数
interface Param {
    [key: string]: any;
}

// 表单参数
interface FormData {
    menuName: string;
    path: string;
    ids?: Array<number>;
    componentFilePath: string;
    menuId?: number;
    parentId?: number;
}

// 当前表格行数据
interface Record extends FormData {
    parentId: number;
    [key: string]: any;
}

// data的数据
interface Data {
    formData: FormData;
    rules: Rule;
}

export { Data, Record, FormData }