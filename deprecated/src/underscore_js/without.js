"use strict";
const { _, without } = require("underscore");

(function () {
    const arr = [1, 2, 1, 0, 3, 1, 4];
    const woArray = _.without(arr, 0 , 1);
    console.log(woArray);
})();