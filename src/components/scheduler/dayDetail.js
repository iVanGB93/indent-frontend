import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Table, Modal, Button, Select, Form, Slider, InputNumber, Row, Col, Input, message } from 'antd';

import axiosInstance from '../../axios';

export const DayDetail = (props) => {
  // messages //
  const [messageApi, contextHolder] = message.useMessage();
  const showMessage = (type, message) => {
    messageApi.open({
      type: type,
      content: message,
    });
  };
  // appoinments //
  const [appointments, setAppoinments] = useState(null)
  useEffect(() => {
    getAppointments();
  }, []);
  const getAppointments = async () => {
    await axiosInstance
      .get(`scheduler/${props.year}/${props.month}/${props.day}/`)
      .then(function(response) {
        setAppoinments(response.data);
      })
      .catch(function(error) {
        console.log("error from request", error);
      });
  };  
  const columns = [
    {
      title: 'Time',
      dataIndex: 'time',
      width: 80,
    },
    {
      title: 'Room 1',
      dataIndex: 'room1',
      width: 300,
    },
    {
      title: 'Room 2',
      dataIndex: 'room2',
      width: 300,
    },
    {
      title: 'Room 3',
      dataIndex: 'room3',
      width: 300,
    },
  ];
  const generateData = () => {
    const data = [];
    for (let i = 7; i <= 20; i++) {
      data.push({
        key: i,
        time: `${i}:00`,
        room1: '',
        room2: '',
        room3: '',
      });
    }
    //data[1].room1 = appointments[0].patient + appointments[0].topic;
    return data;
  };
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const handleCellClick = (date, room) => {
    setSelectedDate(date);
    setSelectedRoom(room);
    setModalVisible(true);
  };
  const data = generateData().map((item) => ({
    ...item,
    room1: (
      <Button type="link" onClick={() => handleCellClick(item.time, 'Room1')}>
        {item.room1}
      </Button>
    ),
    room2: (
      <Button type="link" onClick={() => handleCellClick(item.time, 'Room2')}>
        {item.room2}
      </Button>
    ),
    room3: (
      <Button type="link" onClick={() => handleCellClick(item.time, 'Room3')}>
        {item.room3}
      </Button>
    ),
  }));
  // modal //
  const [modalVisible, setModalVisible] = useState(false);
  const closeModal = () => {
    setModalVisible(false);
  };
  // form //
  const [ patients, setPatients] = useState([]);
  useEffect(() => {
    getNames('patients');
  }, []);
  const getNames = async (list) => {
    await axiosInstance
      .get(`scheduler/names/${list}/`)
      .then(function(response) {
        if (list==='patients'){
          setPatients(response.data);
        } else if (list ==='providers') {
          setProviders(response.data);
        }
      })
      .catch(function(error) {
        console.log("error from request", error);
      });
  };
  const onChangeProcedure = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearchProcedure = (value) => {
    console.log('search:', value);
  };
  const [ providers, setProviders] = useState([]);
  useEffect(() => {
    getNames('providers');
  }, []);
  const [durationValue, setdurationValue] = useState(15);
  const onChangeDuration = (newValue) => {
    setdurationValue(newValue);
  };
  const onFinish = (values) => {
    let duration = 0
    if (durationValue % 5 === 0) {
      duration = durationValue
    } else {
      duration = Math.round(durationValue / 5) * 5;
    }
    axiosInstance
      .post(`scheduler/${props.year}/${props.month}/${props.day}/`, {
        year: props.year,
        month: props.month,
        day: props.day,
        time: selectedDate,
        patient: values.patient,
        provider: values.provider,
        topic: values.topic,
        comment: values.comment ? values.comment : '',
        duration: duration
      })
      .then(function(res) {
        if (res.status === 200) {
          showMessage('success', 'Appoinment saved');
          closeModal();
        }
      })
      .catch(function(error) {
        if (error.response.status === 404) {
          showMessage('error', error.response.data.message);
        } else {
          console.log("error from post", error);
        }
      });
  }

  return (
    <>
      {contextHolder}
      <Table columns={columns} dataSource={data} pagination={false} />
      <Modal
        title={`Add appointment for ${selectedRoom} at ${selectedDate}`}
        open={modalVisible}
        footer={null}
      >
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          >
          <Form.Item label='Select Patient' name='patient' rules={[{ required: true, message: 'Please select a patient!'}]}>
            <Select
              showSearch
              placeholder="Select a Patient"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={patients.map((item) => ({
                value: item.username,
                label: item.username,
              }))}
              />
          </Form.Item>
          <Form.Item label='Select Procedure' name='topic' rules={[{ required: true, message: 'Please select a procedure!'}]}>
            <Select
              showSearch
              placeholder="Select Procedure"
              optionFilterProp="children"
              onChange={onChangeProcedure}
              onSearch={onSearchProcedure}
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={[
                {
                  value: 'Filling',
                  label: 'Filling',
                },
                {
                  value: 'RCT',
                  label: 'Root Canal Treatment',
                },
                {
                  value: 'Crown Prep',
                  label: 'Crown Prep',
                },
              ]}
            />
          </Form.Item>
          <Form.Item label='Select Duration' name='duration'>
            <Row>
              <Col span={16}>
                <Slider
                  min={5}
                  max={150}
                  step={5}
                  onChange={onChangeDuration}
                  value={typeof durationValue === 'number' ? durationValue : 5}
                />
              </Col>
              <Col span={4}>
                <InputNumber
                  min={5}
                  max={150}
                  step={5}
                  style={{
                    margin: '0 16px',
                  }}
                  value={durationValue}
                  onChange={onChangeDuration}
                />
              </Col>
            </Row>
          </Form.Item>
          <Form.Item label='Comment' name='comment'>
            <Input placeholder="any detail..." />
          </Form.Item>
          <Form.Item label='Select Provider' name='provider' rules={[{ required: true, message: 'Please select a provider!'}]}>
            <Select
              showSearch
              placeholder="Select a Provider"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={providers.map((item) => ({
                value: item.username,
                label: item.username,
              }))}
            />
          </Form.Item>
          <Form.Item wrapperCol={{offset: 14,span: 10}}>
            <Button style={{margin: '5px'}} type="primary" htmlType="submit">
              Submit
            </Button>
            <Button onClick={closeModal} style={{margin: '5px'}} type="dashed" danger>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

function mapStateToProps(state) {
    return {
      year: state.year,
      month: state.month,
      day: state.day
    };
}

export default connect(mapStateToProps)(DayDetail);