"use strict";
const { _, size } = require("underscore");

(function () {
    const count = _.size([1,2,3,4,5]);
    console.log("Size of array is :", count);
})();