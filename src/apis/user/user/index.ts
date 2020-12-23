import request from "@/utils/request";
import { AxiosPromise } from 'axios';
import { Pagination } from '@/utils/base';
interface Data {
    userName: string;
    password: string;
    roleId: Array<string>;
    userAccount: string;
}
interface UpdateData extends Data {
    _id: string;
}
interface QueryParam extends Pagination {
    userName?: string;
}

const userCreate = (data: Data): AxiosPromise => {
    return request({
        method: "post",
        url: "/user/create",
        data
    })
}

const userUpdate = (data: UpdateData): AxiosPromise => {
    return request({
        method: "post",
        url: "/user/update",
        data
    })
}

const userDel = (data: { _id: string }): AxiosPromise => {
    return request({
        method: "delete",
        url: "/user/del",
        data
    })
}

const userQuery = (data: QueryParam): AxiosPromise => {
    return request({
        method: "post",
        url: "/user/query",
        data
    });
};


export { userCreate, userUpdate, userDel, userQuery };