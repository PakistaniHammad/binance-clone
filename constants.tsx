
import { Coin, P2POrder } from './types';

export const USER_NAME = "Khalid";
export const TOTAL_BALANCE_USDT = 369.543;
export const EXCHANGE_RATE_BUY = 288.00;
export const EXCHANGE_RATE_SELL = 279.00;

export const CRYPTO_ASSETS: Coin[] = [
  {
    symbol: "USDT",
    name: "TetherUS",
    balance: 0.27479907,
    usdtValue: 0.27479907,
    icon: "https://cryptologos.cc/logos/tether-usdt-logo.png"
  },
  {
    symbol: "FDUSD",
    name: "First Digital USD",
    balance: 0.04744694,
    usdtValue: 0.04741847,
    icon: "https://cryptologos.cc/logos/first-digital-usd-fdusd-logo.png"
  },
  {
    symbol: "TRUMP",
    name: "OFFICIAL TRUMP",
    balance: 0.002367,
    usdtValue: 0.01152255,
    pnl: "0.00 USDT(-1.48%)",
    avgPrice: "46.25 USDT",
    icon: "https://picsum.photos/seed/trump/32/32"
  },
  {
    symbol: "BIO",
    name: "Bio Protocol",
    balance: 0.20371271,
    usdtValue: 0.0104912,
    pnl: "0.00 USDT(+8.65%)",
    icon: "https://picsum.photos/seed/bio/32/32"
  }
];

export const BUY_ORDERS: P2POrder[] = [
  { merchant: "-Mr_X-", trades: "43239", completion: "100.00%", price: 288.00, limitMin: 1000, limitMax: 3000, available: 251.80, paymentMethods: ["Easypaisa-PK"] },
  { merchant: "VERIFIED__MARCHANT", trades: "50348", completion: "100.00%", price: 288.15, limitMin: 1000, limitMax: 3000, available: 314.38, paymentMethods: ["Easypaisa-PK"] },
  { merchant: "RED__ROSE", trades: "62942", completion: "100.00%", price: 288.50, limitMin: 1000, limitMax: 3050, available: 69.00, paymentMethods: ["Easypaisa-PK"] },
  { merchant: "WATTOO-Crypto-Empire", trades: "224", completion: "100.00%", price: 288.75, limitMin: 500, limitMax: 10000, available: 450.00, paymentMethods: ["Bank Transfer"] },
  { merchant: "GoldTrader", trades: "15201", completion: "99.20%", price: 288.90, limitMin: 5000, limitMax: 50000, available: 1200.50, paymentMethods: ["JazzCash"] },
  { merchant: "CryptoKing_PK", trades: "8920", completion: "98.50%", price: 289.10, limitMin: 2000, limitMax: 15000, available: 890.20, paymentMethods: ["Meezan Bank"] },
  { merchant: "SafeExchange", trades: "12450", completion: "100.00%", price: 289.25, limitMin: 1000, limitMax: 5000, available: 150.00, paymentMethods: ["Easypaisa-PK"] },
  { merchant: "FastPay_Ex", trades: "3400", completion: "97.80%", price: 289.40, limitMin: 10000, limitMax: 100000, available: 3400.00, paymentMethods: ["UBL"] },
  { merchant: "DirectCrypto", trades: "560", completion: "95.00%", price: 289.55, limitMin: 200, limitMax: 2000, available: 45.00, paymentMethods: ["JazzCash"] },
  { merchant: "Master_Trade", trades: "23100", completion: "99.90%", price: 289.70, limitMin: 1000, limitMax: 25000, available: 1100.00, paymentMethods: ["Bank Transfer"] }
];

export const SELL_ORDERS: P2POrder[] = [
  { merchant: "WORLD_EX_LTD", trades: "53", completion: "85.50%", price: 279.00, limitMin: 1000, limitMax: 1020, available: 993.16, paymentMethods: ["Bank Transfer", "United Bank", "Meezan Bank"] },
  { merchant: "MASHALLAH AND HMA", trades: "732", completion: "100.00%", price: 278.85, limitMin: 185000, limitMax: 186000, available: 641.15, paymentMethods: ["Bank Transfer"] },
  { merchant: "PRIME--EXCHANGE", trades: "9755", completion: "99.70%", price: 278.50, limitMin: 20000, limitMax: 200000, available: 1044.05, paymentMethods: ["Easypaisa-PK"] },
  { merchant: "iskhan88", trades: "6576", completion: "99.70%", price: 278.20, limitMin: 500, limitMax: 5000, available: 80.00, paymentMethods: ["JazzCash"] },
  { merchant: "Trust_Merchant", trades: "1420", completion: "100.00%", price: 278.00, limitMin: 10000, limitMax: 50000, available: 2000.00, paymentMethods: ["Meezan Bank"] },
  { merchant: "PK_Gateway", trades: "4500", completion: "98.20%", price: 277.80, limitMin: 1000, limitMax: 15000, available: 500.00, paymentMethods: ["Easypaisa-PK"] },
  { merchant: "SpeedyEx", trades: "230", completion: "92.40%", price: 277.50, limitMin: 200, limitMax: 5000, available: 300.00, paymentMethods: ["JazzCash"] },
  { merchant: "SecureLiquidity", trades: "18900", completion: "99.50%", price: 277.30, limitMin: 50000, limitMax: 500000, available: 15000.00, paymentMethods: ["Bank Transfer"] },
  { merchant: "DailyCrypto_PK", trades: "1120", completion: "100.00%", price: 277.10, limitMin: 1000, limitMax: 10000, available: 450.00, paymentMethods: ["Easypaisa-PK"] },
  { merchant: "LegacyTrade", trades: "870", completion: "96.50%", price: 276.90, limitMin: 5000, limitMax: 20000, available: 900.00, paymentMethods: ["All Banks"] }
];
