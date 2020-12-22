import request from "@/utils/request";
import { AxiosPromise } from 'axios';
interface Data {
    menuName: string;
    path: string;
    componentFilePath: string;
    parentId?: undefined | number;
}
interface UpdateData extends Data {
    _id: string;
}

const menuCreate = (data: Data): AxiosPromise => {
    return request({
        method: "post",
        url: "/menu/create",
        data
    })
}

const menuUpdate = (data: UpdateData): AxiosPromise => {
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