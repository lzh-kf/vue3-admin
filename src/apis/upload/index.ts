import request from "@/utils/request";
import { AxiosPromise } from 'axios';

const uploadFile = (data: FormData): AxiosPromise => {
    return request({
        method: "post",
        url: "/base/upload",
        headers: { 'Content-Type': 'multipart/form-data' },
        data
    });
};

export { uploadFile };
