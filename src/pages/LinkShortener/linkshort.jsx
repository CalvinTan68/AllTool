import { LoadingOutlined } from "@ant-design/icons";
import { Button, Input, Space, Spin, Typography, message } from "antd";
import axios from "axios";
import { useState } from "react";
import ContentCard from "../../components/contentCard";
import HomeButton from "../../components/homeButton";
import {
    VITE_URL_SHORTENER,
    VITE_URL_SHORTENER_BK,
    VITE_URL_SHORTENER_TOKEN,
} from "../../data/constants";

function LinkShort() {
    const [messageApi, contextHolder] = message.useMessage();
    const [url, setUrl] = useState("");
    const [short, setShort] = useState("");
    const [loading, setLoading] = useState(false);

    const body = {
        long_url: url,
    };
    const header = {
        Authorization: "Bearer " + VITE_URL_SHORTENER_TOKEN,
        "Content-Type": "application/json",
    };

    function shortenLink() {
        setLoading(true);
        setShort("");
        axios
            .post(VITE_URL_SHORTENER, body, { headers: header })
            .then((response) => {
                setLoading(false);
                const link = response.data.link;
                setShort(link);
                messageApi.success("Short URL generated");
            })
            .catch((error) => {
                console.error(error);
                axios
                    .post(VITE_URL_SHORTENER_BK + "?url=" + url)
                    .then((res) => {
                        setLoading(false);
                        const linkbk = res.data.result.full_short_link;
                        setShort(linkbk);
                    })
                    .catch((error) => {
                        console.error(error);
                        setLoading(false);
                        messageApi.error("No URL provided / API Error");
                    });
            });
    }
    function handleInputChange(event) {
        setUrl(event.target.value);
    }

    function copyPassword() {
        if (short) {
            navigator.clipboard.writeText(short);
            messageApi.success("Short URL copied");
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
                    title={"Link Shortener"}
                    description={"Shortening URL for aesthetic look"}
                >
                    <Space direction="vertical" className="full-width">
                        <Typography.Text>Input your link here</Typography.Text>
                        <Input
                            placeholder="https://google.com/the-long-parameter"
                            onChange={handleInputChange}
                            className="full-width"
                            onPressEnter={shortenLink}
                            size="large"
                        />

                        <Button
                            className="main-action"
                            type="primary"
                            onClick={shortenLink}
                            block
                            size="large"
                        >
                            Shorten the link
                        </Button>

                        {loading && (
                            <Typography>
                                <Spin indicator={loadingIcon} />
                            </Typography>
                        )}
                        {short && (
                            <>
                                <Typography.Text>
                                    Your short URL is:{" "}
                                </Typography.Text>
                                <Button
                                    size="large"
                                    onClick={copyPassword}
                                    block
                                >
                                    {short}
                                </Button>
                            </>
                        )}
                    </Space>
                </ContentCard>
            </div>
        </>
    );
}

export default LinkShort;
