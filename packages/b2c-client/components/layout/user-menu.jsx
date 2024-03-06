import React from 'react';
import Avatar from '../Avatar';
import { MenuOutlined } from '@ant-design/icons';

const UserMenu = () => {
    return (
        <div className="relative">
            <div className="flex items-center gap-3">
                <div
                    className="flex cursor-pointer items-center gap-3 rounded-full border-[1px] border-neutral-200 p-4 transition hover:shadow-md md:px-2 md:py-1"
                    onClick={() => {}}
                >
                    <MenuOutlined />
                    <div className="hidden md:block">
                        <Avatar />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserMenu;
