import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import ProductsLib "../lib/products";
import Types "../types/products";
import Common "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  products : Map.Map<Common.ProductId, ProductsLib.Product>,
) {
  var nextProductId : Nat = 0;

  // Admin: create a product
  public shared ({ caller }) func createProduct(input : Types.ProductInput) : async Types.ProductPublic {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can create products");
    };
    let (product, newId) = ProductsLib.create(products, nextProductId, input);
    nextProductId := newId;
    ProductsLib.toPublic(product);
  };

  // Admin: update a product
  public shared ({ caller }) func updateProduct(id : Common.ProductId, input : Types.ProductInput) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can update products");
    };
    ProductsLib.update(products, id, input);
  };

  // Admin: delete a product
  public shared ({ caller }) func deleteProduct(id : Common.ProductId) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can delete products");
    };
    ProductsLib.delete(products, id);
  };

  // Public: list products with optional filters
  public query func getProducts(filters : Types.ProductFilters) : async [Types.ProductPublic] {
    ProductsLib.getFiltered(products, filters);
  };

  // Public: get featured products
  public query func getFeaturedProducts() : async [Types.ProductPublic] {
    ProductsLib.getFeatured(products);
  };

  // Public: get a single product
  public query func getProduct(id : Common.ProductId) : async ?Types.ProductPublic {
    ProductsLib.getById(products, id);
  };
};
