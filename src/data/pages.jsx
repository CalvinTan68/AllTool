import {
	BgColorsOutlined,
	CalculatorOutlined,
	LinkOutlined,
	LockOutlined,
	QrcodeOutlined,
	FileTextOutlined,
	SecurityScanOutlined,
	TransactionOutlined,
	WhatsAppOutlined,
	WifiOutlined,
} from "@ant-design/icons";

export const pages = [
	{
		link: "/password-generator",
		label: "Password Generator",
		icon: LockOutlined,
	},
	{
		link: "/password-checker",
		label: "Password Checker",
		icon: SecurityScanOutlined,
	},
	{
		link: "/link-shortener",
		label: "URL/Link Shortener",
		icon: LinkOutlined,
	},
	{
		link: "/network-checker",
		label: "Network Checker",
		icon: WifiOutlined,
	},
	{
		link: "/currency-converter",
		label: "Currency Converter",
		icon: TransactionOutlined,
	},
	{
		link: "/unit-converter",
		label: "Unit Converter",
		icon: CalculatorOutlined,
	},
	{
		link: "/color-tools",
		label: "Color Tools",
		icon: BgColorsOutlined,
	},
	{
		link: "/whatsapp-generator",
		label: "WhatsApp Generator",
		icon: WhatsAppOutlined,
	},
	{
		link: "/qr-generator",
		label: "QRCode Generator",
		icon: QrcodeOutlined,
	},
	{
		link: "/text-utilities",
		label: "Text Utilities",
		icon: FileTextOutlined,
	},
];
