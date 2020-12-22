import request from "@/utils/request";
import { AxiosPromise, AxiosRequestConfig } from 'axios';

interface Data {
    parentId: number;
    action: string;
    permissionName: string;
}

interface UpdateData extends Data {
    _id: string;
}

const permissionCreate = (data: Data): AxiosPromise => {
    return request({
        method: "post",
        url: "/permission/create",
        data
    })
}

const permissionUpdate = (data: UpdateData): AxiosPromise => {
    return request({
        method: "post",
        url: "/permission/update",
        data
    })
}

const permissionDel = (data: { _id: string }): AxiosPromise => {
    return request({
        method: "delete",
        url: "/permission/del",
        data
    })
}

const permissionQuery = (): AxiosPromise => {
    return request({
        method: "post",
        url: "/permission/query",
    } as AxiosRequestConfig);
};


export { permissionCreate, permissionUpdate, permissionDel, permissionQuery };