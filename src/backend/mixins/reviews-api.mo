import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import ReviewsLib "../lib/reviews";
import Types "../types/reviews";
import Common "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  reviews : Map.Map<Common.ReviewId, ReviewsLib.Review>,
) {
  var nextReviewId : Nat = 0;

  // Authenticated user: add a review
  public shared ({ caller }) func addReview(input : Types.AddReviewInput) : async Types.Review {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to add a review");
    };
    let (review, newId) = ReviewsLib.add(reviews, nextReviewId, caller, input);
    nextReviewId := newId;
    review;
  };

  // Public: get reviews for a product
  public query func getProductReviews(productId : Common.ProductId) : async [Types.Review] {
    ReviewsLib.getByProduct(reviews, productId);
  };
};
