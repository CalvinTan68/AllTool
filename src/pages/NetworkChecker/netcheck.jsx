import React, { useEffect, useState } from 'react';
import { Button, Card, Typography, Spin, Space, Descriptions } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


function NetCheck() {
  const navigate = useNavigate()
  const [detail, setDetail] = useState({})

  const [loading, setLoading] = useState(false)

  const IPDetail = import.meta.env.VITE_URL_IP_DETAIL
  const IPDetailToken = import.meta.env.VITE_URL_IP_DETAIL_TOKEN

  function sendApi() {
    setLoading(true)
    axios.get(IPDetail + '?token=' + IPDetailToken)
    .then((res) => {
        setLoading(false)
        const ipdetail = res.data
        setDetail(ipdetail)
    })
    .catch((error) => {
        setLoading(false)
        console.error("API Error!")
    })
  }

  useEffect(() => {
    sendApi()
  },[])

  return (
    <>
      <div className="centerized">
      <Button className="back" onClick={() => navigate(-1)}><HomeOutlined />Home</Button>

      <Card title={<><Typography.Title level={4}>Network Checker</Typography.Title><Typography>Check your network information</Typography></>} className='card-app'>
      <Descriptions column={1} layout="vertical" className='network-data'>
        <Descriptions.Item label="IP Address">
            {loading ? <Spin /> : <><Typography.Text copyable>{detail.ip}</Typography.Text></>}
        </Descriptions.Item>
        <Descriptions.Item label="Provider">
            {loading ? <Spin /> : <><Typography.Text>{detail.org}</Typography.Text></>}
        </Descriptions.Item>
        <Descriptions.Item label="Country">
          {loading ? <Spin /> : <><Typography.Text>{detail.country}</Typography.Text></>}
        </Descriptions.Item>
        <Descriptions.Item label="Area">
          {loading ? <Spin /> : <><Typography.Text>{detail.city}, {detail.region}</Typography.Text></>}
        </Descriptions.Item>
        </Descriptions>
      <Button type='primary' size='large' className='main-action' onClick={sendApi} block>Refresh Data</Button>
      </Card>
      </div>
    </>
  );
}

export default NetCheck;
