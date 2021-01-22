
interface State {
    permissions: Array<string>;
    menus: Array<{
        [key: string]: any;
    }>;
    user: {
        [key: string]: any;
    };
    routeNames: Array<string>;
    menuNames: Array<{
        [key: string]: any;
    }>;
}

interface Mutations {
    [key: string]: {
        (state: State, data: any): void;
    };
}

interface Store {
    state: State;
    mutations: Mutations;
}

export default Store