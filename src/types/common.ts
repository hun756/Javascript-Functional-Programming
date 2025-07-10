// Common type definitions for functional programming utilities

export type Predicate<T> = (item: T, index?: number, collection?: T[]) => boolean;
export type Iteratee<T, R> = (item: T, index?: number, collection?: T[]) => R;
export type KeySelector<T> = (item: T) => string | number;
export type Comparator<T> = (a: T, b: T) => number;
export type Reducer<T, R> = (accumulator: R, current: T, index?: number, array?: T[]) => R;

export interface Dictionary<T> {
  [key: string]: T;
}

export interface NumericDictionary<T> {
  [key: number]: T;
}

export interface GroupedResult<T> {
  [key: string]: T[];
}

export interface IndexedResult<T> {
  [key: string]: T;
}

export type Collection<T> = T[] | ArrayLike<T>;

export interface PropertyPath {
  [key: string]: any;
}

export type Many<T> = T | readonly T[];

export interface Cancelable {
  cancel(): void;
}

export interface DebounceSettings {
  leading?: boolean;
  maxWait?: number;
  trailing?: boolean;
}

export interface ThrottleSettings {
  leading?: boolean;
  trailing?: boolean;
}

export type ObjectIteratee<T, R> = (value: T, key: string, object: { [key: string]: T }) => R;
export type ObjectPredicate<T> = (value: T, key: string, object: { [key: string]: T }) => boolean;
