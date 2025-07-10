import {
    ObjectIteratee,
    ObjectPredicate,
    Dictionary,
    GroupedResult,
    IndexedResult,
} from '@/types';
import {
    isFunction,
    fastMap,
    fastFilter,
    fastReduce,
    getProperty,
} from '@/utils';

export const groupBy = <T>(
    collection: T[],
    iteratee: ((item: T) => string) | string
): GroupedResult<T> => {
    const getKey = isFunction(iteratee)
        ? iteratee
        : (item: T) => String(getProperty(item, iteratee));

    const result: GroupedResult<T> = {};

    for (const item of collection) {
        const key = getKey(item);
        if (!result[key]) {
            result[key] = [];
        }
        result[key].push(item);
    }

    return result;
};

export const indexBy = <T>(
    collection: T[],
    iteratee: ((item: T) => string) | string
): IndexedResult<T> => {
    const getKey = isFunction(iteratee)
        ? iteratee
        : (item: T) => String(getProperty(item, iteratee));

    const result: IndexedResult<T> = {};

    for (const item of collection) {
        const key = getKey(item);
        result[key] = item;
    }

    return result;
};

export const countBy = <T>(
    collection: T[],
    iteratee: ((item: T) => string) | string
): Dictionary<number> => {
    const getKey = isFunction(iteratee)
        ? iteratee
        : (item: T) => String(getProperty(item, iteratee));

    const result: Dictionary<number> = {};

    for (const item of collection) {
        const key = getKey(item);
        result[key] = (result[key] || 0) + 1;
    }

    return result;
};

export const pluck = <T, K extends keyof T>(
    collection: T[],
    property: K
): T[K][] => {
    return fastMap(collection, item => item[property]);
};

export const where = <T>(collection: T[], properties: Partial<T>): T[] => {
    const keys = Object.keys(properties) as (keyof T)[];

    return fastFilter(collection, item => {
        return keys.every(key => item[key] === properties[key]);
    });
};

export const findWhere = <T>(
    collection: T[],
    properties: Partial<T>
): T | undefined => {
    const keys = Object.keys(properties) as (keyof T)[];

    for (const item of collection) {
        if (keys.every(key => item[key] === properties[key])) {
            return item;
        }
    }

    return undefined;
};

export const invoke = <T>(
    collection: T[],
    methodName: string | ((this: T, ...args: any[]) => any),
    ...args: any[]
): any[] => {
    return fastMap(collection, item => {
        if (isFunction(methodName)) {
            return methodName.call(item, ...args);
        }
        const method = (item as any)[methodName];
        return isFunction(method) ? method.apply(item, args) : undefined;
    });
};

export const pick = <T, K extends keyof T>(
    object: T,
    ...keys: K[]
): Pick<T, K> => {
    const result = {} as Pick<T, K>;

    for (const key of keys) {
        if (object && typeof object === 'object' && key in object) {
            result[key] = object[key];
        }
    }

    return result;
};

export const omit = <T, K extends keyof T>(
    object: T,
    ...keys: K[]
): Omit<T, K> => {
    const result = {} as Omit<T, K>;
    const keysToOmit = new Set(keys);

    for (const key in object) {
        if (!keysToOmit.has(key as any)) {
            (result as any)[key] = object[key];
        }
    }

    return result;
};

export const defaults = <T>(object: T, ...sources: Partial<T>[]): T => {
    const result = { ...object };

    for (const source of sources) {
        for (const key in source) {
            if (result[key] === undefined) {
                result[key] = source[key]!;
            }
        }
    }

    return result;
};

export const clone = <T>(object: T): T => {
    if (object === null || typeof object !== 'object') return object;
    if (object instanceof Date) return new Date(object.getTime()) as T;
    if (object instanceof RegExp) return new RegExp(object) as T;
    if (Array.isArray(object)) return object.slice() as T;

    const cloned = {} as T;
    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            cloned[key] = object[key];
        }
    }
    return cloned;
};

export const keys = <T>(object: T): (keyof T)[] => {
    return Object.keys(object as any) as (keyof T)[];
};

export const values = <T>(object: Dictionary<T>): T[] => {
    return Object.values(object);
};

export const pairs = <T>(object: Dictionary<T>): [string, T][] => {
    return Object.entries(object);
};

export const invert = <T extends Dictionary<string | number>>(
    object: T
): Dictionary<string> => {
    const result: Dictionary<string> = {};

    for (const key in object) {
        const value = object[key];
        result[String(value)] = key;
    }

    return result;
};

export const isMatch = <T>(object: T, properties: Partial<T>): boolean => {
    const keys = Object.keys(properties) as (keyof T)[];
    return keys.every(key => object[key] === properties[key]);
};

export const isEmpty = (object: any): boolean => {
    if (object == null) return true;
    if (Array.isArray(object) || typeof object === 'string')
        return object.length === 0;
    return Object.keys(object).length === 0;
};

export const isElement = (object: any): boolean => {
    return !!(object && object.nodeType === 1);
};
