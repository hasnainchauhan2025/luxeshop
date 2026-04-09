import { a6 as ProtocolError, a7 as TimeoutWaitingForResponseErrorCode, a8 as utf8ToBytes, a9 as ExternalError, aa as MissingRootKeyErrorCode, ab as Certificate, ac as lookupResultToBuffer, ad as RequestStatusResponseStatus, ae as UnknownError, af as RequestStatusDoneNoReplyErrorCode, ag as RejectError, ah as CertifiedRejectErrorCode, ai as UNREACHABLE_ERROR, aj as InputError, ak as InvalidReadStateRequestErrorCode, al as ReadRequestType, am as Principal, an as IDL, ao as MissingCanisterIdErrorCode, ap as HttpAgent, aq as encode, ar as QueryResponseStatus, as as UncertifiedRejectErrorCode, at as isV3ResponseBody, au as isV2ResponseBody, av as UncertifiedRejectUpdateErrorCode, aw as UnexpectedErrorCode, ax as decode, ay as useInternetIdentity, az as useQueryClient, j as reactExports, aA as createActorWithConfig, aB as Record, aC as Opt, aD as Variant, aE as Vec, aF as Tuple, aG as Service, aH as Func, aI as Nat, aJ as Text, aK as Nat8, aL as Bool, aM as Int, aN as Principal$1, aO as Null } from "./index-CgQGP8Uk.js";
import { u as useQuery, a as useMutation } from "./useMutation-CVK8QqpV.js";
const FIVE_MINUTES_IN_MSEC = 5 * 60 * 1e3;
function defaultStrategy() {
  return chain(conditionalDelay(once(), 1e3), backoff(1e3, 1.2), timeout(FIVE_MINUTES_IN_MSEC));
}
function once() {
  let first = true;
  return async () => {
    if (first) {
      first = false;
      return true;
    }
    return false;
  };
}
function conditionalDelay(condition, timeInMsec) {
  return async (canisterId, requestId, status) => {
    if (await condition(canisterId, requestId, status)) {
      return new Promise((resolve) => setTimeout(resolve, timeInMsec));
    }
  };
}
function timeout(timeInMsec) {
  const end = Date.now() + timeInMsec;
  return async (_canisterId, requestId, status) => {
    if (Date.now() > end) {
      throw ProtocolError.fromCode(new TimeoutWaitingForResponseErrorCode(`Request timed out after ${timeInMsec} msec`, requestId, status));
    }
  };
}
function backoff(startingThrottleInMsec, backoffFactor) {
  let currentThrottling = startingThrottleInMsec;
  return () => new Promise((resolve) => setTimeout(() => {
    currentThrottling *= backoffFactor;
    resolve();
  }, currentThrottling));
}
function chain(...strategies) {
  return async (canisterId, requestId, status) => {
    for (const a of strategies) {
      await a(canisterId, requestId, status);
    }
  };
}
const DEFAULT_POLLING_OPTIONS = {
  preSignReadStateRequest: false
};
function hasProperty(value, property) {
  return Object.prototype.hasOwnProperty.call(value, property);
}
function isObjectWithProperty(value, property) {
  return value !== null && typeof value === "object" && hasProperty(value, property);
}
function hasFunction(value, property) {
  return hasProperty(value, property) && typeof value[property] === "function";
}
function isSignedReadStateRequestWithExpiry(value) {
  return isObjectWithProperty(value, "body") && isObjectWithProperty(value.body, "content") && value.body.content.request_type === ReadRequestType.ReadState && isObjectWithProperty(value.body.content, "ingress_expiry") && typeof value.body.content.ingress_expiry === "object" && value.body.content.ingress_expiry !== null && hasFunction(value.body.content.ingress_expiry, "toHash");
}
async function pollForResponse(agent, canisterId, requestId, options = {}) {
  const path = [utf8ToBytes("request_status"), requestId];
  let state;
  let currentRequest;
  const preSignReadStateRequest = options.preSignReadStateRequest ?? false;
  if (preSignReadStateRequest) {
    currentRequest = await constructRequest({
      paths: [path],
      agent,
      pollingOptions: options
    });
    state = await agent.readState(canisterId, { paths: [path] }, void 0, currentRequest);
  } else {
    state = await agent.readState(canisterId, { paths: [path] });
  }
  if (agent.rootKey == null) {
    throw ExternalError.fromCode(new MissingRootKeyErrorCode());
  }
  const cert = await Certificate.create({
    certificate: state.certificate,
    rootKey: agent.rootKey,
    canisterId,
    blsVerify: options.blsVerify,
    agent
  });
  const maybeBuf = lookupResultToBuffer(cert.lookup_path([...path, utf8ToBytes("status")]));
  let status;
  if (typeof maybeBuf === "undefined") {
    status = RequestStatusResponseStatus.Unknown;
  } else {
    status = new TextDecoder().decode(maybeBuf);
  }
  switch (status) {
    case RequestStatusResponseStatus.Replied: {
      return {
        reply: lookupResultToBuffer(cert.lookup_path([...path, "reply"])),
        certificate: cert
      };
    }
    case RequestStatusResponseStatus.Received:
    case RequestStatusResponseStatus.Unknown:
    case RequestStatusResponseStatus.Processing: {
      const strategy = options.strategy ?? defaultStrategy();
      await strategy(canisterId, requestId, status);
      return pollForResponse(agent, canisterId, requestId, {
        ...options,
        // Pass over either the strategy already provided or the new one created above
        strategy,
        request: currentRequest
      });
    }
    case RequestStatusResponseStatus.Rejected: {
      const rejectCode = new Uint8Array(lookupResultToBuffer(cert.lookup_path([...path, "reject_code"])))[0];
      const rejectMessage = new TextDecoder().decode(lookupResultToBuffer(cert.lookup_path([...path, "reject_message"])));
      const errorCodeBuf = lookupResultToBuffer(cert.lookup_path([...path, "error_code"]));
      const errorCode = errorCodeBuf ? new TextDecoder().decode(errorCodeBuf) : void 0;
      throw RejectError.fromCode(new CertifiedRejectErrorCode(requestId, rejectCode, rejectMessage, errorCode));
    }
    case RequestStatusResponseStatus.Done:
      throw UnknownError.fromCode(new RequestStatusDoneNoReplyErrorCode(requestId));
  }
  throw UNREACHABLE_ERROR;
}
async function constructRequest(options) {
  var _a;
  const { paths, agent, pollingOptions } = options;
  if (pollingOptions.request && isSignedReadStateRequestWithExpiry(pollingOptions.request)) {
    return pollingOptions.request;
  }
  const request = await ((_a = agent.createReadStateRequest) == null ? void 0 : _a.call(agent, {
    paths
  }, void 0));
  if (!isSignedReadStateRequestWithExpiry(request)) {
    throw InputError.fromCode(new InvalidReadStateRequestErrorCode(request));
  }
  return request;
}
const metadataSymbol = Symbol.for("ic-agent-metadata");
class Actor {
  /**
   * Get the Agent class this Actor would call, or undefined if the Actor would use
   * the default agent (global.ic.agent).
   * @param actor The actor to get the agent of.
   */
  static agentOf(actor) {
    return actor[metadataSymbol].config.agent;
  }
  /**
   * Get the interface of an actor, in the form of an instance of a Service.
   * @param actor The actor to get the interface of.
   */
  static interfaceOf(actor) {
    return actor[metadataSymbol].service;
  }
  static canisterIdOf(actor) {
    return Principal.from(actor[metadataSymbol].config.canisterId);
  }
  static createActorClass(interfaceFactory, options) {
    const service = interfaceFactory({ IDL });
    class CanisterActor extends Actor {
      constructor(config) {
        if (!config.canisterId) {
          throw InputError.fromCode(new MissingCanisterIdErrorCode(config.canisterId));
        }
        const canisterId = typeof config.canisterId === "string" ? Principal.fromText(config.canisterId) : config.canisterId;
        super({
          config: {
            ...DEFAULT_ACTOR_CONFIG,
            ...config,
            canisterId
          },
          service
        });
        for (const [methodName, func] of service._fields) {
          if (options == null ? void 0 : options.httpDetails) {
            func.annotations.push(ACTOR_METHOD_WITH_HTTP_DETAILS);
          }
          if (options == null ? void 0 : options.certificate) {
            func.annotations.push(ACTOR_METHOD_WITH_CERTIFICATE);
          }
          this[methodName] = _createActorMethod(this, methodName, func, config.blsVerify);
        }
      }
    }
    return CanisterActor;
  }
  /**
   * Creates an actor with the given interface factory and configuration.
   *
   * The [`@icp-sdk/bindgen`](https://js.icp.build/bindgen/) package can be used to generate the interface factory for your canister.
   * @param interfaceFactory - the interface factory for the actor, typically generated by the [`@icp-sdk/bindgen`](https://js.icp.build/bindgen/) package
   * @param configuration - the configuration for the actor
   * @returns an actor with the given interface factory and configuration
   * @example
   * Using the interface factory generated by the [`@icp-sdk/bindgen`](https://js.icp.build/bindgen/) package:
   * ```ts
   * import { Actor, HttpAgent } from '@icp-sdk/core/agent';
   * import { Principal } from '@icp-sdk/core/principal';
   * import { idlFactory } from './api/declarations/hello-world.did';
   *
   * const canisterId = Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai');
   *
   * const agent = await HttpAgent.create({
   *   host: 'https://icp-api.io',
   * });
   *
   * const actor = Actor.createActor(idlFactory, {
   *   agent,
   *   canisterId,
   * });
   *
   * const response = await actor.greet('world');
   * console.log(response);
   * ```
   * @example
   * Using the `createActor` wrapper function generated by the [`@icp-sdk/bindgen`](https://js.icp.build/bindgen/) package:
   * ```ts
   * import { HttpAgent } from '@icp-sdk/core/agent';
   * import { Principal } from '@icp-sdk/core/principal';
   * import { createActor } from './api/hello-world';
   *
   * const canisterId = Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai');
   *
   * const agent = await HttpAgent.create({
   *   host: 'https://icp-api.io',
   * });
   *
   * const actor = createActor(canisterId, {
   *   agent,
   * });
   *
   * const response = await actor.greet('world');
   * console.log(response);
   * ```
   */
  static createActor(interfaceFactory, configuration) {
    if (!configuration.canisterId) {
      throw InputError.fromCode(new MissingCanisterIdErrorCode(configuration.canisterId));
    }
    return new (this.createActorClass(interfaceFactory))(configuration);
  }
  /**
   * Returns an actor with methods that return the http response details along with the result
   * @param interfaceFactory - the interface factory for the actor
   * @param configuration - the configuration for the actor
   * @deprecated - use createActor with actorClassOptions instead
   */
  static createActorWithHttpDetails(interfaceFactory, configuration) {
    return new (this.createActorClass(interfaceFactory, { httpDetails: true }))(configuration);
  }
  /**
   * Returns an actor with methods that return the http response details along with the result
   * @param interfaceFactory - the interface factory for the actor
   * @param configuration - the configuration for the actor
   * @param actorClassOptions - options for the actor class extended details to return with the result
   */
  static createActorWithExtendedDetails(interfaceFactory, configuration, actorClassOptions = {
    httpDetails: true,
    certificate: true
  }) {
    return new (this.createActorClass(interfaceFactory, actorClassOptions))(configuration);
  }
  constructor(metadata) {
    this[metadataSymbol] = Object.freeze(metadata);
  }
}
function decodeReturnValue(types, msg) {
  const returnValues = decode(types, msg);
  switch (returnValues.length) {
    case 0:
      return void 0;
    case 1:
      return returnValues[0];
    default:
      return returnValues;
  }
}
const DEFAULT_ACTOR_CONFIG = {
  pollingOptions: DEFAULT_POLLING_OPTIONS
};
const ACTOR_METHOD_WITH_HTTP_DETAILS = "http-details";
const ACTOR_METHOD_WITH_CERTIFICATE = "certificate";
function _createActorMethod(actor, methodName, func, blsVerify) {
  let caller;
  if (func.annotations.includes("query") || func.annotations.includes("composite_query")) {
    caller = async (options, ...args) => {
      var _a, _b;
      options = {
        ...options,
        ...(_b = (_a = actor[metadataSymbol].config).queryTransform) == null ? void 0 : _b.call(_a, methodName, args, {
          ...actor[metadataSymbol].config,
          ...options
        })
      };
      const agent = options.agent || actor[metadataSymbol].config.agent || new HttpAgent();
      const cid = Principal.from(options.canisterId || actor[metadataSymbol].config.canisterId);
      const arg = encode(func.argTypes, args);
      const result = await agent.query(cid, {
        methodName,
        arg,
        effectiveCanisterId: options.effectiveCanisterId
      });
      const httpDetails = {
        ...result.httpDetails,
        requestDetails: result.requestDetails
      };
      switch (result.status) {
        case QueryResponseStatus.Rejected: {
          const uncertifiedRejectErrorCode = new UncertifiedRejectErrorCode(result.requestId, result.reject_code, result.reject_message, result.error_code, result.signatures);
          uncertifiedRejectErrorCode.callContext = {
            canisterId: cid,
            methodName,
            httpDetails
          };
          throw RejectError.fromCode(uncertifiedRejectErrorCode);
        }
        case QueryResponseStatus.Replied:
          return func.annotations.includes(ACTOR_METHOD_WITH_HTTP_DETAILS) ? {
            httpDetails,
            result: decodeReturnValue(func.retTypes, result.reply.arg)
          } : decodeReturnValue(func.retTypes, result.reply.arg);
      }
    };
  } else {
    caller = async (options, ...args) => {
      var _a, _b;
      options = {
        ...options,
        ...(_b = (_a = actor[metadataSymbol].config).callTransform) == null ? void 0 : _b.call(_a, methodName, args, {
          ...actor[metadataSymbol].config,
          ...options
        })
      };
      const agent = options.agent || actor[metadataSymbol].config.agent || HttpAgent.createSync();
      const { canisterId, effectiveCanisterId, pollingOptions } = {
        ...DEFAULT_ACTOR_CONFIG,
        ...actor[metadataSymbol].config,
        ...options
      };
      const cid = Principal.from(canisterId);
      const ecid = effectiveCanisterId !== void 0 ? Principal.from(effectiveCanisterId) : cid;
      const arg = encode(func.argTypes, args);
      const { requestId, response, requestDetails } = await agent.call(cid, {
        methodName,
        arg,
        effectiveCanisterId: ecid,
        nonce: options.nonce
      });
      let reply;
      let certificate;
      if (isV3ResponseBody(response.body)) {
        if (agent.rootKey == null) {
          throw ExternalError.fromCode(new MissingRootKeyErrorCode());
        }
        const cert = response.body.certificate;
        certificate = await Certificate.create({
          certificate: cert,
          rootKey: agent.rootKey,
          canisterId: ecid,
          blsVerify,
          agent
        });
        const path = [utf8ToBytes("request_status"), requestId];
        const status = new TextDecoder().decode(lookupResultToBuffer(certificate.lookup_path([...path, "status"])));
        switch (status) {
          case "replied":
            reply = lookupResultToBuffer(certificate.lookup_path([...path, "reply"]));
            break;
          case "rejected": {
            const rejectCode = new Uint8Array(lookupResultToBuffer(certificate.lookup_path([...path, "reject_code"])))[0];
            const rejectMessage = new TextDecoder().decode(lookupResultToBuffer(certificate.lookup_path([...path, "reject_message"])));
            const error_code_buf = lookupResultToBuffer(certificate.lookup_path([...path, "error_code"]));
            const error_code = error_code_buf ? new TextDecoder().decode(error_code_buf) : void 0;
            const certifiedRejectErrorCode = new CertifiedRejectErrorCode(requestId, rejectCode, rejectMessage, error_code);
            certifiedRejectErrorCode.callContext = {
              canisterId: cid,
              methodName,
              httpDetails: response
            };
            throw RejectError.fromCode(certifiedRejectErrorCode);
          }
        }
      } else if (isV2ResponseBody(response.body)) {
        const { reject_code, reject_message, error_code } = response.body;
        const errorCode = new UncertifiedRejectUpdateErrorCode(requestId, reject_code, reject_message, error_code);
        errorCode.callContext = {
          canisterId: cid,
          methodName,
          httpDetails: response
        };
        throw RejectError.fromCode(errorCode);
      }
      if (response.status === 202) {
        const pollOptions = {
          ...pollingOptions,
          blsVerify
        };
        const response2 = await pollForResponse(agent, ecid, requestId, pollOptions);
        certificate = response2.certificate;
        reply = response2.reply;
      }
      const shouldIncludeHttpDetails = func.annotations.includes(ACTOR_METHOD_WITH_HTTP_DETAILS);
      const shouldIncludeCertificate = func.annotations.includes(ACTOR_METHOD_WITH_CERTIFICATE);
      const httpDetails = { ...response, requestDetails };
      if (reply !== void 0) {
        if (shouldIncludeHttpDetails && shouldIncludeCertificate) {
          return {
            httpDetails,
            certificate,
            result: decodeReturnValue(func.retTypes, reply)
          };
        } else if (shouldIncludeCertificate) {
          return {
            certificate,
            result: decodeReturnValue(func.retTypes, reply)
          };
        } else if (shouldIncludeHttpDetails) {
          return {
            httpDetails,
            result: decodeReturnValue(func.retTypes, reply)
          };
        }
        return decodeReturnValue(func.retTypes, reply);
      } else {
        const errorCode = new UnexpectedErrorCode(`Call was returned undefined. We cannot determine if the call was successful or not. Return types: [${func.retTypes.map((t) => t.display()).join(",")}].`);
        errorCode.callContext = {
          canisterId: cid,
          methodName,
          httpDetails
        };
        throw UnknownError.fromCode(errorCode);
      }
    };
  }
  const handler = (...args) => caller({}, ...args);
  handler.withOptions = (options) => (...args) => caller(options, ...args);
  return handler;
}
function hasAccessControl(actor) {
  return typeof actor === "object" && actor !== null && "_initializeAccessControl" in actor;
}
const ACTOR_QUERY_KEY = "actor";
function useActor(createActor2) {
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const actorQuery = useQuery({
    queryKey: [ACTOR_QUERY_KEY, identity == null ? void 0 : identity.getPrincipal().toString()],
    queryFn: async () => {
      const isAuthenticated = !!identity;
      if (!isAuthenticated) {
        return await createActorWithConfig(createActor2);
      }
      const actorOptions = {
        agentOptions: {
          identity
        }
      };
      const actor = await createActorWithConfig(createActor2, actorOptions);
      if (hasAccessControl(actor)) {
        await actor._initializeAccessControl();
      }
      return actor;
    },
    // Only refetch when identity changes
    staleTime: Number.POSITIVE_INFINITY,
    // This will cause the actor to be recreated when the identity changes
    enabled: true
  });
  reactExports.useEffect(() => {
    if (actorQuery.data) {
      queryClient.invalidateQueries({
        predicate: (query) => {
          return !query.queryKey.includes(ACTOR_QUERY_KEY);
        }
      });
      queryClient.refetchQueries({
        predicate: (query) => {
          return !query.queryKey.includes(ACTOR_QUERY_KEY);
        }
      });
    }
  }, [actorQuery.data, queryClient]);
  return {
    actor: actorQuery.data || null,
    isFetching: actorQuery.isFetching
  };
}
const _ImmutableObjectStorageCreateCertificateResult = Record({
  "method": Text,
  "blob_hash": Text
});
const _ImmutableObjectStorageRefillInformation = Record({
  "proposed_top_up_amount": Opt(Nat)
});
const _ImmutableObjectStorageRefillResult = Record({
  "success": Opt(Bool),
  "topped_up_amount": Opt(Nat)
});
const ProductId = Nat;
const AddReviewInput = Record({
  "productId": ProductId,
  "comment": Text,
  "rating": Nat
});
const ReviewId = Nat;
const Timestamp = Int;
const Review = Record({
  "id": ReviewId,
  "userId": Principal$1,
  "createdAt": Timestamp,
  "productId": ProductId,
  "comment": Text,
  "rating": Nat
});
const UserRole = Variant({
  "admin": Null,
  "user": Null,
  "guest": Null
});
const ShoppingItem = Record({
  "productName": Text,
  "currency": Text,
  "quantity": Nat,
  "priceInCents": Nat,
  "productDescription": Text
});
const CouponCode = Text;
const CreateCouponInput = Record({
  "expiryTimestamp": Int,
  "active": Bool,
  "code": CouponCode,
  "discountPercent": Nat
});
const CouponPublic = Record({
  "expiryTimestamp": Int,
  "active": Bool,
  "code": CouponCode,
  "discountPercent": Nat
});
const ShippingAddress = Record({
  "zip": Text,
  "street": Text,
  "country": Text,
  "city": Text,
  "state": Text
});
const OrderItem = Record({
  "qty": Nat,
  "name": Text,
  "color": Text,
  "size": Text,
  "productId": ProductId,
  "price": Nat
});
const CreateOrderInput = Record({
  "couponCode": Opt(Text),
  "shippingAddress": ShippingAddress,
  "stripePaymentIntentId": Text,
  "items": Vec(OrderItem)
});
const OrderId = Nat;
const OrderStatus = Variant({
  "shipped": Null,
  "cancelled": Null,
  "pending": Null,
  "delivered": Null,
  "processing": Null
});
const OrderPublic = Record({
  "id": OrderId,
  "status": OrderStatus,
  "couponCode": Opt(Text),
  "total": Nat,
  "userId": Principal$1,
  "createdAt": Timestamp,
  "discount": Nat,
  "shippingAddress": ShippingAddress,
  "stripePaymentIntentId": Text,
  "items": Vec(OrderItem)
});
const ExternalBlob = Vec(Nat8);
const ProductInput = Record({
  "featured": Bool,
  "name": Text,
  "description": Text,
  "sizes": Vec(Text),
  "category": Text,
  "colors": Vec(Text),
  "price": Nat,
  "stockByVariant": Vec(Tuple(Text, Nat)),
  "images": Vec(ExternalBlob)
});
const ProductPublic = Record({
  "id": ProductId,
  "featured": Bool,
  "name": Text,
  "createdAt": Timestamp,
  "description": Text,
  "sizes": Vec(Text),
  "category": Text,
  "colors": Vec(Text),
  "price": Nat,
  "stockByVariant": Vec(Tuple(Text, Nat)),
  "images": Vec(ExternalBlob)
});
const CartItem = Record({
  "qty": Nat,
  "color": Text,
  "size": Text,
  "productId": ProductId
});
const ProductFilters = Record({
  "sortBy": Opt(Text),
  "page": Opt(Nat),
  "pageSize": Opt(Nat),
  "search": Opt(Text),
  "category": Opt(Text)
});
const StripeSessionStatus = Variant({
  "completed": Record({
    "userPrincipal": Opt(Text),
    "response": Text
  }),
  "failed": Record({ "error": Text })
});
const UserAddress = Record({
  "zip": Text,
  "street": Text,
  "country": Text,
  "city": Text,
  "state": Text
});
const UserPublic = Record({
  "principal": Principal$1,
  "name": Text,
  "createdAt": Timestamp,
  "email": Text,
  "address": Opt(UserAddress)
});
const StripeConfiguration = Record({
  "allowedCountries": Vec(Text),
  "secretKey": Text
});
const http_header = Record({
  "value": Text,
  "name": Text
});
const http_request_result = Record({
  "status": Nat,
  "body": Vec(Nat8),
  "headers": Vec(http_header)
});
const TransformationInput = Record({
  "context": Vec(Nat8),
  "response": http_request_result
});
const TransformationOutput = Record({
  "status": Nat,
  "body": Vec(Nat8),
  "headers": Vec(http_header)
});
const UpdateUserInput = Record({
  "name": Text,
  "email": Text,
  "address": Opt(UserAddress)
});
const ValidateCouponResult = Record({
  "valid": Bool,
  "discountPercent": Nat,
  "message": Text
});
Service({
  "_immutableObjectStorageBlobsAreLive": Func(
    [Vec(Vec(Nat8))],
    [Vec(Bool)],
    ["query"]
  ),
  "_immutableObjectStorageBlobsToDelete": Func(
    [],
    [Vec(Vec(Nat8))],
    ["query"]
  ),
  "_immutableObjectStorageConfirmBlobDeletion": Func(
    [Vec(Vec(Nat8))],
    [],
    []
  ),
  "_immutableObjectStorageCreateCertificate": Func(
    [Text],
    [_ImmutableObjectStorageCreateCertificateResult],
    []
  ),
  "_immutableObjectStorageRefillCashier": Func(
    [Opt(_ImmutableObjectStorageRefillInformation)],
    [_ImmutableObjectStorageRefillResult],
    []
  ),
  "_immutableObjectStorageUpdateGatewayPrincipals": Func([], [], []),
  "_initializeAccessControl": Func([], [], []),
  "addReview": Func([AddReviewInput], [Review], []),
  "addToWishlist": Func([ProductId], [], []),
  "assignCallerUserRole": Func([Principal$1, UserRole], [], []),
  "clearCart": Func([], [], []),
  "createCheckoutSession": Func(
    [Vec(ShoppingItem), Text, Text],
    [Text],
    []
  ),
  "createCoupon": Func([CreateCouponInput], [CouponPublic], []),
  "createOrder": Func([CreateOrderInput], [OrderPublic], []),
  "createProduct": Func([ProductInput], [ProductPublic], []),
  "deleteCoupon": Func([CouponCode], [], []),
  "deleteProduct": Func([ProductId], [], []),
  "getAllCoupons": Func([], [Vec(CouponPublic)], ["query"]),
  "getAllOrders": Func([], [Vec(OrderPublic)], ["query"]),
  "getCallerUserRole": Func([], [UserRole], ["query"]),
  "getCart": Func([], [Vec(CartItem)], ["query"]),
  "getFeaturedProducts": Func([], [Vec(ProductPublic)], ["query"]),
  "getMyOrders": Func([], [Vec(OrderPublic)], ["query"]),
  "getProduct": Func([ProductId], [Opt(ProductPublic)], ["query"]),
  "getProductReviews": Func([ProductId], [Vec(Review)], ["query"]),
  "getProducts": Func(
    [ProductFilters],
    [Vec(ProductPublic)],
    ["query"]
  ),
  "getStripeSessionStatus": Func([Text], [StripeSessionStatus], []),
  "getUserProfile": Func([], [UserPublic], []),
  "getWishlist": Func([], [Vec(ProductId)], ["query"]),
  "isCallerAdmin": Func([], [Bool], ["query"]),
  "isStripeConfigured": Func([], [Bool], ["query"]),
  "removeFromWishlist": Func([ProductId], [], []),
  "setStripeConfiguration": Func([StripeConfiguration], [], []),
  "transform": Func(
    [TransformationInput],
    [TransformationOutput],
    ["query"]
  ),
  "updateCart": Func([Vec(CartItem)], [], []),
  "updateCoupon": Func([CouponCode, CreateCouponInput], [], []),
  "updateOrderStatus": Func([OrderId, OrderStatus], [], []),
  "updateProduct": Func([ProductId, ProductInput], [], []),
  "updateUserProfile": Func([UpdateUserInput], [], []),
  "validateCoupon": Func([CouponCode], [ValidateCouponResult], ["query"])
});
const idlFactory = ({ IDL: IDL2 }) => {
  const _ImmutableObjectStorageCreateCertificateResult2 = IDL2.Record({
    "method": IDL2.Text,
    "blob_hash": IDL2.Text
  });
  const _ImmutableObjectStorageRefillInformation2 = IDL2.Record({
    "proposed_top_up_amount": IDL2.Opt(IDL2.Nat)
  });
  const _ImmutableObjectStorageRefillResult2 = IDL2.Record({
    "success": IDL2.Opt(IDL2.Bool),
    "topped_up_amount": IDL2.Opt(IDL2.Nat)
  });
  const ProductId2 = IDL2.Nat;
  const AddReviewInput2 = IDL2.Record({
    "productId": ProductId2,
    "comment": IDL2.Text,
    "rating": IDL2.Nat
  });
  const ReviewId2 = IDL2.Nat;
  const Timestamp2 = IDL2.Int;
  const Review2 = IDL2.Record({
    "id": ReviewId2,
    "userId": IDL2.Principal,
    "createdAt": Timestamp2,
    "productId": ProductId2,
    "comment": IDL2.Text,
    "rating": IDL2.Nat
  });
  const UserRole2 = IDL2.Variant({
    "admin": IDL2.Null,
    "user": IDL2.Null,
    "guest": IDL2.Null
  });
  const ShoppingItem2 = IDL2.Record({
    "productName": IDL2.Text,
    "currency": IDL2.Text,
    "quantity": IDL2.Nat,
    "priceInCents": IDL2.Nat,
    "productDescription": IDL2.Text
  });
  const CouponCode2 = IDL2.Text;
  const CreateCouponInput2 = IDL2.Record({
    "expiryTimestamp": IDL2.Int,
    "active": IDL2.Bool,
    "code": CouponCode2,
    "discountPercent": IDL2.Nat
  });
  const CouponPublic2 = IDL2.Record({
    "expiryTimestamp": IDL2.Int,
    "active": IDL2.Bool,
    "code": CouponCode2,
    "discountPercent": IDL2.Nat
  });
  const ShippingAddress2 = IDL2.Record({
    "zip": IDL2.Text,
    "street": IDL2.Text,
    "country": IDL2.Text,
    "city": IDL2.Text,
    "state": IDL2.Text
  });
  const OrderItem2 = IDL2.Record({
    "qty": IDL2.Nat,
    "name": IDL2.Text,
    "color": IDL2.Text,
    "size": IDL2.Text,
    "productId": ProductId2,
    "price": IDL2.Nat
  });
  const CreateOrderInput2 = IDL2.Record({
    "couponCode": IDL2.Opt(IDL2.Text),
    "shippingAddress": ShippingAddress2,
    "stripePaymentIntentId": IDL2.Text,
    "items": IDL2.Vec(OrderItem2)
  });
  const OrderId2 = IDL2.Nat;
  const OrderStatus2 = IDL2.Variant({
    "shipped": IDL2.Null,
    "cancelled": IDL2.Null,
    "pending": IDL2.Null,
    "delivered": IDL2.Null,
    "processing": IDL2.Null
  });
  const OrderPublic2 = IDL2.Record({
    "id": OrderId2,
    "status": OrderStatus2,
    "couponCode": IDL2.Opt(IDL2.Text),
    "total": IDL2.Nat,
    "userId": IDL2.Principal,
    "createdAt": Timestamp2,
    "discount": IDL2.Nat,
    "shippingAddress": ShippingAddress2,
    "stripePaymentIntentId": IDL2.Text,
    "items": IDL2.Vec(OrderItem2)
  });
  const ExternalBlob2 = IDL2.Vec(IDL2.Nat8);
  const ProductInput2 = IDL2.Record({
    "featured": IDL2.Bool,
    "name": IDL2.Text,
    "description": IDL2.Text,
    "sizes": IDL2.Vec(IDL2.Text),
    "category": IDL2.Text,
    "colors": IDL2.Vec(IDL2.Text),
    "price": IDL2.Nat,
    "stockByVariant": IDL2.Vec(IDL2.Tuple(IDL2.Text, IDL2.Nat)),
    "images": IDL2.Vec(ExternalBlob2)
  });
  const ProductPublic2 = IDL2.Record({
    "id": ProductId2,
    "featured": IDL2.Bool,
    "name": IDL2.Text,
    "createdAt": Timestamp2,
    "description": IDL2.Text,
    "sizes": IDL2.Vec(IDL2.Text),
    "category": IDL2.Text,
    "colors": IDL2.Vec(IDL2.Text),
    "price": IDL2.Nat,
    "stockByVariant": IDL2.Vec(IDL2.Tuple(IDL2.Text, IDL2.Nat)),
    "images": IDL2.Vec(ExternalBlob2)
  });
  const CartItem2 = IDL2.Record({
    "qty": IDL2.Nat,
    "color": IDL2.Text,
    "size": IDL2.Text,
    "productId": ProductId2
  });
  const ProductFilters2 = IDL2.Record({
    "sortBy": IDL2.Opt(IDL2.Text),
    "page": IDL2.Opt(IDL2.Nat),
    "pageSize": IDL2.Opt(IDL2.Nat),
    "search": IDL2.Opt(IDL2.Text),
    "category": IDL2.Opt(IDL2.Text)
  });
  const StripeSessionStatus2 = IDL2.Variant({
    "completed": IDL2.Record({
      "userPrincipal": IDL2.Opt(IDL2.Text),
      "response": IDL2.Text
    }),
    "failed": IDL2.Record({ "error": IDL2.Text })
  });
  const UserAddress2 = IDL2.Record({
    "zip": IDL2.Text,
    "street": IDL2.Text,
    "country": IDL2.Text,
    "city": IDL2.Text,
    "state": IDL2.Text
  });
  const UserPublic2 = IDL2.Record({
    "principal": IDL2.Principal,
    "name": IDL2.Text,
    "createdAt": Timestamp2,
    "email": IDL2.Text,
    "address": IDL2.Opt(UserAddress2)
  });
  const StripeConfiguration2 = IDL2.Record({
    "allowedCountries": IDL2.Vec(IDL2.Text),
    "secretKey": IDL2.Text
  });
  const http_header2 = IDL2.Record({ "value": IDL2.Text, "name": IDL2.Text });
  const http_request_result2 = IDL2.Record({
    "status": IDL2.Nat,
    "body": IDL2.Vec(IDL2.Nat8),
    "headers": IDL2.Vec(http_header2)
  });
  const TransformationInput2 = IDL2.Record({
    "context": IDL2.Vec(IDL2.Nat8),
    "response": http_request_result2
  });
  const TransformationOutput2 = IDL2.Record({
    "status": IDL2.Nat,
    "body": IDL2.Vec(IDL2.Nat8),
    "headers": IDL2.Vec(http_header2)
  });
  const UpdateUserInput2 = IDL2.Record({
    "name": IDL2.Text,
    "email": IDL2.Text,
    "address": IDL2.Opt(UserAddress2)
  });
  const ValidateCouponResult2 = IDL2.Record({
    "valid": IDL2.Bool,
    "discountPercent": IDL2.Nat,
    "message": IDL2.Text
  });
  return IDL2.Service({
    "_immutableObjectStorageBlobsAreLive": IDL2.Func(
      [IDL2.Vec(IDL2.Vec(IDL2.Nat8))],
      [IDL2.Vec(IDL2.Bool)],
      ["query"]
    ),
    "_immutableObjectStorageBlobsToDelete": IDL2.Func(
      [],
      [IDL2.Vec(IDL2.Vec(IDL2.Nat8))],
      ["query"]
    ),
    "_immutableObjectStorageConfirmBlobDeletion": IDL2.Func(
      [IDL2.Vec(IDL2.Vec(IDL2.Nat8))],
      [],
      []
    ),
    "_immutableObjectStorageCreateCertificate": IDL2.Func(
      [IDL2.Text],
      [_ImmutableObjectStorageCreateCertificateResult2],
      []
    ),
    "_immutableObjectStorageRefillCashier": IDL2.Func(
      [IDL2.Opt(_ImmutableObjectStorageRefillInformation2)],
      [_ImmutableObjectStorageRefillResult2],
      []
    ),
    "_immutableObjectStorageUpdateGatewayPrincipals": IDL2.Func([], [], []),
    "_initializeAccessControl": IDL2.Func([], [], []),
    "addReview": IDL2.Func([AddReviewInput2], [Review2], []),
    "addToWishlist": IDL2.Func([ProductId2], [], []),
    "assignCallerUserRole": IDL2.Func([IDL2.Principal, UserRole2], [], []),
    "clearCart": IDL2.Func([], [], []),
    "createCheckoutSession": IDL2.Func(
      [IDL2.Vec(ShoppingItem2), IDL2.Text, IDL2.Text],
      [IDL2.Text],
      []
    ),
    "createCoupon": IDL2.Func([CreateCouponInput2], [CouponPublic2], []),
    "createOrder": IDL2.Func([CreateOrderInput2], [OrderPublic2], []),
    "createProduct": IDL2.Func([ProductInput2], [ProductPublic2], []),
    "deleteCoupon": IDL2.Func([CouponCode2], [], []),
    "deleteProduct": IDL2.Func([ProductId2], [], []),
    "getAllCoupons": IDL2.Func([], [IDL2.Vec(CouponPublic2)], ["query"]),
    "getAllOrders": IDL2.Func([], [IDL2.Vec(OrderPublic2)], ["query"]),
    "getCallerUserRole": IDL2.Func([], [UserRole2], ["query"]),
    "getCart": IDL2.Func([], [IDL2.Vec(CartItem2)], ["query"]),
    "getFeaturedProducts": IDL2.Func([], [IDL2.Vec(ProductPublic2)], ["query"]),
    "getMyOrders": IDL2.Func([], [IDL2.Vec(OrderPublic2)], ["query"]),
    "getProduct": IDL2.Func([ProductId2], [IDL2.Opt(ProductPublic2)], ["query"]),
    "getProductReviews": IDL2.Func([ProductId2], [IDL2.Vec(Review2)], ["query"]),
    "getProducts": IDL2.Func(
      [ProductFilters2],
      [IDL2.Vec(ProductPublic2)],
      ["query"]
    ),
    "getStripeSessionStatus": IDL2.Func([IDL2.Text], [StripeSessionStatus2], []),
    "getUserProfile": IDL2.Func([], [UserPublic2], []),
    "getWishlist": IDL2.Func([], [IDL2.Vec(ProductId2)], ["query"]),
    "isCallerAdmin": IDL2.Func([], [IDL2.Bool], ["query"]),
    "isStripeConfigured": IDL2.Func([], [IDL2.Bool], ["query"]),
    "removeFromWishlist": IDL2.Func([ProductId2], [], []),
    "setStripeConfiguration": IDL2.Func([StripeConfiguration2], [], []),
    "transform": IDL2.Func(
      [TransformationInput2],
      [TransformationOutput2],
      ["query"]
    ),
    "updateCart": IDL2.Func([IDL2.Vec(CartItem2)], [], []),
    "updateCoupon": IDL2.Func([CouponCode2, CreateCouponInput2], [], []),
    "updateOrderStatus": IDL2.Func([OrderId2, OrderStatus2], [], []),
    "updateProduct": IDL2.Func([ProductId2, ProductInput2], [], []),
    "updateUserProfile": IDL2.Func([UpdateUserInput2], [], []),
    "validateCoupon": IDL2.Func(
      [CouponCode2],
      [ValidateCouponResult2],
      ["query"]
    )
  });
};
function candid_some(value) {
  return [
    value
  ];
}
function candid_none() {
  return [];
}
function record_opt_to_undefined(arg) {
  return arg == null ? void 0 : arg;
}
class Backend {
  constructor(actor, _uploadFile, _downloadFile, processError) {
    this.actor = actor;
    this._uploadFile = _uploadFile;
    this._downloadFile = _downloadFile;
    this.processError = processError;
  }
  async _immutableObjectStorageBlobsAreLive(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor._immutableObjectStorageBlobsAreLive(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor._immutableObjectStorageBlobsAreLive(arg0);
      return result;
    }
  }
  async _immutableObjectStorageBlobsToDelete() {
    if (this.processError) {
      try {
        const result = await this.actor._immutableObjectStorageBlobsToDelete();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor._immutableObjectStorageBlobsToDelete();
      return result;
    }
  }
  async _immutableObjectStorageConfirmBlobDeletion(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor._immutableObjectStorageConfirmBlobDeletion(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor._immutableObjectStorageConfirmBlobDeletion(arg0);
      return result;
    }
  }
  async _immutableObjectStorageCreateCertificate(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor._immutableObjectStorageCreateCertificate(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor._immutableObjectStorageCreateCertificate(arg0);
      return result;
    }
  }
  async _immutableObjectStorageRefillCashier(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor._immutableObjectStorageRefillCashier(to_candid_opt_n1(this._uploadFile, this._downloadFile, arg0));
        return from_candid__ImmutableObjectStorageRefillResult_n4(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor._immutableObjectStorageRefillCashier(to_candid_opt_n1(this._uploadFile, this._downloadFile, arg0));
      return from_candid__ImmutableObjectStorageRefillResult_n4(this._uploadFile, this._downloadFile, result);
    }
  }
  async _immutableObjectStorageUpdateGatewayPrincipals() {
    if (this.processError) {
      try {
        const result = await this.actor._immutableObjectStorageUpdateGatewayPrincipals();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor._immutableObjectStorageUpdateGatewayPrincipals();
      return result;
    }
  }
  async _initializeAccessControl() {
    if (this.processError) {
      try {
        const result = await this.actor._initializeAccessControl();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor._initializeAccessControl();
      return result;
    }
  }
  async addReview(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.addReview(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.addReview(arg0);
      return result;
    }
  }
  async addToWishlist(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.addToWishlist(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.addToWishlist(arg0);
      return result;
    }
  }
  async assignCallerUserRole(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.assignCallerUserRole(arg0, to_candid_UserRole_n8(this._uploadFile, this._downloadFile, arg1));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.assignCallerUserRole(arg0, to_candid_UserRole_n8(this._uploadFile, this._downloadFile, arg1));
      return result;
    }
  }
  async clearCart() {
    if (this.processError) {
      try {
        const result = await this.actor.clearCart();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.clearCart();
      return result;
    }
  }
  async createCheckoutSession(arg0, arg1, arg2) {
    if (this.processError) {
      try {
        const result = await this.actor.createCheckoutSession(arg0, arg1, arg2);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.createCheckoutSession(arg0, arg1, arg2);
      return result;
    }
  }
  async createCoupon(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.createCoupon(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.createCoupon(arg0);
      return result;
    }
  }
  async createOrder(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.createOrder(to_candid_CreateOrderInput_n10(this._uploadFile, this._downloadFile, arg0));
        return from_candid_OrderPublic_n12(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.createOrder(to_candid_CreateOrderInput_n10(this._uploadFile, this._downloadFile, arg0));
      return from_candid_OrderPublic_n12(this._uploadFile, this._downloadFile, result);
    }
  }
  async createProduct(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.createProduct(await to_candid_ProductInput_n17(this._uploadFile, this._downloadFile, arg0));
        return from_candid_ProductPublic_n21(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.createProduct(await to_candid_ProductInput_n17(this._uploadFile, this._downloadFile, arg0));
      return from_candid_ProductPublic_n21(this._uploadFile, this._downloadFile, result);
    }
  }
  async deleteCoupon(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.deleteCoupon(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.deleteCoupon(arg0);
      return result;
    }
  }
  async deleteProduct(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.deleteProduct(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.deleteProduct(arg0);
      return result;
    }
  }
  async getAllCoupons() {
    if (this.processError) {
      try {
        const result = await this.actor.getAllCoupons();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getAllCoupons();
      return result;
    }
  }
  async getAllOrders() {
    if (this.processError) {
      try {
        const result = await this.actor.getAllOrders();
        return from_candid_vec_n25(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getAllOrders();
      return from_candid_vec_n25(this._uploadFile, this._downloadFile, result);
    }
  }
  async getCallerUserRole() {
    if (this.processError) {
      try {
        const result = await this.actor.getCallerUserRole();
        return from_candid_UserRole_n26(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getCallerUserRole();
      return from_candid_UserRole_n26(this._uploadFile, this._downloadFile, result);
    }
  }
  async getCart() {
    if (this.processError) {
      try {
        const result = await this.actor.getCart();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getCart();
      return result;
    }
  }
  async getFeaturedProducts() {
    if (this.processError) {
      try {
        const result = await this.actor.getFeaturedProducts();
        return from_candid_vec_n28(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getFeaturedProducts();
      return from_candid_vec_n28(this._uploadFile, this._downloadFile, result);
    }
  }
  async getMyOrders() {
    if (this.processError) {
      try {
        const result = await this.actor.getMyOrders();
        return from_candid_vec_n25(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getMyOrders();
      return from_candid_vec_n25(this._uploadFile, this._downloadFile, result);
    }
  }
  async getProduct(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getProduct(arg0);
        return from_candid_opt_n29(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getProduct(arg0);
      return from_candid_opt_n29(this._uploadFile, this._downloadFile, result);
    }
  }
  async getProductReviews(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getProductReviews(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getProductReviews(arg0);
      return result;
    }
  }
  async getProducts(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getProducts(to_candid_ProductFilters_n30(this._uploadFile, this._downloadFile, arg0));
        return from_candid_vec_n28(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getProducts(to_candid_ProductFilters_n30(this._uploadFile, this._downloadFile, arg0));
      return from_candid_vec_n28(this._uploadFile, this._downloadFile, result);
    }
  }
  async getStripeSessionStatus(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getStripeSessionStatus(arg0);
        return from_candid_StripeSessionStatus_n32(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getStripeSessionStatus(arg0);
      return from_candid_StripeSessionStatus_n32(this._uploadFile, this._downloadFile, result);
    }
  }
  async getUserProfile() {
    if (this.processError) {
      try {
        const result = await this.actor.getUserProfile();
        return from_candid_UserPublic_n35(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getUserProfile();
      return from_candid_UserPublic_n35(this._uploadFile, this._downloadFile, result);
    }
  }
  async getWishlist() {
    if (this.processError) {
      try {
        const result = await this.actor.getWishlist();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getWishlist();
      return result;
    }
  }
  async isCallerAdmin() {
    if (this.processError) {
      try {
        const result = await this.actor.isCallerAdmin();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.isCallerAdmin();
      return result;
    }
  }
  async isStripeConfigured() {
    if (this.processError) {
      try {
        const result = await this.actor.isStripeConfigured();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.isStripeConfigured();
      return result;
    }
  }
  async removeFromWishlist(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.removeFromWishlist(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.removeFromWishlist(arg0);
      return result;
    }
  }
  async setStripeConfiguration(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.setStripeConfiguration(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.setStripeConfiguration(arg0);
      return result;
    }
  }
  async transform(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.transform(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.transform(arg0);
      return result;
    }
  }
  async updateCart(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.updateCart(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.updateCart(arg0);
      return result;
    }
  }
  async updateCoupon(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.updateCoupon(arg0, arg1);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.updateCoupon(arg0, arg1);
      return result;
    }
  }
  async updateOrderStatus(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.updateOrderStatus(arg0, to_candid_OrderStatus_n38(this._uploadFile, this._downloadFile, arg1));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.updateOrderStatus(arg0, to_candid_OrderStatus_n38(this._uploadFile, this._downloadFile, arg1));
      return result;
    }
  }
  async updateProduct(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.updateProduct(arg0, await to_candid_ProductInput_n17(this._uploadFile, this._downloadFile, arg1));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.updateProduct(arg0, await to_candid_ProductInput_n17(this._uploadFile, this._downloadFile, arg1));
      return result;
    }
  }
  async updateUserProfile(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.updateUserProfile(to_candid_UpdateUserInput_n40(this._uploadFile, this._downloadFile, arg0));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.updateUserProfile(to_candid_UpdateUserInput_n40(this._uploadFile, this._downloadFile, arg0));
      return result;
    }
  }
  async validateCoupon(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.validateCoupon(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.validateCoupon(arg0);
      return result;
    }
  }
}
async function from_candid_ExternalBlob_n24(_uploadFile, _downloadFile, value) {
  return await _downloadFile(value);
}
function from_candid_OrderPublic_n12(_uploadFile, _downloadFile, value) {
  return from_candid_record_n13(_uploadFile, _downloadFile, value);
}
function from_candid_OrderStatus_n14(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n15(_uploadFile, _downloadFile, value);
}
async function from_candid_ProductPublic_n21(_uploadFile, _downloadFile, value) {
  return await from_candid_record_n22(_uploadFile, _downloadFile, value);
}
function from_candid_StripeSessionStatus_n32(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n33(_uploadFile, _downloadFile, value);
}
function from_candid_UserPublic_n35(_uploadFile, _downloadFile, value) {
  return from_candid_record_n36(_uploadFile, _downloadFile, value);
}
function from_candid_UserRole_n26(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n27(_uploadFile, _downloadFile, value);
}
function from_candid__ImmutableObjectStorageRefillResult_n4(_uploadFile, _downloadFile, value) {
  return from_candid_record_n5(_uploadFile, _downloadFile, value);
}
function from_candid_opt_n16(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : value[0];
}
async function from_candid_opt_n29(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : await from_candid_ProductPublic_n21(_uploadFile, _downloadFile, value[0]);
}
function from_candid_opt_n37(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : value[0];
}
function from_candid_opt_n6(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : value[0];
}
function from_candid_opt_n7(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : value[0];
}
function from_candid_record_n13(_uploadFile, _downloadFile, value) {
  return {
    id: value.id,
    status: from_candid_OrderStatus_n14(_uploadFile, _downloadFile, value.status),
    couponCode: record_opt_to_undefined(from_candid_opt_n16(_uploadFile, _downloadFile, value.couponCode)),
    total: value.total,
    userId: value.userId,
    createdAt: value.createdAt,
    discount: value.discount,
    shippingAddress: value.shippingAddress,
    stripePaymentIntentId: value.stripePaymentIntentId,
    items: value.items
  };
}
async function from_candid_record_n22(_uploadFile, _downloadFile, value) {
  return {
    id: value.id,
    featured: value.featured,
    name: value.name,
    createdAt: value.createdAt,
    description: value.description,
    sizes: value.sizes,
    category: value.category,
    colors: value.colors,
    price: value.price,
    stockByVariant: value.stockByVariant,
    images: await from_candid_vec_n23(_uploadFile, _downloadFile, value.images)
  };
}
function from_candid_record_n34(_uploadFile, _downloadFile, value) {
  return {
    userPrincipal: record_opt_to_undefined(from_candid_opt_n16(_uploadFile, _downloadFile, value.userPrincipal)),
    response: value.response
  };
}
function from_candid_record_n36(_uploadFile, _downloadFile, value) {
  return {
    principal: value.principal,
    name: value.name,
    createdAt: value.createdAt,
    email: value.email,
    address: record_opt_to_undefined(from_candid_opt_n37(_uploadFile, _downloadFile, value.address))
  };
}
function from_candid_record_n5(_uploadFile, _downloadFile, value) {
  return {
    success: record_opt_to_undefined(from_candid_opt_n6(_uploadFile, _downloadFile, value.success)),
    topped_up_amount: record_opt_to_undefined(from_candid_opt_n7(_uploadFile, _downloadFile, value.topped_up_amount))
  };
}
function from_candid_variant_n15(_uploadFile, _downloadFile, value) {
  return "shipped" in value ? "shipped" : "cancelled" in value ? "cancelled" : "pending" in value ? "pending" : "delivered" in value ? "delivered" : "processing" in value ? "processing" : value;
}
function from_candid_variant_n27(_uploadFile, _downloadFile, value) {
  return "admin" in value ? "admin" : "user" in value ? "user" : "guest" in value ? "guest" : value;
}
function from_candid_variant_n33(_uploadFile, _downloadFile, value) {
  return "completed" in value ? {
    __kind__: "completed",
    completed: from_candid_record_n34(_uploadFile, _downloadFile, value.completed)
  } : "failed" in value ? {
    __kind__: "failed",
    failed: value.failed
  } : value;
}
async function from_candid_vec_n23(_uploadFile, _downloadFile, value) {
  return await Promise.all(value.map(async (x) => await from_candid_ExternalBlob_n24(_uploadFile, _downloadFile, x)));
}
function from_candid_vec_n25(_uploadFile, _downloadFile, value) {
  return value.map((x) => from_candid_OrderPublic_n12(_uploadFile, _downloadFile, x));
}
async function from_candid_vec_n28(_uploadFile, _downloadFile, value) {
  return await Promise.all(value.map(async (x) => await from_candid_ProductPublic_n21(_uploadFile, _downloadFile, x)));
}
function to_candid_CreateOrderInput_n10(_uploadFile, _downloadFile, value) {
  return to_candid_record_n11(_uploadFile, _downloadFile, value);
}
async function to_candid_ExternalBlob_n20(_uploadFile, _downloadFile, value) {
  return await _uploadFile(value);
}
function to_candid_OrderStatus_n38(_uploadFile, _downloadFile, value) {
  return to_candid_variant_n39(_uploadFile, _downloadFile, value);
}
function to_candid_ProductFilters_n30(_uploadFile, _downloadFile, value) {
  return to_candid_record_n31(_uploadFile, _downloadFile, value);
}
async function to_candid_ProductInput_n17(_uploadFile, _downloadFile, value) {
  return await to_candid_record_n18(_uploadFile, _downloadFile, value);
}
function to_candid_UpdateUserInput_n40(_uploadFile, _downloadFile, value) {
  return to_candid_record_n41(_uploadFile, _downloadFile, value);
}
function to_candid_UserRole_n8(_uploadFile, _downloadFile, value) {
  return to_candid_variant_n9(_uploadFile, _downloadFile, value);
}
function to_candid__ImmutableObjectStorageRefillInformation_n2(_uploadFile, _downloadFile, value) {
  return to_candid_record_n3(_uploadFile, _downloadFile, value);
}
function to_candid_opt_n1(_uploadFile, _downloadFile, value) {
  return value === null ? candid_none() : candid_some(to_candid__ImmutableObjectStorageRefillInformation_n2(_uploadFile, _downloadFile, value));
}
function to_candid_record_n11(_uploadFile, _downloadFile, value) {
  return {
    couponCode: value.couponCode ? candid_some(value.couponCode) : candid_none(),
    shippingAddress: value.shippingAddress,
    stripePaymentIntentId: value.stripePaymentIntentId,
    items: value.items
  };
}
async function to_candid_record_n18(_uploadFile, _downloadFile, value) {
  return {
    featured: value.featured,
    name: value.name,
    description: value.description,
    sizes: value.sizes,
    category: value.category,
    colors: value.colors,
    price: value.price,
    stockByVariant: value.stockByVariant,
    images: await to_candid_vec_n19(_uploadFile, _downloadFile, value.images)
  };
}
function to_candid_record_n3(_uploadFile, _downloadFile, value) {
  return {
    proposed_top_up_amount: value.proposed_top_up_amount ? candid_some(value.proposed_top_up_amount) : candid_none()
  };
}
function to_candid_record_n31(_uploadFile, _downloadFile, value) {
  return {
    sortBy: value.sortBy ? candid_some(value.sortBy) : candid_none(),
    page: value.page ? candid_some(value.page) : candid_none(),
    pageSize: value.pageSize ? candid_some(value.pageSize) : candid_none(),
    search: value.search ? candid_some(value.search) : candid_none(),
    category: value.category ? candid_some(value.category) : candid_none()
  };
}
function to_candid_record_n41(_uploadFile, _downloadFile, value) {
  return {
    name: value.name,
    email: value.email,
    address: value.address ? candid_some(value.address) : candid_none()
  };
}
function to_candid_variant_n39(_uploadFile, _downloadFile, value) {
  return value == "shipped" ? {
    shipped: null
  } : value == "cancelled" ? {
    cancelled: null
  } : value == "pending" ? {
    pending: null
  } : value == "delivered" ? {
    delivered: null
  } : value == "processing" ? {
    processing: null
  } : value;
}
function to_candid_variant_n9(_uploadFile, _downloadFile, value) {
  return value == "admin" ? {
    admin: null
  } : value == "user" ? {
    user: null
  } : value == "guest" ? {
    guest: null
  } : value;
}
async function to_candid_vec_n19(_uploadFile, _downloadFile, value) {
  return await Promise.all(value.map(async (x) => await to_candid_ExternalBlob_n20(_uploadFile, _downloadFile, x)));
}
function createActor(canisterId, _uploadFile, _downloadFile, options = {}) {
  const agent = options.agent || HttpAgent.createSync({
    ...options.agentOptions
  });
  if (options.agent && options.agentOptions) {
    console.warn("Detected both agent and agentOptions passed to createActor. Ignoring agentOptions and proceeding with the provided agent.");
  }
  const actor = Actor.createActor(idlFactory, {
    agent,
    canisterId,
    ...options.actorOptions
  });
  return new Backend(actor, _uploadFile, _downloadFile, options.processError);
}
const MOCK_PRODUCTS = [
  {
    id: "p1",
    name: "Obsidian Watch",
    description: "A precision-crafted timepiece with a sapphire crystal face and midnight matte finish. Water resistant to 200m.",
    price: 849,
    comparePrice: 1200,
    images: ["/assets/generated/product-watch.dim_600x600.jpg"],
    category: "Accessories",
    stock: 12,
    rating: 4.9,
    reviewCount: 142,
    tags: ["luxury", "watch", "accessories"],
    featured: true,
    colors: ["Midnight Black", "Brushed Silver", "Rose Gold"]
  },
  {
    id: "p2",
    name: "Lumière Fragrance",
    description: "An artisanal eau de parfum blending bergamot, vetiver, and sandalwood. 50ml hand-blown glass flacon.",
    price: 320,
    images: ["/assets/generated/product-fragrance.dim_600x600.jpg"],
    category: "Beauty",
    stock: 28,
    rating: 4.8,
    reviewCount: 89,
    tags: ["fragrance", "luxury", "beauty"],
    featured: true
  },
  {
    id: "p3",
    name: "Carbon Fiber Wallet",
    description: "Ultra-thin RFID-blocking wallet crafted from aerospace-grade carbon fiber. Holds 12 cards.",
    price: 195,
    comparePrice: 250,
    images: ["/assets/generated/product-wallet.dim_600x600.jpg"],
    category: "Accessories",
    stock: 45,
    rating: 4.7,
    reviewCount: 203,
    tags: ["wallet", "carbon fiber", "minimalist"],
    featured: true,
    colors: ["Carbon Black", "Silver Weave"]
  },
  {
    id: "p4",
    name: "Merino Crewneck",
    description: "Superfine 18.5 micron merino wool crewneck. Naturally temperature-regulating, machine washable.",
    price: 285,
    images: ["/assets/generated/product-sweater.dim_600x600.jpg"],
    category: "Apparel",
    stock: 33,
    rating: 4.6,
    reviewCount: 67,
    tags: ["apparel", "merino", "knitwear"],
    featured: false,
    colors: ["Cloud White", "Slate Grey", "Forest Green"],
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: "p5",
    name: "Leather Attaché",
    description: 'Hand-stitched full-grain leather briefcase with solid brass hardware. Fits 15" laptop.',
    price: 1150,
    comparePrice: 1400,
    images: ["/assets/generated/product-bag.dim_600x600.jpg"],
    category: "Bags",
    stock: 8,
    rating: 4.9,
    reviewCount: 54,
    tags: ["leather", "bag", "briefcase"],
    featured: true,
    colors: ["Cognac", "Dark Brown", "Jet Black"]
  },
  {
    id: "p6",
    name: "Ceramic Pour-Over",
    description: "Handthrown stoneware pour-over kit with walnut stand. Each piece is one-of-a-kind.",
    price: 175,
    images: ["/assets/generated/product-ceramic.dim_600x600.jpg"],
    category: "Home",
    stock: 20,
    rating: 4.8,
    reviewCount: 31,
    tags: ["ceramic", "coffee", "home"],
    featured: false,
    colors: ["Ash White", "Charcoal", "Terracotta"]
  }
];
function useProducts(category) {
  return useQuery({
    queryKey: ["products", category],
    queryFn: async () => category ? MOCK_PRODUCTS.filter((p) => p.category === category) : MOCK_PRODUCTS,
    staleTime: 1e3 * 60 * 5
  });
}
function useFeaturedProducts() {
  return useQuery({
    queryKey: ["products", "featured"],
    queryFn: async () => MOCK_PRODUCTS.filter((p) => p.featured),
    staleTime: 1e3 * 60 * 5
  });
}
function useProduct(id) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => MOCK_PRODUCTS.find((p) => p.id === id) ?? null,
    enabled: !!id,
    staleTime: 1e3 * 60 * 5
  });
}
function useAddProduct() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (product) => {
      if (!actor) throw new Error("Not connected");
      const input = {
        name: product.name,
        description: product.description,
        price: BigInt(Math.round(product.price * 100)),
        category: product.category,
        featured: product.featured ?? false,
        colors: product.colors ?? [],
        sizes: product.sizes ?? [],
        stockByVariant: [["default", BigInt(product.stock ?? 0)]],
        images: []
      };
      return actor.createProduct(input);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] })
  });
}
function useUpdateProduct() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (args) => {
      if (!actor) throw new Error("Not connected");
      const existing = MOCK_PRODUCTS.find((p) => p.id === args.id);
      const merged = { ...existing, ...args.updates };
      const input = {
        name: merged.name,
        description: merged.description ?? "",
        price: BigInt(Math.round((merged.price ?? 0) * 100)),
        category: merged.category ?? "",
        featured: merged.featured ?? false,
        colors: merged.colors ?? [],
        sizes: merged.sizes ?? [],
        stockByVariant: [["default", BigInt(merged.stock ?? 0)]],
        images: []
      };
      return actor.updateProduct(BigInt(args.id), input);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] })
  });
}
function useDeleteProduct() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteProduct(BigInt(id));
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] })
  });
}
export {
  useProducts as a,
  useProduct as b,
  useAddProduct as c,
  useUpdateProduct as d,
  useDeleteProduct as e,
  useFeaturedProducts as u
};
