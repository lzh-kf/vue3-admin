interface Data {
    queryParam: string;
}

interface MenuInfo {
    label: string;
    path: string;
}

interface Callback {
    <T>(result: T): T;
}

export { Data, MenuInfo, Callback }