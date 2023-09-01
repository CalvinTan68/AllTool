import React, { useState } from 'react';
import { Button, Card, Input, Image, Typography, Spin, Space } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function LinkShort() {
  const navigate = useNavigate()
  const [url, setUrl] = useState('');
  const [short, setShort] = useState('');
  const [showURL, setShowURL] = useState(false)

  const [loading, setLoading] = useState(false)

  const API = import.meta.env.VITE_URL_URL_SHORTENER

  function shortenLink() {
    setLoading(true)
    setShowURL(true)
    axios.post(API + "?url=" + url)
      .then((response) => {
        setLoading(false)
        const link = response.data.result.full_short_link;
        setShort(link);
      })
      .catch((error) => {
        setLoading(false)
        setShort("No URL provided / API Error")
      });
  }
  function handleInputChange(event) {
    setUrl(event.target.value);
  }

  function copyPassword() {
    if (short) {
      navigator.clipboard.writeText(short);
      setShort('URL Copied!')

      setTimeout(() => {
        setShort(short);
      }, 1500);
    }
  }

  return (
    <>
      <div className="centerized">
      <Button className="back" onClick={() => navigate(-1)}><HomeOutlined />Home</Button>

      <Card title={<><Typography.Title level={4}>Link Shortener</Typography.Title><Typography>Shortening URL for aesthetic look</Typography></>} className='card-app'>
        <Space direction='vertical' className='full-width'>
        <Typography.Text>Input your link here</Typography.Text>
        <Input placeholder="https://google.com/the-long-parameter" onChange={handleInputChange} className="full-width" onPressEnter={shortenLink} size='large' />

        <Button className="main-action" type='primary' onClick={shortenLink} block size='large'>
          Shorten the link
        </Button>

        {showURL &&
        <>
        <Typography.Text>Your short URL is: </Typography.Text>
        <Button size='large' onClick={copyPassword} block>
          {loading ? <Spin /> : short}
        </Button>
        </>
        }
        </Space>
      </Card>
      </div>
    </>
  );
}

export default LinkShort;
