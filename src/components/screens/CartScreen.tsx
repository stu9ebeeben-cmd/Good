import React from 'react';
import { useApp } from '../../context/AppContext';
import { PRODUCTS } from '../../data/products';
import { Product } from '../../types';

export const CartScreen: React.FC = () => {
  const {
    cartItems,
    updateCartItemQuantity,
    toggleCartItemSelect,
    toggleSelectAll,
    removeCartItem,
    cartSelectedCount,
    cartOriginalTotal,
    cartFinalTotal,
    checkoutCart,
    setActiveTab,
    openProductDetail,
  } = useApp();

  const allSelected = cartItems.length > 0 && cartItems.every((item) => item.selected);
  const rawSubTotal = cartItems
    .filter((item) => item.selected)
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  const discountSaved = Math.max(0, cartOriginalTotal - cartFinalTotal);

  return (
    <div className="flex flex-col w-full pb-28 max-w-md mx-auto min-h-screen bg-[#f8f9ff]">
      {/* Top Header */}
      <div className="bg-white px-3 py-3 shadow-xs sticky top-14 z-20 flex items-center justify-between border-b border-slate-100">
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[22px] text-[#b22204]">shopping_cart</span>
          <h2 className="text-base font-bold text-[#121c2a]">购物车</h2>
          <span className="text-xs text-[#5b403b]">({cartItems.length})</span>
        </div>
        <button
          onClick={() => setActiveTab('discover')}
          className="text-xs text-[#b22204] font-medium flex items-center hover:opacity-80"
        >
          <span>去拼单</span>
          <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
        </button>
      </div>

      {/* Free Shipping Urgency Banner */}
      <div className="bg-[#dee9fc] px-3 py-2 flex items-center justify-between text-[11px] text-[#121c2a]">
        <div className="flex items-center gap-1">
          <span className="material-symbols-outlined text-[15px] text-[#b22204]">verified</span>
          <span>已享全场满29包邮 · 赠送运费险 · 7天无理由退换</span>
        </div>
        <span className="text-[#b22204] font-bold">免运费</span>
      </div>

      {/* Cart Items List */}
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <div className="w-16 h-16 rounded-full bg-[#dee9fc] flex items-center justify-center text-[#5b403b] mb-3">
            <span className="material-symbols-outlined text-[32px]">remove_shopping_cart</span>
          </div>
          <p className="text-sm font-bold text-[#121c2a]">购物车空空如也</p>
          <p className="text-xs text-[#8f7069] mt-1">快去挑选心仪的特惠好物吧</p>
          <button
            onClick={() => setActiveTab('home')}
            className="mt-4 px-6 py-2 bg-[#b22204] text-white text-xs font-bold rounded-full shadow-sm hover:bg-[#d63c1e] active:scale-95 transition-all"
          >
            去逛逛精选
          </button>
        </div>
      ) : (
        <div className="px-3 pt-2 flex flex-col gap-2">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl p-2.5 shadow-sm flex items-center gap-2 relative border border-slate-100/60"
            >
              {/* Checkbox */}
              <button
                type="button"
                onClick={() => toggleCartItemSelect(item.id)}
                className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 cursor-pointer transition-all ${
                  item.selected
                    ? 'bg-[#b22204] text-white'
                    : 'border border-slate-300 bg-white text-transparent'
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">check</span>
              </button>

              {/* Thumbnail */}
              <div
                onClick={() => {
                  const prod = PRODUCTS.find((p) => p.id === item.productId);
                  if (prod) openProductDetail(prod);
                }}
                className="w-20 h-20 rounded-lg overflow-hidden bg-[#dee9fc] flex-shrink-0 cursor-pointer"
              >
                <img
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                  src={item.image}
                  alt={item.title}
                />
              </div>

              {/* Item Info */}
              <div className="flex-1 min-w-0 flex flex-col justify-between h-20 py-0.5">
                <div>
                  <h4 className="text-xs font-semibold text-[#121c2a] line-clamp-1 leading-snug">
                    {item.title}
                  </h4>
                  <div className="mt-1 inline-flex items-center gap-1 bg-[#eff4ff] text-[#5b403b] text-[9px] px-1.5 py-0.5 rounded">
                    <span>{item.size}</span>
                    <span>·</span>
                    <span>{item.color}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-1">
                  <div className="flex items-baseline gap-1">
                    <span className="text-[10px] font-bold text-[#b22204]">¥</span>
                    <span className="text-base font-bold text-[#b22204]">{item.price}</span>
                    <span className="text-[10px] text-[#8f7069] line-through">
                      ¥{item.originalPrice}
                    </span>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-slate-200 rounded-md overflow-hidden bg-[#f8f9ff]">
                    <button
                      onClick={() => updateCartItemQuantity(item.id, -1)}
                      className="w-6 h-6 flex items-center justify-center text-[#5b403b] hover:bg-slate-200 active:scale-95 transition-all text-xs"
                    >
                      -
                    </button>
                    <span className="w-7 text-center text-xs font-semibold text-[#121c2a]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateCartItemQuantity(item.id, 1)}
                      className="w-6 h-6 flex items-center justify-center text-[#5b403b] hover:bg-slate-200 active:scale-95 transition-all text-xs"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Remove button */}
              <button
                onClick={() => removeCartItem(item.id)}
                className="absolute top-2 right-2 text-slate-300 hover:text-[#b22204] transition-colors p-1"
                title="删除商品"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>
          ))}

          {/* Coupon summary banner inside cart */}
          <div className="bg-white rounded-xl p-3 shadow-sm border border-slate-100 flex flex-col gap-1.5 mt-1 text-xs">
            <div className="flex items-center justify-between text-[#5b403b]">
              <span>商品总计</span>
              <span>¥{rawSubTotal.toFixed(2)}</span>
            </div>
            {rawSubTotal >= 69 && (
              <div className="flex items-center justify-between text-[#b22204]">
                <span>满减优惠 (已自动抵扣)</span>
                <span>-¥{(rawSubTotal - cartFinalTotal).toFixed(2)}</span>
              </div>
            )}
            <div className="flex items-center justify-between text-[#5b403b]">
              <span>运费</span>
              <span className="text-[#b22204] font-medium">免运费</span>
            </div>
            <div className="border-t border-slate-100 pt-1.5 flex items-center justify-between font-bold text-[#121c2a]">
              <span>预估到手</span>
              <span className="text-base text-[#b22204]">¥{cartFinalTotal}</span>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Bottom Checkout Bar */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-14 left-0 right-0 z-40 bg-white/95 backdrop-blur-md px-3 py-2 border-t border-slate-200 shadow-lg flex items-center justify-between max-w-md mx-auto">
          {/* Select all toggle */}
          <div
            onClick={toggleSelectAll}
            className="flex items-center gap-1.5 cursor-pointer select-none"
          >
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                allSelected ? 'bg-[#b22204] text-white' : 'border border-slate-300 bg-white text-transparent'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">check</span>
            </div>
            <span className="text-xs font-semibold text-[#121c2a]">全选</span>
          </div>

          {/* Price & Checkout button */}
          <div className="flex items-center gap-2.5">
            <div className="flex flex-col items-end">
              <div className="flex items-baseline">
                <span className="text-xs font-normal text-[#121c2a] mr-1">合计:</span>
                <span className="text-xs font-bold text-[#b22204]">¥</span>
                <span className="text-lg font-bold text-[#b22204]">{cartFinalTotal}</span>
              </div>
              {discountSaved > 0 && (
                <span className="text-[9px] text-[#8f7069]">已省 ¥{discountSaved.toFixed(1)}</span>
              )}
            </div>

            <button
              onClick={checkoutCart}
              disabled={cartSelectedCount === 0}
              className={`px-5 py-2.5 rounded-full text-xs font-bold shadow-md transition-all flex items-center gap-1 cursor-pointer ${
                cartSelectedCount > 0
                  ? 'bg-gradient-to-r from-[#d63c1e] to-[#b22204] text-white active:scale-95'
                  : 'bg-slate-300 text-slate-500 cursor-not-allowed'
              }`}
            >
              <span>去结算</span>
              <span>({cartSelectedCount})</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
