import { Button, Checkbox, message, Slider, Space } from "antd";
import { useEffect, useState } from "react";
import ContentCard from "../../components/contentCard";
import HomeButton from "../../components/homeButton";

function PWGEN() {
  const [messageApi, contextHolder] = message.useMessage();
  const [length, setLength] = useState(15);
  const [password, setPassword] = useState("");
  const [useUppercase, setUseUppercase] = useState(true);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);

  function generatePassword() {
    let charset = "";
    if (useUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (useLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (useNumbers) charset += "0123456789";
    if (useSymbols) charset += "~!@#$%^&*()_-+={[}]|:;<,>.?/";

    let password = "";
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(password);
  }

  function copyPassword() {
    if (password) {
      navigator.clipboard.writeText(password);
      messageApi.success("Password copied to clipboard");
    }
  }

  useEffect(() => {
    generatePassword();
  }, [length, useUppercase, useLowercase, useNumbers, useSymbols]);

  const formatter = (value) => `Password Length : ${value} digit`;

  return (
    <>
      {contextHolder}
      <div className="centerized">
        <HomeButton />
        <ContentCard
          title={"Password Generator"}
          description={"Generating a secure password"}
        >
          <Button
            size="large"
            id="clipboard"
            title="copy"
            onClick={copyPassword}
            block
          >
            <span id="password">{password}</span>
          </Button>

          <Space
            direction="vertical"
            style={{ margin: "8px 0px 0px 0px", width: "100%" }}
          >
            <Slider
              min={12}
              max={20}
              defaultValue={length}
              onChange={(value) => setLength(value)}
              tooltip={{ formatter, placement: "bottom" }}
            />
            <Checkbox
              checked={useUppercase}
              id="uppercase"
              onChange={(e) => setUseUppercase(e.target.checked)}
            >
              Uppercase (A-Z)
            </Checkbox>
            <Checkbox
              checked={useLowercase}
              id="lowercase"
              onChange={(e) => setUseLowercase(e.target.checked)}
            >
              Lowercase (a-z)
            </Checkbox>
            <Checkbox
              checked={useNumbers}
              id="numbers"
              onChange={(e) => setUseNumbers(e.target.checked)}
            >
              Numbers (0-9)
            </Checkbox>
            <Checkbox
              checked={useSymbols}
              id="symbols"
              onChange={(e) => setUseSymbols(e.target.checked)}
            >
              Symbols (&$%# etc.)
            </Checkbox>
          </Space>
          <Button
            className="main-action"
            type="primary"
            size="large"
            title="generate"
            id="generate"
            onClick={generatePassword}
            block
          >
            Generate Password
          </Button>
        </ContentCard>
      </div>
    </>
  );
}

export default PWGEN;
