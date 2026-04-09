import Map "mo:core/Map";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Types "../types/reviews";
import Common "../types/common";

module {
  public type Review = Types.Review;
  public type AddReviewInput = Types.AddReviewInput;
  public type ProductId = Common.ProductId;
  public type ReviewId = Common.ReviewId;

  public func add(
    reviews : Map.Map<ReviewId, Review>,
    nextId : Nat,
    caller : Principal,
    input : AddReviewInput,
  ) : (Review, Nat) {
    // Enforce one review per user per product
    let all = List.fromIter<Review>(reviews.values());
    let existing = all.find(func(r : Review) : Bool {
      r.userId == caller and r.productId == input.productId
    });
    switch (existing) {
      case (?_) { Runtime.trap("You have already reviewed this product") };
      case (null) {};
    };

    if (input.rating < 1 or input.rating > 5) {
      Runtime.trap("Rating must be between 1 and 5");
    };

    let review : Review = {
      id = nextId;
      productId = input.productId;
      userId = caller;
      rating = input.rating;
      comment = input.comment;
      createdAt = Time.now();
    };
    reviews.add(nextId, review);
    (review, nextId + 1);
  };

  public func getByProduct(
    reviews : Map.Map<ReviewId, Review>,
    productId : ProductId,
  ) : [Review] {
    List.fromIter<Review>(reviews.values())
      .filter(func(r : Review) : Bool { r.productId == productId })
      .toArray();
  };
};
