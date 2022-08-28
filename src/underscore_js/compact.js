"use strict";

const { _, compact } = require("underscore");

(function () {
    console.log(_.compact([0, 1, false, 2, '', 3]));
})();