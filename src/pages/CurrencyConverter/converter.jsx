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
import { useEffect, useState } from "react";
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

    function convert() {
        setLoading(true);
        axios
            .get(
                `${VITE_CURRENCY_CONVERTER}/${baseCurrency}/${targetCurrency}/${baseValue}`
            )
            .then((res) => {
                setTargetValue(res.data.conversion_result);
                setLoading(false);
                messageApi.success("Value converted");
            })
            .catch((error) => {
                setLoading(false);
                console.error(error);
                messageApi.error("API Error / Data not specified");
            });
    }

    useEffect(() => {
        convert();
    }, [targetCurrency]);

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
                                {targetCurrency}{" "}
                                {parseFloat(targetValue).toLocaleString()}
                            </>
                        )}
                    </Typography.Title>
                </ContentCard>
            </div>
        </>
    );
}

export default CurrencyConverter;
