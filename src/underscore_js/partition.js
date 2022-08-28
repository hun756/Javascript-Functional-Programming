"use strict";

const { _, partition } = require("underscore");

(function () {
    const people = ["Mehmet", "Ziya", "Mert"];
    const groupped = _.partition(people, (person) => {
        return person.length < 5;
    });
    console.log(groupped);
})();