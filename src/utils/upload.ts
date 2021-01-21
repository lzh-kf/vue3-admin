
import { uploadType, uploadFileSize } from './const'

// 校验文件是否可上传
const checkFile = (fileType: string, currentPploadType?: Array<string>): boolean => {
    currentPploadType = currentPploadType || uploadType
    return currentPploadType.includes(fileType)
}

// 校验文件大小
const checkFileSize = (currentFileSize: number, ruleFileSize?: number): boolean => {
    ruleFileSize = ruleFileSize || uploadFileSize
    return ruleFileSize > (currentFileSize / 1024 / 1024)
}

interface UploadFile {
    data: {};
    file: File;
    filename: string;
    headers: {};
    onError: () => {};
    onProgress: () => {};
    onSuccess: () => {};
    withCredentials: boolean;
}

export { checkFile, checkFileSize, UploadFile }