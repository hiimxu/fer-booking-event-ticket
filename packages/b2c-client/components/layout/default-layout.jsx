import React from 'react';
import Navbar from './navbar';
import Footer from './footer';

const DefaultLayout = ({ children }) => {
    return (
        <main className="min-w-[1200px]">
            <Navbar />
            <div>{children}</div>
            <Footer />
        </main>
    );
};

export default DefaultLayout;
