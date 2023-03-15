import {INavbarItem} from "@/components";
import {ROUTE_PATHS} from "@/models";

export const NAVBAR_ITEMS: INavbarItem[] = [
    {
        label: 'Home',
        value: ROUTE_PATHS.HOME,
    },
    {
        label: 'Login',
        value: ROUTE_PATHS.LOGIN,
    },
    {
        label: 'Register',
        value: ROUTE_PATHS.REGISTER,
    },
];

export const NAVBAR_ITEMS_LOGGED: INavbarItem[] = [
    {
        label: 'Home',
        value: ROUTE_PATHS.HOME,
    },
    {
        label: 'Create Post',
        value: ROUTE_PATHS.CREATE_POST,
    },
    {
        label: 'Logout',
        value: ROUTE_PATHS.LOGOUT,
    },
];