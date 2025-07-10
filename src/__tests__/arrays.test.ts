import { compact } from '../arrays';

describe('compact', () => {
  it('should remove falsy values from array', () => {
    const input = [0, 1, false, 2, '', 3, null, undefined, NaN, 4];
    const expected = [1, 2, 3, 4];
    const result = compact(input);
    
    expect(result).toEqual(expected);
  });

  it('should return empty array when all values are falsy', () => {
    const input = [false, null, 0, '', undefined, NaN];
    const expected: never[] = [];
    const result = compact(input);
    
    expect(result).toEqual(expected);
  });

  it('should return same array when no falsy values', () => {
    const input = [1, 2, 3, 'hello', true, {}];
    const expected = [1, 2, 3, 'hello', true, {}];
    const result = compact(input);
    
    expect(result).toEqual(expected);
  });

  it('should handle empty array', () => {
    const input: never[] = [];
    const expected: never[] = [];
    const result = compact(input);
    
    expect(result).toEqual(expected);
  });

  it('should preserve object and array references', () => {
    const obj = { a: 1 };
    const arr = [1, 2, 3];
    const input = [obj, null, arr, false];
    const result = compact(input);
    
    expect(result).toEqual([obj, arr]);
    expect(result[0]).toBe(obj); // Same reference
    expect(result[1]).toBe(arr); // Same reference
  });
});
