import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, Upload } from 'antd';
import { useVnApi } from 'common/hooks/vn-api';
import { useQuery } from 'common/hooks/useQuery';
import { useMutation } from 'common/hooks/useMutation';
import { UploadOutlined } from '@ant-design/icons';
import { convertImageToBase64 } from 'common/lib/base64';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const EventForm = () => {
    const [form] = Form.useForm();
    const router = useRouter();

    const { data } = useQuery('eventType');
    const [trigger, { isLoading, data: createResData, error }] = useMutation();

    const [provinceSelected, setProvinceSelected] = useState(null);
    const [districtSelected, setDistrictSelected] = useState(null);
    const [listImage, setListImage] = useState([]);

    const { provinces, districts, wards } = useVnApi(
        provinceSelected,
        districtSelected
    );

    useEffect(() => {
        if (createResData) {
            toast.success('Create event successfully!');
            setTimeout(() => {
                router.push('/');
            }, 500);
        }
    }, [createResData]);

    useEffect(() => {
        if (error) {
            toast.error('Create event failed!');
        }
    }, [error]);

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    const onFinish = async (values) => {
        const submitObject = {
            ...values,
            image: await convertImageToBase64(
                values?.image?.[0]?.originFileObj
            ),
        };
        trigger('POST', 'events', submitObject);
    };

    return (
        <div>
            <Form
                form={form}
                layout="vertical"
                autoComplete="off"
                onFinish={onFinish}
                disabled={isLoading}
            >
                <Form.Item
                    label="Event name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input event name!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    className="w-40"
                    label="Event type"
                    name="evenTypeId"
                    rules={[
                        {
                            required: true,
                            message: 'Please input event type!',
                        },
                    ]}
                >
                    <Select>
                        {data?.map((item) => (
                            <Select.Option key={item?.id} value={item?.id}>
                                {item?.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <div className="flex gap-5">
                    <Form.Item
                        className="w-40"
                        label="Province"
                        name="provinceId"
                        rules={[
                            {
                                required: true,
                                message: 'Please input event province!',
                            },
                        ]}
                    >
                        <Select
                            onChange={(value) => {
                                const selectedObject = provinces?.find(
                                    (item) => item._id === value
                                );
                                setProvinceSelected(selectedObject?.code);
                                form.setFieldsValue({
                                    district: '',
                                    ward: '',
                                });
                            }}
                        >
                            {provinces?.map((item) => (
                                <Select.Option
                                    key={item?._id}
                                    value={item?._id}
                                >
                                    {item?.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="District"
                        name="districtId"
                        className="w-40"
                        rules={[
                            {
                                required: true,
                                message: 'Please input event district!',
                            },
                        ]}
                    >
                        <Select
                            onChange={(value) => {
                                const selectedObject = districts?.find(
                                    (item) => item._id === value
                                );
                                setDistrictSelected(selectedObject?.code);
                                form.setFieldsValue({
                                    ward: '',
                                });
                            }}
                        >
                            {districts?.map((item) => (
                                <Select.Option
                                    key={item?._id}
                                    value={item?._id}
                                >
                                    {item?.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Ward"
                        name="wardId"
                        className="w-40"
                        rules={[
                            {
                                required: true,
                                message: 'Please input event ward!',
                            },
                        ]}
                    >
                        <Select>
                            {wards?.map((item) => (
                                <Select.Option
                                    key={item?._id}
                                    value={item?._id}
                                >
                                    {item?.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </div>
                <Form.Item
                    label="Specific address"
                    name="address"
                    rules={[
                        {
                            required: true,
                            message: 'Please input event specific address!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: 'Please input event description!',
                        },
                    ]}
                >
                    <Input.TextArea rows={5} />
                </Form.Item>

                <Form.Item
                    name="image"
                    label="Image"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    rules={[
                        {
                            required: true,
                            message: 'Please input banner image!',
                        },
                    ]}
                >
                    <Upload
                        name="logo"
                        listType="picture"
                        onChange={(e) => {
                            setListImage(e?.fileList);
                        }}
                    >
                        <Button
                            icon={<UploadOutlined />}
                            disabled={listImage?.length > 0 ? true : false}
                        >
                            Click to upload
                        </Button>
                    </Upload>
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={isLoading}
                    >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default EventForm;
