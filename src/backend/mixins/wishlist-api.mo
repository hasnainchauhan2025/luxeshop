import Map "mo:core/Map";
import Set "mo:core/Set";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import WishlistLib "../lib/wishlist";
import Common "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  wishlists : Map.Map<Principal, Set.Set<Common.ProductId>>,
) {
  // Authenticated user: add product to wishlist
  public shared ({ caller }) func addToWishlist(productId : Common.ProductId) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to manage wishlist");
    };
    WishlistLib.add(wishlists, caller, productId);
  };

  // Authenticated user: remove product from wishlist
  public shared ({ caller }) func removeFromWishlist(productId : Common.ProductId) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to manage wishlist");
    };
    WishlistLib.remove(wishlists, caller, productId);
  };

  // Authenticated user: get own wishlist
  public query ({ caller }) func getWishlist() : async [Common.ProductId] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to view wishlist");
    };
    WishlistLib.get(wishlists, caller);
  };
};
