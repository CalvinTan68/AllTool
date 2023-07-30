import React, { useState } from 'react'
import '../styling/urlcheck.css'
import { Button, Checkbox, Typography } from 'antd';
import { HomeOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom';

function URLCheck() {
  return (
    <>
    <Link to='/'>
      <Button type='text' className='back-home'><HomeOutlined /> Home</Button>
    </Link>

    <div className='container'>
        <h1>urlcheck</h1>
    </div>
    </>
  );
}

export default URLCheck;