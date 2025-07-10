import * as FP from '../index';

console.log('=== Array Examples ===');

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const people = [
    { name: 'John', age: 34, salary: 50000 },
    { name: 'Jane', age: 28, salary: 60000 },
    { name: 'Bob', age: 45, salary: 75000 },
    { name: 'Alice', age: 25, salary: 45000 },
];

console.log('\n1. First:');
console.log('First element:', FP.first(numbers));
console.log('First 3 elements:', FP.first(numbers, 3));

console.log('\n2. Last:');
console.log('Last element:', FP.last(numbers));
console.log('Last 3 elements:', FP.last(numbers, 3));

console.log('\n3. Rest:');
console.log('All but first:', FP.rest(numbers));
console.log('All but first 3:', FP.rest(numbers, 3));

console.log('\n4. Initial:');
console.log('All but last:', FP.initial(numbers));
console.log('All but last 3:', FP.initial(numbers, 3));

console.log('\n5. Flatten:');
const nested = [1, [2, 3], [4, [5, 6]]];
console.log('Flatten (depth 1):', FP.flatten(nested, 1));
console.log('Flatten deep:', FP.flattenDeep(nested));

console.log('\n6. Shuffle:');
console.log('Shuffled:', FP.shuffle(numbers));

console.log('\n7. Sample:');
console.log('Random sample:', FP.sample(numbers));
console.log('Random 3 samples:', FP.sample(numbers, 3));

console.log('\n8. SortBy:');
console.log('Sort by age:', FP.sortBy(people, 'age'));
console.log(
    'Sort by salary:',
    FP.sortBy(people, person => person.salary)
);

console.log('\n9. Max:');
console.log('Max number:', FP.max(numbers));
console.log(
    'Max salary person:',
    FP.max(people, person => person.salary)
);

console.log('\n10. Min:');
console.log('Min number:', FP.min(numbers));
console.log(
    'Min age person:',
    FP.min(people, person => person.age)
);

console.log('\n11. Partition:');
const [even, odd] = FP.partition(numbers, num => num % 2 === 0);
console.log('Even numbers:', even);
console.log('Odd numbers:', odd);

console.log('\n12. Reverse:');
console.log('Reversed:', FP.reverse(numbers));

console.log('\n13. SortedIndex:');
const sortedNumbers = [1, 2, 4, 5, 7, 8];
console.log('Insert index for 6:', FP.sortedIndex(sortedNumbers, 6));
