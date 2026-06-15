import { Button, Input, Space, Typography, message } from "antd";
import { useMemo, useState } from "react";
import ContentCard from "../../components/contentCard";
import HomeButton from "../../components/homeButton";

function normalizeHex(value) {
  const cleaned = value.trim().replace(/^#/, "");

  if (/^[0-9a-fA-F]{3}$/.test(cleaned)) {
    return cleaned
      .split("")
      .map((character) => character + character)
      .join("")
      .toUpperCase();
  }

  if (/^[0-9a-fA-F]{6}$/.test(cleaned)) {
    return cleaned.toUpperCase();
  }

  return "";
}

function hexToRgb(hex) {
  const normalized = normalizeHex(hex);

  if (!normalized) return null;

  return {
    r: parseInt(normalized.slice(0, 2), 16),
    g: parseInt(normalized.slice(2, 4), 16),
    b: parseInt(normalized.slice(4, 6), 16),
    a: 1,
  };
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function rgbToHex({ r, g, b, a = 1 }) {
  const hex = [r, g, b]
    .map((value) => clamp(Math.round(value), 0, 255).toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();

  if (a < 1) {
    return `${hex}${Math.round(clamp(a, 0, 1) * 255)
      .toString(16)
      .padStart(2, "0")
      .toUpperCase()}`;
  }

  return hex;
}

function rgbToHsl({ r, g, b }) {
  const red = r / 255;
  const green = g / 255;
  const blue = b / 255;
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const lightness = (max + min) / 2;

  if (max === min) {
    return { h: 0, s: 0, l: Math.round(lightness * 100) };
  }

  const delta = max - min;
  const saturation =
    lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);

  let hue;
  if (max === red) {
    hue = (green - blue) / delta + (green < blue ? 6 : 0);
  } else if (max === green) {
    hue = (blue - red) / delta + 2;
  } else {
    hue = (red - green) / delta + 4;
  }

  return {
    h: Math.round(hue * 60),
    s: Math.round(saturation * 100),
    l: Math.round(lightness * 100),
  };
}

function hslToRgb({ h, s, l, a = 1 }) {
  const hue = (((h % 360) + 360) % 360) / 360;
  const saturation = clamp(s, 0, 100) / 100;
  const lightness = clamp(l, 0, 100) / 100;

  if (saturation === 0) {
    const value = Math.round(lightness * 255);
    return { r: value, g: value, b: value, a };
  }

  const q =
    lightness < 0.5
      ? lightness * (1 + saturation)
      : lightness + saturation - lightness * saturation;
  const p = 2 * lightness - q;
  const channels = [hue + 1 / 3, hue, hue - 1 / 3].map((channel) => {
    let t = channel;
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  });

  return {
    r: Math.round(channels[0] * 255),
    g: Math.round(channels[1] * 255),
    b: Math.round(channels[2] * 255),
    a,
  };
}

function parseColor(value) {
  const input = value.trim();

  if (!input) return null;

  const hexRgb = hexToRgb(input);
  if (hexRgb) return hexRgb;

  const rgbMatch = input.match(/^rgba?\((.+)\)$/i);
  if (rgbMatch) {
    const parts = rgbMatch[1]
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean);

    if (parts.length === 3 || parts.length === 4) {
      const [r, g, b] = parts.slice(0, 3).map(Number);
      const alpha = parts[3] === undefined ? 1 : Number(parts[3]);

      if ([r, g, b, alpha].every(Number.isFinite)) {
        return {
          r: clamp(Math.round(r), 0, 255),
          g: clamp(Math.round(g), 0, 255),
          b: clamp(Math.round(b), 0, 255),
          a: clamp(alpha, 0, 1),
        };
      }
    }
  }

  const hslMatch = input.match(/^hsla?\((.+)\)$/i);
  if (hslMatch) {
    const parts = hslMatch[1]
      .split(",")
      .map((part) => part.trim().replace("%", ""))
      .filter(Boolean);

    if (parts.length === 3 || parts.length === 4) {
      const [h, s, l] = parts.slice(0, 3).map(Number);
      const alpha = parts[3] === undefined ? 1 : Number(parts[3]);

      if ([h, s, l, alpha].every(Number.isFinite)) {
        return hslToRgb({ h, s, l, a: clamp(alpha, 0, 1) });
      }
    }
  }

  return null;
}

function formatAlpha(alpha) {
  return Number(alpha.toFixed(2));
}

function getRelativeLuminance({ r, g, b }) {
  const values = [r, g, b].map((value) => {
    const channel = value / 255;
    return channel <= 0.03928
      ? channel / 12.92
      : ((channel + 0.055) / 1.055) ** 2.4;
  });

  return values[0] * 0.2126 + values[1] * 0.7152 + values[2] * 0.0722;
}

function getContrastRatio(firstRgb, secondRgb) {
  const first = getRelativeLuminance(firstRgb);
  const second = getRelativeLuminance(secondRgb);
  const lighter = Math.max(first, second);
  const darker = Math.min(first, second);
  return (lighter + 0.05) / (darker + 0.05);
}

function getContrastLabel(ratio) {
  if (ratio >= 7) return "AAA";
  if (ratio >= 4.5) return "AA";
  if (ratio >= 3) return "Large text only";
  return "Fail";
}

function ColorTools() {
  const [messageApi, contextHolder] = message.useMessage();
  const [colorInput, setColorInput] = useState("#1677FF");
  const [contrastInput, setContrastInput] = useState("#FFFFFF");

  const color = useMemo(() => {
    const rgb = parseColor(colorInput);
    if (!rgb) return null;

    const hsl = rgbToHsl(rgb);
    const normalizedHex = `#${rgbToHex(rgb)}`;
    const rgbText = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    const rgbaText = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${formatAlpha(rgb.a)})`;
    const hslText = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
    const hslaText = `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, ${formatAlpha(rgb.a)})`;

    return {
      hex: normalizedHex,
      rgb,
      cssColor: rgb.a < 1 ? rgbaText : rgbText,
      rgbText,
      rgbaText,
      hslText,
      hslaText,
    };
  }, [colorInput]);

  const contrast = useMemo(() => {
    const foreground = color?.rgb;
    const background = parseColor(contrastInput);

    if (!foreground || !background) return null;

    const ratio = getContrastRatio(foreground, background);

    return {
      background: `#${rgbToHex(background)}`,
      ratio,
      label: getContrastLabel(ratio),
    };
  }, [color, contrastInput]);

  function copyValue(value) {
    navigator.clipboard.writeText(value);
    messageApi.success("Color value copied");
  }

  return (
    <>
      {contextHolder}
      <div className="centerized">
        <HomeButton />
        <ContentCard title={"Color Tools"} description={"Convert and check colors"}>
          <Space direction="vertical" className="full-width">
            <Typography.Text>Color</Typography.Text>
            <Input
              value={colorInput}
              onChange={(event) => setColorInput(event.target.value)}
              placeholder="#1677FF, rgb(22, 119, 255), hsl(215, 100%, 54%)"
              size="large"
            />
            {color ? (
              <>
                <div
                  className="color-preview"
                  style={{ backgroundColor: color.hex }}
                />
                <div className="color-values">
                  <Button onClick={() => copyValue(color.hex)}>{color.hex}</Button>
                  <Button onClick={() => copyValue(color.rgbText)}>
                    {color.rgbText}
                  </Button>
                  <Button onClick={() => copyValue(color.rgbaText)}>
                    {color.rgbaText}
                  </Button>
                  <Button onClick={() => copyValue(color.hslText)}>
                    {color.hslText}
                  </Button>
                  <Button onClick={() => copyValue(color.hslaText)}>
                    {color.hslaText}
                  </Button>
                </div>
                <Typography.Text>Contrast Background</Typography.Text>
                <Input
                  value={contrastInput}
                  onChange={(event) => setContrastInput(event.target.value)}
                  placeholder="#FFFFFF, rgb(255, 255, 255), hsl(0, 0%, 100%)"
                  size="large"
                />
                {contrast && (
                  <div
                    className="contrast-preview"
                    style={{
                      backgroundColor: contrast.background,
                      color: color.cssColor,
                    }}
                  >
                    <Typography.Text style={{ color: "inherit" }}>
                      Contrast {contrast.ratio.toFixed(2)}:1 - {contrast.label}
                    </Typography.Text>
                  </div>
                )}
              </>
            ) : (
              <Typography.Text type="danger">Invalid color value</Typography.Text>
            )}
          </Space>
        </ContentCard>
      </div>
    </>
  );
}

export default ColorTools;
