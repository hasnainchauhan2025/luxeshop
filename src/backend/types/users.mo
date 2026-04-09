import Common "common";

module {
  public type UserAddress = {
    street : Text;
    city : Text;
    state : Text;
    zip : Text;
    country : Text;
  };

  // Internal type with var fields for mutable profile data
  public type User = {
    principal : Principal;
    var name : Text;
    var email : Text;
    var address : ?UserAddress;
    createdAt : Common.Timestamp;
  };

  // Shared public type (no var fields)
  public type UserPublic = {
    principal : Principal;
    name : Text;
    email : Text;
    address : ?UserAddress;
    createdAt : Common.Timestamp;
  };

  public type UpdateUserInput = {
    name : Text;
    email : Text;
    address : ?UserAddress;
  };
};
