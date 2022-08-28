"use strict";
const { _, initial } = require("underscore");

(function () {
    const arr = [1, 2, 3, 4, 5];
    console.log(_.initial(arr));
    console.log(_.initial(arr, 2));
})();
