import React from 'react';

const MyPageHeader = ({ title }) => {
    return (
        <div className="mb-8 border-b-2 border-b-slate-700 pb-8 text-xl font-bold">
            {title}
        </div>
    );
};

export default MyPageHeader;
