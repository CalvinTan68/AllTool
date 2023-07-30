import React, { useState } from 'react';
import '../styling/urlshort.css';
import { Button, Input, Typography, Spin } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';


function URLShort() {
  const [url, setUrl] = useState('');
  const [short, setShort] = useState('');
  const [showURL, setShowURL] = useState(false)

  const [loading, setLoading] = useState(false)
  
  const API = import.meta.env.VITE_URL_SHORT_URL;
  const APIKey = import.meta.env.VITE_URL_SHORT_API_KEY

  const headers = {
    'Authorization': 'Bearer ' + APIKey,
  };
  const body = {
    "long_url": url,
  }

  function sendApi() {
    setLoading(true)
    setShowURL(true)
    axios.post(API, body, {headers})
      .then((response) => {
        setLoading(false)
        const link = response.data.link;
        setShort(link);

      })
      .catch((error) => {
        setLoading(false)
        console.error('Error fetching API/URL');
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
      <Link to='/'>
        <Button type='text' className='back-home'>
          <HomeOutlined /> Home
        </Button>
      </Link>

      <div className='container'>
        <Typography.Title className='title'>Short URL</Typography.Title>
        <Typography.Title level={5} className='title'>
          This will shorten your URL/Links
        </Typography.Title>

        <Input size='large' placeholder="https://google.com" onChange={handleInputChange} className='input' onPressEnter={sendApi} />

        <Button className='generate' type='primary' onClick={sendApi}>
          Shorten URL
        </Button>

        {showURL &&
        <>
        <Typography.Text>Your short URL is: </Typography.Text>
        <Button size='large' className='shorted' type='primary' onClick={copyPassword}>
          {loading ? <Spin /> : short}
        </Button>
        </>
        }
      </div>
    </>
  );
}

export default URLShort;
