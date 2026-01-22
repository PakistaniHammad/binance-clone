
import React, { useState } from 'react';
import { Page } from '../types';
import { TOTAL_BALANCE_USDT, EXCHANGE_RATE_BUY, CRYPTO_ASSETS } from '../constants';
import { Eye, ChevronDown, Search, Filter, Copy, Share2, Wallet, Users, LayoutGrid, Smartphone, Mail, Phone, ArrowUpRight, ArrowDownLeft, Repeat } from 'lucide-react';

interface AssetsProps {
  onNavigate: (page: Page) => void;
}

const Assets: React.FC<AssetsProps> = ({ onNavigate }) => {
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const pkrValue = TOTAL_BALANCE_USDT * EXCHANGE_RATE_BUY;

  return (
    <div className="flex flex-col min-h-screen bg-[#0b0e11] relative">
      {/* Tabs */}
      <div className="flex items-center gap-6 px-4 py-3 overflow-x-auto scrollbar-hide border-b border-gray-900 bg-[#0b0e11] sticky top-0 z-30">
        <button className="text-sm font-bold text-white whitespace-nowrap">Overview</button>
        <button className="text-sm font-bold text-gray-500 whitespace-nowrap">Spot</button>
        <button className="text-sm font-bold text-gray-500 whitespace-nowrap">Futures</button>
        <button className="text-sm font-bold text-gray-500 whitespace-nowrap">Earn</button>
        <button className="text-sm font-bold text-gray-500 whitespace-nowrap">Funding</button>
      </div>

      <div className="p-4 space-y-6">
        {/* Header Icons */}
        <div className="flex justify-end gap-5 text-gray-400">
          <ArrowUpRight size={22} className="rotate-45" />
          <Copy size={20} />
        </div>

        {/* Total Value Section */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[11px] text-gray-400">
            <span>Est. Total Value</span>
            <Eye size={16} />
          </div>
          <div className="flex items-baseline gap-2">
            <h2 className="text-3xl font-bold tracking-tight">{TOTAL_BALANCE_USDT.toFixed(8)}</h2>
            <span className="text-xs font-bold text-gray-200">USDT ⌵</span>
          </div>
          <p className="text-xs text-gray-500 font-medium">≈Rs{pkrValue.toLocaleString('en-PK', { minimumFractionDigits: 2 })}</p>
          <div className="flex items-center gap-1 text-[10px] text-green-500 font-medium pt-1">
            <span>Today's PNL +0.00059876 USDT (+0.17%)</span>
            <ChevronDown size={12} className="-rotate-90" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button 
            onClick={() => onNavigate('p2p')}
            className="flex-1 bg-binance-yellow text-black font-bold py-2.5 rounded-lg text-sm"
          >
            Add Funds
          </button>
          <button 
            onClick={() => setShowWithdrawModal(true)}
            className="flex-1 bg-[#2b3139] text-white font-bold py-2.5 rounded-lg text-sm"
          >
            Send
          </button>
          <button className="flex-1 bg-[#2b3139] text-white font-bold py-2.5 rounded-lg text-sm">
            Transfer
          </button>
        </div>

        {/* Assets List Filter */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex gap-6 border-b border-gray-900 flex-1">
            <button className="text-xs font-bold border-b-2 border-binance-yellow pb-2">Crypto</button>
            <button className="text-xs font-bold text-gray-500 pb-2">Account</button>
          </div>
          <div className="flex items-center gap-4 text-gray-500 pl-4 pb-2">
            <Search size={20} />
            <div className="relative">
              <Filter size={20} />
              <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-binance-yellow rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Coin List */}
        <div className="space-y-6 pt-2 pb-20">
          {CRYPTO_ASSETS.map((coin) => (
            <div key={coin.symbol} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                    <img src={coin.icon} className="w-5 h-5" alt={coin.symbol} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm tracking-tight">{coin.symbol}</h4>
                    <p className="text-[10px] text-gray-500 font-medium">{coin.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm tracking-tight">{coin.balance.toFixed(8)}</p>
                  <p className="text-[10px] text-gray-400 font-medium tracking-wide">
                    {coin.usdtValue.toFixed(8)} USDT
                  </p>
                </div>
              </div>
              
              {coin.pnl && (
                <div className="flex gap-10 px-11">
                  <div className="text-[9px] space-y-0.5">
                    <p className="text-gray-500 font-medium uppercase tracking-wider">Today's PNL</p>
                    <p className={coin.pnl.includes('+') ? 'text-green-500 font-bold' : 'text-red-500 font-bold'}>{coin.pnl}</p>
                  </div>
                  {coin.avgPrice && (
                    <div className="text-[9px] space-y-0.5">
                      <p className="text-gray-500 font-medium uppercase tracking-wider">Average Price</p>
                      <p className="text-gray-200 font-bold">{coin.avgPrice}</p>
                    </div>
                  )}
                </div>
              )}

              <div className="flex gap-2 pl-11">
                <button className="bg-[#2b3139] px-5 py-1.5 rounded-lg text-[10px] font-bold text-gray-300">Earn</button>
                <button className="bg-[#2b3139] px-5 py-1.5 rounded-lg text-[10px] font-bold text-gray-300">Trade</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Withdraw Modal Backdrop - Z-INDEX FIXED TO BE OVER BOTTOM BAR */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black/70 z-[100] flex items-end animate-in fade-in duration-200" onClick={() => setShowWithdrawModal(false)}>
          {/* Modal Content */}
          <div 
            className="w-full bg-[#1e2329] rounded-t-3xl p-6 space-y-6 animate-in slide-in-from-bottom duration-300 max-w-md mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-1.5 bg-gray-800 rounded-full mx-auto mb-2"></div>
            <h3 className="text-lg font-bold">Select Withdraw Method</h3>
            
            <div className="space-y-3">
              <button 
                onClick={() => { setShowWithdrawModal(false); onNavigate('send'); }}
                className="w-full bg-[#2b3139] p-4 rounded-xl flex items-center gap-4 text-left active:bg-gray-700 transition-colors"
              >
                <div className="text-gray-400"><Smartphone size={28} strokeWidth={1.5} /></div>
                <div>
                  <p className="font-bold text-sm">Send to Binance users</p>
                  <p className="text-[10px] text-gray-500">Binance internal transfer, send via Email/Phone/ID</p>
                </div>
              </button>

              <button 
                onClick={() => { setShowWithdrawModal(false); onNavigate('send'); }}
                className="w-full bg-[#2b3139] p-4 rounded-xl flex items-center gap-4 text-left active:bg-gray-700 transition-colors"
              >
                <div className="text-gray-400"><ArrowUpRight size={28} strokeWidth={1.5} /></div>
                <div>
                  <p className="font-bold text-sm">On-Chain Withdraw</p>
                  <p className="text-[10px] text-gray-500">Withdraw Crypto from Binance to other exchanges/wallets</p>
                </div>
              </button>

              <button 
                onClick={() => { setShowWithdrawModal(false); onNavigate('p2p'); }}
                className="w-full bg-[#2b3139] p-4 rounded-xl flex items-center gap-4 text-left active:bg-gray-700 transition-colors"
              >
                <div className="text-gray-400"><Users size={28} strokeWidth={1.5} /></div>
                <div>
                  <p className="font-bold text-sm">P2P Trading</p>
                  <p className="text-[10px] text-gray-500">Sell directly to users. Competitive pricing. Local payments</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Assets;
