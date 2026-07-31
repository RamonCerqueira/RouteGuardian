
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Tenant
 * 
 */
export type Tenant = $Result.DefaultSelection<Prisma.$TenantPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model RefreshToken
 * 
 */
export type RefreshToken = $Result.DefaultSelection<Prisma.$RefreshTokenPayload>
/**
 * Model Vehicle
 * 
 */
export type Vehicle = $Result.DefaultSelection<Prisma.$VehiclePayload>
/**
 * Model Client
 * 
 */
export type Client = $Result.DefaultSelection<Prisma.$ClientPayload>
/**
 * Model Route
 * 
 */
export type Route = $Result.DefaultSelection<Prisma.$RoutePayload>
/**
 * Model Delivery
 * 
 */
export type Delivery = $Result.DefaultSelection<Prisma.$DeliveryPayload>
/**
 * Model LocationLog
 * 
 */
export type LocationLog = $Result.DefaultSelection<Prisma.$LocationLogPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Tenants
 * const tenants = await prisma.tenant.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Tenants
   * const tenants = await prisma.tenant.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.tenant`: Exposes CRUD operations for the **Tenant** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tenants
    * const tenants = await prisma.tenant.findMany()
    * ```
    */
  get tenant(): Prisma.TenantDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.refreshToken`: Exposes CRUD operations for the **RefreshToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RefreshTokens
    * const refreshTokens = await prisma.refreshToken.findMany()
    * ```
    */
  get refreshToken(): Prisma.RefreshTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.vehicle`: Exposes CRUD operations for the **Vehicle** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Vehicles
    * const vehicles = await prisma.vehicle.findMany()
    * ```
    */
  get vehicle(): Prisma.VehicleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.client`: Exposes CRUD operations for the **Client** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Clients
    * const clients = await prisma.client.findMany()
    * ```
    */
  get client(): Prisma.ClientDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.route`: Exposes CRUD operations for the **Route** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Routes
    * const routes = await prisma.route.findMany()
    * ```
    */
  get route(): Prisma.RouteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.delivery`: Exposes CRUD operations for the **Delivery** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Deliveries
    * const deliveries = await prisma.delivery.findMany()
    * ```
    */
  get delivery(): Prisma.DeliveryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.locationLog`: Exposes CRUD operations for the **LocationLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LocationLogs
    * const locationLogs = await prisma.locationLog.findMany()
    * ```
    */
  get locationLog(): Prisma.LocationLogDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Tenant: 'Tenant',
    User: 'User',
    RefreshToken: 'RefreshToken',
    Vehicle: 'Vehicle',
    Client: 'Client',
    Route: 'Route',
    Delivery: 'Delivery',
    LocationLog: 'LocationLog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "tenant" | "user" | "refreshToken" | "vehicle" | "client" | "route" | "delivery" | "locationLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Tenant: {
        payload: Prisma.$TenantPayload<ExtArgs>
        fields: Prisma.TenantFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TenantFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TenantFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          findFirst: {
            args: Prisma.TenantFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TenantFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          findMany: {
            args: Prisma.TenantFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>[]
          }
          create: {
            args: Prisma.TenantCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          createMany: {
            args: Prisma.TenantCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TenantCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>[]
          }
          delete: {
            args: Prisma.TenantDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          update: {
            args: Prisma.TenantUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          deleteMany: {
            args: Prisma.TenantDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TenantUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TenantUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>[]
          }
          upsert: {
            args: Prisma.TenantUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          aggregate: {
            args: Prisma.TenantAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTenant>
          }
          groupBy: {
            args: Prisma.TenantGroupByArgs<ExtArgs>
            result: $Utils.Optional<TenantGroupByOutputType>[]
          }
          count: {
            args: Prisma.TenantCountArgs<ExtArgs>
            result: $Utils.Optional<TenantCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      RefreshToken: {
        payload: Prisma.$RefreshTokenPayload<ExtArgs>
        fields: Prisma.RefreshTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RefreshTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RefreshTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          findFirst: {
            args: Prisma.RefreshTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RefreshTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          findMany: {
            args: Prisma.RefreshTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[]
          }
          create: {
            args: Prisma.RefreshTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          createMany: {
            args: Prisma.RefreshTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RefreshTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[]
          }
          delete: {
            args: Prisma.RefreshTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          update: {
            args: Prisma.RefreshTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          deleteMany: {
            args: Prisma.RefreshTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RefreshTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RefreshTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[]
          }
          upsert: {
            args: Prisma.RefreshTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          aggregate: {
            args: Prisma.RefreshTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRefreshToken>
          }
          groupBy: {
            args: Prisma.RefreshTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<RefreshTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.RefreshTokenCountArgs<ExtArgs>
            result: $Utils.Optional<RefreshTokenCountAggregateOutputType> | number
          }
        }
      }
      Vehicle: {
        payload: Prisma.$VehiclePayload<ExtArgs>
        fields: Prisma.VehicleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VehicleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VehicleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          findFirst: {
            args: Prisma.VehicleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VehicleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          findMany: {
            args: Prisma.VehicleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>[]
          }
          create: {
            args: Prisma.VehicleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          createMany: {
            args: Prisma.VehicleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VehicleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>[]
          }
          delete: {
            args: Prisma.VehicleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          update: {
            args: Prisma.VehicleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          deleteMany: {
            args: Prisma.VehicleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VehicleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VehicleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>[]
          }
          upsert: {
            args: Prisma.VehicleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          aggregate: {
            args: Prisma.VehicleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVehicle>
          }
          groupBy: {
            args: Prisma.VehicleGroupByArgs<ExtArgs>
            result: $Utils.Optional<VehicleGroupByOutputType>[]
          }
          count: {
            args: Prisma.VehicleCountArgs<ExtArgs>
            result: $Utils.Optional<VehicleCountAggregateOutputType> | number
          }
        }
      }
      Client: {
        payload: Prisma.$ClientPayload<ExtArgs>
        fields: Prisma.ClientFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClientFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClientFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          findFirst: {
            args: Prisma.ClientFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClientFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          findMany: {
            args: Prisma.ClientFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>[]
          }
          create: {
            args: Prisma.ClientCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          createMany: {
            args: Prisma.ClientCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClientCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>[]
          }
          delete: {
            args: Prisma.ClientDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          update: {
            args: Prisma.ClientUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          deleteMany: {
            args: Prisma.ClientDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClientUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ClientUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>[]
          }
          upsert: {
            args: Prisma.ClientUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          aggregate: {
            args: Prisma.ClientAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClient>
          }
          groupBy: {
            args: Prisma.ClientGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClientGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClientCountArgs<ExtArgs>
            result: $Utils.Optional<ClientCountAggregateOutputType> | number
          }
        }
      }
      Route: {
        payload: Prisma.$RoutePayload<ExtArgs>
        fields: Prisma.RouteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RouteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RouteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutePayload>
          }
          findFirst: {
            args: Prisma.RouteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RouteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutePayload>
          }
          findMany: {
            args: Prisma.RouteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutePayload>[]
          }
          create: {
            args: Prisma.RouteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutePayload>
          }
          createMany: {
            args: Prisma.RouteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RouteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutePayload>[]
          }
          delete: {
            args: Prisma.RouteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutePayload>
          }
          update: {
            args: Prisma.RouteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutePayload>
          }
          deleteMany: {
            args: Prisma.RouteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RouteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RouteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutePayload>[]
          }
          upsert: {
            args: Prisma.RouteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutePayload>
          }
          aggregate: {
            args: Prisma.RouteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoute>
          }
          groupBy: {
            args: Prisma.RouteGroupByArgs<ExtArgs>
            result: $Utils.Optional<RouteGroupByOutputType>[]
          }
          count: {
            args: Prisma.RouteCountArgs<ExtArgs>
            result: $Utils.Optional<RouteCountAggregateOutputType> | number
          }
        }
      }
      Delivery: {
        payload: Prisma.$DeliveryPayload<ExtArgs>
        fields: Prisma.DeliveryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DeliveryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DeliveryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryPayload>
          }
          findFirst: {
            args: Prisma.DeliveryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DeliveryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryPayload>
          }
          findMany: {
            args: Prisma.DeliveryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryPayload>[]
          }
          create: {
            args: Prisma.DeliveryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryPayload>
          }
          createMany: {
            args: Prisma.DeliveryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DeliveryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryPayload>[]
          }
          delete: {
            args: Prisma.DeliveryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryPayload>
          }
          update: {
            args: Prisma.DeliveryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryPayload>
          }
          deleteMany: {
            args: Prisma.DeliveryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DeliveryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DeliveryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryPayload>[]
          }
          upsert: {
            args: Prisma.DeliveryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryPayload>
          }
          aggregate: {
            args: Prisma.DeliveryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDelivery>
          }
          groupBy: {
            args: Prisma.DeliveryGroupByArgs<ExtArgs>
            result: $Utils.Optional<DeliveryGroupByOutputType>[]
          }
          count: {
            args: Prisma.DeliveryCountArgs<ExtArgs>
            result: $Utils.Optional<DeliveryCountAggregateOutputType> | number
          }
        }
      }
      LocationLog: {
        payload: Prisma.$LocationLogPayload<ExtArgs>
        fields: Prisma.LocationLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LocationLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LocationLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationLogPayload>
          }
          findFirst: {
            args: Prisma.LocationLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LocationLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationLogPayload>
          }
          findMany: {
            args: Prisma.LocationLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationLogPayload>[]
          }
          create: {
            args: Prisma.LocationLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationLogPayload>
          }
          createMany: {
            args: Prisma.LocationLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LocationLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationLogPayload>[]
          }
          delete: {
            args: Prisma.LocationLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationLogPayload>
          }
          update: {
            args: Prisma.LocationLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationLogPayload>
          }
          deleteMany: {
            args: Prisma.LocationLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LocationLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LocationLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationLogPayload>[]
          }
          upsert: {
            args: Prisma.LocationLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationLogPayload>
          }
          aggregate: {
            args: Prisma.LocationLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLocationLog>
          }
          groupBy: {
            args: Prisma.LocationLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<LocationLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.LocationLogCountArgs<ExtArgs>
            result: $Utils.Optional<LocationLogCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    tenant?: TenantOmit
    user?: UserOmit
    refreshToken?: RefreshTokenOmit
    vehicle?: VehicleOmit
    client?: ClientOmit
    route?: RouteOmit
    delivery?: DeliveryOmit
    locationLog?: LocationLogOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type TenantCountOutputType
   */

  export type TenantCountOutputType = {
    users: number
    vehicles: number
    clients: number
    routes: number
    deliveries: number
  }

  export type TenantCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | TenantCountOutputTypeCountUsersArgs
    vehicles?: boolean | TenantCountOutputTypeCountVehiclesArgs
    clients?: boolean | TenantCountOutputTypeCountClientsArgs
    routes?: boolean | TenantCountOutputTypeCountRoutesArgs
    deliveries?: boolean | TenantCountOutputTypeCountDeliveriesArgs
  }

  // Custom InputTypes
  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantCountOutputType
     */
    select?: TenantCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeCountVehiclesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VehicleWhereInput
  }

  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeCountClientsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClientWhereInput
  }

  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeCountRoutesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RouteWhereInput
  }

  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeCountDeliveriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DeliveryWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    routes: number
    refreshTokens: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    routes?: boolean | UserCountOutputTypeCountRoutesArgs
    refreshTokens?: boolean | UserCountOutputTypeCountRefreshTokensArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRoutesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RouteWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRefreshTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RefreshTokenWhereInput
  }


  /**
   * Count Type VehicleCountOutputType
   */

  export type VehicleCountOutputType = {
    routes: number
  }

  export type VehicleCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    routes?: boolean | VehicleCountOutputTypeCountRoutesArgs
  }

  // Custom InputTypes
  /**
   * VehicleCountOutputType without action
   */
  export type VehicleCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleCountOutputType
     */
    select?: VehicleCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * VehicleCountOutputType without action
   */
  export type VehicleCountOutputTypeCountRoutesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RouteWhereInput
  }


  /**
   * Count Type ClientCountOutputType
   */

  export type ClientCountOutputType = {
    deliveries: number
  }

  export type ClientCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    deliveries?: boolean | ClientCountOutputTypeCountDeliveriesArgs
  }

  // Custom InputTypes
  /**
   * ClientCountOutputType without action
   */
  export type ClientCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientCountOutputType
     */
    select?: ClientCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ClientCountOutputType without action
   */
  export type ClientCountOutputTypeCountDeliveriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DeliveryWhereInput
  }


  /**
   * Count Type RouteCountOutputType
   */

  export type RouteCountOutputType = {
    deliveries: number
    locationLogs: number
  }

  export type RouteCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    deliveries?: boolean | RouteCountOutputTypeCountDeliveriesArgs
    locationLogs?: boolean | RouteCountOutputTypeCountLocationLogsArgs
  }

  // Custom InputTypes
  /**
   * RouteCountOutputType without action
   */
  export type RouteCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RouteCountOutputType
     */
    select?: RouteCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RouteCountOutputType without action
   */
  export type RouteCountOutputTypeCountDeliveriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DeliveryWhereInput
  }

  /**
   * RouteCountOutputType without action
   */
  export type RouteCountOutputTypeCountLocationLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LocationLogWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Tenant
   */

  export type AggregateTenant = {
    _count: TenantCountAggregateOutputType | null
    _avg: TenantAvgAggregateOutputType | null
    _sum: TenantSumAggregateOutputType | null
    _min: TenantMinAggregateOutputType | null
    _max: TenantMaxAggregateOutputType | null
  }

  export type TenantAvgAggregateOutputType = {
    latitude: number | null
    longitude: number | null
  }

  export type TenantSumAggregateOutputType = {
    latitude: number | null
    longitude: number | null
  }

  export type TenantMinAggregateOutputType = {
    id: string | null
    name: string | null
    address: string | null
    cep: string | null
    latitude: number | null
    longitude: number | null
    createdAt: Date | null
    updatedAt: Date | null
    trialStartedAt: Date | null
    trialEndsAt: Date | null
    stripeCustomerId: string | null
    subscriptionId: string | null
    subscriptionStatus: string | null
    subscriptionEnd: Date | null
  }

  export type TenantMaxAggregateOutputType = {
    id: string | null
    name: string | null
    address: string | null
    cep: string | null
    latitude: number | null
    longitude: number | null
    createdAt: Date | null
    updatedAt: Date | null
    trialStartedAt: Date | null
    trialEndsAt: Date | null
    stripeCustomerId: string | null
    subscriptionId: string | null
    subscriptionStatus: string | null
    subscriptionEnd: Date | null
  }

  export type TenantCountAggregateOutputType = {
    id: number
    name: number
    address: number
    cep: number
    latitude: number
    longitude: number
    createdAt: number
    updatedAt: number
    trialStartedAt: number
    trialEndsAt: number
    stripeCustomerId: number
    subscriptionId: number
    subscriptionStatus: number
    subscriptionEnd: number
    _all: number
  }


  export type TenantAvgAggregateInputType = {
    latitude?: true
    longitude?: true
  }

  export type TenantSumAggregateInputType = {
    latitude?: true
    longitude?: true
  }

  export type TenantMinAggregateInputType = {
    id?: true
    name?: true
    address?: true
    cep?: true
    latitude?: true
    longitude?: true
    createdAt?: true
    updatedAt?: true
    trialStartedAt?: true
    trialEndsAt?: true
    stripeCustomerId?: true
    subscriptionId?: true
    subscriptionStatus?: true
    subscriptionEnd?: true
  }

  export type TenantMaxAggregateInputType = {
    id?: true
    name?: true
    address?: true
    cep?: true
    latitude?: true
    longitude?: true
    createdAt?: true
    updatedAt?: true
    trialStartedAt?: true
    trialEndsAt?: true
    stripeCustomerId?: true
    subscriptionId?: true
    subscriptionStatus?: true
    subscriptionEnd?: true
  }

  export type TenantCountAggregateInputType = {
    id?: true
    name?: true
    address?: true
    cep?: true
    latitude?: true
    longitude?: true
    createdAt?: true
    updatedAt?: true
    trialStartedAt?: true
    trialEndsAt?: true
    stripeCustomerId?: true
    subscriptionId?: true
    subscriptionStatus?: true
    subscriptionEnd?: true
    _all?: true
  }

  export type TenantAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tenant to aggregate.
     */
    where?: TenantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tenants to fetch.
     */
    orderBy?: TenantOrderByWithRelationInput | TenantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TenantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tenants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tenants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tenants
    **/
    _count?: true | TenantCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TenantAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TenantSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TenantMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TenantMaxAggregateInputType
  }

  export type GetTenantAggregateType<T extends TenantAggregateArgs> = {
        [P in keyof T & keyof AggregateTenant]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTenant[P]>
      : GetScalarType<T[P], AggregateTenant[P]>
  }




  export type TenantGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TenantWhereInput
    orderBy?: TenantOrderByWithAggregationInput | TenantOrderByWithAggregationInput[]
    by: TenantScalarFieldEnum[] | TenantScalarFieldEnum
    having?: TenantScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TenantCountAggregateInputType | true
    _avg?: TenantAvgAggregateInputType
    _sum?: TenantSumAggregateInputType
    _min?: TenantMinAggregateInputType
    _max?: TenantMaxAggregateInputType
  }

  export type TenantGroupByOutputType = {
    id: string
    name: string
    address: string | null
    cep: string | null
    latitude: number | null
    longitude: number | null
    createdAt: Date
    updatedAt: Date
    trialStartedAt: Date | null
    trialEndsAt: Date | null
    stripeCustomerId: string | null
    subscriptionId: string | null
    subscriptionStatus: string
    subscriptionEnd: Date | null
    _count: TenantCountAggregateOutputType | null
    _avg: TenantAvgAggregateOutputType | null
    _sum: TenantSumAggregateOutputType | null
    _min: TenantMinAggregateOutputType | null
    _max: TenantMaxAggregateOutputType | null
  }

  type GetTenantGroupByPayload<T extends TenantGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TenantGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TenantGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TenantGroupByOutputType[P]>
            : GetScalarType<T[P], TenantGroupByOutputType[P]>
        }
      >
    >


  export type TenantSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    address?: boolean
    cep?: boolean
    latitude?: boolean
    longitude?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    trialStartedAt?: boolean
    trialEndsAt?: boolean
    stripeCustomerId?: boolean
    subscriptionId?: boolean
    subscriptionStatus?: boolean
    subscriptionEnd?: boolean
    users?: boolean | Tenant$usersArgs<ExtArgs>
    vehicles?: boolean | Tenant$vehiclesArgs<ExtArgs>
    clients?: boolean | Tenant$clientsArgs<ExtArgs>
    routes?: boolean | Tenant$routesArgs<ExtArgs>
    deliveries?: boolean | Tenant$deliveriesArgs<ExtArgs>
    _count?: boolean | TenantCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tenant"]>

  export type TenantSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    address?: boolean
    cep?: boolean
    latitude?: boolean
    longitude?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    trialStartedAt?: boolean
    trialEndsAt?: boolean
    stripeCustomerId?: boolean
    subscriptionId?: boolean
    subscriptionStatus?: boolean
    subscriptionEnd?: boolean
  }, ExtArgs["result"]["tenant"]>

  export type TenantSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    address?: boolean
    cep?: boolean
    latitude?: boolean
    longitude?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    trialStartedAt?: boolean
    trialEndsAt?: boolean
    stripeCustomerId?: boolean
    subscriptionId?: boolean
    subscriptionStatus?: boolean
    subscriptionEnd?: boolean
  }, ExtArgs["result"]["tenant"]>

  export type TenantSelectScalar = {
    id?: boolean
    name?: boolean
    address?: boolean
    cep?: boolean
    latitude?: boolean
    longitude?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    trialStartedAt?: boolean
    trialEndsAt?: boolean
    stripeCustomerId?: boolean
    subscriptionId?: boolean
    subscriptionStatus?: boolean
    subscriptionEnd?: boolean
  }

  export type TenantOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "address" | "cep" | "latitude" | "longitude" | "createdAt" | "updatedAt" | "trialStartedAt" | "trialEndsAt" | "stripeCustomerId" | "subscriptionId" | "subscriptionStatus" | "subscriptionEnd", ExtArgs["result"]["tenant"]>
  export type TenantInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | Tenant$usersArgs<ExtArgs>
    vehicles?: boolean | Tenant$vehiclesArgs<ExtArgs>
    clients?: boolean | Tenant$clientsArgs<ExtArgs>
    routes?: boolean | Tenant$routesArgs<ExtArgs>
    deliveries?: boolean | Tenant$deliveriesArgs<ExtArgs>
    _count?: boolean | TenantCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TenantIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type TenantIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $TenantPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Tenant"
    objects: {
      users: Prisma.$UserPayload<ExtArgs>[]
      vehicles: Prisma.$VehiclePayload<ExtArgs>[]
      clients: Prisma.$ClientPayload<ExtArgs>[]
      routes: Prisma.$RoutePayload<ExtArgs>[]
      deliveries: Prisma.$DeliveryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      address: string | null
      cep: string | null
      latitude: number | null
      longitude: number | null
      createdAt: Date
      updatedAt: Date
      trialStartedAt: Date | null
      trialEndsAt: Date | null
      stripeCustomerId: string | null
      subscriptionId: string | null
      subscriptionStatus: string
      subscriptionEnd: Date | null
    }, ExtArgs["result"]["tenant"]>
    composites: {}
  }

  type TenantGetPayload<S extends boolean | null | undefined | TenantDefaultArgs> = $Result.GetResult<Prisma.$TenantPayload, S>

  type TenantCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TenantFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TenantCountAggregateInputType | true
    }

  export interface TenantDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Tenant'], meta: { name: 'Tenant' } }
    /**
     * Find zero or one Tenant that matches the filter.
     * @param {TenantFindUniqueArgs} args - Arguments to find a Tenant
     * @example
     * // Get one Tenant
     * const tenant = await prisma.tenant.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TenantFindUniqueArgs>(args: SelectSubset<T, TenantFindUniqueArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tenant that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TenantFindUniqueOrThrowArgs} args - Arguments to find a Tenant
     * @example
     * // Get one Tenant
     * const tenant = await prisma.tenant.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TenantFindUniqueOrThrowArgs>(args: SelectSubset<T, TenantFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tenant that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantFindFirstArgs} args - Arguments to find a Tenant
     * @example
     * // Get one Tenant
     * const tenant = await prisma.tenant.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TenantFindFirstArgs>(args?: SelectSubset<T, TenantFindFirstArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tenant that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantFindFirstOrThrowArgs} args - Arguments to find a Tenant
     * @example
     * // Get one Tenant
     * const tenant = await prisma.tenant.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TenantFindFirstOrThrowArgs>(args?: SelectSubset<T, TenantFindFirstOrThrowArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tenants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tenants
     * const tenants = await prisma.tenant.findMany()
     * 
     * // Get first 10 Tenants
     * const tenants = await prisma.tenant.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tenantWithIdOnly = await prisma.tenant.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TenantFindManyArgs>(args?: SelectSubset<T, TenantFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tenant.
     * @param {TenantCreateArgs} args - Arguments to create a Tenant.
     * @example
     * // Create one Tenant
     * const Tenant = await prisma.tenant.create({
     *   data: {
     *     // ... data to create a Tenant
     *   }
     * })
     * 
     */
    create<T extends TenantCreateArgs>(args: SelectSubset<T, TenantCreateArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tenants.
     * @param {TenantCreateManyArgs} args - Arguments to create many Tenants.
     * @example
     * // Create many Tenants
     * const tenant = await prisma.tenant.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TenantCreateManyArgs>(args?: SelectSubset<T, TenantCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tenants and returns the data saved in the database.
     * @param {TenantCreateManyAndReturnArgs} args - Arguments to create many Tenants.
     * @example
     * // Create many Tenants
     * const tenant = await prisma.tenant.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tenants and only return the `id`
     * const tenantWithIdOnly = await prisma.tenant.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TenantCreateManyAndReturnArgs>(args?: SelectSubset<T, TenantCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Tenant.
     * @param {TenantDeleteArgs} args - Arguments to delete one Tenant.
     * @example
     * // Delete one Tenant
     * const Tenant = await prisma.tenant.delete({
     *   where: {
     *     // ... filter to delete one Tenant
     *   }
     * })
     * 
     */
    delete<T extends TenantDeleteArgs>(args: SelectSubset<T, TenantDeleteArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tenant.
     * @param {TenantUpdateArgs} args - Arguments to update one Tenant.
     * @example
     * // Update one Tenant
     * const tenant = await prisma.tenant.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TenantUpdateArgs>(args: SelectSubset<T, TenantUpdateArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tenants.
     * @param {TenantDeleteManyArgs} args - Arguments to filter Tenants to delete.
     * @example
     * // Delete a few Tenants
     * const { count } = await prisma.tenant.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TenantDeleteManyArgs>(args?: SelectSubset<T, TenantDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tenants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tenants
     * const tenant = await prisma.tenant.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TenantUpdateManyArgs>(args: SelectSubset<T, TenantUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tenants and returns the data updated in the database.
     * @param {TenantUpdateManyAndReturnArgs} args - Arguments to update many Tenants.
     * @example
     * // Update many Tenants
     * const tenant = await prisma.tenant.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tenants and only return the `id`
     * const tenantWithIdOnly = await prisma.tenant.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TenantUpdateManyAndReturnArgs>(args: SelectSubset<T, TenantUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Tenant.
     * @param {TenantUpsertArgs} args - Arguments to update or create a Tenant.
     * @example
     * // Update or create a Tenant
     * const tenant = await prisma.tenant.upsert({
     *   create: {
     *     // ... data to create a Tenant
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tenant we want to update
     *   }
     * })
     */
    upsert<T extends TenantUpsertArgs>(args: SelectSubset<T, TenantUpsertArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tenants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantCountArgs} args - Arguments to filter Tenants to count.
     * @example
     * // Count the number of Tenants
     * const count = await prisma.tenant.count({
     *   where: {
     *     // ... the filter for the Tenants we want to count
     *   }
     * })
    **/
    count<T extends TenantCountArgs>(
      args?: Subset<T, TenantCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TenantCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tenant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TenantAggregateArgs>(args: Subset<T, TenantAggregateArgs>): Prisma.PrismaPromise<GetTenantAggregateType<T>>

    /**
     * Group by Tenant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TenantGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TenantGroupByArgs['orderBy'] }
        : { orderBy?: TenantGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TenantGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTenantGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Tenant model
   */
  readonly fields: TenantFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Tenant.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TenantClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends Tenant$usersArgs<ExtArgs> = {}>(args?: Subset<T, Tenant$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    vehicles<T extends Tenant$vehiclesArgs<ExtArgs> = {}>(args?: Subset<T, Tenant$vehiclesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    clients<T extends Tenant$clientsArgs<ExtArgs> = {}>(args?: Subset<T, Tenant$clientsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    routes<T extends Tenant$routesArgs<ExtArgs> = {}>(args?: Subset<T, Tenant$routesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    deliveries<T extends Tenant$deliveriesArgs<ExtArgs> = {}>(args?: Subset<T, Tenant$deliveriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeliveryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Tenant model
   */
  interface TenantFieldRefs {
    readonly id: FieldRef<"Tenant", 'String'>
    readonly name: FieldRef<"Tenant", 'String'>
    readonly address: FieldRef<"Tenant", 'String'>
    readonly cep: FieldRef<"Tenant", 'String'>
    readonly latitude: FieldRef<"Tenant", 'Float'>
    readonly longitude: FieldRef<"Tenant", 'Float'>
    readonly createdAt: FieldRef<"Tenant", 'DateTime'>
    readonly updatedAt: FieldRef<"Tenant", 'DateTime'>
    readonly trialStartedAt: FieldRef<"Tenant", 'DateTime'>
    readonly trialEndsAt: FieldRef<"Tenant", 'DateTime'>
    readonly stripeCustomerId: FieldRef<"Tenant", 'String'>
    readonly subscriptionId: FieldRef<"Tenant", 'String'>
    readonly subscriptionStatus: FieldRef<"Tenant", 'String'>
    readonly subscriptionEnd: FieldRef<"Tenant", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Tenant findUnique
   */
  export type TenantFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter, which Tenant to fetch.
     */
    where: TenantWhereUniqueInput
  }

  /**
   * Tenant findUniqueOrThrow
   */
  export type TenantFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter, which Tenant to fetch.
     */
    where: TenantWhereUniqueInput
  }

  /**
   * Tenant findFirst
   */
  export type TenantFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter, which Tenant to fetch.
     */
    where?: TenantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tenants to fetch.
     */
    orderBy?: TenantOrderByWithRelationInput | TenantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tenants.
     */
    cursor?: TenantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tenants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tenants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tenants.
     */
    distinct?: TenantScalarFieldEnum | TenantScalarFieldEnum[]
  }

  /**
   * Tenant findFirstOrThrow
   */
  export type TenantFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter, which Tenant to fetch.
     */
    where?: TenantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tenants to fetch.
     */
    orderBy?: TenantOrderByWithRelationInput | TenantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tenants.
     */
    cursor?: TenantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tenants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tenants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tenants.
     */
    distinct?: TenantScalarFieldEnum | TenantScalarFieldEnum[]
  }

  /**
   * Tenant findMany
   */
  export type TenantFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter, which Tenants to fetch.
     */
    where?: TenantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tenants to fetch.
     */
    orderBy?: TenantOrderByWithRelationInput | TenantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tenants.
     */
    cursor?: TenantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tenants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tenants.
     */
    skip?: number
    distinct?: TenantScalarFieldEnum | TenantScalarFieldEnum[]
  }

  /**
   * Tenant create
   */
  export type TenantCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * The data needed to create a Tenant.
     */
    data: XOR<TenantCreateInput, TenantUncheckedCreateInput>
  }

  /**
   * Tenant createMany
   */
  export type TenantCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tenants.
     */
    data: TenantCreateManyInput | TenantCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tenant createManyAndReturn
   */
  export type TenantCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * The data used to create many Tenants.
     */
    data: TenantCreateManyInput | TenantCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tenant update
   */
  export type TenantUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * The data needed to update a Tenant.
     */
    data: XOR<TenantUpdateInput, TenantUncheckedUpdateInput>
    /**
     * Choose, which Tenant to update.
     */
    where: TenantWhereUniqueInput
  }

  /**
   * Tenant updateMany
   */
  export type TenantUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tenants.
     */
    data: XOR<TenantUpdateManyMutationInput, TenantUncheckedUpdateManyInput>
    /**
     * Filter which Tenants to update
     */
    where?: TenantWhereInput
    /**
     * Limit how many Tenants to update.
     */
    limit?: number
  }

  /**
   * Tenant updateManyAndReturn
   */
  export type TenantUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * The data used to update Tenants.
     */
    data: XOR<TenantUpdateManyMutationInput, TenantUncheckedUpdateManyInput>
    /**
     * Filter which Tenants to update
     */
    where?: TenantWhereInput
    /**
     * Limit how many Tenants to update.
     */
    limit?: number
  }

  /**
   * Tenant upsert
   */
  export type TenantUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * The filter to search for the Tenant to update in case it exists.
     */
    where: TenantWhereUniqueInput
    /**
     * In case the Tenant found by the `where` argument doesn't exist, create a new Tenant with this data.
     */
    create: XOR<TenantCreateInput, TenantUncheckedCreateInput>
    /**
     * In case the Tenant was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TenantUpdateInput, TenantUncheckedUpdateInput>
  }

  /**
   * Tenant delete
   */
  export type TenantDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter which Tenant to delete.
     */
    where: TenantWhereUniqueInput
  }

  /**
   * Tenant deleteMany
   */
  export type TenantDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tenants to delete
     */
    where?: TenantWhereInput
    /**
     * Limit how many Tenants to delete.
     */
    limit?: number
  }

  /**
   * Tenant.users
   */
  export type Tenant$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Tenant.vehicles
   */
  export type Tenant$vehiclesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    where?: VehicleWhereInput
    orderBy?: VehicleOrderByWithRelationInput | VehicleOrderByWithRelationInput[]
    cursor?: VehicleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VehicleScalarFieldEnum | VehicleScalarFieldEnum[]
  }

  /**
   * Tenant.clients
   */
  export type Tenant$clientsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    where?: ClientWhereInput
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    cursor?: ClientWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[]
  }

  /**
   * Tenant.routes
   */
  export type Tenant$routesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: RouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Route
     */
    omit?: RouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteInclude<ExtArgs> | null
    where?: RouteWhereInput
    orderBy?: RouteOrderByWithRelationInput | RouteOrderByWithRelationInput[]
    cursor?: RouteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RouteScalarFieldEnum | RouteScalarFieldEnum[]
  }

  /**
   * Tenant.deliveries
   */
  export type Tenant$deliveriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delivery
     */
    select?: DeliverySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Delivery
     */
    omit?: DeliveryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliveryInclude<ExtArgs> | null
    where?: DeliveryWhereInput
    orderBy?: DeliveryOrderByWithRelationInput | DeliveryOrderByWithRelationInput[]
    cursor?: DeliveryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DeliveryScalarFieldEnum | DeliveryScalarFieldEnum[]
  }

  /**
   * Tenant without action
   */
  export type TenantDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    name: string | null
    avatarUrl: string | null
    role: string | null
    status: string | null
    tenantId: string | null
    resetPasswordToken: string | null
    resetPasswordExp: Date | null
    mustChangePassword: boolean | null
    resetRequested: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    name: string | null
    avatarUrl: string | null
    role: string | null
    status: string | null
    tenantId: string | null
    resetPasswordToken: string | null
    resetPasswordExp: Date | null
    mustChangePassword: boolean | null
    resetRequested: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    name: number
    avatarUrl: number
    role: number
    status: number
    tenantId: number
    resetPasswordToken: number
    resetPasswordExp: number
    mustChangePassword: number
    resetRequested: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    avatarUrl?: true
    role?: true
    status?: true
    tenantId?: true
    resetPasswordToken?: true
    resetPasswordExp?: true
    mustChangePassword?: true
    resetRequested?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    avatarUrl?: true
    role?: true
    status?: true
    tenantId?: true
    resetPasswordToken?: true
    resetPasswordExp?: true
    mustChangePassword?: true
    resetRequested?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    avatarUrl?: true
    role?: true
    status?: true
    tenantId?: true
    resetPasswordToken?: true
    resetPasswordExp?: true
    mustChangePassword?: true
    resetRequested?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    password: string
    name: string
    avatarUrl: string | null
    role: string
    status: string
    tenantId: string
    resetPasswordToken: string | null
    resetPasswordExp: Date | null
    mustChangePassword: boolean
    resetRequested: boolean
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    avatarUrl?: boolean
    role?: boolean
    status?: boolean
    tenantId?: boolean
    resetPasswordToken?: boolean
    resetPasswordExp?: boolean
    mustChangePassword?: boolean
    resetRequested?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    routes?: boolean | User$routesArgs<ExtArgs>
    refreshTokens?: boolean | User$refreshTokensArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    avatarUrl?: boolean
    role?: boolean
    status?: boolean
    tenantId?: boolean
    resetPasswordToken?: boolean
    resetPasswordExp?: boolean
    mustChangePassword?: boolean
    resetRequested?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    avatarUrl?: boolean
    role?: boolean
    status?: boolean
    tenantId?: boolean
    resetPasswordToken?: boolean
    resetPasswordExp?: boolean
    mustChangePassword?: boolean
    resetRequested?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    avatarUrl?: boolean
    role?: boolean
    status?: boolean
    tenantId?: boolean
    resetPasswordToken?: boolean
    resetPasswordExp?: boolean
    mustChangePassword?: boolean
    resetRequested?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "name" | "avatarUrl" | "role" | "status" | "tenantId" | "resetPasswordToken" | "resetPasswordExp" | "mustChangePassword" | "resetRequested" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    routes?: boolean | User$routesArgs<ExtArgs>
    refreshTokens?: boolean | User$refreshTokensArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      tenant: Prisma.$TenantPayload<ExtArgs>
      routes: Prisma.$RoutePayload<ExtArgs>[]
      refreshTokens: Prisma.$RefreshTokenPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string
      name: string
      avatarUrl: string | null
      role: string
      status: string
      tenantId: string
      resetPasswordToken: string | null
      resetPasswordExp: Date | null
      mustChangePassword: boolean
      resetRequested: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tenant<T extends TenantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TenantDefaultArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    routes<T extends User$routesArgs<ExtArgs> = {}>(args?: Subset<T, User$routesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    refreshTokens<T extends User$refreshTokensArgs<ExtArgs> = {}>(args?: Subset<T, User$refreshTokensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly avatarUrl: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly status: FieldRef<"User", 'String'>
    readonly tenantId: FieldRef<"User", 'String'>
    readonly resetPasswordToken: FieldRef<"User", 'String'>
    readonly resetPasswordExp: FieldRef<"User", 'DateTime'>
    readonly mustChangePassword: FieldRef<"User", 'Boolean'>
    readonly resetRequested: FieldRef<"User", 'Boolean'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.routes
   */
  export type User$routesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: RouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Route
     */
    omit?: RouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteInclude<ExtArgs> | null
    where?: RouteWhereInput
    orderBy?: RouteOrderByWithRelationInput | RouteOrderByWithRelationInput[]
    cursor?: RouteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RouteScalarFieldEnum | RouteScalarFieldEnum[]
  }

  /**
   * User.refreshTokens
   */
  export type User$refreshTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    where?: RefreshTokenWhereInput
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    cursor?: RefreshTokenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model RefreshToken
   */

  export type AggregateRefreshToken = {
    _count: RefreshTokenCountAggregateOutputType | null
    _min: RefreshTokenMinAggregateOutputType | null
    _max: RefreshTokenMaxAggregateOutputType | null
  }

  export type RefreshTokenMinAggregateOutputType = {
    id: string | null
    token: string | null
    userId: string | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type RefreshTokenMaxAggregateOutputType = {
    id: string | null
    token: string | null
    userId: string | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type RefreshTokenCountAggregateOutputType = {
    id: number
    token: number
    userId: number
    expiresAt: number
    createdAt: number
    _all: number
  }


  export type RefreshTokenMinAggregateInputType = {
    id?: true
    token?: true
    userId?: true
    expiresAt?: true
    createdAt?: true
  }

  export type RefreshTokenMaxAggregateInputType = {
    id?: true
    token?: true
    userId?: true
    expiresAt?: true
    createdAt?: true
  }

  export type RefreshTokenCountAggregateInputType = {
    id?: true
    token?: true
    userId?: true
    expiresAt?: true
    createdAt?: true
    _all?: true
  }

  export type RefreshTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RefreshToken to aggregate.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RefreshTokens
    **/
    _count?: true | RefreshTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RefreshTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RefreshTokenMaxAggregateInputType
  }

  export type GetRefreshTokenAggregateType<T extends RefreshTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateRefreshToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRefreshToken[P]>
      : GetScalarType<T[P], AggregateRefreshToken[P]>
  }




  export type RefreshTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RefreshTokenWhereInput
    orderBy?: RefreshTokenOrderByWithAggregationInput | RefreshTokenOrderByWithAggregationInput[]
    by: RefreshTokenScalarFieldEnum[] | RefreshTokenScalarFieldEnum
    having?: RefreshTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RefreshTokenCountAggregateInputType | true
    _min?: RefreshTokenMinAggregateInputType
    _max?: RefreshTokenMaxAggregateInputType
  }

  export type RefreshTokenGroupByOutputType = {
    id: string
    token: string
    userId: string
    expiresAt: Date
    createdAt: Date
    _count: RefreshTokenCountAggregateOutputType | null
    _min: RefreshTokenMinAggregateOutputType | null
    _max: RefreshTokenMaxAggregateOutputType | null
  }

  type GetRefreshTokenGroupByPayload<T extends RefreshTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RefreshTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RefreshTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RefreshTokenGroupByOutputType[P]>
            : GetScalarType<T[P], RefreshTokenGroupByOutputType[P]>
        }
      >
    >


  export type RefreshTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    userId?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refreshToken"]>

  export type RefreshTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    userId?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refreshToken"]>

  export type RefreshTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    userId?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refreshToken"]>

  export type RefreshTokenSelectScalar = {
    id?: boolean
    token?: boolean
    userId?: boolean
    expiresAt?: boolean
    createdAt?: boolean
  }

  export type RefreshTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "token" | "userId" | "expiresAt" | "createdAt", ExtArgs["result"]["refreshToken"]>
  export type RefreshTokenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RefreshTokenIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RefreshTokenIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $RefreshTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RefreshToken"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      token: string
      userId: string
      expiresAt: Date
      createdAt: Date
    }, ExtArgs["result"]["refreshToken"]>
    composites: {}
  }

  type RefreshTokenGetPayload<S extends boolean | null | undefined | RefreshTokenDefaultArgs> = $Result.GetResult<Prisma.$RefreshTokenPayload, S>

  type RefreshTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RefreshTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RefreshTokenCountAggregateInputType | true
    }

  export interface RefreshTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RefreshToken'], meta: { name: 'RefreshToken' } }
    /**
     * Find zero or one RefreshToken that matches the filter.
     * @param {RefreshTokenFindUniqueArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RefreshTokenFindUniqueArgs>(args: SelectSubset<T, RefreshTokenFindUniqueArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RefreshToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RefreshTokenFindUniqueOrThrowArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RefreshTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, RefreshTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RefreshToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindFirstArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RefreshTokenFindFirstArgs>(args?: SelectSubset<T, RefreshTokenFindFirstArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RefreshToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindFirstOrThrowArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RefreshTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, RefreshTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RefreshTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RefreshTokens
     * const refreshTokens = await prisma.refreshToken.findMany()
     * 
     * // Get first 10 RefreshTokens
     * const refreshTokens = await prisma.refreshToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const refreshTokenWithIdOnly = await prisma.refreshToken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RefreshTokenFindManyArgs>(args?: SelectSubset<T, RefreshTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RefreshToken.
     * @param {RefreshTokenCreateArgs} args - Arguments to create a RefreshToken.
     * @example
     * // Create one RefreshToken
     * const RefreshToken = await prisma.refreshToken.create({
     *   data: {
     *     // ... data to create a RefreshToken
     *   }
     * })
     * 
     */
    create<T extends RefreshTokenCreateArgs>(args: SelectSubset<T, RefreshTokenCreateArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RefreshTokens.
     * @param {RefreshTokenCreateManyArgs} args - Arguments to create many RefreshTokens.
     * @example
     * // Create many RefreshTokens
     * const refreshToken = await prisma.refreshToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RefreshTokenCreateManyArgs>(args?: SelectSubset<T, RefreshTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RefreshTokens and returns the data saved in the database.
     * @param {RefreshTokenCreateManyAndReturnArgs} args - Arguments to create many RefreshTokens.
     * @example
     * // Create many RefreshTokens
     * const refreshToken = await prisma.refreshToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RefreshTokens and only return the `id`
     * const refreshTokenWithIdOnly = await prisma.refreshToken.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RefreshTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, RefreshTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RefreshToken.
     * @param {RefreshTokenDeleteArgs} args - Arguments to delete one RefreshToken.
     * @example
     * // Delete one RefreshToken
     * const RefreshToken = await prisma.refreshToken.delete({
     *   where: {
     *     // ... filter to delete one RefreshToken
     *   }
     * })
     * 
     */
    delete<T extends RefreshTokenDeleteArgs>(args: SelectSubset<T, RefreshTokenDeleteArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RefreshToken.
     * @param {RefreshTokenUpdateArgs} args - Arguments to update one RefreshToken.
     * @example
     * // Update one RefreshToken
     * const refreshToken = await prisma.refreshToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RefreshTokenUpdateArgs>(args: SelectSubset<T, RefreshTokenUpdateArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RefreshTokens.
     * @param {RefreshTokenDeleteManyArgs} args - Arguments to filter RefreshTokens to delete.
     * @example
     * // Delete a few RefreshTokens
     * const { count } = await prisma.refreshToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RefreshTokenDeleteManyArgs>(args?: SelectSubset<T, RefreshTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RefreshTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RefreshTokens
     * const refreshToken = await prisma.refreshToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RefreshTokenUpdateManyArgs>(args: SelectSubset<T, RefreshTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RefreshTokens and returns the data updated in the database.
     * @param {RefreshTokenUpdateManyAndReturnArgs} args - Arguments to update many RefreshTokens.
     * @example
     * // Update many RefreshTokens
     * const refreshToken = await prisma.refreshToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RefreshTokens and only return the `id`
     * const refreshTokenWithIdOnly = await prisma.refreshToken.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RefreshTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, RefreshTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RefreshToken.
     * @param {RefreshTokenUpsertArgs} args - Arguments to update or create a RefreshToken.
     * @example
     * // Update or create a RefreshToken
     * const refreshToken = await prisma.refreshToken.upsert({
     *   create: {
     *     // ... data to create a RefreshToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RefreshToken we want to update
     *   }
     * })
     */
    upsert<T extends RefreshTokenUpsertArgs>(args: SelectSubset<T, RefreshTokenUpsertArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RefreshTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenCountArgs} args - Arguments to filter RefreshTokens to count.
     * @example
     * // Count the number of RefreshTokens
     * const count = await prisma.refreshToken.count({
     *   where: {
     *     // ... the filter for the RefreshTokens we want to count
     *   }
     * })
    **/
    count<T extends RefreshTokenCountArgs>(
      args?: Subset<T, RefreshTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RefreshTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RefreshToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RefreshTokenAggregateArgs>(args: Subset<T, RefreshTokenAggregateArgs>): Prisma.PrismaPromise<GetRefreshTokenAggregateType<T>>

    /**
     * Group by RefreshToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RefreshTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RefreshTokenGroupByArgs['orderBy'] }
        : { orderBy?: RefreshTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RefreshTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRefreshTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RefreshToken model
   */
  readonly fields: RefreshTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RefreshToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RefreshTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RefreshToken model
   */
  interface RefreshTokenFieldRefs {
    readonly id: FieldRef<"RefreshToken", 'String'>
    readonly token: FieldRef<"RefreshToken", 'String'>
    readonly userId: FieldRef<"RefreshToken", 'String'>
    readonly expiresAt: FieldRef<"RefreshToken", 'DateTime'>
    readonly createdAt: FieldRef<"RefreshToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RefreshToken findUnique
   */
  export type RefreshTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken findUniqueOrThrow
   */
  export type RefreshTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken findFirst
   */
  export type RefreshTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RefreshTokens.
     */
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * RefreshToken findFirstOrThrow
   */
  export type RefreshTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RefreshTokens.
     */
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * RefreshToken findMany
   */
  export type RefreshTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshTokens to fetch.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * RefreshToken create
   */
  export type RefreshTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * The data needed to create a RefreshToken.
     */
    data: XOR<RefreshTokenCreateInput, RefreshTokenUncheckedCreateInput>
  }

  /**
   * RefreshToken createMany
   */
  export type RefreshTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RefreshTokens.
     */
    data: RefreshTokenCreateManyInput | RefreshTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RefreshToken createManyAndReturn
   */
  export type RefreshTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * The data used to create many RefreshTokens.
     */
    data: RefreshTokenCreateManyInput | RefreshTokenCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RefreshToken update
   */
  export type RefreshTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * The data needed to update a RefreshToken.
     */
    data: XOR<RefreshTokenUpdateInput, RefreshTokenUncheckedUpdateInput>
    /**
     * Choose, which RefreshToken to update.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken updateMany
   */
  export type RefreshTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RefreshTokens.
     */
    data: XOR<RefreshTokenUpdateManyMutationInput, RefreshTokenUncheckedUpdateManyInput>
    /**
     * Filter which RefreshTokens to update
     */
    where?: RefreshTokenWhereInput
    /**
     * Limit how many RefreshTokens to update.
     */
    limit?: number
  }

  /**
   * RefreshToken updateManyAndReturn
   */
  export type RefreshTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * The data used to update RefreshTokens.
     */
    data: XOR<RefreshTokenUpdateManyMutationInput, RefreshTokenUncheckedUpdateManyInput>
    /**
     * Filter which RefreshTokens to update
     */
    where?: RefreshTokenWhereInput
    /**
     * Limit how many RefreshTokens to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RefreshToken upsert
   */
  export type RefreshTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * The filter to search for the RefreshToken to update in case it exists.
     */
    where: RefreshTokenWhereUniqueInput
    /**
     * In case the RefreshToken found by the `where` argument doesn't exist, create a new RefreshToken with this data.
     */
    create: XOR<RefreshTokenCreateInput, RefreshTokenUncheckedCreateInput>
    /**
     * In case the RefreshToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RefreshTokenUpdateInput, RefreshTokenUncheckedUpdateInput>
  }

  /**
   * RefreshToken delete
   */
  export type RefreshTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter which RefreshToken to delete.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken deleteMany
   */
  export type RefreshTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RefreshTokens to delete
     */
    where?: RefreshTokenWhereInput
    /**
     * Limit how many RefreshTokens to delete.
     */
    limit?: number
  }

  /**
   * RefreshToken without action
   */
  export type RefreshTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
  }


  /**
   * Model Vehicle
   */

  export type AggregateVehicle = {
    _count: VehicleCountAggregateOutputType | null
    _avg: VehicleAvgAggregateOutputType | null
    _sum: VehicleSumAggregateOutputType | null
    _min: VehicleMinAggregateOutputType | null
    _max: VehicleMaxAggregateOutputType | null
  }

  export type VehicleAvgAggregateOutputType = {
    consumption: number | null
  }

  export type VehicleSumAggregateOutputType = {
    consumption: number | null
  }

  export type VehicleMinAggregateOutputType = {
    id: string | null
    plate: string | null
    model: string | null
    consumption: number | null
    tenantId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VehicleMaxAggregateOutputType = {
    id: string | null
    plate: string | null
    model: string | null
    consumption: number | null
    tenantId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VehicleCountAggregateOutputType = {
    id: number
    plate: number
    model: number
    consumption: number
    tenantId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type VehicleAvgAggregateInputType = {
    consumption?: true
  }

  export type VehicleSumAggregateInputType = {
    consumption?: true
  }

  export type VehicleMinAggregateInputType = {
    id?: true
    plate?: true
    model?: true
    consumption?: true
    tenantId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VehicleMaxAggregateInputType = {
    id?: true
    plate?: true
    model?: true
    consumption?: true
    tenantId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VehicleCountAggregateInputType = {
    id?: true
    plate?: true
    model?: true
    consumption?: true
    tenantId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type VehicleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vehicle to aggregate.
     */
    where?: VehicleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vehicles to fetch.
     */
    orderBy?: VehicleOrderByWithRelationInput | VehicleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VehicleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vehicles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vehicles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Vehicles
    **/
    _count?: true | VehicleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VehicleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VehicleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VehicleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VehicleMaxAggregateInputType
  }

  export type GetVehicleAggregateType<T extends VehicleAggregateArgs> = {
        [P in keyof T & keyof AggregateVehicle]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVehicle[P]>
      : GetScalarType<T[P], AggregateVehicle[P]>
  }




  export type VehicleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VehicleWhereInput
    orderBy?: VehicleOrderByWithAggregationInput | VehicleOrderByWithAggregationInput[]
    by: VehicleScalarFieldEnum[] | VehicleScalarFieldEnum
    having?: VehicleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VehicleCountAggregateInputType | true
    _avg?: VehicleAvgAggregateInputType
    _sum?: VehicleSumAggregateInputType
    _min?: VehicleMinAggregateInputType
    _max?: VehicleMaxAggregateInputType
  }

  export type VehicleGroupByOutputType = {
    id: string
    plate: string
    model: string
    consumption: number
    tenantId: string
    createdAt: Date
    updatedAt: Date
    _count: VehicleCountAggregateOutputType | null
    _avg: VehicleAvgAggregateOutputType | null
    _sum: VehicleSumAggregateOutputType | null
    _min: VehicleMinAggregateOutputType | null
    _max: VehicleMaxAggregateOutputType | null
  }

  type GetVehicleGroupByPayload<T extends VehicleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VehicleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VehicleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VehicleGroupByOutputType[P]>
            : GetScalarType<T[P], VehicleGroupByOutputType[P]>
        }
      >
    >


  export type VehicleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    plate?: boolean
    model?: boolean
    consumption?: boolean
    tenantId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    routes?: boolean | Vehicle$routesArgs<ExtArgs>
    _count?: boolean | VehicleCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vehicle"]>

  export type VehicleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    plate?: boolean
    model?: boolean
    consumption?: boolean
    tenantId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vehicle"]>

  export type VehicleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    plate?: boolean
    model?: boolean
    consumption?: boolean
    tenantId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vehicle"]>

  export type VehicleSelectScalar = {
    id?: boolean
    plate?: boolean
    model?: boolean
    consumption?: boolean
    tenantId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type VehicleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "plate" | "model" | "consumption" | "tenantId" | "createdAt" | "updatedAt", ExtArgs["result"]["vehicle"]>
  export type VehicleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    routes?: boolean | Vehicle$routesArgs<ExtArgs>
    _count?: boolean | VehicleCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type VehicleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }
  export type VehicleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }

  export type $VehiclePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Vehicle"
    objects: {
      tenant: Prisma.$TenantPayload<ExtArgs>
      routes: Prisma.$RoutePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      plate: string
      model: string
      consumption: number
      tenantId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["vehicle"]>
    composites: {}
  }

  type VehicleGetPayload<S extends boolean | null | undefined | VehicleDefaultArgs> = $Result.GetResult<Prisma.$VehiclePayload, S>

  type VehicleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VehicleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VehicleCountAggregateInputType | true
    }

  export interface VehicleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Vehicle'], meta: { name: 'Vehicle' } }
    /**
     * Find zero or one Vehicle that matches the filter.
     * @param {VehicleFindUniqueArgs} args - Arguments to find a Vehicle
     * @example
     * // Get one Vehicle
     * const vehicle = await prisma.vehicle.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VehicleFindUniqueArgs>(args: SelectSubset<T, VehicleFindUniqueArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Vehicle that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VehicleFindUniqueOrThrowArgs} args - Arguments to find a Vehicle
     * @example
     * // Get one Vehicle
     * const vehicle = await prisma.vehicle.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VehicleFindUniqueOrThrowArgs>(args: SelectSubset<T, VehicleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Vehicle that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleFindFirstArgs} args - Arguments to find a Vehicle
     * @example
     * // Get one Vehicle
     * const vehicle = await prisma.vehicle.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VehicleFindFirstArgs>(args?: SelectSubset<T, VehicleFindFirstArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Vehicle that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleFindFirstOrThrowArgs} args - Arguments to find a Vehicle
     * @example
     * // Get one Vehicle
     * const vehicle = await prisma.vehicle.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VehicleFindFirstOrThrowArgs>(args?: SelectSubset<T, VehicleFindFirstOrThrowArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Vehicles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Vehicles
     * const vehicles = await prisma.vehicle.findMany()
     * 
     * // Get first 10 Vehicles
     * const vehicles = await prisma.vehicle.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const vehicleWithIdOnly = await prisma.vehicle.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VehicleFindManyArgs>(args?: SelectSubset<T, VehicleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Vehicle.
     * @param {VehicleCreateArgs} args - Arguments to create a Vehicle.
     * @example
     * // Create one Vehicle
     * const Vehicle = await prisma.vehicle.create({
     *   data: {
     *     // ... data to create a Vehicle
     *   }
     * })
     * 
     */
    create<T extends VehicleCreateArgs>(args: SelectSubset<T, VehicleCreateArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Vehicles.
     * @param {VehicleCreateManyArgs} args - Arguments to create many Vehicles.
     * @example
     * // Create many Vehicles
     * const vehicle = await prisma.vehicle.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VehicleCreateManyArgs>(args?: SelectSubset<T, VehicleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Vehicles and returns the data saved in the database.
     * @param {VehicleCreateManyAndReturnArgs} args - Arguments to create many Vehicles.
     * @example
     * // Create many Vehicles
     * const vehicle = await prisma.vehicle.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Vehicles and only return the `id`
     * const vehicleWithIdOnly = await prisma.vehicle.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VehicleCreateManyAndReturnArgs>(args?: SelectSubset<T, VehicleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Vehicle.
     * @param {VehicleDeleteArgs} args - Arguments to delete one Vehicle.
     * @example
     * // Delete one Vehicle
     * const Vehicle = await prisma.vehicle.delete({
     *   where: {
     *     // ... filter to delete one Vehicle
     *   }
     * })
     * 
     */
    delete<T extends VehicleDeleteArgs>(args: SelectSubset<T, VehicleDeleteArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Vehicle.
     * @param {VehicleUpdateArgs} args - Arguments to update one Vehicle.
     * @example
     * // Update one Vehicle
     * const vehicle = await prisma.vehicle.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VehicleUpdateArgs>(args: SelectSubset<T, VehicleUpdateArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Vehicles.
     * @param {VehicleDeleteManyArgs} args - Arguments to filter Vehicles to delete.
     * @example
     * // Delete a few Vehicles
     * const { count } = await prisma.vehicle.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VehicleDeleteManyArgs>(args?: SelectSubset<T, VehicleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Vehicles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Vehicles
     * const vehicle = await prisma.vehicle.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VehicleUpdateManyArgs>(args: SelectSubset<T, VehicleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Vehicles and returns the data updated in the database.
     * @param {VehicleUpdateManyAndReturnArgs} args - Arguments to update many Vehicles.
     * @example
     * // Update many Vehicles
     * const vehicle = await prisma.vehicle.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Vehicles and only return the `id`
     * const vehicleWithIdOnly = await prisma.vehicle.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VehicleUpdateManyAndReturnArgs>(args: SelectSubset<T, VehicleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Vehicle.
     * @param {VehicleUpsertArgs} args - Arguments to update or create a Vehicle.
     * @example
     * // Update or create a Vehicle
     * const vehicle = await prisma.vehicle.upsert({
     *   create: {
     *     // ... data to create a Vehicle
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Vehicle we want to update
     *   }
     * })
     */
    upsert<T extends VehicleUpsertArgs>(args: SelectSubset<T, VehicleUpsertArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Vehicles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleCountArgs} args - Arguments to filter Vehicles to count.
     * @example
     * // Count the number of Vehicles
     * const count = await prisma.vehicle.count({
     *   where: {
     *     // ... the filter for the Vehicles we want to count
     *   }
     * })
    **/
    count<T extends VehicleCountArgs>(
      args?: Subset<T, VehicleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VehicleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Vehicle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VehicleAggregateArgs>(args: Subset<T, VehicleAggregateArgs>): Prisma.PrismaPromise<GetVehicleAggregateType<T>>

    /**
     * Group by Vehicle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VehicleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VehicleGroupByArgs['orderBy'] }
        : { orderBy?: VehicleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VehicleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVehicleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Vehicle model
   */
  readonly fields: VehicleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Vehicle.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VehicleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tenant<T extends TenantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TenantDefaultArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    routes<T extends Vehicle$routesArgs<ExtArgs> = {}>(args?: Subset<T, Vehicle$routesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Vehicle model
   */
  interface VehicleFieldRefs {
    readonly id: FieldRef<"Vehicle", 'String'>
    readonly plate: FieldRef<"Vehicle", 'String'>
    readonly model: FieldRef<"Vehicle", 'String'>
    readonly consumption: FieldRef<"Vehicle", 'Float'>
    readonly tenantId: FieldRef<"Vehicle", 'String'>
    readonly createdAt: FieldRef<"Vehicle", 'DateTime'>
    readonly updatedAt: FieldRef<"Vehicle", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Vehicle findUnique
   */
  export type VehicleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter, which Vehicle to fetch.
     */
    where: VehicleWhereUniqueInput
  }

  /**
   * Vehicle findUniqueOrThrow
   */
  export type VehicleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter, which Vehicle to fetch.
     */
    where: VehicleWhereUniqueInput
  }

  /**
   * Vehicle findFirst
   */
  export type VehicleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter, which Vehicle to fetch.
     */
    where?: VehicleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vehicles to fetch.
     */
    orderBy?: VehicleOrderByWithRelationInput | VehicleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Vehicles.
     */
    cursor?: VehicleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vehicles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vehicles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vehicles.
     */
    distinct?: VehicleScalarFieldEnum | VehicleScalarFieldEnum[]
  }

  /**
   * Vehicle findFirstOrThrow
   */
  export type VehicleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter, which Vehicle to fetch.
     */
    where?: VehicleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vehicles to fetch.
     */
    orderBy?: VehicleOrderByWithRelationInput | VehicleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Vehicles.
     */
    cursor?: VehicleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vehicles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vehicles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vehicles.
     */
    distinct?: VehicleScalarFieldEnum | VehicleScalarFieldEnum[]
  }

  /**
   * Vehicle findMany
   */
  export type VehicleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter, which Vehicles to fetch.
     */
    where?: VehicleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vehicles to fetch.
     */
    orderBy?: VehicleOrderByWithRelationInput | VehicleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Vehicles.
     */
    cursor?: VehicleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vehicles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vehicles.
     */
    skip?: number
    distinct?: VehicleScalarFieldEnum | VehicleScalarFieldEnum[]
  }

  /**
   * Vehicle create
   */
  export type VehicleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * The data needed to create a Vehicle.
     */
    data: XOR<VehicleCreateInput, VehicleUncheckedCreateInput>
  }

  /**
   * Vehicle createMany
   */
  export type VehicleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Vehicles.
     */
    data: VehicleCreateManyInput | VehicleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Vehicle createManyAndReturn
   */
  export type VehicleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * The data used to create many Vehicles.
     */
    data: VehicleCreateManyInput | VehicleCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Vehicle update
   */
  export type VehicleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * The data needed to update a Vehicle.
     */
    data: XOR<VehicleUpdateInput, VehicleUncheckedUpdateInput>
    /**
     * Choose, which Vehicle to update.
     */
    where: VehicleWhereUniqueInput
  }

  /**
   * Vehicle updateMany
   */
  export type VehicleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Vehicles.
     */
    data: XOR<VehicleUpdateManyMutationInput, VehicleUncheckedUpdateManyInput>
    /**
     * Filter which Vehicles to update
     */
    where?: VehicleWhereInput
    /**
     * Limit how many Vehicles to update.
     */
    limit?: number
  }

  /**
   * Vehicle updateManyAndReturn
   */
  export type VehicleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * The data used to update Vehicles.
     */
    data: XOR<VehicleUpdateManyMutationInput, VehicleUncheckedUpdateManyInput>
    /**
     * Filter which Vehicles to update
     */
    where?: VehicleWhereInput
    /**
     * Limit how many Vehicles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Vehicle upsert
   */
  export type VehicleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * The filter to search for the Vehicle to update in case it exists.
     */
    where: VehicleWhereUniqueInput
    /**
     * In case the Vehicle found by the `where` argument doesn't exist, create a new Vehicle with this data.
     */
    create: XOR<VehicleCreateInput, VehicleUncheckedCreateInput>
    /**
     * In case the Vehicle was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VehicleUpdateInput, VehicleUncheckedUpdateInput>
  }

  /**
   * Vehicle delete
   */
  export type VehicleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter which Vehicle to delete.
     */
    where: VehicleWhereUniqueInput
  }

  /**
   * Vehicle deleteMany
   */
  export type VehicleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vehicles to delete
     */
    where?: VehicleWhereInput
    /**
     * Limit how many Vehicles to delete.
     */
    limit?: number
  }

  /**
   * Vehicle.routes
   */
  export type Vehicle$routesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: RouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Route
     */
    omit?: RouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteInclude<ExtArgs> | null
    where?: RouteWhereInput
    orderBy?: RouteOrderByWithRelationInput | RouteOrderByWithRelationInput[]
    cursor?: RouteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RouteScalarFieldEnum | RouteScalarFieldEnum[]
  }

  /**
   * Vehicle without action
   */
  export type VehicleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
  }


  /**
   * Model Client
   */

  export type AggregateClient = {
    _count: ClientCountAggregateOutputType | null
    _avg: ClientAvgAggregateOutputType | null
    _sum: ClientSumAggregateOutputType | null
    _min: ClientMinAggregateOutputType | null
    _max: ClientMaxAggregateOutputType | null
  }

  export type ClientAvgAggregateOutputType = {
    latitude: number | null
    longitude: number | null
    geofenceRadius: number | null
  }

  export type ClientSumAggregateOutputType = {
    latitude: number | null
    longitude: number | null
    geofenceRadius: number | null
  }

  export type ClientMinAggregateOutputType = {
    id: string | null
    name: string | null
    contactName: string | null
    phone: string | null
    address: string | null
    cep: string | null
    latitude: number | null
    longitude: number | null
    geofenceRadius: number | null
    tenantId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClientMaxAggregateOutputType = {
    id: string | null
    name: string | null
    contactName: string | null
    phone: string | null
    address: string | null
    cep: string | null
    latitude: number | null
    longitude: number | null
    geofenceRadius: number | null
    tenantId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClientCountAggregateOutputType = {
    id: number
    name: number
    contactName: number
    phone: number
    address: number
    cep: number
    latitude: number
    longitude: number
    geofenceRadius: number
    tenantId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ClientAvgAggregateInputType = {
    latitude?: true
    longitude?: true
    geofenceRadius?: true
  }

  export type ClientSumAggregateInputType = {
    latitude?: true
    longitude?: true
    geofenceRadius?: true
  }

  export type ClientMinAggregateInputType = {
    id?: true
    name?: true
    contactName?: true
    phone?: true
    address?: true
    cep?: true
    latitude?: true
    longitude?: true
    geofenceRadius?: true
    tenantId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClientMaxAggregateInputType = {
    id?: true
    name?: true
    contactName?: true
    phone?: true
    address?: true
    cep?: true
    latitude?: true
    longitude?: true
    geofenceRadius?: true
    tenantId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClientCountAggregateInputType = {
    id?: true
    name?: true
    contactName?: true
    phone?: true
    address?: true
    cep?: true
    latitude?: true
    longitude?: true
    geofenceRadius?: true
    tenantId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ClientAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Client to aggregate.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Clients
    **/
    _count?: true | ClientCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ClientAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ClientSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClientMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClientMaxAggregateInputType
  }

  export type GetClientAggregateType<T extends ClientAggregateArgs> = {
        [P in keyof T & keyof AggregateClient]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClient[P]>
      : GetScalarType<T[P], AggregateClient[P]>
  }




  export type ClientGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClientWhereInput
    orderBy?: ClientOrderByWithAggregationInput | ClientOrderByWithAggregationInput[]
    by: ClientScalarFieldEnum[] | ClientScalarFieldEnum
    having?: ClientScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClientCountAggregateInputType | true
    _avg?: ClientAvgAggregateInputType
    _sum?: ClientSumAggregateInputType
    _min?: ClientMinAggregateInputType
    _max?: ClientMaxAggregateInputType
  }

  export type ClientGroupByOutputType = {
    id: string
    name: string
    contactName: string | null
    phone: string | null
    address: string
    cep: string | null
    latitude: number
    longitude: number
    geofenceRadius: number
    tenantId: string
    createdAt: Date
    updatedAt: Date
    _count: ClientCountAggregateOutputType | null
    _avg: ClientAvgAggregateOutputType | null
    _sum: ClientSumAggregateOutputType | null
    _min: ClientMinAggregateOutputType | null
    _max: ClientMaxAggregateOutputType | null
  }

  type GetClientGroupByPayload<T extends ClientGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClientGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClientGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClientGroupByOutputType[P]>
            : GetScalarType<T[P], ClientGroupByOutputType[P]>
        }
      >
    >


  export type ClientSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    contactName?: boolean
    phone?: boolean
    address?: boolean
    cep?: boolean
    latitude?: boolean
    longitude?: boolean
    geofenceRadius?: boolean
    tenantId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    deliveries?: boolean | Client$deliveriesArgs<ExtArgs>
    _count?: boolean | ClientCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["client"]>

  export type ClientSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    contactName?: boolean
    phone?: boolean
    address?: boolean
    cep?: boolean
    latitude?: boolean
    longitude?: boolean
    geofenceRadius?: boolean
    tenantId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["client"]>

  export type ClientSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    contactName?: boolean
    phone?: boolean
    address?: boolean
    cep?: boolean
    latitude?: boolean
    longitude?: boolean
    geofenceRadius?: boolean
    tenantId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["client"]>

  export type ClientSelectScalar = {
    id?: boolean
    name?: boolean
    contactName?: boolean
    phone?: boolean
    address?: boolean
    cep?: boolean
    latitude?: boolean
    longitude?: boolean
    geofenceRadius?: boolean
    tenantId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ClientOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "contactName" | "phone" | "address" | "cep" | "latitude" | "longitude" | "geofenceRadius" | "tenantId" | "createdAt" | "updatedAt", ExtArgs["result"]["client"]>
  export type ClientInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    deliveries?: boolean | Client$deliveriesArgs<ExtArgs>
    _count?: boolean | ClientCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ClientIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }
  export type ClientIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }

  export type $ClientPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Client"
    objects: {
      tenant: Prisma.$TenantPayload<ExtArgs>
      deliveries: Prisma.$DeliveryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      contactName: string | null
      phone: string | null
      address: string
      cep: string | null
      latitude: number
      longitude: number
      geofenceRadius: number
      tenantId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["client"]>
    composites: {}
  }

  type ClientGetPayload<S extends boolean | null | undefined | ClientDefaultArgs> = $Result.GetResult<Prisma.$ClientPayload, S>

  type ClientCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClientFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClientCountAggregateInputType | true
    }

  export interface ClientDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Client'], meta: { name: 'Client' } }
    /**
     * Find zero or one Client that matches the filter.
     * @param {ClientFindUniqueArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClientFindUniqueArgs>(args: SelectSubset<T, ClientFindUniqueArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Client that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClientFindUniqueOrThrowArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClientFindUniqueOrThrowArgs>(args: SelectSubset<T, ClientFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Client that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientFindFirstArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClientFindFirstArgs>(args?: SelectSubset<T, ClientFindFirstArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Client that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientFindFirstOrThrowArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClientFindFirstOrThrowArgs>(args?: SelectSubset<T, ClientFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Clients that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Clients
     * const clients = await prisma.client.findMany()
     * 
     * // Get first 10 Clients
     * const clients = await prisma.client.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const clientWithIdOnly = await prisma.client.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClientFindManyArgs>(args?: SelectSubset<T, ClientFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Client.
     * @param {ClientCreateArgs} args - Arguments to create a Client.
     * @example
     * // Create one Client
     * const Client = await prisma.client.create({
     *   data: {
     *     // ... data to create a Client
     *   }
     * })
     * 
     */
    create<T extends ClientCreateArgs>(args: SelectSubset<T, ClientCreateArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Clients.
     * @param {ClientCreateManyArgs} args - Arguments to create many Clients.
     * @example
     * // Create many Clients
     * const client = await prisma.client.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClientCreateManyArgs>(args?: SelectSubset<T, ClientCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Clients and returns the data saved in the database.
     * @param {ClientCreateManyAndReturnArgs} args - Arguments to create many Clients.
     * @example
     * // Create many Clients
     * const client = await prisma.client.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Clients and only return the `id`
     * const clientWithIdOnly = await prisma.client.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClientCreateManyAndReturnArgs>(args?: SelectSubset<T, ClientCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Client.
     * @param {ClientDeleteArgs} args - Arguments to delete one Client.
     * @example
     * // Delete one Client
     * const Client = await prisma.client.delete({
     *   where: {
     *     // ... filter to delete one Client
     *   }
     * })
     * 
     */
    delete<T extends ClientDeleteArgs>(args: SelectSubset<T, ClientDeleteArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Client.
     * @param {ClientUpdateArgs} args - Arguments to update one Client.
     * @example
     * // Update one Client
     * const client = await prisma.client.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClientUpdateArgs>(args: SelectSubset<T, ClientUpdateArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Clients.
     * @param {ClientDeleteManyArgs} args - Arguments to filter Clients to delete.
     * @example
     * // Delete a few Clients
     * const { count } = await prisma.client.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClientDeleteManyArgs>(args?: SelectSubset<T, ClientDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Clients
     * const client = await prisma.client.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClientUpdateManyArgs>(args: SelectSubset<T, ClientUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clients and returns the data updated in the database.
     * @param {ClientUpdateManyAndReturnArgs} args - Arguments to update many Clients.
     * @example
     * // Update many Clients
     * const client = await prisma.client.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Clients and only return the `id`
     * const clientWithIdOnly = await prisma.client.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ClientUpdateManyAndReturnArgs>(args: SelectSubset<T, ClientUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Client.
     * @param {ClientUpsertArgs} args - Arguments to update or create a Client.
     * @example
     * // Update or create a Client
     * const client = await prisma.client.upsert({
     *   create: {
     *     // ... data to create a Client
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Client we want to update
     *   }
     * })
     */
    upsert<T extends ClientUpsertArgs>(args: SelectSubset<T, ClientUpsertArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Clients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientCountArgs} args - Arguments to filter Clients to count.
     * @example
     * // Count the number of Clients
     * const count = await prisma.client.count({
     *   where: {
     *     // ... the filter for the Clients we want to count
     *   }
     * })
    **/
    count<T extends ClientCountArgs>(
      args?: Subset<T, ClientCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClientCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Client.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ClientAggregateArgs>(args: Subset<T, ClientAggregateArgs>): Prisma.PrismaPromise<GetClientAggregateType<T>>

    /**
     * Group by Client.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ClientGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClientGroupByArgs['orderBy'] }
        : { orderBy?: ClientGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ClientGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClientGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Client model
   */
  readonly fields: ClientFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Client.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClientClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tenant<T extends TenantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TenantDefaultArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    deliveries<T extends Client$deliveriesArgs<ExtArgs> = {}>(args?: Subset<T, Client$deliveriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeliveryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Client model
   */
  interface ClientFieldRefs {
    readonly id: FieldRef<"Client", 'String'>
    readonly name: FieldRef<"Client", 'String'>
    readonly contactName: FieldRef<"Client", 'String'>
    readonly phone: FieldRef<"Client", 'String'>
    readonly address: FieldRef<"Client", 'String'>
    readonly cep: FieldRef<"Client", 'String'>
    readonly latitude: FieldRef<"Client", 'Float'>
    readonly longitude: FieldRef<"Client", 'Float'>
    readonly geofenceRadius: FieldRef<"Client", 'Float'>
    readonly tenantId: FieldRef<"Client", 'String'>
    readonly createdAt: FieldRef<"Client", 'DateTime'>
    readonly updatedAt: FieldRef<"Client", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Client findUnique
   */
  export type ClientFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client findUniqueOrThrow
   */
  export type ClientFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client findFirst
   */
  export type ClientFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clients.
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clients.
     */
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[]
  }

  /**
   * Client findFirstOrThrow
   */
  export type ClientFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clients.
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clients.
     */
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[]
  }

  /**
   * Client findMany
   */
  export type ClientFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Clients to fetch.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Clients.
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[]
  }

  /**
   * Client create
   */
  export type ClientCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * The data needed to create a Client.
     */
    data: XOR<ClientCreateInput, ClientUncheckedCreateInput>
  }

  /**
   * Client createMany
   */
  export type ClientCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Clients.
     */
    data: ClientCreateManyInput | ClientCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Client createManyAndReturn
   */
  export type ClientCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * The data used to create many Clients.
     */
    data: ClientCreateManyInput | ClientCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Client update
   */
  export type ClientUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * The data needed to update a Client.
     */
    data: XOR<ClientUpdateInput, ClientUncheckedUpdateInput>
    /**
     * Choose, which Client to update.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client updateMany
   */
  export type ClientUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Clients.
     */
    data: XOR<ClientUpdateManyMutationInput, ClientUncheckedUpdateManyInput>
    /**
     * Filter which Clients to update
     */
    where?: ClientWhereInput
    /**
     * Limit how many Clients to update.
     */
    limit?: number
  }

  /**
   * Client updateManyAndReturn
   */
  export type ClientUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * The data used to update Clients.
     */
    data: XOR<ClientUpdateManyMutationInput, ClientUncheckedUpdateManyInput>
    /**
     * Filter which Clients to update
     */
    where?: ClientWhereInput
    /**
     * Limit how many Clients to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Client upsert
   */
  export type ClientUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * The filter to search for the Client to update in case it exists.
     */
    where: ClientWhereUniqueInput
    /**
     * In case the Client found by the `where` argument doesn't exist, create a new Client with this data.
     */
    create: XOR<ClientCreateInput, ClientUncheckedCreateInput>
    /**
     * In case the Client was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClientUpdateInput, ClientUncheckedUpdateInput>
  }

  /**
   * Client delete
   */
  export type ClientDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter which Client to delete.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client deleteMany
   */
  export type ClientDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Clients to delete
     */
    where?: ClientWhereInput
    /**
     * Limit how many Clients to delete.
     */
    limit?: number
  }

  /**
   * Client.deliveries
   */
  export type Client$deliveriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delivery
     */
    select?: DeliverySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Delivery
     */
    omit?: DeliveryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliveryInclude<ExtArgs> | null
    where?: DeliveryWhereInput
    orderBy?: DeliveryOrderByWithRelationInput | DeliveryOrderByWithRelationInput[]
    cursor?: DeliveryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DeliveryScalarFieldEnum | DeliveryScalarFieldEnum[]
  }

  /**
   * Client without action
   */
  export type ClientDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
  }


  /**
   * Model Route
   */

  export type AggregateRoute = {
    _count: RouteCountAggregateOutputType | null
    _avg: RouteAvgAggregateOutputType | null
    _sum: RouteSumAggregateOutputType | null
    _min: RouteMinAggregateOutputType | null
    _max: RouteMaxAggregateOutputType | null
  }

  export type RouteAvgAggregateOutputType = {
    plannedDistance: number | null
    plannedTime: number | null
  }

  export type RouteSumAggregateOutputType = {
    plannedDistance: number | null
    plannedTime: number | null
  }

  export type RouteMinAggregateOutputType = {
    id: string | null
    name: string | null
    status: string | null
    date: Date | null
    plannedDistance: number | null
    plannedTime: number | null
    driverId: string | null
    vehicleId: string | null
    tenantId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    returnToDepot: boolean | null
  }

  export type RouteMaxAggregateOutputType = {
    id: string | null
    name: string | null
    status: string | null
    date: Date | null
    plannedDistance: number | null
    plannedTime: number | null
    driverId: string | null
    vehicleId: string | null
    tenantId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    returnToDepot: boolean | null
  }

  export type RouteCountAggregateOutputType = {
    id: number
    name: number
    status: number
    date: number
    plannedDistance: number
    plannedTime: number
    driverId: number
    vehicleId: number
    tenantId: number
    createdAt: number
    updatedAt: number
    returnToDepot: number
    _all: number
  }


  export type RouteAvgAggregateInputType = {
    plannedDistance?: true
    plannedTime?: true
  }

  export type RouteSumAggregateInputType = {
    plannedDistance?: true
    plannedTime?: true
  }

  export type RouteMinAggregateInputType = {
    id?: true
    name?: true
    status?: true
    date?: true
    plannedDistance?: true
    plannedTime?: true
    driverId?: true
    vehicleId?: true
    tenantId?: true
    createdAt?: true
    updatedAt?: true
    returnToDepot?: true
  }

  export type RouteMaxAggregateInputType = {
    id?: true
    name?: true
    status?: true
    date?: true
    plannedDistance?: true
    plannedTime?: true
    driverId?: true
    vehicleId?: true
    tenantId?: true
    createdAt?: true
    updatedAt?: true
    returnToDepot?: true
  }

  export type RouteCountAggregateInputType = {
    id?: true
    name?: true
    status?: true
    date?: true
    plannedDistance?: true
    plannedTime?: true
    driverId?: true
    vehicleId?: true
    tenantId?: true
    createdAt?: true
    updatedAt?: true
    returnToDepot?: true
    _all?: true
  }

  export type RouteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Route to aggregate.
     */
    where?: RouteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Routes to fetch.
     */
    orderBy?: RouteOrderByWithRelationInput | RouteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RouteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Routes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Routes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Routes
    **/
    _count?: true | RouteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RouteAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RouteSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RouteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RouteMaxAggregateInputType
  }

  export type GetRouteAggregateType<T extends RouteAggregateArgs> = {
        [P in keyof T & keyof AggregateRoute]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoute[P]>
      : GetScalarType<T[P], AggregateRoute[P]>
  }




  export type RouteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RouteWhereInput
    orderBy?: RouteOrderByWithAggregationInput | RouteOrderByWithAggregationInput[]
    by: RouteScalarFieldEnum[] | RouteScalarFieldEnum
    having?: RouteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RouteCountAggregateInputType | true
    _avg?: RouteAvgAggregateInputType
    _sum?: RouteSumAggregateInputType
    _min?: RouteMinAggregateInputType
    _max?: RouteMaxAggregateInputType
  }

  export type RouteGroupByOutputType = {
    id: string
    name: string
    status: string
    date: Date
    plannedDistance: number
    plannedTime: number
    driverId: string
    vehicleId: string
    tenantId: string
    createdAt: Date
    updatedAt: Date
    returnToDepot: boolean
    _count: RouteCountAggregateOutputType | null
    _avg: RouteAvgAggregateOutputType | null
    _sum: RouteSumAggregateOutputType | null
    _min: RouteMinAggregateOutputType | null
    _max: RouteMaxAggregateOutputType | null
  }

  type GetRouteGroupByPayload<T extends RouteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RouteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RouteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RouteGroupByOutputType[P]>
            : GetScalarType<T[P], RouteGroupByOutputType[P]>
        }
      >
    >


  export type RouteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    status?: boolean
    date?: boolean
    plannedDistance?: boolean
    plannedTime?: boolean
    driverId?: boolean
    vehicleId?: boolean
    tenantId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    returnToDepot?: boolean
    driver?: boolean | UserDefaultArgs<ExtArgs>
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    deliveries?: boolean | Route$deliveriesArgs<ExtArgs>
    locationLogs?: boolean | Route$locationLogsArgs<ExtArgs>
    _count?: boolean | RouteCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["route"]>

  export type RouteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    status?: boolean
    date?: boolean
    plannedDistance?: boolean
    plannedTime?: boolean
    driverId?: boolean
    vehicleId?: boolean
    tenantId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    returnToDepot?: boolean
    driver?: boolean | UserDefaultArgs<ExtArgs>
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["route"]>

  export type RouteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    status?: boolean
    date?: boolean
    plannedDistance?: boolean
    plannedTime?: boolean
    driverId?: boolean
    vehicleId?: boolean
    tenantId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    returnToDepot?: boolean
    driver?: boolean | UserDefaultArgs<ExtArgs>
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["route"]>

  export type RouteSelectScalar = {
    id?: boolean
    name?: boolean
    status?: boolean
    date?: boolean
    plannedDistance?: boolean
    plannedTime?: boolean
    driverId?: boolean
    vehicleId?: boolean
    tenantId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    returnToDepot?: boolean
  }

  export type RouteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "status" | "date" | "plannedDistance" | "plannedTime" | "driverId" | "vehicleId" | "tenantId" | "createdAt" | "updatedAt" | "returnToDepot", ExtArgs["result"]["route"]>
  export type RouteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    driver?: boolean | UserDefaultArgs<ExtArgs>
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    deliveries?: boolean | Route$deliveriesArgs<ExtArgs>
    locationLogs?: boolean | Route$locationLogsArgs<ExtArgs>
    _count?: boolean | RouteCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RouteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    driver?: boolean | UserDefaultArgs<ExtArgs>
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }
  export type RouteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    driver?: boolean | UserDefaultArgs<ExtArgs>
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }

  export type $RoutePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Route"
    objects: {
      driver: Prisma.$UserPayload<ExtArgs>
      vehicle: Prisma.$VehiclePayload<ExtArgs>
      tenant: Prisma.$TenantPayload<ExtArgs>
      deliveries: Prisma.$DeliveryPayload<ExtArgs>[]
      locationLogs: Prisma.$LocationLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      status: string
      date: Date
      plannedDistance: number
      plannedTime: number
      driverId: string
      vehicleId: string
      tenantId: string
      createdAt: Date
      updatedAt: Date
      returnToDepot: boolean
    }, ExtArgs["result"]["route"]>
    composites: {}
  }

  type RouteGetPayload<S extends boolean | null | undefined | RouteDefaultArgs> = $Result.GetResult<Prisma.$RoutePayload, S>

  type RouteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RouteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RouteCountAggregateInputType | true
    }

  export interface RouteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Route'], meta: { name: 'Route' } }
    /**
     * Find zero or one Route that matches the filter.
     * @param {RouteFindUniqueArgs} args - Arguments to find a Route
     * @example
     * // Get one Route
     * const route = await prisma.route.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RouteFindUniqueArgs>(args: SelectSubset<T, RouteFindUniqueArgs<ExtArgs>>): Prisma__RouteClient<$Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Route that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RouteFindUniqueOrThrowArgs} args - Arguments to find a Route
     * @example
     * // Get one Route
     * const route = await prisma.route.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RouteFindUniqueOrThrowArgs>(args: SelectSubset<T, RouteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RouteClient<$Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Route that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RouteFindFirstArgs} args - Arguments to find a Route
     * @example
     * // Get one Route
     * const route = await prisma.route.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RouteFindFirstArgs>(args?: SelectSubset<T, RouteFindFirstArgs<ExtArgs>>): Prisma__RouteClient<$Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Route that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RouteFindFirstOrThrowArgs} args - Arguments to find a Route
     * @example
     * // Get one Route
     * const route = await prisma.route.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RouteFindFirstOrThrowArgs>(args?: SelectSubset<T, RouteFindFirstOrThrowArgs<ExtArgs>>): Prisma__RouteClient<$Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Routes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RouteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Routes
     * const routes = await prisma.route.findMany()
     * 
     * // Get first 10 Routes
     * const routes = await prisma.route.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const routeWithIdOnly = await prisma.route.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RouteFindManyArgs>(args?: SelectSubset<T, RouteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Route.
     * @param {RouteCreateArgs} args - Arguments to create a Route.
     * @example
     * // Create one Route
     * const Route = await prisma.route.create({
     *   data: {
     *     // ... data to create a Route
     *   }
     * })
     * 
     */
    create<T extends RouteCreateArgs>(args: SelectSubset<T, RouteCreateArgs<ExtArgs>>): Prisma__RouteClient<$Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Routes.
     * @param {RouteCreateManyArgs} args - Arguments to create many Routes.
     * @example
     * // Create many Routes
     * const route = await prisma.route.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RouteCreateManyArgs>(args?: SelectSubset<T, RouteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Routes and returns the data saved in the database.
     * @param {RouteCreateManyAndReturnArgs} args - Arguments to create many Routes.
     * @example
     * // Create many Routes
     * const route = await prisma.route.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Routes and only return the `id`
     * const routeWithIdOnly = await prisma.route.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RouteCreateManyAndReturnArgs>(args?: SelectSubset<T, RouteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Route.
     * @param {RouteDeleteArgs} args - Arguments to delete one Route.
     * @example
     * // Delete one Route
     * const Route = await prisma.route.delete({
     *   where: {
     *     // ... filter to delete one Route
     *   }
     * })
     * 
     */
    delete<T extends RouteDeleteArgs>(args: SelectSubset<T, RouteDeleteArgs<ExtArgs>>): Prisma__RouteClient<$Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Route.
     * @param {RouteUpdateArgs} args - Arguments to update one Route.
     * @example
     * // Update one Route
     * const route = await prisma.route.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RouteUpdateArgs>(args: SelectSubset<T, RouteUpdateArgs<ExtArgs>>): Prisma__RouteClient<$Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Routes.
     * @param {RouteDeleteManyArgs} args - Arguments to filter Routes to delete.
     * @example
     * // Delete a few Routes
     * const { count } = await prisma.route.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RouteDeleteManyArgs>(args?: SelectSubset<T, RouteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Routes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RouteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Routes
     * const route = await prisma.route.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RouteUpdateManyArgs>(args: SelectSubset<T, RouteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Routes and returns the data updated in the database.
     * @param {RouteUpdateManyAndReturnArgs} args - Arguments to update many Routes.
     * @example
     * // Update many Routes
     * const route = await prisma.route.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Routes and only return the `id`
     * const routeWithIdOnly = await prisma.route.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RouteUpdateManyAndReturnArgs>(args: SelectSubset<T, RouteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Route.
     * @param {RouteUpsertArgs} args - Arguments to update or create a Route.
     * @example
     * // Update or create a Route
     * const route = await prisma.route.upsert({
     *   create: {
     *     // ... data to create a Route
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Route we want to update
     *   }
     * })
     */
    upsert<T extends RouteUpsertArgs>(args: SelectSubset<T, RouteUpsertArgs<ExtArgs>>): Prisma__RouteClient<$Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Routes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RouteCountArgs} args - Arguments to filter Routes to count.
     * @example
     * // Count the number of Routes
     * const count = await prisma.route.count({
     *   where: {
     *     // ... the filter for the Routes we want to count
     *   }
     * })
    **/
    count<T extends RouteCountArgs>(
      args?: Subset<T, RouteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RouteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Route.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RouteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RouteAggregateArgs>(args: Subset<T, RouteAggregateArgs>): Prisma.PrismaPromise<GetRouteAggregateType<T>>

    /**
     * Group by Route.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RouteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RouteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RouteGroupByArgs['orderBy'] }
        : { orderBy?: RouteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RouteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRouteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Route model
   */
  readonly fields: RouteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Route.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RouteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    driver<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    vehicle<T extends VehicleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, VehicleDefaultArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    tenant<T extends TenantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TenantDefaultArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    deliveries<T extends Route$deliveriesArgs<ExtArgs> = {}>(args?: Subset<T, Route$deliveriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeliveryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    locationLogs<T extends Route$locationLogsArgs<ExtArgs> = {}>(args?: Subset<T, Route$locationLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocationLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Route model
   */
  interface RouteFieldRefs {
    readonly id: FieldRef<"Route", 'String'>
    readonly name: FieldRef<"Route", 'String'>
    readonly status: FieldRef<"Route", 'String'>
    readonly date: FieldRef<"Route", 'DateTime'>
    readonly plannedDistance: FieldRef<"Route", 'Float'>
    readonly plannedTime: FieldRef<"Route", 'Float'>
    readonly driverId: FieldRef<"Route", 'String'>
    readonly vehicleId: FieldRef<"Route", 'String'>
    readonly tenantId: FieldRef<"Route", 'String'>
    readonly createdAt: FieldRef<"Route", 'DateTime'>
    readonly updatedAt: FieldRef<"Route", 'DateTime'>
    readonly returnToDepot: FieldRef<"Route", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Route findUnique
   */
  export type RouteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: RouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Route
     */
    omit?: RouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteInclude<ExtArgs> | null
    /**
     * Filter, which Route to fetch.
     */
    where: RouteWhereUniqueInput
  }

  /**
   * Route findUniqueOrThrow
   */
  export type RouteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: RouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Route
     */
    omit?: RouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteInclude<ExtArgs> | null
    /**
     * Filter, which Route to fetch.
     */
    where: RouteWhereUniqueInput
  }

  /**
   * Route findFirst
   */
  export type RouteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: RouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Route
     */
    omit?: RouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteInclude<ExtArgs> | null
    /**
     * Filter, which Route to fetch.
     */
    where?: RouteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Routes to fetch.
     */
    orderBy?: RouteOrderByWithRelationInput | RouteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Routes.
     */
    cursor?: RouteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Routes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Routes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Routes.
     */
    distinct?: RouteScalarFieldEnum | RouteScalarFieldEnum[]
  }

  /**
   * Route findFirstOrThrow
   */
  export type RouteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: RouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Route
     */
    omit?: RouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteInclude<ExtArgs> | null
    /**
     * Filter, which Route to fetch.
     */
    where?: RouteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Routes to fetch.
     */
    orderBy?: RouteOrderByWithRelationInput | RouteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Routes.
     */
    cursor?: RouteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Routes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Routes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Routes.
     */
    distinct?: RouteScalarFieldEnum | RouteScalarFieldEnum[]
  }

  /**
   * Route findMany
   */
  export type RouteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: RouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Route
     */
    omit?: RouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteInclude<ExtArgs> | null
    /**
     * Filter, which Routes to fetch.
     */
    where?: RouteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Routes to fetch.
     */
    orderBy?: RouteOrderByWithRelationInput | RouteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Routes.
     */
    cursor?: RouteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Routes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Routes.
     */
    skip?: number
    distinct?: RouteScalarFieldEnum | RouteScalarFieldEnum[]
  }

  /**
   * Route create
   */
  export type RouteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: RouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Route
     */
    omit?: RouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteInclude<ExtArgs> | null
    /**
     * The data needed to create a Route.
     */
    data: XOR<RouteCreateInput, RouteUncheckedCreateInput>
  }

  /**
   * Route createMany
   */
  export type RouteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Routes.
     */
    data: RouteCreateManyInput | RouteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Route createManyAndReturn
   */
  export type RouteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: RouteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Route
     */
    omit?: RouteOmit<ExtArgs> | null
    /**
     * The data used to create many Routes.
     */
    data: RouteCreateManyInput | RouteCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Route update
   */
  export type RouteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: RouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Route
     */
    omit?: RouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteInclude<ExtArgs> | null
    /**
     * The data needed to update a Route.
     */
    data: XOR<RouteUpdateInput, RouteUncheckedUpdateInput>
    /**
     * Choose, which Route to update.
     */
    where: RouteWhereUniqueInput
  }

  /**
   * Route updateMany
   */
  export type RouteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Routes.
     */
    data: XOR<RouteUpdateManyMutationInput, RouteUncheckedUpdateManyInput>
    /**
     * Filter which Routes to update
     */
    where?: RouteWhereInput
    /**
     * Limit how many Routes to update.
     */
    limit?: number
  }

  /**
   * Route updateManyAndReturn
   */
  export type RouteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: RouteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Route
     */
    omit?: RouteOmit<ExtArgs> | null
    /**
     * The data used to update Routes.
     */
    data: XOR<RouteUpdateManyMutationInput, RouteUncheckedUpdateManyInput>
    /**
     * Filter which Routes to update
     */
    where?: RouteWhereInput
    /**
     * Limit how many Routes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Route upsert
   */
  export type RouteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: RouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Route
     */
    omit?: RouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteInclude<ExtArgs> | null
    /**
     * The filter to search for the Route to update in case it exists.
     */
    where: RouteWhereUniqueInput
    /**
     * In case the Route found by the `where` argument doesn't exist, create a new Route with this data.
     */
    create: XOR<RouteCreateInput, RouteUncheckedCreateInput>
    /**
     * In case the Route was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RouteUpdateInput, RouteUncheckedUpdateInput>
  }

  /**
   * Route delete
   */
  export type RouteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: RouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Route
     */
    omit?: RouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteInclude<ExtArgs> | null
    /**
     * Filter which Route to delete.
     */
    where: RouteWhereUniqueInput
  }

  /**
   * Route deleteMany
   */
  export type RouteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Routes to delete
     */
    where?: RouteWhereInput
    /**
     * Limit how many Routes to delete.
     */
    limit?: number
  }

  /**
   * Route.deliveries
   */
  export type Route$deliveriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delivery
     */
    select?: DeliverySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Delivery
     */
    omit?: DeliveryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliveryInclude<ExtArgs> | null
    where?: DeliveryWhereInput
    orderBy?: DeliveryOrderByWithRelationInput | DeliveryOrderByWithRelationInput[]
    cursor?: DeliveryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DeliveryScalarFieldEnum | DeliveryScalarFieldEnum[]
  }

  /**
   * Route.locationLogs
   */
  export type Route$locationLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationLog
     */
    select?: LocationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LocationLog
     */
    omit?: LocationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationLogInclude<ExtArgs> | null
    where?: LocationLogWhereInput
    orderBy?: LocationLogOrderByWithRelationInput | LocationLogOrderByWithRelationInput[]
    cursor?: LocationLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LocationLogScalarFieldEnum | LocationLogScalarFieldEnum[]
  }

  /**
   * Route without action
   */
  export type RouteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: RouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Route
     */
    omit?: RouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteInclude<ExtArgs> | null
  }


  /**
   * Model Delivery
   */

  export type AggregateDelivery = {
    _count: DeliveryCountAggregateOutputType | null
    _avg: DeliveryAvgAggregateOutputType | null
    _sum: DeliverySumAggregateOutputType | null
    _min: DeliveryMinAggregateOutputType | null
    _max: DeliveryMaxAggregateOutputType | null
  }

  export type DeliveryAvgAggregateOutputType = {
    sequence: number | null
    ratingInt: number | null
    actualLatitude: number | null
    actualLongitude: number | null
    gpsAccuracy: number | null
    gpsSpeed: number | null
    gpsAltitude: number | null
    gpsHeading: number | null
    distanceFromClient: number | null
  }

  export type DeliverySumAggregateOutputType = {
    sequence: number | null
    ratingInt: number | null
    actualLatitude: number | null
    actualLongitude: number | null
    gpsAccuracy: number | null
    gpsSpeed: number | null
    gpsAltitude: number | null
    gpsHeading: number | null
    distanceFromClient: number | null
  }

  export type DeliveryMinAggregateOutputType = {
    id: string | null
    sequence: number | null
    status: string | null
    routeId: string | null
    clientId: string | null
    trackingToken: string | null
    customerPhone: string | null
    ratingInt: number | null
    ratingComment: string | null
    actualLatitude: number | null
    actualLongitude: number | null
    gpsAccuracy: number | null
    gpsSpeed: number | null
    gpsAltitude: number | null
    gpsHeading: number | null
    deliveredAt: Date | null
    photoUrl: string | null
    signatureUrl: string | null
    notes: string | null
    failureReason: string | null
    isInsideGeofence: boolean | null
    distanceFromClient: number | null
    tenantId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DeliveryMaxAggregateOutputType = {
    id: string | null
    sequence: number | null
    status: string | null
    routeId: string | null
    clientId: string | null
    trackingToken: string | null
    customerPhone: string | null
    ratingInt: number | null
    ratingComment: string | null
    actualLatitude: number | null
    actualLongitude: number | null
    gpsAccuracy: number | null
    gpsSpeed: number | null
    gpsAltitude: number | null
    gpsHeading: number | null
    deliveredAt: Date | null
    photoUrl: string | null
    signatureUrl: string | null
    notes: string | null
    failureReason: string | null
    isInsideGeofence: boolean | null
    distanceFromClient: number | null
    tenantId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DeliveryCountAggregateOutputType = {
    id: number
    sequence: number
    status: number
    routeId: number
    clientId: number
    trackingToken: number
    customerPhone: number
    ratingInt: number
    ratingComment: number
    actualLatitude: number
    actualLongitude: number
    gpsAccuracy: number
    gpsSpeed: number
    gpsAltitude: number
    gpsHeading: number
    deliveredAt: number
    photoUrl: number
    signatureUrl: number
    notes: number
    failureReason: number
    isInsideGeofence: number
    distanceFromClient: number
    tenantId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DeliveryAvgAggregateInputType = {
    sequence?: true
    ratingInt?: true
    actualLatitude?: true
    actualLongitude?: true
    gpsAccuracy?: true
    gpsSpeed?: true
    gpsAltitude?: true
    gpsHeading?: true
    distanceFromClient?: true
  }

  export type DeliverySumAggregateInputType = {
    sequence?: true
    ratingInt?: true
    actualLatitude?: true
    actualLongitude?: true
    gpsAccuracy?: true
    gpsSpeed?: true
    gpsAltitude?: true
    gpsHeading?: true
    distanceFromClient?: true
  }

  export type DeliveryMinAggregateInputType = {
    id?: true
    sequence?: true
    status?: true
    routeId?: true
    clientId?: true
    trackingToken?: true
    customerPhone?: true
    ratingInt?: true
    ratingComment?: true
    actualLatitude?: true
    actualLongitude?: true
    gpsAccuracy?: true
    gpsSpeed?: true
    gpsAltitude?: true
    gpsHeading?: true
    deliveredAt?: true
    photoUrl?: true
    signatureUrl?: true
    notes?: true
    failureReason?: true
    isInsideGeofence?: true
    distanceFromClient?: true
    tenantId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DeliveryMaxAggregateInputType = {
    id?: true
    sequence?: true
    status?: true
    routeId?: true
    clientId?: true
    trackingToken?: true
    customerPhone?: true
    ratingInt?: true
    ratingComment?: true
    actualLatitude?: true
    actualLongitude?: true
    gpsAccuracy?: true
    gpsSpeed?: true
    gpsAltitude?: true
    gpsHeading?: true
    deliveredAt?: true
    photoUrl?: true
    signatureUrl?: true
    notes?: true
    failureReason?: true
    isInsideGeofence?: true
    distanceFromClient?: true
    tenantId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DeliveryCountAggregateInputType = {
    id?: true
    sequence?: true
    status?: true
    routeId?: true
    clientId?: true
    trackingToken?: true
    customerPhone?: true
    ratingInt?: true
    ratingComment?: true
    actualLatitude?: true
    actualLongitude?: true
    gpsAccuracy?: true
    gpsSpeed?: true
    gpsAltitude?: true
    gpsHeading?: true
    deliveredAt?: true
    photoUrl?: true
    signatureUrl?: true
    notes?: true
    failureReason?: true
    isInsideGeofence?: true
    distanceFromClient?: true
    tenantId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DeliveryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Delivery to aggregate.
     */
    where?: DeliveryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Deliveries to fetch.
     */
    orderBy?: DeliveryOrderByWithRelationInput | DeliveryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DeliveryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Deliveries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Deliveries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Deliveries
    **/
    _count?: true | DeliveryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DeliveryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DeliverySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DeliveryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DeliveryMaxAggregateInputType
  }

  export type GetDeliveryAggregateType<T extends DeliveryAggregateArgs> = {
        [P in keyof T & keyof AggregateDelivery]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDelivery[P]>
      : GetScalarType<T[P], AggregateDelivery[P]>
  }




  export type DeliveryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DeliveryWhereInput
    orderBy?: DeliveryOrderByWithAggregationInput | DeliveryOrderByWithAggregationInput[]
    by: DeliveryScalarFieldEnum[] | DeliveryScalarFieldEnum
    having?: DeliveryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DeliveryCountAggregateInputType | true
    _avg?: DeliveryAvgAggregateInputType
    _sum?: DeliverySumAggregateInputType
    _min?: DeliveryMinAggregateInputType
    _max?: DeliveryMaxAggregateInputType
  }

  export type DeliveryGroupByOutputType = {
    id: string
    sequence: number
    status: string
    routeId: string
    clientId: string
    trackingToken: string
    customerPhone: string | null
    ratingInt: number | null
    ratingComment: string | null
    actualLatitude: number | null
    actualLongitude: number | null
    gpsAccuracy: number | null
    gpsSpeed: number | null
    gpsAltitude: number | null
    gpsHeading: number | null
    deliveredAt: Date | null
    photoUrl: string | null
    signatureUrl: string | null
    notes: string | null
    failureReason: string | null
    isInsideGeofence: boolean | null
    distanceFromClient: number | null
    tenantId: string
    createdAt: Date
    updatedAt: Date
    _count: DeliveryCountAggregateOutputType | null
    _avg: DeliveryAvgAggregateOutputType | null
    _sum: DeliverySumAggregateOutputType | null
    _min: DeliveryMinAggregateOutputType | null
    _max: DeliveryMaxAggregateOutputType | null
  }

  type GetDeliveryGroupByPayload<T extends DeliveryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DeliveryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DeliveryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DeliveryGroupByOutputType[P]>
            : GetScalarType<T[P], DeliveryGroupByOutputType[P]>
        }
      >
    >


  export type DeliverySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sequence?: boolean
    status?: boolean
    routeId?: boolean
    clientId?: boolean
    trackingToken?: boolean
    customerPhone?: boolean
    ratingInt?: boolean
    ratingComment?: boolean
    actualLatitude?: boolean
    actualLongitude?: boolean
    gpsAccuracy?: boolean
    gpsSpeed?: boolean
    gpsAltitude?: boolean
    gpsHeading?: boolean
    deliveredAt?: boolean
    photoUrl?: boolean
    signatureUrl?: boolean
    notes?: boolean
    failureReason?: boolean
    isInsideGeofence?: boolean
    distanceFromClient?: boolean
    tenantId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    route?: boolean | RouteDefaultArgs<ExtArgs>
    client?: boolean | ClientDefaultArgs<ExtArgs>
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["delivery"]>

  export type DeliverySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sequence?: boolean
    status?: boolean
    routeId?: boolean
    clientId?: boolean
    trackingToken?: boolean
    customerPhone?: boolean
    ratingInt?: boolean
    ratingComment?: boolean
    actualLatitude?: boolean
    actualLongitude?: boolean
    gpsAccuracy?: boolean
    gpsSpeed?: boolean
    gpsAltitude?: boolean
    gpsHeading?: boolean
    deliveredAt?: boolean
    photoUrl?: boolean
    signatureUrl?: boolean
    notes?: boolean
    failureReason?: boolean
    isInsideGeofence?: boolean
    distanceFromClient?: boolean
    tenantId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    route?: boolean | RouteDefaultArgs<ExtArgs>
    client?: boolean | ClientDefaultArgs<ExtArgs>
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["delivery"]>

  export type DeliverySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sequence?: boolean
    status?: boolean
    routeId?: boolean
    clientId?: boolean
    trackingToken?: boolean
    customerPhone?: boolean
    ratingInt?: boolean
    ratingComment?: boolean
    actualLatitude?: boolean
    actualLongitude?: boolean
    gpsAccuracy?: boolean
    gpsSpeed?: boolean
    gpsAltitude?: boolean
    gpsHeading?: boolean
    deliveredAt?: boolean
    photoUrl?: boolean
    signatureUrl?: boolean
    notes?: boolean
    failureReason?: boolean
    isInsideGeofence?: boolean
    distanceFromClient?: boolean
    tenantId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    route?: boolean | RouteDefaultArgs<ExtArgs>
    client?: boolean | ClientDefaultArgs<ExtArgs>
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["delivery"]>

  export type DeliverySelectScalar = {
    id?: boolean
    sequence?: boolean
    status?: boolean
    routeId?: boolean
    clientId?: boolean
    trackingToken?: boolean
    customerPhone?: boolean
    ratingInt?: boolean
    ratingComment?: boolean
    actualLatitude?: boolean
    actualLongitude?: boolean
    gpsAccuracy?: boolean
    gpsSpeed?: boolean
    gpsAltitude?: boolean
    gpsHeading?: boolean
    deliveredAt?: boolean
    photoUrl?: boolean
    signatureUrl?: boolean
    notes?: boolean
    failureReason?: boolean
    isInsideGeofence?: boolean
    distanceFromClient?: boolean
    tenantId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DeliveryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sequence" | "status" | "routeId" | "clientId" | "trackingToken" | "customerPhone" | "ratingInt" | "ratingComment" | "actualLatitude" | "actualLongitude" | "gpsAccuracy" | "gpsSpeed" | "gpsAltitude" | "gpsHeading" | "deliveredAt" | "photoUrl" | "signatureUrl" | "notes" | "failureReason" | "isInsideGeofence" | "distanceFromClient" | "tenantId" | "createdAt" | "updatedAt", ExtArgs["result"]["delivery"]>
  export type DeliveryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    route?: boolean | RouteDefaultArgs<ExtArgs>
    client?: boolean | ClientDefaultArgs<ExtArgs>
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }
  export type DeliveryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    route?: boolean | RouteDefaultArgs<ExtArgs>
    client?: boolean | ClientDefaultArgs<ExtArgs>
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }
  export type DeliveryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    route?: boolean | RouteDefaultArgs<ExtArgs>
    client?: boolean | ClientDefaultArgs<ExtArgs>
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }

  export type $DeliveryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Delivery"
    objects: {
      route: Prisma.$RoutePayload<ExtArgs>
      client: Prisma.$ClientPayload<ExtArgs>
      tenant: Prisma.$TenantPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sequence: number
      status: string
      routeId: string
      clientId: string
      trackingToken: string
      customerPhone: string | null
      ratingInt: number | null
      ratingComment: string | null
      actualLatitude: number | null
      actualLongitude: number | null
      gpsAccuracy: number | null
      gpsSpeed: number | null
      gpsAltitude: number | null
      gpsHeading: number | null
      deliveredAt: Date | null
      photoUrl: string | null
      signatureUrl: string | null
      notes: string | null
      failureReason: string | null
      isInsideGeofence: boolean | null
      distanceFromClient: number | null
      tenantId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["delivery"]>
    composites: {}
  }

  type DeliveryGetPayload<S extends boolean | null | undefined | DeliveryDefaultArgs> = $Result.GetResult<Prisma.$DeliveryPayload, S>

  type DeliveryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DeliveryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DeliveryCountAggregateInputType | true
    }

  export interface DeliveryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Delivery'], meta: { name: 'Delivery' } }
    /**
     * Find zero or one Delivery that matches the filter.
     * @param {DeliveryFindUniqueArgs} args - Arguments to find a Delivery
     * @example
     * // Get one Delivery
     * const delivery = await prisma.delivery.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DeliveryFindUniqueArgs>(args: SelectSubset<T, DeliveryFindUniqueArgs<ExtArgs>>): Prisma__DeliveryClient<$Result.GetResult<Prisma.$DeliveryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Delivery that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DeliveryFindUniqueOrThrowArgs} args - Arguments to find a Delivery
     * @example
     * // Get one Delivery
     * const delivery = await prisma.delivery.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DeliveryFindUniqueOrThrowArgs>(args: SelectSubset<T, DeliveryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DeliveryClient<$Result.GetResult<Prisma.$DeliveryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Delivery that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliveryFindFirstArgs} args - Arguments to find a Delivery
     * @example
     * // Get one Delivery
     * const delivery = await prisma.delivery.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DeliveryFindFirstArgs>(args?: SelectSubset<T, DeliveryFindFirstArgs<ExtArgs>>): Prisma__DeliveryClient<$Result.GetResult<Prisma.$DeliveryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Delivery that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliveryFindFirstOrThrowArgs} args - Arguments to find a Delivery
     * @example
     * // Get one Delivery
     * const delivery = await prisma.delivery.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DeliveryFindFirstOrThrowArgs>(args?: SelectSubset<T, DeliveryFindFirstOrThrowArgs<ExtArgs>>): Prisma__DeliveryClient<$Result.GetResult<Prisma.$DeliveryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Deliveries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliveryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Deliveries
     * const deliveries = await prisma.delivery.findMany()
     * 
     * // Get first 10 Deliveries
     * const deliveries = await prisma.delivery.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const deliveryWithIdOnly = await prisma.delivery.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DeliveryFindManyArgs>(args?: SelectSubset<T, DeliveryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeliveryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Delivery.
     * @param {DeliveryCreateArgs} args - Arguments to create a Delivery.
     * @example
     * // Create one Delivery
     * const Delivery = await prisma.delivery.create({
     *   data: {
     *     // ... data to create a Delivery
     *   }
     * })
     * 
     */
    create<T extends DeliveryCreateArgs>(args: SelectSubset<T, DeliveryCreateArgs<ExtArgs>>): Prisma__DeliveryClient<$Result.GetResult<Prisma.$DeliveryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Deliveries.
     * @param {DeliveryCreateManyArgs} args - Arguments to create many Deliveries.
     * @example
     * // Create many Deliveries
     * const delivery = await prisma.delivery.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DeliveryCreateManyArgs>(args?: SelectSubset<T, DeliveryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Deliveries and returns the data saved in the database.
     * @param {DeliveryCreateManyAndReturnArgs} args - Arguments to create many Deliveries.
     * @example
     * // Create many Deliveries
     * const delivery = await prisma.delivery.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Deliveries and only return the `id`
     * const deliveryWithIdOnly = await prisma.delivery.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DeliveryCreateManyAndReturnArgs>(args?: SelectSubset<T, DeliveryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeliveryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Delivery.
     * @param {DeliveryDeleteArgs} args - Arguments to delete one Delivery.
     * @example
     * // Delete one Delivery
     * const Delivery = await prisma.delivery.delete({
     *   where: {
     *     // ... filter to delete one Delivery
     *   }
     * })
     * 
     */
    delete<T extends DeliveryDeleteArgs>(args: SelectSubset<T, DeliveryDeleteArgs<ExtArgs>>): Prisma__DeliveryClient<$Result.GetResult<Prisma.$DeliveryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Delivery.
     * @param {DeliveryUpdateArgs} args - Arguments to update one Delivery.
     * @example
     * // Update one Delivery
     * const delivery = await prisma.delivery.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DeliveryUpdateArgs>(args: SelectSubset<T, DeliveryUpdateArgs<ExtArgs>>): Prisma__DeliveryClient<$Result.GetResult<Prisma.$DeliveryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Deliveries.
     * @param {DeliveryDeleteManyArgs} args - Arguments to filter Deliveries to delete.
     * @example
     * // Delete a few Deliveries
     * const { count } = await prisma.delivery.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DeliveryDeleteManyArgs>(args?: SelectSubset<T, DeliveryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Deliveries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliveryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Deliveries
     * const delivery = await prisma.delivery.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DeliveryUpdateManyArgs>(args: SelectSubset<T, DeliveryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Deliveries and returns the data updated in the database.
     * @param {DeliveryUpdateManyAndReturnArgs} args - Arguments to update many Deliveries.
     * @example
     * // Update many Deliveries
     * const delivery = await prisma.delivery.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Deliveries and only return the `id`
     * const deliveryWithIdOnly = await prisma.delivery.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DeliveryUpdateManyAndReturnArgs>(args: SelectSubset<T, DeliveryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeliveryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Delivery.
     * @param {DeliveryUpsertArgs} args - Arguments to update or create a Delivery.
     * @example
     * // Update or create a Delivery
     * const delivery = await prisma.delivery.upsert({
     *   create: {
     *     // ... data to create a Delivery
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Delivery we want to update
     *   }
     * })
     */
    upsert<T extends DeliveryUpsertArgs>(args: SelectSubset<T, DeliveryUpsertArgs<ExtArgs>>): Prisma__DeliveryClient<$Result.GetResult<Prisma.$DeliveryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Deliveries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliveryCountArgs} args - Arguments to filter Deliveries to count.
     * @example
     * // Count the number of Deliveries
     * const count = await prisma.delivery.count({
     *   where: {
     *     // ... the filter for the Deliveries we want to count
     *   }
     * })
    **/
    count<T extends DeliveryCountArgs>(
      args?: Subset<T, DeliveryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DeliveryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Delivery.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliveryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DeliveryAggregateArgs>(args: Subset<T, DeliveryAggregateArgs>): Prisma.PrismaPromise<GetDeliveryAggregateType<T>>

    /**
     * Group by Delivery.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliveryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DeliveryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DeliveryGroupByArgs['orderBy'] }
        : { orderBy?: DeliveryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DeliveryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDeliveryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Delivery model
   */
  readonly fields: DeliveryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Delivery.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DeliveryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    route<T extends RouteDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RouteDefaultArgs<ExtArgs>>): Prisma__RouteClient<$Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    client<T extends ClientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClientDefaultArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    tenant<T extends TenantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TenantDefaultArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Delivery model
   */
  interface DeliveryFieldRefs {
    readonly id: FieldRef<"Delivery", 'String'>
    readonly sequence: FieldRef<"Delivery", 'Int'>
    readonly status: FieldRef<"Delivery", 'String'>
    readonly routeId: FieldRef<"Delivery", 'String'>
    readonly clientId: FieldRef<"Delivery", 'String'>
    readonly trackingToken: FieldRef<"Delivery", 'String'>
    readonly customerPhone: FieldRef<"Delivery", 'String'>
    readonly ratingInt: FieldRef<"Delivery", 'Int'>
    readonly ratingComment: FieldRef<"Delivery", 'String'>
    readonly actualLatitude: FieldRef<"Delivery", 'Float'>
    readonly actualLongitude: FieldRef<"Delivery", 'Float'>
    readonly gpsAccuracy: FieldRef<"Delivery", 'Float'>
    readonly gpsSpeed: FieldRef<"Delivery", 'Float'>
    readonly gpsAltitude: FieldRef<"Delivery", 'Float'>
    readonly gpsHeading: FieldRef<"Delivery", 'Float'>
    readonly deliveredAt: FieldRef<"Delivery", 'DateTime'>
    readonly photoUrl: FieldRef<"Delivery", 'String'>
    readonly signatureUrl: FieldRef<"Delivery", 'String'>
    readonly notes: FieldRef<"Delivery", 'String'>
    readonly failureReason: FieldRef<"Delivery", 'String'>
    readonly isInsideGeofence: FieldRef<"Delivery", 'Boolean'>
    readonly distanceFromClient: FieldRef<"Delivery", 'Float'>
    readonly tenantId: FieldRef<"Delivery", 'String'>
    readonly createdAt: FieldRef<"Delivery", 'DateTime'>
    readonly updatedAt: FieldRef<"Delivery", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Delivery findUnique
   */
  export type DeliveryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delivery
     */
    select?: DeliverySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Delivery
     */
    omit?: DeliveryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliveryInclude<ExtArgs> | null
    /**
     * Filter, which Delivery to fetch.
     */
    where: DeliveryWhereUniqueInput
  }

  /**
   * Delivery findUniqueOrThrow
   */
  export type DeliveryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delivery
     */
    select?: DeliverySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Delivery
     */
    omit?: DeliveryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliveryInclude<ExtArgs> | null
    /**
     * Filter, which Delivery to fetch.
     */
    where: DeliveryWhereUniqueInput
  }

  /**
   * Delivery findFirst
   */
  export type DeliveryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delivery
     */
    select?: DeliverySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Delivery
     */
    omit?: DeliveryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliveryInclude<ExtArgs> | null
    /**
     * Filter, which Delivery to fetch.
     */
    where?: DeliveryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Deliveries to fetch.
     */
    orderBy?: DeliveryOrderByWithRelationInput | DeliveryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Deliveries.
     */
    cursor?: DeliveryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Deliveries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Deliveries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Deliveries.
     */
    distinct?: DeliveryScalarFieldEnum | DeliveryScalarFieldEnum[]
  }

  /**
   * Delivery findFirstOrThrow
   */
  export type DeliveryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delivery
     */
    select?: DeliverySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Delivery
     */
    omit?: DeliveryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliveryInclude<ExtArgs> | null
    /**
     * Filter, which Delivery to fetch.
     */
    where?: DeliveryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Deliveries to fetch.
     */
    orderBy?: DeliveryOrderByWithRelationInput | DeliveryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Deliveries.
     */
    cursor?: DeliveryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Deliveries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Deliveries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Deliveries.
     */
    distinct?: DeliveryScalarFieldEnum | DeliveryScalarFieldEnum[]
  }

  /**
   * Delivery findMany
   */
  export type DeliveryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delivery
     */
    select?: DeliverySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Delivery
     */
    omit?: DeliveryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliveryInclude<ExtArgs> | null
    /**
     * Filter, which Deliveries to fetch.
     */
    where?: DeliveryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Deliveries to fetch.
     */
    orderBy?: DeliveryOrderByWithRelationInput | DeliveryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Deliveries.
     */
    cursor?: DeliveryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Deliveries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Deliveries.
     */
    skip?: number
    distinct?: DeliveryScalarFieldEnum | DeliveryScalarFieldEnum[]
  }

  /**
   * Delivery create
   */
  export type DeliveryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delivery
     */
    select?: DeliverySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Delivery
     */
    omit?: DeliveryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliveryInclude<ExtArgs> | null
    /**
     * The data needed to create a Delivery.
     */
    data: XOR<DeliveryCreateInput, DeliveryUncheckedCreateInput>
  }

  /**
   * Delivery createMany
   */
  export type DeliveryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Deliveries.
     */
    data: DeliveryCreateManyInput | DeliveryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Delivery createManyAndReturn
   */
  export type DeliveryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delivery
     */
    select?: DeliverySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Delivery
     */
    omit?: DeliveryOmit<ExtArgs> | null
    /**
     * The data used to create many Deliveries.
     */
    data: DeliveryCreateManyInput | DeliveryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliveryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Delivery update
   */
  export type DeliveryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delivery
     */
    select?: DeliverySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Delivery
     */
    omit?: DeliveryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliveryInclude<ExtArgs> | null
    /**
     * The data needed to update a Delivery.
     */
    data: XOR<DeliveryUpdateInput, DeliveryUncheckedUpdateInput>
    /**
     * Choose, which Delivery to update.
     */
    where: DeliveryWhereUniqueInput
  }

  /**
   * Delivery updateMany
   */
  export type DeliveryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Deliveries.
     */
    data: XOR<DeliveryUpdateManyMutationInput, DeliveryUncheckedUpdateManyInput>
    /**
     * Filter which Deliveries to update
     */
    where?: DeliveryWhereInput
    /**
     * Limit how many Deliveries to update.
     */
    limit?: number
  }

  /**
   * Delivery updateManyAndReturn
   */
  export type DeliveryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delivery
     */
    select?: DeliverySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Delivery
     */
    omit?: DeliveryOmit<ExtArgs> | null
    /**
     * The data used to update Deliveries.
     */
    data: XOR<DeliveryUpdateManyMutationInput, DeliveryUncheckedUpdateManyInput>
    /**
     * Filter which Deliveries to update
     */
    where?: DeliveryWhereInput
    /**
     * Limit how many Deliveries to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliveryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Delivery upsert
   */
  export type DeliveryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delivery
     */
    select?: DeliverySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Delivery
     */
    omit?: DeliveryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliveryInclude<ExtArgs> | null
    /**
     * The filter to search for the Delivery to update in case it exists.
     */
    where: DeliveryWhereUniqueInput
    /**
     * In case the Delivery found by the `where` argument doesn't exist, create a new Delivery with this data.
     */
    create: XOR<DeliveryCreateInput, DeliveryUncheckedCreateInput>
    /**
     * In case the Delivery was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DeliveryUpdateInput, DeliveryUncheckedUpdateInput>
  }

  /**
   * Delivery delete
   */
  export type DeliveryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delivery
     */
    select?: DeliverySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Delivery
     */
    omit?: DeliveryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliveryInclude<ExtArgs> | null
    /**
     * Filter which Delivery to delete.
     */
    where: DeliveryWhereUniqueInput
  }

  /**
   * Delivery deleteMany
   */
  export type DeliveryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Deliveries to delete
     */
    where?: DeliveryWhereInput
    /**
     * Limit how many Deliveries to delete.
     */
    limit?: number
  }

  /**
   * Delivery without action
   */
  export type DeliveryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delivery
     */
    select?: DeliverySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Delivery
     */
    omit?: DeliveryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliveryInclude<ExtArgs> | null
  }


  /**
   * Model LocationLog
   */

  export type AggregateLocationLog = {
    _count: LocationLogCountAggregateOutputType | null
    _avg: LocationLogAvgAggregateOutputType | null
    _sum: LocationLogSumAggregateOutputType | null
    _min: LocationLogMinAggregateOutputType | null
    _max: LocationLogMaxAggregateOutputType | null
  }

  export type LocationLogAvgAggregateOutputType = {
    latitude: number | null
    longitude: number | null
    speed: number | null
    accuracy: number | null
    altitude: number | null
    heading: number | null
  }

  export type LocationLogSumAggregateOutputType = {
    latitude: number | null
    longitude: number | null
    speed: number | null
    accuracy: number | null
    altitude: number | null
    heading: number | null
  }

  export type LocationLogMinAggregateOutputType = {
    id: string | null
    routeId: string | null
    latitude: number | null
    longitude: number | null
    speed: number | null
    accuracy: number | null
    altitude: number | null
    heading: number | null
    timestamp: Date | null
  }

  export type LocationLogMaxAggregateOutputType = {
    id: string | null
    routeId: string | null
    latitude: number | null
    longitude: number | null
    speed: number | null
    accuracy: number | null
    altitude: number | null
    heading: number | null
    timestamp: Date | null
  }

  export type LocationLogCountAggregateOutputType = {
    id: number
    routeId: number
    latitude: number
    longitude: number
    speed: number
    accuracy: number
    altitude: number
    heading: number
    timestamp: number
    _all: number
  }


  export type LocationLogAvgAggregateInputType = {
    latitude?: true
    longitude?: true
    speed?: true
    accuracy?: true
    altitude?: true
    heading?: true
  }

  export type LocationLogSumAggregateInputType = {
    latitude?: true
    longitude?: true
    speed?: true
    accuracy?: true
    altitude?: true
    heading?: true
  }

  export type LocationLogMinAggregateInputType = {
    id?: true
    routeId?: true
    latitude?: true
    longitude?: true
    speed?: true
    accuracy?: true
    altitude?: true
    heading?: true
    timestamp?: true
  }

  export type LocationLogMaxAggregateInputType = {
    id?: true
    routeId?: true
    latitude?: true
    longitude?: true
    speed?: true
    accuracy?: true
    altitude?: true
    heading?: true
    timestamp?: true
  }

  export type LocationLogCountAggregateInputType = {
    id?: true
    routeId?: true
    latitude?: true
    longitude?: true
    speed?: true
    accuracy?: true
    altitude?: true
    heading?: true
    timestamp?: true
    _all?: true
  }

  export type LocationLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LocationLog to aggregate.
     */
    where?: LocationLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LocationLogs to fetch.
     */
    orderBy?: LocationLogOrderByWithRelationInput | LocationLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LocationLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LocationLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LocationLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LocationLogs
    **/
    _count?: true | LocationLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LocationLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LocationLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LocationLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LocationLogMaxAggregateInputType
  }

  export type GetLocationLogAggregateType<T extends LocationLogAggregateArgs> = {
        [P in keyof T & keyof AggregateLocationLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLocationLog[P]>
      : GetScalarType<T[P], AggregateLocationLog[P]>
  }




  export type LocationLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LocationLogWhereInput
    orderBy?: LocationLogOrderByWithAggregationInput | LocationLogOrderByWithAggregationInput[]
    by: LocationLogScalarFieldEnum[] | LocationLogScalarFieldEnum
    having?: LocationLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LocationLogCountAggregateInputType | true
    _avg?: LocationLogAvgAggregateInputType
    _sum?: LocationLogSumAggregateInputType
    _min?: LocationLogMinAggregateInputType
    _max?: LocationLogMaxAggregateInputType
  }

  export type LocationLogGroupByOutputType = {
    id: string
    routeId: string
    latitude: number
    longitude: number
    speed: number | null
    accuracy: number | null
    altitude: number | null
    heading: number | null
    timestamp: Date
    _count: LocationLogCountAggregateOutputType | null
    _avg: LocationLogAvgAggregateOutputType | null
    _sum: LocationLogSumAggregateOutputType | null
    _min: LocationLogMinAggregateOutputType | null
    _max: LocationLogMaxAggregateOutputType | null
  }

  type GetLocationLogGroupByPayload<T extends LocationLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LocationLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LocationLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LocationLogGroupByOutputType[P]>
            : GetScalarType<T[P], LocationLogGroupByOutputType[P]>
        }
      >
    >


  export type LocationLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    routeId?: boolean
    latitude?: boolean
    longitude?: boolean
    speed?: boolean
    accuracy?: boolean
    altitude?: boolean
    heading?: boolean
    timestamp?: boolean
    route?: boolean | RouteDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["locationLog"]>

  export type LocationLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    routeId?: boolean
    latitude?: boolean
    longitude?: boolean
    speed?: boolean
    accuracy?: boolean
    altitude?: boolean
    heading?: boolean
    timestamp?: boolean
    route?: boolean | RouteDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["locationLog"]>

  export type LocationLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    routeId?: boolean
    latitude?: boolean
    longitude?: boolean
    speed?: boolean
    accuracy?: boolean
    altitude?: boolean
    heading?: boolean
    timestamp?: boolean
    route?: boolean | RouteDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["locationLog"]>

  export type LocationLogSelectScalar = {
    id?: boolean
    routeId?: boolean
    latitude?: boolean
    longitude?: boolean
    speed?: boolean
    accuracy?: boolean
    altitude?: boolean
    heading?: boolean
    timestamp?: boolean
  }

  export type LocationLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "routeId" | "latitude" | "longitude" | "speed" | "accuracy" | "altitude" | "heading" | "timestamp", ExtArgs["result"]["locationLog"]>
  export type LocationLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    route?: boolean | RouteDefaultArgs<ExtArgs>
  }
  export type LocationLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    route?: boolean | RouteDefaultArgs<ExtArgs>
  }
  export type LocationLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    route?: boolean | RouteDefaultArgs<ExtArgs>
  }

  export type $LocationLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LocationLog"
    objects: {
      route: Prisma.$RoutePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      routeId: string
      latitude: number
      longitude: number
      speed: number | null
      accuracy: number | null
      altitude: number | null
      heading: number | null
      timestamp: Date
    }, ExtArgs["result"]["locationLog"]>
    composites: {}
  }

  type LocationLogGetPayload<S extends boolean | null | undefined | LocationLogDefaultArgs> = $Result.GetResult<Prisma.$LocationLogPayload, S>

  type LocationLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LocationLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LocationLogCountAggregateInputType | true
    }

  export interface LocationLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LocationLog'], meta: { name: 'LocationLog' } }
    /**
     * Find zero or one LocationLog that matches the filter.
     * @param {LocationLogFindUniqueArgs} args - Arguments to find a LocationLog
     * @example
     * // Get one LocationLog
     * const locationLog = await prisma.locationLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LocationLogFindUniqueArgs>(args: SelectSubset<T, LocationLogFindUniqueArgs<ExtArgs>>): Prisma__LocationLogClient<$Result.GetResult<Prisma.$LocationLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LocationLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LocationLogFindUniqueOrThrowArgs} args - Arguments to find a LocationLog
     * @example
     * // Get one LocationLog
     * const locationLog = await prisma.locationLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LocationLogFindUniqueOrThrowArgs>(args: SelectSubset<T, LocationLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LocationLogClient<$Result.GetResult<Prisma.$LocationLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LocationLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationLogFindFirstArgs} args - Arguments to find a LocationLog
     * @example
     * // Get one LocationLog
     * const locationLog = await prisma.locationLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LocationLogFindFirstArgs>(args?: SelectSubset<T, LocationLogFindFirstArgs<ExtArgs>>): Prisma__LocationLogClient<$Result.GetResult<Prisma.$LocationLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LocationLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationLogFindFirstOrThrowArgs} args - Arguments to find a LocationLog
     * @example
     * // Get one LocationLog
     * const locationLog = await prisma.locationLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LocationLogFindFirstOrThrowArgs>(args?: SelectSubset<T, LocationLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__LocationLogClient<$Result.GetResult<Prisma.$LocationLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LocationLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LocationLogs
     * const locationLogs = await prisma.locationLog.findMany()
     * 
     * // Get first 10 LocationLogs
     * const locationLogs = await prisma.locationLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const locationLogWithIdOnly = await prisma.locationLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LocationLogFindManyArgs>(args?: SelectSubset<T, LocationLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocationLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LocationLog.
     * @param {LocationLogCreateArgs} args - Arguments to create a LocationLog.
     * @example
     * // Create one LocationLog
     * const LocationLog = await prisma.locationLog.create({
     *   data: {
     *     // ... data to create a LocationLog
     *   }
     * })
     * 
     */
    create<T extends LocationLogCreateArgs>(args: SelectSubset<T, LocationLogCreateArgs<ExtArgs>>): Prisma__LocationLogClient<$Result.GetResult<Prisma.$LocationLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LocationLogs.
     * @param {LocationLogCreateManyArgs} args - Arguments to create many LocationLogs.
     * @example
     * // Create many LocationLogs
     * const locationLog = await prisma.locationLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LocationLogCreateManyArgs>(args?: SelectSubset<T, LocationLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LocationLogs and returns the data saved in the database.
     * @param {LocationLogCreateManyAndReturnArgs} args - Arguments to create many LocationLogs.
     * @example
     * // Create many LocationLogs
     * const locationLog = await prisma.locationLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LocationLogs and only return the `id`
     * const locationLogWithIdOnly = await prisma.locationLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LocationLogCreateManyAndReturnArgs>(args?: SelectSubset<T, LocationLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocationLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LocationLog.
     * @param {LocationLogDeleteArgs} args - Arguments to delete one LocationLog.
     * @example
     * // Delete one LocationLog
     * const LocationLog = await prisma.locationLog.delete({
     *   where: {
     *     // ... filter to delete one LocationLog
     *   }
     * })
     * 
     */
    delete<T extends LocationLogDeleteArgs>(args: SelectSubset<T, LocationLogDeleteArgs<ExtArgs>>): Prisma__LocationLogClient<$Result.GetResult<Prisma.$LocationLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LocationLog.
     * @param {LocationLogUpdateArgs} args - Arguments to update one LocationLog.
     * @example
     * // Update one LocationLog
     * const locationLog = await prisma.locationLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LocationLogUpdateArgs>(args: SelectSubset<T, LocationLogUpdateArgs<ExtArgs>>): Prisma__LocationLogClient<$Result.GetResult<Prisma.$LocationLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LocationLogs.
     * @param {LocationLogDeleteManyArgs} args - Arguments to filter LocationLogs to delete.
     * @example
     * // Delete a few LocationLogs
     * const { count } = await prisma.locationLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LocationLogDeleteManyArgs>(args?: SelectSubset<T, LocationLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LocationLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LocationLogs
     * const locationLog = await prisma.locationLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LocationLogUpdateManyArgs>(args: SelectSubset<T, LocationLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LocationLogs and returns the data updated in the database.
     * @param {LocationLogUpdateManyAndReturnArgs} args - Arguments to update many LocationLogs.
     * @example
     * // Update many LocationLogs
     * const locationLog = await prisma.locationLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LocationLogs and only return the `id`
     * const locationLogWithIdOnly = await prisma.locationLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LocationLogUpdateManyAndReturnArgs>(args: SelectSubset<T, LocationLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocationLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LocationLog.
     * @param {LocationLogUpsertArgs} args - Arguments to update or create a LocationLog.
     * @example
     * // Update or create a LocationLog
     * const locationLog = await prisma.locationLog.upsert({
     *   create: {
     *     // ... data to create a LocationLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LocationLog we want to update
     *   }
     * })
     */
    upsert<T extends LocationLogUpsertArgs>(args: SelectSubset<T, LocationLogUpsertArgs<ExtArgs>>): Prisma__LocationLogClient<$Result.GetResult<Prisma.$LocationLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LocationLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationLogCountArgs} args - Arguments to filter LocationLogs to count.
     * @example
     * // Count the number of LocationLogs
     * const count = await prisma.locationLog.count({
     *   where: {
     *     // ... the filter for the LocationLogs we want to count
     *   }
     * })
    **/
    count<T extends LocationLogCountArgs>(
      args?: Subset<T, LocationLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LocationLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LocationLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LocationLogAggregateArgs>(args: Subset<T, LocationLogAggregateArgs>): Prisma.PrismaPromise<GetLocationLogAggregateType<T>>

    /**
     * Group by LocationLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LocationLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LocationLogGroupByArgs['orderBy'] }
        : { orderBy?: LocationLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LocationLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLocationLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LocationLog model
   */
  readonly fields: LocationLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LocationLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LocationLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    route<T extends RouteDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RouteDefaultArgs<ExtArgs>>): Prisma__RouteClient<$Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LocationLog model
   */
  interface LocationLogFieldRefs {
    readonly id: FieldRef<"LocationLog", 'String'>
    readonly routeId: FieldRef<"LocationLog", 'String'>
    readonly latitude: FieldRef<"LocationLog", 'Float'>
    readonly longitude: FieldRef<"LocationLog", 'Float'>
    readonly speed: FieldRef<"LocationLog", 'Float'>
    readonly accuracy: FieldRef<"LocationLog", 'Float'>
    readonly altitude: FieldRef<"LocationLog", 'Float'>
    readonly heading: FieldRef<"LocationLog", 'Float'>
    readonly timestamp: FieldRef<"LocationLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LocationLog findUnique
   */
  export type LocationLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationLog
     */
    select?: LocationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LocationLog
     */
    omit?: LocationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationLogInclude<ExtArgs> | null
    /**
     * Filter, which LocationLog to fetch.
     */
    where: LocationLogWhereUniqueInput
  }

  /**
   * LocationLog findUniqueOrThrow
   */
  export type LocationLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationLog
     */
    select?: LocationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LocationLog
     */
    omit?: LocationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationLogInclude<ExtArgs> | null
    /**
     * Filter, which LocationLog to fetch.
     */
    where: LocationLogWhereUniqueInput
  }

  /**
   * LocationLog findFirst
   */
  export type LocationLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationLog
     */
    select?: LocationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LocationLog
     */
    omit?: LocationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationLogInclude<ExtArgs> | null
    /**
     * Filter, which LocationLog to fetch.
     */
    where?: LocationLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LocationLogs to fetch.
     */
    orderBy?: LocationLogOrderByWithRelationInput | LocationLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LocationLogs.
     */
    cursor?: LocationLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LocationLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LocationLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LocationLogs.
     */
    distinct?: LocationLogScalarFieldEnum | LocationLogScalarFieldEnum[]
  }

  /**
   * LocationLog findFirstOrThrow
   */
  export type LocationLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationLog
     */
    select?: LocationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LocationLog
     */
    omit?: LocationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationLogInclude<ExtArgs> | null
    /**
     * Filter, which LocationLog to fetch.
     */
    where?: LocationLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LocationLogs to fetch.
     */
    orderBy?: LocationLogOrderByWithRelationInput | LocationLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LocationLogs.
     */
    cursor?: LocationLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LocationLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LocationLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LocationLogs.
     */
    distinct?: LocationLogScalarFieldEnum | LocationLogScalarFieldEnum[]
  }

  /**
   * LocationLog findMany
   */
  export type LocationLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationLog
     */
    select?: LocationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LocationLog
     */
    omit?: LocationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationLogInclude<ExtArgs> | null
    /**
     * Filter, which LocationLogs to fetch.
     */
    where?: LocationLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LocationLogs to fetch.
     */
    orderBy?: LocationLogOrderByWithRelationInput | LocationLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LocationLogs.
     */
    cursor?: LocationLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LocationLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LocationLogs.
     */
    skip?: number
    distinct?: LocationLogScalarFieldEnum | LocationLogScalarFieldEnum[]
  }

  /**
   * LocationLog create
   */
  export type LocationLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationLog
     */
    select?: LocationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LocationLog
     */
    omit?: LocationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationLogInclude<ExtArgs> | null
    /**
     * The data needed to create a LocationLog.
     */
    data: XOR<LocationLogCreateInput, LocationLogUncheckedCreateInput>
  }

  /**
   * LocationLog createMany
   */
  export type LocationLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LocationLogs.
     */
    data: LocationLogCreateManyInput | LocationLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LocationLog createManyAndReturn
   */
  export type LocationLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationLog
     */
    select?: LocationLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LocationLog
     */
    omit?: LocationLogOmit<ExtArgs> | null
    /**
     * The data used to create many LocationLogs.
     */
    data: LocationLogCreateManyInput | LocationLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * LocationLog update
   */
  export type LocationLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationLog
     */
    select?: LocationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LocationLog
     */
    omit?: LocationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationLogInclude<ExtArgs> | null
    /**
     * The data needed to update a LocationLog.
     */
    data: XOR<LocationLogUpdateInput, LocationLogUncheckedUpdateInput>
    /**
     * Choose, which LocationLog to update.
     */
    where: LocationLogWhereUniqueInput
  }

  /**
   * LocationLog updateMany
   */
  export type LocationLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LocationLogs.
     */
    data: XOR<LocationLogUpdateManyMutationInput, LocationLogUncheckedUpdateManyInput>
    /**
     * Filter which LocationLogs to update
     */
    where?: LocationLogWhereInput
    /**
     * Limit how many LocationLogs to update.
     */
    limit?: number
  }

  /**
   * LocationLog updateManyAndReturn
   */
  export type LocationLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationLog
     */
    select?: LocationLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LocationLog
     */
    omit?: LocationLogOmit<ExtArgs> | null
    /**
     * The data used to update LocationLogs.
     */
    data: XOR<LocationLogUpdateManyMutationInput, LocationLogUncheckedUpdateManyInput>
    /**
     * Filter which LocationLogs to update
     */
    where?: LocationLogWhereInput
    /**
     * Limit how many LocationLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * LocationLog upsert
   */
  export type LocationLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationLog
     */
    select?: LocationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LocationLog
     */
    omit?: LocationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationLogInclude<ExtArgs> | null
    /**
     * The filter to search for the LocationLog to update in case it exists.
     */
    where: LocationLogWhereUniqueInput
    /**
     * In case the LocationLog found by the `where` argument doesn't exist, create a new LocationLog with this data.
     */
    create: XOR<LocationLogCreateInput, LocationLogUncheckedCreateInput>
    /**
     * In case the LocationLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LocationLogUpdateInput, LocationLogUncheckedUpdateInput>
  }

  /**
   * LocationLog delete
   */
  export type LocationLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationLog
     */
    select?: LocationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LocationLog
     */
    omit?: LocationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationLogInclude<ExtArgs> | null
    /**
     * Filter which LocationLog to delete.
     */
    where: LocationLogWhereUniqueInput
  }

  /**
   * LocationLog deleteMany
   */
  export type LocationLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LocationLogs to delete
     */
    where?: LocationLogWhereInput
    /**
     * Limit how many LocationLogs to delete.
     */
    limit?: number
  }

  /**
   * LocationLog without action
   */
  export type LocationLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationLog
     */
    select?: LocationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LocationLog
     */
    omit?: LocationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationLogInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const TenantScalarFieldEnum: {
    id: 'id',
    name: 'name',
    address: 'address',
    cep: 'cep',
    latitude: 'latitude',
    longitude: 'longitude',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    trialStartedAt: 'trialStartedAt',
    trialEndsAt: 'trialEndsAt',
    stripeCustomerId: 'stripeCustomerId',
    subscriptionId: 'subscriptionId',
    subscriptionStatus: 'subscriptionStatus',
    subscriptionEnd: 'subscriptionEnd'
  };

  export type TenantScalarFieldEnum = (typeof TenantScalarFieldEnum)[keyof typeof TenantScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    name: 'name',
    avatarUrl: 'avatarUrl',
    role: 'role',
    status: 'status',
    tenantId: 'tenantId',
    resetPasswordToken: 'resetPasswordToken',
    resetPasswordExp: 'resetPasswordExp',
    mustChangePassword: 'mustChangePassword',
    resetRequested: 'resetRequested',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const RefreshTokenScalarFieldEnum: {
    id: 'id',
    token: 'token',
    userId: 'userId',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt'
  };

  export type RefreshTokenScalarFieldEnum = (typeof RefreshTokenScalarFieldEnum)[keyof typeof RefreshTokenScalarFieldEnum]


  export const VehicleScalarFieldEnum: {
    id: 'id',
    plate: 'plate',
    model: 'model',
    consumption: 'consumption',
    tenantId: 'tenantId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type VehicleScalarFieldEnum = (typeof VehicleScalarFieldEnum)[keyof typeof VehicleScalarFieldEnum]


  export const ClientScalarFieldEnum: {
    id: 'id',
    name: 'name',
    contactName: 'contactName',
    phone: 'phone',
    address: 'address',
    cep: 'cep',
    latitude: 'latitude',
    longitude: 'longitude',
    geofenceRadius: 'geofenceRadius',
    tenantId: 'tenantId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ClientScalarFieldEnum = (typeof ClientScalarFieldEnum)[keyof typeof ClientScalarFieldEnum]


  export const RouteScalarFieldEnum: {
    id: 'id',
    name: 'name',
    status: 'status',
    date: 'date',
    plannedDistance: 'plannedDistance',
    plannedTime: 'plannedTime',
    driverId: 'driverId',
    vehicleId: 'vehicleId',
    tenantId: 'tenantId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    returnToDepot: 'returnToDepot'
  };

  export type RouteScalarFieldEnum = (typeof RouteScalarFieldEnum)[keyof typeof RouteScalarFieldEnum]


  export const DeliveryScalarFieldEnum: {
    id: 'id',
    sequence: 'sequence',
    status: 'status',
    routeId: 'routeId',
    clientId: 'clientId',
    trackingToken: 'trackingToken',
    customerPhone: 'customerPhone',
    ratingInt: 'ratingInt',
    ratingComment: 'ratingComment',
    actualLatitude: 'actualLatitude',
    actualLongitude: 'actualLongitude',
    gpsAccuracy: 'gpsAccuracy',
    gpsSpeed: 'gpsSpeed',
    gpsAltitude: 'gpsAltitude',
    gpsHeading: 'gpsHeading',
    deliveredAt: 'deliveredAt',
    photoUrl: 'photoUrl',
    signatureUrl: 'signatureUrl',
    notes: 'notes',
    failureReason: 'failureReason',
    isInsideGeofence: 'isInsideGeofence',
    distanceFromClient: 'distanceFromClient',
    tenantId: 'tenantId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DeliveryScalarFieldEnum = (typeof DeliveryScalarFieldEnum)[keyof typeof DeliveryScalarFieldEnum]


  export const LocationLogScalarFieldEnum: {
    id: 'id',
    routeId: 'routeId',
    latitude: 'latitude',
    longitude: 'longitude',
    speed: 'speed',
    accuracy: 'accuracy',
    altitude: 'altitude',
    heading: 'heading',
    timestamp: 'timestamp'
  };

  export type LocationLogScalarFieldEnum = (typeof LocationLogScalarFieldEnum)[keyof typeof LocationLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type TenantWhereInput = {
    AND?: TenantWhereInput | TenantWhereInput[]
    OR?: TenantWhereInput[]
    NOT?: TenantWhereInput | TenantWhereInput[]
    id?: StringFilter<"Tenant"> | string
    name?: StringFilter<"Tenant"> | string
    address?: StringNullableFilter<"Tenant"> | string | null
    cep?: StringNullableFilter<"Tenant"> | string | null
    latitude?: FloatNullableFilter<"Tenant"> | number | null
    longitude?: FloatNullableFilter<"Tenant"> | number | null
    createdAt?: DateTimeFilter<"Tenant"> | Date | string
    updatedAt?: DateTimeFilter<"Tenant"> | Date | string
    trialStartedAt?: DateTimeNullableFilter<"Tenant"> | Date | string | null
    trialEndsAt?: DateTimeNullableFilter<"Tenant"> | Date | string | null
    stripeCustomerId?: StringNullableFilter<"Tenant"> | string | null
    subscriptionId?: StringNullableFilter<"Tenant"> | string | null
    subscriptionStatus?: StringFilter<"Tenant"> | string
    subscriptionEnd?: DateTimeNullableFilter<"Tenant"> | Date | string | null
    users?: UserListRelationFilter
    vehicles?: VehicleListRelationFilter
    clients?: ClientListRelationFilter
    routes?: RouteListRelationFilter
    deliveries?: DeliveryListRelationFilter
  }

  export type TenantOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrderInput | SortOrder
    cep?: SortOrderInput | SortOrder
    latitude?: SortOrderInput | SortOrder
    longitude?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    trialStartedAt?: SortOrderInput | SortOrder
    trialEndsAt?: SortOrderInput | SortOrder
    stripeCustomerId?: SortOrderInput | SortOrder
    subscriptionId?: SortOrderInput | SortOrder
    subscriptionStatus?: SortOrder
    subscriptionEnd?: SortOrderInput | SortOrder
    users?: UserOrderByRelationAggregateInput
    vehicles?: VehicleOrderByRelationAggregateInput
    clients?: ClientOrderByRelationAggregateInput
    routes?: RouteOrderByRelationAggregateInput
    deliveries?: DeliveryOrderByRelationAggregateInput
  }

  export type TenantWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TenantWhereInput | TenantWhereInput[]
    OR?: TenantWhereInput[]
    NOT?: TenantWhereInput | TenantWhereInput[]
    name?: StringFilter<"Tenant"> | string
    address?: StringNullableFilter<"Tenant"> | string | null
    cep?: StringNullableFilter<"Tenant"> | string | null
    latitude?: FloatNullableFilter<"Tenant"> | number | null
    longitude?: FloatNullableFilter<"Tenant"> | number | null
    createdAt?: DateTimeFilter<"Tenant"> | Date | string
    updatedAt?: DateTimeFilter<"Tenant"> | Date | string
    trialStartedAt?: DateTimeNullableFilter<"Tenant"> | Date | string | null
    trialEndsAt?: DateTimeNullableFilter<"Tenant"> | Date | string | null
    stripeCustomerId?: StringNullableFilter<"Tenant"> | string | null
    subscriptionId?: StringNullableFilter<"Tenant"> | string | null
    subscriptionStatus?: StringFilter<"Tenant"> | string
    subscriptionEnd?: DateTimeNullableFilter<"Tenant"> | Date | string | null
    users?: UserListRelationFilter
    vehicles?: VehicleListRelationFilter
    clients?: ClientListRelationFilter
    routes?: RouteListRelationFilter
    deliveries?: DeliveryListRelationFilter
  }, "id">

  export type TenantOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrderInput | SortOrder
    cep?: SortOrderInput | SortOrder
    latitude?: SortOrderInput | SortOrder
    longitude?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    trialStartedAt?: SortOrderInput | SortOrder
    trialEndsAt?: SortOrderInput | SortOrder
    stripeCustomerId?: SortOrderInput | SortOrder
    subscriptionId?: SortOrderInput | SortOrder
    subscriptionStatus?: SortOrder
    subscriptionEnd?: SortOrderInput | SortOrder
    _count?: TenantCountOrderByAggregateInput
    _avg?: TenantAvgOrderByAggregateInput
    _max?: TenantMaxOrderByAggregateInput
    _min?: TenantMinOrderByAggregateInput
    _sum?: TenantSumOrderByAggregateInput
  }

  export type TenantScalarWhereWithAggregatesInput = {
    AND?: TenantScalarWhereWithAggregatesInput | TenantScalarWhereWithAggregatesInput[]
    OR?: TenantScalarWhereWithAggregatesInput[]
    NOT?: TenantScalarWhereWithAggregatesInput | TenantScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Tenant"> | string
    name?: StringWithAggregatesFilter<"Tenant"> | string
    address?: StringNullableWithAggregatesFilter<"Tenant"> | string | null
    cep?: StringNullableWithAggregatesFilter<"Tenant"> | string | null
    latitude?: FloatNullableWithAggregatesFilter<"Tenant"> | number | null
    longitude?: FloatNullableWithAggregatesFilter<"Tenant"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"Tenant"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Tenant"> | Date | string
    trialStartedAt?: DateTimeNullableWithAggregatesFilter<"Tenant"> | Date | string | null
    trialEndsAt?: DateTimeNullableWithAggregatesFilter<"Tenant"> | Date | string | null
    stripeCustomerId?: StringNullableWithAggregatesFilter<"Tenant"> | string | null
    subscriptionId?: StringNullableWithAggregatesFilter<"Tenant"> | string | null
    subscriptionStatus?: StringWithAggregatesFilter<"Tenant"> | string
    subscriptionEnd?: DateTimeNullableWithAggregatesFilter<"Tenant"> | Date | string | null
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    avatarUrl?: StringNullableFilter<"User"> | string | null
    role?: StringFilter<"User"> | string
    status?: StringFilter<"User"> | string
    tenantId?: StringFilter<"User"> | string
    resetPasswordToken?: StringNullableFilter<"User"> | string | null
    resetPasswordExp?: DateTimeNullableFilter<"User"> | Date | string | null
    mustChangePassword?: BoolFilter<"User"> | boolean
    resetRequested?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
    routes?: RouteListRelationFilter
    refreshTokens?: RefreshTokenListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    role?: SortOrder
    status?: SortOrder
    tenantId?: SortOrder
    resetPasswordToken?: SortOrderInput | SortOrder
    resetPasswordExp?: SortOrderInput | SortOrder
    mustChangePassword?: SortOrder
    resetRequested?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tenant?: TenantOrderByWithRelationInput
    routes?: RouteOrderByRelationAggregateInput
    refreshTokens?: RefreshTokenOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    resetPasswordToken?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    avatarUrl?: StringNullableFilter<"User"> | string | null
    role?: StringFilter<"User"> | string
    status?: StringFilter<"User"> | string
    tenantId?: StringFilter<"User"> | string
    resetPasswordExp?: DateTimeNullableFilter<"User"> | Date | string | null
    mustChangePassword?: BoolFilter<"User"> | boolean
    resetRequested?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
    routes?: RouteListRelationFilter
    refreshTokens?: RefreshTokenListRelationFilter
  }, "id" | "email" | "resetPasswordToken">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    role?: SortOrder
    status?: SortOrder
    tenantId?: SortOrder
    resetPasswordToken?: SortOrderInput | SortOrder
    resetPasswordExp?: SortOrderInput | SortOrder
    mustChangePassword?: SortOrder
    resetRequested?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    avatarUrl?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: StringWithAggregatesFilter<"User"> | string
    status?: StringWithAggregatesFilter<"User"> | string
    tenantId?: StringWithAggregatesFilter<"User"> | string
    resetPasswordToken?: StringNullableWithAggregatesFilter<"User"> | string | null
    resetPasswordExp?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    mustChangePassword?: BoolWithAggregatesFilter<"User"> | boolean
    resetRequested?: BoolWithAggregatesFilter<"User"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type RefreshTokenWhereInput = {
    AND?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    OR?: RefreshTokenWhereInput[]
    NOT?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    id?: StringFilter<"RefreshToken"> | string
    token?: StringFilter<"RefreshToken"> | string
    userId?: StringFilter<"RefreshToken"> | string
    expiresAt?: DateTimeFilter<"RefreshToken"> | Date | string
    createdAt?: DateTimeFilter<"RefreshToken"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type RefreshTokenOrderByWithRelationInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type RefreshTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    OR?: RefreshTokenWhereInput[]
    NOT?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    userId?: StringFilter<"RefreshToken"> | string
    expiresAt?: DateTimeFilter<"RefreshToken"> | Date | string
    createdAt?: DateTimeFilter<"RefreshToken"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "token">

  export type RefreshTokenOrderByWithAggregationInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    _count?: RefreshTokenCountOrderByAggregateInput
    _max?: RefreshTokenMaxOrderByAggregateInput
    _min?: RefreshTokenMinOrderByAggregateInput
  }

  export type RefreshTokenScalarWhereWithAggregatesInput = {
    AND?: RefreshTokenScalarWhereWithAggregatesInput | RefreshTokenScalarWhereWithAggregatesInput[]
    OR?: RefreshTokenScalarWhereWithAggregatesInput[]
    NOT?: RefreshTokenScalarWhereWithAggregatesInput | RefreshTokenScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RefreshToken"> | string
    token?: StringWithAggregatesFilter<"RefreshToken"> | string
    userId?: StringWithAggregatesFilter<"RefreshToken"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"RefreshToken"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"RefreshToken"> | Date | string
  }

  export type VehicleWhereInput = {
    AND?: VehicleWhereInput | VehicleWhereInput[]
    OR?: VehicleWhereInput[]
    NOT?: VehicleWhereInput | VehicleWhereInput[]
    id?: StringFilter<"Vehicle"> | string
    plate?: StringFilter<"Vehicle"> | string
    model?: StringFilter<"Vehicle"> | string
    consumption?: FloatFilter<"Vehicle"> | number
    tenantId?: StringFilter<"Vehicle"> | string
    createdAt?: DateTimeFilter<"Vehicle"> | Date | string
    updatedAt?: DateTimeFilter<"Vehicle"> | Date | string
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
    routes?: RouteListRelationFilter
  }

  export type VehicleOrderByWithRelationInput = {
    id?: SortOrder
    plate?: SortOrder
    model?: SortOrder
    consumption?: SortOrder
    tenantId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tenant?: TenantOrderByWithRelationInput
    routes?: RouteOrderByRelationAggregateInput
  }

  export type VehicleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    plate?: string
    AND?: VehicleWhereInput | VehicleWhereInput[]
    OR?: VehicleWhereInput[]
    NOT?: VehicleWhereInput | VehicleWhereInput[]
    model?: StringFilter<"Vehicle"> | string
    consumption?: FloatFilter<"Vehicle"> | number
    tenantId?: StringFilter<"Vehicle"> | string
    createdAt?: DateTimeFilter<"Vehicle"> | Date | string
    updatedAt?: DateTimeFilter<"Vehicle"> | Date | string
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
    routes?: RouteListRelationFilter
  }, "id" | "plate">

  export type VehicleOrderByWithAggregationInput = {
    id?: SortOrder
    plate?: SortOrder
    model?: SortOrder
    consumption?: SortOrder
    tenantId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: VehicleCountOrderByAggregateInput
    _avg?: VehicleAvgOrderByAggregateInput
    _max?: VehicleMaxOrderByAggregateInput
    _min?: VehicleMinOrderByAggregateInput
    _sum?: VehicleSumOrderByAggregateInput
  }

  export type VehicleScalarWhereWithAggregatesInput = {
    AND?: VehicleScalarWhereWithAggregatesInput | VehicleScalarWhereWithAggregatesInput[]
    OR?: VehicleScalarWhereWithAggregatesInput[]
    NOT?: VehicleScalarWhereWithAggregatesInput | VehicleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Vehicle"> | string
    plate?: StringWithAggregatesFilter<"Vehicle"> | string
    model?: StringWithAggregatesFilter<"Vehicle"> | string
    consumption?: FloatWithAggregatesFilter<"Vehicle"> | number
    tenantId?: StringWithAggregatesFilter<"Vehicle"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Vehicle"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Vehicle"> | Date | string
  }

  export type ClientWhereInput = {
    AND?: ClientWhereInput | ClientWhereInput[]
    OR?: ClientWhereInput[]
    NOT?: ClientWhereInput | ClientWhereInput[]
    id?: StringFilter<"Client"> | string
    name?: StringFilter<"Client"> | string
    contactName?: StringNullableFilter<"Client"> | string | null
    phone?: StringNullableFilter<"Client"> | string | null
    address?: StringFilter<"Client"> | string
    cep?: StringNullableFilter<"Client"> | string | null
    latitude?: FloatFilter<"Client"> | number
    longitude?: FloatFilter<"Client"> | number
    geofenceRadius?: FloatFilter<"Client"> | number
    tenantId?: StringFilter<"Client"> | string
    createdAt?: DateTimeFilter<"Client"> | Date | string
    updatedAt?: DateTimeFilter<"Client"> | Date | string
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
    deliveries?: DeliveryListRelationFilter
  }

  export type ClientOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    contactName?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    address?: SortOrder
    cep?: SortOrderInput | SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    geofenceRadius?: SortOrder
    tenantId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tenant?: TenantOrderByWithRelationInput
    deliveries?: DeliveryOrderByRelationAggregateInput
  }

  export type ClientWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ClientWhereInput | ClientWhereInput[]
    OR?: ClientWhereInput[]
    NOT?: ClientWhereInput | ClientWhereInput[]
    name?: StringFilter<"Client"> | string
    contactName?: StringNullableFilter<"Client"> | string | null
    phone?: StringNullableFilter<"Client"> | string | null
    address?: StringFilter<"Client"> | string
    cep?: StringNullableFilter<"Client"> | string | null
    latitude?: FloatFilter<"Client"> | number
    longitude?: FloatFilter<"Client"> | number
    geofenceRadius?: FloatFilter<"Client"> | number
    tenantId?: StringFilter<"Client"> | string
    createdAt?: DateTimeFilter<"Client"> | Date | string
    updatedAt?: DateTimeFilter<"Client"> | Date | string
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
    deliveries?: DeliveryListRelationFilter
  }, "id">

  export type ClientOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    contactName?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    address?: SortOrder
    cep?: SortOrderInput | SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    geofenceRadius?: SortOrder
    tenantId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ClientCountOrderByAggregateInput
    _avg?: ClientAvgOrderByAggregateInput
    _max?: ClientMaxOrderByAggregateInput
    _min?: ClientMinOrderByAggregateInput
    _sum?: ClientSumOrderByAggregateInput
  }

  export type ClientScalarWhereWithAggregatesInput = {
    AND?: ClientScalarWhereWithAggregatesInput | ClientScalarWhereWithAggregatesInput[]
    OR?: ClientScalarWhereWithAggregatesInput[]
    NOT?: ClientScalarWhereWithAggregatesInput | ClientScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Client"> | string
    name?: StringWithAggregatesFilter<"Client"> | string
    contactName?: StringNullableWithAggregatesFilter<"Client"> | string | null
    phone?: StringNullableWithAggregatesFilter<"Client"> | string | null
    address?: StringWithAggregatesFilter<"Client"> | string
    cep?: StringNullableWithAggregatesFilter<"Client"> | string | null
    latitude?: FloatWithAggregatesFilter<"Client"> | number
    longitude?: FloatWithAggregatesFilter<"Client"> | number
    geofenceRadius?: FloatWithAggregatesFilter<"Client"> | number
    tenantId?: StringWithAggregatesFilter<"Client"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Client"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Client"> | Date | string
  }

  export type RouteWhereInput = {
    AND?: RouteWhereInput | RouteWhereInput[]
    OR?: RouteWhereInput[]
    NOT?: RouteWhereInput | RouteWhereInput[]
    id?: StringFilter<"Route"> | string
    name?: StringFilter<"Route"> | string
    status?: StringFilter<"Route"> | string
    date?: DateTimeFilter<"Route"> | Date | string
    plannedDistance?: FloatFilter<"Route"> | number
    plannedTime?: FloatFilter<"Route"> | number
    driverId?: StringFilter<"Route"> | string
    vehicleId?: StringFilter<"Route"> | string
    tenantId?: StringFilter<"Route"> | string
    createdAt?: DateTimeFilter<"Route"> | Date | string
    updatedAt?: DateTimeFilter<"Route"> | Date | string
    returnToDepot?: BoolFilter<"Route"> | boolean
    driver?: XOR<UserScalarRelationFilter, UserWhereInput>
    vehicle?: XOR<VehicleScalarRelationFilter, VehicleWhereInput>
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
    deliveries?: DeliveryListRelationFilter
    locationLogs?: LocationLogListRelationFilter
  }

  export type RouteOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    status?: SortOrder
    date?: SortOrder
    plannedDistance?: SortOrder
    plannedTime?: SortOrder
    driverId?: SortOrder
    vehicleId?: SortOrder
    tenantId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    returnToDepot?: SortOrder
    driver?: UserOrderByWithRelationInput
    vehicle?: VehicleOrderByWithRelationInput
    tenant?: TenantOrderByWithRelationInput
    deliveries?: DeliveryOrderByRelationAggregateInput
    locationLogs?: LocationLogOrderByRelationAggregateInput
  }

  export type RouteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RouteWhereInput | RouteWhereInput[]
    OR?: RouteWhereInput[]
    NOT?: RouteWhereInput | RouteWhereInput[]
    name?: StringFilter<"Route"> | string
    status?: StringFilter<"Route"> | string
    date?: DateTimeFilter<"Route"> | Date | string
    plannedDistance?: FloatFilter<"Route"> | number
    plannedTime?: FloatFilter<"Route"> | number
    driverId?: StringFilter<"Route"> | string
    vehicleId?: StringFilter<"Route"> | string
    tenantId?: StringFilter<"Route"> | string
    createdAt?: DateTimeFilter<"Route"> | Date | string
    updatedAt?: DateTimeFilter<"Route"> | Date | string
    returnToDepot?: BoolFilter<"Route"> | boolean
    driver?: XOR<UserScalarRelationFilter, UserWhereInput>
    vehicle?: XOR<VehicleScalarRelationFilter, VehicleWhereInput>
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
    deliveries?: DeliveryListRelationFilter
    locationLogs?: LocationLogListRelationFilter
  }, "id">

  export type RouteOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    status?: SortOrder
    date?: SortOrder
    plannedDistance?: SortOrder
    plannedTime?: SortOrder
    driverId?: SortOrder
    vehicleId?: SortOrder
    tenantId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    returnToDepot?: SortOrder
    _count?: RouteCountOrderByAggregateInput
    _avg?: RouteAvgOrderByAggregateInput
    _max?: RouteMaxOrderByAggregateInput
    _min?: RouteMinOrderByAggregateInput
    _sum?: RouteSumOrderByAggregateInput
  }

  export type RouteScalarWhereWithAggregatesInput = {
    AND?: RouteScalarWhereWithAggregatesInput | RouteScalarWhereWithAggregatesInput[]
    OR?: RouteScalarWhereWithAggregatesInput[]
    NOT?: RouteScalarWhereWithAggregatesInput | RouteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Route"> | string
    name?: StringWithAggregatesFilter<"Route"> | string
    status?: StringWithAggregatesFilter<"Route"> | string
    date?: DateTimeWithAggregatesFilter<"Route"> | Date | string
    plannedDistance?: FloatWithAggregatesFilter<"Route"> | number
    plannedTime?: FloatWithAggregatesFilter<"Route"> | number
    driverId?: StringWithAggregatesFilter<"Route"> | string
    vehicleId?: StringWithAggregatesFilter<"Route"> | string
    tenantId?: StringWithAggregatesFilter<"Route"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Route"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Route"> | Date | string
    returnToDepot?: BoolWithAggregatesFilter<"Route"> | boolean
  }

  export type DeliveryWhereInput = {
    AND?: DeliveryWhereInput | DeliveryWhereInput[]
    OR?: DeliveryWhereInput[]
    NOT?: DeliveryWhereInput | DeliveryWhereInput[]
    id?: StringFilter<"Delivery"> | string
    sequence?: IntFilter<"Delivery"> | number
    status?: StringFilter<"Delivery"> | string
    routeId?: StringFilter<"Delivery"> | string
    clientId?: StringFilter<"Delivery"> | string
    trackingToken?: StringFilter<"Delivery"> | string
    customerPhone?: StringNullableFilter<"Delivery"> | string | null
    ratingInt?: IntNullableFilter<"Delivery"> | number | null
    ratingComment?: StringNullableFilter<"Delivery"> | string | null
    actualLatitude?: FloatNullableFilter<"Delivery"> | number | null
    actualLongitude?: FloatNullableFilter<"Delivery"> | number | null
    gpsAccuracy?: FloatNullableFilter<"Delivery"> | number | null
    gpsSpeed?: FloatNullableFilter<"Delivery"> | number | null
    gpsAltitude?: FloatNullableFilter<"Delivery"> | number | null
    gpsHeading?: FloatNullableFilter<"Delivery"> | number | null
    deliveredAt?: DateTimeNullableFilter<"Delivery"> | Date | string | null
    photoUrl?: StringNullableFilter<"Delivery"> | string | null
    signatureUrl?: StringNullableFilter<"Delivery"> | string | null
    notes?: StringNullableFilter<"Delivery"> | string | null
    failureReason?: StringNullableFilter<"Delivery"> | string | null
    isInsideGeofence?: BoolNullableFilter<"Delivery"> | boolean | null
    distanceFromClient?: FloatNullableFilter<"Delivery"> | number | null
    tenantId?: StringFilter<"Delivery"> | string
    createdAt?: DateTimeFilter<"Delivery"> | Date | string
    updatedAt?: DateTimeFilter<"Delivery"> | Date | string
    route?: XOR<RouteScalarRelationFilter, RouteWhereInput>
    client?: XOR<ClientScalarRelationFilter, ClientWhereInput>
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
  }

  export type DeliveryOrderByWithRelationInput = {
    id?: SortOrder
    sequence?: SortOrder
    status?: SortOrder
    routeId?: SortOrder
    clientId?: SortOrder
    trackingToken?: SortOrder
    customerPhone?: SortOrderInput | SortOrder
    ratingInt?: SortOrderInput | SortOrder
    ratingComment?: SortOrderInput | SortOrder
    actualLatitude?: SortOrderInput | SortOrder
    actualLongitude?: SortOrderInput | SortOrder
    gpsAccuracy?: SortOrderInput | SortOrder
    gpsSpeed?: SortOrderInput | SortOrder
    gpsAltitude?: SortOrderInput | SortOrder
    gpsHeading?: SortOrderInput | SortOrder
    deliveredAt?: SortOrderInput | SortOrder
    photoUrl?: SortOrderInput | SortOrder
    signatureUrl?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    failureReason?: SortOrderInput | SortOrder
    isInsideGeofence?: SortOrderInput | SortOrder
    distanceFromClient?: SortOrderInput | SortOrder
    tenantId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    route?: RouteOrderByWithRelationInput
    client?: ClientOrderByWithRelationInput
    tenant?: TenantOrderByWithRelationInput
  }

  export type DeliveryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    trackingToken?: string
    AND?: DeliveryWhereInput | DeliveryWhereInput[]
    OR?: DeliveryWhereInput[]
    NOT?: DeliveryWhereInput | DeliveryWhereInput[]
    sequence?: IntFilter<"Delivery"> | number
    status?: StringFilter<"Delivery"> | string
    routeId?: StringFilter<"Delivery"> | string
    clientId?: StringFilter<"Delivery"> | string
    customerPhone?: StringNullableFilter<"Delivery"> | string | null
    ratingInt?: IntNullableFilter<"Delivery"> | number | null
    ratingComment?: StringNullableFilter<"Delivery"> | string | null
    actualLatitude?: FloatNullableFilter<"Delivery"> | number | null
    actualLongitude?: FloatNullableFilter<"Delivery"> | number | null
    gpsAccuracy?: FloatNullableFilter<"Delivery"> | number | null
    gpsSpeed?: FloatNullableFilter<"Delivery"> | number | null
    gpsAltitude?: FloatNullableFilter<"Delivery"> | number | null
    gpsHeading?: FloatNullableFilter<"Delivery"> | number | null
    deliveredAt?: DateTimeNullableFilter<"Delivery"> | Date | string | null
    photoUrl?: StringNullableFilter<"Delivery"> | string | null
    signatureUrl?: StringNullableFilter<"Delivery"> | string | null
    notes?: StringNullableFilter<"Delivery"> | string | null
    failureReason?: StringNullableFilter<"Delivery"> | string | null
    isInsideGeofence?: BoolNullableFilter<"Delivery"> | boolean | null
    distanceFromClient?: FloatNullableFilter<"Delivery"> | number | null
    tenantId?: StringFilter<"Delivery"> | string
    createdAt?: DateTimeFilter<"Delivery"> | Date | string
    updatedAt?: DateTimeFilter<"Delivery"> | Date | string
    route?: XOR<RouteScalarRelationFilter, RouteWhereInput>
    client?: XOR<ClientScalarRelationFilter, ClientWhereInput>
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
  }, "id" | "trackingToken">

  export type DeliveryOrderByWithAggregationInput = {
    id?: SortOrder
    sequence?: SortOrder
    status?: SortOrder
    routeId?: SortOrder
    clientId?: SortOrder
    trackingToken?: SortOrder
    customerPhone?: SortOrderInput | SortOrder
    ratingInt?: SortOrderInput | SortOrder
    ratingComment?: SortOrderInput | SortOrder
    actualLatitude?: SortOrderInput | SortOrder
    actualLongitude?: SortOrderInput | SortOrder
    gpsAccuracy?: SortOrderInput | SortOrder
    gpsSpeed?: SortOrderInput | SortOrder
    gpsAltitude?: SortOrderInput | SortOrder
    gpsHeading?: SortOrderInput | SortOrder
    deliveredAt?: SortOrderInput | SortOrder
    photoUrl?: SortOrderInput | SortOrder
    signatureUrl?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    failureReason?: SortOrderInput | SortOrder
    isInsideGeofence?: SortOrderInput | SortOrder
    distanceFromClient?: SortOrderInput | SortOrder
    tenantId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DeliveryCountOrderByAggregateInput
    _avg?: DeliveryAvgOrderByAggregateInput
    _max?: DeliveryMaxOrderByAggregateInput
    _min?: DeliveryMinOrderByAggregateInput
    _sum?: DeliverySumOrderByAggregateInput
  }

  export type DeliveryScalarWhereWithAggregatesInput = {
    AND?: DeliveryScalarWhereWithAggregatesInput | DeliveryScalarWhereWithAggregatesInput[]
    OR?: DeliveryScalarWhereWithAggregatesInput[]
    NOT?: DeliveryScalarWhereWithAggregatesInput | DeliveryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Delivery"> | string
    sequence?: IntWithAggregatesFilter<"Delivery"> | number
    status?: StringWithAggregatesFilter<"Delivery"> | string
    routeId?: StringWithAggregatesFilter<"Delivery"> | string
    clientId?: StringWithAggregatesFilter<"Delivery"> | string
    trackingToken?: StringWithAggregatesFilter<"Delivery"> | string
    customerPhone?: StringNullableWithAggregatesFilter<"Delivery"> | string | null
    ratingInt?: IntNullableWithAggregatesFilter<"Delivery"> | number | null
    ratingComment?: StringNullableWithAggregatesFilter<"Delivery"> | string | null
    actualLatitude?: FloatNullableWithAggregatesFilter<"Delivery"> | number | null
    actualLongitude?: FloatNullableWithAggregatesFilter<"Delivery"> | number | null
    gpsAccuracy?: FloatNullableWithAggregatesFilter<"Delivery"> | number | null
    gpsSpeed?: FloatNullableWithAggregatesFilter<"Delivery"> | number | null
    gpsAltitude?: FloatNullableWithAggregatesFilter<"Delivery"> | number | null
    gpsHeading?: FloatNullableWithAggregatesFilter<"Delivery"> | number | null
    deliveredAt?: DateTimeNullableWithAggregatesFilter<"Delivery"> | Date | string | null
    photoUrl?: StringNullableWithAggregatesFilter<"Delivery"> | string | null
    signatureUrl?: StringNullableWithAggregatesFilter<"Delivery"> | string | null
    notes?: StringNullableWithAggregatesFilter<"Delivery"> | string | null
    failureReason?: StringNullableWithAggregatesFilter<"Delivery"> | string | null
    isInsideGeofence?: BoolNullableWithAggregatesFilter<"Delivery"> | boolean | null
    distanceFromClient?: FloatNullableWithAggregatesFilter<"Delivery"> | number | null
    tenantId?: StringWithAggregatesFilter<"Delivery"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Delivery"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Delivery"> | Date | string
  }

  export type LocationLogWhereInput = {
    AND?: LocationLogWhereInput | LocationLogWhereInput[]
    OR?: LocationLogWhereInput[]
    NOT?: LocationLogWhereInput | LocationLogWhereInput[]
    id?: StringFilter<"LocationLog"> | string
    routeId?: StringFilter<"LocationLog"> | string
    latitude?: FloatFilter<"LocationLog"> | number
    longitude?: FloatFilter<"LocationLog"> | number
    speed?: FloatNullableFilter<"LocationLog"> | number | null
    accuracy?: FloatNullableFilter<"LocationLog"> | number | null
    altitude?: FloatNullableFilter<"LocationLog"> | number | null
    heading?: FloatNullableFilter<"LocationLog"> | number | null
    timestamp?: DateTimeFilter<"LocationLog"> | Date | string
    route?: XOR<RouteScalarRelationFilter, RouteWhereInput>
  }

  export type LocationLogOrderByWithRelationInput = {
    id?: SortOrder
    routeId?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    speed?: SortOrderInput | SortOrder
    accuracy?: SortOrderInput | SortOrder
    altitude?: SortOrderInput | SortOrder
    heading?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    route?: RouteOrderByWithRelationInput
  }

  export type LocationLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LocationLogWhereInput | LocationLogWhereInput[]
    OR?: LocationLogWhereInput[]
    NOT?: LocationLogWhereInput | LocationLogWhereInput[]
    routeId?: StringFilter<"LocationLog"> | string
    latitude?: FloatFilter<"LocationLog"> | number
    longitude?: FloatFilter<"LocationLog"> | number
    speed?: FloatNullableFilter<"LocationLog"> | number | null
    accuracy?: FloatNullableFilter<"LocationLog"> | number | null
    altitude?: FloatNullableFilter<"LocationLog"> | number | null
    heading?: FloatNullableFilter<"LocationLog"> | number | null
    timestamp?: DateTimeFilter<"LocationLog"> | Date | string
    route?: XOR<RouteScalarRelationFilter, RouteWhereInput>
  }, "id">

  export type LocationLogOrderByWithAggregationInput = {
    id?: SortOrder
    routeId?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    speed?: SortOrderInput | SortOrder
    accuracy?: SortOrderInput | SortOrder
    altitude?: SortOrderInput | SortOrder
    heading?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    _count?: LocationLogCountOrderByAggregateInput
    _avg?: LocationLogAvgOrderByAggregateInput
    _max?: LocationLogMaxOrderByAggregateInput
    _min?: LocationLogMinOrderByAggregateInput
    _sum?: LocationLogSumOrderByAggregateInput
  }

  export type LocationLogScalarWhereWithAggregatesInput = {
    AND?: LocationLogScalarWhereWithAggregatesInput | LocationLogScalarWhereWithAggregatesInput[]
    OR?: LocationLogScalarWhereWithAggregatesInput[]
    NOT?: LocationLogScalarWhereWithAggregatesInput | LocationLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LocationLog"> | string
    routeId?: StringWithAggregatesFilter<"LocationLog"> | string
    latitude?: FloatWithAggregatesFilter<"LocationLog"> | number
    longitude?: FloatWithAggregatesFilter<"LocationLog"> | number
    speed?: FloatNullableWithAggregatesFilter<"LocationLog"> | number | null
    accuracy?: FloatNullableWithAggregatesFilter<"LocationLog"> | number | null
    altitude?: FloatNullableWithAggregatesFilter<"LocationLog"> | number | null
    heading?: FloatNullableWithAggregatesFilter<"LocationLog"> | number | null
    timestamp?: DateTimeWithAggregatesFilter<"LocationLog"> | Date | string
  }

  export type TenantCreateInput = {
    id?: string
    name: string
    address?: string | null
    cep?: string | null
    latitude?: number | null
    longitude?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    trialStartedAt?: Date | string | null
    trialEndsAt?: Date | string | null
    stripeCustomerId?: string | null
    subscriptionId?: string | null
    subscriptionStatus?: string
    subscriptionEnd?: Date | string | null
    users?: UserCreateNestedManyWithoutTenantInput
    vehicles?: VehicleCreateNestedManyWithoutTenantInput
    clients?: ClientCreateNestedManyWithoutTenantInput
    routes?: RouteCreateNestedManyWithoutTenantInput
    deliveries?: DeliveryCreateNestedManyWithoutTenantInput
  }

  export type TenantUncheckedCreateInput = {
    id?: string
    name: string
    address?: string | null
    cep?: string | null
    latitude?: number | null
    longitude?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    trialStartedAt?: Date | string | null
    trialEndsAt?: Date | string | null
    stripeCustomerId?: string | null
    subscriptionId?: string | null
    subscriptionStatus?: string
    subscriptionEnd?: Date | string | null
    users?: UserUncheckedCreateNestedManyWithoutTenantInput
    vehicles?: VehicleUncheckedCreateNestedManyWithoutTenantInput
    clients?: ClientUncheckedCreateNestedManyWithoutTenantInput
    routes?: RouteUncheckedCreateNestedManyWithoutTenantInput
    deliveries?: DeliveryUncheckedCreateNestedManyWithoutTenantInput
  }

  export type TenantUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    cep?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trialStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionStatus?: StringFieldUpdateOperationsInput | string
    subscriptionEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users?: UserUpdateManyWithoutTenantNestedInput
    vehicles?: VehicleUpdateManyWithoutTenantNestedInput
    clients?: ClientUpdateManyWithoutTenantNestedInput
    routes?: RouteUpdateManyWithoutTenantNestedInput
    deliveries?: DeliveryUpdateManyWithoutTenantNestedInput
  }

  export type TenantUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    cep?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trialStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionStatus?: StringFieldUpdateOperationsInput | string
    subscriptionEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users?: UserUncheckedUpdateManyWithoutTenantNestedInput
    vehicles?: VehicleUncheckedUpdateManyWithoutTenantNestedInput
    clients?: ClientUncheckedUpdateManyWithoutTenantNestedInput
    routes?: RouteUncheckedUpdateManyWithoutTenantNestedInput
    deliveries?: DeliveryUncheckedUpdateManyWithoutTenantNestedInput
  }

  export type TenantCreateManyInput = {
    id?: string
    name: string
    address?: string | null
    cep?: string | null
    latitude?: number | null
    longitude?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    trialStartedAt?: Date | string | null
    trialEndsAt?: Date | string | null
    stripeCustomerId?: string | null
    subscriptionId?: string | null
    subscriptionStatus?: string
    subscriptionEnd?: Date | string | null
  }

  export type TenantUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    cep?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trialStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionStatus?: StringFieldUpdateOperationsInput | string
    subscriptionEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TenantUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    cep?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trialStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionStatus?: StringFieldUpdateOperationsInput | string
    subscriptionEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserCreateInput = {
    id?: string
    email: string
    password: string
    name: string
    avatarUrl?: string | null
    role: string
    status?: string
    resetPasswordToken?: string | null
    resetPasswordExp?: Date | string | null
    mustChangePassword?: boolean
    resetRequested?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    tenant: TenantCreateNestedOneWithoutUsersInput
    routes?: RouteCreateNestedManyWithoutDriverInput
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    password: string
    name: string
    avatarUrl?: string | null
    role: string
    status?: string
    tenantId: string
    resetPasswordToken?: string | null
    resetPasswordExp?: Date | string | null
    mustChangePassword?: boolean
    resetRequested?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    routes?: RouteUncheckedCreateNestedManyWithoutDriverInput
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    resetPasswordToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordExp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    resetRequested?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenant?: TenantUpdateOneRequiredWithoutUsersNestedInput
    routes?: RouteUpdateManyWithoutDriverNestedInput
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    resetPasswordToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordExp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    resetRequested?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    routes?: RouteUncheckedUpdateManyWithoutDriverNestedInput
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    password: string
    name: string
    avatarUrl?: string | null
    role: string
    status?: string
    tenantId: string
    resetPasswordToken?: string | null
    resetPasswordExp?: Date | string | null
    mustChangePassword?: boolean
    resetRequested?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    resetPasswordToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordExp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    resetRequested?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    resetPasswordToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordExp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    resetRequested?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenCreateInput = {
    id?: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutRefreshTokensInput
  }

  export type RefreshTokenUncheckedCreateInput = {
    id?: string
    token: string
    userId: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type RefreshTokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutRefreshTokensNestedInput
  }

  export type RefreshTokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenCreateManyInput = {
    id?: string
    token: string
    userId: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type RefreshTokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VehicleCreateInput = {
    id?: string
    plate: string
    model: string
    consumption: number
    createdAt?: Date | string
    updatedAt?: Date | string
    tenant: TenantCreateNestedOneWithoutVehiclesInput
    routes?: RouteCreateNestedManyWithoutVehicleInput
  }

  export type VehicleUncheckedCreateInput = {
    id?: string
    plate: string
    model: string
    consumption: number
    tenantId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    routes?: RouteUncheckedCreateNestedManyWithoutVehicleInput
  }

  export type VehicleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    plate?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    consumption?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenant?: TenantUpdateOneRequiredWithoutVehiclesNestedInput
    routes?: RouteUpdateManyWithoutVehicleNestedInput
  }

  export type VehicleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    plate?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    consumption?: FloatFieldUpdateOperationsInput | number
    tenantId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    routes?: RouteUncheckedUpdateManyWithoutVehicleNestedInput
  }

  export type VehicleCreateManyInput = {
    id?: string
    plate: string
    model: string
    consumption: number
    tenantId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VehicleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    plate?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    consumption?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VehicleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    plate?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    consumption?: FloatFieldUpdateOperationsInput | number
    tenantId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClientCreateInput = {
    id?: string
    name: string
    contactName?: string | null
    phone?: string | null
    address: string
    cep?: string | null
    latitude: number
    longitude: number
    geofenceRadius?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    tenant: TenantCreateNestedOneWithoutClientsInput
    deliveries?: DeliveryCreateNestedManyWithoutClientInput
  }

  export type ClientUncheckedCreateInput = {
    id?: string
    name: string
    contactName?: string | null
    phone?: string | null
    address: string
    cep?: string | null
    latitude: number
    longitude: number
    geofenceRadius?: number
    tenantId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deliveries?: DeliveryUncheckedCreateNestedManyWithoutClientInput
  }

  export type ClientUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    cep?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    geofenceRadius?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenant?: TenantUpdateOneRequiredWithoutClientsNestedInput
    deliveries?: DeliveryUpdateManyWithoutClientNestedInput
  }

  export type ClientUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    cep?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    geofenceRadius?: FloatFieldUpdateOperationsInput | number
    tenantId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveries?: DeliveryUncheckedUpdateManyWithoutClientNestedInput
  }

  export type ClientCreateManyInput = {
    id?: string
    name: string
    contactName?: string | null
    phone?: string | null
    address: string
    cep?: string | null
    latitude: number
    longitude: number
    geofenceRadius?: number
    tenantId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClientUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    cep?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    geofenceRadius?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClientUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    cep?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    geofenceRadius?: FloatFieldUpdateOperationsInput | number
    tenantId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RouteCreateInput = {
    id?: string
    name: string
    status?: string
    date?: Date | string
    plannedDistance: number
    plannedTime: number
    createdAt?: Date | string
    updatedAt?: Date | string
    returnToDepot?: boolean
    driver: UserCreateNestedOneWithoutRoutesInput
    vehicle: VehicleCreateNestedOneWithoutRoutesInput
    tenant: TenantCreateNestedOneWithoutRoutesInput
    deliveries?: DeliveryCreateNestedManyWithoutRouteInput
    locationLogs?: LocationLogCreateNestedManyWithoutRouteInput
  }

  export type RouteUncheckedCreateInput = {
    id?: string
    name: string
    status?: string
    date?: Date | string
    plannedDistance: number
    plannedTime: number
    driverId: string
    vehicleId: string
    tenantId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    returnToDepot?: boolean
    deliveries?: DeliveryUncheckedCreateNestedManyWithoutRouteInput
    locationLogs?: LocationLogUncheckedCreateNestedManyWithoutRouteInput
  }

  export type RouteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    plannedDistance?: FloatFieldUpdateOperationsInput | number
    plannedTime?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    returnToDepot?: BoolFieldUpdateOperationsInput | boolean
    driver?: UserUpdateOneRequiredWithoutRoutesNestedInput
    vehicle?: VehicleUpdateOneRequiredWithoutRoutesNestedInput
    tenant?: TenantUpdateOneRequiredWithoutRoutesNestedInput
    deliveries?: DeliveryUpdateManyWithoutRouteNestedInput
    locationLogs?: LocationLogUpdateManyWithoutRouteNestedInput
  }

  export type RouteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    plannedDistance?: FloatFieldUpdateOperationsInput | number
    plannedTime?: FloatFieldUpdateOperationsInput | number
    driverId?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    returnToDepot?: BoolFieldUpdateOperationsInput | boolean
    deliveries?: DeliveryUncheckedUpdateManyWithoutRouteNestedInput
    locationLogs?: LocationLogUncheckedUpdateManyWithoutRouteNestedInput
  }

  export type RouteCreateManyInput = {
    id?: string
    name: string
    status?: string
    date?: Date | string
    plannedDistance: number
    plannedTime: number
    driverId: string
    vehicleId: string
    tenantId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    returnToDepot?: boolean
  }

  export type RouteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    plannedDistance?: FloatFieldUpdateOperationsInput | number
    plannedTime?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    returnToDepot?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RouteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    plannedDistance?: FloatFieldUpdateOperationsInput | number
    plannedTime?: FloatFieldUpdateOperationsInput | number
    driverId?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    returnToDepot?: BoolFieldUpdateOperationsInput | boolean
  }

  export type DeliveryCreateInput = {
    id?: string
    sequence: number
    status?: string
    trackingToken?: string
    customerPhone?: string | null
    ratingInt?: number | null
    ratingComment?: string | null
    actualLatitude?: number | null
    actualLongitude?: number | null
    gpsAccuracy?: number | null
    gpsSpeed?: number | null
    gpsAltitude?: number | null
    gpsHeading?: number | null
    deliveredAt?: Date | string | null
    photoUrl?: string | null
    signatureUrl?: string | null
    notes?: string | null
    failureReason?: string | null
    isInsideGeofence?: boolean | null
    distanceFromClient?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    route: RouteCreateNestedOneWithoutDeliveriesInput
    client: ClientCreateNestedOneWithoutDeliveriesInput
    tenant: TenantCreateNestedOneWithoutDeliveriesInput
  }

  export type DeliveryUncheckedCreateInput = {
    id?: string
    sequence: number
    status?: string
    routeId: string
    clientId: string
    trackingToken?: string
    customerPhone?: string | null
    ratingInt?: number | null
    ratingComment?: string | null
    actualLatitude?: number | null
    actualLongitude?: number | null
    gpsAccuracy?: number | null
    gpsSpeed?: number | null
    gpsAltitude?: number | null
    gpsHeading?: number | null
    deliveredAt?: Date | string | null
    photoUrl?: string | null
    signatureUrl?: string | null
    notes?: string | null
    failureReason?: string | null
    isInsideGeofence?: boolean | null
    distanceFromClient?: number | null
    tenantId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DeliveryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sequence?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    trackingToken?: StringFieldUpdateOperationsInput | string
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    ratingInt?: NullableIntFieldUpdateOperationsInput | number | null
    ratingComment?: NullableStringFieldUpdateOperationsInput | string | null
    actualLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    actualLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    gpsAccuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    gpsSpeed?: NullableFloatFieldUpdateOperationsInput | number | null
    gpsAltitude?: NullableFloatFieldUpdateOperationsInput | number | null
    gpsHeading?: NullableFloatFieldUpdateOperationsInput | number | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    signatureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    isInsideGeofence?: NullableBoolFieldUpdateOperationsInput | boolean | null
    distanceFromClient?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    route?: RouteUpdateOneRequiredWithoutDeliveriesNestedInput
    client?: ClientUpdateOneRequiredWithoutDeliveriesNestedInput
    tenant?: TenantUpdateOneRequiredWithoutDeliveriesNestedInput
  }

  export type DeliveryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sequence?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    routeId?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    trackingToken?: StringFieldUpdateOperationsInput | string
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    ratingInt?: NullableIntFieldUpdateOperationsInput | number | null
    ratingComment?: NullableStringFieldUpdateOperationsInput | string | null
    actualLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    actualLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    gpsAccuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    gpsSpeed?: NullableFloatFieldUpdateOperationsInput | number | null
    gpsAltitude?: NullableFloatFieldUpdateOperationsInput | number | null
    gpsHeading?: NullableFloatFieldUpdateOperationsInput | number | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    signatureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    isInsideGeofence?: NullableBoolFieldUpdateOperationsInput | boolean | null
    distanceFromClient?: NullableFloatFieldUpdateOperationsInput | number | null
    tenantId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeliveryCreateManyInput = {
    id?: string
    sequence: number
    status?: string
    routeId: string
    clientId: string
    trackingToken?: string
    customerPhone?: string | null
    ratingInt?: number | null
    ratingComment?: string | null
    actualLatitude?: number | null
    actualLongitude?: number | null
    gpsAccuracy?: number | null
    gpsSpeed?: number | null
    gpsAltitude?: number | null
    gpsHeading?: number | null
    deliveredAt?: Date | string | null
    photoUrl?: string | null
    signatureUrl?: string | null
    notes?: string | null
    failureReason?: string | null
    isInsideGeofence?: boolean | null
    distanceFromClient?: number | null
    tenantId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DeliveryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sequence?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    trackingToken?: StringFieldUpdateOperationsInput | string
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    ratingInt?: NullableIntFieldUpdateOperationsInput | number | null
    ratingComment?: NullableStringFieldUpdateOperationsInput | string | null
    actualLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    actualLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    gpsAccuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    gpsSpeed?: NullableFloatFieldUpdateOperationsInput | number | null
    gpsAltitude?: NullableFloatFieldUpdateOperationsInput | number | null
    gpsHeading?: NullableFloatFieldUpdateOperationsInput | number | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    signatureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    isInsideGeofence?: NullableBoolFieldUpdateOperationsInput | boolean | null
    distanceFromClient?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeliveryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sequence?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    routeId?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    trackingToken?: StringFieldUpdateOperationsInput | string
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    ratingInt?: NullableIntFieldUpdateOperationsInput | number | null
    ratingComment?: NullableStringFieldUpdateOperationsInput | string | null
    actualLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    actualLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    gpsAccuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    gpsSpeed?: NullableFloatFieldUpdateOperationsInput | number | null
    gpsAltitude?: NullableFloatFieldUpdateOperationsInput | number | null
    gpsHeading?: NullableFloatFieldUpdateOperationsInput | number | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    signatureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    isInsideGeofence?: NullableBoolFieldUpdateOperationsInput | boolean | null
    distanceFromClient?: NullableFloatFieldUpdateOperationsInput | number | null
    tenantId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LocationLogCreateInput = {
    id?: string
    latitude: number
    longitude: number
    speed?: number | null
    accuracy?: number | null
    altitude?: number | null
    heading?: number | null
    timestamp?: Date | string
    route: RouteCreateNestedOneWithoutLocationLogsInput
  }

  export type LocationLogUncheckedCreateInput = {
    id?: string
    routeId: string
    latitude: number
    longitude: number
    speed?: number | null
    accuracy?: number | null
    altitude?: number | null
    heading?: number | null
    timestamp?: Date | string
  }

  export type LocationLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    speed?: NullableFloatFieldUpdateOperationsInput | number | null
    accuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    altitude?: NullableFloatFieldUpdateOperationsInput | number | null
    heading?: NullableFloatFieldUpdateOperationsInput | number | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    route?: RouteUpdateOneRequiredWithoutLocationLogsNestedInput
  }

  export type LocationLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    routeId?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    speed?: NullableFloatFieldUpdateOperationsInput | number | null
    accuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    altitude?: NullableFloatFieldUpdateOperationsInput | number | null
    heading?: NullableFloatFieldUpdateOperationsInput | number | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LocationLogCreateManyInput = {
    id?: string
    routeId: string
    latitude: number
    longitude: number
    speed?: number | null
    accuracy?: number | null
    altitude?: number | null
    heading?: number | null
    timestamp?: Date | string
  }

  export type LocationLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    speed?: NullableFloatFieldUpdateOperationsInput | number | null
    accuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    altitude?: NullableFloatFieldUpdateOperationsInput | number | null
    heading?: NullableFloatFieldUpdateOperationsInput | number | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LocationLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    routeId?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    speed?: NullableFloatFieldUpdateOperationsInput | number | null
    accuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    altitude?: NullableFloatFieldUpdateOperationsInput | number | null
    heading?: NullableFloatFieldUpdateOperationsInput | number | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type VehicleListRelationFilter = {
    every?: VehicleWhereInput
    some?: VehicleWhereInput
    none?: VehicleWhereInput
  }

  export type ClientListRelationFilter = {
    every?: ClientWhereInput
    some?: ClientWhereInput
    none?: ClientWhereInput
  }

  export type RouteListRelationFilter = {
    every?: RouteWhereInput
    some?: RouteWhereInput
    none?: RouteWhereInput
  }

  export type DeliveryListRelationFilter = {
    every?: DeliveryWhereInput
    some?: DeliveryWhereInput
    none?: DeliveryWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type VehicleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ClientOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RouteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DeliveryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TenantCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    cep?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    trialStartedAt?: SortOrder
    trialEndsAt?: SortOrder
    stripeCustomerId?: SortOrder
    subscriptionId?: SortOrder
    subscriptionStatus?: SortOrder
    subscriptionEnd?: SortOrder
  }

  export type TenantAvgOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type TenantMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    cep?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    trialStartedAt?: SortOrder
    trialEndsAt?: SortOrder
    stripeCustomerId?: SortOrder
    subscriptionId?: SortOrder
    subscriptionStatus?: SortOrder
    subscriptionEnd?: SortOrder
  }

  export type TenantMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    cep?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    trialStartedAt?: SortOrder
    trialEndsAt?: SortOrder
    stripeCustomerId?: SortOrder
    subscriptionId?: SortOrder
    subscriptionStatus?: SortOrder
    subscriptionEnd?: SortOrder
  }

  export type TenantSumOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type TenantScalarRelationFilter = {
    is?: TenantWhereInput
    isNot?: TenantWhereInput
  }

  export type RefreshTokenListRelationFilter = {
    every?: RefreshTokenWhereInput
    some?: RefreshTokenWhereInput
    none?: RefreshTokenWhereInput
  }

  export type RefreshTokenOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    avatarUrl?: SortOrder
    role?: SortOrder
    status?: SortOrder
    tenantId?: SortOrder
    resetPasswordToken?: SortOrder
    resetPasswordExp?: SortOrder
    mustChangePassword?: SortOrder
    resetRequested?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    avatarUrl?: SortOrder
    role?: SortOrder
    status?: SortOrder
    tenantId?: SortOrder
    resetPasswordToken?: SortOrder
    resetPasswordExp?: SortOrder
    mustChangePassword?: SortOrder
    resetRequested?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    avatarUrl?: SortOrder
    role?: SortOrder
    status?: SortOrder
    tenantId?: SortOrder
    resetPasswordToken?: SortOrder
    resetPasswordExp?: SortOrder
    mustChangePassword?: SortOrder
    resetRequested?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type RefreshTokenCountOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type RefreshTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type RefreshTokenMinOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type VehicleCountOrderByAggregateInput = {
    id?: SortOrder
    plate?: SortOrder
    model?: SortOrder
    consumption?: SortOrder
    tenantId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VehicleAvgOrderByAggregateInput = {
    consumption?: SortOrder
  }

  export type VehicleMaxOrderByAggregateInput = {
    id?: SortOrder
    plate?: SortOrder
    model?: SortOrder
    consumption?: SortOrder
    tenantId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VehicleMinOrderByAggregateInput = {
    id?: SortOrder
    plate?: SortOrder
    model?: SortOrder
    consumption?: SortOrder
    tenantId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VehicleSumOrderByAggregateInput = {
    consumption?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type ClientCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    contactName?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    cep?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    geofenceRadius?: SortOrder
    tenantId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClientAvgOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
    geofenceRadius?: SortOrder
  }

  export type ClientMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    contactName?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    cep?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    geofenceRadius?: SortOrder
    tenantId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClientMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    contactName?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    cep?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    geofenceRadius?: SortOrder
    tenantId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClientSumOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
    geofenceRadius?: SortOrder
  }

  export type VehicleScalarRelationFilter = {
    is?: VehicleWhereInput
    isNot?: VehicleWhereInput
  }

  export type LocationLogListRelationFilter = {
    every?: LocationLogWhereInput
    some?: LocationLogWhereInput
    none?: LocationLogWhereInput
  }

  export type LocationLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RouteCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    status?: SortOrder
    date?: SortOrder
    plannedDistance?: SortOrder
    plannedTime?: SortOrder
    driverId?: SortOrder
    vehicleId?: SortOrder
    tenantId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    returnToDepot?: SortOrder
  }

  export type RouteAvgOrderByAggregateInput = {
    plannedDistance?: SortOrder
    plannedTime?: SortOrder
  }

  export type RouteMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    status?: SortOrder
    date?: SortOrder
    plannedDistance?: SortOrder
    plannedTime?: SortOrder
    driverId?: SortOrder
    vehicleId?: SortOrder
    tenantId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    returnToDepot?: SortOrder
  }

  export type RouteMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    status?: SortOrder
    date?: SortOrder
    plannedDistance?: SortOrder
    plannedTime?: SortOrder
    driverId?: SortOrder
    vehicleId?: SortOrder
    tenantId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    returnToDepot?: SortOrder
  }

  export type RouteSumOrderByAggregateInput = {
    plannedDistance?: SortOrder
    plannedTime?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type RouteScalarRelationFilter = {
    is?: RouteWhereInput
    isNot?: RouteWhereInput
  }

  export type ClientScalarRelationFilter = {
    is?: ClientWhereInput
    isNot?: ClientWhereInput
  }

  export type DeliveryCountOrderByAggregateInput = {
    id?: SortOrder
    sequence?: SortOrder
    status?: SortOrder
    routeId?: SortOrder
    clientId?: SortOrder
    trackingToken?: SortOrder
    customerPhone?: SortOrder
    ratingInt?: SortOrder
    ratingComment?: SortOrder
    actualLatitude?: SortOrder
    actualLongitude?: SortOrder
    gpsAccuracy?: SortOrder
    gpsSpeed?: SortOrder
    gpsAltitude?: SortOrder
    gpsHeading?: SortOrder
    deliveredAt?: SortOrder
    photoUrl?: SortOrder
    signatureUrl?: SortOrder
    notes?: SortOrder
    failureReason?: SortOrder
    isInsideGeofence?: SortOrder
    distanceFromClient?: SortOrder
    tenantId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DeliveryAvgOrderByAggregateInput = {
    sequence?: SortOrder
    ratingInt?: SortOrder
    actualLatitude?: SortOrder
    actualLongitude?: SortOrder
    gpsAccuracy?: SortOrder
    gpsSpeed?: SortOrder
    gpsAltitude?: SortOrder
    gpsHeading?: SortOrder
    distanceFromClient?: SortOrder
  }

  export type DeliveryMaxOrderByAggregateInput = {
    id?: SortOrder
    sequence?: SortOrder
    status?: SortOrder
    routeId?: SortOrder
    clientId?: SortOrder
    trackingToken?: SortOrder
    customerPhone?: SortOrder
    ratingInt?: SortOrder
    ratingComment?: SortOrder
    actualLatitude?: SortOrder
    actualLongitude?: SortOrder
    gpsAccuracy?: SortOrder
    gpsSpeed?: SortOrder
    gpsAltitude?: SortOrder
    gpsHeading?: SortOrder
    deliveredAt?: SortOrder
    photoUrl?: SortOrder
    signatureUrl?: SortOrder
    notes?: SortOrder
    failureReason?: SortOrder
    isInsideGeofence?: SortOrder
    distanceFromClient?: SortOrder
    tenantId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DeliveryMinOrderByAggregateInput = {
    id?: SortOrder
    sequence?: SortOrder
    status?: SortOrder
    routeId?: SortOrder
    clientId?: SortOrder
    trackingToken?: SortOrder
    customerPhone?: SortOrder
    ratingInt?: SortOrder
    ratingComment?: SortOrder
    actualLatitude?: SortOrder
    actualLongitude?: SortOrder
    gpsAccuracy?: SortOrder
    gpsSpeed?: SortOrder
    gpsAltitude?: SortOrder
    gpsHeading?: SortOrder
    deliveredAt?: SortOrder
    photoUrl?: SortOrder
    signatureUrl?: SortOrder
    notes?: SortOrder
    failureReason?: SortOrder
    isInsideGeofence?: SortOrder
    distanceFromClient?: SortOrder
    tenantId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DeliverySumOrderByAggregateInput = {
    sequence?: SortOrder
    ratingInt?: SortOrder
    actualLatitude?: SortOrder
    actualLongitude?: SortOrder
    gpsAccuracy?: SortOrder
    gpsSpeed?: SortOrder
    gpsAltitude?: SortOrder
    gpsHeading?: SortOrder
    distanceFromClient?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type LocationLogCountOrderByAggregateInput = {
    id?: SortOrder
    routeId?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    speed?: SortOrder
    accuracy?: SortOrder
    altitude?: SortOrder
    heading?: SortOrder
    timestamp?: SortOrder
  }

  export type LocationLogAvgOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
    speed?: SortOrder
    accuracy?: SortOrder
    altitude?: SortOrder
    heading?: SortOrder
  }

  export type LocationLogMaxOrderByAggregateInput = {
    id?: SortOrder
    routeId?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    speed?: SortOrder
    accuracy?: SortOrder
    altitude?: SortOrder
    heading?: SortOrder
    timestamp?: SortOrder
  }

  export type LocationLogMinOrderByAggregateInput = {
    id?: SortOrder
    routeId?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    speed?: SortOrder
    accuracy?: SortOrder
    altitude?: SortOrder
    heading?: SortOrder
    timestamp?: SortOrder
  }

  export type LocationLogSumOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
    speed?: SortOrder
    accuracy?: SortOrder
    altitude?: SortOrder
    heading?: SortOrder
  }

  export type UserCreateNestedManyWithoutTenantInput = {
    create?: XOR<UserCreateWithoutTenantInput, UserUncheckedCreateWithoutTenantInput> | UserCreateWithoutTenantInput[] | UserUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: UserCreateOrConnectWithoutTenantInput | UserCreateOrConnectWithoutTenantInput[]
    createMany?: UserCreateManyTenantInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type VehicleCreateNestedManyWithoutTenantInput = {
    create?: XOR<VehicleCreateWithoutTenantInput, VehicleUncheckedCreateWithoutTenantInput> | VehicleCreateWithoutTenantInput[] | VehicleUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: VehicleCreateOrConnectWithoutTenantInput | VehicleCreateOrConnectWithoutTenantInput[]
    createMany?: VehicleCreateManyTenantInputEnvelope
    connect?: VehicleWhereUniqueInput | VehicleWhereUniqueInput[]
  }

  export type ClientCreateNestedManyWithoutTenantInput = {
    create?: XOR<ClientCreateWithoutTenantInput, ClientUncheckedCreateWithoutTenantInput> | ClientCreateWithoutTenantInput[] | ClientUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: ClientCreateOrConnectWithoutTenantInput | ClientCreateOrConnectWithoutTenantInput[]
    createMany?: ClientCreateManyTenantInputEnvelope
    connect?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
  }

  export type RouteCreateNestedManyWithoutTenantInput = {
    create?: XOR<RouteCreateWithoutTenantInput, RouteUncheckedCreateWithoutTenantInput> | RouteCreateWithoutTenantInput[] | RouteUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: RouteCreateOrConnectWithoutTenantInput | RouteCreateOrConnectWithoutTenantInput[]
    createMany?: RouteCreateManyTenantInputEnvelope
    connect?: RouteWhereUniqueInput | RouteWhereUniqueInput[]
  }

  export type DeliveryCreateNestedManyWithoutTenantInput = {
    create?: XOR<DeliveryCreateWithoutTenantInput, DeliveryUncheckedCreateWithoutTenantInput> | DeliveryCreateWithoutTenantInput[] | DeliveryUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: DeliveryCreateOrConnectWithoutTenantInput | DeliveryCreateOrConnectWithoutTenantInput[]
    createMany?: DeliveryCreateManyTenantInputEnvelope
    connect?: DeliveryWhereUniqueInput | DeliveryWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutTenantInput = {
    create?: XOR<UserCreateWithoutTenantInput, UserUncheckedCreateWithoutTenantInput> | UserCreateWithoutTenantInput[] | UserUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: UserCreateOrConnectWithoutTenantInput | UserCreateOrConnectWithoutTenantInput[]
    createMany?: UserCreateManyTenantInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type VehicleUncheckedCreateNestedManyWithoutTenantInput = {
    create?: XOR<VehicleCreateWithoutTenantInput, VehicleUncheckedCreateWithoutTenantInput> | VehicleCreateWithoutTenantInput[] | VehicleUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: VehicleCreateOrConnectWithoutTenantInput | VehicleCreateOrConnectWithoutTenantInput[]
    createMany?: VehicleCreateManyTenantInputEnvelope
    connect?: VehicleWhereUniqueInput | VehicleWhereUniqueInput[]
  }

  export type ClientUncheckedCreateNestedManyWithoutTenantInput = {
    create?: XOR<ClientCreateWithoutTenantInput, ClientUncheckedCreateWithoutTenantInput> | ClientCreateWithoutTenantInput[] | ClientUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: ClientCreateOrConnectWithoutTenantInput | ClientCreateOrConnectWithoutTenantInput[]
    createMany?: ClientCreateManyTenantInputEnvelope
    connect?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
  }

  export type RouteUncheckedCreateNestedManyWithoutTenantInput = {
    create?: XOR<RouteCreateWithoutTenantInput, RouteUncheckedCreateWithoutTenantInput> | RouteCreateWithoutTenantInput[] | RouteUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: RouteCreateOrConnectWithoutTenantInput | RouteCreateOrConnectWithoutTenantInput[]
    createMany?: RouteCreateManyTenantInputEnvelope
    connect?: RouteWhereUniqueInput | RouteWhereUniqueInput[]
  }

  export type DeliveryUncheckedCreateNestedManyWithoutTenantInput = {
    create?: XOR<DeliveryCreateWithoutTenantInput, DeliveryUncheckedCreateWithoutTenantInput> | DeliveryCreateWithoutTenantInput[] | DeliveryUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: DeliveryCreateOrConnectWithoutTenantInput | DeliveryCreateOrConnectWithoutTenantInput[]
    createMany?: DeliveryCreateManyTenantInputEnvelope
    connect?: DeliveryWhereUniqueInput | DeliveryWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateManyWithoutTenantNestedInput = {
    create?: XOR<UserCreateWithoutTenantInput, UserUncheckedCreateWithoutTenantInput> | UserCreateWithoutTenantInput[] | UserUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: UserCreateOrConnectWithoutTenantInput | UserCreateOrConnectWithoutTenantInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutTenantInput | UserUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: UserCreateManyTenantInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutTenantInput | UserUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: UserUpdateManyWithWhereWithoutTenantInput | UserUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type VehicleUpdateManyWithoutTenantNestedInput = {
    create?: XOR<VehicleCreateWithoutTenantInput, VehicleUncheckedCreateWithoutTenantInput> | VehicleCreateWithoutTenantInput[] | VehicleUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: VehicleCreateOrConnectWithoutTenantInput | VehicleCreateOrConnectWithoutTenantInput[]
    upsert?: VehicleUpsertWithWhereUniqueWithoutTenantInput | VehicleUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: VehicleCreateManyTenantInputEnvelope
    set?: VehicleWhereUniqueInput | VehicleWhereUniqueInput[]
    disconnect?: VehicleWhereUniqueInput | VehicleWhereUniqueInput[]
    delete?: VehicleWhereUniqueInput | VehicleWhereUniqueInput[]
    connect?: VehicleWhereUniqueInput | VehicleWhereUniqueInput[]
    update?: VehicleUpdateWithWhereUniqueWithoutTenantInput | VehicleUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: VehicleUpdateManyWithWhereWithoutTenantInput | VehicleUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: VehicleScalarWhereInput | VehicleScalarWhereInput[]
  }

  export type ClientUpdateManyWithoutTenantNestedInput = {
    create?: XOR<ClientCreateWithoutTenantInput, ClientUncheckedCreateWithoutTenantInput> | ClientCreateWithoutTenantInput[] | ClientUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: ClientCreateOrConnectWithoutTenantInput | ClientCreateOrConnectWithoutTenantInput[]
    upsert?: ClientUpsertWithWhereUniqueWithoutTenantInput | ClientUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: ClientCreateManyTenantInputEnvelope
    set?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
    disconnect?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
    delete?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
    connect?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
    update?: ClientUpdateWithWhereUniqueWithoutTenantInput | ClientUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: ClientUpdateManyWithWhereWithoutTenantInput | ClientUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: ClientScalarWhereInput | ClientScalarWhereInput[]
  }

  export type RouteUpdateManyWithoutTenantNestedInput = {
    create?: XOR<RouteCreateWithoutTenantInput, RouteUncheckedCreateWithoutTenantInput> | RouteCreateWithoutTenantInput[] | RouteUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: RouteCreateOrConnectWithoutTenantInput | RouteCreateOrConnectWithoutTenantInput[]
    upsert?: RouteUpsertWithWhereUniqueWithoutTenantInput | RouteUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: RouteCreateManyTenantInputEnvelope
    set?: RouteWhereUniqueInput | RouteWhereUniqueInput[]
    disconnect?: RouteWhereUniqueInput | RouteWhereUniqueInput[]
    delete?: RouteWhereUniqueInput | RouteWhereUniqueInput[]
    connect?: RouteWhereUniqueInput | RouteWhereUniqueInput[]
    update?: RouteUpdateWithWhereUniqueWithoutTenantInput | RouteUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: RouteUpdateManyWithWhereWithoutTenantInput | RouteUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: RouteScalarWhereInput | RouteScalarWhereInput[]
  }

  export type DeliveryUpdateManyWithoutTenantNestedInput = {
    create?: XOR<DeliveryCreateWithoutTenantInput, DeliveryUncheckedCreateWithoutTenantInput> | DeliveryCreateWithoutTenantInput[] | DeliveryUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: DeliveryCreateOrConnectWithoutTenantInput | DeliveryCreateOrConnectWithoutTenantInput[]
    upsert?: DeliveryUpsertWithWhereUniqueWithoutTenantInput | DeliveryUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: DeliveryCreateManyTenantInputEnvelope
    set?: DeliveryWhereUniqueInput | DeliveryWhereUniqueInput[]
    disconnect?: DeliveryWhereUniqueInput | DeliveryWhereUniqueInput[]
    delete?: DeliveryWhereUniqueInput | DeliveryWhereUniqueInput[]
    connect?: DeliveryWhereUniqueInput | DeliveryWhereUniqueInput[]
    update?: DeliveryUpdateWithWhereUniqueWithoutTenantInput | DeliveryUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: DeliveryUpdateManyWithWhereWithoutTenantInput | DeliveryUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: DeliveryScalarWhereInput | DeliveryScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: XOR<UserCreateWithoutTenantInput, UserUncheckedCreateWithoutTenantInput> | UserCreateWithoutTenantInput[] | UserUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: UserCreateOrConnectWithoutTenantInput | UserCreateOrConnectWithoutTenantInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutTenantInput | UserUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: UserCreateManyTenantInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutTenantInput | UserUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: UserUpdateManyWithWhereWithoutTenantInput | UserUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type VehicleUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: XOR<VehicleCreateWithoutTenantInput, VehicleUncheckedCreateWithoutTenantInput> | VehicleCreateWithoutTenantInput[] | VehicleUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: VehicleCreateOrConnectWithoutTenantInput | VehicleCreateOrConnectWithoutTenantInput[]
    upsert?: VehicleUpsertWithWhereUniqueWithoutTenantInput | VehicleUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: VehicleCreateManyTenantInputEnvelope
    set?: VehicleWhereUniqueInput | VehicleWhereUniqueInput[]
    disconnect?: VehicleWhereUniqueInput | VehicleWhereUniqueInput[]
    delete?: VehicleWhereUniqueInput | VehicleWhereUniqueInput[]
    connect?: VehicleWhereUniqueInput | VehicleWhereUniqueInput[]
    update?: VehicleUpdateWithWhereUniqueWithoutTenantInput | VehicleUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: VehicleUpdateManyWithWhereWithoutTenantInput | VehicleUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: VehicleScalarWhereInput | VehicleScalarWhereInput[]
  }

  export type ClientUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: XOR<ClientCreateWithoutTenantInput, ClientUncheckedCreateWithoutTenantInput> | ClientCreateWithoutTenantInput[] | ClientUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: ClientCreateOrConnectWithoutTenantInput | ClientCreateOrConnectWithoutTenantInput[]
    upsert?: ClientUpsertWithWhereUniqueWithoutTenantInput | ClientUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: ClientCreateManyTenantInputEnvelope
    set?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
    disconnect?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
    delete?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
    connect?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
    update?: ClientUpdateWithWhereUniqueWithoutTenantInput | ClientUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: ClientUpdateManyWithWhereWithoutTenantInput | ClientUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: ClientScalarWhereInput | ClientScalarWhereInput[]
  }

  export type RouteUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: XOR<RouteCreateWithoutTenantInput, RouteUncheckedCreateWithoutTenantInput> | RouteCreateWithoutTenantInput[] | RouteUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: RouteCreateOrConnectWithoutTenantInput | RouteCreateOrConnectWithoutTenantInput[]
    upsert?: RouteUpsertWithWhereUniqueWithoutTenantInput | RouteUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: RouteCreateManyTenantInputEnvelope
    set?: RouteWhereUniqueInput | RouteWhereUniqueInput[]
    disconnect?: RouteWhereUniqueInput | RouteWhereUniqueInput[]
    delete?: RouteWhereUniqueInput | RouteWhereUniqueInput[]
    connect?: RouteWhereUniqueInput | RouteWhereUniqueInput[]
    update?: RouteUpdateWithWhereUniqueWithoutTenantInput | RouteUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: RouteUpdateManyWithWhereWithoutTenantInput | RouteUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: RouteScalarWhereInput | RouteScalarWhereInput[]
  }

  export type DeliveryUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: XOR<DeliveryCreateWithoutTenantInput, DeliveryUncheckedCreateWithoutTenantInput> | DeliveryCreateWithoutTenantInput[] | DeliveryUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: DeliveryCreateOrConnectWithoutTenantInput | DeliveryCreateOrConnectWithoutTenantInput[]
    upsert?: DeliveryUpsertWithWhereUniqueWithoutTenantInput | DeliveryUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: DeliveryCreateManyTenantInputEnvelope
    set?: DeliveryWhereUniqueInput | DeliveryWhereUniqueInput[]
    disconnect?: DeliveryWhereUniqueInput | DeliveryWhereUniqueInput[]
    delete?: DeliveryWhereUniqueInput | DeliveryWhereUniqueInput[]
    connect?: DeliveryWhereUniqueInput | DeliveryWhereUniqueInput[]
    update?: DeliveryUpdateWithWhereUniqueWithoutTenantInput | DeliveryUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: DeliveryUpdateManyWithWhereWithoutTenantInput | DeliveryUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: DeliveryScalarWhereInput | DeliveryScalarWhereInput[]
  }

  export type TenantCreateNestedOneWithoutUsersInput = {
    create?: XOR<TenantCreateWithoutUsersInput, TenantUncheckedCreateWithoutUsersInput>
    connectOrCreate?: TenantCreateOrConnectWithoutUsersInput
    connect?: TenantWhereUniqueInput
  }

  export type RouteCreateNestedManyWithoutDriverInput = {
    create?: XOR<RouteCreateWithoutDriverInput, RouteUncheckedCreateWithoutDriverInput> | RouteCreateWithoutDriverInput[] | RouteUncheckedCreateWithoutDriverInput[]
    connectOrCreate?: RouteCreateOrConnectWithoutDriverInput | RouteCreateOrConnectWithoutDriverInput[]
    createMany?: RouteCreateManyDriverInputEnvelope
    connect?: RouteWhereUniqueInput | RouteWhereUniqueInput[]
  }

  export type RefreshTokenCreateNestedManyWithoutUserInput = {
    create?: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput> | RefreshTokenCreateWithoutUserInput[] | RefreshTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutUserInput | RefreshTokenCreateOrConnectWithoutUserInput[]
    createMany?: RefreshTokenCreateManyUserInputEnvelope
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
  }

  export type RouteUncheckedCreateNestedManyWithoutDriverInput = {
    create?: XOR<RouteCreateWithoutDriverInput, RouteUncheckedCreateWithoutDriverInput> | RouteCreateWithoutDriverInput[] | RouteUncheckedCreateWithoutDriverInput[]
    connectOrCreate?: RouteCreateOrConnectWithoutDriverInput | RouteCreateOrConnectWithoutDriverInput[]
    createMany?: RouteCreateManyDriverInputEnvelope
    connect?: RouteWhereUniqueInput | RouteWhereUniqueInput[]
  }

  export type RefreshTokenUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput> | RefreshTokenCreateWithoutUserInput[] | RefreshTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutUserInput | RefreshTokenCreateOrConnectWithoutUserInput[]
    createMany?: RefreshTokenCreateManyUserInputEnvelope
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type TenantUpdateOneRequiredWithoutUsersNestedInput = {
    create?: XOR<TenantCreateWithoutUsersInput, TenantUncheckedCreateWithoutUsersInput>
    connectOrCreate?: TenantCreateOrConnectWithoutUsersInput
    upsert?: TenantUpsertWithoutUsersInput
    connect?: TenantWhereUniqueInput
    update?: XOR<XOR<TenantUpdateToOneWithWhereWithoutUsersInput, TenantUpdateWithoutUsersInput>, TenantUncheckedUpdateWithoutUsersInput>
  }

  export type RouteUpdateManyWithoutDriverNestedInput = {
    create?: XOR<RouteCreateWithoutDriverInput, RouteUncheckedCreateWithoutDriverInput> | RouteCreateWithoutDriverInput[] | RouteUncheckedCreateWithoutDriverInput[]
    connectOrCreate?: RouteCreateOrConnectWithoutDriverInput | RouteCreateOrConnectWithoutDriverInput[]
    upsert?: RouteUpsertWithWhereUniqueWithoutDriverInput | RouteUpsertWithWhereUniqueWithoutDriverInput[]
    createMany?: RouteCreateManyDriverInputEnvelope
    set?: RouteWhereUniqueInput | RouteWhereUniqueInput[]
    disconnect?: RouteWhereUniqueInput | RouteWhereUniqueInput[]
    delete?: RouteWhereUniqueInput | RouteWhereUniqueInput[]
    connect?: RouteWhereUniqueInput | RouteWhereUniqueInput[]
    update?: RouteUpdateWithWhereUniqueWithoutDriverInput | RouteUpdateWithWhereUniqueWithoutDriverInput[]
    updateMany?: RouteUpdateManyWithWhereWithoutDriverInput | RouteUpdateManyWithWhereWithoutDriverInput[]
    deleteMany?: RouteScalarWhereInput | RouteScalarWhereInput[]
  }

  export type RefreshTokenUpdateManyWithoutUserNestedInput = {
    create?: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput> | RefreshTokenCreateWithoutUserInput[] | RefreshTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutUserInput | RefreshTokenCreateOrConnectWithoutUserInput[]
    upsert?: RefreshTokenUpsertWithWhereUniqueWithoutUserInput | RefreshTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RefreshTokenCreateManyUserInputEnvelope
    set?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    disconnect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    delete?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    update?: RefreshTokenUpdateWithWhereUniqueWithoutUserInput | RefreshTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RefreshTokenUpdateManyWithWhereWithoutUserInput | RefreshTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
  }

  export type RouteUncheckedUpdateManyWithoutDriverNestedInput = {
    create?: XOR<RouteCreateWithoutDriverInput, RouteUncheckedCreateWithoutDriverInput> | RouteCreateWithoutDriverInput[] | RouteUncheckedCreateWithoutDriverInput[]
    connectOrCreate?: RouteCreateOrConnectWithoutDriverInput | RouteCreateOrConnectWithoutDriverInput[]
    upsert?: RouteUpsertWithWhereUniqueWithoutDriverInput | RouteUpsertWithWhereUniqueWithoutDriverInput[]
    createMany?: RouteCreateManyDriverInputEnvelope
    set?: RouteWhereUniqueInput | RouteWhereUniqueInput[]
    disconnect?: RouteWhereUniqueInput | RouteWhereUniqueInput[]
    delete?: RouteWhereUniqueInput | RouteWhereUniqueInput[]
    connect?: RouteWhereUniqueInput | RouteWhereUniqueInput[]
    update?: RouteUpdateWithWhereUniqueWithoutDriverInput | RouteUpdateWithWhereUniqueWithoutDriverInput[]
    updateMany?: RouteUpdateManyWithWhereWithoutDriverInput | RouteUpdateManyWithWhereWithoutDriverInput[]
    deleteMany?: RouteScalarWhereInput | RouteScalarWhereInput[]
  }

  export type RefreshTokenUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput> | RefreshTokenCreateWithoutUserInput[] | RefreshTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutUserInput | RefreshTokenCreateOrConnectWithoutUserInput[]
    upsert?: RefreshTokenUpsertWithWhereUniqueWithoutUserInput | RefreshTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RefreshTokenCreateManyUserInputEnvelope
    set?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    disconnect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    delete?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    update?: RefreshTokenUpdateWithWhereUniqueWithoutUserInput | RefreshTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RefreshTokenUpdateManyWithWhereWithoutUserInput | RefreshTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutRefreshTokensInput = {
    create?: XOR<UserCreateWithoutRefreshTokensInput, UserUncheckedCreateWithoutRefreshTokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutRefreshTokensInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutRefreshTokensNestedInput = {
    create?: XOR<UserCreateWithoutRefreshTokensInput, UserUncheckedCreateWithoutRefreshTokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutRefreshTokensInput
    upsert?: UserUpsertWithoutRefreshTokensInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRefreshTokensInput, UserUpdateWithoutRefreshTokensInput>, UserUncheckedUpdateWithoutRefreshTokensInput>
  }

  export type TenantCreateNestedOneWithoutVehiclesInput = {
    create?: XOR<TenantCreateWithoutVehiclesInput, TenantUncheckedCreateWithoutVehiclesInput>
    connectOrCreate?: TenantCreateOrConnectWithoutVehiclesInput
    connect?: TenantWhereUniqueInput
  }

  export type RouteCreateNestedManyWithoutVehicleInput = {
    create?: XOR<RouteCreateWithoutVehicleInput, RouteUncheckedCreateWithoutVehicleInput> | RouteCreateWithoutVehicleInput[] | RouteUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: RouteCreateOrConnectWithoutVehicleInput | RouteCreateOrConnectWithoutVehicleInput[]
    createMany?: RouteCreateManyVehicleInputEnvelope
    connect?: RouteWhereUniqueInput | RouteWhereUniqueInput[]
  }

  export type RouteUncheckedCreateNestedManyWithoutVehicleInput = {
    create?: XOR<RouteCreateWithoutVehicleInput, RouteUncheckedCreateWithoutVehicleInput> | RouteCreateWithoutVehicleInput[] | RouteUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: RouteCreateOrConnectWithoutVehicleInput | RouteCreateOrConnectWithoutVehicleInput[]
    createMany?: RouteCreateManyVehicleInputEnvelope
    connect?: RouteWhereUniqueInput | RouteWhereUniqueInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type TenantUpdateOneRequiredWithoutVehiclesNestedInput = {
    create?: XOR<TenantCreateWithoutVehiclesInput, TenantUncheckedCreateWithoutVehiclesInput>
    connectOrCreate?: TenantCreateOrConnectWithoutVehiclesInput
    upsert?: TenantUpsertWithoutVehiclesInput
    connect?: TenantWhereUniqueInput
    update?: XOR<XOR<TenantUpdateToOneWithWhereWithoutVehiclesInput, TenantUpdateWithoutVehiclesInput>, TenantUncheckedUpdateWithoutVehiclesInput>
  }

  export type RouteUpdateManyWithoutVehicleNestedInput = {
    create?: XOR<RouteCreateWithoutVehicleInput, RouteUncheckedCreateWithoutVehicleInput> | RouteCreateWithoutVehicleInput[] | RouteUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: RouteCreateOrConnectWithoutVehicleInput | RouteCreateOrConnectWithoutVehicleInput[]
    upsert?: RouteUpsertWithWhereUniqueWithoutVehicleInput | RouteUpsertWithWhereUniqueWithoutVehicleInput[]
    createMany?: RouteCreateManyVehicleInputEnvelope
    set?: RouteWhereUniqueInput | RouteWhereUniqueInput[]
    disconnect?: RouteWhereUniqueInput | RouteWhereUniqueInput[]
    delete?: RouteWhereUniqueInput | RouteWhereUniqueInput[]
    connect?: RouteWhereUniqueInput | RouteWhereUniqueInput[]
    update?: RouteUpdateWithWhereUniqueWithoutVehicleInput | RouteUpdateWithWhereUniqueWithoutVehicleInput[]
    updateMany?: RouteUpdateManyWithWhereWithoutVehicleInput | RouteUpdateManyWithWhereWithoutVehicleInput[]
    deleteMany?: RouteScalarWhereInput | RouteScalarWhereInput[]
  }

  export type RouteUncheckedUpdateManyWithoutVehicleNestedInput = {
    create?: XOR<RouteCreateWithoutVehicleInput, RouteUncheckedCreateWithoutVehicleInput> | RouteCreateWithoutVehicleInput[] | RouteUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: RouteCreateOrConnectWithoutVehicleInput | RouteCreateOrConnectWithoutVehicleInput[]
    upsert?: RouteUpsertWithWhereUniqueWithoutVehicleInput | RouteUpsertWithWhereUniqueWithoutVehicleInput[]
    createMany?: RouteCreateManyVehicleInputEnvelope
    set?: RouteWhereUniqueInput | RouteWhereUniqueInput[]
    disconnect?: RouteWhereUniqueInput | RouteWhereUniqueInput[]
    delete?: RouteWhereUniqueInput | RouteWhereUniqueInput[]
    connect?: RouteWhereUniqueInput | RouteWhereUniqueInput[]
    update?: RouteUpdateWithWhereUniqueWithoutVehicleInput | RouteUpdateWithWhereUniqueWithoutVehicleInput[]
    updateMany?: RouteUpdateManyWithWhereWithoutVehicleInput | RouteUpdateManyWithWhereWithoutVehicleInput[]
    deleteMany?: RouteScalarWhereInput | RouteScalarWhereInput[]
  }

  export type TenantCreateNestedOneWithoutClientsInput = {
    create?: XOR<TenantCreateWithoutClientsInput, TenantUncheckedCreateWithoutClientsInput>
    connectOrCreate?: TenantCreateOrConnectWithoutClientsInput
    connect?: TenantWhereUniqueInput
  }

  export type DeliveryCreateNestedManyWithoutClientInput = {
    create?: XOR<DeliveryCreateWithoutClientInput, DeliveryUncheckedCreateWithoutClientInput> | DeliveryCreateWithoutClientInput[] | DeliveryUncheckedCreateWithoutClientInput[]
    connectOrCreate?: DeliveryCreateOrConnectWithoutClientInput | DeliveryCreateOrConnectWithoutClientInput[]
    createMany?: DeliveryCreateManyClientInputEnvelope
    connect?: DeliveryWhereUniqueInput | DeliveryWhereUniqueInput[]
  }

  export type DeliveryUncheckedCreateNestedManyWithoutClientInput = {
    create?: XOR<DeliveryCreateWithoutClientInput, DeliveryUncheckedCreateWithoutClientInput> | DeliveryCreateWithoutClientInput[] | DeliveryUncheckedCreateWithoutClientInput[]
    connectOrCreate?: DeliveryCreateOrConnectWithoutClientInput | DeliveryCreateOrConnectWithoutClientInput[]
    createMany?: DeliveryCreateManyClientInputEnvelope
    connect?: DeliveryWhereUniqueInput | DeliveryWhereUniqueInput[]
  }

  export type TenantUpdateOneRequiredWithoutClientsNestedInput = {
    create?: XOR<TenantCreateWithoutClientsInput, TenantUncheckedCreateWithoutClientsInput>
    connectOrCreate?: TenantCreateOrConnectWithoutClientsInput
    upsert?: TenantUpsertWithoutClientsInput
    connect?: TenantWhereUniqueInput
    update?: XOR<XOR<TenantUpdateToOneWithWhereWithoutClientsInput, TenantUpdateWithoutClientsInput>, TenantUncheckedUpdateWithoutClientsInput>
  }

  export type DeliveryUpdateManyWithoutClientNestedInput = {
    create?: XOR<DeliveryCreateWithoutClientInput, DeliveryUncheckedCreateWithoutClientInput> | DeliveryCreateWithoutClientInput[] | DeliveryUncheckedCreateWithoutClientInput[]
    connectOrCreate?: DeliveryCreateOrConnectWithoutClientInput | DeliveryCreateOrConnectWithoutClientInput[]
    upsert?: DeliveryUpsertWithWhereUniqueWithoutClientInput | DeliveryUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: DeliveryCreateManyClientInputEnvelope
    set?: DeliveryWhereUniqueInput | DeliveryWhereUniqueInput[]
    disconnect?: DeliveryWhereUniqueInput | DeliveryWhereUniqueInput[]
    delete?: DeliveryWhereUniqueInput | DeliveryWhereUniqueInput[]
    connect?: DeliveryWhereUniqueInput | DeliveryWhereUniqueInput[]
    update?: DeliveryUpdateWithWhereUniqueWithoutClientInput | DeliveryUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: DeliveryUpdateManyWithWhereWithoutClientInput | DeliveryUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: DeliveryScalarWhereInput | DeliveryScalarWhereInput[]
  }

  export type DeliveryUncheckedUpdateManyWithoutClientNestedInput = {
    create?: XOR<DeliveryCreateWithoutClientInput, DeliveryUncheckedCreateWithoutClientInput> | DeliveryCreateWithoutClientInput[] | DeliveryUncheckedCreateWithoutClientInput[]
    connectOrCreate?: DeliveryCreateOrConnectWithoutClientInput | DeliveryCreateOrConnectWithoutClientInput[]
    upsert?: DeliveryUpsertWithWhereUniqueWithoutClientInput | DeliveryUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: DeliveryCreateManyClientInputEnvelope
    set?: DeliveryWhereUniqueInput | DeliveryWhereUniqueInput[]
    disconnect?: DeliveryWhereUniqueInput | DeliveryWhereUniqueInput[]
    delete?: DeliveryWhereUniqueInput | DeliveryWhereUniqueInput[]
    connect?: DeliveryWhereUniqueInput | DeliveryWhereUniqueInput[]
    update?: DeliveryUpdateWithWhereUniqueWithoutClientInput | DeliveryUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: DeliveryUpdateManyWithWhereWithoutClientInput | DeliveryUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: DeliveryScalarWhereInput | DeliveryScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutRoutesInput = {
    create?: XOR<UserCreateWithoutRoutesInput, UserUncheckedCreateWithoutRoutesInput>
    connectOrCreate?: UserCreateOrConnectWithoutRoutesInput
    connect?: UserWhereUniqueInput
  }

  export type VehicleCreateNestedOneWithoutRoutesInput = {
    create?: XOR<VehicleCreateWithoutRoutesInput, VehicleUncheckedCreateWithoutRoutesInput>
    connectOrCreate?: VehicleCreateOrConnectWithoutRoutesInput
    connect?: VehicleWhereUniqueInput
  }

  export type TenantCreateNestedOneWithoutRoutesInput = {
    create?: XOR<TenantCreateWithoutRoutesInput, TenantUncheckedCreateWithoutRoutesInput>
    connectOrCreate?: TenantCreateOrConnectWithoutRoutesInput
    connect?: TenantWhereUniqueInput
  }

  export type DeliveryCreateNestedManyWithoutRouteInput = {
    create?: XOR<DeliveryCreateWithoutRouteInput, DeliveryUncheckedCreateWithoutRouteInput> | DeliveryCreateWithoutRouteInput[] | DeliveryUncheckedCreateWithoutRouteInput[]
    connectOrCreate?: DeliveryCreateOrConnectWithoutRouteInput | DeliveryCreateOrConnectWithoutRouteInput[]
    createMany?: DeliveryCreateManyRouteInputEnvelope
    connect?: DeliveryWhereUniqueInput | DeliveryWhereUniqueInput[]
  }

  export type LocationLogCreateNestedManyWithoutRouteInput = {
    create?: XOR<LocationLogCreateWithoutRouteInput, LocationLogUncheckedCreateWithoutRouteInput> | LocationLogCreateWithoutRouteInput[] | LocationLogUncheckedCreateWithoutRouteInput[]
    connectOrCreate?: LocationLogCreateOrConnectWithoutRouteInput | LocationLogCreateOrConnectWithoutRouteInput[]
    createMany?: LocationLogCreateManyRouteInputEnvelope
    connect?: LocationLogWhereUniqueInput | LocationLogWhereUniqueInput[]
  }

  export type DeliveryUncheckedCreateNestedManyWithoutRouteInput = {
    create?: XOR<DeliveryCreateWithoutRouteInput, DeliveryUncheckedCreateWithoutRouteInput> | DeliveryCreateWithoutRouteInput[] | DeliveryUncheckedCreateWithoutRouteInput[]
    connectOrCreate?: DeliveryCreateOrConnectWithoutRouteInput | DeliveryCreateOrConnectWithoutRouteInput[]
    createMany?: DeliveryCreateManyRouteInputEnvelope
    connect?: DeliveryWhereUniqueInput | DeliveryWhereUniqueInput[]
  }

  export type LocationLogUncheckedCreateNestedManyWithoutRouteInput = {
    create?: XOR<LocationLogCreateWithoutRouteInput, LocationLogUncheckedCreateWithoutRouteInput> | LocationLogCreateWithoutRouteInput[] | LocationLogUncheckedCreateWithoutRouteInput[]
    connectOrCreate?: LocationLogCreateOrConnectWithoutRouteInput | LocationLogCreateOrConnectWithoutRouteInput[]
    createMany?: LocationLogCreateManyRouteInputEnvelope
    connect?: LocationLogWhereUniqueInput | LocationLogWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutRoutesNestedInput = {
    create?: XOR<UserCreateWithoutRoutesInput, UserUncheckedCreateWithoutRoutesInput>
    connectOrCreate?: UserCreateOrConnectWithoutRoutesInput
    upsert?: UserUpsertWithoutRoutesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRoutesInput, UserUpdateWithoutRoutesInput>, UserUncheckedUpdateWithoutRoutesInput>
  }

  export type VehicleUpdateOneRequiredWithoutRoutesNestedInput = {
    create?: XOR<VehicleCreateWithoutRoutesInput, VehicleUncheckedCreateWithoutRoutesInput>
    connectOrCreate?: VehicleCreateOrConnectWithoutRoutesInput
    upsert?: VehicleUpsertWithoutRoutesInput
    connect?: VehicleWhereUniqueInput
    update?: XOR<XOR<VehicleUpdateToOneWithWhereWithoutRoutesInput, VehicleUpdateWithoutRoutesInput>, VehicleUncheckedUpdateWithoutRoutesInput>
  }

  export type TenantUpdateOneRequiredWithoutRoutesNestedInput = {
    create?: XOR<TenantCreateWithoutRoutesInput, TenantUncheckedCreateWithoutRoutesInput>
    connectOrCreate?: TenantCreateOrConnectWithoutRoutesInput
    upsert?: TenantUpsertWithoutRoutesInput
    connect?: TenantWhereUniqueInput
    update?: XOR<XOR<TenantUpdateToOneWithWhereWithoutRoutesInput, TenantUpdateWithoutRoutesInput>, TenantUncheckedUpdateWithoutRoutesInput>
  }

  export type DeliveryUpdateManyWithoutRouteNestedInput = {
    create?: XOR<DeliveryCreateWithoutRouteInput, DeliveryUncheckedCreateWithoutRouteInput> | DeliveryCreateWithoutRouteInput[] | DeliveryUncheckedCreateWithoutRouteInput[]
    connectOrCreate?: DeliveryCreateOrConnectWithoutRouteInput | DeliveryCreateOrConnectWithoutRouteInput[]
    upsert?: DeliveryUpsertWithWhereUniqueWithoutRouteInput | DeliveryUpsertWithWhereUniqueWithoutRouteInput[]
    createMany?: DeliveryCreateManyRouteInputEnvelope
    set?: DeliveryWhereUniqueInput | DeliveryWhereUniqueInput[]
    disconnect?: DeliveryWhereUniqueInput | DeliveryWhereUniqueInput[]
    delete?: DeliveryWhereUniqueInput | DeliveryWhereUniqueInput[]
    connect?: DeliveryWhereUniqueInput | DeliveryWhereUniqueInput[]
    update?: DeliveryUpdateWithWhereUniqueWithoutRouteInput | DeliveryUpdateWithWhereUniqueWithoutRouteInput[]
    updateMany?: DeliveryUpdateManyWithWhereWithoutRouteInput | DeliveryUpdateManyWithWhereWithoutRouteInput[]
    deleteMany?: DeliveryScalarWhereInput | DeliveryScalarWhereInput[]
  }

  export type LocationLogUpdateManyWithoutRouteNestedInput = {
    create?: XOR<LocationLogCreateWithoutRouteInput, LocationLogUncheckedCreateWithoutRouteInput> | LocationLogCreateWithoutRouteInput[] | LocationLogUncheckedCreateWithoutRouteInput[]
    connectOrCreate?: LocationLogCreateOrConnectWithoutRouteInput | LocationLogCreateOrConnectWithoutRouteInput[]
    upsert?: LocationLogUpsertWithWhereUniqueWithoutRouteInput | LocationLogUpsertWithWhereUniqueWithoutRouteInput[]
    createMany?: LocationLogCreateManyRouteInputEnvelope
    set?: LocationLogWhereUniqueInput | LocationLogWhereUniqueInput[]
    disconnect?: LocationLogWhereUniqueInput | LocationLogWhereUniqueInput[]
    delete?: LocationLogWhereUniqueInput | LocationLogWhereUniqueInput[]
    connect?: LocationLogWhereUniqueInput | LocationLogWhereUniqueInput[]
    update?: LocationLogUpdateWithWhereUniqueWithoutRouteInput | LocationLogUpdateWithWhereUniqueWithoutRouteInput[]
    updateMany?: LocationLogUpdateManyWithWhereWithoutRouteInput | LocationLogUpdateManyWithWhereWithoutRouteInput[]
    deleteMany?: LocationLogScalarWhereInput | LocationLogScalarWhereInput[]
  }

  export type DeliveryUncheckedUpdateManyWithoutRouteNestedInput = {
    create?: XOR<DeliveryCreateWithoutRouteInput, DeliveryUncheckedCreateWithoutRouteInput> | DeliveryCreateWithoutRouteInput[] | DeliveryUncheckedCreateWithoutRouteInput[]
    connectOrCreate?: DeliveryCreateOrConnectWithoutRouteInput | DeliveryCreateOrConnectWithoutRouteInput[]
    upsert?: DeliveryUpsertWithWhereUniqueWithoutRouteInput | DeliveryUpsertWithWhereUniqueWithoutRouteInput[]
    createMany?: DeliveryCreateManyRouteInputEnvelope
    set?: DeliveryWhereUniqueInput | DeliveryWhereUniqueInput[]
    disconnect?: DeliveryWhereUniqueInput | DeliveryWhereUniqueInput[]
    delete?: DeliveryWhereUniqueInput | DeliveryWhereUniqueInput[]
    connect?: DeliveryWhereUniqueInput | DeliveryWhereUniqueInput[]
    update?: DeliveryUpdateWithWhereUniqueWithoutRouteInput | DeliveryUpdateWithWhereUniqueWithoutRouteInput[]
    updateMany?: DeliveryUpdateManyWithWhereWithoutRouteInput | DeliveryUpdateManyWithWhereWithoutRouteInput[]
    deleteMany?: DeliveryScalarWhereInput | DeliveryScalarWhereInput[]
  }

  export type LocationLogUncheckedUpdateManyWithoutRouteNestedInput = {
    create?: XOR<LocationLogCreateWithoutRouteInput, LocationLogUncheckedCreateWithoutRouteInput> | LocationLogCreateWithoutRouteInput[] | LocationLogUncheckedCreateWithoutRouteInput[]
    connectOrCreate?: LocationLogCreateOrConnectWithoutRouteInput | LocationLogCreateOrConnectWithoutRouteInput[]
    upsert?: LocationLogUpsertWithWhereUniqueWithoutRouteInput | LocationLogUpsertWithWhereUniqueWithoutRouteInput[]
    createMany?: LocationLogCreateManyRouteInputEnvelope
    set?: LocationLogWhereUniqueInput | LocationLogWhereUniqueInput[]
    disconnect?: LocationLogWhereUniqueInput | LocationLogWhereUniqueInput[]
    delete?: LocationLogWhereUniqueInput | LocationLogWhereUniqueInput[]
    connect?: LocationLogWhereUniqueInput | LocationLogWhereUniqueInput[]
    update?: LocationLogUpdateWithWhereUniqueWithoutRouteInput | LocationLogUpdateWithWhereUniqueWithoutRouteInput[]
    updateMany?: LocationLogUpdateManyWithWhereWithoutRouteInput | LocationLogUpdateManyWithWhereWithoutRouteInput[]
    deleteMany?: LocationLogScalarWhereInput | LocationLogScalarWhereInput[]
  }

  export type RouteCreateNestedOneWithoutDeliveriesInput = {
    create?: XOR<RouteCreateWithoutDeliveriesInput, RouteUncheckedCreateWithoutDeliveriesInput>
    connectOrCreate?: RouteCreateOrConnectWithoutDeliveriesInput
    connect?: RouteWhereUniqueInput
  }

  export type ClientCreateNestedOneWithoutDeliveriesInput = {
    create?: XOR<ClientCreateWithoutDeliveriesInput, ClientUncheckedCreateWithoutDeliveriesInput>
    connectOrCreate?: ClientCreateOrConnectWithoutDeliveriesInput
    connect?: ClientWhereUniqueInput
  }

  export type TenantCreateNestedOneWithoutDeliveriesInput = {
    create?: XOR<TenantCreateWithoutDeliveriesInput, TenantUncheckedCreateWithoutDeliveriesInput>
    connectOrCreate?: TenantCreateOrConnectWithoutDeliveriesInput
    connect?: TenantWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type RouteUpdateOneRequiredWithoutDeliveriesNestedInput = {
    create?: XOR<RouteCreateWithoutDeliveriesInput, RouteUncheckedCreateWithoutDeliveriesInput>
    connectOrCreate?: RouteCreateOrConnectWithoutDeliveriesInput
    upsert?: RouteUpsertWithoutDeliveriesInput
    connect?: RouteWhereUniqueInput
    update?: XOR<XOR<RouteUpdateToOneWithWhereWithoutDeliveriesInput, RouteUpdateWithoutDeliveriesInput>, RouteUncheckedUpdateWithoutDeliveriesInput>
  }

  export type ClientUpdateOneRequiredWithoutDeliveriesNestedInput = {
    create?: XOR<ClientCreateWithoutDeliveriesInput, ClientUncheckedCreateWithoutDeliveriesInput>
    connectOrCreate?: ClientCreateOrConnectWithoutDeliveriesInput
    upsert?: ClientUpsertWithoutDeliveriesInput
    connect?: ClientWhereUniqueInput
    update?: XOR<XOR<ClientUpdateToOneWithWhereWithoutDeliveriesInput, ClientUpdateWithoutDeliveriesInput>, ClientUncheckedUpdateWithoutDeliveriesInput>
  }

  export type TenantUpdateOneRequiredWithoutDeliveriesNestedInput = {
    create?: XOR<TenantCreateWithoutDeliveriesInput, TenantUncheckedCreateWithoutDeliveriesInput>
    connectOrCreate?: TenantCreateOrConnectWithoutDeliveriesInput
    upsert?: TenantUpsertWithoutDeliveriesInput
    connect?: TenantWhereUniqueInput
    update?: XOR<XOR<TenantUpdateToOneWithWhereWithoutDeliveriesInput, TenantUpdateWithoutDeliveriesInput>, TenantUncheckedUpdateWithoutDeliveriesInput>
  }

  export type RouteCreateNestedOneWithoutLocationLogsInput = {
    create?: XOR<RouteCreateWithoutLocationLogsInput, RouteUncheckedCreateWithoutLocationLogsInput>
    connectOrCreate?: RouteCreateOrConnectWithoutLocationLogsInput
    connect?: RouteWhereUniqueInput
  }

  export type RouteUpdateOneRequiredWithoutLocationLogsNestedInput = {
    create?: XOR<RouteCreateWithoutLocationLogsInput, RouteUncheckedCreateWithoutLocationLogsInput>
    connectOrCreate?: RouteCreateOrConnectWithoutLocationLogsInput
    upsert?: RouteUpsertWithoutLocationLogsInput
    connect?: RouteWhereUniqueInput
    update?: XOR<XOR<RouteUpdateToOneWithWhereWithoutLocationLogsInput, RouteUpdateWithoutLocationLogsInput>, RouteUncheckedUpdateWithoutLocationLogsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type UserCreateWithoutTenantInput = {
    id?: string
    email: string
    password: string
    name: string
    avatarUrl?: string | null
    role: string
    status?: string
    resetPasswordToken?: string | null
    resetPasswordExp?: Date | string | null
    mustChangePassword?: boolean
    resetRequested?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    routes?: RouteCreateNestedManyWithoutDriverInput
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTenantInput = {
    id?: string
    email: string
    password: string
    name: string
    avatarUrl?: string | null
    role: string
    status?: string
    resetPasswordToken?: string | null
    resetPasswordExp?: Date | string | null
    mustChangePassword?: boolean
    resetRequested?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    routes?: RouteUncheckedCreateNestedManyWithoutDriverInput
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTenantInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTenantInput, UserUncheckedCreateWithoutTenantInput>
  }

  export type UserCreateManyTenantInputEnvelope = {
    data: UserCreateManyTenantInput | UserCreateManyTenantInput[]
    skipDuplicates?: boolean
  }

  export type VehicleCreateWithoutTenantInput = {
    id?: string
    plate: string
    model: string
    consumption: number
    createdAt?: Date | string
    updatedAt?: Date | string
    routes?: RouteCreateNestedManyWithoutVehicleInput
  }

  export type VehicleUncheckedCreateWithoutTenantInput = {
    id?: string
    plate: string
    model: string
    consumption: number
    createdAt?: Date | string
    updatedAt?: Date | string
    routes?: RouteUncheckedCreateNestedManyWithoutVehicleInput
  }

  export type VehicleCreateOrConnectWithoutTenantInput = {
    where: VehicleWhereUniqueInput
    create: XOR<VehicleCreateWithoutTenantInput, VehicleUncheckedCreateWithoutTenantInput>
  }

  export type VehicleCreateManyTenantInputEnvelope = {
    data: VehicleCreateManyTenantInput | VehicleCreateManyTenantInput[]
    skipDuplicates?: boolean
  }

  export type ClientCreateWithoutTenantInput = {
    id?: string
    name: string
    contactName?: string | null
    phone?: string | null
    address: string
    cep?: string | null
    latitude: number
    longitude: number
    geofenceRadius?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    deliveries?: DeliveryCreateNestedManyWithoutClientInput
  }

  export type ClientUncheckedCreateWithoutTenantInput = {
    id?: string
    name: string
    contactName?: string | null
    phone?: string | null
    address: string
    cep?: string | null
    latitude: number
    longitude: number
    geofenceRadius?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    deliveries?: DeliveryUncheckedCreateNestedManyWithoutClientInput
  }

  export type ClientCreateOrConnectWithoutTenantInput = {
    where: ClientWhereUniqueInput
    create: XOR<ClientCreateWithoutTenantInput, ClientUncheckedCreateWithoutTenantInput>
  }

  export type ClientCreateManyTenantInputEnvelope = {
    data: ClientCreateManyTenantInput | ClientCreateManyTenantInput[]
    skipDuplicates?: boolean
  }

  export type RouteCreateWithoutTenantInput = {
    id?: string
    name: string
    status?: string
    date?: Date | string
    plannedDistance: number
    plannedTime: number
    createdAt?: Date | string
    updatedAt?: Date | string
    returnToDepot?: boolean
    driver: UserCreateNestedOneWithoutRoutesInput
    vehicle: VehicleCreateNestedOneWithoutRoutesInput
    deliveries?: DeliveryCreateNestedManyWithoutRouteInput
    locationLogs?: LocationLogCreateNestedManyWithoutRouteInput
  }

  export type RouteUncheckedCreateWithoutTenantInput = {
    id?: string
    name: string
    status?: string
    date?: Date | string
    plannedDistance: number
    plannedTime: number
    driverId: string
    vehicleId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    returnToDepot?: boolean
    deliveries?: DeliveryUncheckedCreateNestedManyWithoutRouteInput
    locationLogs?: LocationLogUncheckedCreateNestedManyWithoutRouteInput
  }

  export type RouteCreateOrConnectWithoutTenantInput = {
    where: RouteWhereUniqueInput
    create: XOR<RouteCreateWithoutTenantInput, RouteUncheckedCreateWithoutTenantInput>
  }

  export type RouteCreateManyTenantInputEnvelope = {
    data: RouteCreateManyTenantInput | RouteCreateManyTenantInput[]
    skipDuplicates?: boolean
  }

  export type DeliveryCreateWithoutTenantInput = {
    id?: string
    sequence: number
    status?: string
    trackingToken?: string
    customerPhone?: string | null
    ratingInt?: number | null
    ratingComment?: string | null
    actualLatitude?: number | null
    actualLongitude?: number | null
    gpsAccuracy?: number | null
    gpsSpeed?: number | null
    gpsAltitude?: number | null
    gpsHeading?: number | null
    deliveredAt?: Date | string | null
    photoUrl?: string | null
    signatureUrl?: string | null
    notes?: string | null
    failureReason?: string | null
    isInsideGeofence?: boolean | null
    distanceFromClient?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    route: RouteCreateNestedOneWithoutDeliveriesInput
    client: ClientCreateNestedOneWithoutDeliveriesInput
  }

  export type DeliveryUncheckedCreateWithoutTenantInput = {
    id?: string
    sequence: number
    status?: string
    routeId: string
    clientId: string
    trackingToken?: string
    customerPhone?: string | null
    ratingInt?: number | null
    ratingComment?: string | null
    actualLatitude?: number | null
    actualLongitude?: number | null
    gpsAccuracy?: number | null
    gpsSpeed?: number | null
    gpsAltitude?: number | null
    gpsHeading?: number | null
    deliveredAt?: Date | string | null
    photoUrl?: string | null
    signatureUrl?: string | null
    notes?: string | null
    failureReason?: string | null
    isInsideGeofence?: boolean | null
    distanceFromClient?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DeliveryCreateOrConnectWithoutTenantInput = {
    where: DeliveryWhereUniqueInput
    create: XOR<DeliveryCreateWithoutTenantInput, DeliveryUncheckedCreateWithoutTenantInput>
  }

  export type DeliveryCreateManyTenantInputEnvelope = {
    data: DeliveryCreateManyTenantInput | DeliveryCreateManyTenantInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithWhereUniqueWithoutTenantInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutTenantInput, UserUncheckedUpdateWithoutTenantInput>
    create: XOR<UserCreateWithoutTenantInput, UserUncheckedCreateWithoutTenantInput>
  }

  export type UserUpdateWithWhereUniqueWithoutTenantInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutTenantInput, UserUncheckedUpdateWithoutTenantInput>
  }

  export type UserUpdateManyWithWhereWithoutTenantInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutTenantInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    avatarUrl?: StringNullableFilter<"User"> | string | null
    role?: StringFilter<"User"> | string
    status?: StringFilter<"User"> | string
    tenantId?: StringFilter<"User"> | string
    resetPasswordToken?: StringNullableFilter<"User"> | string | null
    resetPasswordExp?: DateTimeNullableFilter<"User"> | Date | string | null
    mustChangePassword?: BoolFilter<"User"> | boolean
    resetRequested?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }

  export type VehicleUpsertWithWhereUniqueWithoutTenantInput = {
    where: VehicleWhereUniqueInput
    update: XOR<VehicleUpdateWithoutTenantInput, VehicleUncheckedUpdateWithoutTenantInput>
    create: XOR<VehicleCreateWithoutTenantInput, VehicleUncheckedCreateWithoutTenantInput>
  }

  export type VehicleUpdateWithWhereUniqueWithoutTenantInput = {
    where: VehicleWhereUniqueInput
    data: XOR<VehicleUpdateWithoutTenantInput, VehicleUncheckedUpdateWithoutTenantInput>
  }

  export type VehicleUpdateManyWithWhereWithoutTenantInput = {
    where: VehicleScalarWhereInput
    data: XOR<VehicleUpdateManyMutationInput, VehicleUncheckedUpdateManyWithoutTenantInput>
  }

  export type VehicleScalarWhereInput = {
    AND?: VehicleScalarWhereInput | VehicleScalarWhereInput[]
    OR?: VehicleScalarWhereInput[]
    NOT?: VehicleScalarWhereInput | VehicleScalarWhereInput[]
    id?: StringFilter<"Vehicle"> | string
    plate?: StringFilter<"Vehicle"> | string
    model?: StringFilter<"Vehicle"> | string
    consumption?: FloatFilter<"Vehicle"> | number
    tenantId?: StringFilter<"Vehicle"> | string
    createdAt?: DateTimeFilter<"Vehicle"> | Date | string
    updatedAt?: DateTimeFilter<"Vehicle"> | Date | string
  }

  export type ClientUpsertWithWhereUniqueWithoutTenantInput = {
    where: ClientWhereUniqueInput
    update: XOR<ClientUpdateWithoutTenantInput, ClientUncheckedUpdateWithoutTenantInput>
    create: XOR<ClientCreateWithoutTenantInput, ClientUncheckedCreateWithoutTenantInput>
  }

  export type ClientUpdateWithWhereUniqueWithoutTenantInput = {
    where: ClientWhereUniqueInput
    data: XOR<ClientUpdateWithoutTenantInput, ClientUncheckedUpdateWithoutTenantInput>
  }

  export type ClientUpdateManyWithWhereWithoutTenantInput = {
    where: ClientScalarWhereInput
    data: XOR<ClientUpdateManyMutationInput, ClientUncheckedUpdateManyWithoutTenantInput>
  }

  export type ClientScalarWhereInput = {
    AND?: ClientScalarWhereInput | ClientScalarWhereInput[]
    OR?: ClientScalarWhereInput[]
    NOT?: ClientScalarWhereInput | ClientScalarWhereInput[]
    id?: StringFilter<"Client"> | string
    name?: StringFilter<"Client"> | string
    contactName?: StringNullableFilter<"Client"> | string | null
    phone?: StringNullableFilter<"Client"> | string | null
    address?: StringFilter<"Client"> | string
    cep?: StringNullableFilter<"Client"> | string | null
    latitude?: FloatFilter<"Client"> | number
    longitude?: FloatFilter<"Client"> | number
    geofenceRadius?: FloatFilter<"Client"> | number
    tenantId?: StringFilter<"Client"> | string
    createdAt?: DateTimeFilter<"Client"> | Date | string
    updatedAt?: DateTimeFilter<"Client"> | Date | string
  }

  export type RouteUpsertWithWhereUniqueWithoutTenantInput = {
    where: RouteWhereUniqueInput
    update: XOR<RouteUpdateWithoutTenantInput, RouteUncheckedUpdateWithoutTenantInput>
    create: XOR<RouteCreateWithoutTenantInput, RouteUncheckedCreateWithoutTenantInput>
  }

  export type RouteUpdateWithWhereUniqueWithoutTenantInput = {
    where: RouteWhereUniqueInput
    data: XOR<RouteUpdateWithoutTenantInput, RouteUncheckedUpdateWithoutTenantInput>
  }

  export type RouteUpdateManyWithWhereWithoutTenantInput = {
    where: RouteScalarWhereInput
    data: XOR<RouteUpdateManyMutationInput, RouteUncheckedUpdateManyWithoutTenantInput>
  }

  export type RouteScalarWhereInput = {
    AND?: RouteScalarWhereInput | RouteScalarWhereInput[]
    OR?: RouteScalarWhereInput[]
    NOT?: RouteScalarWhereInput | RouteScalarWhereInput[]
    id?: StringFilter<"Route"> | string
    name?: StringFilter<"Route"> | string
    status?: StringFilter<"Route"> | string
    date?: DateTimeFilter<"Route"> | Date | string
    plannedDistance?: FloatFilter<"Route"> | number
    plannedTime?: FloatFilter<"Route"> | number
    driverId?: StringFilter<"Route"> | string
    vehicleId?: StringFilter<"Route"> | string
    tenantId?: StringFilter<"Route"> | string
    createdAt?: DateTimeFilter<"Route"> | Date | string
    updatedAt?: DateTimeFilter<"Route"> | Date | string
    returnToDepot?: BoolFilter<"Route"> | boolean
  }

  export type DeliveryUpsertWithWhereUniqueWithoutTenantInput = {
    where: DeliveryWhereUniqueInput
    update: XOR<DeliveryUpdateWithoutTenantInput, DeliveryUncheckedUpdateWithoutTenantInput>
    create: XOR<DeliveryCreateWithoutTenantInput, DeliveryUncheckedCreateWithoutTenantInput>
  }

  export type DeliveryUpdateWithWhereUniqueWithoutTenantInput = {
    where: DeliveryWhereUniqueInput
    data: XOR<DeliveryUpdateWithoutTenantInput, DeliveryUncheckedUpdateWithoutTenantInput>
  }

  export type DeliveryUpdateManyWithWhereWithoutTenantInput = {
    where: DeliveryScalarWhereInput
    data: XOR<DeliveryUpdateManyMutationInput, DeliveryUncheckedUpdateManyWithoutTenantInput>
  }

  export type DeliveryScalarWhereInput = {
    AND?: DeliveryScalarWhereInput | DeliveryScalarWhereInput[]
    OR?: DeliveryScalarWhereInput[]
    NOT?: DeliveryScalarWhereInput | DeliveryScalarWhereInput[]
    id?: StringFilter<"Delivery"> | string
    sequence?: IntFilter<"Delivery"> | number
    status?: StringFilter<"Delivery"> | string
    routeId?: StringFilter<"Delivery"> | string
    clientId?: StringFilter<"Delivery"> | string
    trackingToken?: StringFilter<"Delivery"> | string
    customerPhone?: StringNullableFilter<"Delivery"> | string | null
    ratingInt?: IntNullableFilter<"Delivery"> | number | null
    ratingComment?: StringNullableFilter<"Delivery"> | string | null
    actualLatitude?: FloatNullableFilter<"Delivery"> | number | null
    actualLongitude?: FloatNullableFilter<"Delivery"> | number | null
    gpsAccuracy?: FloatNullableFilter<"Delivery"> | number | null
    gpsSpeed?: FloatNullableFilter<"Delivery"> | number | null
    gpsAltitude?: FloatNullableFilter<"Delivery"> | number | null
    gpsHeading?: FloatNullableFilter<"Delivery"> | number | null
    deliveredAt?: DateTimeNullableFilter<"Delivery"> | Date | string | null
    photoUrl?: StringNullableFilter<"Delivery"> | string | null
    signatureUrl?: StringNullableFilter<"Delivery"> | string | null
    notes?: StringNullableFilter<"Delivery"> | string | null
    failureReason?: StringNullableFilter<"Delivery"> | string | null
    isInsideGeofence?: BoolNullableFilter<"Delivery"> | boolean | null
    distanceFromClient?: FloatNullableFilter<"Delivery"> | number | null
    tenantId?: StringFilter<"Delivery"> | string
    createdAt?: DateTimeFilter<"Delivery"> | Date | string
    updatedAt?: DateTimeFilter<"Delivery"> | Date | string
  }

  export type TenantCreateWithoutUsersInput = {
    id?: string
    name: string
    address?: string | null
    cep?: string | null
    latitude?: number | null
    longitude?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    trialStartedAt?: Date | string | null
    trialEndsAt?: Date | string | null
    stripeCustomerId?: string | null
    subscriptionId?: string | null
    subscriptionStatus?: string
    subscriptionEnd?: Date | string | null
    vehicles?: VehicleCreateNestedManyWithoutTenantInput
    clients?: ClientCreateNestedManyWithoutTenantInput
    routes?: RouteCreateNestedManyWithoutTenantInput
    deliveries?: DeliveryCreateNestedManyWithoutTenantInput
  }

  export type TenantUncheckedCreateWithoutUsersInput = {
    id?: string
    name: string
    address?: string | null
    cep?: string | null
    latitude?: number | null
    longitude?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    trialStartedAt?: Date | string | null
    trialEndsAt?: Date | string | null
    stripeCustomerId?: string | null
    subscriptionId?: string | null
    subscriptionStatus?: string
    subscriptionEnd?: Date | string | null
    vehicles?: VehicleUncheckedCreateNestedManyWithoutTenantInput
    clients?: ClientUncheckedCreateNestedManyWithoutTenantInput
    routes?: RouteUncheckedCreateNestedManyWithoutTenantInput
    deliveries?: DeliveryUncheckedCreateNestedManyWithoutTenantInput
  }

  export type TenantCreateOrConnectWithoutUsersInput = {
    where: TenantWhereUniqueInput
    create: XOR<TenantCreateWithoutUsersInput, TenantUncheckedCreateWithoutUsersInput>
  }

  export type RouteCreateWithoutDriverInput = {
    id?: string
    name: string
    status?: string
    date?: Date | string
    plannedDistance: number
    plannedTime: number
    createdAt?: Date | string
    updatedAt?: Date | string
    returnToDepot?: boolean
    vehicle: VehicleCreateNestedOneWithoutRoutesInput
    tenant: TenantCreateNestedOneWithoutRoutesInput
    deliveries?: DeliveryCreateNestedManyWithoutRouteInput
    locationLogs?: LocationLogCreateNestedManyWithoutRouteInput
  }

  export type RouteUncheckedCreateWithoutDriverInput = {
    id?: string
    name: string
    status?: string
    date?: Date | string
    plannedDistance: number
    plannedTime: number
    vehicleId: string
    tenantId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    returnToDepot?: boolean
    deliveries?: DeliveryUncheckedCreateNestedManyWithoutRouteInput
    locationLogs?: LocationLogUncheckedCreateNestedManyWithoutRouteInput
  }

  export type RouteCreateOrConnectWithoutDriverInput = {
    where: RouteWhereUniqueInput
    create: XOR<RouteCreateWithoutDriverInput, RouteUncheckedCreateWithoutDriverInput>
  }

  export type RouteCreateManyDriverInputEnvelope = {
    data: RouteCreateManyDriverInput | RouteCreateManyDriverInput[]
    skipDuplicates?: boolean
  }

  export type RefreshTokenCreateWithoutUserInput = {
    id?: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type RefreshTokenUncheckedCreateWithoutUserInput = {
    id?: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type RefreshTokenCreateOrConnectWithoutUserInput = {
    where: RefreshTokenWhereUniqueInput
    create: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput>
  }

  export type RefreshTokenCreateManyUserInputEnvelope = {
    data: RefreshTokenCreateManyUserInput | RefreshTokenCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TenantUpsertWithoutUsersInput = {
    update: XOR<TenantUpdateWithoutUsersInput, TenantUncheckedUpdateWithoutUsersInput>
    create: XOR<TenantCreateWithoutUsersInput, TenantUncheckedCreateWithoutUsersInput>
    where?: TenantWhereInput
  }

  export type TenantUpdateToOneWithWhereWithoutUsersInput = {
    where?: TenantWhereInput
    data: XOR<TenantUpdateWithoutUsersInput, TenantUncheckedUpdateWithoutUsersInput>
  }

  export type TenantUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    cep?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trialStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionStatus?: StringFieldUpdateOperationsInput | string
    subscriptionEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vehicles?: VehicleUpdateManyWithoutTenantNestedInput
    clients?: ClientUpdateManyWithoutTenantNestedInput
    routes?: RouteUpdateManyWithoutTenantNestedInput
    deliveries?: DeliveryUpdateManyWithoutTenantNestedInput
  }

  export type TenantUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    cep?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trialStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionStatus?: StringFieldUpdateOperationsInput | string
    subscriptionEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vehicles?: VehicleUncheckedUpdateManyWithoutTenantNestedInput
    clients?: ClientUncheckedUpdateManyWithoutTenantNestedInput
    routes?: RouteUncheckedUpdateManyWithoutTenantNestedInput
    deliveries?: DeliveryUncheckedUpdateManyWithoutTenantNestedInput
  }

  export type RouteUpsertWithWhereUniqueWithoutDriverInput = {
    where: RouteWhereUniqueInput
    update: XOR<RouteUpdateWithoutDriverInput, RouteUncheckedUpdateWithoutDriverInput>
    create: XOR<RouteCreateWithoutDriverInput, RouteUncheckedCreateWithoutDriverInput>
  }

  export type RouteUpdateWithWhereUniqueWithoutDriverInput = {
    where: RouteWhereUniqueInput
    data: XOR<RouteUpdateWithoutDriverInput, RouteUncheckedUpdateWithoutDriverInput>
  }

  export type RouteUpdateManyWithWhereWithoutDriverInput = {
    where: RouteScalarWhereInput
    data: XOR<RouteUpdateManyMutationInput, RouteUncheckedUpdateManyWithoutDriverInput>
  }

  export type RefreshTokenUpsertWithWhereUniqueWithoutUserInput = {
    where: RefreshTokenWhereUniqueInput
    update: XOR<RefreshTokenUpdateWithoutUserInput, RefreshTokenUncheckedUpdateWithoutUserInput>
    create: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput>
  }

  export type RefreshTokenUpdateWithWhereUniqueWithoutUserInput = {
    where: RefreshTokenWhereUniqueInput
    data: XOR<RefreshTokenUpdateWithoutUserInput, RefreshTokenUncheckedUpdateWithoutUserInput>
  }

  export type RefreshTokenUpdateManyWithWhereWithoutUserInput = {
    where: RefreshTokenScalarWhereInput
    data: XOR<RefreshTokenUpdateManyMutationInput, RefreshTokenUncheckedUpdateManyWithoutUserInput>
  }

  export type RefreshTokenScalarWhereInput = {
    AND?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
    OR?: RefreshTokenScalarWhereInput[]
    NOT?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
    id?: StringFilter<"RefreshToken"> | string
    token?: StringFilter<"RefreshToken"> | string
    userId?: StringFilter<"RefreshToken"> | string
    expiresAt?: DateTimeFilter<"RefreshToken"> | Date | string
    createdAt?: DateTimeFilter<"RefreshToken"> | Date | string
  }

  export type UserCreateWithoutRefreshTokensInput = {
    id?: string
    email: string
    password: string
    name: string
    avatarUrl?: string | null
    role: string
    status?: string
    resetPasswordToken?: string | null
    resetPasswordExp?: Date | string | null
    mustChangePassword?: boolean
    resetRequested?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    tenant: TenantCreateNestedOneWithoutUsersInput
    routes?: RouteCreateNestedManyWithoutDriverInput
  }

  export type UserUncheckedCreateWithoutRefreshTokensInput = {
    id?: string
    email: string
    password: string
    name: string
    avatarUrl?: string | null
    role: string
    status?: string
    tenantId: string
    resetPasswordToken?: string | null
    resetPasswordExp?: Date | string | null
    mustChangePassword?: boolean
    resetRequested?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    routes?: RouteUncheckedCreateNestedManyWithoutDriverInput
  }

  export type UserCreateOrConnectWithoutRefreshTokensInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRefreshTokensInput, UserUncheckedCreateWithoutRefreshTokensInput>
  }

  export type UserUpsertWithoutRefreshTokensInput = {
    update: XOR<UserUpdateWithoutRefreshTokensInput, UserUncheckedUpdateWithoutRefreshTokensInput>
    create: XOR<UserCreateWithoutRefreshTokensInput, UserUncheckedCreateWithoutRefreshTokensInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRefreshTokensInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRefreshTokensInput, UserUncheckedUpdateWithoutRefreshTokensInput>
  }

  export type UserUpdateWithoutRefreshTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    resetPasswordToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordExp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    resetRequested?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenant?: TenantUpdateOneRequiredWithoutUsersNestedInput
    routes?: RouteUpdateManyWithoutDriverNestedInput
  }

  export type UserUncheckedUpdateWithoutRefreshTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    resetPasswordToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordExp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    resetRequested?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    routes?: RouteUncheckedUpdateManyWithoutDriverNestedInput
  }

  export type TenantCreateWithoutVehiclesInput = {
    id?: string
    name: string
    address?: string | null
    cep?: string | null
    latitude?: number | null
    longitude?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    trialStartedAt?: Date | string | null
    trialEndsAt?: Date | string | null
    stripeCustomerId?: string | null
    subscriptionId?: string | null
    subscriptionStatus?: string
    subscriptionEnd?: Date | string | null
    users?: UserCreateNestedManyWithoutTenantInput
    clients?: ClientCreateNestedManyWithoutTenantInput
    routes?: RouteCreateNestedManyWithoutTenantInput
    deliveries?: DeliveryCreateNestedManyWithoutTenantInput
  }

  export type TenantUncheckedCreateWithoutVehiclesInput = {
    id?: string
    name: string
    address?: string | null
    cep?: string | null
    latitude?: number | null
    longitude?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    trialStartedAt?: Date | string | null
    trialEndsAt?: Date | string | null
    stripeCustomerId?: string | null
    subscriptionId?: string | null
    subscriptionStatus?: string
    subscriptionEnd?: Date | string | null
    users?: UserUncheckedCreateNestedManyWithoutTenantInput
    clients?: ClientUncheckedCreateNestedManyWithoutTenantInput
    routes?: RouteUncheckedCreateNestedManyWithoutTenantInput
    deliveries?: DeliveryUncheckedCreateNestedManyWithoutTenantInput
  }

  export type TenantCreateOrConnectWithoutVehiclesInput = {
    where: TenantWhereUniqueInput
    create: XOR<TenantCreateWithoutVehiclesInput, TenantUncheckedCreateWithoutVehiclesInput>
  }

  export type RouteCreateWithoutVehicleInput = {
    id?: string
    name: string
    status?: string
    date?: Date | string
    plannedDistance: number
    plannedTime: number
    createdAt?: Date | string
    updatedAt?: Date | string
    returnToDepot?: boolean
    driver: UserCreateNestedOneWithoutRoutesInput
    tenant: TenantCreateNestedOneWithoutRoutesInput
    deliveries?: DeliveryCreateNestedManyWithoutRouteInput
    locationLogs?: LocationLogCreateNestedManyWithoutRouteInput
  }

  export type RouteUncheckedCreateWithoutVehicleInput = {
    id?: string
    name: string
    status?: string
    date?: Date | string
    plannedDistance: number
    plannedTime: number
    driverId: string
    tenantId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    returnToDepot?: boolean
    deliveries?: DeliveryUncheckedCreateNestedManyWithoutRouteInput
    locationLogs?: LocationLogUncheckedCreateNestedManyWithoutRouteInput
  }

  export type RouteCreateOrConnectWithoutVehicleInput = {
    where: RouteWhereUniqueInput
    create: XOR<RouteCreateWithoutVehicleInput, RouteUncheckedCreateWithoutVehicleInput>
  }

  export type RouteCreateManyVehicleInputEnvelope = {
    data: RouteCreateManyVehicleInput | RouteCreateManyVehicleInput[]
    skipDuplicates?: boolean
  }

  export type TenantUpsertWithoutVehiclesInput = {
    update: XOR<TenantUpdateWithoutVehiclesInput, TenantUncheckedUpdateWithoutVehiclesInput>
    create: XOR<TenantCreateWithoutVehiclesInput, TenantUncheckedCreateWithoutVehiclesInput>
    where?: TenantWhereInput
  }

  export type TenantUpdateToOneWithWhereWithoutVehiclesInput = {
    where?: TenantWhereInput
    data: XOR<TenantUpdateWithoutVehiclesInput, TenantUncheckedUpdateWithoutVehiclesInput>
  }

  export type TenantUpdateWithoutVehiclesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    cep?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trialStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionStatus?: StringFieldUpdateOperationsInput | string
    subscriptionEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users?: UserUpdateManyWithoutTenantNestedInput
    clients?: ClientUpdateManyWithoutTenantNestedInput
    routes?: RouteUpdateManyWithoutTenantNestedInput
    deliveries?: DeliveryUpdateManyWithoutTenantNestedInput
  }

  export type TenantUncheckedUpdateWithoutVehiclesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    cep?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trialStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionStatus?: StringFieldUpdateOperationsInput | string
    subscriptionEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users?: UserUncheckedUpdateManyWithoutTenantNestedInput
    clients?: ClientUncheckedUpdateManyWithoutTenantNestedInput
    routes?: RouteUncheckedUpdateManyWithoutTenantNestedInput
    deliveries?: DeliveryUncheckedUpdateManyWithoutTenantNestedInput
  }

  export type RouteUpsertWithWhereUniqueWithoutVehicleInput = {
    where: RouteWhereUniqueInput
    update: XOR<RouteUpdateWithoutVehicleInput, RouteUncheckedUpdateWithoutVehicleInput>
    create: XOR<RouteCreateWithoutVehicleInput, RouteUncheckedCreateWithoutVehicleInput>
  }

  export type RouteUpdateWithWhereUniqueWithoutVehicleInput = {
    where: RouteWhereUniqueInput
    data: XOR<RouteUpdateWithoutVehicleInput, RouteUncheckedUpdateWithoutVehicleInput>
  }

  export type RouteUpdateManyWithWhereWithoutVehicleInput = {
    where: RouteScalarWhereInput
    data: XOR<RouteUpdateManyMutationInput, RouteUncheckedUpdateManyWithoutVehicleInput>
  }

  export type TenantCreateWithoutClientsInput = {
    id?: string
    name: string
    address?: string | null
    cep?: string | null
    latitude?: number | null
    longitude?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    trialStartedAt?: Date | string | null
    trialEndsAt?: Date | string | null
    stripeCustomerId?: string | null
    subscriptionId?: string | null
    subscriptionStatus?: string
    subscriptionEnd?: Date | string | null
    users?: UserCreateNestedManyWithoutTenantInput
    vehicles?: VehicleCreateNestedManyWithoutTenantInput
    routes?: RouteCreateNestedManyWithoutTenantInput
    deliveries?: DeliveryCreateNestedManyWithoutTenantInput
  }

  export type TenantUncheckedCreateWithoutClientsInput = {
    id?: string
    name: string
    address?: string | null
    cep?: string | null
    latitude?: number | null
    longitude?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    trialStartedAt?: Date | string | null
    trialEndsAt?: Date | string | null
    stripeCustomerId?: string | null
    subscriptionId?: string | null
    subscriptionStatus?: string
    subscriptionEnd?: Date | string | null
    users?: UserUncheckedCreateNestedManyWithoutTenantInput
    vehicles?: VehicleUncheckedCreateNestedManyWithoutTenantInput
    routes?: RouteUncheckedCreateNestedManyWithoutTenantInput
    deliveries?: DeliveryUncheckedCreateNestedManyWithoutTenantInput
  }

  export type TenantCreateOrConnectWithoutClientsInput = {
    where: TenantWhereUniqueInput
    create: XOR<TenantCreateWithoutClientsInput, TenantUncheckedCreateWithoutClientsInput>
  }

  export type DeliveryCreateWithoutClientInput = {
    id?: string
    sequence: number
    status?: string
    trackingToken?: string
    customerPhone?: string | null
    ratingInt?: number | null
    ratingComment?: string | null
    actualLatitude?: number | null
    actualLongitude?: number | null
    gpsAccuracy?: number | null
    gpsSpeed?: number | null
    gpsAltitude?: number | null
    gpsHeading?: number | null
    deliveredAt?: Date | string | null
    photoUrl?: string | null
    signatureUrl?: string | null
    notes?: string | null
    failureReason?: string | null
    isInsideGeofence?: boolean | null
    distanceFromClient?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    route: RouteCreateNestedOneWithoutDeliveriesInput
    tenant: TenantCreateNestedOneWithoutDeliveriesInput
  }

  export type DeliveryUncheckedCreateWithoutClientInput = {
    id?: string
    sequence: number
    status?: string
    routeId: string
    trackingToken?: string
    customerPhone?: string | null
    ratingInt?: number | null
    ratingComment?: string | null
    actualLatitude?: number | null
    actualLongitude?: number | null
    gpsAccuracy?: number | null
    gpsSpeed?: number | null
    gpsAltitude?: number | null
    gpsHeading?: number | null
    deliveredAt?: Date | string | null
    photoUrl?: string | null
    signatureUrl?: string | null
    notes?: string | null
    failureReason?: string | null
    isInsideGeofence?: boolean | null
    distanceFromClient?: number | null
    tenantId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DeliveryCreateOrConnectWithoutClientInput = {
    where: DeliveryWhereUniqueInput
    create: XOR<DeliveryCreateWithoutClientInput, DeliveryUncheckedCreateWithoutClientInput>
  }

  export type DeliveryCreateManyClientInputEnvelope = {
    data: DeliveryCreateManyClientInput | DeliveryCreateManyClientInput[]
    skipDuplicates?: boolean
  }

  export type TenantUpsertWithoutClientsInput = {
    update: XOR<TenantUpdateWithoutClientsInput, TenantUncheckedUpdateWithoutClientsInput>
    create: XOR<TenantCreateWithoutClientsInput, TenantUncheckedCreateWithoutClientsInput>
    where?: TenantWhereInput
  }

  export type TenantUpdateToOneWithWhereWithoutClientsInput = {
    where?: TenantWhereInput
    data: XOR<TenantUpdateWithoutClientsInput, TenantUncheckedUpdateWithoutClientsInput>
  }

  export type TenantUpdateWithoutClientsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    cep?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trialStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionStatus?: StringFieldUpdateOperationsInput | string
    subscriptionEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users?: UserUpdateManyWithoutTenantNestedInput
    vehicles?: VehicleUpdateManyWithoutTenantNestedInput
    routes?: RouteUpdateManyWithoutTenantNestedInput
    deliveries?: DeliveryUpdateManyWithoutTenantNestedInput
  }

  export type TenantUncheckedUpdateWithoutClientsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    cep?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trialStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionStatus?: StringFieldUpdateOperationsInput | string
    subscriptionEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users?: UserUncheckedUpdateManyWithoutTenantNestedInput
    vehicles?: VehicleUncheckedUpdateManyWithoutTenantNestedInput
    routes?: RouteUncheckedUpdateManyWithoutTenantNestedInput
    deliveries?: DeliveryUncheckedUpdateManyWithoutTenantNestedInput
  }

  export type DeliveryUpsertWithWhereUniqueWithoutClientInput = {
    where: DeliveryWhereUniqueInput
    update: XOR<DeliveryUpdateWithoutClientInput, DeliveryUncheckedUpdateWithoutClientInput>
    create: XOR<DeliveryCreateWithoutClientInput, DeliveryUncheckedCreateWithoutClientInput>
  }

  export type DeliveryUpdateWithWhereUniqueWithoutClientInput = {
    where: DeliveryWhereUniqueInput
    data: XOR<DeliveryUpdateWithoutClientInput, DeliveryUncheckedUpdateWithoutClientInput>
  }

  export type DeliveryUpdateManyWithWhereWithoutClientInput = {
    where: DeliveryScalarWhereInput
    data: XOR<DeliveryUpdateManyMutationInput, DeliveryUncheckedUpdateManyWithoutClientInput>
  }

  export type UserCreateWithoutRoutesInput = {
    id?: string
    email: string
    password: string
    name: string
    avatarUrl?: string | null
    role: string
    status?: string
    resetPasswordToken?: string | null
    resetPasswordExp?: Date | string | null
    mustChangePassword?: boolean
    resetRequested?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    tenant: TenantCreateNestedOneWithoutUsersInput
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutRoutesInput = {
    id?: string
    email: string
    password: string
    name: string
    avatarUrl?: string | null
    role: string
    status?: string
    tenantId: string
    resetPasswordToken?: string | null
    resetPasswordExp?: Date | string | null
    mustChangePassword?: boolean
    resetRequested?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutRoutesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRoutesInput, UserUncheckedCreateWithoutRoutesInput>
  }

  export type VehicleCreateWithoutRoutesInput = {
    id?: string
    plate: string
    model: string
    consumption: number
    createdAt?: Date | string
    updatedAt?: Date | string
    tenant: TenantCreateNestedOneWithoutVehiclesInput
  }

  export type VehicleUncheckedCreateWithoutRoutesInput = {
    id?: string
    plate: string
    model: string
    consumption: number
    tenantId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VehicleCreateOrConnectWithoutRoutesInput = {
    where: VehicleWhereUniqueInput
    create: XOR<VehicleCreateWithoutRoutesInput, VehicleUncheckedCreateWithoutRoutesInput>
  }

  export type TenantCreateWithoutRoutesInput = {
    id?: string
    name: string
    address?: string | null
    cep?: string | null
    latitude?: number | null
    longitude?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    trialStartedAt?: Date | string | null
    trialEndsAt?: Date | string | null
    stripeCustomerId?: string | null
    subscriptionId?: string | null
    subscriptionStatus?: string
    subscriptionEnd?: Date | string | null
    users?: UserCreateNestedManyWithoutTenantInput
    vehicles?: VehicleCreateNestedManyWithoutTenantInput
    clients?: ClientCreateNestedManyWithoutTenantInput
    deliveries?: DeliveryCreateNestedManyWithoutTenantInput
  }

  export type TenantUncheckedCreateWithoutRoutesInput = {
    id?: string
    name: string
    address?: string | null
    cep?: string | null
    latitude?: number | null
    longitude?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    trialStartedAt?: Date | string | null
    trialEndsAt?: Date | string | null
    stripeCustomerId?: string | null
    subscriptionId?: string | null
    subscriptionStatus?: string
    subscriptionEnd?: Date | string | null
    users?: UserUncheckedCreateNestedManyWithoutTenantInput
    vehicles?: VehicleUncheckedCreateNestedManyWithoutTenantInput
    clients?: ClientUncheckedCreateNestedManyWithoutTenantInput
    deliveries?: DeliveryUncheckedCreateNestedManyWithoutTenantInput
  }

  export type TenantCreateOrConnectWithoutRoutesInput = {
    where: TenantWhereUniqueInput
    create: XOR<TenantCreateWithoutRoutesInput, TenantUncheckedCreateWithoutRoutesInput>
  }

  export type DeliveryCreateWithoutRouteInput = {
    id?: string
    sequence: number
    status?: string
    trackingToken?: string
    customerPhone?: string | null
    ratingInt?: number | null
    ratingComment?: string | null
    actualLatitude?: number | null
    actualLongitude?: number | null
    gpsAccuracy?: number | null
    gpsSpeed?: number | null
    gpsAltitude?: number | null
    gpsHeading?: number | null
    deliveredAt?: Date | string | null
    photoUrl?: string | null
    signatureUrl?: string | null
    notes?: string | null
    failureReason?: string | null
    isInsideGeofence?: boolean | null
    distanceFromClient?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    client: ClientCreateNestedOneWithoutDeliveriesInput
    tenant: TenantCreateNestedOneWithoutDeliveriesInput
  }

  export type DeliveryUncheckedCreateWithoutRouteInput = {
    id?: string
    sequence: number
    status?: string
    clientId: string
    trackingToken?: string
    customerPhone?: string | null
    ratingInt?: number | null
    ratingComment?: string | null
    actualLatitude?: number | null
    actualLongitude?: number | null
    gpsAccuracy?: number | null
    gpsSpeed?: number | null
    gpsAltitude?: number | null
    gpsHeading?: number | null
    deliveredAt?: Date | string | null
    photoUrl?: string | null
    signatureUrl?: string | null
    notes?: string | null
    failureReason?: string | null
    isInsideGeofence?: boolean | null
    distanceFromClient?: number | null
    tenantId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DeliveryCreateOrConnectWithoutRouteInput = {
    where: DeliveryWhereUniqueInput
    create: XOR<DeliveryCreateWithoutRouteInput, DeliveryUncheckedCreateWithoutRouteInput>
  }

  export type DeliveryCreateManyRouteInputEnvelope = {
    data: DeliveryCreateManyRouteInput | DeliveryCreateManyRouteInput[]
    skipDuplicates?: boolean
  }

  export type LocationLogCreateWithoutRouteInput = {
    id?: string
    latitude: number
    longitude: number
    speed?: number | null
    accuracy?: number | null
    altitude?: number | null
    heading?: number | null
    timestamp?: Date | string
  }

  export type LocationLogUncheckedCreateWithoutRouteInput = {
    id?: string
    latitude: number
    longitude: number
    speed?: number | null
    accuracy?: number | null
    altitude?: number | null
    heading?: number | null
    timestamp?: Date | string
  }

  export type LocationLogCreateOrConnectWithoutRouteInput = {
    where: LocationLogWhereUniqueInput
    create: XOR<LocationLogCreateWithoutRouteInput, LocationLogUncheckedCreateWithoutRouteInput>
  }

  export type LocationLogCreateManyRouteInputEnvelope = {
    data: LocationLogCreateManyRouteInput | LocationLogCreateManyRouteInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutRoutesInput = {
    update: XOR<UserUpdateWithoutRoutesInput, UserUncheckedUpdateWithoutRoutesInput>
    create: XOR<UserCreateWithoutRoutesInput, UserUncheckedCreateWithoutRoutesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRoutesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRoutesInput, UserUncheckedUpdateWithoutRoutesInput>
  }

  export type UserUpdateWithoutRoutesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    resetPasswordToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordExp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    resetRequested?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenant?: TenantUpdateOneRequiredWithoutUsersNestedInput
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutRoutesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    resetPasswordToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordExp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    resetRequested?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
  }

  export type VehicleUpsertWithoutRoutesInput = {
    update: XOR<VehicleUpdateWithoutRoutesInput, VehicleUncheckedUpdateWithoutRoutesInput>
    create: XOR<VehicleCreateWithoutRoutesInput, VehicleUncheckedCreateWithoutRoutesInput>
    where?: VehicleWhereInput
  }

  export type VehicleUpdateToOneWithWhereWithoutRoutesInput = {
    where?: VehicleWhereInput
    data: XOR<VehicleUpdateWithoutRoutesInput, VehicleUncheckedUpdateWithoutRoutesInput>
  }

  export type VehicleUpdateWithoutRoutesInput = {
    id?: StringFieldUpdateOperationsInput | string
    plate?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    consumption?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenant?: TenantUpdateOneRequiredWithoutVehiclesNestedInput
  }

  export type VehicleUncheckedUpdateWithoutRoutesInput = {
    id?: StringFieldUpdateOperationsInput | string
    plate?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    consumption?: FloatFieldUpdateOperationsInput | number
    tenantId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TenantUpsertWithoutRoutesInput = {
    update: XOR<TenantUpdateWithoutRoutesInput, TenantUncheckedUpdateWithoutRoutesInput>
    create: XOR<TenantCreateWithoutRoutesInput, TenantUncheckedCreateWithoutRoutesInput>
    where?: TenantWhereInput
  }

  export type TenantUpdateToOneWithWhereWithoutRoutesInput = {
    where?: TenantWhereInput
    data: XOR<TenantUpdateWithoutRoutesInput, TenantUncheckedUpdateWithoutRoutesInput>
  }

  export type TenantUpdateWithoutRoutesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    cep?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trialStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionStatus?: StringFieldUpdateOperationsInput | string
    subscriptionEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users?: UserUpdateManyWithoutTenantNestedInput
    vehicles?: VehicleUpdateManyWithoutTenantNestedInput
    clients?: ClientUpdateManyWithoutTenantNestedInput
    deliveries?: DeliveryUpdateManyWithoutTenantNestedInput
  }

  export type TenantUncheckedUpdateWithoutRoutesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    cep?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trialStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionStatus?: StringFieldUpdateOperationsInput | string
    subscriptionEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users?: UserUncheckedUpdateManyWithoutTenantNestedInput
    vehicles?: VehicleUncheckedUpdateManyWithoutTenantNestedInput
    clients?: ClientUncheckedUpdateManyWithoutTenantNestedInput
    deliveries?: DeliveryUncheckedUpdateManyWithoutTenantNestedInput
  }

  export type DeliveryUpsertWithWhereUniqueWithoutRouteInput = {
    where: DeliveryWhereUniqueInput
    update: XOR<DeliveryUpdateWithoutRouteInput, DeliveryUncheckedUpdateWithoutRouteInput>
    create: XOR<DeliveryCreateWithoutRouteInput, DeliveryUncheckedCreateWithoutRouteInput>
  }

  export type DeliveryUpdateWithWhereUniqueWithoutRouteInput = {
    where: DeliveryWhereUniqueInput
    data: XOR<DeliveryUpdateWithoutRouteInput, DeliveryUncheckedUpdateWithoutRouteInput>
  }

  export type DeliveryUpdateManyWithWhereWithoutRouteInput = {
    where: DeliveryScalarWhereInput
    data: XOR<DeliveryUpdateManyMutationInput, DeliveryUncheckedUpdateManyWithoutRouteInput>
  }

  export type LocationLogUpsertWithWhereUniqueWithoutRouteInput = {
    where: LocationLogWhereUniqueInput
    update: XOR<LocationLogUpdateWithoutRouteInput, LocationLogUncheckedUpdateWithoutRouteInput>
    create: XOR<LocationLogCreateWithoutRouteInput, LocationLogUncheckedCreateWithoutRouteInput>
  }

  export type LocationLogUpdateWithWhereUniqueWithoutRouteInput = {
    where: LocationLogWhereUniqueInput
    data: XOR<LocationLogUpdateWithoutRouteInput, LocationLogUncheckedUpdateWithoutRouteInput>
  }

  export type LocationLogUpdateManyWithWhereWithoutRouteInput = {
    where: LocationLogScalarWhereInput
    data: XOR<LocationLogUpdateManyMutationInput, LocationLogUncheckedUpdateManyWithoutRouteInput>
  }

  export type LocationLogScalarWhereInput = {
    AND?: LocationLogScalarWhereInput | LocationLogScalarWhereInput[]
    OR?: LocationLogScalarWhereInput[]
    NOT?: LocationLogScalarWhereInput | LocationLogScalarWhereInput[]
    id?: StringFilter<"LocationLog"> | string
    routeId?: StringFilter<"LocationLog"> | string
    latitude?: FloatFilter<"LocationLog"> | number
    longitude?: FloatFilter<"LocationLog"> | number
    speed?: FloatNullableFilter<"LocationLog"> | number | null
    accuracy?: FloatNullableFilter<"LocationLog"> | number | null
    altitude?: FloatNullableFilter<"LocationLog"> | number | null
    heading?: FloatNullableFilter<"LocationLog"> | number | null
    timestamp?: DateTimeFilter<"LocationLog"> | Date | string
  }

  export type RouteCreateWithoutDeliveriesInput = {
    id?: string
    name: string
    status?: string
    date?: Date | string
    plannedDistance: number
    plannedTime: number
    createdAt?: Date | string
    updatedAt?: Date | string
    returnToDepot?: boolean
    driver: UserCreateNestedOneWithoutRoutesInput
    vehicle: VehicleCreateNestedOneWithoutRoutesInput
    tenant: TenantCreateNestedOneWithoutRoutesInput
    locationLogs?: LocationLogCreateNestedManyWithoutRouteInput
  }

  export type RouteUncheckedCreateWithoutDeliveriesInput = {
    id?: string
    name: string
    status?: string
    date?: Date | string
    plannedDistance: number
    plannedTime: number
    driverId: string
    vehicleId: string
    tenantId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    returnToDepot?: boolean
    locationLogs?: LocationLogUncheckedCreateNestedManyWithoutRouteInput
  }

  export type RouteCreateOrConnectWithoutDeliveriesInput = {
    where: RouteWhereUniqueInput
    create: XOR<RouteCreateWithoutDeliveriesInput, RouteUncheckedCreateWithoutDeliveriesInput>
  }

  export type ClientCreateWithoutDeliveriesInput = {
    id?: string
    name: string
    contactName?: string | null
    phone?: string | null
    address: string
    cep?: string | null
    latitude: number
    longitude: number
    geofenceRadius?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    tenant: TenantCreateNestedOneWithoutClientsInput
  }

  export type ClientUncheckedCreateWithoutDeliveriesInput = {
    id?: string
    name: string
    contactName?: string | null
    phone?: string | null
    address: string
    cep?: string | null
    latitude: number
    longitude: number
    geofenceRadius?: number
    tenantId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClientCreateOrConnectWithoutDeliveriesInput = {
    where: ClientWhereUniqueInput
    create: XOR<ClientCreateWithoutDeliveriesInput, ClientUncheckedCreateWithoutDeliveriesInput>
  }

  export type TenantCreateWithoutDeliveriesInput = {
    id?: string
    name: string
    address?: string | null
    cep?: string | null
    latitude?: number | null
    longitude?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    trialStartedAt?: Date | string | null
    trialEndsAt?: Date | string | null
    stripeCustomerId?: string | null
    subscriptionId?: string | null
    subscriptionStatus?: string
    subscriptionEnd?: Date | string | null
    users?: UserCreateNestedManyWithoutTenantInput
    vehicles?: VehicleCreateNestedManyWithoutTenantInput
    clients?: ClientCreateNestedManyWithoutTenantInput
    routes?: RouteCreateNestedManyWithoutTenantInput
  }

  export type TenantUncheckedCreateWithoutDeliveriesInput = {
    id?: string
    name: string
    address?: string | null
    cep?: string | null
    latitude?: number | null
    longitude?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    trialStartedAt?: Date | string | null
    trialEndsAt?: Date | string | null
    stripeCustomerId?: string | null
    subscriptionId?: string | null
    subscriptionStatus?: string
    subscriptionEnd?: Date | string | null
    users?: UserUncheckedCreateNestedManyWithoutTenantInput
    vehicles?: VehicleUncheckedCreateNestedManyWithoutTenantInput
    clients?: ClientUncheckedCreateNestedManyWithoutTenantInput
    routes?: RouteUncheckedCreateNestedManyWithoutTenantInput
  }

  export type TenantCreateOrConnectWithoutDeliveriesInput = {
    where: TenantWhereUniqueInput
    create: XOR<TenantCreateWithoutDeliveriesInput, TenantUncheckedCreateWithoutDeliveriesInput>
  }

  export type RouteUpsertWithoutDeliveriesInput = {
    update: XOR<RouteUpdateWithoutDeliveriesInput, RouteUncheckedUpdateWithoutDeliveriesInput>
    create: XOR<RouteCreateWithoutDeliveriesInput, RouteUncheckedCreateWithoutDeliveriesInput>
    where?: RouteWhereInput
  }

  export type RouteUpdateToOneWithWhereWithoutDeliveriesInput = {
    where?: RouteWhereInput
    data: XOR<RouteUpdateWithoutDeliveriesInput, RouteUncheckedUpdateWithoutDeliveriesInput>
  }

  export type RouteUpdateWithoutDeliveriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    plannedDistance?: FloatFieldUpdateOperationsInput | number
    plannedTime?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    returnToDepot?: BoolFieldUpdateOperationsInput | boolean
    driver?: UserUpdateOneRequiredWithoutRoutesNestedInput
    vehicle?: VehicleUpdateOneRequiredWithoutRoutesNestedInput
    tenant?: TenantUpdateOneRequiredWithoutRoutesNestedInput
    locationLogs?: LocationLogUpdateManyWithoutRouteNestedInput
  }

  export type RouteUncheckedUpdateWithoutDeliveriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    plannedDistance?: FloatFieldUpdateOperationsInput | number
    plannedTime?: FloatFieldUpdateOperationsInput | number
    driverId?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    returnToDepot?: BoolFieldUpdateOperationsInput | boolean
    locationLogs?: LocationLogUncheckedUpdateManyWithoutRouteNestedInput
  }

  export type ClientUpsertWithoutDeliveriesInput = {
    update: XOR<ClientUpdateWithoutDeliveriesInput, ClientUncheckedUpdateWithoutDeliveriesInput>
    create: XOR<ClientCreateWithoutDeliveriesInput, ClientUncheckedCreateWithoutDeliveriesInput>
    where?: ClientWhereInput
  }

  export type ClientUpdateToOneWithWhereWithoutDeliveriesInput = {
    where?: ClientWhereInput
    data: XOR<ClientUpdateWithoutDeliveriesInput, ClientUncheckedUpdateWithoutDeliveriesInput>
  }

  export type ClientUpdateWithoutDeliveriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    cep?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    geofenceRadius?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenant?: TenantUpdateOneRequiredWithoutClientsNestedInput
  }

  export type ClientUncheckedUpdateWithoutDeliveriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    cep?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    geofenceRadius?: FloatFieldUpdateOperationsInput | number
    tenantId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TenantUpsertWithoutDeliveriesInput = {
    update: XOR<TenantUpdateWithoutDeliveriesInput, TenantUncheckedUpdateWithoutDeliveriesInput>
    create: XOR<TenantCreateWithoutDeliveriesInput, TenantUncheckedCreateWithoutDeliveriesInput>
    where?: TenantWhereInput
  }

  export type TenantUpdateToOneWithWhereWithoutDeliveriesInput = {
    where?: TenantWhereInput
    data: XOR<TenantUpdateWithoutDeliveriesInput, TenantUncheckedUpdateWithoutDeliveriesInput>
  }

  export type TenantUpdateWithoutDeliveriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    cep?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trialStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionStatus?: StringFieldUpdateOperationsInput | string
    subscriptionEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users?: UserUpdateManyWithoutTenantNestedInput
    vehicles?: VehicleUpdateManyWithoutTenantNestedInput
    clients?: ClientUpdateManyWithoutTenantNestedInput
    routes?: RouteUpdateManyWithoutTenantNestedInput
  }

  export type TenantUncheckedUpdateWithoutDeliveriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    cep?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trialStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionStatus?: StringFieldUpdateOperationsInput | string
    subscriptionEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users?: UserUncheckedUpdateManyWithoutTenantNestedInput
    vehicles?: VehicleUncheckedUpdateManyWithoutTenantNestedInput
    clients?: ClientUncheckedUpdateManyWithoutTenantNestedInput
    routes?: RouteUncheckedUpdateManyWithoutTenantNestedInput
  }

  export type RouteCreateWithoutLocationLogsInput = {
    id?: string
    name: string
    status?: string
    date?: Date | string
    plannedDistance: number
    plannedTime: number
    createdAt?: Date | string
    updatedAt?: Date | string
    returnToDepot?: boolean
    driver: UserCreateNestedOneWithoutRoutesInput
    vehicle: VehicleCreateNestedOneWithoutRoutesInput
    tenant: TenantCreateNestedOneWithoutRoutesInput
    deliveries?: DeliveryCreateNestedManyWithoutRouteInput
  }

  export type RouteUncheckedCreateWithoutLocationLogsInput = {
    id?: string
    name: string
    status?: string
    date?: Date | string
    plannedDistance: number
    plannedTime: number
    driverId: string
    vehicleId: string
    tenantId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    returnToDepot?: boolean
    deliveries?: DeliveryUncheckedCreateNestedManyWithoutRouteInput
  }

  export type RouteCreateOrConnectWithoutLocationLogsInput = {
    where: RouteWhereUniqueInput
    create: XOR<RouteCreateWithoutLocationLogsInput, RouteUncheckedCreateWithoutLocationLogsInput>
  }

  export type RouteUpsertWithoutLocationLogsInput = {
    update: XOR<RouteUpdateWithoutLocationLogsInput, RouteUncheckedUpdateWithoutLocationLogsInput>
    create: XOR<RouteCreateWithoutLocationLogsInput, RouteUncheckedCreateWithoutLocationLogsInput>
    where?: RouteWhereInput
  }

  export type RouteUpdateToOneWithWhereWithoutLocationLogsInput = {
    where?: RouteWhereInput
    data: XOR<RouteUpdateWithoutLocationLogsInput, RouteUncheckedUpdateWithoutLocationLogsInput>
  }

  export type RouteUpdateWithoutLocationLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    plannedDistance?: FloatFieldUpdateOperationsInput | number
    plannedTime?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    returnToDepot?: BoolFieldUpdateOperationsInput | boolean
    driver?: UserUpdateOneRequiredWithoutRoutesNestedInput
    vehicle?: VehicleUpdateOneRequiredWithoutRoutesNestedInput
    tenant?: TenantUpdateOneRequiredWithoutRoutesNestedInput
    deliveries?: DeliveryUpdateManyWithoutRouteNestedInput
  }

  export type RouteUncheckedUpdateWithoutLocationLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    plannedDistance?: FloatFieldUpdateOperationsInput | number
    plannedTime?: FloatFieldUpdateOperationsInput | number
    driverId?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    returnToDepot?: BoolFieldUpdateOperationsInput | boolean
    deliveries?: DeliveryUncheckedUpdateManyWithoutRouteNestedInput
  }

  export type UserCreateManyTenantInput = {
    id?: string
    email: string
    password: string
    name: string
    avatarUrl?: string | null
    role: string
    status?: string
    resetPasswordToken?: string | null
    resetPasswordExp?: Date | string | null
    mustChangePassword?: boolean
    resetRequested?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VehicleCreateManyTenantInput = {
    id?: string
    plate: string
    model: string
    consumption: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClientCreateManyTenantInput = {
    id?: string
    name: string
    contactName?: string | null
    phone?: string | null
    address: string
    cep?: string | null
    latitude: number
    longitude: number
    geofenceRadius?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RouteCreateManyTenantInput = {
    id?: string
    name: string
    status?: string
    date?: Date | string
    plannedDistance: number
    plannedTime: number
    driverId: string
    vehicleId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    returnToDepot?: boolean
  }

  export type DeliveryCreateManyTenantInput = {
    id?: string
    sequence: number
    status?: string
    routeId: string
    clientId: string
    trackingToken?: string
    customerPhone?: string | null
    ratingInt?: number | null
    ratingComment?: string | null
    actualLatitude?: number | null
    actualLongitude?: number | null
    gpsAccuracy?: number | null
    gpsSpeed?: number | null
    gpsAltitude?: number | null
    gpsHeading?: number | null
    deliveredAt?: Date | string | null
    photoUrl?: string | null
    signatureUrl?: string | null
    notes?: string | null
    failureReason?: string | null
    isInsideGeofence?: boolean | null
    distanceFromClient?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    resetPasswordToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordExp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    resetRequested?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    routes?: RouteUpdateManyWithoutDriverNestedInput
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    resetPasswordToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordExp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    resetRequested?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    routes?: RouteUncheckedUpdateManyWithoutDriverNestedInput
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateManyWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    resetPasswordToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordExp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    resetRequested?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VehicleUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    plate?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    consumption?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    routes?: RouteUpdateManyWithoutVehicleNestedInput
  }

  export type VehicleUncheckedUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    plate?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    consumption?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    routes?: RouteUncheckedUpdateManyWithoutVehicleNestedInput
  }

  export type VehicleUncheckedUpdateManyWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    plate?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    consumption?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClientUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    cep?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    geofenceRadius?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveries?: DeliveryUpdateManyWithoutClientNestedInput
  }

  export type ClientUncheckedUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    cep?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    geofenceRadius?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveries?: DeliveryUncheckedUpdateManyWithoutClientNestedInput
  }

  export type ClientUncheckedUpdateManyWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    cep?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    geofenceRadius?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RouteUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    plannedDistance?: FloatFieldUpdateOperationsInput | number
    plannedTime?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    returnToDepot?: BoolFieldUpdateOperationsInput | boolean
    driver?: UserUpdateOneRequiredWithoutRoutesNestedInput
    vehicle?: VehicleUpdateOneRequiredWithoutRoutesNestedInput
    deliveries?: DeliveryUpdateManyWithoutRouteNestedInput
    locationLogs?: LocationLogUpdateManyWithoutRouteNestedInput
  }

  export type RouteUncheckedUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    plannedDistance?: FloatFieldUpdateOperationsInput | number
    plannedTime?: FloatFieldUpdateOperationsInput | number
    driverId?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    returnToDepot?: BoolFieldUpdateOperationsInput | boolean
    deliveries?: DeliveryUncheckedUpdateManyWithoutRouteNestedInput
    locationLogs?: LocationLogUncheckedUpdateManyWithoutRouteNestedInput
  }

  export type RouteUncheckedUpdateManyWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    plannedDistance?: FloatFieldUpdateOperationsInput | number
    plannedTime?: FloatFieldUpdateOperationsInput | number
    driverId?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    returnToDepot?: BoolFieldUpdateOperationsInput | boolean
  }

  export type DeliveryUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    sequence?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    trackingToken?: StringFieldUpdateOperationsInput | string
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    ratingInt?: NullableIntFieldUpdateOperationsInput | number | null
    ratingComment?: NullableStringFieldUpdateOperationsInput | string | null
    actualLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    actualLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    gpsAccuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    gpsSpeed?: NullableFloatFieldUpdateOperationsInput | number | null
    gpsAltitude?: NullableFloatFieldUpdateOperationsInput | number | null
    gpsHeading?: NullableFloatFieldUpdateOperationsInput | number | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    signatureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    isInsideGeofence?: NullableBoolFieldUpdateOperationsInput | boolean | null
    distanceFromClient?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    route?: RouteUpdateOneRequiredWithoutDeliveriesNestedInput
    client?: ClientUpdateOneRequiredWithoutDeliveriesNestedInput
  }

  export type DeliveryUncheckedUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    sequence?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    routeId?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    trackingToken?: StringFieldUpdateOperationsInput | string
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    ratingInt?: NullableIntFieldUpdateOperationsInput | number | null
    ratingComment?: NullableStringFieldUpdateOperationsInput | string | null
    actualLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    actualLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    gpsAccuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    gpsSpeed?: NullableFloatFieldUpdateOperationsInput | number | null
    gpsAltitude?: NullableFloatFieldUpdateOperationsInput | number | null
    gpsHeading?: NullableFloatFieldUpdateOperationsInput | number | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    signatureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    isInsideGeofence?: NullableBoolFieldUpdateOperationsInput | boolean | null
    distanceFromClient?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeliveryUncheckedUpdateManyWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    sequence?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    routeId?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    trackingToken?: StringFieldUpdateOperationsInput | string
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    ratingInt?: NullableIntFieldUpdateOperationsInput | number | null
    ratingComment?: NullableStringFieldUpdateOperationsInput | string | null
    actualLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    actualLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    gpsAccuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    gpsSpeed?: NullableFloatFieldUpdateOperationsInput | number | null
    gpsAltitude?: NullableFloatFieldUpdateOperationsInput | number | null
    gpsHeading?: NullableFloatFieldUpdateOperationsInput | number | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    signatureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    isInsideGeofence?: NullableBoolFieldUpdateOperationsInput | boolean | null
    distanceFromClient?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RouteCreateManyDriverInput = {
    id?: string
    name: string
    status?: string
    date?: Date | string
    plannedDistance: number
    plannedTime: number
    vehicleId: string
    tenantId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    returnToDepot?: boolean
  }

  export type RefreshTokenCreateManyUserInput = {
    id?: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type RouteUpdateWithoutDriverInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    plannedDistance?: FloatFieldUpdateOperationsInput | number
    plannedTime?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    returnToDepot?: BoolFieldUpdateOperationsInput | boolean
    vehicle?: VehicleUpdateOneRequiredWithoutRoutesNestedInput
    tenant?: TenantUpdateOneRequiredWithoutRoutesNestedInput
    deliveries?: DeliveryUpdateManyWithoutRouteNestedInput
    locationLogs?: LocationLogUpdateManyWithoutRouteNestedInput
  }

  export type RouteUncheckedUpdateWithoutDriverInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    plannedDistance?: FloatFieldUpdateOperationsInput | number
    plannedTime?: FloatFieldUpdateOperationsInput | number
    vehicleId?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    returnToDepot?: BoolFieldUpdateOperationsInput | boolean
    deliveries?: DeliveryUncheckedUpdateManyWithoutRouteNestedInput
    locationLogs?: LocationLogUncheckedUpdateManyWithoutRouteNestedInput
  }

  export type RouteUncheckedUpdateManyWithoutDriverInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    plannedDistance?: FloatFieldUpdateOperationsInput | number
    plannedTime?: FloatFieldUpdateOperationsInput | number
    vehicleId?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    returnToDepot?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RefreshTokenUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RouteCreateManyVehicleInput = {
    id?: string
    name: string
    status?: string
    date?: Date | string
    plannedDistance: number
    plannedTime: number
    driverId: string
    tenantId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    returnToDepot?: boolean
  }

  export type RouteUpdateWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    plannedDistance?: FloatFieldUpdateOperationsInput | number
    plannedTime?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    returnToDepot?: BoolFieldUpdateOperationsInput | boolean
    driver?: UserUpdateOneRequiredWithoutRoutesNestedInput
    tenant?: TenantUpdateOneRequiredWithoutRoutesNestedInput
    deliveries?: DeliveryUpdateManyWithoutRouteNestedInput
    locationLogs?: LocationLogUpdateManyWithoutRouteNestedInput
  }

  export type RouteUncheckedUpdateWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    plannedDistance?: FloatFieldUpdateOperationsInput | number
    plannedTime?: FloatFieldUpdateOperationsInput | number
    driverId?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    returnToDepot?: BoolFieldUpdateOperationsInput | boolean
    deliveries?: DeliveryUncheckedUpdateManyWithoutRouteNestedInput
    locationLogs?: LocationLogUncheckedUpdateManyWithoutRouteNestedInput
  }

  export type RouteUncheckedUpdateManyWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    plannedDistance?: FloatFieldUpdateOperationsInput | number
    plannedTime?: FloatFieldUpdateOperationsInput | number
    driverId?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    returnToDepot?: BoolFieldUpdateOperationsInput | boolean
  }

  export type DeliveryCreateManyClientInput = {
    id?: string
    sequence: number
    status?: string
    routeId: string
    trackingToken?: string
    customerPhone?: string | null
    ratingInt?: number | null
    ratingComment?: string | null
    actualLatitude?: number | null
    actualLongitude?: number | null
    gpsAccuracy?: number | null
    gpsSpeed?: number | null
    gpsAltitude?: number | null
    gpsHeading?: number | null
    deliveredAt?: Date | string | null
    photoUrl?: string | null
    signatureUrl?: string | null
    notes?: string | null
    failureReason?: string | null
    isInsideGeofence?: boolean | null
    distanceFromClient?: number | null
    tenantId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DeliveryUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    sequence?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    trackingToken?: StringFieldUpdateOperationsInput | string
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    ratingInt?: NullableIntFieldUpdateOperationsInput | number | null
    ratingComment?: NullableStringFieldUpdateOperationsInput | string | null
    actualLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    actualLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    gpsAccuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    gpsSpeed?: NullableFloatFieldUpdateOperationsInput | number | null
    gpsAltitude?: NullableFloatFieldUpdateOperationsInput | number | null
    gpsHeading?: NullableFloatFieldUpdateOperationsInput | number | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    signatureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    isInsideGeofence?: NullableBoolFieldUpdateOperationsInput | boolean | null
    distanceFromClient?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    route?: RouteUpdateOneRequiredWithoutDeliveriesNestedInput
    tenant?: TenantUpdateOneRequiredWithoutDeliveriesNestedInput
  }

  export type DeliveryUncheckedUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    sequence?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    routeId?: StringFieldUpdateOperationsInput | string
    trackingToken?: StringFieldUpdateOperationsInput | string
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    ratingInt?: NullableIntFieldUpdateOperationsInput | number | null
    ratingComment?: NullableStringFieldUpdateOperationsInput | string | null
    actualLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    actualLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    gpsAccuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    gpsSpeed?: NullableFloatFieldUpdateOperationsInput | number | null
    gpsAltitude?: NullableFloatFieldUpdateOperationsInput | number | null
    gpsHeading?: NullableFloatFieldUpdateOperationsInput | number | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    signatureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    isInsideGeofence?: NullableBoolFieldUpdateOperationsInput | boolean | null
    distanceFromClient?: NullableFloatFieldUpdateOperationsInput | number | null
    tenantId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeliveryUncheckedUpdateManyWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    sequence?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    routeId?: StringFieldUpdateOperationsInput | string
    trackingToken?: StringFieldUpdateOperationsInput | string
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    ratingInt?: NullableIntFieldUpdateOperationsInput | number | null
    ratingComment?: NullableStringFieldUpdateOperationsInput | string | null
    actualLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    actualLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    gpsAccuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    gpsSpeed?: NullableFloatFieldUpdateOperationsInput | number | null
    gpsAltitude?: NullableFloatFieldUpdateOperationsInput | number | null
    gpsHeading?: NullableFloatFieldUpdateOperationsInput | number | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    signatureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    isInsideGeofence?: NullableBoolFieldUpdateOperationsInput | boolean | null
    distanceFromClient?: NullableFloatFieldUpdateOperationsInput | number | null
    tenantId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeliveryCreateManyRouteInput = {
    id?: string
    sequence: number
    status?: string
    clientId: string
    trackingToken?: string
    customerPhone?: string | null
    ratingInt?: number | null
    ratingComment?: string | null
    actualLatitude?: number | null
    actualLongitude?: number | null
    gpsAccuracy?: number | null
    gpsSpeed?: number | null
    gpsAltitude?: number | null
    gpsHeading?: number | null
    deliveredAt?: Date | string | null
    photoUrl?: string | null
    signatureUrl?: string | null
    notes?: string | null
    failureReason?: string | null
    isInsideGeofence?: boolean | null
    distanceFromClient?: number | null
    tenantId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LocationLogCreateManyRouteInput = {
    id?: string
    latitude: number
    longitude: number
    speed?: number | null
    accuracy?: number | null
    altitude?: number | null
    heading?: number | null
    timestamp?: Date | string
  }

  export type DeliveryUpdateWithoutRouteInput = {
    id?: StringFieldUpdateOperationsInput | string
    sequence?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    trackingToken?: StringFieldUpdateOperationsInput | string
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    ratingInt?: NullableIntFieldUpdateOperationsInput | number | null
    ratingComment?: NullableStringFieldUpdateOperationsInput | string | null
    actualLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    actualLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    gpsAccuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    gpsSpeed?: NullableFloatFieldUpdateOperationsInput | number | null
    gpsAltitude?: NullableFloatFieldUpdateOperationsInput | number | null
    gpsHeading?: NullableFloatFieldUpdateOperationsInput | number | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    signatureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    isInsideGeofence?: NullableBoolFieldUpdateOperationsInput | boolean | null
    distanceFromClient?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: ClientUpdateOneRequiredWithoutDeliveriesNestedInput
    tenant?: TenantUpdateOneRequiredWithoutDeliveriesNestedInput
  }

  export type DeliveryUncheckedUpdateWithoutRouteInput = {
    id?: StringFieldUpdateOperationsInput | string
    sequence?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    trackingToken?: StringFieldUpdateOperationsInput | string
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    ratingInt?: NullableIntFieldUpdateOperationsInput | number | null
    ratingComment?: NullableStringFieldUpdateOperationsInput | string | null
    actualLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    actualLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    gpsAccuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    gpsSpeed?: NullableFloatFieldUpdateOperationsInput | number | null
    gpsAltitude?: NullableFloatFieldUpdateOperationsInput | number | null
    gpsHeading?: NullableFloatFieldUpdateOperationsInput | number | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    signatureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    isInsideGeofence?: NullableBoolFieldUpdateOperationsInput | boolean | null
    distanceFromClient?: NullableFloatFieldUpdateOperationsInput | number | null
    tenantId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeliveryUncheckedUpdateManyWithoutRouteInput = {
    id?: StringFieldUpdateOperationsInput | string
    sequence?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    trackingToken?: StringFieldUpdateOperationsInput | string
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    ratingInt?: NullableIntFieldUpdateOperationsInput | number | null
    ratingComment?: NullableStringFieldUpdateOperationsInput | string | null
    actualLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    actualLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    gpsAccuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    gpsSpeed?: NullableFloatFieldUpdateOperationsInput | number | null
    gpsAltitude?: NullableFloatFieldUpdateOperationsInput | number | null
    gpsHeading?: NullableFloatFieldUpdateOperationsInput | number | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    signatureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    isInsideGeofence?: NullableBoolFieldUpdateOperationsInput | boolean | null
    distanceFromClient?: NullableFloatFieldUpdateOperationsInput | number | null
    tenantId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LocationLogUpdateWithoutRouteInput = {
    id?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    speed?: NullableFloatFieldUpdateOperationsInput | number | null
    accuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    altitude?: NullableFloatFieldUpdateOperationsInput | number | null
    heading?: NullableFloatFieldUpdateOperationsInput | number | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LocationLogUncheckedUpdateWithoutRouteInput = {
    id?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    speed?: NullableFloatFieldUpdateOperationsInput | number | null
    accuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    altitude?: NullableFloatFieldUpdateOperationsInput | number | null
    heading?: NullableFloatFieldUpdateOperationsInput | number | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LocationLogUncheckedUpdateManyWithoutRouteInput = {
    id?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    speed?: NullableFloatFieldUpdateOperationsInput | number | null
    accuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    altitude?: NullableFloatFieldUpdateOperationsInput | number | null
    heading?: NullableFloatFieldUpdateOperationsInput | number | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}