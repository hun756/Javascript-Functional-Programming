const {_, filter} = require('underscore');

(function () {
    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let found = _.filter(numbers, (n) => n % 3 == 0);

    console.log(found);
})();