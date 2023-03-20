import {INavbarItem} from "@/components";
import {ROUTE_PATHS} from "@/models";
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

export const NAVBAR_ITEMS: INavbarItem[] = [
    {
        label: 'Home',
        value: ROUTE_PATHS.HOME,
    },
    {
        label: 'Login',
        value: ROUTE_PATHS.LOGIN,
        icon: <LoginIcon/>,
    },
    {
        label: 'Register',
        value: ROUTE_PATHS.REGISTER,
        icon: <PersonIcon/>,
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
        icon: <LogoutIcon/>,
    },
];