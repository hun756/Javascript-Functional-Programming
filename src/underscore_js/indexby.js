"use strict";
const { _, indexBy } = require('underscore');

(function () {
    const people = [
        { name: 'John', age: 34 },
        { name: 'Doe', age: 35 },
        { name: 'Michael', age: 80 },
    ];

    let indexed = _.indexBy(people, 'age');
    console.log(indexed);
})();