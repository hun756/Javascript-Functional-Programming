"use strict";
const { _, each } = require('underscore');

(function() {
    // for arrays
    const people = ["Ahmet", "Mehmet", "Mustafa"];
    _.each(people, (_name, index) => {
        console.log(_name, index);
    });

    const _people = {name: "Mehmet", age:25, gender: "Male"};
    _.each(_people, (_name, property, arr) => {
        console.log(_name, property, arr);
    });
})();