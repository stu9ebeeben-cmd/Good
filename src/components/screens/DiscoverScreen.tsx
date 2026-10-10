import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { PRODUCTS } from '../../data/products';
import { Product } from '../../types';

export const DiscoverScreen: React.FC = () => {
  const { openProductDetail, openBundle, buyNow, showToast } = useApp();
  const [activeFilterTab, setActiveFilterTab] = useState('全部');

  // Countdown timer simulation
  const [countdownSeconds, setCountdownSeconds] = useState(3 * 3600 + 48 * 60 + 19);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdownSeconds((prev) => (prev > 0 ? prev - 1 : 24 * 3600));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (totalSec: number) => {
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    return {
      h: String(h).padStart(2, '0'),
      m: String(m).padStart(2, '0'),
      s: String(s).padStart(2, '0'),
    };
  };

  const { h, m, s } = formatCountdown(countdownSeconds);

  // Floating Live Group Buy toast simulation
  const liveBuyerOrders = [
    '张** 1秒前拼单成功 · 纯棉毛巾组合',
    '李* 3秒前拼单成功 · 加厚抽纸10包整箱',
    '王** 刚才拼单成功 · 现摘多汁沃柑3斤',
    '陈* 5秒前拼单成功 · 经典红油酸辣粉4桶',
    '刘** 2秒前拼单成功 · 超细纤维吸水抹布',
  ];
  const [orderIndex, setOrderIndex] = useState(0);
  const [isToastFading, setIsToastFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsToastFading(true);
      setTimeout(() => {
        setOrderIndex((prev) => (prev + 1) % liveBuyerOrders.length);
        setIsToastFading(false);
      }, 500);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const filterTabs = [
    '全部',
    '🔥 9.9元任选',
    '家居日杂',
    '下饭零食',
    '穿搭配饰',
    '文具清洁',
  ];

  // Group buy feed items matching Screen 3
  const groupBuyItems = [
    PRODUCTS.find((p) => p.id === 'p-tissue-box') || PRODUCTS[19],
    PRODUCTS.find((p) => p.id === 'p-microfiber-cloth') || PRODUCTS[20],
    PRODUCTS.find((p) => p.id === 'p-mandarin') || PRODUCTS[21],
    PRODUCTS.find((p) => p.id === 'p-socks') || PRODUCTS[22],
    PRODUCTS.find((p) => p.id === 'p-kitchen-sticker') || PRODUCTS[23],
    PRODUCTS.find((p) => p.id === 'p-suanlafen') || PRODUCTS[24],
  ];

  const filteredItems = groupBuyItems.filter((item) => {
    if (activeFilterTab === '全部' || activeFilterTab === '🔥 9.9元任选') return true;
    return item.category === activeFilterTab;
  });

  const handleGroupBuyAction = (item: Product) => {
    buyNow(item);
  };

  return (
    <div className="flex flex-col w-full pb-24 max-w-md mx-auto">
      {/* 1. Dynamic Urgency Banner Strip */}
      <section className="bg-gradient-to-r from-[#b22204] via-[#d63c1e] to-[#fda625] text-white px-3 py-1.5 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-1 min-w-0">
          <span
            className="material-symbols-outlined text-[18px] text-[#ffddb9] flex-shrink-0"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            local_fire_department
          </span>
          <span className="text-[13px] font-bold tracking-tight truncate">
            天天特价 · 封顶9.9元
          </span>
          <span className="bg-white/20 text-white px-1.5 py-0.5 rounded text-[9px] font-semibold flex-shrink-0">
            满29包邮
          </span>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0 text-white">
          <span className="text-[11px] opacity-90">距结束</span>
          <div className="flex items-center gap-0.5 text-[11px]">
            <span className="bg-[#27313f] text-[#eaf1ff] px-1 py-0.5 rounded font-mono font-bold">
              {h}
            </span>
            <span>:</span>
            <span className="bg-[#27313f] text-[#eaf1ff] px-1 py-0.5 rounded font-mono font-bold">
              {m}
            </span>
            <span>:</span>
            <span className="bg-[#27313f] text-[#eaf1ff] px-1 py-0.5 rounded font-mono font-bold">
              {s}
            </span>
          </div>
        </div>
      </section>

      {/* 2. Group Buy Hero Bundle Box */}
      <section className="px-3 pt-2.5">
        <div className="bg-gradient-to-br from-[#e9003a] via-[#d63c1e] to-[#b22204] rounded-xl p-3 text-white shadow-md relative overflow-hidden">
          {/* Decorative Backdrop circles */}
          <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-white/10 rounded-full blur-xl pointer-events-none"></div>

          <div className="flex items-center justify-between relative z-10">
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1">
                <span className="bg-[#ffddb9] text-[#2b1700] text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                  超值拼单
                </span>
                <span className="text-base font-bold tracking-tight">任选3件只需¥19.9</span>
              </div>
              <p className="text-xs text-[#ffb3b3]">全场百货破盘直降 · 正在火热拼单中</p>
            </div>
            <button
              onClick={openBundle}
              className="bg-[#ffddb9] text-[#2b1700] text-xs font-bold px-3 py-1.5 rounded-full shadow-sm hover:brightness-105 active:scale-95 transition-all flex items-center gap-0.5 flex-shrink-0 cursor-pointer"
            >
              <span>立即去挑</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>

          {/* Multi-Item Preview Pill */}
          <div className="mt-2 bg-white/15 backdrop-blur-md rounded-lg p-1.5 flex items-center justify-between gap-1.5">
            <div className="flex items-center gap-1.5">
              <div className="w-8 h-8 rounded-md bg-white/80 overflow-hidden flex items-center justify-center p-0.5">
                <img
                  className="w-full h-full object-cover rounded"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3fybJ0R-yFBO2ILeyro45yZjOizR2gtz5S7UW3eZTUvMDkyPQfdgeMbs92KdYzbsjSHHsy3szfiell-fIHMWZzwnVRr2Q8EmKtkX72-qOjo2DsiCf2ZSS7U6oSNSSu7KnJpvIuFRR2qfQujacRzAjc9FmNbJYUPKqJWhJfro0rEiUPZmanTlRAYjZV4KyP8Qrn9WbdQcL4w5jAtbsiLbNyQOgWjj8Wloi_Onwl8wizmf_ZASnb_wl3Q"
                  alt="纸巾"
                />
              </div>
              <div className="w-8 h-8 rounded-md bg-white/80 overflow-hidden flex items-center justify-center p-0.5">
                <img
                  className="w-full h-full object-cover rounded"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIEY3RT_djcQ8QV-dBZxm0Nc9aqAfD5SInmF0uLPbd75QCHrrSOLIiyzFL02V2HqVP1-ouS6R3iaD76_Z0nTRb1iHbXJYNTN56trh_5NHGGFL9k7YslaOreVQjK3I0xDXuBsvXi8Uh1nVsS-zowH-V3V-_Oc5Nvt5uXUFpMqakMx-BIOM_JWCFKDgTy7YTdG5I4ToZ35nskGzj9IjeuhmfiXXPXRgwk30AiEQHA7YNJKFAmikSaixRtQ"
                  alt="抹布"
                />
              </div>
              <div className="w-8 h-8 rounded-md bg-white/80 overflow-hidden flex items-center justify-center p-0.5">
                <img
                  className="w-full h-full object-cover rounded"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFFY2jBoc2lmOJIvCBSBV3AKc4j-W7S8kIlWjWg6jDqCUZfsejcnw3G5q56nfGYZe0AvZciqX9B5lieNAwQL8nyBN9P4O1vJAY3YSP6bbiwYy3krVFTytU4gOqvpP7MY55w0acEvTBuvZ_dtWHqEklsTHyakhcVe7ysMCMxeDICVra7Q0p2r5vjiY_WKnC8_NQFwgCRootsAsR5Yyutj4_mNtHKITkRrWfC16_nbvPjDy5jcsmpdq_VQ"
                  alt="沃柑"
                />
              </div>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-white pr-1 font-medium">
              <span className="material-symbols-outlined text-[14px] text-[#ffddb9]">group</span>
              <span>已成团 28,491 单</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Categories Horizontal Filter Chips */}
      <section className="py-2.5">
        <div className="flex items-center gap-1.5 px-3 overflow-x-auto no-scrollbar">
          {filterTabs.map((tab) => {
            const isActive = activeFilterTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveFilterTab(tab)}
                className={`font-semibold text-xs px-3.5 py-1.5 rounded-full flex-shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#b22204] text-white shadow-sm'
                    : 'bg-[#ffffff] text-[#121c2a] hover:bg-[#e6eeff]'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </section>

      {/* 4. Product Feed (2-Column Dense Grid) */}
      <section className="px-3 pb-6">
        <div className="grid grid-cols-2 gap-2">
          {filteredItems.map((item) => (
            <article
              key={item.id}
              onClick={() => openProductDetail(item)}
              className="bg-[#ffffff] rounded-xl overflow-hidden shadow-sm flex flex-col justify-between group cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="relative w-full aspect-square bg-[#dee9fc] overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  src={item.image}
                  alt={item.title}
                />
                {item.hotBadge && (
                  <div className="absolute top-1.5 left-1.5 bg-[#b22204] text-white text-[10px] px-1.5 py-0.5 rounded font-bold shadow-sm">
                    {item.hotBadge}
                  </div>
                )}
                {item.groupBuyJoined && (
                  <div className="absolute bottom-1.5 right-1.5 bg-[#27313f]/80 backdrop-blur-xs text-[#eaf1ff] text-[9px] px-1.5 py-0.5 rounded-full">
                    {item.groupBuyJoined}
                  </div>
                )}
              </div>

              <div className="p-2.5 flex flex-col flex-1 justify-between gap-1">
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    {item.tags.slice(0, 2).map((tag, idx) => (
                      <span
                        key={idx}
                        className={`text-[9px] px-1 rounded ${
                          idx === 0
                            ? 'bg-[#ffdad9] text-[#920021]'
                            : 'bg-[#ffddb9] text-[#663e00]'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xs text-[#121c2a] font-bold line-clamp-2 leading-tight">
                    {item.title}
                  </h3>
                </div>

                <div className="mt-2 flex items-baseline justify-between pt-1">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs text-[#b22204] font-semibold">¥</span>
                    <span className="text-xl font-bold text-[#b22204]">{item.price}</span>
                    <span className="text-[10px] text-[#8f7069] line-through">
                      ¥{item.originalPrice}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleGroupBuyAction(item);
                    }}
                    className="bg-gradient-to-r from-[#b22204] to-[#d63c1e] text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm hover:opacity-95 active:scale-95 transition-all flex items-center gap-0.5"
                  >
                    <span>去拼单</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 5. Live Floating Toast Pill (張** 1秒前拼單成功) */}
      <aside
        className={`fixed left-3 bottom-20 z-40 bg-[#27313f]/90 text-[#eaf1ff] backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 transform transition-all duration-500 ease-out max-w-[280px] pointer-events-none ${
          isToastFading ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
        }`}
      >
        <div className="w-5 h-5 rounded-full bg-[#ffddb9] flex items-center justify-center text-[#2b1700] flex-shrink-0">
          <span
            className="material-symbols-outlined text-[13px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            check_circle
          </span>
        </div>
        <span className="text-[10px] truncate">
          {liveBuyerOrders[orderIndex]}
        </span>
      </aside>
    </div>
  );
};
