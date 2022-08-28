"use strict";
const { _, reject } = require('underscore');


(function () {
    const numbers = [1, 2, 3, 4, 5, 6];

    let odd = _.reject(numbers, (num) => {
        return num % 2 === 0;
    });
    console.log(odd);
})();