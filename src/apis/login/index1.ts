import request from "@/utils/request";
import { AxiosPromise, AxiosRequestConfig } from 'axios';

interface Data {
    [key: string]: unknown;
}

const loginCreate = (data: Data): AxiosPromise => {
    return request({
        method: "post",
        url: "",
        data
    })
}

const loginUpdate = (): AxiosPromise => {
    return request({
        method: "post",
        url: ""
    })
}

const loginDel = (): AxiosPromise => {
    return request({
        method: "delete",
        url: "",
    })
}

const loginQuery = (): AxiosPromise => {
    return request({
        method: "post",
        url: "",
    } as AxiosRequestConfig);
};


export { loginCreate, loginUpdate, loginDel, loginQuery };