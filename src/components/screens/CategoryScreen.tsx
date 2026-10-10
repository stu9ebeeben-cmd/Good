import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PRODUCTS } from '../../data/products';

export const CategoryScreen: React.FC = () => {
  const { openProductDetail, addToCart, claimCoupon, coupons, showToast } = useApp();
  const [activeCategoryRail, setActiveCategoryRail] = useState('居家生活');
  const [activeFilterChip, setActiveFilterChip] = useState('¥9.9包邮');

  const railCategories = [
    { key: 'recom', label: '今日推荐' },
    { key: 'home', label: '居家生活' },
    { key: 'apparel', label: '女装男装' },
    { key: 'food', label: '食品生鲜' },
    { key: 'beauty', label: '美妆个护' },
    { key: 'clean', label: '个人清洁' },
    { key: 'kitchen', label: '厨具家纺' },
    { key: 'baby', label: '母婴文具' },
    { key: 'digital', label: '数码家电' },
  ];

  const filterChips = [
    { label: '¥9.9包邮', icon: 'local_fire_department' },
    { label: '¥30以内' },
    { label: '¥50平价馆' },
    { label: '高分好评', icon: 'thumb_up' },
  ];

  // Specific products matching Screen 2
  const pStorageBox = PRODUCTS.find((p) => p.id === 'p-storage-box') || PRODUCTS[10];
  const pThermos = PRODUCTS.find((p) => p.id === 'p-thermos') || PRODUCTS[11];
  const pDishDrainer = PRODUCTS.find((p) => p.id === 'p-dish-drainer') || PRODUCTS[12];
  const pTowels = PRODUCTS.find((p) => p.id === 'p-towels') || PRODUCTS[13];
  const pCassiaPillow = PRODUCTS.find((p) => p.id === 'p-cassia-pillow') || PRODUCTS[14];
  const pKonjac = PRODUCTS.find((p) => p.id === 'p-konjac') || PRODUCTS[15];
  const pNuts = PRODUCTS.find((p) => p.id === 'p-nuts') || PRODUCTS[16];
  const pWhiteTee = PRODUCTS.find((p) => p.id === 'p-white-tee') || PRODUCTS[17];
  const pSunJacket = PRODUCTS.find((p) => p.id === 'p-sun-jacket') || PRODUCTS[18];

  const isCouponClaimed = coupons.find((c) => c.id === 'c-100-20')?.claimed;

  const handleClaimLifeCoupon = () => {
    claimCoupon('c-100-20');
  };

  return (
    <div className="flex flex-col w-full pb-20 max-w-md mx-auto">
      {/* Dual Split Category Experience Container */}
      <div className="flex w-full overflow-hidden min-h-[calc(100vh-112px)]">
        {/* Left Category Rail */}
        <aside className="w-[84px] flex-shrink-0 bg-[#eff4ff] flex flex-col pb-6 select-none border-r border-slate-100">
          {railCategories.map((cat) => {
            const isActive = activeCategoryRail === cat.label;
            return (
              <button
                key={cat.key}
                onClick={() => {
                  setActiveCategoryRail(cat.label);
                  showToast(`已切换至【${cat.label}】分类`);
                }}
                className={`relative w-full h-[52px] flex items-center justify-center transition-all cursor-pointer ${
                  isActive
                    ? 'font-bold text-[#b22204] bg-[#f8f9ff]'
                    : 'text-[#5b403b] hover:text-[#b22204]'
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-3 bottom-3 w-1 bg-[#b22204] rounded-r-full"></div>
                )}
                <span className={`z-10 text-[13px] ${isActive ? 'font-bold' : 'font-normal'}`}>
                  {cat.label}
                </span>
              </button>
            );
          })}
        </aside>

        {/* Right Dynamic Content Panel */}
        <section className="flex-1 min-w-0 bg-[#f8f9ff] px-2 pt-1 pb-10 flex flex-col gap-3">
          {/* Promotional Hero Strip */}
          <div className="relative w-full rounded-xl overflow-hidden bg-gradient-to-r from-[#b22204] to-[#d63c1e] p-2.5 text-white shadow-sm flex items-center justify-between">
            <div className="relative z-10 flex flex-col max-w-[65%]">
              <div className="flex items-center gap-1 mb-0.5">
                <span className="bg-[#fda625] text-[#2b1700] text-[9px] px-1.5 py-0.5 rounded-full uppercase font-bold">
                  限时狂欢
                </span>
                <span className="text-[10px] text-[#ffdad3] opacity-90">居家生活节</span>
              </div>
              <div className="text-sm font-bold text-white tracking-tight truncate">
                领满100减20专享券
              </div>
              <div className="text-[10px] text-[#ffdad3] opacity-80 mt-0.5 truncate">
                爆款日用好物5折立抢
              </div>
            </div>

            <div className="relative z-10 flex flex-col items-end">
              <button
                onClick={handleClaimLifeCoupon}
                className={`px-3 py-1.5 rounded-full text-[11px] shadow-sm active:scale-95 transition-all flex items-center gap-0.5 font-bold ${
                  isCouponClaimed
                    ? 'bg-white/70 text-[#5b403b] pointer-events-none'
                    : 'bg-white text-[#b22204] hover:bg-slate-50'
                }`}
              >
                <span>{isCouponClaimed ? '已领取' : '立即领'}</span>
                {!isCouponClaimed && (
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                )}
              </button>
              <span className="text-[9px] text-[#ffdad3] opacity-90 mt-1">仅剩 142 张</span>
            </div>

            {/* Decorative Ambient Graphic */}
            <div className="absolute -right-4 -bottom-6 w-24 h-24 rounded-full bg-white/10 blur-xl pointer-events-none"></div>
          </div>

          {/* Quick Filter Chips Horizontal Scroll */}
          <div className="w-full overflow-x-auto no-scrollbar py-0.5 -mx-1 px-1 flex items-center gap-1.5">
            {filterChips.map((chip) => {
              const isActive = activeFilterChip === chip.label;
              return (
                <button
                  key={chip.label}
                  onClick={() => setActiveFilterChip(chip.label)}
                  className={`flex-shrink-0 px-3 py-1 rounded-full text-[10px] transition-all flex items-center gap-0.5 cursor-pointer ${
                    isActive
                      ? 'bg-[#b22204] text-white font-bold shadow-sm'
                      : 'bg-[#dee9fc] text-[#5b403b] hover:bg-[#e6eeff]'
                  }`}
                >
                  {chip.icon && (
                    <span
                      className="material-symbols-outlined text-[12px]"
                      style={chip.icon === 'local_fire_department' ? { fontVariationSettings: "'FILL' 1" } : {}}
                    >
                      {chip.icon}
                    </span>
                  )}
                  <span>{chip.label}</span>
                </button>
              );
            })}
          </div>

          {/* Category Section 1: 厨卫日用 */}
          <div className="flex flex-col gap-1 mt-1">
            <div className="flex items-center justify-between px-0.5">
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-3.5 bg-[#b22204] rounded-full"></span>
                <span className="text-sm font-bold text-[#121c2a]">厨卫日用</span>
                <span className="text-[9px] text-[#5b403b] bg-[#dee9fc] px-1.5 py-0.5 rounded font-medium">
                  收纳省心
                </span>
              </div>
              <button
                onClick={() => showToast('已为您载入厨卫日用热销榜单')}
                className="flex items-center text-[#5b403b] text-[10px] hover:text-[#b22204] transition-colors"
              >
                <span>热销榜</span>
                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-1.5">
              {/* Item Card 1: 多层桌面收纳盒 */}
              <div
                onClick={() => openProductDetail(pStorageBox)}
                className="bg-[#ffffff] rounded-xl p-1.5 shadow-sm flex flex-col justify-between group cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-[#eff4ff] mb-1.5">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    src={pStorageBox.image}
                    alt={pStorageBox.title}
                  />
                  <span className="absolute top-1 left-1 bg-[#b22204] text-white text-[9px] px-1 rounded font-medium shadow-xs">
                    爆款直降
                  </span>
                </div>
                <div className="flex flex-col flex-1 justify-between">
                  <div>
                    <div className="text-xs font-semibold text-[#121c2a] line-clamp-1 group-hover:text-[#b22204] transition-colors">
                      {pStorageBox.subTitle || pStorageBox.title}
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="text-[9px] text-[#ba002c] bg-[#ffdad9] px-1 rounded-[2px]">
                        满30减5
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2 pt-0.5">
                    <div className="flex items-baseline">
                      <span className="text-[10px] font-bold text-[#b22204]">¥</span>
                      <span className="text-sm font-bold text-[#b22204]">{pStorageBox.price}</span>
                      <span className="text-[9px] text-[#8f7069] ml-1 line-through">
                        ¥{pStorageBox.originalPrice}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(pStorageBox);
                      }}
                      className="w-6 h-6 rounded-full bg-[#b22204] text-white flex items-center justify-center active:scale-90 transition-transform shadow-xs"
                      title="加入购物车"
                    >
                      <span className="material-symbols-outlined text-[16px]">add</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Item Card 2: 316不锈钢保温杯 */}
              <div
                onClick={() => openProductDetail(pThermos)}
                className="bg-[#ffffff] rounded-xl p-1.5 shadow-sm flex flex-col justify-between group cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-[#eff4ff] mb-1.5">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    src={pThermos.image}
                    alt={pThermos.title}
                  />
                  <span className="absolute top-1 left-1 bg-[#fda625] text-[#2b1700] text-[9px] px-1 rounded font-medium shadow-xs">
                    回购王
                  </span>
                </div>
                <div className="flex flex-col flex-1 justify-between">
                  <div>
                    <div className="text-xs font-semibold text-[#121c2a] line-clamp-1 group-hover:text-[#b22204] transition-colors">
                      {pThermos.subTitle || pThermos.title}
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="text-[9px] text-[#8f7069] bg-[#dee9fc] px-1 rounded-[2px]">
                        24h保温
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2 pt-0.5">
                    <div className="flex items-baseline">
                      <span className="text-[10px] font-bold text-[#b22204]">¥</span>
                      <span className="text-sm font-bold text-[#b22204]">{pThermos.price}</span>
                      <span className="text-[9px] text-[#8f7069] ml-1 line-through">
                        ¥{pThermos.originalPrice}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(pThermos);
                      }}
                      className="w-6 h-6 rounded-full bg-[#b22204] text-white flex items-center justify-center active:scale-90 transition-transform shadow-xs"
                      title="加入购物车"
                    >
                      <span className="material-symbols-outlined text-[16px]">add</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Single Horizontal Feature Card: 厨房台面多功能沥水架 */}
            <div
              onClick={() => openProductDetail(pDishDrainer)}
              className="bg-[#ffffff] rounded-xl p-2 shadow-sm flex gap-2 items-center cursor-pointer hover:shadow-md transition-shadow mt-1"
            >
              <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-[#eff4ff] flex-shrink-0">
                <img
                  className="w-full h-full object-cover"
                  src={pDishDrainer.image}
                  alt={pDishDrainer.title}
                />
                <span className="absolute top-0.5 left-0.5 bg-[#b22204] text-white text-[8px] px-1 rounded font-medium">
                  限时省
                </span>
              </div>
              <div className="flex-1 min-w-0 flex flex-col justify-between h-full py-0.5">
                <div>
                  <div className="text-xs font-semibold text-[#121c2a] truncate">
                    {pDishDrainer.subTitle || pDishDrainer.title}
                  </div>
                  <div className="text-[10px] text-[#5b403b] truncate mt-0.5">
                    加厚碳钢防锈 · 导流水槽
                  </div>
                  <div className="text-[10px] text-[#ba002c] font-medium mt-0.5">已拼 1.4万+ 件</div>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <div className="flex items-baseline">
                    <span className="text-[10px] font-bold text-[#b22204]">¥</span>
                    <span className="text-sm font-bold text-[#b22204]">{pDishDrainer.price}</span>
                    <span className="text-[9px] text-[#8f7069] ml-1 line-through">
                      ¥{pDishDrainer.originalPrice}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(pDishDrainer);
                    }}
                    className="px-2.5 h-6 rounded-full bg-[#b22204] text-white text-[10px] font-medium flex items-center gap-0.5 active:scale-95 transition-transform shadow-xs"
                  >
                    <span>抢购</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Category Section 2: 家纺布艺 */}
          <div className="flex flex-col gap-1 mt-1">
            <div className="flex items-center justify-between px-0.5">
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-3.5 bg-[#fda625] rounded-full"></span>
                <span className="text-sm font-bold text-[#121c2a]">家纺布艺</span>
                <span className="text-[9px] text-[#865300] bg-[#ffddb9] px-1.5 py-0.5 rounded font-medium">
                  柔肤亲选
                </span>
              </div>
              <button
                onClick={() => showToast('已为您展示家纺布艺系列')}
                className="flex items-center text-[#5b403b] text-[10px] hover:text-[#b22204] transition-colors"
              >
                <span>更多</span>
                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-1.5">
              {/* Item Card 3: 新疆长绒纯棉毛巾 */}
              <div
                onClick={() => openProductDetail(pTowels)}
                className="bg-[#ffffff] rounded-xl p-1.5 shadow-sm flex flex-col justify-between group cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-[#eff4ff] mb-1.5">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    src={pTowels.image}
                    alt={pTowels.title}
                  />
                  <span className="absolute top-1 left-1 bg-[#ba002c] text-white text-[9px] px-1 rounded font-medium shadow-xs">
                    3条装
                  </span>
                </div>
                <div className="flex flex-col flex-1 justify-between">
                  <div>
                    <div className="text-xs font-semibold text-[#121c2a] line-clamp-1 group-hover:text-[#b22204] transition-colors">
                      {pTowels.subTitle || pTowels.title}
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="text-[9px] text-[#8f7069] bg-[#dee9fc] px-1 rounded-[2px]">
                        A类母婴级
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2 pt-0.5">
                    <div className="flex items-baseline">
                      <span className="text-[10px] font-bold text-[#b22204]">¥</span>
                      <span className="text-sm font-bold text-[#b22204]">{pTowels.price}</span>
                      <span className="text-[9px] text-[#5b403b] ml-0.5">/3条</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(pTowels);
                      }}
                      className="w-6 h-6 rounded-full bg-[#b22204] text-white flex items-center justify-center active:scale-90 transition-transform shadow-xs"
                      title="加入购物车"
                    >
                      <span className="material-symbols-outlined text-[16px]">add</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Item Card 4: 决明子草本枕芯 */}
              <div
                onClick={() => openProductDetail(pCassiaPillow)}
                className="bg-[#ffffff] rounded-xl p-1.5 shadow-sm flex flex-col justify-between group cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-[#eff4ff] mb-1.5">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    src={pCassiaPillow.image}
                    alt={pCassiaPillow.title}
                  />
                  <span className="absolute top-1 left-1 bg-[#865300] text-white text-[9px] px-1 rounded font-medium shadow-xs">
                    助眠护颈
                  </span>
                </div>
                <div className="flex flex-col flex-1 justify-between">
                  <div>
                    <div className="text-xs font-semibold text-[#121c2a] line-clamp-1 group-hover:text-[#b22204] transition-colors">
                      {pCassiaPillow.subTitle || pCassiaPillow.title}
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="text-[9px] text-[#ba002c] bg-[#ffdad9] px-1 rounded-[2px]">
                        热评4.9分
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2 pt-0.5">
                    <div className="flex items-baseline">
                      <span className="text-[10px] font-bold text-[#b22204]">¥</span>
                      <span className="text-sm font-bold text-[#b22204]">{pCassiaPillow.price}</span>
                      <span className="text-[9px] text-[#8f7069] ml-1 line-through">
                        ¥{pCassiaPillow.originalPrice}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(pCassiaPillow);
                      }}
                      className="w-6 h-6 rounded-full bg-[#b22204] text-white flex items-center justify-center active:scale-90 transition-transform shadow-xs"
                      title="加入购物车"
                    >
                      <span className="material-symbols-outlined text-[16px]">add</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Category Section 3: 休闲零食 */}
          <div className="flex flex-col gap-1 mt-1">
            <div className="flex items-center justify-between px-0.5">
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-3.5 bg-[#e9003a] rounded-full"></span>
                <span className="text-sm font-bold text-[#121c2a]">休闲零食</span>
                <span className="text-[9px] text-[#ba002c] bg-[#ffdad9] px-1.5 py-0.5 rounded font-medium">
                  吃货专区
                </span>
              </div>
              <button
                onClick={() => showToast('已为您展示休闲零食推荐')}
                className="flex items-center text-[#5b403b] text-[10px] hover:text-[#b22204] transition-colors"
              >
                <span>去解馋</span>
                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-1.5">
              {/* Item Card 5: 香辣开胃素毛肚 */}
              <div
                onClick={() => openProductDetail(pKonjac)}
                className="bg-[#ffffff] rounded-xl p-1.5 shadow-sm flex flex-col justify-between group cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-[#eff4ff] mb-1.5">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    src={pKonjac.image}
                    alt={pKonjac.title}
                  />
                  <span className="absolute top-1 left-1 bg-[#e9003a] text-white text-[9px] px-1 rounded font-medium shadow-xs">
                    爽脆香辣
                  </span>
                </div>
                <div className="flex flex-col flex-1 justify-between">
                  <div>
                    <div className="text-xs font-semibold text-[#121c2a] line-clamp-1 group-hover:text-[#b22204] transition-colors">
                      {pKonjac.subTitle || pKonjac.title}
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="text-[9px] text-[#b22204] bg-[#ffdad3] px-1 rounded-[2px]">
                        0脂肪低卡
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2 pt-0.5">
                    <div className="flex items-baseline">
                      <span className="text-[10px] font-bold text-[#b22204]">¥</span>
                      <span className="text-sm font-bold text-[#b22204]">{pKonjac.price}</span>
                      <span className="text-[9px] text-[#5b403b] ml-0.5">/盒</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(pKonjac);
                      }}
                      className="w-6 h-6 rounded-full bg-[#b22204] text-white flex items-center justify-center active:scale-90 transition-transform shadow-xs"
                      title="加入购物车"
                    >
                      <span className="material-symbols-outlined text-[16px]">add</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Item Card 6: 每日坚果果干纯享罐 */}
              <div
                onClick={() => openProductDetail(pNuts)}
                className="bg-[#ffffff] rounded-xl p-1.5 shadow-sm flex flex-col justify-between group cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-[#eff4ff] mb-1.5">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    src={pNuts.image}
                    alt={pNuts.title}
                  />
                  <span className="absolute top-1 left-1 bg-[#fda625] text-[#2b1700] text-[9px] px-1 rounded font-medium shadow-xs">
                    健康坚果
                  </span>
                </div>
                <div className="flex flex-col flex-1 justify-between">
                  <div>
                    <div className="text-xs font-semibold text-[#121c2a] line-clamp-1 group-hover:text-[#b22204] transition-colors">
                      {pNuts.subTitle || pNuts.title}
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="text-[9px] text-[#8f7069] bg-[#dee9fc] px-1 rounded-[2px]">
                        原味无添加
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2 pt-0.5">
                    <div className="flex items-baseline">
                      <span className="text-[10px] font-bold text-[#b22204]">¥</span>
                      <span className="text-sm font-bold text-[#b22204]">{pNuts.price}</span>
                      <span className="text-[9px] text-[#8f7069] ml-1 line-through">
                        ¥{pNuts.originalPrice}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(pNuts);
                      }}
                      className="w-6 h-6 rounded-full bg-[#b22204] text-white flex items-center justify-center active:scale-90 transition-transform shadow-xs"
                      title="加入购物车"
                    >
                      <span className="material-symbols-outlined text-[16px]">add</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Category Section 4: 基础穿搭 */}
          <div className="flex flex-col gap-1 mt-1 mb-4">
            <div className="flex items-center justify-between px-0.5">
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-3.5 bg-[#b22204] rounded-full"></span>
                <span className="text-sm font-bold text-[#121c2a]">基础穿搭</span>
                <span className="text-[9px] text-[#d63c1e] bg-[#ffdad3] px-1.5 py-0.5 rounded font-medium">
                  夏季百搭
                </span>
              </div>
              <button
                onClick={() => showToast('已为您展示潮流穿搭集')}
                className="flex items-center text-[#5b403b] text-[10px] hover:text-[#b22204] transition-colors"
              >
                <span>穿搭集</span>
                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-1.5">
              {/* Item Card 7: 240g纯棉重磅白T恤 */}
              <div
                onClick={() => openProductDetail(pWhiteTee)}
                className="bg-[#ffffff] rounded-xl p-1.5 shadow-sm flex flex-col justify-between group cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-[#eff4ff] mb-1.5">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    src={pWhiteTee.image}
                    alt={pWhiteTee.title}
                  />
                  <span className="absolute top-1 left-1 bg-[#b22204] text-white text-[9px] px-1 rounded font-medium shadow-xs">
                    240g重磅
                  </span>
                </div>
                <div className="flex flex-col flex-1 justify-between">
                  <div>
                    <div className="text-xs font-semibold text-[#121c2a] line-clamp-1 group-hover:text-[#b22204] transition-colors">
                      {pWhiteTee.subTitle || pWhiteTee.title}
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="text-[9px] text-[#8f7069] bg-[#dee9fc] px-1 rounded-[2px]">
                        领口不松垮
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2 pt-0.5">
                    <div className="flex items-baseline">
                      <span className="text-[10px] font-bold text-[#b22204]">¥</span>
                      <span className="text-sm font-bold text-[#b22204]">{pWhiteTee.price}</span>
                      <span className="text-[9px] text-[#8f7069] ml-1 line-through">
                        ¥{pWhiteTee.originalPrice}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(pWhiteTee);
                      }}
                      className="w-6 h-6 rounded-full bg-[#b22204] text-white flex items-center justify-center active:scale-90 transition-transform shadow-xs"
                      title="加入购物车"
                    >
                      <span className="material-symbols-outlined text-[16px]">add</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Item Card 8: 冰丝凉感防晒衣 */}
              <div
                onClick={() => openProductDetail(pSunJacket)}
                className="bg-[#ffffff] rounded-xl p-1.5 shadow-sm flex flex-col justify-between group cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-[#eff4ff] mb-1.5">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    src={pSunJacket.image}
                    alt={pSunJacket.title}
                  />
                  <span className="absolute top-1 left-1 bg-[#fda625] text-[#2b1700] text-[9px] px-1 rounded font-medium shadow-xs">
                    UPF50+
                  </span>
                </div>
                <div className="flex flex-col flex-1 justify-between">
                  <div>
                    <div className="text-xs font-semibold text-[#121c2a] line-clamp-1 group-hover:text-[#b22204] transition-colors">
                      {pSunJacket.subTitle || pSunJacket.title}
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="text-[9px] text-[#b22204] bg-[#ffdad3] px-1 rounded-[2px]">
                        暴晒不闷汗
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2 pt-0.5">
                    <div className="flex items-baseline">
                      <span className="text-[10px] font-bold text-[#b22204]">¥</span>
                      <span className="text-sm font-bold text-[#b22204]">{pSunJacket.price}</span>
                      <span className="text-[9px] text-[#8f7069] ml-1 line-through">
                        ¥{pSunJacket.originalPrice}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(pSunJacket);
                      }}
                      className="w-6 h-6 rounded-full bg-[#b22204] text-white flex items-center justify-center active:scale-90 transition-transform shadow-xs"
                      title="加入购物车"
                    >
                      <span className="material-symbols-outlined text-[16px]">add</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
