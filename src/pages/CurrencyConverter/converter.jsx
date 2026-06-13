import { LoadingOutlined } from "@ant-design/icons";
import {
    Button,
    Divider,
    InputNumber,
    Select,
    Space,
    Spin,
    Typography,
    message,
} from "antd";
import axios from "axios";
import { useState } from "react";
import ContentCard from "../../components/contentCard";
import HomeButton from "../../components/homeButton";
import { VITE_CURRENCY_CONVERTER } from "../../data/constants";
import currencies from "../../data/currencies.json";

function CurrencyConverter() {
    const [messageApi, contextHolder] = message.useMessage();
    const { Option } = Select;
    const [baseCurrency, setBaseCurrency] = useState("MYR");
    const [targetCurrency, setTargetCurrency] = useState("IDR");
    const [baseValue, setBaseValue] = useState(1);
    const [targetValue, setTargetValue] = useState("");
    const [loading, setLoading] = useState(false);

    async function convert() {
        if (!baseValue || baseValue <= 0) {
            messageApi.error("Please enter a valid amount");
            return;
        }

        setLoading(true);
        try {
            const res = await axios.get(
                `${VITE_CURRENCY_CONVERTER}/${baseCurrency}/${targetCurrency}/${baseValue}`
            );
            setTargetValue(res.data.conversion_result);
            messageApi.success("Value converted");
        } catch (error) {
            console.error(error);
            messageApi.error("API Error / Data not specified");
        } finally {
            setLoading(false);
        }
    }

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
            {contextHolder}
            <div className="centerized">
                <HomeButton />
                <ContentCard
                    title={"Currency Converter"}
                    description={"Realtime currency converter"}
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
                        />
                        <Typography.Text>Base Currency</Typography.Text>
                        <Select
                            showSearch
                            placeholder="Select base currency"
                            value={baseCurrency}
                            onChange={(value) => setBaseCurrency(value)}
                            size="large"
                            className="full-width"
                            filterOption={(inputValue, option) =>
                                option.children
                                    .join("")
                                    .toLowerCase()
                                    .includes(inputValue.toLowerCase())
                            }
                        >
                            {currencies.map((currency) => (
                                <Option
                                    key={currency.number}
                                    value={currency.code}
                                >
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
                            filterOption={(inputValue, option) =>
                                option.children
                                    .join("")
                                    .toLowerCase()
                                    .includes(inputValue.toLowerCase())
                            }
                        >
                            {currencies
                                .filter(
                                    (currency) => currency.code !== baseCurrency
                                )
                                .map((currency) => (
                                    <Option
                                        key={currency.number}
                                        value={currency.code}
                                    >
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
                            disabled={!baseValue || baseValue <= 0}
                        >
                            Convert
                        </Button>
                    </Space>
                    <Divider>Value</Divider>
                    <Typography.Title level={5} className="b">
                        {loading ? (
                            <Spin indicator={loadingIcon} />
                        ) : targetValue ? (
                            <>
                                {targetCurrency}{" "}
                                {parseFloat(targetValue).toLocaleString()}
                            </>
                        ) : (
                            "No conversion yet"
                        )}
                    </Typography.Title>
                </ContentCard>
            </div>
        </>
    );
}

export default CurrencyConverter;
