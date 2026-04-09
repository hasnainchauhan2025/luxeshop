import type { backendInterface } from "../backend";
import { ExternalBlob, OrderStatus, UserRole } from "../backend";

const sampleImage = ExternalBlob.fromURL(
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"
);

const sampleProduct = {
  id: BigInt(1),
  featured: true,
  name: "Luxe Chronograph",
  createdAt: BigInt(Date.now() * 1_000_000),
  description:
    "A precision-engineered timepiece that defines modern luxury. Sapphire crystal glass, Swiss movement.",
  sizes: ["S", "M", "L", "XL"],
  category: "Watches",
  colors: ["Black", "Silver", "Rose Gold"],
  price: BigInt(29900),
  stockByVariant: [["M-Black", BigInt(12)]] as Array<[string, bigint]>,
  images: [sampleImage],
};

const sampleProduct2 = {
  id: BigInt(2),
  featured: true,
  name: "Obsidian Watch",
  createdAt: BigInt(Date.now() * 1_000_000),
  description:
    "Bold and minimalist, the Obsidian collection is for those who move with purpose.",
  sizes: ["S", "M", "L"],
  category: "Watches",
  colors: ["Matte Black", "Gunmetal"],
  price: BigInt(19900),
  stockByVariant: [["L-Matte Black", BigInt(7)]] as Array<[string, bigint]>,
  images: [sampleImage],
};

const sampleProduct3 = {
  id: BigInt(3),
  featured: false,
  name: "Ember Bracelet",
  createdAt: BigInt(Date.now() * 1_000_000),
  description: "Handcrafted 18k gold-plated bracelet with an adjustable clasp.",
  sizes: ["One Size"],
  category: "Jewelry",
  colors: ["Gold", "Rose Gold"],
  price: BigInt(8900),
  stockByVariant: [["One Size-Gold", BigInt(25)]] as Array<[string, bigint]>,
  images: [sampleImage],
};

const sampleOrder = {
  id: BigInt(1001),
  status: OrderStatus.delivered,
  couponCode: undefined,
  total: BigInt(29900),
  userId: { toString: () => "aaaaa-aa", toText: () => "aaaaa-aa", toUint8Array: () => new Uint8Array(29), compareTo: () => "eq", isAnonymous: () => false, _isPrincipal: true } as any,
  createdAt: BigInt(Date.now() * 1_000_000),
  discount: BigInt(0),
  shippingAddress: {
    zip: "10001",
    street: "123 Fifth Avenue",
    country: "US",
    city: "New York",
    state: "NY",
  },
  stripePaymentIntentId: "pi_mock_001",
  items: [
    {
      qty: BigInt(1),
      name: "Luxe Chronograph",
      color: "Black",
      size: "M",
      productId: BigInt(1),
      price: BigInt(29900),
    },
  ],
};

