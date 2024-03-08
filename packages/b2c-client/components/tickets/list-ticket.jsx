import React from 'react';
import TicketItem from './ticket-item';
import { useQuery } from 'common/hooks/useQuery';
import { Spin } from 'antd';
import { currencyFormatter } from 'common/lib/utils';

const ListTicket = ({ eventId }) => {
    const { data, isLoading } = useQuery(`eventTikets?event_id=${eventId}`, {
        id: eventId,
    });

    if (data?.length === 0) {
        return (
            <div className="flex h-32 items-center justify-center text-xl text-slate-500">
                This event has not yet opened for ticket sales!
            </div>
        );
    }

    return (
        <Spin spinning={isLoading}>
            <div className="grid grid-cols-3 gap-8 2xl:grid-cols-4 ">
                {data?.map((item) => (
                    <div className="col-span-1" key={item?.id}>
                        <TicketItem type={item?.type} area={item?.area}>
                            <div className="flex flex-col gap-1.5">
                                <div className="text-xl font-semibold text-slate-600">
                                    {currencyFormatter(item?.price)}
                                </div>
                                <div className="flex gap-2">
                                    <div className="font-semibold text-slate-500">
                                        {item?.name}
                                    </div>
                                    <div>-</div>
                                    <div className="text-slate-500">
                                        Area {item?.area}
                                    </div>
                                </div>
                                <div className="text-slate-500">
                                    <span className="text-sm">
                                        Number of tickets:{' '}
                                    </span>
                                    <span className="font-medium">
                                        {item?.quantity}
                                    </span>
                                </div>
                            </div>
                        </TicketItem>
                    </div>
                ))}
            </div>
        </Spin>
    );
};

export default ListTicket;
