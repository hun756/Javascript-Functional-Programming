const { _, reduce, reduceRight } = require('underscore');

(function () {
    const numbers = [1, 2, 3];

    let sum = _.reduce(numbers, (total, item) => {
        return total + item;
    });
    console.log(sum);
})();