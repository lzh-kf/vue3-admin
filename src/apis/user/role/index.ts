import request from "@/utils/request";
import { AxiosPromise } from 'axios';
import { Pagination } from '@/utils/base';
interface Data {
    roleName: string;
    menuIds: Array<number>;
    permissionIds: Array<string>;
    roleId?: number;
}

interface UpdateData extends Data {
    _id: string;
}
interface QueryParam extends Pagination {
    roleName?: string;
}

const roleCreate = (data: Data): AxiosPromise => {
    return request({
        method: "post",
        url: "/role/create",
        data
    })
}

const roleUpdate = (data: UpdateData): AxiosPromise => {
    return request({
        method: "post",
        url: "/role/update",
        data
    })
}

const roleDel = (data: { _id: string }): AxiosPromise => {
    return request({
        method: "delete",
        url: "/role/del",
        data
    })
}

const roleQuery = (data: QueryParam): AxiosPromise => {
    return request({
        method: "post",
        url: "/role/query",
        data
    });
};

const allRoleQuery = (): AxiosPromise => {
    return request({
        method: "post",
        url: "/role/queryAll",

    });
};


export { roleCreate, roleUpdate, roleDel, roleQuery, allRoleQuery };