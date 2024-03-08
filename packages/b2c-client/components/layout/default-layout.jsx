import React from 'react';
import Navbar from './navbar';

const DefaultLayout = ({ children }) => {
    return (
        <main className="min-w-[1200px]">
            <Navbar />
            <div>{children}</div>
        </main>
    );
};

export default DefaultLayout;
