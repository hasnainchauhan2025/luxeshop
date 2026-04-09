import Common "common";

module {
  public type ProductId = Common.ProductId;

  public type CartItem = {
    productId : ProductId;
    qty : Nat;
    color : Text;
    size : Text;
  };
};
