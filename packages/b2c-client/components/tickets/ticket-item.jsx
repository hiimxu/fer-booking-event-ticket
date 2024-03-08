import React from 'react';

const TicketItem = ({ type, area, children, onClick }) => {
    return (
        <div
            className="flex h-[162px] w-full cursor-pointer rounded-lg border"
            onClick={onClick}
        >
            <div className="flex-1 px-3 py-4">{children}</div>
            <div className="relative flex h-[100%] items-center justify-center border-l-2 border-dashed px-6">
                <p className="uppercase">
                    {type === 0 ? 'V' : 'N'}-{area}
                </p>
                <div className="absolute -left-[12px] -top-1 z-10 h-[13px] w-[22px] rounded-b-full border-b bg-white" />
                <div className="absolute -bottom-1 -left-[12px] z-10 h-[13px] w-[22px] rounded-t-full border-t bg-white" />
            </div>
        </div>
    );
};

export default TicketItem;
