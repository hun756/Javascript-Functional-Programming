export const isArray = <T>(value: unknown): value is T[] =>
    Array.isArray(value);

export const isObject = (value: unknown): value is object =>
    value !== null && typeof value === 'object' && !Array.isArray(value);

export const isFunction = (value: unknown): value is Function =>
    typeof value === 'function';

export const isString = (value: unknown): value is string =>
    typeof value === 'string';

export const isNumber = (value: unknown): value is number =>
    typeof value === 'number' && !isNaN(value);

export const isBoolean = (value: unknown): value is boolean =>
    typeof value === 'boolean';

export const isUndefined = (value: unknown): value is undefined =>
    value === undefined;

export const isNull = (value: unknown): value is null => value === null;

export const isNullOrUndefined = (value: unknown): value is null | undefined =>
    value === null || value === undefined;

export const isDefined = <T>(value: T | undefined | null): value is T =>
    value !== undefined && value !== null;

export const isEmpty = (value: unknown): boolean => {
    if (isNullOrUndefined(value)) return true;
    if (isString(value) || isArray(value)) return value.length === 0;
    if (isObject(value)) return Object.keys(value).length === 0;
    return false;
};

export const isArrayLike = (value: unknown): value is ArrayLike<any> => {
    if (isNullOrUndefined(value) || isFunction(value)) return false;
    if (isArray(value)) return true;
    if (isObject(value) && 'length' in value) {
        const length = (value as any).length;
        return (
            isNumber(length) && length >= 0 && length <= Number.MAX_SAFE_INTEGER
        );
    }
    return false;
};

export const deepClone = <T>(value: T): T => {
    if (value === null || typeof value !== 'object') return value;
    if (value instanceof Date) return new Date(value.getTime()) as T;
    if (value instanceof RegExp) return new RegExp(value) as T;
    if (Array.isArray(value)) return value.map(deepClone) as T;

    const cloned = {} as T;
    for (const key in value) {
        if (value.hasOwnProperty(key)) {
            cloned[key] = deepClone(value[key]);
        }
    }
    return cloned;
};

export const toArray = <T>(value: ArrayLike<T>): T[] => {
    if (isArray(value)) return value as T[];
    return Array.from(value);
};
