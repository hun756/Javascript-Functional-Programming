"use strict";
const { _, toArray} = require("underscore");

(function () {
    const arr = _.toArray(arguments).slice(1);
    console.log(arr);
})("Mehmet", "Ziya", "Mert");