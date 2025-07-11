declare const __brand: unique symbol;

type Brand<T, B extends string> = T & { readonly [__brand]: B };

type Falsy = false | 0 | -0 | 0n | '' | null | undefined;

type Truthy<T> = T extends Falsy ? never : T;

type NonNullable<T> = T extends null | undefined ? never : T;

interface Options {
    readonly recursive?: boolean;
    readonly preserveArrays?: boolean;
    readonly exclude?: readonly unknown[];
    readonly strategy?: 'fast' | 'minimal' | 'balanced';
    readonly maxDepth?: number;
    readonly removeEmpty?: boolean;
}

type DefaultOptions = {
    readonly recursive: false;
    readonly preserveArrays: false;
    readonly exclude: never[];
    readonly strategy: 'balanced';
    readonly maxDepth: typeof Infinity;
    readonly removeEmpty: false;
};

type ResolveOptions<T extends Options | undefined> = T extends Options
    ? {
          readonly recursive: T['recursive'] extends boolean
              ? T['recursive']
              : false;
          readonly preserveArrays: T['preserveArrays'] extends boolean
              ? T['preserveArrays']
              : false;
          readonly exclude: T['exclude'] extends readonly unknown[]
              ? T['exclude']
              : never[];
          readonly strategy: T['strategy'] extends
              | 'fast'
              | 'minimal'
              | 'balanced'
              ? T['strategy']
              : 'balanced';
          readonly maxDepth: T['maxDepth'] extends number
              ? T['maxDepth']
              : typeof Infinity;
          readonly removeEmpty: T['removeEmpty'] extends boolean
              ? T['removeEmpty']
              : false;
      }
    : DefaultOptions;

type IsFalsy<
    T,
    Exclude extends readonly unknown[],
> = Exclude extends readonly []
    ? T extends Falsy
        ? true
        : false
    : T extends Falsy | Exclude[number]
      ? true
      : false;

type IsEmpty<T> = T extends readonly []
    ? true
    : T extends Record<string, never>
      ? true
      : T extends Set<never>
        ? true
        : T extends Map<never, never>
          ? true
          : false;

type CompactArray<
    T extends readonly unknown[],
    Exclude extends readonly unknown[] = never[],
> = T extends readonly (infer U)[]
    ? Array<
          U extends infer Item
              ? IsFalsy<Item, Exclude> extends true
                  ? never
                  : Item
              : never
      >
    : never;

type CompactObject<
    T extends Record<string, unknown>,
    Exclude extends readonly unknown[] = never[],
> = {
    [K in keyof T as IsFalsy<T[K], Exclude> extends true ? never : K]: T[K];
};

type DeepArray<
    T extends readonly unknown[],
    Exclude extends readonly unknown[] = never[],
    Depth extends number = 0,
    MaxDepth extends number = 10,
> = Depth extends MaxDepth
    ? T
    : T extends readonly (infer U)[]
      ? Array<
            U extends readonly unknown[]
                ? DeepArray<U, Exclude, Increment<Depth>, MaxDepth>
                : U extends Record<string, unknown>
                  ? DeepObject<U, Exclude, Increment<Depth>, MaxDepth>
                  : IsFalsy<U, Exclude> extends true
                    ? never
                    : U
        >
      : never;

type DeepObject<
    T extends Record<string, unknown>,
    Exclude extends readonly unknown[] = never[],
    Depth extends number = 0,
    MaxDepth extends number = 10,
> = Depth extends MaxDepth
    ? T
    : {
          [K in keyof T as IsFalsy<T[K], Exclude> extends true
              ? never
              : K]: T[K] extends Record<string, unknown>
              ? DeepObject<T[K], Exclude, Increment<Depth>, MaxDepth>
              : T[K] extends readonly unknown[]
                ? DeepArray<T[K], Exclude, Increment<Depth>, MaxDepth>
                : T[K];
      };

type Increment<N extends number> = N extends 0
    ? 1
    : N extends 1
      ? 2
      : N extends 2
        ? 3
        : N extends 3
          ? 4
          : N extends 4
            ? 5
            : number;

type FilterEmpty<T, ShouldFilter extends boolean> = ShouldFilter extends true
    ? T extends readonly unknown[]
        ? T['length'] extends 0
            ? never
            : T
        : IsEmpty<T> extends true
          ? never
          : T
    : T;

