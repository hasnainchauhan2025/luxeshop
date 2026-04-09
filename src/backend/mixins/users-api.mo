import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import UsersLib "../lib/users";
import Types "../types/users";

mixin (
  accessControlState : AccessControl.AccessControlState,
  users : Map.Map<Principal, UsersLib.User>,
) {
  // Authenticated user: get own profile (creates one if not exist)
  public shared ({ caller }) func getUserProfile() : async Types.UserPublic {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to view profile");
    };
    let user = UsersLib.getOrCreate(users, caller);
    UsersLib.toPublic(user);
  };

  // Authenticated user: update own profile
  public shared ({ caller }) func updateUserProfile(input : Types.UpdateUserInput) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to update profile");
    };
    UsersLib.update(users, caller, input);
  };
};
