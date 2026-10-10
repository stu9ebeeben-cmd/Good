import React from 'react';
import { useApp } from '../../context/AppContext';

export const ProfileScreen: React.FC = () => {
  const { orders, coupons, favorites, openChat, setActiveTab, showToast } = useApp();

  const claimedCouponsCount = coupons.filter((c) => c.claimed).length;

  const orderTabs = [
    { label: '待付款', icon: 'account_balance_wallet', count: 0 },
    {
      label: '待发货',
      icon: 'inventory_2',
      count: orders.filter((o) => o.status === 'pending_shipping').length,
    },
    {
      label: '待收货',
      icon: 'local_shipping',
      count: orders.filter((o) => o.status === 'pending_receiving').length,
    },
    { label: '待评价', icon: 'rate_review', count: 1 },
    { label: '退款/售后', icon: 'assignment_return', count: 0 },
  ];

  const tools = [
    { title: '我的拼单', icon: 'group', action: () => setActiveTab('discover') },
    { title: '领券中心', icon: 'confirmation_number', action: () => showToast('已领神券已存入卡包！') },
    { title: '收货地址', icon: 'location_on', action: () => showToast('北京市朝阳区三里屯路88号 (默认)') },
    { title: '浏览足迹', icon: 'history', action: () => showToast('已记录您最近浏览的12件商品') },
    { title: '在线客服', icon: 'support_agent', action: () => openChat() },
    { title: '官方保障', icon: 'verified_user', action: () => showToast('聚惠商城假一赔十 · 阳光正品') },
  ];

  return (
    <div className="flex flex-col w-full pb-20 max-w-md mx-auto min-h-screen bg-[#f8f9ff]">
      {/* User Hero Banner */}
      <div className="bg-gradient-to-br from-[#b22204] via-[#d63c1e] to-[#fda625] pt-14 pb-8 px-4 text-white shadow-md relative overflow-hidden">
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-14 h-14 rounded-full bg-white/20 p-1 backdrop-blur-md flex-shrink-0">
            <div className="w-full h-full rounded-full bg-[#ffddb9] text-[#2b1700] flex items-center justify-center font-bold text-lg shadow-inner">
              李*
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <h2 className="text-lg font-bold">李**同学</h2>
              <span className="bg-[#ffddb9] text-[#2b1700] text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                VIP4
              </span>
            </div>
            <span className="text-xs text-[#ffdad3] mt-0.5">聚惠会员尊享9.5折及专享礼遇</span>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-2 mt-5 text-center relative z-10 pt-2 border-t border-white/20">
          <div className="flex flex-col cursor-pointer" onClick={() => showToast('您当前拥有1,280商城积分')}>
            <span className="text-base font-bold">1,280</span>
            <span className="text-[10px] text-[#ffdad3] mt-0.5">积分</span>
          </div>
          <div className="flex flex-col cursor-pointer" onClick={() => showToast(`已领取 ${claimedCouponsCount} 张可用优惠券`)}>
            <span className="text-base font-bold">{claimedCouponsCount}</span>
            <span className="text-[10px] text-[#ffdad3] mt-0.5">优惠券</span>
          </div>
          <div className="flex flex-col cursor-pointer" onClick={() => showToast(`已收藏 ${favorites.length} 件好物`)}>
            <span className="text-base font-bold">{favorites.length}</span>
            <span className="text-[10px] text-[#ffdad3] mt-0.5">收藏夹</span>
          </div>
          <div className="flex flex-col cursor-pointer" onClick={() => showToast('已关注 6 家官方直营品牌店')}>
            <span className="text-base font-bold">6</span>
            <span className="text-[10px] text-[#ffdad3] mt-0.5">关注店铺</span>
          </div>
        </div>

        {/* Ambient light graphic */}
        <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none"></div>
      </div>

      {/* Orders Status Tracking Card */}
      <div className="px-3 -mt-3 relative z-20">
        <div className="bg-white rounded-xl p-3 shadow-sm border border-slate-100/80">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-bold text-[#121c2a]">我的订单</span>
            <span
              onClick={() => showToast('查看全部订单记录')}
              className="text-[11px] text-[#8f7069] flex items-center hover:text-[#b22204] cursor-pointer"
            >
              全部订单
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            </span>
          </div>

          <div className="grid grid-cols-5 gap-1 pt-3 text-center">
            {orderTabs.map((tab) => (
              <div
                key={tab.label}
                onClick={() => showToast(`查看【${tab.label}】状态订单`)}
                className="flex flex-col items-center cursor-pointer group relative"
              >
                <div className="w-8 h-8 rounded-full bg-[#eff4ff] text-[#b22204] flex items-center justify-center group-hover:bg-[#dee9fc] transition-colors relative">
                  <span className="material-symbols-outlined text-[20px]">{tab.icon}</span>
                  {tab.count > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#b22204] text-white text-[9px] font-bold flex items-center justify-center">
                      {tab.count}
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-[#121c2a] mt-1.5 font-medium">{tab.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders List */}
      <div className="px-3 pt-3 flex flex-col gap-2">
        <h3 className="text-xs font-bold text-[#121c2a] px-1">近期订单</h3>
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-xl p-3 shadow-sm border border-slate-100 flex flex-col gap-2">
            <div className="flex items-center justify-between text-[11px] pb-1.5 border-b border-slate-100">
              <span className="text-[#8f7069]">订单号: {order.orderNumber}</span>
              <span className="text-[#b22204] font-semibold">
                {order.status === 'pending_shipping'
                  ? '等待商家发货'
                  : order.status === 'pending_receiving'
                  ? '运输中 · 顺丰速运'
                  : '已完成'}
              </span>
            </div>

            {order.items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2.5">
                <div className="w-14 h-14 rounded-lg bg-[#dee9fc] overflow-hidden flex-shrink-0">
                  <img className="w-full h-full object-cover" src={item.image} alt={item.title} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-semibold text-[#121c2a] truncate">{item.title}</h4>
                  <div className="text-[10px] text-[#8f7069] mt-0.5">
                    {item.size} · {item.color} · x{item.quantity}
                  </div>
                  <div className="text-xs font-bold text-[#b22204] mt-0.5">¥{item.price}</div>
                </div>
              </div>
            ))}

            <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-xs">
              <span className="text-[#8f7069] text-[10px]">{order.date}</span>
              <div className="flex items-center gap-2">
                <span className="text-[#121c2a] font-medium">实付款: <strong className="text-[#b22204]">¥{order.totalAmount}</strong></span>
                <button
                  onClick={() => showToast('物流已更新：快件已离开分拨中心，正发往当地派送网点')}
                  className="px-2.5 py-1 rounded-full border border-slate-300 text-[10px] text-[#121c2a] hover:border-[#b22204] hover:text-[#b22204] active:scale-95 transition-all"
                >
                  查看物流
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Useful Services Grid */}
      <div className="px-3 pt-3">
        <div className="bg-white rounded-xl p-3 shadow-sm border border-slate-100">
          <h3 className="text-xs font-bold text-[#121c2a] mb-2">我的服务</h3>
          <div className="grid grid-cols-3 gap-2">
            {tools.map((t) => (
              <button
                key={t.title}
                onClick={t.action}
                className="flex flex-col items-center p-2 rounded-lg hover:bg-[#f8f9ff] active:scale-95 transition-all cursor-pointer"
              >
                <div className="w-9 h-9 rounded-full bg-[#eff4ff] text-[#b22204] flex items-center justify-center mb-1">
                  <span className="material-symbols-outlined text-[20px]">{t.icon}</span>
                </div>
                <span className="text-[11px] text-[#121c2a]">{t.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
