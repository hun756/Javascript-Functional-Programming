const { _, pluck } = require('underscore');

(function () {
    const people = [
        { name: 'John', age: 34 },
        { name: 'Doe', age: 34 },
        { name: 'Michael', age: 32 },
    ];

    var names = _.pluck(people, 'name');
    console.log(names);
})();