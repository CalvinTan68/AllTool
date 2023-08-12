import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, Col, Collapse, Row, Typography } from 'antd'
import { LockOutlined, LinkOutlined, WifiOutlined, DollarOutlined } from '@ant-design/icons'
import axios from 'axios'

function Home() {
    const linkpages = [
        {
          link: '/password-generator',
          label: 'Password Generator',
          image: <LockOutlined />
        },
        {
          link: '/url-shortener',
          label: 'URL Shortener',
          image: <LinkOutlined />
        },
        {
          link: '/network-checker',
          label: 'Network Checker',
          image: <WifiOutlined />
        },
        {
          link: '/currency-converter',
          label: 'Currency Converter',
          image: <DollarOutlined />
        },
      ]

    return (
    <>
    <div className="home">
    <Typography.Title level={2} style={{textAlign:'center'}}>AllTool - All in One Web/App Tools You Need</Typography.Title>
    <Row gutter={[16,16]}>
    {linkpages.map(item => {
      return (
        <>
          <Col xs={12} md={8} xl={6}>
            <Link to={item.link}>
              <Card hoverable={true} style={{backgroundColor:'transparent'}}>
                <Typography.Title level={2}>{item.image}</Typography.Title>
                <Typography.Title level={5}>{item.label}</Typography.Title>
              </Card>
            </Link>
          </Col>
        </>
      )
    })}
    </Row>
    </div>
    </>
    )
}

export default Home