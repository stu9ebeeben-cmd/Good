import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, Coupon, Order, TabType } from '../types';
import { PRODUCTS, INITIAL_CART_ITEMS, INITIAL_COUPONS } from '../data/products';

interface ToastState {
  message: string;
  visible: boolean;
  type?: 'success' | 'info';
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'support';
  text: string;
  time: string;
}

interface AppContextType {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  selectedProduct: Product | null;
  openProductDetail: (product: Product) => void;
  closeProductDetail: () => void;
  
  // Cart
  cartItems: CartItem[];
  addToCart: (product: Product, sizeName?: string, colorName?: string, quantity?: number) => void;
  updateCartItemQuantity: (id: string, delta: number) => void;
  toggleCartItemSelect: (id: string) => void;
  toggleSelectAll: () => void;
  removeCartItem: (id: string) => void;
  cartTotalCount: number;
  cartSelectedCount: number;
  cartOriginalTotal: number;
  cartFinalTotal: number;
  
  // Coupons
  coupons: Coupon[];
  claimCoupon: (id: string) => void;
  
  // Favorites
  favorites: string[];
  toggleFavorite: (productId: string) => boolean;
  isFavorite: (productId: string) => boolean;
  
  // Toast
  toast: ToastState;
  showToast: (message: string) => void;
  
  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  searchHistory: string[];
  clearSearchHistory: () => void;
  
  // Customer Service Chat
  isChatOpen: boolean;
  openChat: () => void;
  closeChat: () => void;
  chatMessages: ChatMessage[];
  sendChatMessage: (text: string) => void;
  
  // Bundle Group Buy (任选3件只需¥19.9)
  isBundleOpen: boolean;
  openBundle: () => void;
  closeBundle: () => void;
  selectedBundleIds: string[];
  toggleBundleItem: (productId: string) => void;
  checkoutBundle: () => void;
  
