import request from "@/utils/request";
import { AxiosPromise } from 'axios';
interface Data {
    name: string;
    gender: string;
    interest: string;
    class: string;
}
interface UpdateParams extends Data {
    _id: string;
}
interface Pagination {
    pageSize: number;
    pageNum: number;
    name?: string;
    gender?: string;
    interest?: string;
    class?: string;
}

const studentCreate = (data: Data): AxiosPromise => {
    return request({
        method: "post",
        url: "/student/create",
        data
    })
}

const studentUpdate = (data: UpdateParams): AxiosPromise => {
    return request({
        method: "post",
        url: "/student/update",
        data
    })
}

const studentdel = (data: { _id: string }): AxiosPromise => {
    return request({
        method: "delete",
        url: "/student/del",
        data
    })
}

const studentQuery = (data: Pagination): AxiosPromise => {
    return request({
        method: "post",
        url: "/student/query",
        data
    });
};

const donwloadStudentInfo = (data: Pagination): AxiosPromise => {
    return request({
        method: "post",
        url: "/student/download",
        data,
        responseType: "arraybuffer"
    });
};

export {
    studentCreate,
    studentUpdate,
    studentdel,
    studentQuery,
    donwloadStudentInfo
};