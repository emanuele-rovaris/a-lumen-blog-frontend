import {useState} from 'react';

export function useToken() {
    const [token, setToken] = useState(localStorage.getItem('token'));

    const saveToken = (token: string) => {
        localStorage.setItem('token', token);
        setToken(token);
    };

    return {
        setToken: saveToken,
        token
    }
}