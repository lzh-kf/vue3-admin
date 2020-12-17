interface Child {
    name: string;
    path: string;
    menuName: string;
    menuId: number;
    parentId: number;
}

interface Menu {
    children?: Array<Child>;
    name: string;
    path: string;
    menuName: string;
    menuId: number;
    parentId: number;
}

interface Result {
    path: string;
    name: string;
    menuId: number;
    parentId: number;
}

interface Data {
    navs: Array<Menu>;
}

export { Data, Menu, Result }