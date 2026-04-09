import Map "mo:core/Map";
import List "mo:core/List";
import Set "mo:core/Set";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import Stripe "mo:caffeineai-stripe/stripe";
import OutCall "mo:caffeineai-http-outcalls/outcall";

import ProductTypes "types/products";
import OrderTypes "types/orders";
import UserTypes "types/users";
import ReviewTypes "types/reviews";
import CouponTypes "types/coupons";
import CartTypes "types/cart";
import Common "types/common";

import ProductsMixin "mixins/products-api";
import OrdersMixin "mixins/orders-api";
import UsersMixin "mixins/users-api";
import ReviewsMixin "mixins/reviews-api";
import CouponsMixin "mixins/coupons-api";
import WishlistMixin "mixins/wishlist-api";
import CartMixin "mixins/cart-api";

actor {
  // Authorization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Object storage (for product images)
  include MixinObjectStorage();

  // Products state
  let products = Map.empty<Common.ProductId, ProductTypes.Product>();

  // Orders state
  let orders = Map.empty<Common.OrderId, OrderTypes.Order>();

  // Users state
  let users = Map.empty<Principal, UserTypes.User>();

  // Reviews state
  let reviews = Map.empty<Common.ReviewId, ReviewTypes.Review>();

  // Coupons state
  let coupons = Map.empty<Common.CouponCode, CouponTypes.Coupon>();

  // Wishlists state (per-user set of productIds)
  let wishlists = Map.empty<Principal, Set.Set<Common.ProductId>>();

  // Carts state (per-user list of cart items)
  let carts = Map.empty<Principal, List.List<CartTypes.CartItem>>();

  // Include all domain mixins
  include ProductsMixin(accessControlState, products);
  include OrdersMixin(accessControlState, orders);
  include UsersMixin(accessControlState, users);
  include ReviewsMixin(accessControlState, reviews);
  include CouponsMixin(accessControlState, coupons);
  include WishlistMixin(accessControlState, wishlists);
  include CartMixin(accessControlState, carts);

  // Stripe configuration (must live in actor per platform requirements)
  var stripeConfig : ?Stripe.StripeConfiguration = null;

  public query func isStripeConfigured() : async Bool {
    stripeConfig != null;
  };

  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can configure Stripe");
    };
    stripeConfig := ?config;
  };

  func getStripeConfig() : Stripe.StripeConfiguration {
    switch (stripeConfig) {
      case (null) { Runtime.trap("Stripe is not configured") };
      case (?cfg) { cfg };
    };
  };

  public shared ({ caller }) func createCheckoutSession(
    items : [Stripe.ShoppingItem],
    successUrl : Text,
    cancelUrl : Text,
  ) : async Text {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to checkout");
    };
    await Stripe.createCheckoutSession(getStripeConfig(), caller, items, successUrl, cancelUrl, transform);
  };

  public func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    await Stripe.getSessionStatus(getStripeConfig(), sessionId, transform);
  };

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };
};
