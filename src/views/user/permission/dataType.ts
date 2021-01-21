import { Rule } from '@/utils/base';

// 表单参数
interface FormData {
    action: string;
    permissionName: string;
    ids?: Array<number>;
    parentId?: number;
    menuId?: number;
}

// 当前表格行数据
interface Record {
    action: string;
    permissionName: string;
    menuId: number;
    _id: string;
    parentId: number;
}


interface CustomProps {
    label: string;
    value: string;
    checkStrictly: boolean;
}


// data的数据
interface Data {
    formData: FormData;
    rules: Rule;
    customProps: CustomProps;
}

export { Data, Record, FormData }