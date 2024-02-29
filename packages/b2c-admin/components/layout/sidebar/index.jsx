import React, { useEffect, useState } from 'react';
import {
    CalendarOutlined,
    AreaChartOutlined,
    ContainerOutlined,
    CheckSquareOutlined,
    UserOutlined,
    SolutionOutlined,
} from '@ant-design/icons';

import { Menu } from 'antd';
import { getWindowDimensions } from 'common/lib/getWindowDimensions';
import Link from 'next/link';
import { cn } from 'common/lib/utils';
import { useRouter } from 'next/router';

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const items = [
    getItem(
        'Events',
        '/',
        <Link href={'/'}>
            <CalendarOutlined />
        </Link>
    ),
    getItem(
        'Tickets',
        '/tickets',
        <Link href={'/tickets'}>
            <ContainerOutlined />
        </Link>
    ),
    getItem(
        'Booking',
        '/booking',
        <Link href={'/'}>
            <CheckSquareOutlined />
        </Link>
    ),
    getItem(
        'Users',
        '/users',
        <Link href={'/'}>
            <UserOutlined />
        </Link>
    ),
    getItem(
        'Reporting and Analysis',
        '/report',
        <Link href={'/'}>
            <AreaChartOutlined />
        </Link>
    ),
    getItem(
        'Promotion ',
        '/promotion',
        <Link href={'/'}>
            <SolutionOutlined />
        </Link>
    ),
];

const Sidebar = () => {
    const router = useRouter();
    const [current, setCurrent] = useState(router.pathname);
    useEffect(() => {
        setCurrent(router.pathname);
    }, [router.pathname]);

    const [windowDimensions, setWindowDimensions] = useState(
        getWindowDimensions()
    );

    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (windowDimensions.width <= 960) {
            setCollapsed(true);
        } else {
            setCollapsed(false);
        }
    }, [windowDimensions]);

    return (
        <div className={cn('shadow-sm', !collapsed ? 'w-60' : '')}>
            <Menu
                style={{
                    height: 'calc(100vh - 56px)',
                }}
                mode="inline"
                inlineCollapsed={collapsed}
                items={items}
                selectedKeys={false}
            />
        </div>
    );
};

export default Sidebar;
