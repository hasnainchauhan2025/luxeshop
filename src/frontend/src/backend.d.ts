import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export type Timestamp = bigint;
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface UserPublic {
    principal: Principal;
    name: string;
    createdAt: Timestamp;
    email: string;
    address?: UserAddress;
}
export interface ProductPublic {
    id: ProductId;
    featured: boolean;
    name: string;
    createdAt: Timestamp;
    description: string;
    sizes: Array<string>;
    category: string;
    colors: Array<string>;
    price: bigint;
    stockByVariant: Array<[string, bigint]>;
    images: Array<ExternalBlob>;
}
export interface OrderItem {
    qty: bigint;
    name: string;
    color: string;
    size: string;
    productId: ProductId;
    price: bigint;
}
export interface AddReviewInput {
    productId: ProductId;
    comment: string;
    rating: bigint;
}
export interface OrderPublic {
    id: OrderId;
    status: OrderStatus;
    couponCode?: string;
    total: bigint;
    userId: Principal;
    createdAt: Timestamp;
    discount: bigint;
    shippingAddress: ShippingAddress;
    stripePaymentIntentId: string;
    items: Array<OrderItem>;
}
export interface ValidateCouponResult {
    valid: boolean;
    discountPercent: bigint;
    message: string;
}
export interface CouponPublic {
    expiryTimestamp: bigint;
    active: boolean;
    code: CouponCode;
    discountPercent: bigint;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export type CouponCode = string;
export interface CreateOrderInput {
    couponCode?: string;
    shippingAddress: ShippingAddress;
    stripePaymentIntentId: string;
    items: Array<OrderItem>;
}
export interface ProductFilters {
    sortBy?: string;
    page?: bigint;
    pageSize?: bigint;
    search?: string;
    category?: string;
}
export type StripeSessionStatus = {
    __kind__: "completed";
    completed: {
        userPrincipal?: string;
        response: string;
    };
} | {
    __kind__: "failed";
    failed: {
        error: string;
    };
};
export interface StripeConfiguration {
    allowedCountries: Array<string>;
    secretKey: string;
}
export type ReviewId = bigint;
export interface Review {
    id: ReviewId;
    userId: Principal;
    createdAt: Timestamp;
    productId: ProductId;
    comment: string;
    rating: bigint;
}
export interface ProductInput {
    featured: boolean;
    name: string;
    description: string;
    sizes: Array<string>;
    category: string;
    colors: Array<string>;
    price: bigint;
    stockByVariant: Array<[string, bigint]>;
    images: Array<ExternalBlob>;
}
export interface UpdateUserInput {
    name: string;
    email: string;
    address?: UserAddress;
}
export interface ShippingAddress {
    zip: string;
    street: string;
    country: string;
    city: string;
    state: string;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface UserAddress {
    zip: string;
    street: string;
    country: string;
    city: string;
    state: string;
}
export interface ShoppingItem {
    productName: string;
    currency: string;
    quantity: bigint;
    priceInCents: bigint;
    productDescription: string;
}
export interface CreateCouponInput {
    expiryTimestamp: bigint;
    active: boolean;
    code: CouponCode;
    discountPercent: bigint;
}
export type ProductId = bigint;
export interface CartItem {
    qty: bigint;
    color: string;
    size: string;
    productId: ProductId;
}
export type OrderId = bigint;
export enum OrderStatus {
    shipped = "shipped",
    cancelled = "cancelled",
    pending = "pending",
    delivered = "delivered",
    processing = "processing"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addReview(input: AddReviewInput): Promise<Review>;
    addToWishlist(productId: ProductId): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    clearCart(): Promise<void>;
    createCheckoutSession(items: Array<ShoppingItem>, successUrl: string, cancelUrl: string): Promise<string>;
    createCoupon(input: CreateCouponInput): Promise<CouponPublic>;
    createOrder(input: CreateOrderInput): Promise<OrderPublic>;
    createProduct(input: ProductInput): Promise<ProductPublic>;
    deleteCoupon(code: CouponCode): Promise<void>;
    deleteProduct(id: ProductId): Promise<void>;
    getAllCoupons(): Promise<Array<CouponPublic>>;
    getAllOrders(): Promise<Array<OrderPublic>>;
    getCallerUserRole(): Promise<UserRole>;
    getCart(): Promise<Array<CartItem>>;
    getFeaturedProducts(): Promise<Array<ProductPublic>>;
    getMyOrders(): Promise<Array<OrderPublic>>;
    getProduct(id: ProductId): Promise<ProductPublic | null>;
    getProductReviews(productId: ProductId): Promise<Array<Review>>;
    getProducts(filters: ProductFilters): Promise<Array<ProductPublic>>;
    getStripeSessionStatus(sessionId: string): Promise<StripeSessionStatus>;
    getUserProfile(): Promise<UserPublic>;
    getWishlist(): Promise<Array<ProductId>>;
    isCallerAdmin(): Promise<boolean>;
    isStripeConfigured(): Promise<boolean>;
    removeFromWishlist(productId: ProductId): Promise<void>;
    setStripeConfiguration(config: StripeConfiguration): Promise<void>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    updateCart(items: Array<CartItem>): Promise<void>;
    updateCoupon(code: CouponCode, input: CreateCouponInput): Promise<void>;
    updateOrderStatus(id: OrderId, status: OrderStatus): Promise<void>;
    updateProduct(id: ProductId, input: ProductInput): Promise<void>;
    updateUserProfile(input: UpdateUserInput): Promise<void>;
    validateCoupon(code: CouponCode): Promise<ValidateCouponResult>;
}
