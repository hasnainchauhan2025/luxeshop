import Map "mo:core/Map";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Types "../types/orders";
import Common "../types/common";

module {
  public type Order = Types.Order;
  public type OrderPublic = Types.OrderPublic;
  public type CreateOrderInput = Types.CreateOrderInput;
  public type OrderStatus = Types.OrderStatus;
  public type OrderId = Common.OrderId;

  public func toPublic(o : Order) : OrderPublic {
    {
      id = o.id;
      userId = o.userId;
      items = o.items;
      total = o.total;
      status = o.status;
      shippingAddress = o.shippingAddress;
      stripePaymentIntentId = o.stripePaymentIntentId;
      couponCode = o.couponCode;
      discount = o.discount;
      createdAt = o.createdAt;
    };
  };

  public func create(
    orders : Map.Map<OrderId, Order>,
    nextId : Nat,
    caller : Principal,
    input : CreateOrderInput,
    total : Nat,
  ) : (Order, Nat) {
    let order : Order = {
      id = nextId;
      userId = caller;
      items = input.items;
      total = total;
      var status = #pending;
      shippingAddress = input.shippingAddress;
      stripePaymentIntentId = input.stripePaymentIntentId;
      couponCode = input.couponCode;
      discount = 0;
      createdAt = Time.now();
    };
    orders.add(nextId, order);
    (order, nextId + 1);
  };

  public func getByUser(
    orders : Map.Map<OrderId, Order>,
    userId : Principal,
  ) : [OrderPublic] {
    let all = List.fromIter<Order>(orders.values());
    all.filter(func(o : Order) : Bool { o.userId == userId })
      .toArray()
      .map<Order, OrderPublic>(func(o) { toPublic(o) });
  };

  public func getAll(
    orders : Map.Map<OrderId, Order>,
  ) : [OrderPublic] {
    List.fromIter<Order>(orders.values())
      .toArray()
      .map<Order, OrderPublic>(func(o) { toPublic(o) });
  };

  public func updateStatus(
    orders : Map.Map<OrderId, Order>,
    id : OrderId,
    status : OrderStatus,
  ) : () {
    switch (orders.get(id)) {
      case (null) { Runtime.trap("Order not found") };
      case (?o) { o.status := status };
    };
  };
};
