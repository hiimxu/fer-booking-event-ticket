import { Button, Table, Space, Tooltip } from 'antd';
import Link from 'next/link';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const dataSource = [
    {
        key: '1',
        name: 'Mike',
        age: 32,
        address: '10 Downing Street',
    },
    {
        key: '2',
        name: 'John',
        age: 42,
        address: '10 Downing Street',
    },
];

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <Tooltip title="Edit event" color="#108ee9" arrow={false}>
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        shape="circle"
                    />
                </Tooltip>
                <Tooltip title="Delete event" arrow={false} color="red">
                    <Button danger icon={<DeleteOutlined />} shape="circle" />
                </Tooltip>
            </Space>
        ),
    },
];

export default function Home() {
    return (
        <main className="p-5 md:p-10">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Events Management</h2>
                <div>
                    <Link href="/events/create">
                        <Button type="primary" icon={<PlusOutlined />}>
                            Create
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="mt-5">
                <Table dataSource={dataSource} columns={columns} />;
            </div>
        </main>
    );
}
