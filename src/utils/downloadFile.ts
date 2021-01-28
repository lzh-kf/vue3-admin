const createBlob = (data: Buffer, fileName: string): void => {
    const blob = Buffer.from(data);
    const downloadElement = document.createElement("a");
    const href = URL.createObjectURL(new Blob([blob])); // 创建下载的链接
    downloadElement.href = href;
    downloadElement.download = fileName;
    document.body.appendChild(downloadElement);
    downloadElement.click(); // 点击下载
    document.body.removeChild(downloadElement); // 下载完成移除元素
    URL.revokeObjectURL(href); // 释放掉blob对象
}

export { createBlob }