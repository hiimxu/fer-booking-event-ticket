import React, { useState, useCallback, useEffect, useRef } from 'react';
import Avatar from '../Avatar';
import { MenuOutlined } from '@ant-design/icons';
import MenuItem from './menu-item';
import useRegisterModal from '~/hooks/useRegisterModal';

const currentUser = false;

const UserMenu = () => {
    const menuRef = useRef(null);

    const { onOpen: onOpenRegisterModal } = useRegisterModal();

    const [isOpen, setIsOpen] = useState(false);

    const handleClickOutSide = (e) => {
        if (!menuRef.current?.contains(e.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutSide);

        return () => {
            document.removeEventListener('click', handleClickOutSide);
        };
    }, [menuRef]);

    const toggleOpen = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    return (
        <div className="relative" ref={menuRef}>
            <div className="flex items-center gap-3">
                <div
                    className="flex cursor-pointer select-none items-center gap-3 rounded-full border-[1px] border-neutral-200 p-4 transition hover:shadow-md md:px-2 md:py-1"
                    onClick={toggleOpen}
                >
                    <MenuOutlined />
                    <div className="hidden md:block">
                        <Avatar />
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="absolute right-0 top-12 w-[40vw] overflow-hidden rounded-xl bg-white text-sm shadow-md md:w-[225px]">
                    <div className="flex cursor-pointer flex-col">
                        {currentUser ? (
                            <>
                                <MenuItem
                                    label="Logout"
                                    onClick={() => signOut()}
                                />
                            </>
                        ) : (
                            <>
                                <MenuItem label="Login" onClick={() => {}} />
                                <MenuItem
                                    label="Sign up"
                                    onClick={() => {
                                        onOpenRegisterModal();
                                        setIsOpen(false);
                                    }}
                                />
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserMenu;
