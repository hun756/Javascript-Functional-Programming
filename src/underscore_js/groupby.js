const { _, groupBy } = require('underscore');

(function () {
    const people = [
        { name: 'John', age: 34 },
        { name: 'Doe', age: 34 },
        { name: 'Michael', age: 80 },
    ];

    let groupped = _.groupBy(people, (person) => person.age);
    console.log(groupped);
})();