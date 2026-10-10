export interface SKUSize {
  name: string;
  price: number;
}

export interface SKUColor {
  name: string;
  colorHex?: string;
  isGrid?: boolean;
  imageIndex: number;
}

export interface Product {
  id: string;
  title: string;
  subTitle?: string;
  price: number;
  originalPrice: number;
  discountBadge?: string;
  hotBadge?: string;
  salesCount: string;
  category: string;
  mainCategory: 'home' | 'apparel' | 'food' | 'beauty' | 'clean' | 'kitchen' | 'baby' | 'digital';
  tags: string[];
  stockText?: string;
  image: string;
  galleryImages?: string[];
  isFlashSale?: boolean;
  flashSoldPercent?: number;
  isGroupBuy?: boolean;
  groupBuyJoined?: string;
  unit?: string;
  sizes?: SKUSize[];
  colors?: SKUColor[];
  rating?: number;
  reviewCount?: string;
  detailsImage?: string;
  reviews?: {
    author: string;
    level: string;
    time: string;
    avatar: string;
    content: string;
    images?: string[];
  }[];
}

export interface CartItem {
  id: string;
  productId: string;
  title: string;
  price: number;
  originalPrice: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
  selected: boolean;
}

export interface Coupon {
  id: string;
  title: string;
  condition: number;
  discount: number;
  type: 'platform' | 'shop';
  claimed: boolean;
  expiry: string;
}

export interface Order {
  id: string;
  date: string;
  status: 'pending_payment' | 'pending_shipping' | 'pending_receiving' | 'completed' | 'refunded';
  items: CartItem[];
  totalAmount: number;
  orderNumber: string;
}

export type TabType = 'home' | 'categories' | 'discover' | 'cart' | 'profile';
