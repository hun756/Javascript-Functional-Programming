"use strict";

const { _, union } = require("underscore");

(function () {
    const arr1 = [1, 2, 3], 
        arr2 = [101, 2, 1, 10], 
        arr3 = [2, 1];
    
    const uArr = _.union(arr1, arr2, arr3);
    console.log(uArr);
})();