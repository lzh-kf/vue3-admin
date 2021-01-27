import { Rule } from '@/utils/base';
interface FormData {
    userAccount: string;
    password: string;
}

interface Data {
    formData: FormData;
    rules: Rule;
}

export { Data, FormData }