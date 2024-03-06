import React from 'react';
import Container from '../container';
import UserMenu from './user-menu';

const Navbar = () => {
    return (
        <div className="w-full bg-white shadow-sm">
            <div className="border-b-[1px] py-4">
                <Container>
                    <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
                        <h4>Logo</h4>
                        <UserMenu />
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default Navbar;
