import request from "@/utils/request";
import { AxiosPromise } from 'axios';

interface Data {
    userAccount: string;
    password: string;
}

const login = (data: Data): AxiosPromise => {
    return request({
        method: "post",
        url: "/login",
        data
    });
};

const logout = (): AxiosPromise => {
    return request({
        method: "post",
        url: "/logout"
    });
};

const refreshToken = (data: { userAccount: string }): AxiosPromise => {
    return request({
        method: "post",
        url: "/refreshToken",
        data
    });
};

const queryPermission = (): AxiosPromise => {
    return request({
        method: "get",
        url: "/queryMenusAndPermission"
    });
};

export { login, logout, queryPermission, refreshToken };
