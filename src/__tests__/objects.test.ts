import * as FP from '../objects';

describe('Object Functions', () => {
    const people = [
        { name: 'John', age: 34, department: 'Engineering' },
        { name: 'Jane', age: 28, department: 'Marketing' },
        { name: 'Bob', age: 34, department: 'Engineering' },
    ];

    describe('groupBy', () => {
        it('should group by property', () => {
            const result = FP.groupBy(people, 'department');
            expect(result.Engineering).toHaveLength(2);
            expect(result.Marketing).toHaveLength(1);
        });

        it('should group by function', () => {
            const result = FP.groupBy(people, p =>
                p.age >= 30 ? 'senior' : 'junior'
            );
            expect(result.senior).toHaveLength(2);
            expect(result.junior).toHaveLength(1);
        });
    });

    describe('indexBy', () => {
        it('should index by property', () => {
            const result = FP.indexBy(people, 'name');
            expect(result.John).toEqual({
                name: 'John',
                age: 34,
                department: 'Engineering',
            });
            expect(result.Jane).toEqual({
                name: 'Jane',
                age: 28,
                department: 'Marketing',
            });
        });
    });

    describe('countBy', () => {
        it('should count by property', () => {
            const result = FP.countBy(people, 'department');
            expect(result.Engineering).toBe(2);
            expect(result.Marketing).toBe(1);
        });

        it('should count by function', () => {
            const result = FP.countBy(people, p =>
                p.age >= 30 ? 'senior' : 'junior'
            );
            expect(result.senior).toBe(2);
            expect(result.junior).toBe(1);
        });
    });

    describe('pluck', () => {
        it('should pluck property values', () => {
            const names = FP.pluck(people, 'name');
            expect(names).toEqual(['John', 'Jane', 'Bob']);
        });
    });

    describe('where', () => {
        it('should filter by properties', () => {
            const result = FP.where(people, { department: 'Engineering' });
            expect(result).toHaveLength(2);
            expect(result.every(p => p.department === 'Engineering')).toBe(
                true
            );
        });

        it('should filter by multiple properties', () => {
            const result = FP.where(people, {
                department: 'Engineering',
                age: 34,
            });
            expect(result).toHaveLength(2);
        });
    });

    describe('findWhere', () => {
        it('should find first matching item', () => {
            const result = FP.findWhere(people, { department: 'Marketing' });
            expect(result?.name).toBe('Jane');
        });

        it('should return undefined if not found', () => {
            const result = FP.findWhere(people, { department: 'Sales' });
            expect(result).toBeUndefined();
        });
    });

    describe('pick', () => {
        it('should pick specified properties', () => {
            const person = people[0];
            const result = FP.pick(person, 'name', 'age');
            expect(result).toEqual({ name: 'John', age: 34 });
        });
    });

    describe('omit', () => {
        it('should omit specified properties', () => {
            const person = people[0];
            const result = FP.omit(person, 'department');
            expect(result).toEqual({ name: 'John', age: 34 });
        });
    });

    describe('defaults', () => {
        it('should fill undefined properties', () => {
            const partial: any = { name: 'Test' };
            const result = FP.defaults(partial, {
                age: 25,
                department: 'Unknown',
            });
            expect(result).toEqual({
                name: 'Test',
                age: 25,
                department: 'Unknown',
            });
        });

        it('should not override existing properties', () => {
            const partial: any = { name: 'Test', age: 30 };
            const result = FP.defaults(partial, {
                age: 25,
                department: 'Unknown',
            });
            expect(result.age).toBe(30);
        });
    });

    describe('clone', () => {
        it('should create shallow copy', () => {
            const person = people[0];
            const cloned = FP.clone(person);
            expect(cloned).toEqual(person);
            expect(cloned).not.toBe(person);
        });

        it('should handle primitives', () => {
            expect(FP.clone(42)).toBe(42);
            expect(FP.clone('test')).toBe('test');
            expect(FP.clone(null)).toBe(null);
        });
    });

    describe('keys', () => {
        it('should return object keys', () => {
            const person = people[0];
            const result = FP.keys(person);
            expect(result).toEqual(['name', 'age', 'department']);
        });
    });

    describe('values', () => {
        it('should return object values', () => {
            const obj = { a: 1, b: 2, c: 3 };
            const result = FP.values(obj);
            expect(result).toEqual([1, 2, 3]);
        });
    });

    describe('pairs', () => {
        it('should return key-value pairs', () => {
            const obj = { a: 1, b: 2 };
            const result = FP.pairs(obj);
            expect(result).toEqual([
                ['a', 1],
                ['b', 2],
            ]);
        });
    });

    describe('invert', () => {
        it('should invert object', () => {
            const obj = { a: 'x', b: 'y', c: 'z' };
            const result = FP.invert(obj);
            expect(result).toEqual({ x: 'a', y: 'b', z: 'c' });
        });
    });

    describe('isMatch', () => {
        it('should check if object matches properties', () => {
            const person = people[0];
            expect(FP.isMatch(person, { name: 'John' })).toBe(true);
            expect(FP.isMatch(person, { name: 'Jane' })).toBe(false);
        });
    });

    describe('isEmpty', () => {
        it('should check if object is empty', () => {
            expect(FP.isEmpty({})).toBe(true);
            expect(FP.isEmpty({ a: 1 })).toBe(false);
            expect(FP.isEmpty([])).toBe(true);
            expect(FP.isEmpty([1])).toBe(false);
            expect(FP.isEmpty('')).toBe(true);
            expect(FP.isEmpty('test')).toBe(false);
        });
    });

    describe('isElement', () => {
        it('should check if object is DOM element', () => {
            const mockElement = { nodeType: 1 };
            const notElement = { nodeType: 2 };

            expect(FP.isElement(mockElement)).toBe(true);
            expect(FP.isElement(notElement)).toBe(false);
            expect(FP.isElement({})).toBe(false);
        });
    });
});
