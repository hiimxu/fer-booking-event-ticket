import React from 'react';

const MenuItem = ({ label, onClick }) => {
    return (
        <div
            className="select-none px-4 py-3 font-semibold transition hover:bg-neutral-100"
            onClick={onClick}
        >
            {label}
        </div>
    );
};

export default MenuItem;
