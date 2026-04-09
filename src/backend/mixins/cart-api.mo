import Map "mo:core/Map";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import CartLib "../lib/cart";
import Types "../types/cart";

mixin (
  accessControlState : AccessControl.AccessControlState,
  carts : Map.Map<Principal, List.List<Types.CartItem>>,
) {
  // Authenticated user: get cart
  public query ({ caller }) func getCart() : async [Types.CartItem] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to view cart");
    };
    CartLib.get(carts, caller);
  };

  // Authenticated user: replace cart items
  public shared ({ caller }) func updateCart(items : [Types.CartItem]) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to update cart");
    };
    CartLib.update(carts, caller, items);
  };

  // Authenticated user: clear cart
  public shared ({ caller }) func clearCart() : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to clear cart");
    };
    CartLib.clear(carts, caller);
  };
};
