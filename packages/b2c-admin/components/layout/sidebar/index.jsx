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
        '1',
        <Link href={'/events'}>
            <CalendarOutlined />
        </Link>
    ),
    getItem(
        'Tickets',
        '2',
        <Link href={'/'}>
            <ContainerOutlined />
        </Link>
    ),
    getItem(
        'Booking',
        '3',
        <Link href={'/'}>
            <CheckSquareOutlined />
        </Link>
    ),
    getItem(
        'Users',
        '4',
        <Link href={'/'}>
            <UserOutlined />
        </Link>
    ),
    getItem(
        'Reporting and Analysis',
        '5',
        <Link href={'/'}>
            <AreaChartOutlined />
        </Link>
    ),
    getItem(
        'Promotion ',
        '6',
        <Link href={'/'}>
            <SolutionOutlined />
        </Link>
    ),
];

const Sidebar = () => {
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
        console.log(windowDimensions);
        if (windowDimensions.width <= 960) {
            setCollapsed(true);
        } else {
            setCollapsed(false);
        }
    }, [windowDimensions]);

    return (
        <div className="w-60">
            <Menu
                style={{
                    height: 'calc(100vh - 56px)',
                }}
                mode="inline"
                defaultSelectedKeys={['1']}
                inlineCollapsed={collapsed}
                items={items}
            />
        </div>
    );
};

export default Sidebar;
