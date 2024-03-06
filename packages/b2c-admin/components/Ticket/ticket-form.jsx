import React, { useEffect, useRef, useState } from 'react';
import { Button, Modal, Form, Input, Spin, Radio, InputNumber } from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import { useMutation } from 'common/hooks/useMutation';
import { toast } from 'react-toastify';
import { useQuery } from 'common/hooks/useQuery';

const TicketForm = ({ event_id, ticketId, successCallback, label, title }) => {
    const formRef = useRef(null);
    const [form] = Form.useForm();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        isLoading: getLoading,
        data: eventTypeData,
        reload,
    } = useQuery(`eventTikets/${ticketId}`, { ticketId, isModalOpen });
    const [trigger, { isLoading, data }] = useMutation();

    useEffect(() => {
        if (isModalOpen) {
            reload();
        }
    }, [isModalOpen]);

    useEffect(() => {
        form.setFieldsValue(eventTypeData);
    }, [eventTypeData]);

    useEffect(() => {
        if (data) {
            toast.success(
                ticketId
                    ? 'Update ticket type successfully!'
                    : 'Create ticket type successfully!'
            );
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
        if (ticketId) {
            trigger('PUT', `eventTikets/${ticketId}`, { ...values, event_id });
        } else {
            trigger('POST', 'eventTikets', { ...values, event_id });
        }
    };

    return (
        <>
            <Button
                type="primary"
                icon={ticketId ? <EditOutlined /> : <PlusOutlined />}
                onClick={showModal}
                shape={ticketId ? 'circle' : 'default'}
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
                            label="Ticket name"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your event name!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Ticket quantity"
                            name="quantity"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input ticket quantity!',
                                },
                            ]}
                        >
                            <InputNumber min={0} className="w-full" />
                        </Form.Item>
                        <Form.Item
                            label="Ticket type"
                            name="type"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input ticket type!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Ticket area"
                            name="area"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input ticket area!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Ticket price"
                            name="price"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input ticket price!',
                                },
                            ]}
                        >
                            <InputNumber min={0} className="w-full" />
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

export default TicketForm;
