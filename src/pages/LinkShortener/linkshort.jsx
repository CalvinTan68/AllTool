import React, { useState } from "react";
import {
  Button,
  Card,
  Input,
  Image,
  Typography,
  Spin,
  Space,
  message,
} from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LinkShort() {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [short, setShort] = useState("");
  const [showURL, setShowURL] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const [loading, setLoading] = useState(false);

  const API = import.meta.env.VITE_URL_SHORTENER;
  const API_TOKEN = import.meta.env.VITE_URL_SHORTENER_TOKEN;
  const body = {
    long_url: url,
  };
  const header = {
    Authorization: "Bearer " + API_TOKEN,
    "Content-Type": "application/json",
  };

  const APIBK = import.meta.env.VITE_URL_SHORTENER_BK;

  function shortenLink() {
    setLoading(true);
    setShowURL(true);
    axios
      .post(API, body, { headers: header })
      .then((response) => {
        setLoading(false);
        const link = response.data.link;
        setShort(link);
        messageApi.open({
          type: "success",
          content: "Short URL generated",
        });
      })
      .catch((error) => {
        axios
          .post(APIBK + "?url=" + url)
          .then((res) => {
            setLoading(false);
            const linkbk = res.data.result.full_short_link;
            setShort(linkbk);
          })
          .catch((error) => {
            setLoading(false);
            messageApi.open({
              type: "error",
              content: "No URL provided / API Error",
            });
          });
      });
  }
  function handleInputChange(event) {
    setUrl(event.target.value);
  }

  function copyPassword() {
    if (short) {
      navigator.clipboard.writeText(short);
      messageApi.open({
        type: "success",
        content: "URL Copied",
      });
    }
  }

  return (
    <>
      {contextHolder}
      <div className="centerized">
        <Button className="back" onClick={() => navigate(-1)}>
          <HomeOutlined />
          Home
        </Button>

        <Card
          title={
            <>
              <Typography.Title level={4}>Link Shortener</Typography.Title>
              <Typography>Shortening URL for aesthetic look</Typography>
            </>
          }
          className="card-app"
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
              loading={loading}
            >
              Shorten the link
            </Button>

            {short && (
              <>
                <Typography.Text>Your short URL is: </Typography.Text>
                <Button size="large" onClick={copyPassword} block>
                  {short}
                </Button>
              </>
            )}
          </Space>
        </Card>
      </div>
    </>
  );
}

export default LinkShort;
