import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Col, Row, Typography } from 'antd'
import { pages } from '../../data/pages'

function Home() {
    return (
    <>
      <div className="home">
        <Typography.Title level={2} style={{textAlign:'center'}}>AllTool - All in One Web/App Tools You Need</Typography.Title>
        <Row gutter={[16,16]}>
        {pages.map(item => {
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