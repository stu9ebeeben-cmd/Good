import React from 'react';
import { useApp } from '../../context/AppContext';
import { PRODUCTS } from '../../data/products';

export const BundleDrawer: React.FC = () => {
  const {
    isBundleOpen,
    closeBundle,
    selectedBundleIds,
    toggleBundleItem,
    checkoutBundle,
    openProductDetail,
  } = useApp();

  if (!isBundleOpen) return null;

  // Eligible products for 3 items for ¥19.9
  const bundleEligible = PRODUCTS.filter(
    (p) => p.isGroupBuy || p.price <= 15.8 || p.hotBadge === '9.9包邮'
  );

  const selectedCount = selectedBundleIds.length;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in">
      <div className="w-full max-w-md bg-white rounded-t-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#b22204] via-[#d63c1e] to-[#fda625] p-3 text-white flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="bg-[#ffddb9] text-[#2b1700] text-[10px] px-1.5 py-0.5 rounded font-bold">
                超值拼单
              </span>
              <h3 className="text-base font-bold">任选3件只需¥19.9</h3>
            </div>
            <p className="text-[11px] text-[#ffdad3] mt-0.5">
              已选 <strong className="text-white text-sm">{selectedCount}/3</strong> 件 · 满3件自动改价¥19.9全场包邮
            </p>
          </div>
          <button
            onClick={closeBundle}
            className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Selected Items Tray */}
        <div className="bg-[#eff4ff] p-2.5 flex items-center gap-2 border-b border-slate-100 overflow-x-auto no-scrollbar">
          {[0, 1, 2].map((slotIdx) => {
            const prodId = selectedBundleIds[slotIdx];
            const prod = prodId ? PRODUCTS.find((p) => p.id === prodId) : null;
            return (
              <div
                key={slotIdx}
                className={`flex-1 min-w-[90px] h-20 rounded-lg p-1 flex flex-col items-center justify-center relative border transition-all ${
                  prod
                    ? 'bg-white border-[#b22204] shadow-xs'
                    : 'border-dashed border-slate-300 bg-white/50 text-slate-400'
                }`}
              >
                {prod ? (
                  <>
                    <img
                      src={prod.image}
                      alt={prod.title}
                      className="w-10 h-10 object-cover rounded"
                    />
                    <span className="text-[9px] text-[#121c2a] truncate w-full text-center mt-1 font-medium">
                      {prod.subTitle || prod.title}
                    </span>
                    <button
                      onClick={() => toggleBundleItem(prod.id)}
                      className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#b22204] text-white flex items-center justify-center text-[10px]"
                    >
                      ×
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col items-center">
                    <span className="material-symbols-outlined text-[18px]">add_circle_outline</span>
                    <span className="text-[10px] mt-0.5">待选好物</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Scrollable list of items */}
        <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2.5">
          <div className="text-xs font-bold text-[#121c2a]">拼单特惠池（点击勾选加入组合）</div>
          <div className="grid grid-cols-2 gap-2">
            {bundleEligible.map((item) => {
              const isSelected = selectedBundleIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => toggleBundleItem(item.id)}
                  className={`rounded-xl p-2 flex flex-col justify-between cursor-pointer border transition-all relative ${
                    isSelected
                      ? 'border-[#b22204] bg-[#ffdad9]/30 shadow-xs'
                      : 'border-slate-100 bg-[#f8f9ff] hover:border-slate-200'
                  }`}
                >
                  <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-white mb-1.5">
                    <img className="w-full h-full object-cover" src={item.image} alt={item.title} />
                    {isSelected && (
                      <div className="absolute inset-0 bg-[#b22204]/20 flex items-center justify-center">
                        <div className="w-6 h-6 rounded-full bg-[#b22204] text-white flex items-center justify-center">
                          <span className="material-symbols-outlined text-[16px]">check</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="text-xs font-semibold text-[#121c2a] line-clamp-1">
                    {item.subTitle || item.title}
                  </div>
                  <div className="flex items-center justify-between mt-1 pt-0.5">
                    <div className="flex items-baseline">
                      <span className="text-[10px] text-[#b22204] font-bold">¥</span>
                      <span className="text-sm text-[#b22204] font-bold">6.63</span>
                      <span className="text-[9px] text-[#8f7069] line-through ml-1">
                        ¥{item.originalPrice}
                      </span>
                    </div>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                        isSelected
                          ? 'bg-[#b22204] text-white'
                          : 'bg-white border border-slate-200 text-[#121c2a]'
                      }`}
                    >
                      {isSelected ? '已选' : '选择'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Checkout Bar */}
        <div className="p-3 bg-white border-t border-slate-100 flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-baseline">
              <span className="text-xs text-[#121c2a]">3件拼单价:</span>
              <span className="text-xs font-bold text-[#b22204] ml-1">¥</span>
              <span className="text-xl font-bold text-[#b22204]">19.9</span>
            </div>
            <span className="text-[10px] text-[#8f7069]">包邮直达 · 正在火热成团中</span>
          </div>

          <button
            onClick={checkoutBundle}
            disabled={selectedCount < 3}
            className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all ${
              selectedCount >= 3
                ? 'bg-gradient-to-r from-[#d63c1e] to-[#b22204] text-white shadow-md active:scale-95 cursor-pointer'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            {selectedCount >= 3 ? '立即去拼单 ¥19.9' : `还差 ${3 - selectedCount} 件`}
          </button>
        </div>
      </div>
    </div>
  );
};
