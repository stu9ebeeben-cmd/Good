import React from 'react';
import { useApp } from '../context/AppContext';

export const Header: React.FC = () => {
  const { openSearch, openChat, setActiveTab, selectedProduct } = useApp();

  // If a product detail is open, the detail view has its own top nav
  if (selectedProduct) {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-safe bg-[#ffffff]/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-14 px-3 flex items-center gap-2 max-w-md mx-auto">
        {/* Mall Logo */}
        <div 
          onClick={() => setActiveTab('home')} 
          className="flex items-center justify-center w-10 h-10 text-[#b22204] cursor-pointer hover:scale-105 active:scale-95 transition-transform flex-shrink-0"
          title="聚惠商城首页"
        >
          <span className="material-symbols-outlined text-[26px]">local_mall</span>
        </div>

        {/* Search Shell */}
        <div 
          onClick={openSearch} 
          className="flex-1 h-10 bg-[#eff4ff] hover:bg-[#e6eeff] transition-colors rounded-full flex items-center px-3 gap-1.5 cursor-pointer shadow-inner"
        >
          <span className="material-symbols-outlined text-[#8f7069] text-[20px]">search</span>
          <span className="flex-1 text-[#8f7069] text-xs font-normal truncate select-none">
            爆款手机限时秒杀直降500元
          </span>
          <button 
            type="button"
            className="px-3 h-8 bg-[#b22204] text-white rounded-full text-[11px] font-semibold flex items-center justify-center hover:bg-[#d63c1e] active:scale-95 transition-all shadow-sm flex-shrink-0"
          >
            搜索
          </button>
        </div>

        {/* Chat / Message Button */}
        <button 
          onClick={openChat}
          className="w-10 h-10 flex items-center justify-center text-[#121c2a] hover:text-[#b22204] active:scale-95 transition-all relative flex-shrink-0"
          title="客服消息"
        >
          <span className="material-symbols-outlined text-[24px]">chat</span>
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#ba002c] ring-2 ring-white animate-pulse"></span>
        </button>

        {/* Profile Avatar Shortcut */}
        <button 
          onClick={() => setActiveTab('profile')}
          className="w-8 h-8 rounded-full bg-[#b22204] text-white flex items-center justify-center flex-shrink-0 hover:opacity-90 active:scale-95 transition-all shadow-sm"
          title="个人中心"
        >
          <span className="material-symbols-outlined text-white text-[18px]">person</span>
        </button>
      </div>
    </header>
  );
};
