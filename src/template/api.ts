`import request from "@/utils/request";
import { AxiosPromise, AxiosRequestConfig } from 'axios';
import { Pagination } from '@/utils/base';

interface Data {
    [key: string]: unknown
}

interface QueryParam extends Pagination {
}

const {{create}} = (data: Data): AxiosPromise => {
    return request({
        method: "post",
        url: "",
        data
    })
}

const {{update}} = (data:Data): AxiosPromise => {
    return request({
        method: "post",
        url: ""
    })
}

const {{del}} = (data:{_id:string}): AxiosPromise => {
    return request({
        method: "delete",
        url: "",
    })
}

const {{query}} = (data:QueryParam): AxiosPromise => {
    return request({
        method: "post",
        url: "",
        data
    } as AxiosRequestConfig);
};


export { {{create}}, {{update}}, {{del}}, {{query}} };`