import React from 'react';
import { Button, Spin, Table, Space, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useQuery } from 'common/hooks/useQuery';

const AdminList = () => {
    const { data, isLoading } = useQuery('admin');
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            render: (_, { role }) => (
                <>
                    <Tag color="green">{role?.toUpperCase()}</Tag>
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button>Edit</Button>
                    <Button>Delete</Button>
                </Space>
            ),
        },
    ];

    return (
        <Spin spinning={isLoading}>
            <div className="flex justify-end">
                <Button icon={<PlusOutlined />} type="primary">
                    Create
                </Button>
            </div>
            <div className="mt-5">
                <Table
                    pagination={{ pageSize: 5 }}
                    columns={columns}
                    dataSource={data}
                />
            </div>
        </Spin>
    );
};

export default AdminList;
