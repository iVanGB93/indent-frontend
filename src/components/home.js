import React, { useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';

const MyModal = () => {
  const [visible, setVisible] = useState(false);

  const handleShowModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const onFinish = (values) => {
    console.log(values);
    setVisible(false);
  };

  return (
    <>
      <Button onClick={handleShowModal}>Open Modal</Button>
      <Modal
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form onFinish={onFinish}>
          <Form.Item label="Username" name="username">
            <Input />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default MyModal;
