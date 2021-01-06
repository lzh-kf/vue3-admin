interface Type {
  [key: number]: Storage;
}

interface StorageData {
  [key: string]: any;
}

const map: Type = {
  0: localStorage,
  1: sessionStorage
};

const getValue = (key: string, type: number): unknown | undefined => {
  const value = map[type][key];
  return value ? JSON.parse(value) : undefined;
};

const setValue =<T> (key: string, value: T, type: number): boolean => {
  // 如果需要删除 则直接设置值为undefined即可
  if (undefined === value) {
    map[type].removeItem(key);
  } else {
    map[type][key] = JSON.stringify(value)
  }
  return true;
};

const getProxy = (type: number, StorageData: StorageData) => {
  return new Proxy(StorageData, {
    get(target: StorageData, key: string) {
      return getValue(key, type);
    },
    set(target: StorageData, key: string, value: unknown) {
      return setValue(key, value, type);
    }
  }
  );
};

// Storage工具类
const [setLocal, setSession]: Array<StorageData> = [getProxy(0, {}), getProxy(1, {})];

export { setLocal, setSession };
