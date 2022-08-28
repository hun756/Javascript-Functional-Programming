"use strict";
const { _, contains } = require('underscore');

(function () {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8];

    const truth = _.contains(numbers, 4);
    console.log(truth);
})();