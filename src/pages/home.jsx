import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Col, Row, Typography } from 'antd'
import { LockOutlined, LinkOutlined, MoneyCollectOutlined } from '@ant-design/icons'
import '../styling/home.css'

function Home() {
    const linkpages = [
        {
          link: '/pwgen',
          label: 'PW-Gen',
          desc: 'A Damn simple password generator',
          image: <LockOutlined />
        },
        {
          link: '/urlshortener',
          label: 'Short URL',
          desc: 'Shortens your URL',
          image: <LinkOutlined />
        },
        // {
        //   link: '/currency',
        //   label: 'Currency Converter',
        //   desc: 'Check the exchange rate',
        //   image: <MoneyCollectOutlined />
        // },
      ]

    return (
    <>
    <Typography.Title level={2} style={{textAlign:'center'}}>AllTool - All in One Web/App Tools You Need</Typography.Title>
    <Row gutter={[16,16]}>
    {linkpages.map(item => {
      return (
        <>
          <Col xs={12} md={8} xl={6}>
            <Link to={item.link}>
              <Card title={<>{item.image}{item.label}</>} className='card'>
                <p className='description'>{item.desc}</p>
                <Typography.Title className='icons'>{item.image}</Typography.Title>
              </Card>
            </Link>
          </Col>
        </>
      )
    })}
    </Row>
    </>
    )
}

export default Home