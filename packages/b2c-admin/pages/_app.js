import '~/styles/globals.css';
import { useRouter } from 'next/router';

import DefaultLayout from '~/components/layout/default-layout';

function defaultLayout(page) {
    return <DefaultLayout>{page}</DefaultLayout>;
}

export default function App({ Component, pageProps }) {
    const getLayout = Component.getLayout || defaultLayout;

    return getLayout(<Component {...pageProps} />);
}
