import React, { useEffect, useRef, useState } from 'react';
import { Button, Modal, Form, Input, Spin, Radio, Select } from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import { useMutation } from 'common/hooks/useMutation';
import { toast } from 'react-toastify';
import { useQuery } from 'common/hooks/useQuery';
import { STATUS_BOOKING } from 'common/constant/constant';

const BookingForm = ({ bookingId, successCallback, label, title }) => {
    const formRef = useRef(null);
    const [form] = Form.useForm();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        isLoading: getLoading,
        data: bookingData,
        reload,
    } = useQuery(`booking/${bookingId}`, { bookingId, isModalOpen });

    const [trigger, { isLoading, data }] = useMutation();

    useEffect(() => {
        if (isModalOpen) {
            reload();
        }
    }, [isModalOpen]);

    useEffect(() => {
        form.setFieldsValue(bookingData);
    }, [bookingData]);

    useEffect(() => {
        if (data) {
            toast.success('Update booking successfully!');
            setIsModalOpen(false);
            setTimeout(() => {
                successCallback?.();
            });
        }
    }, [data]);

    const showModal = () => {
        form.resetFields();
        setIsModalOpen(true);
    };

    const handleOk = () => {
        formRef.current?.submit();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish = (values) => {
        console.log(values);
        if (bookingId) {
            trigger('PUT', `booking/${bookingId}`, values);
        }
    };

    return (
        <>
            <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={showModal}
                shape={'circle'}
            >
                {label}
            </Button>
            <Modal
                title={title}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okButtonProps={{ loading: isLoading || getLoading }}
                cancelButtonProps={{ disabled: isLoading || getLoading }}
                centered
            >
                <Spin spinning={getLoading}>
                    <Form
                        layout="vertical"
                        ref={formRef}
                        onFinish={onFinish}
                        autoComplete="off"
                        disabled={isLoading}
                        form={form}
                    >
                        <Form.Item
                            label="event id"
                            name="event_id"
                            className="hidden"
                        >
                            <Input disabled={true} />
                        </Form.Item>
                        <Form.Item
                            label="ticket_id"
                            name="ticket_id"
                            className="hidden"
                        >
                            <Input disabled={true} />
                        </Form.Item>
                        <Form.Item
                            label="user_id"
                            name="user_id"
                            className="hidden"
                        >
                            <Input disabled={true} />
                        </Form.Item>
                        <Form.Item
                            label="Booking id"
                            name="id"
                            className="hidden"
                        >
                            <Input disabled={true} />
                        </Form.Item>
                        <Form.Item
                            label="createAt"
                            name="createAt"
                            className="hidden"
                        >
                            <Input disabled={true} />
                        </Form.Item>
                        <Form.Item
                            className="w-40"
                            label="Booking status"
                            name="status"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input booking status!',
                                },
                            ]}
                        >
                            <Select>
                                {STATUS_BOOKING?.map((item) => (
                                    <Select.Option key={item} value={item}>
                                        {item}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item hidden>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Spin>
            </Modal>
        </>
    );
};

export default BookingForm;
