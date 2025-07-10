# TypeScript Functional Programming Library

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue)]()
[![License](https://img.shields.io/badge/license-MIT-green)]()

A high-performance functional programming library written in TypeScript, designed to alternative Underscore.js with modern, type-safe, and optimized implementations.

## Features

- 🚀 **High Performance**: Optimized implementations using fast loops and modern JavaScript features
- 🔒 **Type Safety**: Full TypeScript support with comprehensive type definitions
- 📦 **Modular**: Import only what you need, tree-shakable
- 🧪 **Well Tested**: Comprehensive test coverage with Jest
- 📊 **Benchmarked**: Performance comparisons with native methods
- 🎯 **Zero Dependencies**: No external dependencies

## Installation

```bash
npm install typescript-functional-programming
```

## Quick Start

```typescript
import * as FP from 'typescript-functional-programming';

// Or import specific functions
import { map, filter, groupBy } from 'typescript-functional-programming';

const numbers = [1, 2, 3, 4, 5];
const people = [
  { name: 'John', age: 34, department: 'Engineering' },
  { name: 'Jane', age: 28, department: 'Marketing' },
  { name: 'Bob', age: 45, department: 'Engineering' }
];

// Collection operations
const doubled = FP.map(numbers, x => x * 2);
const evens = FP.filter(numbers, x => x % 2 === 0);
const sum = FP.reduce(numbers, (acc, x) => acc + x, 0);

// Object operations
const byDepartment = FP.groupBy(people, 'department');
const names = FP.pluck(people, 'name');
const engineers = FP.where(people, { department: 'Engineering' });
```

## API Reference

### Collection Functions

#### `each<T>(collection: T[], iteratee: (item: T, index: number, collection: T[]) => void): void`
Iterates over elements of collection, invoking iteratee for each element.

#### `map<T, R>(collection: T[], iteratee: (item: T, index: number, collection: T[]) => R): R[]`
Creates an array of values by running each element through iteratee.

#### `filter<T>(collection: T[], predicate: (item: T, index: number, collection: T[]) => boolean): T[]`
Creates an array of elements that pass the predicate test.

#### `reduce<T, R>(collection: T[], iteratee: (acc: R, item: T, index: number, collection: T[]) => R, initialValue: R): R`
Reduces collection to a single value.

#### `find<T>(collection: T[], predicate: (item: T, index: number, collection: T[]) => boolean): T | undefined`
Returns the first element that passes the predicate test.

#### `every<T>(collection: T[], predicate: (item: T, index: number, collection: T[]) => boolean): boolean`
Checks if all elements pass the predicate test.

#### `some<T>(collection: T[], predicate: (item: T, index: number, collection: T[]) => boolean): boolean`
Checks if any element passes the predicate test.

### Array Functions

#### `first<T>(array: T[], n?: number): T | T[] | undefined`
Gets the first element or first n elements of array.

#### `last<T>(array: T[], n?: number): T | T[] | undefined`
Gets the last element or last n elements of array.

#### `flatten<T>(array: any[], depth?: number): T[]`
Flattens array a single level deep or to specified depth.

#### `shuffle<T>(array: T[]): T[]`
Creates an array of shuffled values.

#### `sortBy<T>(array: T[], iteratee: (item: T) => any): T[]`
Creates an array of elements sorted by iteratee results.

#### `max<T>(array: T[], iteratee?: (item: T) => number): T | undefined`
Computes the maximum value of array.

#### `min<T>(array: T[], iteratee?: (item: T) => number): T | undefined`
Computes the minimum value of array.

### Object Functions

#### `groupBy<T>(collection: T[], iteratee: string | ((item: T) => string)): { [key: string]: T[] }`
Groups collection elements by iteratee result.

#### `indexBy<T>(collection: T[], iteratee: string | ((item: T) => string)): { [key: string]: T }`
Indexes collection elements by iteratee result.

#### `pluck<T, K extends keyof T>(collection: T[], property: K): T[K][]`
Retrieves the value of a specified property from all elements.

#### `where<T>(collection: T[], properties: Partial<T>): T[]`
Returns elements that match the given properties.

#### `pick<T, K extends keyof T>(object: T, ...keys: K[]): Pick<T, K>`
Creates an object with only the specified keys.

#### `omit<T, K extends keyof T>(object: T, ...keys: K[]): Omit<T, K>`
Creates an object without the specified keys.

## Performance

This library is optimized for performance with:

- Fast for-loops instead of native array methods where beneficial
- Minimal function call overhead
- Efficient memory usage
- Compile-time optimizations

Run benchmarks:

```bash
npm run benchmark
```

## Development

```bash
# Install dependencies
npm install

# Build the library
npm run build

# Run tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run examples
npm run dev

# Format code
npm run format

# Lint code
npm run lint
```

## Project Structure

```
src/
├── arrays/           # Array-specific functions
├── collections/      # Collection functions
├── objects/          # Object manipulation functions
├── utils/            # Utility functions and type guards
├── types/            # TypeScript type definitions
├── examples/         # Usage examples
├── benchmarks/       # Performance benchmarks
├── __tests__/        # Test suites
└── index.ts          # Main entry point
```

## Migration from Underscore.js

This library provides a modern, type-safe alternative to Underscore.js:

```typescript
// Before (Underscore.js)
const _ = require('underscore');
const result = _.map([1, 2, 3], x => x * 2);

// After (This library)
import { map } from 'typescript-functional-programming';
const result = map([1, 2, 3], x => x * 2);
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for your changes
5. Ensure all tests pass
6. Submit a pull request

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Changelog

### v1.0.0
- Initial release
- Core collection, array, and object functions
- Full TypeScript support
- Comprehensive test coverage
- Performance optimizations