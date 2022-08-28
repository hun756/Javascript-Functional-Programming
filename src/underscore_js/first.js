"use strict";

const { _, first } = require("underscore");

(function () {
    const numbers = [1, 2, 3, 4, 5];
    const first = _.first(numbers);
    const _first = _.first(numbers, 3);

    console.log(first);
    console.log(_first);
})();