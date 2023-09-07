import React, { useState, useEffect } from "react";
import { InputNumber, Typography, Spin, Button, Card, Space, Divider } from "antd";
import { HomeOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

function DiscountedPrice() {
    const navigate = useNavigate()
    const [price, setPrice] = useState(500000);
    const [discount, setDiscount] = useState(50);
    const [finalPrice, setFinalPrice] = useState('')

    function calculate() {
        const count = (price * discount) / 100
        setFinalPrice((price-count).toLocaleString())
    }

    useEffect(() => {
        calculate();
    }, [price, discount]);

    return (
        <div className="centerized">
            <Button className="back" onClick={() => navigate(-1)}><HomeOutlined />Home</Button>
            <Card title={<><Typography.Title level={4}>Discounted Price</Typography.Title><Typography>Calculate price after discount</Typography></>} className="card-app">
                <Space direction="vertical" className="full-width">
                        <Typography.Text>Price</Typography.Text>
                        <InputNumber
                            placeholder="Input price"
                            value={price}
                            onChange={(value) => setPrice(value)}
                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                            size="large"
                            className="full-width"
                        />
                        <Typography.Text>Discount Value</Typography.Text>
                        <InputNumber
                            placeholder="Input discount value"
                            value={discount}
                            onChange={(value) => setDiscount(value)}
                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                            size="large"
                            status={discount > 100 ? "warning" : ''}
                            className="full-width"
                            suffix={"%"}
                        />
                </Space>
                <Divider>Final Price</Divider>
                <Typography.Title level={5} className="b">
                    {finalPrice}
                </Typography.Title>
            </Card>
        </div>
    );
}

export default DiscountedPrice;
