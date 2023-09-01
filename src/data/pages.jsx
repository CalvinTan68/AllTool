import { LockOutlined, LinkOutlined, WifiOutlined, TransactionOutlined } from '@ant-design/icons'
import PWGEN from '../pages/PasswordGenerator/pwgen'
import LinkShort from '../pages/LinkShortener/linkshort'
import NetCheck from '../pages/NetworkChecker/netcheck'
import CurrencyConverter from '../pages/CurrencyConverter/converter'

export const pages = 
[
    {
        link: '/password-generator',
        label: 'Password Generator',
        page: <PWGEN />,
        image: <LockOutlined />
    },
    {
        link: '/link-shortener',
        label: 'Link Shortener',
        page: <LinkShort />,
        image: <LinkOutlined />
    },
    {
        link: '/network-checker',
        label: 'Network Checker',
        page: <NetCheck />,
        image: <WifiOutlined />
    },
    {
        link: '/currency-converter',
        label: 'Currency Converter',
        page: <CurrencyConverter />,
        image: <TransactionOutlined />
    },
]