import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Stripe "mo:caffeineai-stripe/stripe";
import OutCall "mo:caffeineai-http-outcalls/outcall";

mixin (
  accessControlState : AccessControl.AccessControlState,
  stripeConfig : ?Stripe.StripeConfiguration,
) {
  // Admin: check if Stripe is configured
  public query func isStripeConfigured() : async Bool {
    Runtime.trap("not implemented");
  };

  // Admin: set Stripe configuration
  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    Runtime.trap("not implemented");
  };

  // Authenticated user: create a checkout session
  public shared ({ caller }) func createCheckoutSession(
    items : [Stripe.ShoppingItem],
    successUrl : Text,
    cancelUrl : Text,
  ) : async Text {
    Runtime.trap("not implemented");
  };

  // Public: get session payment status
  public func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    Runtime.trap("not implemented");
  };

  // Required transform for HTTP outcalls
  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    Runtime.trap("not implemented");
  };
};
