/* eslint-disable */
interface Callback {
    (...args: Array<any>): void;
}

interface Handler {
    [key: string]: Array<Callback>;
}

const handler: Handler = {}

class EventLister {

    resgiterEvent(eventName: string, callback: Callback) {
        const item = handler[eventName]
        if (item) {
            item.push(callback)
        } else {
            handler[eventName] = [callback]
        }
    }

    emit(eventName: string, ...args: Array<any>) {
        // 确保所有的同步注册事件已经完毕
        Promise.resolve().then(() => {
            const item = handler[eventName]
            item && item.forEach(callback => callback(args))
        })
    }

    unResgiterEvent(eventName: string) {
        if (handler[eventName]) {
            delete handler[eventName]
        }
    }
}

export default EventLister