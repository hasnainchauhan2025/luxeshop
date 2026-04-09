import Map "mo:core/Map";
import Set "mo:core/Set";
import Common "../types/common";

module {
  public type ProductId = Common.ProductId;

  public func add(
    wishlists : Map.Map<Principal, Set.Set<ProductId>>,
    caller : Principal,
    productId : ProductId,
  ) : () {
    let wishlist = switch (wishlists.get(caller)) {
      case (?ws) ws;
      case (null) {
        let ws = Set.empty<ProductId>();
        wishlists.add(caller, ws);
        ws;
      };
    };
    wishlist.add(productId);
  };

  public func remove(
    wishlists : Map.Map<Principal, Set.Set<ProductId>>,
    caller : Principal,
    productId : ProductId,
  ) : () {
    switch (wishlists.get(caller)) {
      case (null) {};
      case (?ws) { ws.remove(productId) };
    };
  };

  public func get(
    wishlists : Map.Map<Principal, Set.Set<ProductId>>,
    caller : Principal,
  ) : [ProductId] {
    switch (wishlists.get(caller)) {
      case (null) [];
      case (?ws) ws.toArray();
    };
  };
};
