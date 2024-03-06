import Image from 'next/image';
import React from 'react';

const Avatar = ({ src }) => {
    return (
        <Image
            src={src || '/images/placeholder.jpg'}
            alt="avatar"
            className="rounded-full"
            height={30}
            width={30}
        />
    );
};

export default Avatar;
