import {useEffect, useState} from 'react';
import {me} from "@/services";
import {useAppDispatch} from "@/store/store";
import {setUserAction} from "@/store/slices/userSlice";

export function useToken() {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const dispatch = useAppDispatch();

    const saveToken = (token: string) => {
        localStorage.setItem('token', token);
        setToken(token);
    };

    const getToken = () => {
        return localStorage.getItem('token');
    }

    useEffect(() => {
        if (token) {
            me(token)
                .then((res) => {
                    dispatch(setUserAction({id: res.id}));
                })
                .catch((err) => console.error(err));
        }
    }, [token]);

    return {
        setToken: saveToken,
        token: getToken(),
    }
}