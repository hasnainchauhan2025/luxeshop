import Map "mo:core/Map";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Types "../types/coupons";

module {
  public type Coupon = Types.Coupon;
  public type CouponPublic = Types.CouponPublic;
  public type CreateCouponInput = Types.CreateCouponInput;
  public type ValidateCouponResult = Types.ValidateCouponResult;
  public type CouponCode = Types.CouponCode;

  public func toPublic(c : Coupon) : CouponPublic {
    {
      code = c.code;
      discountPercent = c.discountPercent;
      expiryTimestamp = c.expiryTimestamp;
      active = c.active;
    };
  };

  public func create(
    coupons : Map.Map<CouponCode, Coupon>,
    input : CreateCouponInput,
  ) : Coupon {
    let coupon : Coupon = {
      code = input.code;
      var discountPercent = input.discountPercent;
      var expiryTimestamp = input.expiryTimestamp;
      var active = input.active;
    };
    coupons.add(input.code, coupon);
    coupon;
  };

  public func update(
    coupons : Map.Map<CouponCode, Coupon>,
    code : CouponCode,
    input : CreateCouponInput,
  ) : () {
    switch (coupons.get(code)) {
      case (null) { Runtime.trap("Coupon not found") };
      case (?c) {
        c.discountPercent := input.discountPercent;
        c.expiryTimestamp := input.expiryTimestamp;
        c.active := input.active;
      };
    };
  };

  public func delete(
    coupons : Map.Map<CouponCode, Coupon>,
    code : CouponCode,
  ) : () {
    coupons.remove(code);
  };

  public func validate(
    coupons : Map.Map<CouponCode, Coupon>,
    code : CouponCode,
  ) : ValidateCouponResult {
    switch (coupons.get(code)) {
      case (null) {
        { valid = false; discountPercent = 0; message = "Coupon not found" };
      };
      case (?c) {
        if (not c.active) {
          return { valid = false; discountPercent = 0; message = "Coupon is inactive" };
        };
        let now = Time.now();
        if (c.expiryTimestamp < now) {
          return { valid = false; discountPercent = 0; message = "Coupon has expired" };
        };
        { valid = true; discountPercent = c.discountPercent; message = "Coupon is valid" };
      };
    };
  };

  public func getAll(
    coupons : Map.Map<CouponCode, Coupon>,
  ) : [CouponPublic] {
    List.fromIter<Coupon>(coupons.values())
      .toArray()
      .map<Coupon, CouponPublic>(func(c) { toPublic(c) });
  };
};
