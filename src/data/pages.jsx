import {
	LinkOutlined,
	LockOutlined,
	QrcodeOutlined,
	FileTextOutlined,
	SecurityScanOutlined,
	TransactionOutlined,
	WhatsAppOutlined,
	WifiOutlined,
} from "@ant-design/icons";
import { lazy } from "react";

const PWGEN = lazy(() => import("../pages/PasswordGenerator/pwgen"));
const PasswordChecker = lazy(() => import("../pages/PasswordChecker/pwcheck"));
const LinkShort = lazy(() => import("../pages/LinkShortener/linkshort"));
const NetCheck = lazy(() => import("../pages/NetworkChecker/netcheck"));
const CurrencyConverter = lazy(
	() => import("../pages/CurrencyConverter/converter"),
);
const WhatsAppGenerator = lazy(
	() => import("../pages/WhatsappGenerator/wagen"),
);
const QRGenerator = lazy(() => import("../pages/QRGenerator/qrgen"));
const TextUtilities = lazy(() => import("../pages/TextUtilities/textutils"));

export const pages = [
	{
		link: "/password-generator",
		label: "Password Generator",
		page: <PWGEN />,
		image: <LockOutlined />,
	},
	{
		link: "/password-checker",
		label: "Password Checker",
		page: <PasswordChecker />,
		image: <SecurityScanOutlined />,
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
	{
		link: "/whatsapp-generator",
		label: "WhatsApp Generator",
		page: <WhatsAppGenerator />,
		image: <WhatsAppOutlined />,
	},
	{
		link: "/qr-generator",
		label: "QRCode Generator",
		page: <QRGenerator />,
		image: <QrcodeOutlined />,
	},
	{
		link: "/text-utilities",
		label: "Text Utilities",
		page: <TextUtilities />,
		image: <FileTextOutlined />,
	},
];
