"use strict";
const { _, flatten } = require("underscore");

(function () {
    const arr = [1, [2], [3, [[4]]]];

    console.log(_.flatten(arr));

    // set depth
    console.log(_.flatten(arr, true));
    console.log(_.flatten(arr, 2));
})();