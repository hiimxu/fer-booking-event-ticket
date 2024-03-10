import React from 'react';
import Container from '../container';
import MyPageSideBar from './my-page-side-bar';
import UserProfile from '../my-page/user-profile';

const MyPageLayout = ({ children }) => {
    return (
        <main className="min-w-[1200px]">
            <Container>
                <div className="grid grid-cols-9  gap-20 py-20">
                    <div className="col-span-2">
                        <MyPageSideBar />
                    </div>
                    <main className="col-span-7">
                        <UserProfile />
                        <div className="py-24">{children}</div>
                    </main>
                </div>
            </Container>
        </main>
    );
};

export default MyPageLayout;
