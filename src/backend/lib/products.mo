import Map "mo:core/Map";
import List "mo:core/List";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Types "../types/products";
import Common "../types/common";

module {
  public type Product = Types.Product;
  public type ProductPublic = Types.ProductPublic;
  public type ProductInput = Types.ProductInput;
  public type ProductFilters = Types.ProductFilters;
  public type ProductId = Common.ProductId;

  public func toPublic(p : Product) : ProductPublic {
    {
      id = p.id;
      name = p.name;
      description = p.description;
      price = p.price;
      category = p.category;
      images = p.images;
      colors = p.colors;
      sizes = p.sizes;
      stockByVariant = p.stockByVariant;
      featured = p.featured;
      createdAt = p.createdAt;
    };
  };

  public func create(
    products : Map.Map<ProductId, Product>,
    nextId : Nat,
    input : ProductInput,
  ) : (Product, Nat) {
    let product : Product = {
      id = nextId;
      var name = input.name;
      var description = input.description;
      var price = input.price;
      var category = input.category;
      var images = input.images;
      var colors = input.colors;
      var sizes = input.sizes;
      var stockByVariant = input.stockByVariant;
      var featured = input.featured;
      createdAt = Time.now();
    };
    products.add(nextId, product);
    (product, nextId + 1);
  };

  public func update(
    products : Map.Map<ProductId, Product>,
    id : ProductId,
    input : ProductInput,
  ) : () {
    switch (products.get(id)) {
      case (null) {};
      case (?p) {
        p.name := input.name;
        p.description := input.description;
        p.price := input.price;
        p.category := input.category;
        p.images := input.images;
        p.colors := input.colors;
        p.sizes := input.sizes;
        p.stockByVariant := input.stockByVariant;
        p.featured := input.featured;
      };
    };
  };

  public func delete(
    products : Map.Map<ProductId, Product>,
    id : ProductId,
  ) : () {
    products.remove(id);
  };

  public func getFiltered(
    products : Map.Map<ProductId, Product>,
    filters : ProductFilters,
  ) : [ProductPublic] {
    let page = switch (filters.page) { case (?p) p; case null 0 };
    let pageSize = switch (filters.pageSize) { case (?s) s; case null 20 };

    let all = List.fromIter<Product>(products.values());

    let filtered = all.filter(func(p : Product) : Bool {
      let categoryMatch = switch (filters.category) {
        case (null) true;
        case (?cat) p.category == cat;
      };
      let searchMatch = switch (filters.search) {
        case (null) true;
        case (?term) {
          let lower = term.toLower();
          p.name.toLower().contains(#text lower) or p.description.toLower().contains(#text lower);
        };
      };
      categoryMatch and searchMatch;
    });

    let sorted = switch (filters.sortBy) {
      case (?"price_asc") filtered.sort(func(a : Product, b : Product) : Order.Order {
        if (a.price < b.price) #less
        else if (a.price > b.price) #greater
        else #equal
      });
      case (?"price_desc") filtered.sort(func(a : Product, b : Product) : Order.Order {
        if (a.price > b.price) #less
        else if (a.price < b.price) #greater
        else #equal
      });
      case (?"featured") filtered.sort(func(a : Product, b : Product) : Order.Order {
        if (a.featured and not b.featured) #less
        else if (not a.featured and b.featured) #greater
        else #equal
      });
      case _ filtered.sort(func(a : Product, b : Product) : Order.Order {
        if (a.createdAt > b.createdAt) #less
        else if (a.createdAt < b.createdAt) #greater
        else #equal
      });
    };

    let start = page * pageSize;
    let total = sorted.size();
    if (start >= total) return [];
    let end = if (start + pageSize > total) total else start + pageSize;

    let slice = sorted.sliceToArray(start, end);
    slice.map(func(p : Product) : ProductPublic { toPublic(p) });
  };

  public func getFeatured(
    products : Map.Map<ProductId, Product>,
  ) : [ProductPublic] {
    let all = List.fromIter<Product>(products.values());
    all.filter(func(p : Product) : Bool { p.featured })
      .toArray()
      .map(func(p : Product) : ProductPublic { toPublic(p) });
  };

  public func getById(
    products : Map.Map<ProductId, Product>,
    id : ProductId,
  ) : ?ProductPublic {
    switch (products.get(id)) {
      case (null) null;
      case (?p) ?toPublic(p);
    };
  };
};
