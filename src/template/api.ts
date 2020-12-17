`import request from "@/utils/request";
import { AxiosPromise, AxiosRequestConfig } from 'axios';

interface Data {
    [key: string]: unknown
}

const {{create}} = (data: Data): AxiosPromise => {
    return request({
        method: "post",
        url: "",
        data
    })
}

const {{update}} = (): AxiosPromise => {
    return request({
        method: "post",
        url: ""
    })
}

const {{del}} = (): AxiosPromise => {
    return request({
        method: "delete",
        url: "",
    })
}

const {{query}} = (): AxiosPromise => {
    return request({
        method: "post",
        url: "",
    } as AxiosRequestConfig);
};


export { {{create}}, {{update}}, {{del}}, {{query}} };`