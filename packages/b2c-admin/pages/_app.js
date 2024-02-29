import '~/styles/globals.css';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import DefaultLayout from '~/components/layout/default-layout';

function defaultLayout(page) {
    return <DefaultLayout>{page}</DefaultLayout>;
}

export default function App({ Component, pageProps }) {
    const getLayout = Component.getLayout || defaultLayout;

    return (
        <>
            <ToastContainer />
            {getLayout(<Component {...pageProps} />)}
        </>
    );
}
