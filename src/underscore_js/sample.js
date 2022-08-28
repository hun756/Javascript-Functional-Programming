"use strict";

const { _, sample } = require("underscore");

(function () {
    console.log(_.sample([1, 2, 3, 4, 5, 6]));
    console.log(_.sample([1, 2, 3, 4, 5, 6], 3));
})();