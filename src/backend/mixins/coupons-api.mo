import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import CouponsLib "../lib/coupons";
import Types "../types/coupons";

mixin (
  accessControlState : AccessControl.AccessControlState,
  coupons : Map.Map<Types.CouponCode, CouponsLib.Coupon>,
) {
  // Admin: create coupon
  public shared ({ caller }) func createCoupon(input : Types.CreateCouponInput) : async Types.CouponPublic {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can create coupons");
    };
    let coupon = CouponsLib.create(coupons, input);
    CouponsLib.toPublic(coupon);
  };

  // Admin: update coupon
  public shared ({ caller }) func updateCoupon(code : Types.CouponCode, input : Types.CreateCouponInput) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can update coupons");
    };
    CouponsLib.update(coupons, code, input);
  };

  // Admin: delete coupon
  public shared ({ caller }) func deleteCoupon(code : Types.CouponCode) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can delete coupons");
    };
    CouponsLib.delete(coupons, code);
  };

  // Admin: list all coupons
  public query ({ caller }) func getAllCoupons() : async [Types.CouponPublic] {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can list coupons");
    };
    CouponsLib.getAll(coupons);
  };

  // Public: validate coupon
  public query func validateCoupon(code : Types.CouponCode) : async Types.ValidateCouponResult {
    CouponsLib.validate(coupons, code);
  };
};
