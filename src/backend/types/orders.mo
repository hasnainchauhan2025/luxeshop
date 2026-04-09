import Common "common";

module {
  public type OrderId = Common.OrderId;
  public type ProductId = Common.ProductId;

  public type OrderItem = {
    productId : ProductId;
    name : Text;
    price : Nat;
    qty : Nat;
    color : Text;
    size : Text;
  };

  public type ShippingAddress = {
    street : Text;
    city : Text;
    state : Text;
    zip : Text;
    country : Text;
  };

  public type OrderStatus = {
    #pending;
    #processing;
    #shipped;
    #delivered;
    #cancelled;
  };

  // Internal type with var fields for mutable status
  public type Order = {
    id : OrderId;
    userId : Principal;
    items : [OrderItem];
    total : Nat;
    var status : OrderStatus;
    shippingAddress : ShippingAddress;
    stripePaymentIntentId : Text;
    couponCode : ?Text;
    discount : Nat;
    createdAt : Common.Timestamp;
  };

  // Shared public type (no var fields)
  public type OrderPublic = {
    id : OrderId;
    userId : Principal;
    items : [OrderItem];
    total : Nat;
    status : OrderStatus;
    shippingAddress : ShippingAddress;
    stripePaymentIntentId : Text;
    couponCode : ?Text;
    discount : Nat;
    createdAt : Common.Timestamp;
  };

  public type CreateOrderInput = {
    items : [OrderItem];
    shippingAddress : ShippingAddress;
    couponCode : ?Text;
    stripePaymentIntentId : Text;
  };
};
