import React, { useState, useEffect } from "react";
import {
  Select,
  InputNumber,
  Typography,
  Spin,
  Button,
  Card,
  Space,
  Divider,
  message,
} from "antd";
import { HomeOutlined, LoadingOutlined } from "@ant-design/icons";
import { data } from "../../data/currencies";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CurrencyConverter() {
  const navigate = useNavigate();
  const { Option } = Select;
  const [baseCurrency, setBaseCurrency] = useState("MYR");
  const [targetCurrency, setTargetCurrency] = useState("IDR");
  const [baseValue, setBaseValue] = useState(1);
  const [targetValue, setTargetValue] = useState("");
  const [loading, setLoading] = useState(false);

  const API = import.meta.env.VITE_CURRENCY_CONVERTER;

  function convert() {
    setLoading(true);
    axios
      .get(`${API}${baseCurrency}` + `/${targetCurrency}`)
      .then((res) => {
        const currency = res.data.conversion_rate;
        const calculatedValue = (parseFloat(baseValue) * currency).toFixed(2);
        setTargetValue(calculatedValue);
        setLoading(false);
        message.success("Value converted");
      })
      .catch((error) => {
        setLoading(false);
        message.error("API Error / Data not specified");
      });
  }

  useEffect(() => {
    convert();
  }, []);

  const loadingIcon = (
    <LoadingOutlined
      style={{
        fontSize: 22,
      }}
      spin
    />
  );

  return (
    <>
      <div className="centerized">
        <Button className="back" onClick={() => navigate(-1)}>
          <HomeOutlined />
          Home
        </Button>
        <Card
          title={
            <>
              <Typography.Title level={4}>Currency Converter</Typography.Title>
              <Typography>Realtime currency converter</Typography>
            </>
          }
          className="card-app"
        >
          <Space direction="vertical" className="full-width">
            <Typography.Text>Currency Value</Typography.Text>
            <InputNumber
              placeholder="Input base currency"
              value={baseValue}
              onChange={(value) => setBaseValue(value)}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              addonBefore={baseCurrency}
              onPressEnter={convert}
              size="large"
              className="full-width"
            />
            <Typography.Text>Base Currency</Typography.Text>
            <Select
              showSearch
              placeholder="Select base currency"
              value={baseCurrency}
              onChange={(value) => setBaseCurrency(value)}
              size="large"
              className="full-width"
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
              onChange={(value) => setTargetCurrency(value)}
              size="large"
              className="full-width"
            >
              {data
                .filter((currency) => currency.code !== baseCurrency)
                .map((currency) => (
                  <Option key={currency.number} value={currency.code}>
                    {currency.code} - {currency.name}
                  </Option>
                ))}
            </Select>
            <Button
              type="primary"
              size="large"
              className="main-action"
              onClick={convert}
              block
            >
              Convert
            </Button>
          </Space>
          <Divider>Value</Divider>
          <Typography.Title level={5} className="b">
            {loading ? (
              <Spin indicator={loadingIcon} />
            ) : (
              <>
                {targetCurrency} {parseFloat(targetValue).toLocaleString()}
              </>
            )}
          </Typography.Title>
        </Card>
      </div>
    </>
  );
}

export default CurrencyConverter;
