import React from 'react';
import { useApp } from '../context/AppContext';
import { TabType } from '../types';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, cartTotalCount, selectedProduct } = useApp();

  // If viewing product detail, bottom nav is replaced by the product's sticky purchase bar
  if (selectedProduct) {
    return null;
  }

  const navItems: { key: TabType; label: string; icon: string }[] = [
    { key: 'home', label: '首页', icon: 'home' },
    { key: 'categories', label: '分类', icon: 'grid_view' },
    { key: 'discover', label: '发现', icon: 'local_fire_department' },
    { key: 'cart', label: '购物车', icon: 'shopping_cart' },
    { key: 'profile', label: '我的', icon: 'person' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 pb-safe bg-[#ffffff]/95 backdrop-blur-xl shadow-[0_-1px_10px_rgba(0,0,0,0.05)] border-t border-slate-100/80">
      <div className="h-14 px-2 max-w-md mx-auto flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = activeTab === item.key;
          return (
            <button
              key={item.key}
              onClick={() => {
                setActiveTab(item.key);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] transition-all relative ${
                isActive ? 'text-[#b22204] scale-105' : 'text-[#5b403b] hover:text-[#b22204]'
              }`}
            >
              <span 
                className={`material-symbols-outlined text-[24px] ${isActive ? 'font-bold' : ''}`}
                style={isActive && item.key === 'discover' ? { fontVariationSettings: "'FILL' 1" } : {}}
              >
                {item.icon}
              </span>
              <span className={`text-[11px] mt-0.5 ${isActive ? 'font-bold text-[#b22204]' : 'font-normal'}`}>
                {item.label}
              </span>

              {/* Cart Badge */}
              {item.key === 'cart' && cartTotalCount > 0 && (
                <span className="absolute top-1 right-2.5 min-w-[16px] h-4 px-1 rounded-full bg-[#b22204] text-white text-[10px] font-bold flex items-center justify-center shadow-sm animate-pulse">
                  {cartTotalCount > 99 ? '99+' : cartTotalCount}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
