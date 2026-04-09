import Common "common";

module {
  public type ReviewId = Common.ReviewId;
  public type ProductId = Common.ProductId;

  public type Review = {
    id : ReviewId;
    productId : ProductId;
    userId : Principal;
    rating : Nat; // 1-5
    comment : Text;
    createdAt : Common.Timestamp;
  };

  public type AddReviewInput = {
    productId : ProductId;
    rating : Nat;
    comment : Text;
  };
};
