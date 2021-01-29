`import request from "@/utils/request"
import { AxiosPromise } from 'axios'
import { Pagination } from '@/utils/base'

interface Data {
    [key: string]: unknown
}

interface UpdateData extends Data {
    _id:string
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

const {{update}} = (data: UpdateData): AxiosPromise => {
    return request({
        method: "post",
        url: ""
    })
}

const {{del}} = (data: {_id: string}): AxiosPromise => {
    return request({
        method: "delete",
        url: "",
    })
}

const {{query}} = (data: QueryParam): AxiosPromise => {
    return request({
        method: "post",
        url: "",
        data
    });
};

const {{export}} = (data: QueryParam): AxiosPromise => {
    return request({
        method: "post",
        url: "",
        data
    });
};


export { {{create}}, {{update}}, {{del}}, {{query}}, {{export}} }`