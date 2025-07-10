export const fastForEach = <T>(
    array: T[],
    callback: (item: T, index: number) => void
): void => {
    for (let i = 0, len = array.length; i < len; i++) {
        callback(array[i], i);
    }
};

export const fastMap = <T, R>(
    array: T[],
    callback: (item: T, index: number) => R
): R[] => {
    const result = new Array(array.length);
    for (let i = 0, len = array.length; i < len; i++) {
        result[i] = callback(array[i], i);
    }
    return result;
};

export const fastFilter = <T>(
    array: T[],
    predicate: (item: T, index: number) => boolean
): T[] => {
    const result: T[] = [];
    for (let i = 0, len = array.length; i < len; i++) {
        if (predicate(array[i], i)) {
            result.push(array[i]);
        }
    }
    return result;
};

export const fastReduce = <T, R>(
    array: T[],
    callback: (accumulator: R, current: T, index: number) => R,
    initialValue: R
): R => {
    let accumulator = initialValue;
    for (let i = 0, len = array.length; i < len; i++) {
        accumulator = callback(accumulator, array[i], i);
    }
    return accumulator;
};

export const fastFind = <T>(
    array: T[],
    predicate: (item: T, index: number) => boolean
): T | undefined => {
    for (let i = 0, len = array.length; i < len; i++) {
        if (predicate(array[i], i)) {
            return array[i];
        }
    }
    return undefined;
};

export const fastFindIndex = <T>(
    array: T[],
    predicate: (item: T, index: number) => boolean
): number => {
    for (let i = 0, len = array.length; i < len; i++) {
        if (predicate(array[i], i)) {
            return i;
        }
    }
    return -1;
};

export const fastSome = <T>(
    array: T[],
    predicate: (item: T, index: number) => boolean
): boolean => {
    for (let i = 0, len = array.length; i < len; i++) {
        if (predicate(array[i], i)) {
            return true;
        }
    }
    return false;
};

export const fastEvery = <T>(
    array: T[],
    predicate: (item: T, index: number) => boolean
): boolean => {
    for (let i = 0, len = array.length; i < len; i++) {
        if (!predicate(array[i], i)) {
            return false;
        }
    }
    return true;
};

export const getProperty = (obj: any, path: string): any => {
    const keys = path.split('.');
    let result = obj;

    for (let i = 0; i < keys.length; i++) {
        if (result == null) return undefined;
        result = result[keys[i]];
    }

    return result;
};

export const memoize = <T extends (...args: any[]) => any>(
    fn: T,
    keyGenerator?: (...args: Parameters<T>) => string
): T => {
    const cache = new Map<string, ReturnType<T>>();

    return ((...args: Parameters<T>) => {
        const key = keyGenerator ? keyGenerator(...args) : JSON.stringify(args);

        if (cache.has(key)) {
            return cache.get(key)!;
        }

        const result = fn(...args);
        cache.set(key, result);
        return result;
    }) as T;
};
