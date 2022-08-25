const { _, max } = require('underscore');

(function () {
    const people = [
        { name: 'John', age: 34 },
        { name: 'Doe', age: 34 },
        { name: 'Michael', age: 80 },
    ];

    var maxValue = _.max(people, (person) => person.age);
    console.log(maxValue);
})();