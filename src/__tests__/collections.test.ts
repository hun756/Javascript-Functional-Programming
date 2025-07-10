import * as FP from '../collections';

describe('Collection Functions', () => {
    const numbers = [1, 2, 3, 4, 5];
    const people = [
        { name: 'John', age: 34 },
        { name: 'Jane', age: 28 },
        { name: 'Bob', age: 45 },
    ];

    describe('each', () => {
        it('should iterate over all elements', () => {
            const result: number[] = [];
            FP.each(numbers, num => result.push(num * 2));
            expect(result).toEqual([2, 4, 6, 8, 10]);
        });

        it('should provide index and collection', () => {
            const indices: number[] = [];
            FP.each(numbers, (_, index) => indices.push(index));
            expect(indices).toEqual([0, 1, 2, 3, 4]);
        });
    });

    describe('map', () => {
        it('should transform elements', () => {
            const result = FP.map(numbers, num => num * 2);
            expect(result).toEqual([2, 4, 6, 8, 10]);
        });

        it('should work with objects', () => {
            const names = FP.map(people, person => person.name);
            expect(names).toEqual(['John', 'Jane', 'Bob']);
        });
    });

    describe('filter', () => {
        it('should filter elements', () => {
            const evens = FP.filter(numbers, num => num % 2 === 0);
            expect(evens).toEqual([2, 4]);
        });

        it('should work with objects', () => {
            const adults = FP.filter(people, person => person.age >= 30);
            expect(adults).toEqual([
                { name: 'John', age: 34 },
                { name: 'Bob', age: 45 },
            ]);
        });
    });

    describe('reduce', () => {
        it('should reduce to single value', () => {
            const sum = FP.reduce(numbers, (acc, num) => acc + num, 0);
            expect(sum).toBe(15);
        });

        it('should work with objects', () => {
            const totalAge = FP.reduce(
                people,
                (acc, person) => acc + person.age,
                0
            );
            expect(totalAge).toBe(107);
        });
    });

    describe('find', () => {
        it('should find first matching element', () => {
            const found = FP.find(numbers, num => num > 3);
            expect(found).toBe(4);
        });

        it('should return undefined if not found', () => {
            const found = FP.find(numbers, num => num > 10);
            expect(found).toBeUndefined();
        });
    });

    describe('every', () => {
        it('should return true if all match', () => {
            const result = FP.every(numbers, num => num > 0);
            expect(result).toBe(true);
        });

        it('should return false if any dont match', () => {
            const result = FP.every(numbers, num => num > 3);
            expect(result).toBe(false);
        });
    });

    describe('some', () => {
        it('should return true if any match', () => {
            const result = FP.some(numbers, num => num > 3);
            expect(result).toBe(true);
        });

        it('should return false if none match', () => {
            const result = FP.some(numbers, num => num > 10);
            expect(result).toBe(false);
        });
    });

    describe('reject', () => {
        it('should reject matching elements', () => {
            const odds = FP.reject(numbers, num => num % 2 === 0);
            expect(odds).toEqual([1, 3, 5]);
        });
    });

    describe('includes', () => {
        it('should find existing element', () => {
            const result = FP.includes(numbers, 3);
            expect(result).toBe(true);
        });

        it('should not find non-existing element', () => {
            const result = FP.includes(numbers, 10);
            expect(result).toBe(false);
        });

        it('should work with fromIndex', () => {
            const result = FP.includes(numbers, 2, 2);
            expect(result).toBe(false);
        });
    });

    describe('size', () => {
        it('should return array length', () => {
            expect(FP.size(numbers)).toBe(5);
        });

        it('should return object keys count', () => {
            expect(FP.size({ a: 1, b: 2 })).toBe(2);
        });
    });

    describe('chunk', () => {
        it('should create chunks', () => {
            const result = FP.chunk(numbers, 2);
            expect(result).toEqual([[1, 2], [3, 4], [5]]);
        });

        it('should return empty array for invalid size', () => {
            const result = FP.chunk(numbers, 0);
            expect(result).toEqual([]);
        });
    });

    describe('compact', () => {
        it('should remove falsy values', () => {
            const mixed = [0, 1, false, 2, '', 3, null, undefined, 4];
            const result = FP.compact(mixed);
            expect(result).toEqual([1, 2, 3, 4]);
        });
    });

    describe('union', () => {
        it('should create union of arrays', () => {
            const result = FP.union([1, 2], [2, 3], [3, 4]);
            expect(result).toEqual([1, 2, 3, 4]);
        });
    });

    describe('without', () => {
        it('should exclude specified values', () => {
            const result = FP.without(numbers, 2, 4);
            expect(result).toEqual([1, 3, 5]);
        });
    });

    describe('uniq', () => {
        it('should remove duplicates', () => {
            const result = FP.uniq([1, 2, 2, 3, 3, 3, 4]);
            expect(result).toEqual([1, 2, 3, 4]);
        });
    });
});
