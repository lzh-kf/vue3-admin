import { AxiosPromise } from 'axios'

// 基础接口
interface Rule {
    [key: string]: Array<{
        required?: boolean;
        message?: string;
        trigger?: string;
    }>;
}

interface HandleFn {
    (data?: any): AxiosPromise;
}

interface Param {
    [key: string]: any;
}

interface Pagination {
    pageSize: number;
    pageNum: number;
}

interface BaseData {
    pagination: Pagination;
    pageSizes: Array<number>;
    list: Array<{
        [key: string]: any;
    }>;
    total: number;
    isCreated: boolean;
    visible: boolean;
    loading: boolean;
}

interface Config {
    handleAdd: HandleFn;
    handleDel: HandleFn;
    handleUpdate: HandleFn;
    handleQuery: HandleFn;
    handleExcel?: HandleFn;
    queryParam?: Param; // 查询参数
    customHandle?: {
        (data: BaseData, response: any): void;
    }; // 自定义处理查询函数(一般是非分页的时候)
    isNotPagination?: boolean; // 非分页
}

export { Rule, Config, Param, Pagination, BaseData }