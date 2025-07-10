/**
 * Creates an array with all falsy values removed.
 * The values false, null, 0, "", undefined, and NaN are falsy.
 *
 * @param array - The array to compact
 * @returns Returns the new array of filtered values
 *
 * @example
 * ```typescript
 * compact([0, 1, false, 2, '', 3, null, undefined, NaN, 4])
 * // => [1, 2, 3, 4]
 * ```
 */
export function compact<T>(
    array: (T | null | undefined | false | 0 | '')[]
): T[] {
    const result: T[] = [];

    for (let i = 0; i < array.length; i++) {
        const item = array[i];
        // Check if the item is truthy
        if (item) {
            result[result.length] = item as T;
        }
    }

    return result;
}
