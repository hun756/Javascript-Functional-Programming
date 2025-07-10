import { Predicate, Iteratee, KeySelector, Comparator } from '@/types';
import {
    fastForEach,
    fastMap,
    fastFilter,
    fastReduce,
    fastFind,
    fastEvery,
    fastSome,
} from '@/utils';

export const each = <T>(
    collection: T[],
    iteratee: (item: T, index: number, collection: T[]) => void
): void => {
    fastForEach(collection, (item, index) => iteratee(item, index, collection));
};

export const map = <T, R>(collection: T[], iteratee: Iteratee<T, R>): R[] => {
    return fastMap(collection, (item, index) =>
        iteratee(item, index, collection)
    );
};

export const filter = <T>(collection: T[], predicate: Predicate<T>): T[] => {
    return fastFilter(collection, (item, index) =>
        predicate(item, index, collection)
    );
};

export const reduce = <T, R>(
    collection: T[],
    iteratee: (accumulator: R, value: T, index: number, collection: T[]) => R,
    accumulator: R
): R => {
    return fastReduce(
        collection,
        (acc, item, index) => iteratee(acc, item, index, collection),
        accumulator
    );
};

export const find = <T>(
    collection: T[],
    predicate: Predicate<T>
): T | undefined => {
    return fastFind(collection, (item, index) =>
        predicate(item, index, collection)
    );
};

export const every = <T>(collection: T[], predicate: Predicate<T>): boolean => {
    return fastEvery(collection, (item, index) =>
        predicate(item, index, collection)
    );
};

export const some = <T>(collection: T[], predicate: Predicate<T>): boolean => {
    return fastSome(collection, (item, index) =>
        predicate(item, index, collection)
    );
};

export const reject = <T>(collection: T[], predicate: Predicate<T>): T[] => {
    return fastFilter(
        collection,
        (item, index) => !predicate(item, index, collection)
    );
};

export const includes = <T>(
    collection: T[],
    value: T,
    fromIndex = 0
): boolean => {
    const startIndex =
        fromIndex < 0 ? Math.max(0, collection.length + fromIndex) : fromIndex;

    for (let i = startIndex; i < collection.length; i++) {
        if (collection[i] === value) {
            return true;
        }
    }
    return false;
};

export const size = <T>(collection: T[] | object): number => {
    if (Array.isArray(collection)) {
        return collection.length;
    }
    return Object.keys(collection).length;
};

export const chunk = <T>(array: T[], size: number): T[][] => {
    if (size <= 0) return [];

    const result: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }
    return result;
};

export const compact = <T>(array: T[]): NonNullable<T>[] => {
    return fastFilter(array, item => Boolean(item)) as NonNullable<T>[];
};

export const intersection = <T>(...arrays: T[][]): T[] => {
    if (arrays.length === 0) return [];
    if (arrays.length === 1) return [...arrays[0]];

    const [first, ...rest] = arrays;
    return fastFilter(first, item => rest.every(arr => includes(arr, item)));
};

export const union = <T>(...arrays: T[][]): T[] => {
    const result: T[] = [];
    const seen = new Set<T>();

    for (const array of arrays) {
        for (const item of array) {
            if (!seen.has(item)) {
                seen.add(item);
                result.push(item);
            }
        }
    }

    return result;
};

export const without = <T>(array: T[], ...values: T[]): T[] => {
    const valueSet = new Set(values);
    return fastFilter(array, item => !valueSet.has(item));
};

export const uniq = <T>(array: T[]): T[] => {
    return [...new Set(array)];
};
