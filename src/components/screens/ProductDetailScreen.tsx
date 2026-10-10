import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Product } from '../../types';

interface ProductDetailProps {
  product: Product;
}

export const ProductDetailScreen: React.FC<ProductDetailProps> = ({ product }) => {
  const {
    closeProductDetail,
    addToCart,
    buyNow,
    toggleFavorite,
    isFavorite,
    claimCoupon,
    openChat,
    showToast,
    setActiveTab,
  } = useApp();

  // Selected SKU options
  const defaultSize = product.sizes ? product.sizes[1]?.name || product.sizes[0].name : '1.5m常规双人';
  const defaultSizePrice = product.sizes ? product.sizes[1]?.price || product.sizes[0].price : product.price;
  const defaultColor = product.colors ? product.colors[0].name : '燕麦米';

  const [selectedSize, setSelectedSize] = useState(defaultSize);
  const [currentPrice, setCurrentPrice] = useState(defaultSizePrice);
  const [selectedColor, setSelectedColor] = useState(defaultColor);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Gallery images array
  const gallery = product.galleryImages && product.galleryImages.length > 0
    ? product.galleryImages
    : [product.image];

  // Countdown timer
  const [timerSec, setTimerSec] = useState(2 * 3600 + 46 * 60 + 14);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimerSec((prev) => (prev > 0 ? prev - 1 : 24 * 3600));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSec: number) => {
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    return {
      h: String(h).padStart(2, '0'),
      m: String(m).padStart(2, '0'),
      s: String(s).padStart(2, '0'),
    };
  };

  const { h, m, s } = formatTimer(timerSec);
  const favorited = isFavorite(product.id);

  const handleSelectSize = (name: string, price: number) => {
    setSelectedSize(name);
    setCurrentPrice(price);
    showToast(`已选择规格：${name}`);
  };

  const handleSelectColor = (name: string, idx: number) => {
    setSelectedColor(name);
    if (idx < gallery.length) {
      setCurrentImageIndex(idx);
    }
    showToast(`已选择花色：${name}`);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('商品链接已复制到剪贴板！');
    } else {
      showToast('分享链接已生成！');
    }
  };

  return (
    <div className="flex flex-col relative w-full bg-[#f8f9ff] min-h-screen max-w-md mx-auto">
      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 z-50 pt-safe bg-white/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-14 px-2 max-w-md mx-auto flex items-center justify-between gap-2">
          <button
            onClick={closeProductDetail}
            className="w-10 h-10 flex items-center justify-center text-[#121c2a] hover:text-[#b22204] active:scale-95 transition-all"
            title="返回"
          >
            <span className="material-symbols-outlined text-[24px]">arrow_back</span>
          </button>
          <h1 className="flex-1 text-center text-base font-semibold text-[#121c2a] truncate">
            Product Detail
          </h1>
          <div className="flex items-center gap-1">
            <button
              onClick={handleShare}
              className="w-10 h-10 flex items-center justify-center text-[#121c2a] hover:text-[#b22204] active:scale-95 transition-all"
              title="分享"
            >
              <span className="material-symbols-outlined text-[24px]">share</span>
            </button>
            <div
              onClick={() => setActiveTab('profile')}
              className="w-8 h-8 rounded-full bg-[#b22204] flex items-center justify-center flex-shrink-0 cursor-pointer shadow-sm hover:opacity-90 active:scale-95"
              title="个人中心"
            >
              <span className="material-symbols-outlined text-white text-[18px]">person</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="flex flex-col relative w-full pt-14 pb-24 bg-[#f8f9ff]">
        {/* 1. Image Gallery Carousel Area */}
        <div className="relative w-full aspect-square bg-[#dee9fc] overflow-hidden">
          <div
            className="flex w-full h-full transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
          >
            {gallery.map((imgSrc, idx) => (
              <div key={idx} className="w-full h-full flex-shrink-0 relative">
                <img
                  className="w-full h-full object-cover"
                  src={imgSrc}
                  alt={`${product.title} - ${idx + 1}`}
                />
              </div>
            ))}
          </div>

          {/* Gallery Counter Badge */}
          <div className="absolute bottom-3 right-3 bg-[#27313f]/70 backdrop-blur-md px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
            <span className="material-symbols-outlined text-[13px] text-white">photo_camera</span>
            <span className="text-[10px] text-white font-medium">
              {currentImageIndex + 1}/{gallery.length}
            </span>
          </div>

          {/* Floating Favorite Heart Button */}
          <button
            onClick={() => toggleFavorite(product.id)}
            className="absolute top-3 right-3 bg-white/80 backdrop-blur-md p-2 rounded-full shadow-sm text-[#121c2a] hover:scale-105 active:scale-95 transition-all flex items-center justify-center"
            title="收藏"
          >
            <span
              className={`material-symbols-outlined text-[20px] ${
                favorited ? 'text-[#b22204]' : 'text-[#121c2a]'
              }`}
              style={{ fontVariationSettings: favorited ? "'FILL' 1" : "'FILL' 0" }}
            >
              {favorited ? 'favorite' : 'favorite_border'}
            </span>
          </button>
        </div>

        {/* 2. Promotional Flash Sale Ribbon */}
        <div className="w-full bg-gradient-to-r from-[#b22204] via-[#d63c1e] to-[#fda625] px-3 py-2 flex items-center justify-between text-white shadow-sm">
          <div className="flex items-baseline gap-1.5">
            <div className="flex items-center gap-0.5 bg-white/20 px-1.5 py-0.5 rounded text-white text-[10px]">
              <span className="material-symbols-outlined text-[14px]">bolt</span>
              <span>限时秒杀</span>
            </div>
            <div className="flex items-baseline">
              <span className="text-xs font-bold text-white">¥</span>
              <span className="text-[26px] font-bold text-white tracking-tight ml-0.5">
                {currentPrice.toFixed(1)}
              </span>
            </div>
            <div className="flex flex-col ml-1">
              <span className="text-[10px] line-through opacity-75">
                ¥{product.originalPrice}
              </span>
              <span className="text-[9px] bg-white text-[#b22204] px-1 rounded-sm font-bold">
                {product.discountBadge || '3.8折'}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-[10px] text-white/90">距秒杀结束</span>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="bg-[#27313f] text-[#eaf1ff] px-1 py-0.5 rounded text-[10px] font-bold">
                {h}
              </span>
              <span className="text-[10px] text-white font-bold">:</span>
              <span className="bg-[#27313f] text-[#eaf1ff] px-1 py-0.5 rounded text-[10px] font-bold">
                {m}
              </span>
              <span className="text-[10px] text-white font-bold">:</span>
              <span className="bg-[#27313f] text-[#eaf1ff] px-1 py-0.5 rounded text-[10px] font-bold">
                {s}
              </span>
            </div>
          </div>
        </div>

        {/* 3. Main Product Core Information Card */}
        <div className="bg-white px-3 pt-3 pb-3 flex flex-col gap-2 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
          {/* Progress and Sales Stats */}
          <div className="flex items-center justify-between text-[#5b403b] text-[10px]">
            <div className="flex items-center gap-2">
              <div className="w-24 h-2 bg-[#e6eeff] rounded-full overflow-hidden flex">
                <div
                  className="h-full bg-gradient-to-r from-[#fda625] to-[#b22204] rounded-full"
                  style={{ width: `${product.flashSoldPercent || 92}%` }}
                ></div>
              </div>
              <span className="text-[#b22204] font-semibold">
                已抢 {product.flashSoldPercent || 92}%
              </span>
            </div>
            <span>{product.salesCount}</span>
          </div>

          {/* Product Title */}
          <h2 className="text-base text-[#121c2a] font-bold leading-snug">
            <span className="bg-[#b22204] text-white text-[10px] px-1.5 py-0.5 rounded-sm mr-1 inline-block align-middle font-medium">
              官方直营
            </span>
            {product.title}
          </h2>

          {/* Promotion Badges Tags */}
          <div className="flex flex-wrap items-center gap-1 pt-0.5">
            <span className="bg-[#ffdad9] text-[#920021] px-1.5 py-0.5 rounded text-[10px] flex items-center gap-0.5 font-medium">
              <span className="material-symbols-outlined text-[12px]">local_fire_department</span>
              热卖爆款榜 TOP1
            </span>
            <span className="bg-[#ffddb9] text-[#2b1700] px-1.5 py-0.5 rounded text-[10px] font-medium">
              A类母婴级亲肤
            </span>
            <span className="bg-[#e6eeff] text-[#5b403b] px-1.5 py-0.5 rounded text-[10px] font-medium">
              水洗免熨烫
            </span>
          </div>
        </div>

        {/* 4. Coupon Strip Banner */}
        <div className="mt-2 bg-white px-3 py-2.5 flex items-center justify-between shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <div
              onClick={() => claimCoupon('c-69-15')}
              className="flex items-center bg-[#ffdad9]/60 text-[#b22204] text-[10px] px-2 py-1 rounded cursor-pointer hover:bg-[#ffdad9]"
            >
              <span className="font-bold">满69减15</span>
            </div>
            <div
              onClick={() => claimCoupon('c-99-20')}
              className="flex items-center bg-[#ffdad9]/60 text-[#b22204] text-[10px] px-2 py-1 rounded cursor-pointer hover:bg-[#ffdad9]"
            >
              <span className="font-bold">店铺券满99减20</span>
            </div>
          </div>
          <button
            onClick={() => {
              claimCoupon('c-69-15');
              claimCoupon('c-99-20');
            }}
            className="flex items-center text-[#b22204] text-[11px] font-bold flex-shrink-0 ml-2"
          >
            立即领券
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        {/* 5. Trust Assurance Badges */}
        <div className="mt-1 bg-[#eff4ff] px-3 py-2 flex items-center justify-between text-[#5b403b] text-[10px]">
          <div className="flex items-center gap-0.5">
            <span className="material-symbols-outlined text-[15px] text-[#b22204]">verified</span>
            <span>正品保障</span>
          </div>
          <div className="flex items-center gap-0.5">
            <span className="material-symbols-outlined text-[15px] text-[#b22204]">local_shipping</span>
            <span>赠送运费险</span>
          </div>
          <div className="flex items-center gap-0.5">
            <span className="material-symbols-outlined text-[15px] text-[#b22204]">published_with_changes</span>
            <span>7天无理由</span>
          </div>
          <div className="flex items-center gap-0.5">
            <span className="material-symbols-outlined text-[15px] text-[#b22204]">bolt</span>
            <span>极速退款</span>
          </div>
        </div>

        {/* 6. SKU Variant Interactive Selector Module */}
        <div className="mt-2 bg-white px-3 py-3 flex flex-col gap-3 shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
          {/* Size Selector */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#121c2a]">尺寸规格</span>
              <span
                onClick={() => showToast('标准四件套尺寸指南：单人1.2m/双人1.5m/大床1.8m')}
                className="text-[10px] text-[#5b403b] cursor-pointer hover:text-[#b22204]"
              >
                查看尺寸指南
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1.5 pt-1">
              {(product.sizes || [
                { name: '1.2m学生单人', price: 39.9 },
                { name: '1.5m常规双人', price: 49.9 },
                { name: '1.8m大床四件套', price: 59.9 },
              ]).map((sizeItem) => {
                const isSelected = selectedSize === sizeItem.name;
                return (
                  <button
                    key={sizeItem.name}
                    type="button"
                    onClick={() => handleSelectSize(sizeItem.name, sizeItem.price)}
                    className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all text-center cursor-pointer ${
                      isSelected
                        ? 'bg-[#ffdad9] text-[#b22204] ring-1 ring-[#b22204]'
                        : 'bg-[#eff4ff] text-[#121c2a] hover:bg-[#e6eeff]'
                    }`}
                  >
                    <span className={`text-[11px] ${isSelected ? 'font-bold' : 'font-normal'}`}>
                      {sizeItem.name}
                    </span>
                    <span
                      className={`text-[10px] ${
                        isSelected ? 'font-semibold text-[#b22204]' : 'text-[#5b403b]'
                      }`}
                    >
                      ¥{sizeItem.price.toFixed(1)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Colorway Selector */}
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold text-[#121c2a]">花色款式</span>
            <div className="grid grid-cols-4 gap-1.5 pt-1">
              {(product.colors || [
                { name: '燕麦米', colorHex: '#EAE3D2', imageIndex: 0 },
                { name: '抹茶绿', colorHex: '#B8C9A6', imageIndex: 1 },
                { name: '奶油格纹', colorHex: '#F3ECE1', isGrid: true, imageIndex: 2 },
                { name: '浅空灰', colorHex: '#CCD0D6', imageIndex: 3 },
              ]).map((colorItem) => {
                const isSelected = selectedColor === colorItem.name;
                return (
                  <button
                    key={colorItem.name}
                    type="button"
                    onClick={() => handleSelectColor(colorItem.name, colorItem.imageIndex)}
                    className={`flex flex-col items-center p-1.5 rounded-lg transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#ffdad9] text-[#b22204] ring-1 ring-[#b22204]'
                        : 'bg-[#eff4ff] text-[#121c2a] hover:bg-[#e6eeff]'
                    }`}
                  >
                    <div
                      className="w-8 h-8 rounded-full shadow-inner mb-1 flex items-center justify-center border border-black/5"
                      style={{ backgroundColor: colorItem.colorHex || '#eae3d2' }}
                    >
                      {colorItem.isGrid && (
                        <span className="material-symbols-outlined text-[14px] text-[#8f7069]">
                          grid_on
                        </span>
                      )}
                    </div>
                    <span className={`text-[10px] ${isSelected ? 'font-bold' : 'font-normal'}`}>
                      {colorItem.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Summary Badge */}
          <div className="bg-[#eff4ff] px-3 py-1.5 rounded-lg flex items-center justify-between text-[#5b403b] text-[10px]">
            <span>已选：{selectedSize}，{selectedColor}，1件</span>
            <span className="text-[#b22204] font-bold">库存充足</span>
          </div>
        </div>

        {/* 7. Buyer Reviews & Sentiment Tags */}
        <div className="mt-2 bg-white px-3 py-3 flex flex-col gap-2 shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <h3 className="text-sm font-bold text-[#121c2a]">宝贝评价</h3>
              <span className="text-[10px] text-[#5b403b]">(2.8万+条)</span>
              <div className="flex items-center ml-1 bg-[#ffddb9] text-[#2b1700] px-1.5 py-0.5 rounded text-[10px] font-bold">
                <span
                  className="material-symbols-outlined text-[13px] mr-0.5 text-[#865300]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <span>4.9分</span>
              </div>
            </div>
            <button
              onClick={() => showToast('已为您加载全部真实好评')}
              className="text-[11px] text-[#b22204] flex items-center hover:opacity-80"
            >
              查看全部
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>

          {/* Review Highlight Tags */}
          <div className="flex flex-wrap gap-1 pt-1">
            <span className="bg-[#ffdad9]/60 text-[#920021] px-2 py-0.5 rounded-full text-[10px]">
              面料舒服 (1.2w)
            </span>
            <span className="bg-[#e6eeff] text-[#5b403b] px-2 py-0.5 rounded-full text-[10px]">
              不起球 (8500)
            </span>
            <span className="bg-[#e6eeff] text-[#5b403b] px-2 py-0.5 rounded-full text-[10px]">
              尺寸合适 (6400)
            </span>
            <span className="bg-[#e6eeff] text-[#5b403b] px-2 py-0.5 rounded-full text-[10px]">
              颜色温和 (4210)
            </span>
          </div>

          {/* Verified Review Card Item */}
          <div className="bg-[#eff4ff]/60 p-2.5 rounded-xl flex flex-col gap-1.5 mt-1 border border-slate-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="w-7 h-7 rounded-full bg-[#ffb961]/60 flex items-center justify-center text-[#2b1700] font-bold text-[10px]">
                  李*
                </div>
                <span className="text-[11px] text-[#121c2a] font-medium">李**同学 (VIP4)</span>
              </div>
              <span className="text-[10px] text-[#5b403b]">2天前</span>
            </div>
            <p className="text-xs text-[#121c2a] leading-relaxed">
              下水洗过后一点都没缩水！天然水洗棉的轻微肌理感非常舒服，透气不闷汗，燕麦米色调很治愈，室友看到都要了链接～
            </p>
            <div className="flex gap-1.5 mt-1">
              <div className="w-16 h-16 rounded-lg bg-[#dee9fc] overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkX90-t6_DGdDSrNUojZOlny0gFHmlgPz7cDx5KA0sFrHQSWVg9p7BOfhYl6thZxzg21jrD2Ps3PFPU1NjIw6gaqgsqExzntuy6o347_YJnPwUxd4Gyv0OcnEwsF_kQhqf7X36o4O9slJkgGYwE39bWcR1VPem3VUz0wCEihqzNyq0vk-4863JM4j7YuPYNMj0UNr2x3yozvS6L_1L_qO5ORiWS2mxmMWV6qPutw1tcSwI0nxIzRR1Sg"
                  alt="买家晒图"
                />
              </div>
              <div className="w-16 h-16 rounded-lg bg-[#dee9fc] overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVp86ZMG0fWudgdXKlGCKZfIQcMC8vp5WRRR5qkzHhr8P_N4YS3joQ500GLcdIYFTJFhiuqEFywmRdiwCk-LndZ1von7DIEGQ6NidIS6HYo2i6WiLO4HjL65E79ZqzwijQnGibJXpHOPpRo78V6dM6R8tnExvvQVm4QEn9R7cVtZORkkoy2AtrJibrm8PURoMId9bAZ0znEpEy8A__YCUVJPno2fMgvgZQqXrSwj7WtdFWqrxiFs4nPA"
                  alt="买家细节"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 8. Product Story Details Overview */}
        <div className="mt-2 bg-white px-3 py-3 flex flex-col gap-2">
          <div className="flex items-center justify-center gap-2 py-2">
            <span className="h-[1px] w-12 bg-[#d9e3f6]"></span>
            <span className="text-[11px] text-[#5b403b] tracking-wider font-medium">
              图文详情 · 亲肤实测
            </span>
            <span className="h-[1px] w-12 bg-[#d9e3f6]"></span>
          </div>
          <div className="rounded-xl overflow-hidden shadow-sm">
            <img
              className="w-full h-auto object-cover"
              src={
                product.detailsImage ||
                'https://lh3.googleusercontent.com/aida-public/AB6AXuCA906eszsVys5HBvMKUmw6JjCoba2ETECmvax1HENmZi4K1kVhtxdRS_Z9jMee93sSnsMipokHqP2VXYNrH4-Pinp5eVm-TCPFM6GDWIB053JSRqk6lEmrFGv6w30M0h0sg182n7x0y2ZjY0R6R1BIdcAu3KrTh7BqtX3hPN31IeKmeG1yY5Kbs5bnN6_KsCD3RB0xdsyfTGoh47I_hp4X7wZ48RU3WCmh2y6cM_kmhcV3CZnINwoFdA'
              }
              alt="商品图文详情"
            />
          </div>
        </div>
      </main>

      {/* 9. Sticky Dual CTA Purchase Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg px-3 py-2 pb-safe flex items-center justify-between gap-1 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] border-t border-slate-100 max-w-md mx-auto">
        {/* Utility Buttons */}
        <div className="flex items-center justify-around flex-shrink-0 gap-2 pr-1">
          <button
            onClick={() => setActiveTab('home')}
            className="flex flex-col items-center justify-center text-[#5b403b] hover:text-[#b22204] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">storefront</span>
            <span className="text-[9px]">店铺</span>
          </button>
          <button
            onClick={openChat}
            className="flex flex-col items-center justify-center text-[#5b403b] hover:text-[#b22204] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">support_agent</span>
            <span className="text-[9px]">客服</span>
          </button>
          <button
            onClick={() => toggleFavorite(product.id)}
            className={`flex flex-col items-center justify-center transition-colors ${
              favorited ? 'text-[#b22204]' : 'text-[#5b403b] hover:text-[#b22204]'
            }`}
          >
            <span
              className="material-symbols-outlined text-[20px]"
              style={{ fontVariationSettings: favorited ? "'FILL' 1" : "'FILL' 0" }}
            >
              {favorited ? 'favorite' : 'favorite_border'}
            </span>
            <span className="text-[9px]">收藏</span>
          </button>
        </div>

        {/* Dual Action Split Pill Button */}
        <div className="flex-1 flex h-11 rounded-full overflow-hidden shadow-sm">
          <button
            onClick={() => addToCart(product, selectedSize, selectedColor)}
            className="flex-1 bg-gradient-to-r from-[#fda625] to-[#ffb961] text-white flex flex-col items-center justify-center active:scale-[0.98] transition-transform cursor-pointer"
          >
            <span className="text-xs font-bold leading-tight">加入购物车</span>
            <span className="text-[9px] opacity-90 scale-90">领券折上折</span>
          </button>
          <button
            onClick={() => buyNow(product, selectedSize, selectedColor)}
            className="flex-1 bg-gradient-to-r from-[#d63c1e] to-[#b22204] text-white flex flex-col items-center justify-center active:scale-[0.98] transition-transform cursor-pointer"
          >
            <span className="text-xs font-bold leading-tight">立即购买</span>
            <span className="text-[9px] opacity-90 scale-90">秒杀特惠</span>
          </button>
        </div>
      </div>
    </div>
  );
};
