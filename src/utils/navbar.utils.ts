import {INavbarItem} from "@/components";

// TODO use enum
export const NAVBAR_ITEMS: INavbarItem[] = [
    {
        label: 'Home',
        value: '/',
    },
    {
        label: 'Login',
        value: '/login',
    },
    {
        label: 'Register',
        value: '/register',
    },
];

export const NAVBAR_ITEMS_LOGGED: INavbarItem[] = [
    {
        label: 'Home',
        value: '/',
    },
    {
        label: 'Logout',
        value: 'logout',
    },
];