type ShallowArrayResult<
    T,
    Exclude extends readonly unknown[],
    RemoveEmpty extends boolean,
> = T extends readonly unknown[]
    ? FilterEmpty<CompactArray<T, Exclude>, RemoveEmpty>
    : T;

type DeepArrayResult<
    T,
    Exclude extends readonly unknown[],
    RemoveEmpty extends boolean,
> = T extends readonly unknown[]
    ? FilterEmpty<DeepArray<T, Exclude>, RemoveEmpty>
    : T;

type ShallowObjectResult<
    T,
    Exclude extends readonly unknown[],
    RemoveEmpty extends boolean,
> =
    T extends Record<string, unknown>
        ? FilterEmpty<CompactObject<T, Exclude>, RemoveEmpty>
        : T;

type DeepObjectResult<
    T,
    Exclude extends readonly unknown[],
    RemoveEmpty extends boolean,
> =
    T extends Record<string, unknown>
        ? FilterEmpty<DeepObject<T, Exclude>, RemoveEmpty>
        : T;

type RecursiveCompact<
    T,
    Exclude extends readonly unknown[],
    RemoveEmpty extends boolean,
> = T extends readonly unknown[]
    ? DeepArrayResult<T, Exclude, RemoveEmpty>
    : DeepObjectResult<T, Exclude, RemoveEmpty>;

type ShallowCompact<
    T,
    Exclude extends readonly unknown[],
    RemoveEmpty extends boolean,
> = T extends readonly unknown[]
    ? ShallowArrayResult<T, Exclude, RemoveEmpty>
    : ShallowObjectResult<T, Exclude, RemoveEmpty>;

type CompactResult<T, Opts extends Options | undefined> =
    ResolveOptions<Opts> extends {
        recursive: infer IsRecursive;
        exclude: infer ExcludeValues;
        removeEmpty: infer ShouldRemoveEmpty;
    }
        ? ExcludeValues extends readonly unknown[]
            ? ShouldRemoveEmpty extends boolean
                ? IsRecursive extends true
                    ? RecursiveCompact<T, ExcludeValues, ShouldRemoveEmpty>
                    : ShallowCompact<T, ExcludeValues, ShouldRemoveEmpty>
                : never
            : never
        : never;

type IsArray<T> = T extends readonly unknown[] ? true : false;
type IsObject<T> =
    T extends Record<string, unknown>
        ? T extends readonly unknown[]
            ? false
            : T extends null
              ? false
              : true
        : false;

const createFilter = <Exclude extends readonly unknown[]>(exclude: Exclude) => {
    const excludeSet = new Set(exclude);

    return (value: unknown): boolean => {
        if (!value && value !== 0) return true;
        return excludeSet.size > 0 && excludeSet.has(value);
    };
};

function array<T extends readonly unknown[]>(arr: T): CompactArray<T>;
function array<T extends readonly unknown[], O extends Options>(
    arr: T,
    options: O
): CompactResult<T, O>;
function array(arr: readonly unknown[], options: Options = {}): unknown[] {
    const {
        recursive = false,
        exclude = [],
        strategy = 'balanced',
        maxDepth = Infinity,
        removeEmpty = false,
    } = options;

    switch (strategy) {
        case 'fast':
            return fastArray(arr, options, 0, maxDepth);
        case 'minimal':
            return minimalArray(arr, options, 0, maxDepth);
        default:
            return balancedArray(arr, options, 0, maxDepth);
    }
}

function fastArray(
    arr: readonly unknown[],
    options: Options,
    depth: number,
    maxDepth: number
): unknown[] {
    const { recursive = false, exclude = [], removeEmpty = false } = options;
    const isExcluded = createFilter(exclude);
    const length = arr.length;

    const result: unknown[] = new Array(length);
    let writeIndex = 0;

    let i = 0;
    for (; i < length - 3; i += 4) {
        const a = arr[i],
            b = arr[i + 1],
            c = arr[i + 2],
            d = arr[i + 3];

        if (!isExcluded(a)) {
            result[writeIndex++] =
                recursive && depth < maxDepth
                    ? processValue(a, options, depth + 1, maxDepth)
                    : a;
        }
        if (!isExcluded(b)) {
            result[writeIndex++] =
                recursive && depth < maxDepth
                    ? processValue(b, options, depth + 1, maxDepth)
                    : b;
        }
        if (!isExcluded(c)) {
            result[writeIndex++] =
                recursive && depth < maxDepth
                    ? processValue(c, options, depth + 1, maxDepth)
                    : c;
        }
        if (!isExcluded(d)) {
            result[writeIndex++] =
                recursive && depth < maxDepth
                    ? processValue(d, options, depth + 1, maxDepth)
                    : d;
        }
    }

    for (; i < length; i++) {
        const item = arr[i];
        if (!isExcluded(item)) {
            result[writeIndex++] =
                recursive && depth < maxDepth
                    ? processValue(item, options, depth + 1, maxDepth)
                    : item;
        }
    }

    result.length = writeIndex;
    return removeEmpty && result.length === 0 ? [] : result;
}

