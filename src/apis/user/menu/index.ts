import request from "@/utils/request";
import { AxiosPromise, AxiosRequestConfig } from 'axios';

interface Data {
    [key: string]: unknown;
}

const menuCreate = (data: Data): AxiosPromise => {
    return request({
        method: "post",
        url: "/menu/create",
        data
    })
}

const menuUpdate = (data: Data): AxiosPromise => {
    return request({
        method: "post",
        url: "/menu/update",
        data
    })
}

const menuDel = (data: { _id: string }): AxiosPromise => {
    return request({
        method: "delete",
        url: "/menu/del",
        data
    })
}

const menuQuery = (): AxiosPromise => {
    return request({
        method: "post",
        url: "/menu/query",
    });
};


export { menuCreate, menuUpdate, menuDel, menuQuery };