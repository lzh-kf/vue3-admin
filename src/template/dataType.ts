`import { Rule } from '@/utils/base'

// 查询参数
interface Param {
    [key: string]: any
}

// 表单参数
interface FormData {
    [key: string]: any
}

// 当前表格行数据
interface Record extends FormData {
    [key: string]: any
}

// data的数据
interface Data {
    param: Param;
    formData: FormData;
    rules: Rule;
}

export { Data, Record, FormData }`