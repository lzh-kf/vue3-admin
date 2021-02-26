
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

interface HandleFn {
    <T>(store: T): void | any
}

interface Store {
    state: State;
    mutations: Mutations;
    // plugins: Array<HandleFn>
}

export default Store