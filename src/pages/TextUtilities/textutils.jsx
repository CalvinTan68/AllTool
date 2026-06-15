import { Button, Input, Space, Typography, message } from "antd";
import { useMemo, useState } from "react";
import ContentCard from "../../components/contentCard";
import HomeButton from "../../components/homeButton";

function toTitleCase(value) {
  return value
    .toLowerCase()
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function toSlug(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function removeDuplicateLines(value) {
  const seen = new Set();

  return value
    .split("\n")
    .filter((line) => {
      if (seen.has(line)) return false;
      seen.add(line);
      return true;
    })
    .join("\n");
}

function TextUtilities() {
  const [messageApi, contextHolder] = message.useMessage();
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const trimmedText = text.trim();
    const words = trimmedText ? trimmedText.split(/\s+/).length : 0;
    const lines = text ? text.split("\n").length : 0;

    return {
      characters: text.length,
      charactersNoSpaces: text.replace(/\s/g, "").length,
      words,
      lines,
    };
  }, [text]);

  function updateText(nextText, successMessage) {
    setText(nextText);
    messageApi.success(successMessage);
  }

  function copyText() {
    if (!text) {
      messageApi.error("Nothing to copy");
      return;
    }

    navigator.clipboard.writeText(text);
    messageApi.success("Text copied");
  }

  function formatJson() {
    try {
      updateText(JSON.stringify(JSON.parse(text), null, 2), "JSON formatted");
    } catch (error) {
      console.error(error);
      messageApi.error("Invalid JSON");
    }
  }

  return (
    <>
      {contextHolder}
      <div className="centerized">
        <HomeButton />
        <ContentCard
          title={"Text Utilities"}
          description={"Convert, clean, and inspect text"}
        >
          <Space direction="vertical" className="full-width">
            <Input.TextArea
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="Paste or type text here"
              size="large"
              autoSize={{ minRows: 6, maxRows: 8 }}
            />
            <div className="text-stats">
              <Typography.Text>{stats.characters} chars</Typography.Text>
              <Typography.Text>
                {stats.charactersNoSpaces} no spaces
              </Typography.Text>
              <Typography.Text>{stats.words} words</Typography.Text>
              <Typography.Text>{stats.lines} lines</Typography.Text>
            </div>
            <div className="tool-actions">
              <Button
                onClick={() => updateText(text.toUpperCase(), "Uppercase applied")}
              >
                Uppercase
              </Button>
              <Button
                onClick={() => updateText(text.toLowerCase(), "Lowercase applied")}
              >
                Lowercase
              </Button>
              <Button
                onClick={() => updateText(toTitleCase(text), "Title case applied")}
              >
                Title Case
              </Button>
              <Button onClick={() => updateText(toSlug(text), "Slug generated")}>
                Slug
              </Button>
              <Button
                onClick={() =>
                  updateText(removeDuplicateLines(text), "Duplicate lines removed")
                }
              >
                Unique Lines
              </Button>
              <Button
                onClick={() =>
                  updateText(text.split("\n").sort().join("\n"), "Lines sorted")
                }
              >
                Sort Lines
              </Button>
              <Button onClick={formatJson}>Format JSON</Button>
              <Button onClick={copyText}>Copy</Button>
            </div>
            <Button
              className="main-action"
              danger
              onClick={() => setText("")}
              size="large"
              block
            >
              Clear
            </Button>
          </Space>
        </ContentCard>
      </div>
    </>
  );
}

export default TextUtilities;
