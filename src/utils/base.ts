import { AxiosPromise } from 'axios';

// 基础接口

interface Rule {
    [key: string]: Array<{
        required?: boolean;
        message?: string;
        trigger?: string;
    }>;
}

interface Done {
    (): void;
}

interface HandleFn {
    (data?: any): AxiosPromise;
}

interface Param {
    [key: string]: any;
}

interface Config {
    handleAdd: HandleFn;
    handleDel: HandleFn;
    handleUpdate: HandleFn;
    handleQuery: HandleFn;
    queryParam?: Param; // 查询参数
    customHandle?: {
        (data: any, response: unknown): void;
    }; // 自定义处理查询函数(一般是非分页的时候)
    isNotPagination?: boolean; // 非分页
}

export { Rule, Done, Config, Param }