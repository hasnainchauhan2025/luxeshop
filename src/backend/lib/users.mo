import Map "mo:core/Map";
import Time "mo:core/Time";
import Types "../types/users";

module {
  public type User = Types.User;
  public type UserPublic = Types.UserPublic;
  public type UpdateUserInput = Types.UpdateUserInput;

  public func toPublic(u : User) : UserPublic {
    {
      principal = u.principal;
      name = u.name;
      email = u.email;
      address = u.address;
      createdAt = u.createdAt;
    };
  };

  public func getOrCreate(
    users : Map.Map<Principal, User>,
    caller : Principal,
  ) : User {
    switch (users.get(caller)) {
      case (?u) u;
      case (null) {
        let newUser : User = {
          principal = caller;
          var name = "";
          var email = "";
          var address = null;
          createdAt = Time.now();
        };
        users.add(caller, newUser);
        newUser;
      };
    };
  };

  public func update(
    users : Map.Map<Principal, User>,
    caller : Principal,
    input : UpdateUserInput,
  ) : () {
    let user = getOrCreate(users, caller);
    user.name := input.name;
    user.email := input.email;
    user.address := input.address;
  };
};
