import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { PRODUCTS } from '../../data/products';
import { Product } from '../../types';

export const HomeScreen: React.FC = () => {
  const { openProductDetail, addToCart, openBundle, showToast, setActiveTab } = useApp();
  const [activeCategoryTab, setActiveCategoryTab] = useState('精选');

  // Flash sale countdown timer simulation
  const [secondsLeft, setSecondsLeft] = useState(2 * 3600 + 18 * 60 + 45);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 24 * 3600));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDigits = (totalSec: number) => {
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    return {
      h: String(h).padStart(2, '0'),
      m: String(m).padStart(2, '0'),
      s: String(s).padStart(2, '0'),
    };
  };

  const { h, m, s } = formatDigits(secondsLeft);

  const categoryTabs = [
    '精选',
    '服饰穿搭',
    '居家日用',
    '美食生鲜',
    '美妆个护',
    '母婴玩具',
    '运动户外',
    '数码家电',
  ];

  // Specific items from Screen 1
  const beddingProduct = PRODUCTS.find((p) => p.id === 'p-bedding-set') || PRODUCTS[0];
  const dressProduct = PRODUCTS.find((p) => p.id === 'p-dress') || PRODUCTS[1];

  const budgetItems = [
    PRODUCTS.find((p) => p.id === 'p-facial-towels') || PRODUCTS[2],
    PRODUCTS.find((p) => p.id === 'p-hangers') || PRODUCTS[3],
    PRODUCTS.find((p) => p.id === 'p-luosifen') || PRODUCTS[4],
    PRODUCTS.find((p) => p.id === 'p-ceramic-mug') || PRODUCTS[5],
  ];

  const waterfallItems = [
    PRODUCTS.find((p) => p.id === 'p-apples') || PRODUCTS[6],
    PRODUCTS.find((p) => p.id === 'p-cargo-pants') || PRODUCTS[7],
    PRODUCTS.find((p) => p.id === 'p-cleanser') || PRODUCTS[8],
    PRODUCTS.find((p) => p.id === 'p-electric-pot') || PRODUCTS[9],
    // extra products for extended scrolling
    PRODUCTS.find((p) => p.id === 'p-white-tee') || PRODUCTS[17],
    PRODUCTS.find((p) => p.id === 'p-dish-drainer') || PRODUCTS[12],
  ];

  const handleQuickNav = (label: string) => {
    if (label === '每日秒杀') {
      openProductDetail(beddingProduct);
    } else if (label === '9.9包邮' || label === '积分兑换') {
      setActiveTab('discover');
    } else if (label === '领优惠券') {
      showToast('已进入领券中心，限时全场神券生效中！');
    } else if (label === '潮流穿搭') {
      setActiveCategoryTab('服饰穿搭');
    } else if (label === '美食生鲜') {
      setActiveCategoryTab('美食生鲜');
    } else if (label === '家居生活') {
      setActiveTab('categories');
    } else {
      showToast(`已为你筛选【${label}】优选爆款`);
    }
  };

  return (
    <div className="flex flex-col w-full pb-20 max-w-md mx-auto">
      {/* 1. Multi-category Horizontal Tab Bar */}
      <div className="w-full bg-[#ffffff] shadow-sm z-30 sticky top-14 overflow-x-auto no-scrollbar py-2 px-3 flex items-center gap-3">
        {categoryTabs.map((tab) => {
          const isActive = activeCategoryTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveCategoryTab(tab)}
              className="flex flex-col items-center flex-shrink-0 group cursor-pointer transition-colors"
            >
              <span className={`text-sm ${isActive ? 'text-[#b22204] font-bold' : 'text-[#5b403b] hover:text-[#b22204]'}`}>
                {tab}
              </span>
              <span className={`w-4 h-0.5 rounded-full mt-0.5 transition-all ${isActive ? 'bg-[#b22204]' : 'bg-transparent'}`}></span>
            </button>
          );
        })}
      </div>

      {/* 2. Super Banner / Promo Carousel Card */}
      <div className="px-3 pt-2">
        <div className="relative w-full rounded-xl overflow-hidden shadow-sm bg-gradient-to-r from-[#b22204] to-[#d63c1e] p-3 text-white flex flex-col justify-between h-36">
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-medium tracking-wide">
              年中聚惠盛典
            </span>
            <div className="flex items-center gap-1 text-[10px] bg-white/20 px-2 py-0.5 rounded-full">
              <span className="material-symbols-outlined text-[14px]">local_fire_department</span>
              <span>爆款狂欢</span>
            </div>
          </div>

          <div>
            <h2 className="text-[22px] font-bold leading-tight drop-shadow-sm">全品类年中大促</h2>
            <p className="text-xs opacity-90 mt-0.5">跨店满200减30 · 9.9元任选3件封顶</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-1.5 rounded-full bg-white"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/50"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/50"></span>
            </div>
            <button
              onClick={() => openBundle()}
              className="px-3 py-1 bg-white text-[#b22204] rounded-full text-[11px] font-bold shadow-sm flex items-center gap-0.5 hover:bg-slate-50 active:scale-95 transition-all"
            >
              立即抢购
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. 10-Grid Quick Entry Icons */}
      <div className="px-3 pt-3">
        <div className="grid grid-cols-5 gap-y-3 gap-x-2 text-center">
          {/* 1 */}
          <div onClick={() => handleQuickNav('每日秒杀')} className="flex flex-col items-center group cursor-pointer">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#b22204] to-[#ba002c] text-white flex items-center justify-center shadow-sm group-active:scale-95 transition-transform">
              <span className="material-symbols-outlined text-[24px]">timer</span>
            </div>
            <span className="text-[10px] text-[#121c2a] mt-1.5 font-medium">每日秒杀</span>
          </div>

          {/* 2 */}
          <div onClick={() => handleQuickNav('9.9包邮')} className="flex flex-col items-center group cursor-pointer">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#fda625] to-[#865300] text-white flex items-center justify-center shadow-sm group-active:scale-95 transition-transform">
              <span className="material-symbols-outlined text-[24px]">local_shipping</span>
            </div>
            <span className="text-[10px] text-[#121c2a] mt-1.5 font-medium">9.9包邮</span>
          </div>

          {/* 3 */}
          <div onClick={() => handleQuickNav('潮流穿搭')} className="flex flex-col items-center group cursor-pointer">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#ffb4a4] to-[#b22204] text-white flex items-center justify-center shadow-sm group-active:scale-95 transition-transform">
              <span className="material-symbols-outlined text-[24px]">apparel</span>
            </div>
            <span className="text-[10px] text-[#121c2a] mt-1.5 font-medium">潮流穿搭</span>
          </div>

          {/* 4 */}
          <div onClick={() => handleQuickNav('美食生鲜')} className="flex flex-col items-center group cursor-pointer">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#ffddb9] to-[#fda625] text-[#694000] flex items-center justify-center shadow-sm group-active:scale-95 transition-transform">
              <span className="material-symbols-outlined text-[24px]">restaurant</span>
            </div>
            <span className="text-[10px] text-[#121c2a] mt-1.5 font-medium">美食生鲜</span>
          </div>

          {/* 5 */}
          <div onClick={() => handleQuickNav('家居生活')} className="flex flex-col items-center group cursor-pointer">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#dee9fc] to-[#d9e3f6] text-[#121c2a] flex items-center justify-center shadow-sm group-active:scale-95 transition-transform">
              <span className="material-symbols-outlined text-[24px]">chair</span>
            </div>
            <span className="text-[10px] text-[#121c2a] mt-1.5 font-medium">家居生活</span>
          </div>

          {/* 6 */}
          <div onClick={() => handleQuickNav('美妆特惠')} className="flex flex-col items-center group cursor-pointer">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#ffdad9] to-[#ba002c] text-white flex items-center justify-center shadow-sm group-active:scale-95 transition-transform">
              <span className="material-symbols-outlined text-[24px]">brush</span>
            </div>
            <span className="text-[10px] text-[#121c2a] mt-1.5 font-medium">美妆特惠</span>
          </div>

          {/* 7 */}
          <div onClick={() => handleQuickNav('百亿补贴')} className="flex flex-col items-center group cursor-pointer">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#b22204] to-[#d63c1e] text-white flex items-center justify-center shadow-sm group-active:scale-95 transition-transform">
              <span className="material-symbols-outlined text-[24px]">verified</span>
            </div>
            <span className="text-[10px] text-[#121c2a] mt-1.5 font-medium">百亿补贴</span>
          </div>

          {/* 8 */}
          <div onClick={() => handleQuickNav('领优惠券')} className="flex flex-col items-center group cursor-pointer">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#fda625] to-[#b22204] text-white flex items-center justify-center shadow-sm group-active:scale-95 transition-transform">
              <span className="material-symbols-outlined text-[24px]">confirmation_number</span>
            </div>
            <span className="text-[10px] text-[#121c2a] mt-1.5 font-medium">领优惠券</span>
          </div>

          {/* 9 */}
          <div onClick={() => handleQuickNav('积分兑换')} className="flex flex-col items-center group cursor-pointer">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#ffb961] to-[#865300] text-white flex items-center justify-center shadow-sm group-active:scale-95 transition-transform">
              <span className="material-symbols-outlined text-[24px]">redeem</span>
            </div>
            <span className="text-[10px] text-[#121c2a] mt-1.5 font-medium">积分兑换</span>
          </div>

          {/* 10 */}
          <div onClick={() => handleQuickNav('品牌特卖')} className="flex flex-col items-center group cursor-pointer">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#27313f] to-[#121c2a] text-white flex items-center justify-center shadow-sm group-active:scale-95 transition-transform">
              <span className="material-symbols-outlined text-[24px]">stars</span>
            </div>
            <span className="text-[10px] text-[#121c2a] mt-1.5 font-medium">品牌特卖</span>
          </div>
        </div>
      </div>

      {/* 4. Flash Sale (限时秒杀) Section */}
      <div className="px-3 pt-3">
        <div className="bg-[#ffffff] rounded-xl p-2.5 shadow-sm">
          <div className="flex items-center justify-between pb-2.5">
            <div className="flex items-center gap-1">
              <span className="text-base text-[#b22204] font-bold">限时秒杀</span>
              <div className="flex items-center gap-0.5 ml-1">
                <span className="w-5 h-5 rounded bg-[#121c2a] text-white text-[10px] flex items-center justify-center font-bold">
                  {h}
                </span>
                <span className="text-[#121c2a] font-bold text-xs">:</span>
                <span className="w-5 h-5 rounded bg-[#121c2a] text-white text-[10px] flex items-center justify-center font-bold">
                  {m}
                </span>
                <span className="text-[#121c2a] font-bold text-xs">:</span>
                <span className="w-5 h-5 rounded bg-[#b22204] text-white text-[10px] flex items-center justify-center font-bold">
                  {s}
                </span>
              </div>
            </div>
            <button
              onClick={() => openProductDetail(beddingProduct)}
              className="text-[11px] text-[#5b403b] flex items-center hover:text-[#b22204] transition-colors"
            >
              查看更多
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {/* Flash Item 1: 四季保暖水洗棉四件套 */}
            <div
              onClick={() => openProductDetail(beddingProduct)}
              className="flex flex-col bg-[#eff4ff] rounded-lg p-2 relative overflow-hidden group cursor-pointer hover:shadow-md transition-all"
            >
              <div className="absolute top-2 left-2 z-10 bg-[#b22204] text-white px-1.5 py-0.5 rounded text-[10px] font-semibold flex items-center gap-0.5 shadow-sm">
                <span className="material-symbols-outlined text-[10px]">local_fire_department</span>
                <span>直降80</span>
              </div>
              <div className="w-full aspect-square rounded-md overflow-hidden bg-[#d9e3f6]">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  src={beddingProduct.image}
                  alt={beddingProduct.title}
                />
              </div>
              <span className="text-[11px] font-semibold text-[#121c2a] mt-2 line-clamp-1">
                {beddingProduct.subTitle || beddingProduct.title}
              </span>
              <div className="w-full bg-[#dee9fc] rounded-full h-1.5 mt-1.5 overflow-hidden">
                <div className="bg-[#b22204] h-full w-[85%] rounded-full"></div>
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-[10px] text-[#8f7069]">已抢85%</span>
              </div>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-[11px] font-bold text-[#b22204]">¥</span>
                <span className="text-lg font-bold text-[#b22204]">{beddingProduct.price}</span>
                <span className="text-[10px] text-[#8f7069] line-through">¥{beddingProduct.originalPrice}</span>
              </div>
            </div>

            {/* Flash Item 2: 法式复古碎花连衣裙 */}
            <div
              onClick={() => openProductDetail(dressProduct)}
              className="flex flex-col bg-[#eff4ff] rounded-lg p-2 relative overflow-hidden group cursor-pointer hover:shadow-md transition-all"
            >
              <div className="absolute top-2 left-2 z-10 bg-[#b22204] text-white px-1.5 py-0.5 rounded text-[10px] font-semibold flex items-center gap-0.5 shadow-sm">
                <span className="material-symbols-outlined text-[10px]">local_fire_department</span>
                <span>秒杀省99</span>
              </div>
              <div className="w-full aspect-square rounded-md overflow-hidden bg-[#d9e3f6]">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  src={dressProduct.image}
                  alt={dressProduct.title}
                />
              </div>
              <span className="text-[11px] font-semibold text-[#121c2a] mt-2 line-clamp-1">
                {dressProduct.subTitle || dressProduct.title}
              </span>
              <div className="w-full bg-[#dee9fc] rounded-full h-1.5 mt-1.5 overflow-hidden">
                <div className="bg-[#b22204] h-full w-[92%] rounded-full"></div>
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-[10px] text-[#8f7069]">已抢92%</span>
              </div>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-[11px] font-bold text-[#b22204]">¥</span>
                <span className="text-lg font-bold text-[#b22204]">{dressProduct.price.toFixed(1)}</span>
                <span className="text-[10px] text-[#8f7069] line-through">¥{dressProduct.originalPrice}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Budget Deals: 天天平价 / 9.9包邮专区 */}
      <div className="px-3 pt-3">
        <div className="bg-[#ffffff] rounded-xl p-2.5 shadow-sm">
          <div className="flex items-center justify-between pb-2.5">
            <div className="flex items-center gap-1.5">
              <div className="px-2 py-0.5 bg-[#fda625] rounded-md text-[10px] text-[#694000] font-bold">
                超值优选
              </div>
              <span className="text-base text-[#121c2a] font-bold">天天平价 · 9.9包邮</span>
            </div>
            <span className="text-[10px] text-[#865300] font-bold flex items-center">
              全场补贴
              <span className="material-symbols-outlined text-[14px]">local_offer</span>
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {budgetItems.map((item) => (
              <div
                key={item.id}
                onClick={() => openProductDetail(item)}
                className="flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="w-full aspect-square rounded-lg bg-[#eff4ff] overflow-hidden relative shadow-inner">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    src={item.image}
                    alt={item.title}
                  />
                  <span className="absolute bottom-0 inset-x-0 bg-[#b22204]/90 text-white text-[9px] font-medium py-0.5">
                    {item.discountBadge || '特惠'}
                  </span>
                </div>
                <span className="text-[10px] text-[#121c2a] line-clamp-1 mt-1.5 font-medium">
                  {item.subTitle || item.title}
                </span>
                <div className="flex items-baseline text-[#b22204]">
                  <span className="text-[10px] font-bold">¥</span>
                  <span className="text-base font-bold">{item.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 6. Feed Header: 猜你喜欢 */}
      <div className="px-3 pt-4 flex items-center justify-center gap-2">
        <span className="w-8 h-px bg-[#e3beb6]"></span>
        <div className="flex items-center gap-1 text-[#b22204]">
          <span className="material-symbols-outlined text-[18px]">favorite</span>
          <span className="text-base font-bold text-[#121c2a]">猜你喜欢</span>
        </div>
        <span className="w-8 h-px bg-[#e3beb6]"></span>
      </div>

      {/* 7. Waterfall 2-Column Product Feed */}
      <div className="px-3 pt-2 grid grid-cols-2 gap-2">
        {waterfallItems.map((item) => (
          <div
            key={item.id}
            onClick={() => openProductDetail(item)}
            className="bg-[#ffffff] rounded-xl overflow-hidden shadow-sm flex flex-col justify-between group cursor-pointer hover:shadow-md transition-shadow"
          >
            <div>
              <div className="w-full aspect-square bg-[#eff4ff] overflow-hidden relative">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  src={item.image}
                  alt={item.title}
                />
                {item.hotBadge && (
                  <div className="absolute top-2 left-2 bg-[#b22204] text-white text-[10px] font-medium px-1.5 py-0.5 rounded shadow-sm">
                    {item.hotBadge}
                  </div>
                )}
              </div>
              <div className="p-2">
                <p className="text-xs text-[#121c2a] font-medium line-clamp-2 leading-tight">
                  {item.title}
                </p>
                <div className="flex items-center gap-1 mt-1.5 flex-wrap">
                  {item.tags.slice(0, 2).map((tag, idx) => (
                    <span
                      key={idx}
                      className={`px-1 py-0.2 rounded text-[9px] ${
                        idx === 0
                          ? 'bg-[#ffdad6] text-[#93000a]'
                          : 'bg-[#dee9fc] text-[#5b403b]'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="text-[10px] text-[#8f7069] mt-1.5">{item.salesCount}</div>
              </div>
            </div>

            <div className="px-2 pb-2.5 flex items-center justify-between">
              <div className="flex items-baseline text-[#b22204]">
                <span className="text-xs font-semibold">¥</span>
                <span className="text-lg font-bold">{item.price}</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(item);
                }}
                className="w-7 h-7 rounded-full bg-[#b22204] text-white flex items-center justify-center shadow hover:bg-[#d63c1e] active:scale-95 transition-all"
                title="加入购物车"
              >
                <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 8. Bottom Feed Footer */}
      <div className="py-6 flex flex-col items-center justify-center text-[#8f7069]">
        <div className="flex items-center gap-2">
          <span className="w-4 h-px bg-[#e3beb6]"></span>
          <span className="text-[10px]">已经到底啦，去发现更多好物吧</span>
          <span className="w-4 h-px bg-[#e3beb6]"></span>
        </div>
      </div>
    </div>
  );
};
