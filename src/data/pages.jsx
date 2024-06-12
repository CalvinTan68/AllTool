import {
  LinkOutlined,
  LockOutlined,
  TransactionOutlined,
  WifiOutlined,
} from "@ant-design/icons";
import { lazy } from "react";

const PWGEN = lazy(() => import("../pages/PasswordGenerator/pwgen"));
const LinkShort = lazy(() => import("../pages/LinkShortener/linkshort"));
const NetCheck = lazy(() => import("../pages/NetworkChecker/netcheck"));
const CurrencyConverter = lazy(() =>
  import("../pages/CurrencyConverter/converter")
);

export const pages = [
  {
    link: "/password-generator",
    label: "Password Generator",
    page: <PWGEN />,
    image: <LockOutlined />,
  },
  {
    link: "/link-shortener",
    label: "URL/Link Shortener",
    page: <LinkShort />,
    image: <LinkOutlined />,
  },
  {
    link: "/network-checker",
    label: "Network Checker",
    page: <NetCheck />,
    image: <WifiOutlined />,
  },
  {
    link: "/currency-converter",
    label: "Currency Converter",
    page: <CurrencyConverter />,
    image: <TransactionOutlined />,
  },
];
