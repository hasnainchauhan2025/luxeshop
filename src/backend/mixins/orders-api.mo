import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import OrdersLib "../lib/orders";
import Types "../types/orders";
import Common "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  orders : Map.Map<Common.OrderId, OrdersLib.Order>,
) {
  var nextOrderId : Nat = 0;

  // Authenticated user: create an order
  public shared ({ caller }) func createOrder(input : Types.CreateOrderInput) : async Types.OrderPublic {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to create an order");
    };
    // Calculate total from items
    var total : Nat = 0;
    for (item in input.items.vals()) {
      total += item.price * item.qty;
    };
    let (order, newId) = OrdersLib.create(orders, nextOrderId, caller, input, total);
    nextOrderId := newId;
    OrdersLib.toPublic(order);
  };

  // Authenticated user: get their own orders
  public query ({ caller }) func getMyOrders() : async [Types.OrderPublic] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to view orders");
    };
    OrdersLib.getByUser(orders, caller);
  };

  // Admin: get all orders
  public query ({ caller }) func getAllOrders() : async [Types.OrderPublic] {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can view all orders");
    };
    OrdersLib.getAll(orders);
  };

  // Admin: update order status
  public shared ({ caller }) func updateOrderStatus(id : Common.OrderId, status : Types.OrderStatus) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can update order status");
    };
    OrdersLib.updateStatus(orders, id, status);
  };
};
