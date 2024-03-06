import React from 'react';
import Navbar from './navbar';

const DefaultLayout = ({ children }) => {
    return (
        <>
            <Navbar />
            <div>{children}</div>
        </>
    );
};

export default DefaultLayout;
