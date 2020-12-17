import request from "@/utils/request";
import { AxiosPromise } from 'axios';

interface Data {
    [key: string]: unknown;
}

const roleCreate = (data: Data): AxiosPromise => {
    return request({
        method: "post",
        url: "/role/create",
        data
    })
}

const roleUpdate = (): AxiosPromise => {
    return request({
        method: "post",
        url: "/role/update"
    })
}

const roleDel = (): AxiosPromise => {
    return request({
        method: "delete",
        url: "/role/del",
    })
}

const roleQuery = (): AxiosPromise => {
    return request({
        method: "post",
        url: "/role/query",
    });
};

const roleQueryAll = (): AxiosPromise  => {
    return request({
        method: "post",
        url: "/role/queryAll",

    });
};


export { roleCreate, roleUpdate, roleDel, roleQuery, roleQueryAll };