import React, { useEffect, useRef } from 'react';
import Modal from './modal';
import { Form, Input, Rate } from 'antd';
import { useMutation } from 'common/hooks/useMutation';
import dayjs from 'dayjs';
import { useAuth } from 'common/hooks/useAuth';
import { toast } from 'react-toastify';

const RateModal = ({ bookingData, isOpen, onClose }) => {
    const auth = useAuth('client');

    const formRef = useRef(null);

    const [createComment, { data, isLoading }] = useMutation();
    const [
        updateIsRate,
        { data: updateIsRateData, isLoading: updateIsRateLoading },
    ] = useMutation();

    useEffect(() => {
        if (data && updateIsRateData) {
            toast.success('Rate the event as successfully!');
            setTimeout(() => {
                onClose?.();
            }, 500);
        }
    }, [data, updateIsRateData]);

    const onSubmit = () => {
        formRef.current?.submit();
    };

    const onFinish = (values) => {
        const submitObj = {
            ...values,
            event_id: bookingData?.event_id,
            user_id: auth?.id,
            createAt: dayjs().format('DD/MM/YYYY HH:mm'),
            ticket_id: bookingData?.ticket_id,
        };
        console.log(submitObj);
        createComment('POST', `comments`, submitObj);
        updateIsRate('PATCH', `booking/${bookingData?.id}`, { isRate: true });
    };

    const bodyContent = (
        <Form
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
                quality: 5,
                comment: '',
            }}
            ref={formRef}
        >
            <Form.Item label="Quality" name="quality">
                <Rate />
            </Form.Item>
            <Form.Item label="Comment" name="comment">
                <Input.TextArea rows={4} />
            </Form.Item>

            <Form.Item hidden>
                <button type="submit">submit</button>
            </Form.Item>
        </Form>
    );
    return (
        <Modal
            actionLabel="Submit"
            body={bodyContent}
            isOpen={isOpen}
            onClose={onClose}
            title="Rate Event"
            onSubmit={onSubmit}
            disabled={updateIsRateLoading || isLoading}
        />
    );
};

export default RateModal;
