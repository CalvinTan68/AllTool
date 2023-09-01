import React, { useState, useEffect } from "react";
import { Select, InputNumber, Typography, Spin, Button, Card, Space, Divider } from "antd";
import { HomeOutlined } from '@ant-design/icons';
import { data } from './currencies';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function CurrencyConverter() {
    const navigate = useNavigate()
    const { Option } = Select;
    const [baseCurrency, setBaseCurrency] = useState('MYR');
    const [targetCurrency, setTargetCurrency] = useState('IDR');
    const [baseValue, setBaseValue] = useState(1);
    const [targetValue, setTargetValue] = useState('');
    const [loading, setLoading] = useState(false);

    const API = import.meta.env.VITE_URL_CURRENCY_CONVERTER;

    function convert() {
        setLoading(true);
        axios.get(`${API}${baseCurrency}`+`/${targetCurrency}`)
            .then((res) => {
                console.log(res)
                const currency = res.data.conversion_rate;
                const calculatedValue = (parseFloat(baseValue) * currency).toFixed(2);
                setTargetValue(calculatedValue);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.error("API Error!", error);
            });
    }

    useEffect(() => {
        convert();
    }, []);

    return (
        <div className="centerized">
            <Button className="back" onClick={() => navigate(-1)}><HomeOutlined />Home</Button>
            <Card title={<><Typography.Title level={4}>Currency Converter</Typography.Title><Typography>Realtime currency converter</Typography></>} style={{ width: 350}}>
                <Space direction="vertical">
                        <Typography.Text>Currency Value</Typography.Text>
                        <InputNumber
                            placeholder="Input base currency"
                            value={baseValue}
                            style={{width:300}}
                            onChange={(value) => setBaseValue(value)}
                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                            addonBefore={baseCurrency}
                            onPressEnter={convert}
                        />
                        <Typography.Text>Base Currency</Typography.Text>
                        <Select
                            showSearch
                            style={{width:300}}
                            placeholder="Select base currency"
                            value={baseCurrency}
                            onChange={(value) => setBaseCurrency(value)}
                        >
                            {data.map((currency) => (
                                <Option key={currency.number} value={currency.code}>
                                    {currency.code} - {currency.name}
                                </Option>
                            ))}
                        </Select>
                        <Typography.Text>Target Currency</Typography.Text>
                        <Select
                            showSearch
                            placeholder="Select target currency"
                            value={targetCurrency}
                            style={{width:300}}
                            onChange={(value) => setTargetCurrency(value)}
                        >
                            {data.map((currency) => (
                                <Option key={currency.number} value={currency.code}>
                                    {currency.code} - {currency.name}
                                </Option>
                            ))}
                        </Select>
                        <Button type='primary' size='large' className='main-action' onClick={convert} block>Convert</Button>
                </Space>
                <Divider>Value</Divider>
                <Typography.Title level={5} className="b">
                    {loading ? <Spin /> : (
                        <>
                            {targetCurrency} {parseFloat(targetValue).toLocaleString()}
                        </>
                    )}
                </Typography.Title>
            </Card>
        </div>
    );
}

export default CurrencyConverter;
