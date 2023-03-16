export function useToken() {

    const saveToken = (token: string) => {
        localStorage.setItem('token', token);
    };

    const getToken = () => {
        return localStorage.getItem('token');
    }

    return {
        setToken: saveToken,
        token: getToken(),
    }
}