const request = (url: string, data: any) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open('post', url)
        xhr.setRequestHeader('Accept', 'application/json, text/plain, */*')
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
        xhr.send(JSON.stringify(data))
        xhr.addEventListener('load', (response) => {
            resolve(response)
        })
        xhr.addEventListener('error', (error) => {
            reject(error)
        });
        xhr.addEventListener('timeout', (error) => {
            reject(error)
        });
    })
}

export { request }