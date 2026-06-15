import {
  Button,
  Input,
  InputNumber,
  QRCode,
  Select,
  Space,
  Typography,
  message,
} from "antd";
import { useState } from "react";
import ContentCard from "../../components/contentCard";
import HomeButton from "../../components/homeButton";

const errorLevelOptions = [
  { label: "Low", value: "L" },
  { label: "Medium", value: "M" },
  { label: "Quartile", value: "Q" },
  { label: "High", value: "H" },
];

function QRGenerator() {
  const [messageApi, contextHolder] = message.useMessage();
  const [inputText, setInputText] = useState("");
  const [qrValue, setQrValue] = useState("");
  const [qrSize, setQrSize] = useState(220);
  const [errorLevel, setErrorLevel] = useState("M");

  function generateQRCode() {
    const nextValue = inputText.trim();

    if (!nextValue) {
      messageApi.error("Please enter text or a link to generate QR Code!");
      return;
    }

    setQrValue(nextValue);
    messageApi.success("QR Code generated!");
  }

  function downloadQRCode() {
    const canvas = document.querySelector("#generated-qrcode canvas");

    if (!canvas) {
      messageApi.error("Generate a QR Code first");
      return;
    }

    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "alltool-qrcode.png";
    link.href = url;
    link.click();
  }

  function handleInputChange(e) {
    setInputText(e.target.value);
    setQrValue("");
  }

  return (
    <>
      {contextHolder}
      <div className="centerized">
        <HomeButton />
        <ContentCard title={"QRCode Generator"} description={"Generate QR Code"}>
          <Space direction="vertical" className="full-width">
            <Input.TextArea
              value={inputText}
              onChange={handleInputChange}
              placeholder="Enter text or URL here... (preferably URL)"
              size="large"
              autoSize={{ minRows: 5, maxRows: 5 }}
            />
            <Typography.Text>QR Size</Typography.Text>
            <InputNumber
              min={160}
              max={360}
              step={20}
              value={qrSize}
              addonAfter="px"
              onChange={(value) => setQrSize(value || 220)}
              size="large"
            />
            <Typography.Text>Error Correction</Typography.Text>
            <Select
              className="full-width"
              options={errorLevelOptions}
              value={errorLevel}
              onChange={setErrorLevel}
              size="large"
            />
            <Button
              onClick={generateQRCode}
              type="primary"
              size="large"
              className="main-action"
              block
            >
              Generate QR Code
            </Button>
            {qrValue && (
              <>
                <div className="qr-preview" id="generated-qrcode">
                  <QRCode
                    type="canvas"
                    value={qrValue}
                    size={qrSize}
                    errorLevel={errorLevel}
                  />
                </div>
                <Button size="large" onClick={downloadQRCode} block>
                  Download PNG
                </Button>
              </>
            )}
          </Space>
        </ContentCard>
      </div>
    </>
  );
}

export default QRGenerator;
