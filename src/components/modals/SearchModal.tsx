import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PRODUCTS } from '../../data/products';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, closeSearch, searchHistory, clearSearchHistory, openProductDetail } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  if (!isSearchOpen) return null;

  const hotKeywords = [
    { rank: 1, term: '爆款手机限时秒杀直降500元', hot: true },
    { rank: 2, term: '四季全棉水洗棉四件套', hot: true },
    { rank: 3, term: '天天平价9.9包邮专区', hot: true },
    { rank: 4, term: '经典红油酸辣粉4桶' },
    { rank: 5, term: '冰丝凉感防晒衣UPF50+' },
    { rank: 6, term: '现摘多汁红富士苹果5斤' },
  ];

  const searchResults = searchTerm.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.title.includes(searchTerm) ||
          p.subTitle?.includes(searchTerm) ||
          p.category.includes(searchTerm) ||
          p.tags.some((t) => t.includes(searchTerm))
      )
    : [];

  const handleSelectKeyword = (keyword: string) => {
    setSearchTerm(keyword);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#f8f9ff] flex flex-col max-w-md mx-auto animate-in fade-in">
      {/* Top Search Header */}
      <div className="h-14 px-3 bg-white flex items-center gap-2 border-b border-slate-100 shadow-xs">
        <button
          onClick={closeSearch}
          className="w-9 h-9 flex items-center justify-center text-[#121c2a] hover:text-[#b22204]"
        >
          <span className="material-symbols-outlined text-[24px]">arrow_back</span>
        </button>

        <div className="flex-1 h-10 bg-[#eff4ff] rounded-full flex items-center px-3 gap-1.5 border border-slate-200/60">
          <span className="material-symbols-outlined text-[#8f7069] text-[20px]">search</span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="爆款手机限时秒杀直降500元"
            className="flex-1 bg-transparent text-xs text-[#121c2a] outline-none placeholder:text-[#8f7069]"
            autoFocus
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-[#8f7069] hover:text-[#121c2a] p-1"
            >
              <span className="material-symbols-outlined text-[16px]">cancel</span>
            </button>
          )}
        </div>

        <button
          onClick={() => {
            if (!searchTerm.trim()) setSearchTerm('水洗棉四件套');
          }}
          className="px-3.5 h-8 bg-[#b22204] text-white rounded-full text-xs font-bold hover:bg-[#d63c1e] active:scale-95 transition-all shadow-xs"
        >
          搜索
        </button>
      </div>

      {/* Body Area */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        {/* Results when typing */}
        {searchTerm.trim() ? (
          <div className="flex flex-col gap-2">
            <div className="text-xs text-[#8f7069]">找到 {searchResults.length} 个相关商品：</div>
            {searchResults.length === 0 ? (
              <div className="py-12 text-center text-xs text-[#8f7069]">未找到相关商品，换个词试试吧</div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {searchResults.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      openProductDetail(item);
                      closeSearch();
                    }}
                    className="bg-white rounded-xl overflow-hidden shadow-xs p-2 flex flex-col justify-between cursor-pointer hover:shadow-md transition-shadow"
                  >
                    <div className="w-full aspect-square rounded-lg overflow-hidden bg-[#dee9fc] mb-1.5">
                      <img className="w-full h-full object-cover" src={item.image} alt={item.title} />
                    </div>
                    <div className="text-xs font-semibold text-[#121c2a] line-clamp-2">
                      {item.title}
                    </div>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-[10px] text-[#b22204] font-bold">¥</span>
                      <span className="text-base text-[#b22204] font-bold">{item.price}</span>
                      <span className="text-[10px] text-[#8f7069] line-through">
                        ¥{item.originalPrice}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Search History */}
            {searchHistory.length > 0 && (
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#121c2a]">历史搜索</span>
                  <button
                    onClick={clearSearchHistory}
                    className="text-[#8f7069] hover:text-[#b22204] flex items-center gap-0.5 text-[11px]"
                  >
                    <span className="material-symbols-outlined text-[14px]">delete</span>
                    <span>清空</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {searchHistory.map((item) => (
                    <button
                      key={item}
                      onClick={() => handleSelectKeyword(item)}
                      className="px-3 py-1 bg-white border border-slate-200/80 rounded-full text-xs text-[#121c2a] hover:border-[#b22204] hover:text-[#b22204] transition-colors"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Trending Hot Searches */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-[#b22204]">local_fire_department</span>
                <span className="text-xs font-bold text-[#121c2a]">全网热搜榜</span>
              </div>
              <div className="bg-white rounded-xl p-2 divide-y divide-slate-100 shadow-xs">
                {hotKeywords.map((item) => (
                  <div
                    key={item.rank}
                    onClick={() => handleSelectKeyword(item.term)}
                    className="py-2.5 px-2 flex items-center justify-between hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className={`w-4 text-center text-xs font-bold ${
                          item.rank <= 3 ? 'text-[#b22204]' : 'text-slate-400'
                        }`}
                      >
                        {item.rank}
                      </span>
                      <span className="text-xs text-[#121c2a] truncate">{item.term}</span>
                    </div>
                    {item.hot && (
                      <span className="text-[9px] bg-[#ffdad9] text-[#b22204] px-1 py-0.2 rounded font-semibold flex-shrink-0">
                        热
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
