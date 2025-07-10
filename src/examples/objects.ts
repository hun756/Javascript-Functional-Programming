import * as FP from '../index';

console.log('=== Object Examples ===');

const people = [
    { name: 'John', age: 34, department: 'Engineering', salary: 50000 },
    { name: 'Jane', age: 28, department: 'Marketing', salary: 60000 },
    { name: 'Bob', age: 45, department: 'Engineering', salary: 75000 },
    { name: 'Alice', age: 25, department: 'Marketing', salary: 45000 },
    { name: 'Charlie', age: 34, department: 'Sales', salary: 55000 },
];

console.log('\n1. GroupBy:');
const groupedByDept = FP.groupBy(people, 'department');
console.log('Grouped by department:', groupedByDept);

const groupedByAge = FP.groupBy(people, person =>
    person.age >= 30 ? 'senior' : 'junior'
);
console.log('Grouped by age category:', groupedByAge);

console.log('\n2. IndexBy:');
const indexedByName = FP.indexBy(people, 'name');
console.log('Indexed by name:', indexedByName);

console.log('\n3. CountBy:');
const countByDept = FP.countBy(people, 'department');
console.log('Count by department:', countByDept);

console.log('\n4. Pluck:');
const names = FP.pluck(people, 'name');
console.log('Names:', names);

const salaries = FP.pluck(people, 'salary');
console.log('Salaries:', salaries);

console.log('\n5. Where:');
const engineersAge34 = FP.where(people, { department: 'Engineering', age: 34 });
console.log('Engineers age 34:', engineersAge34);

console.log('\n6. FindWhere:');
const firstMarketing = FP.findWhere(people, { department: 'Marketing' });
console.log('First marketing person:', firstMarketing);

console.log('\n7. Pick:');
const person = people[0];
const basicInfo = FP.pick(person, 'name', 'age');
console.log('Basic info:', basicInfo);

console.log('\n8. Omit:');
const withoutSalary = FP.omit(person, 'salary');
console.log('Without salary:', withoutSalary);

console.log('\n9. Defaults:');
const partialUser: any = { name: 'New User' };
const completeUser = FP.defaults(partialUser, {
    age: 25,
    department: 'Unknown',
});
console.log('Complete user:', completeUser);

console.log('\n10. Clone:');
const clonedPerson = FP.clone(person);
console.log('Cloned person:', clonedPerson);
console.log('Is same reference:', person === clonedPerson);

console.log('\n11. Keys:');
const personKeys = FP.keys(person);
console.log('Person keys:', personKeys);

console.log('\n12. Values:');
const personValues = FP.values(person);
console.log('Person values:', personValues);

console.log('\n13. Pairs:');
const personPairs = FP.pairs(person);
console.log('Person pairs:', personPairs);

console.log('\n14. Invert:');
const statusMap = { active: 'A', inactive: 'I', pending: 'P' };
const invertedMap = FP.invert(statusMap);
console.log('Inverted map:', invertedMap);

console.log('\n15. IsMatch:');
const searchCriteria = { department: 'Engineering' };
const isEngineer = FP.isMatch(person, searchCriteria);
console.log('Is engineer:', isEngineer);

console.log('\n16. IsEmpty:');
console.log('Empty object:', FP.isEmptyObject({}));
console.log('Non-empty object:', FP.isEmptyObject(person));
