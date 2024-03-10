import React, { useEffect, useState, useRef } from 'react';
import { BellOutlined } from '@ant-design/icons';
import { useQuery } from 'common/hooks/useQuery';
import { useAuth } from 'common/hooks/useAuth';
import { ONE_MINUTE } from 'common/constant/constant';

const Notification = () => {
    const auth = useAuth('client');

    const { data, isLoading, reload } = useQuery(
        `notifications?user_id=${auth?.id}&status=NEW`,
        { user_id: auth?.id }
    );

    const notificationRef = useRef(null);

    const [isShowListNotification, setIsShowListNotification] = useState(false);

    useEffect(() => {
        //Fetch notification api 1 time per 1 minute
        const interval = setInterval(() => {
            reload();
        }, ONE_MINUTE);

        return () => clearInterval(interval);
    }, []);

    const handleClickOutSide = (e) => {
        if (!notificationRef.current?.contains(e.target)) {
            setIsShowListNotification(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutSide);

        return () => {
            document.removeEventListener('click', handleClickOutSide);
        };
    }, [notificationRef]);

    return (
        <div
            className="relative flex items-center justify-center"
            ref={notificationRef}
        >
            <div
                className="cursor-pointer"
                onClick={() => setIsShowListNotification((prev) => !prev)}
            >
                <BellOutlined className="text-xl text-slate-500" />
                {data?.length > 0 && (
                    <div className="absolute right-0 top-1 h-[6px] w-[6px] rounded-full bg-rose-600 text-7xl text-red-600" />
                )}
            </div>
            {isShowListNotification && (
                <div className="absolute -bottom-5 right-0 w-[300px] rounded-lg border border-[#d3dbd9] bg-white shadow-[0px_3px_6px_#11111126]">
                    {data?.map((item) => (
                        <div key={item?.id}>{item?.content}</div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Notification;
