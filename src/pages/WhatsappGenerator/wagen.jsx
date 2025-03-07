import { Button, Input, Space, Typography, message } from "antd";
import { useState } from "react";
import ContentCard from "../../components/contentCard";
import HomeButton from "../../components/homeButton";
import { VITE_WHATSAPP_GENERATOR } from "../../data/constants";

function WhatsAppGenerator() {
  const [messageApi, contextHolder] = message.useMessage();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [textMessage, setTextMessage] = useState("");
  const [link, setLink] = useState("");
  const [showGeneratedButtons, setShowGeneratedButtons] = useState(false);

  function formatPhoneNumber(input) {
    let formatted = input.replace(/[^0-9+]/g, "");
    if (formatted.startsWith("+")) {
      formatted = formatted.slice(1);
    }
    return formatted;
  }

  function handleInputChange(event) {
    const rawInput = event.target.value;
    const cleanedNumber = formatPhoneNumber(rawInput);
    setPhoneNumber(cleanedNumber);
    setShowGeneratedButtons(false);
  }

  function handleTextChange(event) {
    const trimmedText = event.target.value.replace(/^\s+/, "");
    setTextMessage(trimmedText);
    setShowGeneratedButtons(false);
  }

  function generateLink() {
    if (phoneNumber.startsWith("0")) {
      messageApi.error("Invalid phone number format");
      return;
    }

    if (!phoneNumber) {
      messageApi.error("Invalid Phone Number");
      return;
    }

    let whatsappLink = `${VITE_WHATSAPP_GENERATOR}/${phoneNumber}`;
    if (textMessage) {
      const encodedText = encodeURIComponent(textMessage);
      whatsappLink += `?text=${encodedText}`;
    }

    setLink(whatsappLink);
    setShowGeneratedButtons(true);
    messageApi.success("WhatsApp Link Generated");
  }

  function openInNewTab() {
    if (link) {
      window.open(link, "_blank");
    }
  }

  function copyToClipboard() {
    if (link) {
      navigator.clipboard.writeText(link);
      messageApi.success("Link copied to clipboard!");
    }
  }

  return (
    <>
      {contextHolder}
      <div className="centerized">
        <HomeButton />
        <ContentCard
          title={"WhatsApp Generator"}
          description={"Generate WhatsApp links with optional text"}
        >
          <Space direction="vertical" className="full-width">
            <Typography.Text>Phone Number</Typography.Text>
            <Input
              placeholder="Enter phone number with area code"
              size="large"
              className="full-width"
              onChange={handleInputChange}
            />
            <Typography.Text>Optional Message</Typography.Text>
            <Input.TextArea
              rows={3}
              placeholder="Enter your message (optional)"
              onChange={handleTextChange}
              size="large"
              autoSize={{ minRows: 5, maxRows: 5 }}
            />
            {!showGeneratedButtons ? (
              <Button
                type="primary"
                size="large"
                className="main-action"
                block
                onClick={generateLink}
              >
                Generate
              </Button>
            ) : (
              <div style={{ display: "flex", gap: "10px" }}>
                <Button
                  type="primary"
                  size="large"
                  className="main-action"
                  block
                  onClick={openInNewTab}
                >
                  Open in New Tab
                </Button>
                <Button
                  type="primary"
                  size="large"
                  className="main-action"
                  block
                  onClick={copyToClipboard}
                >
                  Copy URL
                </Button>
              </div>
            )}
          </Space>
        </ContentCard>
      </div>
    </>
  );
}

export default WhatsAppGenerator;
