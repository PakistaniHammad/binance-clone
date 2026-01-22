
import React, { useState } from 'react';
import { Page } from '../types';
import { CRYPTO_ASSETS, EXCHANGE_RATE_BUY, TOTAL_BALANCE_USDT } from '../constants';
import { ArrowLeft, Search, History, HelpCircle, Scan, Trash2, Info, ChevronDown, X, UserCircle } from 'lucide-react';

interface SendFlowProps {
  onNavigate: (page: Page) => void;
}

const SendFlow: React.FC<SendFlowProps> = ({ onNavigate }) => {
  const [step, setStep] = useState<'select' | 'details' | 'network'>('select');
  const [amount, setAmount] = useState(TOTAL_BALANCE_USDT.toFixed(8));
  const [network, setNetwork] = useState('BSC BNB Smart Chain (BEP20)');
  const [address, setAddress] = useState('0xf077d476c1c7253ef5008ec2c89f4d6fd45379c5');
  const [showError, setShowError] = useState(false);

  const pkrValue = parseFloat(amount) * EXCHANGE_RATE_BUY || 0;

  const handleWithdraw = () => {
    setShowError(true);
    setTimeout(() => setShowError(false), 4000);
  };

  if (step === 'select') {
    return (
      <div className="flex flex-col min-h-screen bg-[#0b0e11] pb-24">
        <div className="flex items-center p-4">
          <button onClick={() => onNavigate('assets')}>
            <ArrowLeft size={24} />
          </button>
          <h2 className="flex-1 text-center font-bold text-lg mr-6">Select Coin</h2>
        </div>

        <div className="p-4 space-y-6">
          <div className="bg-[#2b3139] rounded-md px-4 py-2 flex items-center gap-2">
            <Search size={18} className="text-gray-400" />
            <input type="text" placeholder="Search Coins" className="bg-transparent border-none focus:ring-0 text-sm flex-1 outline-none" />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-bold">Search History</h4>
              <Trash2 size={16} className="text-gray-500" />
            </div>
            <div className="inline-block bg-[#1e2329] px-4 py-1.5 rounded-full text-xs font-medium">USDT</div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-bold text-gray-400">Coin List</h4>
              <button className="text-gray-500"><History size={16} /></button>
            </div>

            <div className="space-y-6">
              {CRYPTO_ASSETS.map(coin => (
                <div key={coin.symbol} onClick={() => setStep('details')} className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-3">
                    <img src={coin.icon} className="w-8 h-8 rounded-full" alt={coin.symbol} />
                    <div>
                      <h4 className="font-bold">{coin.symbol}</h4>
                      <p className="text-[10px] text-gray-500">{coin.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{coin.symbol === 'USDT' ? TOTAL_BALANCE_USDT.toFixed(8) : coin.balance.toFixed(8)}</p>
                    <p className="text-[10px] text-gray-500">≈ Rs{( (coin.symbol === 'USDT' ? TOTAL_BALANCE_USDT : coin.balance) * EXCHANGE_RATE_BUY).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#0b0e11] relative overflow-x-hidden">
      {/* Scrollable area with huge bottom padding to prevent footer overlap */}
      <div className="flex-1 overflow-y-auto pb-[320px]">
        {/* Fake Withdraw Error Alert */}
        {showError && (
          <div className="fixed top-20 left-4 right-4 bg-red-600 text-white p-4 rounded-xl z-[200] flex items-center gap-3 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
            <X size={20} className="shrink-0" />
            <p className="text-xs font-bold leading-tight">Please verify your identity to proceed with this transaction.</p>
          </div>
        )}

        <div className="flex items-center justify-between p-4">
          <button onClick={() => setStep('select')}>
            <ArrowLeft size={24} />
          </button>
          <div className="text-center">
             <h2 className="font-bold text-lg leading-tight">Send USDT</h2>
             <p className="text-[10px] text-gray-500">One Time ⌵</p>
          </div>
          <div className="flex items-center gap-4 text-gray-400">
            <HelpCircle size={20} />
            <History size={20} />
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Address Field */}
          <div className="space-y-2">
            <p className="text-xs text-gray-500 font-medium">Address</p>
            <div className="bg-[#1e2329] rounded-xl p-4 flex flex-col gap-2 border border-gray-800 focus-within:border-binance-yellow transition-colors">
              <textarea 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Long press to paste"
                className="bg-transparent text-sm font-bold text-white resize-none outline-none min-h-[50px] tracking-wide"
              />
              <div className="flex justify-end gap-5 text-gray-500">
                 <UserCircle size={22} className="cursor-pointer active:text-white" />
                 <Scan size={22} className="cursor-pointer active:text-white" />
              </div>
            </div>
          </div>

          {/* Network Field */}
          <div className="space-y-2">
            <div className="flex items-center gap-1 text-xs text-gray-500 font-medium">
              <span>Network</span>
              <Info size={12} />
            </div>
            <button 
              onClick={() => setStep('network')}
              className="w-full bg-[#1e2329] rounded-xl p-4 flex items-center justify-between border border-gray-800"
            >
              <span className="text-sm font-bold">{network}</span>
              <ChevronDown size={18} className="text-gray-500" />
            </button>
            
            <div className="bg-[#2b3139]/30 p-4 rounded-xl border border-gray-800/50 space-y-2">
               <p className="text-[11px] text-purple-400 leading-relaxed font-medium">The network you have selected is BSC. Please ensure that the withdrawal address supports the BNB Smart Chain network. You will potentially lose your assets if the chosen platform does not support refunds of wrongfully deposited assets.</p>
               <p className="text-xs text-binance-yellow underline font-bold cursor-pointer">BSC Network Verification</p>
            </div>
          </div>

          {/* Amount Field */}
          <div className="space-y-2">
            <div className="flex items-center gap-1 text-xs text-gray-500 font-medium">
              <span>Withdrawal Amount</span>
              <Info size={12} />
            </div>
            <div className="bg-[#1e2329] rounded-xl p-4 space-y-3 border border-gray-800 overflow-hidden">
              <div className="flex items-center justify-between gap-3">
                <input 
                  type="text" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ''))}
                  className="bg-transparent text-2xl font-bold flex-1 outline-none min-w-0" 
                />
                <div className="flex items-center gap-3 shrink-0">
                  <X size={20} className="text-gray-500 cursor-pointer active:scale-90" onClick={() => setAmount('')} />
                  <div className="h-4 w-[1px] bg-gray-700"></div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-gray-300">USDT</span>
                    <button 
                      onClick={() => setAmount(TOTAL_BALANCE_USDT.toFixed(8))}
                      className="text-xs font-bold text-binance-yellow active:scale-95"
                    >
                      Max
                    </button>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-800 pt-3">
                 <p className="text-xs text-gray-400 font-medium tracking-wide">≈ {pkrValue.toLocaleString('en-PK', { maximumFractionDigits: 2 })} PKR</p>
              </div>
            </div>
            <div className="flex justify-between text-xs px-1">
               <span className="text-gray-500 font-medium tracking-tight">Available</span>
               <span className="text-gray-200 font-bold">{TOTAL_BALANCE_USDT.toFixed(8)} USDT</span>
            </div>
          </div>

          <div className="text-[11px] text-gray-500 space-y-3 pt-4 px-1 leading-relaxed">
             <p className="font-bold text-gray-400 flex items-center gap-1 tracking-wide">* Contract Information ***97955 <HelpCircle size={12} /></p>
             <p className="font-medium">• Do not withdraw directly to a crowdfund or ICO. We will not credit your account with tokens from that sale.</p>
             <p className="font-medium">• Do not transact with Sanctioned Entities. <span className="text-binance-yellow font-bold underline cursor-pointer">Learn more</span></p>
          </div>
        </div>
      </div>

      {/* Footer Panel - FIXED ABOVE BOTTOM NAV */}
      <div className="fixed bottom-[74px] left-0 right-0 bg-[#0b0e11] border-t border-gray-900 p-4 max-w-md mx-auto z-40 shadow-[0_-15px_40px_rgba(0,0,0,0.8)]">
         <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-400 font-medium">Receive amount</span>
            <span className="font-bold text-xl leading-none">{(parseFloat(amount) - 0.01).toFixed(8)} <span className="text-sm font-bold text-gray-400 ml-1">USDT</span></span>
         </div>
         <div className="flex items-center justify-between text-[11px] mb-4">
            <span className="text-gray-500 font-medium">Network fee</span>
            <span className="text-gray-300 font-bold">0.01 USDT</span>
         </div>
         <button 
          onClick={handleWithdraw}
          className="w-full bg-binance-yellow text-black font-black py-4 rounded-xl active:scale-[0.98] transition-all text-lg shadow-xl shadow-yellow-500/10"
         >
            Withdraw
         </button>
      </div>

      {/* Bottom bar space filler at absolute bottom */}
      <div className="fixed bottom-0 left-0 right-0 h-[74px] bg-[#181a20] z-30"></div>

      {/* Network Modal */}
      {step === 'network' && (
        <div className="fixed inset-0 bg-black/80 z-[210] flex flex-col justify-end" onClick={() => setStep('details')}>
           <div className="bg-[#1e2329] rounded-t-[32px] p-6 space-y-6 animate-in slide-in-from-bottom duration-300 max-h-[85%] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
              <div className="w-12 h-1.5 bg-gray-700 rounded-full mx-auto mb-2 opacity-40"></div>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">Choose Network</h3>
                <button onClick={() => setStep('details')} className="text-gray-500 active:text-white p-1"><X size={26} /></button>
              </div>

              <div className="space-y-4">
                 {[
                   { name: 'BSC BNB Smart Chain (BEP20)', fee: '0.01', pkrFee: '2.80', arrival: '1 mins' },
                   { name: 'OPBNB opBNB', fee: '0.015', pkrFee: '4.20', arrival: '1 mins' },
                   { name: 'ETH Ethereum (ERC20)', fee: '0.23', pkrFee: '64.34', arrival: '2 mins' },
                   { name: 'PLASMA Plasma', fee: '0.012', pkrFee: '3.36', arrival: '1 mins' },
                 ].map((net) => (
                   <button 
                    key={net.name}
                    onClick={() => { setNetwork(net.name); setStep('details'); }}
                    className={`w-full text-left p-5 rounded-2xl border transition-all active:scale-[0.99] active:bg-gray-800 ${network === net.name ? 'border-binance-yellow bg-[#2b3139]' : 'border-gray-800 bg-[#181a20]'}`}
                   >
                     <div className="flex justify-between items-start mb-2">
                       <p className="font-bold text-sm leading-tight max-w-[70%]">{net.name}</p>
                       <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${network === net.name ? 'border-binance-yellow' : 'border-gray-700'}`}>
                         {network === net.name && <div className="w-2 h-2 bg-binance-yellow rounded-full"></div>}
                       </div>
                     </div>
                     <p className="text-xs text-gray-400 font-bold mb-1">Fee {net.fee} USDT (≈ Rs{net.pkrFee})</p>
                     <div className="flex items-center gap-4 mt-2">
                       <p className="text-[10px] text-gray-500 font-medium">Min withdrawal 10 USDT</p>
                       <p className="text-[10px] text-gray-500 font-medium">Arrival time ≈ {net.arrival}</p>
                     </div>
                   </button>
                 ))}
              </div>

              <div className="bg-yellow-500/5 p-4 rounded-2xl border border-yellow-500/10 flex gap-3">
                 <Info size={18} className="text-binance-yellow shrink-0 mt-0.5" />
                 <p className="text-[11px] text-gray-400 leading-relaxed font-medium">Ensure the network matches the withdrawal address and the deposit platform support it. Using the wrong network will result in permanent loss of assets.</p>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default SendFlow;
