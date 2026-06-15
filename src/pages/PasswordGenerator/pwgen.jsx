import { Button, Checkbox, Progress, Slider, Space, Typography, message } from "antd";
import { useMemo, useState } from "react";
import ContentCard from "../../components/contentCard";
import HomeButton from "../../components/homeButton";
import {
  characterGroups,
  getCharsetLengthFromOptions,
  getStrengthDetails,
} from "../../utils/passwordStrength";

function PWGEN() {
  const [messageApi, contextHolder] = message.useMessage();
  const [length, setLength] = useState(15);
  const [useUppercase, setUseUppercase] = useState(true);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [generation, setGeneration] = useState(0);

  const password = useMemo(() => {
    void generation;

    let charset = "";
    if (useUppercase) charset += characterGroups.uppercase;
    if (useLowercase) charset += characterGroups.lowercase;
    if (useNumbers) charset += characterGroups.numbers;
    if (useSymbols) charset += characterGroups.symbols;

    if (!charset) return "";

    const randomValues = new Uint32Array(length);
    window.crypto.getRandomValues(randomValues);

    let password = "";
    for (let i = 0; i < length; i++) {
      password += charset.charAt(randomValues[i] % charset.length);
    }
    return password;
  }, [
    length,
    useUppercase,
    useLowercase,
    useNumbers,
    useSymbols,
    generation,
  ]);

  const charsetLength = useMemo(() => {
    return getCharsetLengthFromOptions({
      useUppercase,
      useLowercase,
      useNumbers,
      useSymbols,
    });
  }, [useUppercase, useLowercase, useNumbers, useSymbols]);

  const strength = useMemo(
    () => getStrengthDetails(length, charsetLength),
    [charsetLength, length]
  );

  function copyPassword() {
    if (password) {
      navigator.clipboard.writeText(password);
      messageApi.success("Password copied to clipboard");
    }
  }

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
          <div className="password-strength">
            <Space direction="vertical" className="full-width">
              <div className="strength-summary">
                <Typography.Text strong>{strength.label}</Typography.Text>
                <Typography.Text type="secondary">
                  {Math.round(strength.entropy)} bits
                </Typography.Text>
              </div>
              <Progress
                percent={strength.percent}
                showInfo={false}
                status={strength.status}
              />
              <Typography.Text type="secondary">
                {strength.feedback}
              </Typography.Text>
            </Space>
          </div>

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
            onClick={() => setGeneration((value) => value + 1)}
            block
            disabled={!password}
          >
            Generate Password
          </Button>
        </ContentCard>
      </div>
    </>
  );
}

export default PWGEN;
