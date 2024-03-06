import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

export const useAuth = () => {
    const [auth, setAuth] = useState();

    useEffect(() => {
        const authCookies = Cookies.get('accessToken');
        if (authCookies) {
            setAuth(JSON.parse(authCookies));
        }
    }, []);

    return auth;
};
