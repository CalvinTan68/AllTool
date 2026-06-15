import { lazy } from "react";

const PasswordGenerator = lazy(() => import("../pages/PasswordGenerator/pwgen"));
const PasswordChecker = lazy(() => import("../pages/PasswordChecker/pwcheck"));
const LinkShortener = lazy(() => import("../pages/LinkShortener/linkshort"));
const NetworkChecker = lazy(() => import("../pages/NetworkChecker/netcheck"));
const CurrencyConverter = lazy(
  () => import("../pages/CurrencyConverter/converter")
);
const UnitConverter = lazy(() => import("../pages/UnitConverter/unitconverter"));
const ColorTools = lazy(() => import("../pages/ColorTools/colortools"));
const WhatsAppGenerator = lazy(
  () => import("../pages/WhatsappGenerator/wagen")
);
const QRGenerator = lazy(() => import("../pages/QRGenerator/qrgen"));
const TextUtilities = lazy(() => import("../pages/TextUtilities/textutils"));

export const routes = [
  { path: "/password-generator", Component: PasswordGenerator },
  { path: "/password-checker", Component: PasswordChecker },
  { path: "/link-shortener", Component: LinkShortener },
  { path: "/network-checker", Component: NetworkChecker },
  { path: "/currency-converter", Component: CurrencyConverter },
  { path: "/unit-converter", Component: UnitConverter },
  { path: "/color-tools", Component: ColorTools },
  { path: "/whatsapp-generator", Component: WhatsAppGenerator },
  { path: "/qr-generator", Component: QRGenerator },
  { path: "/text-utilities", Component: TextUtilities },
];
