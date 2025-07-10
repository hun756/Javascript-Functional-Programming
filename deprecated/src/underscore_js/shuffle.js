"use strict";
const { _, shuffle } = require("underscore");

(function () {
    const numbers = [1, 2, 3, 4, 5];
    const shufled = _.shuffle(numbers);
    console.log(shufled);
})();