function minimalArray(
    arr: readonly unknown[],
    options: Options,
    depth: number,
    maxDepth: number
): unknown[] {
    const { recursive = false, exclude = [], removeEmpty = false } = options;
    const isExcluded = createFilter(exclude);
    const result: unknown[] = [];

    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        if (!isExcluded(item)) {
            const processedItem =
                recursive && depth < maxDepth
                    ? processValue(item, options, depth + 1, maxDepth)
                    : item;
            result.push(processedItem);
        }
    }

    return removeEmpty && result.length === 0 ? [] : result;
}

function balancedArray(
    arr: readonly unknown[],
    options: Options,
    depth: number,
    maxDepth: number
): unknown[] {
    const { recursive = false, exclude = [], removeEmpty = false } = options;
    const isExcluded = createFilter(exclude);
    const length = arr.length;

    const estimatedSize = Math.min(length, Math.max(length * 0.7, 16));
    const result: unknown[] = new Array(estimatedSize);
    let writeIndex = 0;

    for (let i = 0; i < length; i++) {
        const item = arr[i];
        if (!isExcluded(item)) {
            const processedItem =
                recursive && depth < maxDepth
                    ? processValue(item, options, depth + 1, maxDepth)
                    : item;

            if (writeIndex >= result.length) {
                result.length = Math.min(
                    result.length * 1.5,
                    result.length + 1000
                );
            }

            result[writeIndex++] = processedItem;
        }
    }

    result.length = writeIndex;
    return removeEmpty && result.length === 0 ? [] : result;
}

function processValue(
    value: unknown,
    options: Options,
    depth: number,
    maxDepth: number
): unknown {
    if ((value as any)?.constructor === Array) {
        return array(value as readonly unknown[], { ...options });
    }

    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
        return object(value as Record<string, unknown>, { ...options });
    }

    return value;
}

function object<T extends Record<string, unknown>>(obj: T): CompactObject<T>;
function object<T extends Record<string, unknown>, O extends Options>(
    obj: T,
    options: O
): CompactResult<T, O>;
function object(
    obj: Record<string, unknown>,
    options: Options = {}
): Record<string, unknown> {
    const {
        recursive = false,
        exclude = [],
        strategy = 'balanced',
        maxDepth = Infinity,
        removeEmpty = false,
    } = options;

    const isExcluded = createFilter(exclude);
    const result: Record<string, unknown> = {};
    const keys = Object.keys(obj);

    switch (strategy) {
        case 'fast':
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                const value = obj[key];
                if (!isExcluded(value)) {
                    result[key] = recursive
                        ? processValue(value, options, 1, maxDepth)
                        : value;
                }
            }
            break;

        case 'minimal':
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    const value = obj[key];
                    if (!isExcluded(value)) {
                        result[key] = recursive
                            ? processValue(value, options, 1, maxDepth)
                            : value;
                    }
                }
            }
            break;

        default:
            const entries = Object.entries(obj);
            for (let i = 0; i < entries.length; i++) {
                const [key, value] = entries[i];
                if (!isExcluded(value)) {
                    result[key] = recursive
                        ? processValue(value, options, 1, maxDepth)
                        : value;
                }
            }
    }

    return removeEmpty && Object.keys(result).length === 0 ? {} : result;
}

