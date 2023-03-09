import {useState} from 'react';

export function useToken() {
    const [token, setToken] = useState(localStorage.getItem('token'));

    const saveToken = (token: string) => {
        localStorage.setItem('token', token);
        setToken(token);
    };

    const getToken = () => {
        return localStorage.getItem('token');
    }

    return {
        setToken: saveToken,
        token: getToken(),
    }
}