  // Orders
  orders: Order[];
  checkoutCart: () => void;
  buyNow: (product: Product, size?: string, color?: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART_ITEMS);
  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS);
  const [favorites, setFavorites] = useState<string[]>(['p-bedding-set']);
  
  const [toast, setToast] = useState<ToastState>({
    message: '',
    visible: false,
  });
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([
    '纯棉四件套', '爆款手机', '9.9包邮', '螺蛳粉', '防晒衣'
  ]);
  
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'support',
      text: '您好！欢迎光临聚惠官方旗舰店，今天全场享跨店满减与新人专享券，请问有什么可以帮您？',
      time: '14:30',
    },
  ]);
  
  const [isBundleOpen, setIsBundleOpen] = useState(false);
  const [selectedBundleIds, setSelectedBundleIds] = useState<string[]>([
    'p-tissue-box', 'p-microfiber-cloth', 'p-mandarin'
  ]);
  
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ord-1001',
      orderNumber: 'JH20261005882194',
      date: '2026-10-04 18:22',
      status: 'pending_receiving',
      items: [
        {
          id: 'c-prev-1',
          productId: 'p-apples',
          title: '现摘精选红富士苹果 5斤装 新鲜脆甜多汁',
          price: 19.9,
          originalPrice: 39.9,
          image: PRODUCTS.find(p => p.id === 'p-apples')?.image || '',
          size: '5斤实惠装',
          color: '特级果',
          quantity: 1,
          selected: true,
        }
      ],
      totalAmount: 19.9,
    }
  ]);

  const showToast = (message: string) => {
    setToast({ message, visible: true });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 2200);
  };

  const openProductDetail = (product: Product) => {
    setSelectedProduct(product);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const closeProductDetail = () => {
    setSelectedProduct(null);
  };

  const addToCart = (product: Product, sizeName?: string, colorName?: string, quantity: number = 1) => {
    const size = sizeName || (product.sizes ? product.sizes[0].name : '标准规格');
    const color = colorName || (product.colors ? product.colors[0].name : '默认款');
    const price = product.sizes ? (product.sizes.find(s => s.name === size)?.price || product.price) : product.price;

    setCartItems(prev => {
      const existing = prev.find(item => item.productId === product.id && item.size === size && item.color === color);
      if (existing) {
        return prev.map(item => item.id === existing.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [
        ...prev,
        {
          id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          productId: product.id,
          title: product.title,
          price,
          originalPrice: product.originalPrice,
          image: product.image,
          size,
          color,
          quantity,
          selected: true,
        }
      ];
    });

    showToast(`${product.subTitle || '商品'} 已成功加入购物车`);
  };

  const updateCartItemQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQ = item.quantity + delta;
        return newQ > 0 ? { ...item, quantity: newQ } : item;
      }
      return item;
    }));
  };

  const toggleCartItemSelect = (id: string) => {
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, selected: !item.selected } : item));
  };

  const toggleSelectAll = () => {
    const allSelected = cartItems.length > 0 && cartItems.every(item => item.selected);
    setCartItems(prev => prev.map(item => ({ ...item, selected: !allSelected })));
  };

  const removeCartItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    showToast('已从购物车移除');
  };

  const cartTotalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSelectedCount = cartItems.filter(item => item.selected).reduce((acc, item) => acc + item.quantity, 0);

  const cartOriginalTotal = Number(
    cartItems
      .filter(item => item.selected)
      .reduce((sum, item) => sum + item.originalPrice * item.quantity, 0)
      .toFixed(2)
  );

  const rawSubTotal = cartItems
    .filter(item => item.selected)
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Apply applicable coupons
  let discountDeduction = 0;
  if (rawSubTotal >= 200) {
    discountDeduction += 30; // 满200减30
  } else if (rawSubTotal >= 100) {
    discountDeduction += 20; // 满100减20
  } else if (rawSubTotal >= 69) {
    discountDeduction += 15; // 满69减15
  }

  const cartFinalTotal = Number(Math.max(0, rawSubTotal - discountDeduction).toFixed(2));

  const claimCoupon = (id: string) => {
    setCoupons(prev => prev.map(c => c.id === id ? { ...c, claimed: true } : c));
    const target = coupons.find(c => c.id === id);
    showToast(`已成功领取【${target?.title || '优惠券'}】！`);
  };

  const toggleFavorite = (productId: string) => {
    let nowFavorited = false;
    setFavorites(prev => {
      if (prev.includes(productId)) {
        nowFavorited = false;
        return prev.filter(id => id !== productId);
      } else {
        nowFavorited = true;
        return [...prev, productId];
      }
    });
    showToast(nowFavorited ? '已添加至收藏夹' : '已取消收藏');
    return nowFavorited;
  };

  const isFavorite = (productId: string) => favorites.includes(productId);

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);
  const clearSearchHistory = () => setSearchHistory([]);

  const openChat = () => setIsChatOpen(true);
  const closeChat = () => setIsChatOpen(false);

  const sendChatMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages(prev => [...prev, userMsg]);

    setTimeout(() => {
      let reply = '收到您的留言，客服小聚正在为您核实优惠活动与发货进度！';
      const lower = text.toLowerCase();
      if (lower.includes('发货') || lower.includes('快递')) {
        reply = '商城所有商品支持极速发货，今天18:00前付款的订单将于当晚发出，默认圆通/中通/顺丰特惠。';
      } else if (lower.includes('优惠') || lower.includes('券') || lower.includes('折扣')) {
        reply = '当前全场满69立减15、满100减20，水洗棉四件套限时3.8折只需¥49.9！';
      } else if (lower.includes('四件套') || lower.includes('水洗棉')) {
        reply = '100%全棉四季水洗棉四件套现货热销中，采用A类母婴级亲肤标准，水洗免熨烫，燕麦米色最受买家欢迎！';
      } else if (lower.includes('拼单') || lower.includes('3件')) {
        reply = '天天特价频道享受【任选3件仅需¥19.9】，满29全国包邮，欢迎前往“发现”频道挑选～';
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'support',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setChatMessages(prev => [...prev, botMsg]);
    }, 600);
  };

  const openBundle = () => setIsBundleOpen(true);
  const closeBundle = () => setIsBundleOpen(false);

  const toggleBundleItem = (productId: string) => {
    setSelectedBundleIds(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      }
      if (prev.length >= 3) {
        showToast('已选满3件组合，可直接拼单下单！');
        return prev;
      }
      return [...prev, productId];
    });
  };

  const checkoutBundle = () => {
    if (selectedBundleIds.length < 3) {
      showToast('请至少挑选3件超值好物以享受¥19.9特惠！');
      return;
    }
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: `PDD${Date.now()}`,
      date: new Date().toLocaleString(),
      status: 'pending_shipping',
      items: selectedBundleIds.map(id => {
        const p = PRODUCTS.find(prod => prod.id === id) || PRODUCTS[0];
        return {
          id: `bundle-item-${id}`,
          productId: p.id,
          title: p.title,
          price: 6.63,
          originalPrice: p.originalPrice,
          image: p.image,
          size: '拼单特选装',
          color: '热卖款',
          quantity: 1,
          selected: true,
        };
      }),
      totalAmount: 19.9,
    };

    setOrders(prev => [newOrder, ...prev]);
    setIsBundleOpen(false);
    showToast('拼单成功！【任选3件只需¥19.9】已生成待发货订单');
    setActiveTab('profile');
  };

  const checkoutCart = () => {
    const selectedItems = cartItems.filter(item => item.selected);
    if (selectedItems.length === 0) {
      showToast('请先选择要结算的商品');
      return;
    }

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: `JH${Date.now()}`,
      date: new Date().toLocaleString(),
      status: 'pending_shipping',
      items: selectedItems,
      totalAmount: cartFinalTotal,
    };

    setOrders(prev => [newOrder, ...prev]);
    setCartItems(prev => prev.filter(item => !item.selected));
    showToast(`支付成功！实付 ¥${cartFinalTotal}，已为您安排优先配货`);
    setActiveTab('profile');
  };

  const buyNow = (product: Product, sizeName?: string, colorName?: string) => {
    const size = sizeName || (product.sizes ? product.sizes[0].name : '标准规格');
    const color = colorName || (product.colors ? product.colors[0].name : '默认款');
    const price = product.sizes ? (product.sizes.find(s => s.name === size)?.price || product.price) : product.price;

    const singleItem: CartItem = {
      id: `buy-${Date.now()}`,
      productId: product.id,
      title: product.title,
      price,
      originalPrice: product.originalPrice,
      image: product.image,
      size,
      color,
      quantity: 1,
      selected: true,
    };

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: `JH${Date.now()}`,
      date: new Date().toLocaleString(),
      status: 'pending_shipping',
      items: [singleItem],
      totalAmount: price,
    };

    setOrders(prev => [newOrder, ...prev]);
    setSelectedProduct(null);
    showToast(`秒杀下单成功！实付 ¥${price}，商家已接单`);
    setActiveTab('profile');
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        selectedProduct,
        openProductDetail,
        closeProductDetail,
        cartItems,
        addToCart,
        updateCartItemQuantity,
        toggleCartItemSelect,
        toggleSelectAll,
        removeCartItem,
        cartTotalCount,
        cartSelectedCount,
        cartOriginalTotal,
        cartFinalTotal,
        coupons,
        claimCoupon,
        favorites,
        toggleFavorite,
        isFavorite,
        toast,
        showToast,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        openSearch,
        closeSearch,
        searchHistory,
        clearSearchHistory,
        isChatOpen,
        openChat,
        closeChat,
        chatMessages,
        sendChatMessage,
        isBundleOpen,
        openBundle,
        closeBundle,
        selectedBundleIds,
        toggleBundleItem,
        checkoutBundle,
        orders,
        checkoutCart,
        buyNow,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
