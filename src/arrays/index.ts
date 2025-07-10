import { Predicate, Iteratee, KeySelector, Comparator } from '@/types';
import { fastMap, fastFilter, fastReduce, isFunction } from '@/utils';

export const first = <T>(array: T[], n?: number): T | T[] | undefined => {
    if (array.length === 0) return undefined;
    if (n === undefined) return array[0];
    if (n <= 0) return [];
    return array.slice(0, n);
};

export const last = <T>(array: T[], n?: number): T | T[] | undefined => {
    if (array.length === 0) return undefined;
    if (n === undefined) return array[array.length - 1];
    if (n <= 0) return [];
    return array.slice(-n);
};

export const rest = <T>(array: T[], n = 1): T[] => {
    return array.slice(n);
};

export const initial = <T>(array: T[], n = 1): T[] => {
    return array.slice(0, -n);
};

export const flatten = <T>(array: any[], depth = 1): T[] => {
    if (depth <= 0) return array;

    const result: T[] = [];

    for (const item of array) {
        if (Array.isArray(item) && depth > 0) {
            result.push(...(flatten(item, depth - 1) as T[]));
        } else {
            result.push(item as T);
        }
    }

    return result;
};

export const flattenDeep = <T>(array: any[]): T[] => {
    const result: T[] = [];

    for (const item of array) {
        if (Array.isArray(item)) {
            result.push(...(flattenDeep(item) as T[]));
        } else {
            result.push(item as T);
        }
    }

    return result;
};

export const shuffle = <T>(array: T[]): T[] => {
    const result = [...array];

    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }

    return result;
};

export const sample = <T>(array: T[], n?: number): T | T[] | undefined => {
    if (array.length === 0) return undefined;

    if (n === undefined) {
        return array[Math.floor(Math.random() * array.length)];
    }

    if (n <= 0) return [];
    if (n >= array.length) return shuffle(array);

    const shuffled = shuffle(array);
    return shuffled.slice(0, n);
};

export const sortBy = <T>(
    array: T[],
    iteratee: KeySelector<T> | string
): T[] => {
    const getKey = isFunction(iteratee)
        ? iteratee
        : (item: T) => (item as any)[iteratee];

    return [...array].sort((a, b) => {
        const keyA = getKey(a);
        const keyB = getKey(b);

        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
    });
};

export const max = <T>(
    array: T[],
    iteratee?: Iteratee<T, number>
): T | undefined => {
    if (array.length === 0) return undefined;

    if (!iteratee) {
        return array.reduce((max, current) =>
            (current as any) > (max as any) ? current : max
        );
    }

    let maxItem = array[0];
    let maxValue = iteratee(array[0], 0, array);

    for (let i = 1; i < array.length; i++) {
        const currentValue = iteratee(array[i], i, array);
        if (currentValue > maxValue) {
            maxValue = currentValue;
            maxItem = array[i];
        }
    }

    return maxItem;
};

export const min = <T>(
    array: T[],
    iteratee?: Iteratee<T, number>
): T | undefined => {
    if (array.length === 0) return undefined;

    if (!iteratee) {
        return array.reduce((min, current) =>
            (current as any) < (min as any) ? current : min
        );
    }

    let minItem = array[0];
    let minValue = iteratee(array[0], 0, array);

    for (let i = 1; i < array.length; i++) {
        const currentValue = iteratee(array[i], i, array);
        if (currentValue < minValue) {
            minValue = currentValue;
            minItem = array[i];
        }
    }

    return minItem;
};

export const partition = <T>(
    array: T[],
    predicate: Predicate<T>
): [T[], T[]] => {
    const truthy: T[] = [];
    const falsy: T[] = [];

    for (let i = 0; i < array.length; i++) {
        const item = array[i];
        if (predicate(item, i, array)) {
            truthy.push(item);
        } else {
            falsy.push(item);
        }
    }

    return [truthy, falsy];
};

export const reverse = <T>(array: T[]): T[] => {
    return [...array].reverse();
};

export const sortedIndex = <T>(
    array: T[],
    value: T,
    iteratee?: Iteratee<T, any>
): number => {
    let low = 0;
    let high = array.length;

    const getValue = iteratee || ((x: T) => x);
    const targetValue = getValue(value, 0, array);

    while (low < high) {
        const mid = Math.floor((low + high) / 2);
        const midValue = getValue(array[mid], mid, array);

        if (midValue < targetValue) {
            low = mid + 1;
        } else {
            high = mid;
        }
    }

    return low;
};
