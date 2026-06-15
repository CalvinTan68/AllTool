import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Button, Input, Progress, Space, Typography } from "antd";
import { useMemo, useState } from "react";
import ContentCard from "../../components/contentCard";
import HomeButton from "../../components/homeButton";
import {
  getCharsetLengthFromPassword,
  getPasswordChecks,
  getStrengthDetails,
} from "../../utils/passwordStrength";

function PasswordChecker() {
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const strength = useMemo(() => {
    return getStrengthDetails(
      password.length,
      getCharsetLengthFromPassword(password)
    );
  }, [password]);

  const checks = useMemo(() => getPasswordChecks(password), [password]);

  return (
    <>
      <div className="centerized">
        <HomeButton />
        <ContentCard
          title={"Password Checker"}
          description={"Check password strength locally"}
        >
          <Space direction="vertical" className="full-width">
            <Input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Type or paste a password"
              size="large"
              type={visible ? "text" : "password"}
              suffix={
                <Button
                  icon={visible ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                  onClick={() => setVisible((value) => !value)}
                  size="small"
                  type="text"
                />
              }
            />
            <div className="password-strength">
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
            </div>
            <div className="password-checks">
              {checks.map((check) => (
                <Typography.Text
                  key={check.label}
                  type={check.passed ? "success" : "secondary"}
                >
                  {check.passed ? (
                    <CheckCircleOutlined />
                  ) : (
                    <CloseCircleOutlined />
                  )}{" "}
                  {check.label}
                </Typography.Text>
              ))}
            </div>
          </Space>
        </ContentCard>
      </div>
    </>
  );
}

export default PasswordChecker;
