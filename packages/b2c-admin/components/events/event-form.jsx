import React, { useState } from 'react';
import { Form, Input, Button, Select, Upload } from 'antd';
import { useVnApi } from 'common/hooks/vn-api';
import { useQuery } from 'common/hooks/useQuery';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';

const EventForm = () => {
    const { data } = useQuery('eventType');

    const [provinceSelected, setProvinceSelected] = useState(null);
    const [districtSelected, setDistrictSelected] = useState(null);
    const [listImage, setListImage] = useState([]);

    const { provinces, districts, wards } = useVnApi(
        provinceSelected,
        districtSelected
    );

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    const onFinish = (values) => {
        console.log(values);
    };

    return (
        <div>
            <Form layout="vertical" autoComplete="off" onFinish={onFinish}>
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
                    name="evenType"
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
                        name="province"
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
                        name="district"
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
                                console.log(selectedObject);
                                setDistrictSelected(selectedObject?.code);
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
                        name="ward"
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
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default EventForm;
