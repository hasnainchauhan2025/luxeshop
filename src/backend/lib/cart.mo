import Map "mo:core/Map";
import List "mo:core/List";
import Types "../types/cart";

module {
  public type CartItem = Types.CartItem;

  public func get(
    carts : Map.Map<Principal, List.List<CartItem>>,
    caller : Principal,
  ) : [CartItem] {
    switch (carts.get(caller)) {
      case (null) [];
      case (?items) items.toArray();
    };
  };

  public func update(
    carts : Map.Map<Principal, List.List<CartItem>>,
    caller : Principal,
    items : [CartItem],
  ) : () {
    let list = List.fromArray<CartItem>(items);
    carts.add(caller, list);
  };

  public func clear(
    carts : Map.Map<Principal, List.List<CartItem>>,
    caller : Principal,
  ) : () {
    carts.remove(caller);
  };
};
