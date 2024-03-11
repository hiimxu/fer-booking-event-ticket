import { Button, Table, Spin } from 'antd';
import Link from 'next/link';
import { LeftOutlined } from '@ant-design/icons';
import { useMemo } from 'react';
import Container from '~/components/container';
import { useRouter } from 'next/router';
import { useQuery } from 'common/hooks/useQuery';
import { QUANLITY } from 'common/constant/constant';

const Tickets = () => {
    const { query } = useRouter();
    const { id } = query;
    const {
        data: listTicket,
        isLoading: ticketLoading,
        reload,
    } = useQuery(`comments?event_id=${id}`);

    const dataSource = useMemo(() => {
        return listTicket?.map((item) => {
            return {
                key: item?.id,
                quality: item?.quality,
                comment: item?.comment,
                createAt: item?.createAt,
            };
        });
    }, [listTicket, id]);

    const columns = [
        {
            title: 'quanlity',
            dataIndex: 'quality',
            key: 'quality',
            width: 100,
            filters: QUANLITY,
            onFilter: (value, record) => {
                return record.quality == value;
            },
        },
        {
            title: 'Comment',
            dataIndex: 'comment',
            key: 'comment',
        },
        {
            title: 'Create at',
            dataIndex: 'createAt',
            key: 'createAt',
            width: 200,
        },
    ];

    return (
        <Spin spinning={ticketLoading}>
            <Container>
                <div className="mb-2">
                    <Link href="/tickets">
                        <Button icon={<LeftOutlined />}>Back</Button>
                    </Link>
                </div>

                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">List Comment</h2>
                </div>
                <div className="mt-5">
                    <Table
                        pagination={{ pageSize: 5 }}
                        dataSource={dataSource}
                        columns={columns}
                    />
                </div>
            </Container>
        </Spin>
    );
};
export default Tickets;
