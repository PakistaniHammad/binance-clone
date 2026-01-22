
import React, { useState, useEffect, useRef } from 'react';
import { Page } from '../types';
import { EXCHANGE_RATE_BUY, EXCHANGE_RATE_SELL, BUY_ORDERS, SELL_ORDERS, TOTAL_BALANCE_USDT } from '../constants';
import { ArrowLeft, ChevronDown, Filter, FileText, BadgeCheck, Clock, MessageSquare, Plus, Bell, ShieldCheck, HelpCircle, LayoutGrid, Repeat, X, Loader2 } from 'lucide-react';

interface P2PProps {
  onNavigate: (page: Page) => void;
}

const P2P: React.FC<P2PProps> = ({ onNavigate }) => {
  const [p2pTab, setP2PTab] = useState<'buy' | 'sell'>('buy');
  const [selectedAd, setSelectedAd] = useState<any>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const orders = p2pTab === 'buy' ? BUY_ORDERS : SELL_ORDERS;

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      if (!isLoadingMore) {
        setIsLoadingMore(true);
      }
    } else {
      if (scrollTop + clientHeight < scrollHeight - 200) {
        setIsLoadingMore(false);
      }
    }
  };

  if (selectedAd) {
    return <SellInputScreen ad={selectedAd} onBack={() => setSelectedAd(null)} />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#0b0e11] relative overflow-hidden">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-[#0b0e11] shadow-lg shadow-black/30">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('home')}>
              <ArrowLeft size={24} />
            </button>
            <div className="flex gap-6 font-bold text-sm">
              <span className="text-gray-500 font-medium">Express</span>
              <span className="text-white border-b-2 border-binance-yellow pb-1">P2P</span>
              <span className="text-gray-500 font-medium">Block Trade</span>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-[#1e2329] px-2 py-1 rounded">
            <span className="text-xs font-bold">PKR</span>
            <ChevronDown size={14} className="text-gray-500" />
          </div>
        </div>

        {/* Action Row */}
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex bg-[#1e2329] p-0.5 rounded-lg">
            <button 
              onClick={() => setP2PTab('buy')}
              className={`px-6 py-1.5 rounded-md text-xs font-bold transition-all ${p2pTab === 'buy' ? 'bg-[#2b3139] text-white shadow-sm' : 'text-gray-500'}`}
            >Buy</button>
            <button 
              onClick={() => setP2PTab('sell')}
              className={`px-6 py-1.5 rounded-md text-xs font-bold transition-all ${p2pTab === 'sell' ? 'bg-[#2b3139] text-white shadow-sm' : 'text-gray-500'}`}
            >Sell</button>
          </div>
          <div className="flex items-center gap-4 text-gray-400">
            <Plus size={22} className="text-binance-yellow" />
            <Bell size={22} />
            <Filter size={22} />
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex gap-3 px-4 py-3 overflow-x-auto scrollbar-hide text-[11px] font-bold text-gray-400 border-b border-gray-900/50">
          <div className="flex items-center gap-1 bg-[#1e2329] px-3 py-1.5 rounded-full whitespace-nowrap">
            <img src="https://cryptologos.cc/logos/tether-usdt-logo.png" className="w-3.5 h-3.5" />
            <span>USDT</span>
            <ChevronDown size={12} />
          </div>
          <div className="flex items-center gap-1 bg-[#1e2329] px-3 py-1.5 rounded-full whitespace-nowrap">
            <span>Amount</span>
            <ChevronDown size={12} />
          </div>
          <div className="flex items-center gap-1 bg-[#1e2329] px-3 py-1.5 rounded-full whitespace-nowrap">
            <span>Payment</span>
            <ChevronDown size={12} />
          </div>
        </div>
      </div>

      {/* Merchant List */}
      <div 
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto scrollbar-hide space-y-5 px-4 pt-4 pb-48"
      >
        {orders.map((order, idx) => (
          <div key={`${p2pTab}-${idx}`} className="space-y-3 cursor-pointer group" onClick={() => setSelectedAd(order)}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-gray-700 rounded-full flex items-center justify-center text-[10px] font-bold overflow-hidden border border-gray-600">
                  <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${order.merchant}`} alt="avatar" className="w-full h-full" />
                </div>
                <span className="text-xs font-bold text-white group-active:text-binance-yellow transition-colors">{order.merchant}</span>
                {idx % 3 === 0 ? <BadgeCheck size={14} className="text-binance-yellow" /> : <BadgeCheck size={14} className="text-gray-500" />}
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
                <span className="font-medium">Trade: {order.trades} Trades ({order.completion})</span>
                <span className="text-gray-800">|</span>
                <div className="flex items-center gap-1">
                   <div className="w-3 h-3 bg-gray-700 rounded-full flex items-center justify-center"><Plus size={8} /></div>
                   <span className="font-bold">99.13%</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-1">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Rs</span>
                <span className="text-2xl font-bold tracking-tighter">{order.price.toFixed(2)}</span>
                <span className="text-[10px] text-gray-500 font-bold">/USDT</span>
              </div>
              <div className="text-right">
                <div className="flex items-center justify-end gap-1.5">
                   <p className="text-[10px] text-gray-400 font-bold">{order.paymentMethods[0]}</p>
                   <div className="w-1.5 h-3 bg-purple-500 rounded-sm"></div>
                </div>
                <div className="flex items-center justify-end gap-1 text-[10px] text-gray-600 mt-1 font-bold">
                  <Clock size={10} />
                  <span>15 min</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-[10px] text-gray-500 font-bold tracking-tight uppercase">Limit {order.limitMin.toLocaleString()} - {order.limitMax.toLocaleString()} PKR</p>
                <p className="text-[10px] text-gray-400 font-bold tracking-tight">Available {order.available.toFixed(2)} USDT</p>
              </div>
              <button 
                className={`px-8 py-2 rounded-lg font-black text-sm tracking-wide shadow-lg active:scale-95 transition-all ${p2pTab === 'buy' ? 'bg-green-500 shadow-green-500/10' : 'bg-red-500 shadow-red-500/10'}`}
              >
                {p2pTab === 'buy' ? 'Buy' : 'Sell'}
              </button>
            </div>
            {idx < orders.length - 1 && <div className="h-[1px] bg-gray-900 mt-4 opacity-50"></div>}
          </div>
        ))}
        
        {isLoadingMore && (
          <div className="flex flex-col items-center justify-center py-10 text-gray-500 animate-in fade-in duration-500">
             <Loader2 size={24} className="animate-spin text-binance-yellow mb-2" />
             <p className="text-[10px] font-bold uppercase tracking-widest">Loading Market Data...</p>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-[#181a20] border-t border-gray-900 flex justify-around py-3 pb-8 max-w-md mx-auto z-40 shadow-[0_-5px_20px_rgba(0,0,0,0.5)]">
        <div className="flex flex-col items-center gap-1 text-binance-yellow cursor-pointer" onClick={() => onNavigate('home')}>
          <HomeIconComponent size={20} />
          <span className="text-[9px] font-bold uppercase tracking-tighter">Home</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-gray-500 cursor-not-allowed">
          <FileText size={20} />
          <span className="text-[9px] font-bold uppercase tracking-tighter">Orders</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-gray-500 cursor-not-allowed">
          <LayoutGrid size={20} />
          <span className="text-[9px] font-bold uppercase tracking-tighter">Ads</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-gray-500 cursor-not-allowed">
          <MessageSquare size={20} />
          <span className="text-[9px] font-bold uppercase tracking-tighter">Chat</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-gray-500 cursor-pointer" onClick={() => onNavigate('profile')}>
          <UserCircleComponent size={20} />
          <span className="text-[9px] font-bold uppercase tracking-tighter">Profile</span>
        </div>
      </div>
    </div>
  );
};

const SellInputScreen = ({ ad, onBack }: { ad: any, onBack: () => void }) => {
  const [amount, setAmount] = useState('110000');
  const [showError, setShowError] = useState(false);
  
  const pkrBalanceLimit = TOTAL_BALANCE_USDT * EXCHANGE_RATE_SELL;
  const isInsufficient = parseFloat(amount) > pkrBalanceLimit;
  const usdtValueToSell = parseFloat(amount) / EXCHANGE_RATE_SELL || 0;

  const handlePlaceOrder = () => {
    setShowError(true);
    setTimeout(() => setShowError(false), 4000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0b0e11] animate-in slide-in-from-right duration-300 relative overflow-hidden">
      {/* Fake Order Error Alert */}
      {showError && (
        <div className="fixed top-20 left-4 right-4 bg-red-600 text-white p-4 rounded-xl z-[200] flex items-center gap-3 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
          <X size={20} className="shrink-0" />
          <p className="text-xs font-bold leading-relaxed tracking-tight">Please verify your identity to place an order with this merchant.</p>
        </div>
      )}

      {/* Page Header */}
      <div className="flex items-center justify-between p-4">
        <button onClick={onBack} className="p-1 active:bg-gray-800 rounded-full transition-colors"><ArrowLeft size={24} /></button>
        <div className="flex items-center gap-2">
           <img src="https://cryptologos.cc/logos/tether-usdt-logo.png" className="w-5 h-5" />
           <span className="font-bold text-lg">Sell USDT</span>
        </div>
        <HelpCircle size={24} className="text-gray-400" />
      </div>

      {/* Price Ticker */}
      <div className="px-4 py-2 flex items-center justify-center gap-2 text-[10px]">
         <span className="text-gray-500 font-bold uppercase tracking-widest">Price Rs {ad.price.toFixed(2)}</span>
         <Repeat size={10} className="text-binance-yellow" />
         <span className="text-binance-yellow font-bold uppercase tracking-widest">Fluctuating</span>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto pb-[180px]">
        <div className="p-4 space-y-6">
          {/* Amount Box */}
          <div className="bg-[#1e2329] rounded-xl p-5 border border-gray-800 space-y-4 shadow-xl">
             <div className="flex gap-2 border-b-2 border-binance-yellow pb-1 w-fit">
                <span className="text-xs font-black text-white">By PKR</span>
             </div>
             
             <div className="flex items-center justify-between">
                <input 
                  type="text" 
                  value={amount} 
                  onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ''))}
                  className="bg-transparent text-4xl font-bold w-full outline-none tracking-tighter" 
                  autoFocus
                />
                <div className="flex items-center gap-3 shrink-0">
                   <X size={24} className="text-gray-500 cursor-pointer active:scale-90 transition-transform" onClick={() => setAmount('')} />
                   <span className="text-gray-500 font-black tracking-tight">PKR</span>
                   <span className="text-binance-yellow font-black tracking-tight cursor-pointer active:scale-95" onClick={() => setAmount(pkrBalanceLimit.toFixed(0))}>All</span>
                </div>
             </div>

             {isInsufficient && (
               <p className="text-[11px] text-red-500 font-black leading-snug">Insufficient balance. Please add funds to Funding Account.</p>
             )}
             
             <div className="flex items-center gap-1 text-[11px]">
                <span className="text-gray-500 font-black tracking-tight uppercase">Balance {pkrBalanceLimit.toLocaleString('en-PK', { maximumFractionDigits: 2 })} PKR</span>
                <div className="w-4 h-4 rounded-full border border-gray-600 flex items-center justify-center cursor-pointer active:bg-gray-700 ml-1" onClick={() => setAmount(pkrBalanceLimit.toFixed(0))}>
                  <Plus size={10} className="text-gray-400" />
                </div>
             </div>

             <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                <span className="text-sm font-black text-gray-300">You Sell {usdtValueToSell.toFixed(8)} USDT</span>
                <ChevronDown size={18} className="text-gray-500 -rotate-90" />
             </div>
          </div>

          {/* Payment Method */}
          <div className="bg-[#1e2329] rounded-xl p-4 flex items-center justify-between border border-gray-800 shadow-lg active:bg-gray-800 transition-colors cursor-pointer">
             <div className="flex items-center gap-3">
                <div className="w-1.5 h-4 bg-binance-yellow rounded-sm"></div>
                <span className="text-sm font-black text-white">Bank Transfer</span>
             </div>
             <div className="flex items-center gap-2">
                <span className="text-xs font-black text-gray-500">9990****7653</span>
                <ChevronDown size={18} className="text-gray-500 -rotate-90" />
             </div>
          </div>

          {/* Advertiser Info */}
          <div className="space-y-4 pt-4">
             <h4 className="text-xs font-black text-gray-500 uppercase tracking-widest pl-1">Advertiser's Info</h4>
             <div className="flex items-center justify-between p-4 bg-[#1e2329]/30 rounded-2xl border border-gray-800/50">
                <div className="flex items-center gap-2">
                   <span className="text-sm font-black text-white">{ad.merchant}</span>
                   <ShieldCheck size={16} className="text-binance-yellow" />
                </div>
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                   <span className="text-[11px] font-black text-gray-500 uppercase">Online</span>
                   <ChevronDown size={18} className="text-gray-500 -rotate-90" />
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Footer Panel - FIXED ABOVE GLOBAL NAVIGATION */}
      <div className="fixed bottom-[74px] left-0 right-0 p-4 bg-[#0b0e11] border-t border-gray-900 max-w-md mx-auto z-40 shadow-[0_-15px_40px_rgba(0,0,0,0.8)]">
         <button 
          onClick={handlePlaceOrder}
          disabled={!amount || parseFloat(amount) <= 0}
          className={`w-full font-black py-4 rounded-xl text-lg shadow-xl active:scale-[0.98] transition-all ${!amount || parseFloat(amount) <= 0 ? 'bg-gray-800 text-gray-600' : 'bg-red-500 text-white shadow-red-500/10'}`}
         >
            Place Order
         </button>
      </div>

      {/* Navigation Space Filler */}
      <div className="fixed bottom-0 left-0 right-0 h-[74px] bg-[#181a20] z-30"></div>
    </div>
  );
};

const HomeIconComponent = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L4 9v11a2 2 0 002 2h4v-7h4v7h4a2 2 0 002-2V9l-8-7z"/></svg>
);
const UserCircleComponent = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="3"/><path d="M7 20.662V19a2 2 0 012-2h6a2 2 0 012 2v1.662"/></svg>
);

export default P2P;
