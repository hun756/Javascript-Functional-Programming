import * as FP from '../arrays';

describe('Array Functions', () => {
    const numbers = [1, 2, 3, 4, 5];
    const people = [
        { name: 'John', age: 34, salary: 50000 },
        { name: 'Jane', age: 28, salary: 60000 },
        { name: 'Bob', age: 45, salary: 75000 },
    ];

    describe('first', () => {
        it('should return first element', () => {
            expect(FP.first(numbers)).toBe(1);
        });

        it('should return first n elements', () => {
            expect(FP.first(numbers, 3)).toEqual([1, 2, 3]);
        });

        it('should return undefined for empty array', () => {
            expect(FP.first([])).toBeUndefined();
        });
    });

    describe('last', () => {
        it('should return last element', () => {
            expect(FP.last(numbers)).toBe(5);
        });

        it('should return last n elements', () => {
            expect(FP.last(numbers, 3)).toEqual([3, 4, 5]);
        });

        it('should return undefined for empty array', () => {
            expect(FP.last([])).toBeUndefined();
        });
    });

    describe('rest', () => {
        it('should return all but first element', () => {
            expect(FP.rest(numbers)).toEqual([2, 3, 4, 5]);
        });

        it('should return all but first n elements', () => {
            expect(FP.rest(numbers, 3)).toEqual([4, 5]);
        });
    });

    describe('initial', () => {
        it('should return all but last element', () => {
            expect(FP.initial(numbers)).toEqual([1, 2, 3, 4]);
        });

        it('should return all but last n elements', () => {
            expect(FP.initial(numbers, 3)).toEqual([1, 2]);
        });
    });

    describe('flatten', () => {
        it('should flatten one level', () => {
            const nested = [1, [2, 3], [4, [5, 6]]];
            expect(FP.flatten(nested, 1)).toEqual([1, 2, 3, 4, [5, 6]]);
        });

        it('should flatten deeply', () => {
            const nested = [1, [2, [3, [4, 5]]]];
            expect(FP.flattenDeep(nested)).toEqual([1, 2, 3, 4, 5]);
        });
    });

    describe('shuffle', () => {
        it('should return array with same length', () => {
            const result = FP.shuffle(numbers);
            expect(result).toHaveLength(numbers.length);
        });

        it('should contain all original elements', () => {
            const result = FP.shuffle(numbers);
            expect(result.sort()).toEqual(numbers.sort());
        });
    });

    describe('sample', () => {
        it('should return single random element', () => {
            const result = FP.sample(numbers);
            expect(numbers).toContain(result);
        });

        it('should return n random elements', () => {
            const result = FP.sample(numbers, 3) as number[];
            expect(result).toHaveLength(3);
            result.forEach(item => expect(numbers).toContain(item));
        });

        it('should return undefined for empty array', () => {
            expect(FP.sample([])).toBeUndefined();
        });
    });

    describe('sortBy', () => {
        it('should sort by property', () => {
            const result = FP.sortBy(people, 'age');
            expect(result.map(p => p.age)).toEqual([28, 34, 45]);
        });

        it('should sort by function', () => {
            const result = FP.sortBy(people, p => p.salary);
            expect(result.map(p => p.salary)).toEqual([50000, 60000, 75000]);
        });
    });

    describe('max', () => {
        it('should find max number', () => {
            expect(FP.max(numbers)).toBe(5);
        });

        it('should find max by property', () => {
            const result = FP.max(people, p => p.salary);
            expect(result?.name).toBe('Bob');
        });

        it('should return undefined for empty array', () => {
            expect(FP.max([])).toBeUndefined();
        });
    });

    describe('min', () => {
        it('should find min number', () => {
            expect(FP.min(numbers)).toBe(1);
        });

        it('should find min by property', () => {
            const result = FP.min(people, p => p.age);
            expect(result?.name).toBe('Jane');
        });

        it('should return undefined for empty array', () => {
            expect(FP.min([])).toBeUndefined();
        });
    });

    describe('partition', () => {
        it('should partition array', () => {
            const [even, odd] = FP.partition(numbers, num => num % 2 === 0);
            expect(even).toEqual([2, 4]);
            expect(odd).toEqual([1, 3, 5]);
        });
    });

    describe('reverse', () => {
        it('should reverse array', () => {
            expect(FP.reverse(numbers)).toEqual([5, 4, 3, 2, 1]);
        });

        it('should not modify original array', () => {
            const original = [1, 2, 3];
            FP.reverse(original);
            expect(original).toEqual([1, 2, 3]);
        });
    });

    describe('sortedIndex', () => {
        it('should find correct insertion index', () => {
            const sorted = [1, 2, 4, 5, 7, 8];
            expect(FP.sortedIndex(sorted, 6)).toBe(4);
        });

        it('should work with iteratee', () => {
            const sorted = [{ value: 1 }, { value: 3 }, { value: 5 }];
            const index = FP.sortedIndex(
                sorted,
                { value: 4 },
                obj => obj.value
            );
            expect(index).toBe(2);
        });
    });
});