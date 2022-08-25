const { _, invoke } = require('underscore');

(function () {
    let numbers = [1, 2, 3];

    function multiply() {
        return Math.imul(this, 2);
    }

    const result = _.invoke(numbers, multiply);
    console.log(result);
})();