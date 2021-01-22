import { Rule } from '@/utils/base';

// 表单参数
interface FormData {
    menuName: string;
    path: string;
    ids?: Array<number>;
    componentFilePath: string;
    menuId?: number;
    parentId?: number;
    icon: string;
}

// 当前表格行数据
interface Record extends FormData {
    parentId: number;
    menuId: number;
    _id: string;
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
    iconList: Array<string>;
}

export { Data, Record, FormData }