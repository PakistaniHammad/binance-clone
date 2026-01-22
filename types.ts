
export type Page = 'home' | 'markets' | 'trade' | 'futures' | 'assets' | 'p2p' | 'profile' | 'send';

export interface Coin {
  symbol: string;
  name: string;
  balance: number;
  usdtValue: number;
  pnl?: string;
  avgPrice?: string;
  icon: string;
}

export interface P2POrder {
  merchant: string;
  trades: string;
  completion: string;
  price: number;
  limitMin: number;
  limitMax: number;
  available: number;
  paymentMethods: string[];
}
