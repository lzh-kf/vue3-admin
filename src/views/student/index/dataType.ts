import { Rule } from '@/utils/base';

interface Param {
    name?: string;
    gender?: string;
    interest?: string;
    class?: string;
}

interface FormData {
    name: string;
    gender: string;
    interest: string;
    class: string;
}

interface Record extends FormData {
    _id: string;
}

interface Data {
    param: Param;
    formData: FormData;
    rules: Rule;
}

export { Data, Record, FormData }