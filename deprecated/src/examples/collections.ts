import * as FP from '../index';

const people = [
    { name: 'John', age: 34, city: 'New York' },
    { name: 'Jane', age: 28, city: 'London' },
    { name: 'Bob', age: 34, city: 'Paris' },
    { name: 'Alice', age: 25, city: 'New York' },
];

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

console.log('=== Collection Examples ===');

console.log('\n1. Each:');
FP.each(people, (person, index) => {
    console.log(`${index}: ${person.name} - ${person.age}`);
});

console.log('\n2. Map:');
const names = FP.map(people, person => person.name);
console.log('Names:', names);

console.log('\n3. Filter:');
const adults = FP.filter(people, person => person.age >= 30);
console.log('Adults:', adults);

console.log('\n4. Reduce:');
const totalAge = FP.reduce(people, (sum, person) => sum + person.age, 0);
console.log('Total age:', totalAge);

console.log('\n5. Find:');
const foundPerson = FP.find(people, person => person.city === 'London');
console.log('Person in London:', foundPerson);

console.log('\n6. Every:');
const allAdults = FP.every(people, person => person.age >= 18);
console.log('All adults:', allAdults);

console.log('\n7. Some:');
const someInNY = FP.some(people, person => person.city === 'New York');
console.log('Some in New York:', someInNY);

console.log('\n8. Reject:');
const youngPeople = FP.reject(people, person => person.age >= 30);
console.log('Young people:', youngPeople);

console.log('\n9. Includes:');
const hasNumber5 = FP.includes(numbers, 5);
console.log('Has number 5:', hasNumber5);

console.log('\n10. Size:');
const peopleCount = FP.size(people);
console.log('People count:', peopleCount);

console.log('\n11. Chunk:');
const chunks = FP.chunk(numbers, 3);
console.log('Chunks of 3:', chunks);

console.log('\n12. Compact:');
const mixedArray = [0, 1, false, 2, '', 3, null, undefined, 4];
const compacted = FP.compact(mixedArray);
console.log('Compacted:', compacted);

console.log('\n13. Union:');
const arr1 = [1, 2, 3];
const arr2 = [2, 3, 4];
const arr3 = [3, 4, 5];
const unionResult = FP.union(arr1, arr2, arr3);
console.log('Union:', unionResult);

console.log('\n14. Without:');
const withoutResult = FP.without(numbers, 2, 4, 6);
console.log('Without 2, 4, 6:', withoutResult);

console.log('\n15. Unique:');
const duplicates = [1, 2, 2, 3, 3, 3, 4, 5, 5];
const unique = FP.uniq(duplicates);
console.log('Unique:', unique);
