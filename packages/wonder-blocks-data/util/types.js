// @flow
export type Result<TData> =
    | {|
          loading: true,
          data?: void,
          error?: void,
      |}
    | {|
          loading: false,
          data?: TData,
          error?: string,
      |};

export type CacheEntry<TData> =
    | {|
          error: string,
          data?: ?void,
      |}
    | {|
          data: TData,
          error?: ?void,
      |};

type HandlerSubcache = {
    [key: string]: CacheEntry<any>,
    ...,
};

export type InterceptCacheFn<TOptions, TData> = (
    options: TOptions,
    cacheEntry: ?$ReadOnly<CacheEntry<TData>>,
) => ?$ReadOnly<CacheEntry<TData>>;

export type InterceptFulfillRequestFn<TOptions, TData> = (
    options: TOptions,
) => ?Promise<TData>;

export type InterceptShouldRefreshCacheFn<TOptions, TData> = (
    options: TOptions,
    cachedEntry: ?$ReadOnly<CacheEntry<TData>>,
) => ?boolean;

export type Interceptor = {|
    getEntry?: ?InterceptCacheFn<any, any>,
    fulfillRequest?: ?InterceptFulfillRequestFn<any, any>,
    shouldRefreshCache?: ?InterceptShouldRefreshCacheFn<any, any>,
|};

export type InterceptContextData = {
    [key: string]: Interceptor,
    ...,
};

export type Cache = {
    [key: string]: HandlerSubcache,
    ...,
};

export interface ICache<TOptions, TData> {
    /**
     * Remove the cached entry for the given handler and options.
     *
     * If the item exists in the cache, the cached entry is deleted and the
     * entry is returned. Otherwise, this returns null.
     */
    remove(
        handler: IRequestHandler<TOptions, TData>,
        options: TOptions,
    ): ?$ReadOnly<CacheEntry<TData>>;

    /**
     * Remove all cached entries for the given handler that, optionally, match
     * a given predicate.
     *
     * Returns the number of entries that were cleared from the cache.
     */
    removeAll(
        handler: IRequestHandler<TOptions, TData>,
        predicate?: (
            options: TOptions,
            cachedEntry: ?$ReadOnly<CacheEntry<TData>>,
        ) => boolean,
    ): number;
}

/**
 * A handler for data requests.
 */
export interface IRequestHandler<TOptions, TData> {
    /**
     * Fulfill a given request.
     *
     * @param {TOptions} options Options tha the request may need.
     * @return {Promise<TData>} A promise of the requested data.
     */
    fulfillRequest(options: TOptions): Promise<TData>;

    /**
     * The handler type; this is used to uniquely identify this handler from
     * any other handler.
     */
    get type(): string;

    /**
     * A custom cache to use with data that this handler requests.
     * This only affects client-side caching of data.
     */
    get cache(): ?ICache<TOptions, TData>;

    /**
     * Determine if the cached data should be refreshed.
     *
     * If this returns true, the framework will fulfill a new request by
     * calling `fulfillRequest`.
     */
    shouldRefreshCache(
        options: TOptions,
        cachedEntry: ?$ReadOnly<CacheEntry<TData>>,
    ): boolean;

    /**
     * Get the key to use for a given request. This should be idempotent for a
     * given options set if you want caching to work across requests.
     */
    getKey(options: TOptions): string;
}
