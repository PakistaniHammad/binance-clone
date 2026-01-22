
import React from 'react';
import { Page } from '../types';
import { Search, Bell, Menu, Headphones, UserCircle, QrCode, ChevronUp, ChevronDown, MoreHorizontal, MessageSquare } from 'lucide-react';
import { TOTAL_BALANCE_USDT, EXCHANGE_RATE_BUY } from '../constants';

interface HomeProps {
  onNavigate: (page: Page) => void;
  onUnimplemented: () => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate, onUnimplemented }) => {
  const pkrValue = TOTAL_BALANCE_USDT * EXCHANGE_RATE_BUY;

  return (
    <div className="flex flex-col bg-[#0b0e11] min-h-screen">
      {/* App Bar */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-3">
          <Menu size={24} className="text-gray-400" onClick={onUnimplemented} />
          <div className="relative cursor-pointer" onClick={onUnimplemented}>
            <MessageSquare size={24} className="text-gray-400" />
            <span className="absolute -top-1 -right-1 bg-binance-yellow text-black text-[8px] font-bold px-1 rounded-full border border-[#0b0e11]">99+</span>
          </div>
        </div>
        <div className="flex bg-[#1e2329] p-0.5 rounded-lg">
          <button className="px-4 py-1 text-xs font-bold bg-[#2b3139] rounded-md text-white shadow-sm">Exchange</button>
          <button className="px-4 py-1 text-xs font-bold text-gray-500" onClick={onUnimplemented}>Wallet</button>
        </div>
        <div className="flex items-center gap-4 text-gray-400">
          <Headphones size={22} onClick={onUnimplemented} />
          <QrCode size={22} onClick={onUnimplemented} />
        </div>
      </div>

      {/* Ticker Banner */}
      <div className="px-4 flex items-center gap-2 text-[10px] text-gray-400 py-1 cursor-pointer" onClick={onUnimplemented}>
        <span className="text-binance-yellow">🔥</span>
        <span className="font-medium">COTI</span>
        <div className="flex-1"></div>
        <Search size={14} />
      </div>

      {/* Balance Area */}
      <div className="px-4 py-4 flex justify-between items-start">
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-[11px] text-gray-400">
            <span>Est. Total Value(USDT)</span>
            <ChevronUp size={14} />
          </div>
          <h2 className="text-3xl font-bold tracking-tight">{TOTAL_BALANCE_USDT.toFixed(3)}</h2>
          <p className="text-xs text-gray-500 font-medium tracking-wide">≈Rs{pkrValue.toLocaleString('en-PK', { minimumFractionDigits: 2 })}</p>
          <div className="flex items-center gap-1 text-[10px] text-green-500 font-medium pt-1">
            <span>Today's PNL +0.00059206 USDT (+0.17%)</span>
            <ChevronDown size={12} />
          </div>
        </div>
        <button
          onClick={() => onNavigate('p2p')}
          className="bg-binance-yellow text-black font-bold px-4 py-2 rounded-lg text-sm"
        >
          Add Funds
        </button>
      </div>

      {/* Journey Banner */}
      <div className="px-4 py-2">
        <div
          className="bg-[#1e2329] rounded-xl p-4 flex items-center justify-between relative overflow-hidden border border-gray-800 cursor-pointer"
          onClick={onUnimplemented}
        >
          <div className="z-10">
            <p className="text-[10px] text-gray-500 mb-1">#2025withBinance</p>
            <div className="flex gap-2">
              <span className="text-binance-yellow text-2xl font-bold">20</span>
              <span className="text-white text-sm font-bold leading-tight">Welcome to Your Crypto Space<br />Journey</span>
            </div>
            <span className="text-binance-yellow text-2xl font-bold">25</span>
          </div>
          <button className="z-10 bg-[#2b3139] px-4 py-1.5 rounded-lg text-xs font-bold text-white">Open</button>
          <XMarkIcon className="absolute top-2 right-2 text-gray-600" size={14} />
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-2 left-1/2 w-1 h-1 bg-white rounded-full"></div>
            <div className="absolute bottom-4 left-1/4 w-0.5 h-0.5 bg-white rounded-full"></div>
          </div>
        </div>
        <div className="flex justify-center gap-1 mt-2">
          <div className="w-4 h-1 bg-white rounded-full"></div>
          <div className="w-1 h-1 bg-gray-700 rounded-full"></div>
          <div className="w-1 h-1 bg-gray-700 rounded-full"></div>
        </div>
      </div>

      {/* Market Cards */}
      <div className="grid grid-cols-2 gap-3 px-4 py-4">
        <MarketCard symbol="BNB" price="885.33" change="- 0.01%" color="text-red-500" onClick={onUnimplemented} />
        <MarketCard symbol="SOL" price="127.82" change="- 0.65%" color="text-red-500" onClick={onUnimplemented} />
      </div>

      {/* Feed Tabs */}
      <div className="flex items-center justify-between px-4 border-b border-gray-900 pb-2">
        <div className="flex gap-6 overflow-x-auto scrollbar-hide text-xs font-bold">
          <span className="text-white border-b-2 border-binance-yellow pb-2">Discover</span>
          <span className="text-gray-500 cursor-pointer" onClick={onUnimplemented}>Following</span>
          <span className="text-gray-500 cursor-pointer" onClick={onUnimplemented}>Campaign</span>
          <span className="text-gray-500 cursor-pointer" onClick={onUnimplemented}>Announcement</span>
        </div>
        <Menu size={18} className="text-gray-600 cursor-pointer" onClick={onUnimplemented} />
      </div>

      {/* Trending Stream */}
      <div className="px-4 py-4">
        <div
          className="bg-[#6c47ff]/20 rounded-xl p-3 border border-[#6c47ff]/40 flex items-center gap-3 cursor-pointer"
          onClick={onUnimplemented}
        >
          <div className="relative">
            <img src="https://picsum.photos/seed/live/64/64" className="w-10 h-10 rounded-full border border-white/20" alt="avatar" />
            <div className="absolute -bottom-1 -right-1 bg-red-500 p-0.5 rounded-full border border-[#0b0e11]">
              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
            </div>
          </div>
          <div className="flex-1">
            <p className="text-[10px] text-[#6c47ff] font-bold">محترف عملات @ ...</p>
            <p className="text-xs font-bold text-white">This livestream is trending</p>
          </div>
          <div className="flex items-end gap-0.5 h-4">
            <div className="w-0.5 h-2 bg-white animate-[bounce_1s_infinite]"></div>
            <div className="w-0.5 h-4 bg-white animate-[bounce_1.2s_infinite]"></div>
            <div className="w-0.5 h-3 bg-white animate-[bounce_0.8s_infinite]"></div>
          </div>
        </div>
      </div>

      {/* News Feed Item */}
      <div className="px-4 py-2 space-y-2 cursor-pointer" onClick={onUnimplemented}>
        <div className="flex items-center gap-2">
          <img src="https://picsum.photos/seed/user1/48/48" className="w-6 h-6 rounded-full" alt="wendy" />
          <span className="text-xs font-bold">Wendyy_</span>
          <img src="https://img.icons8.com/color/48/verified-badge.png" className="w-4 h-4" />
          <span className="text-[10px] text-gray-500">31m</span>
        </div>
        <h3 className="font-bold text-sm leading-snug">
          $BTC U.S. SENATE JUST PUSHED CRYPTO INTO REAL LEGISLATION 🚨
        </h3>
        <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
          Washington just crossed a line — and there is no going back. Crypto is now officially part of the US legal framework...
        </p>
      </div>
    </div>
  );
};

const MarketCard = ({ symbol, price, change, color, onClick }: { symbol: string, price: string, change: string, color: string, onClick?: () => void }) => (
  <div className="bg-[#1e2329] p-4 rounded-xl space-y-3 border border-gray-800 cursor-pointer" onClick={onClick}>
    <div className="flex items-center gap-2">
      <div className="w-5 h-5 bg-[#2b3139] rounded-full flex items-center justify-center p-0.5">
        <img src={symbol === 'BNB' ? "https://cryptologos.cc/logos/binance-coin-bnb-logo.png" : "https://cryptologos.cc/logos/solana-sol-logo.png"} className="w-full h-full" alt={symbol} />
      </div>
      <span className="text-xs font-bold text-gray-400">{symbol}</span>
    </div>
    <div>
      <p className="text-lg font-bold">{price}</p>
      <p className={`text-[10px] font-bold ${color}`}>▼ {change.replace('- ', '')}</p>
    </div>
    <div className="h-6 w-full flex items-end">
      <svg viewBox="0 0 100 20" className="w-full h-full stroke-red-500 fill-red-500/10">
        <path d="M0,15 L10,18 L20,12 L30,16 L40,14 L50,18 L60,10 L70,12 L80,5 L90,15 L100,10" fill="none" strokeWidth="1.5" />
        <path d="M0,15 L10,18 L20,12 L30,16 L40,14 L50,18 L60,10 L70,12 L80,5 L90,15 L100,10 L100,20 L0,20 Z" stroke="none" />
      </svg>
    </div>
  </div>
);

const XMarkIcon = ({ className, size }: { className?: string, size: number }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export default Home;
