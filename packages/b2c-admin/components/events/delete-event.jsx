import React, { useEffect } from 'react';
import { Button, Tooltip } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useMutation } from 'common/hooks/useMutation';
import { toast } from 'react-toastify';

const DeleteEvent = ({ id, successCallback }) => {
    const [trigger, { data, isLoading, error }] = useMutation();

    useEffect(() => {
        if (data) {
            toast.success('Delete event successfully!');
            setTimeout(() => {
                successCallback?.();
            });
        }
    }, [data]);

    useEffect(() => {
        if (error) {
            toast.success('Delete event failed!');
        }
    }, [error]);

    const handleDeleteEvent = () => {
        trigger('DELETE', `events/${id}`);
    };

    return (
        <Tooltip title="Delete event" arrow={false} color="red">
            <Button
                loading={isLoading}
                danger
                onClick={handleDeleteEvent}
                icon={<DeleteOutlined />}
                shape="circle"
            />
        </Tooltip>
    );
};

export default DeleteEvent;
