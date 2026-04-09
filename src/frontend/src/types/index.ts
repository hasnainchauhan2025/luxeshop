export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  comparePrice?: number;
  images: string[];
  category: string;
  stock: number;
  rating: number;
  reviewCount: number;
  tags: string[];
  featured: boolean;
  colors?: string[];
  sizes?: string[];
  model3dUrl?: string;
}

export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  shippingAddress: Address;
  paymentMethod: string;
  stripeSessionId?: string;
  createdAt: number;
  updatedAt: number;
}

export interface Address {
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  body: string;
  createdAt: number;
  verified: boolean;
}

export interface Coupon {
  code: string;
  discount: number;
  type: "percentage" | "fixed";
  minOrder?: number;
  expiresAt?: number;
  usageLimit?: number;
  usageCount: number;
  active: boolean;
}

export interface User {
  id: string;
  principal: string;
  email?: string;
  name?: string;
  avatar?: string;
  role: "user" | "admin";
  createdAt: number;
}

export interface WishlistItem {
  productId: string;
  product: Product;
  addedAt: number;
}

export interface SearchResult {
  products: Product[];
  total: number;
  query: string;
}

export interface CheckoutSession {
  sessionId: string;
  url: string;
}

export interface StripeSessionStatus {
  status: "open" | "complete" | "expired";
  paymentStatus: "unpaid" | "paid" | "no_payment_required";
  amountTotal: number;
  currency: string;
}
