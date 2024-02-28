import React from 'react';
import Navbar from './navbar';
import Sidebar from './sidebar';

const DefaultLayout = ({ children }) => {
    return (
        <>
            <Navbar />
            <div className="flex">
                <Sidebar />
                <main>{children}</main>
            </div>
        </>
    );
};

export default DefaultLayout;
