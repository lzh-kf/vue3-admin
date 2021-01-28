import request from "@/utils/request";
import { AxiosPromise } from 'axios';
import { Pagination } from '@/utils/base';
interface Data {
    name: string;
    gender: string;
    interest: string;
    class: string;
}
interface UpdateData extends Data {
    _id: string;
}
interface QueryParam extends Pagination {
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

const studentUpdate = (data: UpdateData): AxiosPromise => {
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

const studentQuery = (data: QueryParam): AxiosPromise => {
    return request({
        method: "post",
        url: "/student/query",
        data
    });
};

const donwloadStudentInfo = (data: QueryParam): AxiosPromise => {
    return request({
        method: "post",
        url: "/student/download",
        data
    });
};

export {
    studentCreate,
    studentUpdate,
    studentdel,
    studentQuery,
    donwloadStudentInfo
};