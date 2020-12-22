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


function findParentElement(data: Array<Menu>, parentId: number, tempdata: Array<Menu>,): Array<Result> {
    const result = [];
    const { length } = data;
    for (let i = 0; i < length; i++) {
        const item = data[i];
        if (item.menuId === parentId) {
            result.unshift({
                path: item.path,
                name: item.menuName,
                menuId: item.menuId,
                parentId: item.parentId
            });
            if (item.parentId !== 0) {
                result.unshift(...findParentElement(tempdata, item.parentId, tempdata));
            } else {
                break;
            }
        } else if (item.children && item.children.length) {
            result.unshift(...findParentElement(item.children, parentId, tempdata));
        }
    }
    return result;
}

export { findParentElement, Menu, Result };
