"use strict";
const { _ , map} = require('underscore');

let arr = [1, 2, 3];

console.log(
    _.map(arr, 
        val => Math.imul(val, 2)
    )
);

console.log(
    _(arr).map( 
        val => Math.imul(val, 2)
    )
);