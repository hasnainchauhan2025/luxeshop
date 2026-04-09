import Storage "mo:caffeineai-object-storage/Storage";
import Common "common";

module {
  public type ProductId = Common.ProductId;

  public type StockEntry = {
    color : Text;
    size : Text;
    quantity : Nat;
  };

  // Internal type — uses Storage.ExternalBlob for image references
  public type Product = {
    id : ProductId;
    var name : Text;
    var description : Text;
    var price : Nat; // in cents
    var category : Text;
    var images : [Storage.ExternalBlob];
    var colors : [Text];
    var sizes : [Text];
    var stockByVariant : [(Text, Nat)]; // key: "color:size", value: quantity
    var featured : Bool;
    createdAt : Common.Timestamp;
  };

  // Public (shared) type for API boundary — no var fields, no mutable containers
  public type ProductPublic = {
    id : ProductId;
    name : Text;
    description : Text;
    price : Nat;
    category : Text;
    images : [Storage.ExternalBlob];
    colors : [Text];
    sizes : [Text];
    stockByVariant : [(Text, Nat)];
    featured : Bool;
    createdAt : Common.Timestamp;
  };

  public type ProductInput = {
    name : Text;
    description : Text;
    price : Nat;
    category : Text;
    images : [Storage.ExternalBlob];
    colors : [Text];
    sizes : [Text];
    stockByVariant : [(Text, Nat)];
    featured : Bool;
  };

  public type ProductFilters = {
    category : ?Text;
    search : ?Text;
    sortBy : ?Text; // "price_asc" | "price_desc" | "newest" | "featured"
    page : ?Nat;
    pageSize : ?Nat;
  };
};
