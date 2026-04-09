import Common "common";

module {
  public type CouponCode = Common.CouponCode;

  // Internal type with var fields for mutable coupon properties
  public type Coupon = {
    code : CouponCode;
    var discountPercent : Nat; // 0-100
    var expiryTimestamp : Int;
    var active : Bool;
  };

  // Shared public type (no var fields)
  public type CouponPublic = {
    code : CouponCode;
    discountPercent : Nat;
    expiryTimestamp : Int;
    active : Bool;
  };

  public type CreateCouponInput = {
    code : CouponCode;
    discountPercent : Nat;
    expiryTimestamp : Int;
    active : Bool;
  };

  public type ValidateCouponResult = {
    valid : Bool;
    discountPercent : Nat;
    message : Text;
  };
};
