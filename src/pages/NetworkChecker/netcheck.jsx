import React, { useEffect, useState } from "react";
import { Button, Card, Typography, Spin, Descriptions, message } from "antd";
import { HomeOutlined, LoadingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function NetCheck() {
  const navigate = useNavigate();
  const [detail, setDetail] = useState({});

  const [loading, setLoading] = useState(false);

  const IPDetail = import.meta.env.VITE_IP_DETAIL;
  const IPDetailToken = import.meta.env.VITE_IP_DETAIL_TOKEN;

  function getNetworkDetails() {
    setLoading(true);
    axios
      .get(IPDetail + "?token=" + IPDetailToken)
      .then((res) => {
        setLoading(false);
        const ipdetail = res.data;
        setDetail(ipdetail);
        message.success("Network data retrieved");
      })
      .catch((error) => {
        setLoading(false);
        message.error("Failed to retrieve network data");
      });
  }

  useEffect(() => {
    getNetworkDetails();
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
              <Typography.Title level={4}>Network Checker</Typography.Title>
              <Typography>Check your network information</Typography>
            </>
          }
          className="card-app"
        >
          <Descriptions column={1} layout="vertical" className="network-data">
            <Descriptions.Item label="IP Address">
              {loading ? (
                <Spin indicator={loadingIcon} />
              ) : (
                <>
                  <Typography.Text copyable>{detail.ip}</Typography.Text>
                </>
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Provider">
              {loading ? (
                <Spin indicator={loadingIcon} />
              ) : (
                <>
                  <Typography.Text>{detail.org}</Typography.Text>
                </>
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Country">
              {loading ? (
                <Spin indicator={loadingIcon} />
              ) : (
                <>
                  <Typography.Text>{detail.country}</Typography.Text>
                </>
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Area">
              {loading ? (
                <Spin indicator={loadingIcon} />
              ) : (
                <>
                  <Typography.Text>
                    {detail.city}, {detail.region}
                  </Typography.Text>
                </>
              )}
            </Descriptions.Item>
          </Descriptions>
          <Button
            type="primary"
            size="large"
            className="main-action"
            onClick={getNetworkDetails}
            block
          >
            Refresh Data
          </Button>
        </Card>
      </div>
    </>
  );
}

export default NetCheck;
