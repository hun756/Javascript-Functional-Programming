const { _, every } = require('underscore');

(function () {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8];

    const truth = _.every(numbers, (n) => {
        return n > 0;   
    });
    console.log(truth);
})();