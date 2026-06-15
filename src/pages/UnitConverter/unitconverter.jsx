import { SwapOutlined } from "@ant-design/icons";
import {
  Button,
  InputNumber,
  Select,
  Space,
  Typography,
  message,
} from "antd";
import { useMemo, useState } from "react";
import ContentCard from "../../components/contentCard";
import HomeButton from "../../components/homeButton";

const unitCategories = {
  length: {
    label: "Length",
    base: "m",
    units: {
      m: { label: "Meter", factor: 1 },
      km: { label: "Kilometer", factor: 1000 },
      cm: { label: "Centimeter", factor: 0.01 },
      mm: { label: "Millimeter", factor: 0.001 },
      mi: { label: "Mile", factor: 1609.344 },
      yd: { label: "Yard", factor: 0.9144 },
      ft: { label: "Foot", factor: 0.3048 },
      in: { label: "Inch", factor: 0.0254 },
    },
  },
  weight: {
    label: "Weight",
    base: "kg",
    units: {
      kg: { label: "Kilogram", factor: 1 },
      g: { label: "Gram", factor: 0.001 },
      mg: { label: "Milligram", factor: 0.000001 },
      lb: { label: "Pound", factor: 0.45359237 },
      oz: { label: "Ounce", factor: 0.028349523125 },
    },
  },
  temperature: {
    label: "Temperature",
    units: {
      c: { label: "Celsius" },
      f: { label: "Fahrenheit" },
      k: { label: "Kelvin" },
    },
  },
  data: {
    label: "Data Size",
    base: "byte",
    units: {
      byte: { label: "Byte", factor: 1 },
      kb: { label: "Kilobyte", factor: 1024 },
      mb: { label: "Megabyte", factor: 1024 ** 2 },
      gb: { label: "Gigabyte", factor: 1024 ** 3 },
      tb: { label: "Terabyte", factor: 1024 ** 4 },
    },
  },
  area: {
    label: "Area",
    base: "sqm",
    units: {
      sqm: { label: "Square Meter", factor: 1 },
      sqkm: { label: "Square Kilometer", factor: 1000000 },
      hectare: { label: "Hectare", factor: 10000 },
      acre: { label: "Acre", factor: 4046.8564224 },
      sqft: { label: "Square Foot", factor: 0.09290304 },
    },
  },
  speed: {
    label: "Speed",
    base: "mps",
    units: {
      mps: { label: "Meter/Second", factor: 1 },
      kmh: { label: "Kilometer/Hour", factor: 0.2777777778 },
      mph: { label: "Mile/Hour", factor: 0.44704 },
      knot: { label: "Knot", factor: 0.5144444444 },
    },
  },
};

function toCelsius(value, unit) {
  if (unit === "f") return (value - 32) * (5 / 9);
  if (unit === "k") return value - 273.15;
  return value;
}

function fromCelsius(value, unit) {
  if (unit === "f") return value * (9 / 5) + 32;
  if (unit === "k") return value + 273.15;
  return value;
}

function convertValue(categoryKey, amount, fromUnit, toUnit) {
  if (amount === null || amount === undefined || Number.isNaN(amount)) return "";

  if (categoryKey === "temperature") {
    return fromCelsius(toCelsius(amount, fromUnit), toUnit);
  }

  const category = unitCategories[categoryKey];
  const baseValue = amount * category.units[fromUnit].factor;
  return baseValue / category.units[toUnit].factor;
}

function formatResult(value) {
  if (value === "") return "";

  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 8,
  }).format(value);
}

function getDefaultUnits(categoryKey) {
  const unitKeys = Object.keys(unitCategories[categoryKey].units);
  return [unitKeys[0], unitKeys[1] || unitKeys[0]];
}

function UnitConverter() {
  const [messageApi, contextHolder] = message.useMessage();
  const [category, setCategory] = useState("length");
  const [amount, setAmount] = useState(1);
  const [[fromUnit, toUnit], setUnits] = useState(getDefaultUnits("length"));

  const categoryOptions = useMemo(() => {
    return Object.entries(unitCategories).map(([value, config]) => ({
      label: config.label,
      value,
    }));
  }, []);

  const unitOptions = useMemo(() => {
    return Object.entries(unitCategories[category].units).map(
      ([value, config]) => ({
        label: config.label,
        value,
      })
    );
  }, [category]);

  const result = useMemo(() => {
    return convertValue(category, amount, fromUnit, toUnit);
  }, [amount, category, fromUnit, toUnit]);

  function handleCategoryChange(nextCategory) {
    setCategory(nextCategory);
    setUnits(getDefaultUnits(nextCategory));
  }

  function swapUnits() {
    setUnits(([currentFrom, currentTo]) => [currentTo, currentFrom]);
  }

  function copyResult() {
    if (result === "") {
      messageApi.error("Nothing to copy");
      return;
    }

    navigator.clipboard.writeText(String(result));
    messageApi.success("Converted value copied");
  }

  return (
    <>
      {contextHolder}
      <div className="centerized">
        <HomeButton />
        <ContentCard title={"Unit Converter"} description={"Convert common units"}>
          <Space direction="vertical" className="full-width">
            <Typography.Text>Category</Typography.Text>
            <Select
              className="full-width"
              options={categoryOptions}
              value={category}
              onChange={handleCategoryChange}
              size="large"
            />
            <Typography.Text>Amount</Typography.Text>
            <InputNumber
              value={amount}
              onChange={(value) => setAmount(value)}
              placeholder="Input amount"
              size="large"
            />
            <Typography.Text>From</Typography.Text>
            <Select
              className="full-width"
              options={unitOptions}
              value={fromUnit}
              onChange={(value) => setUnits((units) => [value, units[1]])}
              size="large"
            />
            <Button icon={<SwapOutlined />} onClick={swapUnits} block>
              Swap Units
            </Button>
            <Typography.Text>To</Typography.Text>
            <Select
              className="full-width"
              options={unitOptions}
              value={toUnit}
              onChange={(value) => setUnits((units) => [units[0], value])}
              size="large"
            />
            <div className="converter-result">
              <Typography.Text type="secondary">Result</Typography.Text>
              <Typography.Title level={4}>
                {result === "" ? "No result" : formatResult(result)}
              </Typography.Title>
            </div>
            <Button
              className="main-action"
              type="primary"
              size="large"
              onClick={copyResult}
              block
            >
              Copy Result
            </Button>
          </Space>
        </ContentCard>
      </div>
    </>
  );
}

export default UnitConverter;