export const mockBackend: backendInterface = {
  _immutableObjectStorageBlobsAreLive: async () => [],
  _immutableObjectStorageBlobsToDelete: async () => [],
  _immutableObjectStorageConfirmBlobDeletion: async () => undefined,
  _immutableObjectStorageCreateCertificate: async () => ({
    method: "PUT",
    blob_hash: "mock_hash",
  }),
  _immutableObjectStorageRefillCashier: async () => ({
    success: true,
    topped_up_amount: BigInt(0),
  }),
  _immutableObjectStorageUpdateGatewayPrincipals: async () => undefined,
  _initializeAccessControl: async () => undefined,
  addReview: async () => ({
    id: BigInt(1),
    userId: { toString: () => "aaaaa-aa", toText: () => "aaaaa-aa", toUint8Array: () => new Uint8Array(29), compareTo: () => "eq", isAnonymous: () => false, _isPrincipal: true } as any,
    createdAt: BigInt(Date.now() * 1_000_000),
    productId: BigInt(1),
    comment: "Excellent quality!",
    rating: BigInt(5),
  }),
  addToWishlist: async () => undefined,
  assignCallerUserRole: async () => undefined,
  clearCart: async () => undefined,
  createCheckoutSession: async () => "cs_mock_session_001",
  createCoupon: async () => ({
    expiryTimestamp: BigInt(Date.now() * 1_000_000 + 30 * 24 * 60 * 60 * 1_000_000_000),
    active: true,
    code: "SAVE20",
    discountPercent: BigInt(20),
  }),
  createOrder: async () => sampleOrder,
  createProduct: async () => sampleProduct,
  deleteCoupon: async () => undefined,
  deleteProduct: async () => undefined,
  getAllCoupons: async () => [
    {
      expiryTimestamp: BigInt(Date.now() * 1_000_000 + 30 * 24 * 60 * 60 * 1_000_000_000),
      active: true,
      code: "LUXE20",
      discountPercent: BigInt(20),
    },
    {
      expiryTimestamp: BigInt(Date.now() * 1_000_000 + 7 * 24 * 60 * 60 * 1_000_000_000),
      active: true,
      code: "WELCOME10",
      discountPercent: BigInt(10),
    },
  ],
  getAllOrders: async () => [sampleOrder],
  getCallerUserRole: async () => UserRole.admin,
  getCart: async () => [
    { qty: BigInt(1), color: "Black", size: "M", productId: BigInt(1) },
  ],
  getFeaturedProducts: async () => [sampleProduct, sampleProduct2, sampleProduct3],
  getMyOrders: async () => [sampleOrder],
  getProduct: async () => sampleProduct,
  getProductReviews: async () => [
    {
      id: BigInt(1),
      userId: { toString: () => "aaaaa-aa", toText: () => "aaaaa-aa", toUint8Array: () => new Uint8Array(29), compareTo: () => "eq", isAnonymous: () => false, _isPrincipal: true } as any,
      createdAt: BigInt(Date.now() * 1_000_000),
      productId: BigInt(1),
      comment: "Absolutely stunning timepiece. Worth every penny.",
      rating: BigInt(5),
    },
    {
      id: BigInt(2),
      userId: { toString: () => "bbbbb-bb", toText: () => "bbbbb-bb", toUint8Array: () => new Uint8Array(29), compareTo: () => "eq", isAnonymous: () => false, _isPrincipal: true } as any,
      createdAt: BigInt(Date.now() * 1_000_000),
      productId: BigInt(1),
      comment: "Sleek design, premium build quality. Very impressed.",
      rating: BigInt(5),
    },
  ],
  getProducts: async () => [sampleProduct, sampleProduct2, sampleProduct3],
  getStripeSessionStatus: async () => ({
    __kind__: "completed",
    completed: { userPrincipal: "aaaaa-aa", response: '{"status":"paid"}' },
  }),
  getUserProfile: async () => ({
    principal: { toString: () => "aaaaa-aa", toText: () => "aaaaa-aa", toUint8Array: () => new Uint8Array(29), compareTo: () => "eq", isAnonymous: () => false, _isPrincipal: true } as any,
    name: "Alex Carter",
    createdAt: BigInt(Date.now() * 1_000_000),
    email: "alex@example.com",
    address: {
      zip: "10001",
      street: "123 Fifth Avenue",
      country: "US",
      city: "New York",
      state: "NY",
    },
  }),
  getWishlist: async () => [BigInt(1), BigInt(2)],
  isCallerAdmin: async () => true,
  isStripeConfigured: async () => true,
  removeFromWishlist: async () => undefined,
  setStripeConfiguration: async () => undefined,
  transform: async () => ({ status: BigInt(200), body: new Uint8Array(), headers: [] }),
  updateCart: async () => undefined,
  updateCoupon: async () => undefined,
  updateOrderStatus: async () => undefined,
  updateProduct: async () => undefined,
  updateUserProfile: async () => undefined,
  validateCoupon: async () => ({
    valid: true,
    discountPercent: BigInt(20),
    message: "Coupon applied successfully!",
  }),
};
