"use strict";
const { _, countBy } = require("underscore");

(function () {
    const numbers = [1, 2, 3, 4, 5];

    const counted = _.countBy(numbers, (num) => {
        return num % 2 == 0 ? "even" : "odd";
    });

    console.log(counted);
})();