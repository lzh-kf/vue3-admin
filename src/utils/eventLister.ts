
interface Callback {
    (...args: Array<any>): void;
}

interface Handler {
    [key: string]: Array<Callback>;
}

const handle: Handler = {}

class EventLister {

    resgiterEvent(eventName: string, callback: Callback) {
        const item = handle[eventName]
        if (item) {
            item.push(callback)
        } else {
            handle[eventName] = [callback]
        }
    }

    emit(eventName: string, ...args: Array<any>) {
        // 确保所有的同步注册事件已经完毕
        Promise.resolve().then(() => {
            const item = handle[eventName]
            item && item.forEach(callback => callback(args))
        })
    }

    unResgiterEvent(eventName: string) {
        if (handle[eventName]) {
            delete handle[eventName]
        }
    }
}

export default EventLister