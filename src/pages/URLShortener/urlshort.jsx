import React, { useState } from 'react';
import { Button, Card, Input, Image, Typography, Spin, Space } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';


function URLShort() {
  const [url, setUrl] = useState('');
  const [short, setShort] = useState('');
  const [showURL, setShowURL] = useState(false)

  const [loading, setLoading] = useState(false)

  const API = import.meta.env.VITE_URL_URL_SHORTENER

  function sendApi() {
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
      <Link to="/">
        <Button className='back'><HomeOutlined />Home</Button>
      </Link>

      <Card title={<><Typography.Title level={4}>URL Shortener</Typography.Title><Typography>Shortening URL for aesthetic look</Typography></>} style={{ width: 350}}>
        <Input placeholder="https://google.com/the-long-parameter" onChange={handleInputChange} className='input' onPressEnter={sendApi} />

        <Button className="main-action" type='primary' onClick={sendApi} block size='large'>
          Shorten the URL
        </Button>

        {showURL &&
        <>
        <Typography.Text>Your short URL is: </Typography.Text>
        <Button size='large' onClick={copyPassword} block>
          {loading ? <Spin /> : short}
        </Button>
        </>
        }
      </Card>
      </div>
    </>
  );
}

export default URLShort;