function compact<T extends readonly unknown[]>(value: T): CompactArray<T>;
function compact<T extends Record<string, unknown>>(value: T): CompactObject<T>;
function compact<T extends readonly unknown[], O extends Options>(
    value: T,
    options: O
): CompactResult<T, O>;
function compact<T extends Record<string, unknown>, O extends Options>(
    value: T,
    options: O
): CompactResult<T, O>;
function compact(
    value: readonly unknown[] | Record<string, unknown>,
    options: Options = {}
): unknown {
    if ((value as any)?.constructor === Array) {
        return array(value as readonly unknown[], options);
    }

    if (value !== null && typeof value === 'object') {
        return object(value as Record<string, unknown>, options);
    }

    return value;
}

function deep<T extends readonly unknown[]>(value: T): DeepArray<T>;
function deep<T extends Record<string, unknown>>(value: T): DeepObject<T>;
function deep<
    T extends readonly unknown[],
    O extends Omit<Options, 'recursive'>,
>(value: T, options: O): DeepArray<T>;
function deep<
    T extends Record<string, unknown>,
    O extends Omit<Options, 'recursive'>,
>(value: T, options: O): DeepObject<T>;
function deep(
    value: readonly unknown[] | Record<string, unknown>,
    options: Omit<Options, 'recursive'> = {}
): unknown {
    if (Array.isArray(value)) {
        return array(value, { ...options, recursive: true });
    }
    if (value !== null && typeof value === 'object') {
        return object(value as Record<string, unknown>, {
            ...options,
            recursive: true,
        });
    }
    return compact(value as any, { ...options, recursive: true });
}

type Predicate<T> = (value: T) => boolean;

const filter = <T>(
    arr: readonly T[],
    predicate: Predicate<T>,
    options: Omit<Options, 'exclude'> = {}
): T[] => {
    const { strategy = 'balanced' } = options;

    switch (strategy) {
        case 'fast':
            const result: T[] = [];
            for (let i = 0; i < arr.length; i++) {
                const item = arr[i];
                if (predicate(item)) {
                    result.push(item);
                }
            }
            return result;

        default:
            return arr.filter(predicate);
    }
};

const without = <T extends readonly unknown[]>(
    arr: T,
    values: readonly unknown[],
    options: Omit<Options, 'exclude'> = {}
): CompactArray<T, typeof values> =>
    array(arr, {
        ...options,
        exclude: values,
    }) as CompactArray<T, typeof values>;

type CompactAPI = {
    <T extends readonly unknown[]>(value: T): CompactArray<T>;
    <T extends Record<string, unknown>>(value: T): CompactObject<T>;
    <T extends readonly unknown[], O extends Options>(
        value: T,
        options: O
    ): CompactResult<T, O>;
    <T extends Record<string, unknown>, O extends Options>(
        value: T,
        options: O
    ): CompactResult<T, O>;

    array: typeof array;
    object: typeof object;
    deep: typeof deep;
    filter: typeof filter;
    without: typeof without;

    fast: (options?: Omit<Options, 'strategy'>) => CompactAPI;
    minimal: (options?: Omit<Options, 'strategy'>) => CompactAPI;
    balanced: (options?: Omit<Options, 'strategy'>) => CompactAPI;

    configure: (defaultOptions: Options) => CompactAPI;
};

const create = (defaultOptions: Options = {}): CompactAPI => {
    const api = ((value: any, options: any = {}) => {
        const mergedOptions = { ...defaultOptions, ...options };
        return compact(value, mergedOptions);
    }) as CompactAPI;

    api.array = array;
    api.object = object;
    api.deep = deep;
    api.filter = filter;
    api.without = without;

    api.fast = (options = {}) =>
        create({ ...defaultOptions, ...options, strategy: 'fast' });
    api.minimal = (options = {}) =>
        create({ ...defaultOptions, ...options, strategy: 'minimal' });
    api.balanced = (options = {}) =>
        create({ ...defaultOptions, ...options, strategy: 'balanced' });

    api.configure = (newDefaults: Options) =>
        create({ ...defaultOptions, ...newDefaults });

    return api;
};

const compactLib = create();

export type {
    Brand,
    Falsy,
    Truthy,
    NonNullable,
    CompactArray,
    DeepArray,
    CompactObject,
    DeepObject,
    Options,
    DefaultOptions,
    ResolveOptions,
    IsFalsy,
    CompactResult,
    Predicate,
    CompactAPI,
    IsArray,
    IsObject,
    IsEmpty,
};

export {
    compact,
    array,
    object,
    deep,
    filter,
    without,
    create,
    createFilter,
    compactLib,
};

export default compactLib;
