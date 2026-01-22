
import React from 'react';
import { Page } from '../types';
import { USER_NAME } from '../constants';
import { ArrowLeft, Scan, Headphones, Info, ChevronRight, BadgeCheck, Users, Gift, LayoutGrid, BarChart3, Repeat, Pencil, ListTodo, LogOut, Settings, Shield, BookOpen, Clock, Calendar, Heart } from 'lucide-react';

interface ProfileProps {
  onNavigate: (page: Page) => void;
  onLogout: () => void;
  onUnimplemented: () => void;
}

const Profile: React.FC<ProfileProps> = ({ onNavigate, onLogout, onUnimplemented }) => {
  return (
    <div className="flex flex-col min-h-screen bg-[#0b0e11] animate-in fade-in duration-300">
      {/* Top Buttons */}
      <div className="flex items-center justify-between p-4">
        <button onClick={() => onNavigate('home')}><ArrowLeft size={24} /></button>
        <div className="flex items-center gap-5 text-gray-400">
          <Scan size={24} onClick={onUnimplemented} />
          <Headphones size={24} onClick={onUnimplemented} />
          <Settings size={24} onClick={onUnimplemented} />
        </div>
      </div>

      <div className="px-4 py-2 space-y-6">
        {/* Banner Alert */}
        <div 
          className="bg-[#2b3139] rounded-xl p-3 flex items-center justify-between border border-gray-800 cursor-pointer"
          onClick={onUnimplemented}
        >
           <div className="flex items-center gap-3">
              <div className="bg-gray-700/50 p-1.5 rounded-full border border-gray-600"><Info size={16} className="text-gray-400" /></div>
              <span className="text-xs text-gray-300 font-medium tracking-tight">Your account has been logged in on another device.</span>
           </div>
           <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <ChevronRight size={16} className="text-gray-500" />
           </div>
        </div>

        {/* User Card */}
        <div className="flex items-center justify-between py-2 cursor-pointer" onClick={onUnimplemented}>
           <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-gray-800 shadow-xl">
                 <img src="https://picsum.photos/seed/hammad/128/128" alt="profile" />
              </div>
              <div className="space-y-1">
                 <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">ID: 307256118</p>
                 <h3 className="text-xl font-bold tracking-tight">Pakistani Hammad</h3>
                 <div className="flex gap-2">
                    <span className="bg-[#2b3139] text-gray-400 text-[10px] px-2 py-0.5 rounded-md font-bold">Regular</span>
                    <span className="bg-[#1e2329] text-green-500 text-[10px] px-2 py-0.5 rounded-md border border-green-500/20 font-bold">Verified</span>
                 </div>
              </div>
           </div>
           <ChevronRight size={24} className="text-gray-600" />
        </div>

        {/* Shortcuts */}
        <div className="space-y-4 pt-4">
           <h4 className="text-sm font-bold text-gray-200">Shortcut</h4>
           <div className="grid grid-cols-4 gap-y-6 gap-x-2 text-center">
              <ShortcutItem icon={<Users size={22} />} label="Referral" onClick={onUnimplemented} />
              <ShortcutItem icon={<Gift size={22} />} label="Rewards Hub" onClick={onUnimplemented} />
              <ShortcutItem icon={<SmartphoneIcon size={22} />} label="Square" onClick={onUnimplemented} />
              <ShortcutItem icon={<BookOpen size={22} />} label="Word of the Day" onClick={onUnimplemented} />
              <ShortcutItem icon={<Repeat size={22} />} label="Copy Trading" onClick={onUnimplemented} />
              <ShortcutItem icon={<LayoutGrid size={22} />} label="Megadrop" onClick={onUnimplemented} />
              <ShortcutItem icon={<BadgeCheck size={22} />} label="P2P" onClick={() => onNavigate('p2p')} />
              <ShortcutItem icon={<Pencil size={22} />} label="Edit" onClick={onUnimplemented} />
           </div>
        </div>

        {/* Recommended */}
        <div className="space-y-4 pt-6">
           <h4 className="text-sm font-bold text-gray-200">Recommend</h4>
           <div className="grid grid-cols-4 gap-y-6 gap-x-2 text-center">
              <ShortcutItem icon={<Clock size={22} />} label="Simple Earn" onClick={onUnimplemented} />
              <ShortcutItem icon={<span className="text-xs font-bold leading-none">20<br/>25</span>} label="Year in Review" onClick={onUnimplemented} />
              <ShortcutItem icon={<Users size={22} />} label="Referral" onClick={onUnimplemented} />
              <ShortcutItem icon={<Calendar size={22} />} label="Alpha Events" onClick={onUnimplemented} />
              <ShortcutItem icon={<BadgeCheck size={22} />} label="P2P" onClick={() => onNavigate('p2p')} />
              <ShortcutItem icon={<SmartphoneIcon size={22} />} label="Square" onClick={onUnimplemented} />
           </div>
        </div>

        <button 
          onClick={onUnimplemented}
          className="w-full bg-[#1e2329] py-4 rounded-xl font-bold text-sm text-gray-300 mt-6 border border-gray-800 active:bg-gray-800 transition-colors"
        >
           More Services
        </button>

        <div className="pt-8 pb-10">
           <div 
            className="flex items-center justify-between p-4 bg-[#1e2329]/50 rounded-xl border border-gray-800 cursor-pointer"
            onClick={onUnimplemented}
           >
              <div className="flex items-center gap-3">
                 <img src="https://cryptologos.cc/logos/binance-coin-bnb-logo.png" className="w-5 h-5" />
                 <span className="font-bold text-sm">BINANCE <span className="text-binance-yellow">Lite</span></span>
              </div>
              <ChevronRight size={20} className="text-gray-600" />
           </div>
        </div>

        <button onClick={onLogout} className="flex items-center gap-2 text-red-500 font-bold mx-auto pb-10">
           <LogOut size={18} /> Logout
        </button>
      </div>
    </div>
  );
};

const ShortcutItem = ({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick?: () => void }) => (
  <div className="space-y-2 flex flex-col items-center group active:scale-95 transition-transform cursor-pointer" onClick={onClick}>
    <div className="w-12 h-12 bg-[#1e2329] rounded-xl flex items-center justify-center text-gray-300 border border-gray-800 shadow-sm group-active:bg-gray-800">
      {icon}
    </div>
    <span className="text-[10px] text-gray-400 font-bold leading-tight">{label}</span>
  </div>
);

const SmartphoneIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><path d="M12 18h.01"></path></svg>
);

export default Profile;
