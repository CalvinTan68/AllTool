import React, { useState } from "react";
import { Button, Card, Input, Typography, Spin, Space, message } from "antd";
import { HomeOutlined, LoadingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LinkShort() {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [short, setShort] = useState("");
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
    setShort("");
    axios
      .post(API, body, { headers: header })
      .then((response) => {
        setLoading(false);
        const link = response.data.link;
        setShort(link);
        message.success("Short URL generated");
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
            message.error("No URL provided / API Error");
          });
      });
  }
  function handleInputChange(event) {
    setUrl(event.target.value);
  }

  function copyPassword() {
    if (short) {
      navigator.clipboard.writeText(short);
      message.success("Short URL copied");
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
