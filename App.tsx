
import React, { useState, useEffect } from 'react';
import { Page } from './types';
import Home from './pages/Home';
import Assets from './pages/Assets';
import Profile from './pages/Profile';
import P2P from './pages/P2P';
import SendFlow from './pages/SendFlow';
import { Home as HomeIcon, BarChart2, Repeat, TrendingUp, Wallet, Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoadingStuck, setIsLoadingStuck] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('home');
  };

  const triggerStuckLoading = () => {
    setIsLoadingStuck(true);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home onNavigate={setCurrentPage} onUnimplemented={triggerStuckLoading} />;
      case 'assets': return <Assets onNavigate={setCurrentPage} />;
      case 'profile': return <Profile onNavigate={setCurrentPage} onLogout={handleLogout} onUnimplemented={triggerStuckLoading} />;
      case 'p2p': return <P2P onNavigate={setCurrentPage} />;
      case 'send': return <SendFlow onNavigate={setCurrentPage} />;
      default: return <Home onNavigate={setCurrentPage} onUnimplemented={triggerStuckLoading} />;
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#0b0e11] p-8 text-center">
        <div className="absolute top-0 left-0 right-0 bg-[#181a20] py-2 text-[10px] text-red-500 font-bold border-b border-gray-800 uppercase tracking-widest">
          THIS IS FAKE UI OF BINANCE
        </div>
        <img src="https://cryptologos.cc/logos/binance-coin-bnb-logo.png" className="w-20 h-20 mb-10 shadow-2xl shadow-yellow-500/20" alt="Binance" />
        <h1 className="text-3xl font-bold mb-4 text-[#eaecef]">Welcome to Binance</h1>
        <p className="text-gray-400 mb-10 max-w-xs text-sm leading-relaxed">
          The world's leading cryptocurrency exchange at your fingertips.
        </p>
        <button 
          onClick={handleLogin}
          className="w-full max-w-sm bg-binance-yellow text-black font-bold py-4 rounded-xl mb-4 transition-all active:scale-[0.98] shadow-lg shadow-yellow-500/10 text-lg"
        >
          Log In
        </button>
        <p className="text-gray-500 text-xs mt-4">Demo account: Khalid</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#0b0e11] text-[#eaecef] max-w-md mx-auto relative overflow-hidden font-['Inter'] shadow-2xl">
      {/* Stuck Loader Overlay */}
      {isLoadingStuck && (
        <div className="fixed inset-0 bg-[#0b0e11]/90 z-[200] flex flex-col items-center justify-center p-6 text-center">
           <Loader2 size={48} className="text-binance-yellow animate-spin mb-4" />
           <h3 className="text-lg font-bold">Synchronizing Data...</h3>
           <p className="text-gray-500 text-sm mt-2">Connecting to the global exchange network. This may take a few moments.</p>
           <button 
            onClick={() => setIsLoadingStuck(false)} 
            className="mt-8 text-xs text-gray-600 underline"
           >
             Cancel (Demo Mode)
           </button>
        </div>
      )}

      {/* Required Fake UI Disclaimer Header */}
      <div className="bg-[#181a20] py-1.5 px-4 text-center text-[10px] text-red-500 font-black border-b border-gray-800 sticky top-0 z-[100] tracking-wider uppercase">
        THIS IS FAKE UI OF BINANCE
      </div>

      {/* Main Page Content */}
      <main className="flex-1 overflow-y-auto scrollbar-hide pb-20">
        {renderPage()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#181a20] border-t border-gray-800 flex justify-around items-center pt-2.5 pb-6 max-w-md mx-auto z-50 px-2 shadow-[0_-5px_25px_rgba(0,0,0,0.6)]">
        <button onClick={() => setCurrentPage('home')} className={`flex-1 flex flex-col items-center gap-1.5 transition-colors ${currentPage === 'home' ? 'text-binance-yellow' : 'text-gray-500'}`}>
          <HomeIcon size={22} strokeWidth={currentPage === 'home' ? 2.5 : 2} />
          <span className="text-[10px] font-bold">Home</span>
        </button>
        <button onClick={triggerStuckLoading} className={`flex-1 flex flex-col items-center gap-1.5 transition-colors ${currentPage === 'markets' ? 'text-binance-yellow' : 'text-gray-500'}`}>
          <BarChart2 size={22} strokeWidth={currentPage === 'markets' ? 2.5 : 2} />
          <span className="text-[10px] font-bold">Markets</span>
        </button>
        <button onClick={triggerStuckLoading} className={`flex-1 flex flex-col items-center gap-1.5 transition-colors ${currentPage === 'trade' ? 'text-binance-yellow' : 'text-gray-500'}`}>
          <Repeat size={22} strokeWidth={currentPage === 'trade' ? 2.5 : 2} />
          <span className="text-[10px] font-bold">Trade</span>
        </button>
        <button onClick={triggerStuckLoading} className={`flex-1 flex flex-col items-center gap-1.5 transition-colors ${currentPage === 'futures' ? 'text-binance-yellow' : 'text-gray-500'}`}>
          <TrendingUp size={22} strokeWidth={currentPage === 'futures' ? 2.5 : 2} />
          <span className="text-[10px] font-bold">Futures</span>
        </button>
        <button onClick={() => setCurrentPage('assets')} className={`flex-1 flex flex-col items-center gap-1.5 transition-colors ${currentPage === 'assets' ? 'text-binance-yellow' : 'text-gray-500'}`}>
          <Wallet size={22} strokeWidth={currentPage === 'assets' ? 2.5 : 2} />
          <span className="text-[10px] font-bold">Assets</span>
        </button>
      </nav>
    </div>
  );
};

export default App;
