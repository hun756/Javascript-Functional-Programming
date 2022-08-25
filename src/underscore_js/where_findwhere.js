const { _, where, findWhere } = require('underscore');


(function () {
    const people = [
        { name: 'John', age: 34 },
        { name: 'Doe', age: 34 },
        { name: 'Michael', age: 32 },
    ];

    let found = _.where(people, { age: 34 });
    console.log(found);
    found = _.findWhere(people, { age: 34 });
    console.log(found);
})();