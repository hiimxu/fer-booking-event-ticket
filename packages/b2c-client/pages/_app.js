import '~/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import 'swiper/css';
import 'swiper/css/navigation';
import { ToastContainer } from 'react-toastify';
import { Spin } from 'antd';
import { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import DefaultLayout from '~/components/layout/default-layout';
import RegisterModal from '~/components/modals/register-modal';
import LoginModal from '~/components/modals/login-modal';
import PaymentModal from '~/components/modals/payment-modal';

function defaultLayout(page) {
    return <DefaultLayout>{page}</DefaultLayout>;
}

export default function App({ Component, pageProps }) {
    const router = useRouter();
    const getLayout = Component.getLayout || defaultLayout;
    const [loading, setLoading] = useState(false);

    const loadingRef = useRef(undefined);

    useEffect(() => {
        const start = () => {
            if (loadingRef.current) {
                clearTimeout(loadingRef.current);
            }
            loadingRef.current = setTimeout(() => {
                setLoading(true);
            }, 200);
        };
        const end = () => {
            if (loadingRef.current) {
                clearTimeout(loadingRef.current);
            }
            setLoading(false);
        };
        router.events.on('routeChangeStart', start);
        router.events.on('routeChangeComplete', end);
        router.events.on('routeChangeError', end);
        window.addEventListener('showLoading', start);
        window.addEventListener('hideLoading', end);
        return () => {
            router.events.off('routeChangeStart', start);
            router.events.off('routeChangeComplete', end);
            router.events.off('routeChangeError', end);
            window.removeEventListener('showLoading', start);
            window.removeEventListener('hideLoading', end);
        };
    }, []);

    return (
        <Spin spinning={loading}>
            <ToastContainer />
            <RegisterModal />
            <LoginModal />
            <PaymentModal />
            {getLayout(<Component {...pageProps} />)}
        </Spin>
    );
}
